/**
 * Vier Schichten: Memory → /tmp → GitHub (auf Vercel mit Token) → Repo-Datei (data/).
 */

import { mkdir, readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { githubGetFile, githubPutFileWithRetries } from '@/lib/storage/git-storage'

const memory = new Map<string, string>()
const memoryFreshAt = new Map<string, number>()
const lockChains = new Map<string, Promise<unknown>>()

/** Wie lange der In-Memory-Cache pro Lambda als "frisch" gilt (ms).
 *  Danach holen wir die Datei beim nächsten Lesen wieder von GitHub.
 *  So sehen sowohl die öffentliche Seite als auch das Admin-Panel den
 *  jeweils aktuellsten Stand – auch über mehrere Lambdas hinweg.
 */
const MEMORY_TTL_MS = 5_000

function dataDir(): string {
  return path.join(process.cwd(), 'data')
}

function tmpDir(): string {
  return path.join('/tmp', 'data')
}

export function isVercel(): boolean {
  return process.env.VERCEL === '1'
}

export function useGitHubPersistence(): boolean {
  const hasToken = Boolean(
    process.env.GIT_TOKEN?.trim() ||
      process.env.GITHUB_TOKEN?.trim() ||
      process.env.impulsPflegeToken?.trim(),
  )
  return (
    hasToken &&
    Boolean(process.env.GITHUB_REPO_OWNER?.trim()) &&
    Boolean(process.env.GITHUB_REPO_NAME?.trim())
  )
}

function repoPathForFile(fileName: string): string {
  return `data/${fileName}`
}

async function readLocalFile(fileName: string): Promise<string | null> {
  const p = path.join(dataDir(), fileName)
  if (!existsSync(p)) return null
  return readFile(p, 'utf8')
}

async function readTmpFile(fileName: string): Promise<string | null> {
  const p = path.join(tmpDir(), fileName)
  if (!existsSync(p)) return null
  return readFile(p, 'utf8')
}

async function writeTmpFile(fileName: string, text: string): Promise<void> {
  const target = path.join(tmpDir(), fileName)
  // `fileName` darf Unterordner enthalten (z. B. `site-image-blobs/<slot>.json`).
  // Wir legen daher den vollständigen Parent-Pfad rekursiv an, nicht nur
  // den Top-Level `tmp/data/`-Ordner.
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, text, 'utf8')
}

async function writeLocalDataFile(fileName: string, text: string): Promise<void> {
  const target = path.join(dataDir(), fileName)
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, text, 'utf8')
}

function runLocked<T>(fileName: string, fn: () => Promise<T>): Promise<T> {
  const prev = lockChains.get(fileName) ?? Promise.resolve()
  const next = prev.then(fn, fn)
  lockChains.set(
    fileName,
    next.then(
      () => undefined,
      () => undefined,
    ),
  )
  return next
}

function setMemory(fileName: string, text: string) {
  memory.set(fileName, text)
  memoryFreshAt.set(fileName, Date.now())
}

function isMemoryFresh(fileName: string): boolean {
  const at = memoryFreshAt.get(fileName)
  if (at === undefined) return false
  return Date.now() - at < MEMORY_TTL_MS
}

/** Optionen für Lesezugriff (z. B. Admin-Inbox: kein kurzer Memory-Hit, damit Vercel/GitHub-Lesungen nicht hintereinander auseinanderlaufen). */
export type ReadJsonOptions = {
  bypassMemory?: boolean
}

export async function readJsonRaw(
  fileName: string,
  defaultWhenMissing = '{}',
  options?: ReadJsonOptions,
): Promise<string> {
  const cached = memory.get(fileName)
  if (!options?.bypassMemory && cached !== undefined && isMemoryFresh(fileName)) {
    return cached
  }

  if (isVercel() && useGitHubPersistence()) {
    try {
      const gh = await githubGetFile(repoPathForFile(fileName))
      if (gh) {
        setMemory(fileName, gh.text)
        await writeTmpFile(fileName, gh.text).catch(() => {})
        return gh.text
      }
    } catch (err) {
      console.warn(`[readJsonRaw] GitHub read failed for ${fileName}:`, err)
    }
    if (cached !== undefined) return cached
    const tmp = await readTmpFile(fileName)
    if (tmp !== null) {
      setMemory(fileName, tmp)
      return tmp
    }
    const built = await readLocalFile(fileName)
    if (built !== null) {
      setMemory(fileName, built)
      return built
    }
    return defaultWhenMissing
  }

  if (isVercel()) {
    // Vercel OHNE GitHub-Persistenz: /tmp ist Lambda-lokaler aktueller Stand
    // (z. B. nach status_change, delete). /data ist read-only Build-Zeit-Stand
    // und MUSS hinten anstehen, sonst überschreibt er live-Mutationen wieder.
    const tmp = await readTmpFile(fileName)
    if (tmp !== null) {
      setMemory(fileName, tmp)
      return tmp
    }
    const local = await readLocalFile(fileName)
    if (local !== null) {
      setMemory(fileName, local)
      return local
    }
    return defaultWhenMissing
  }

  const local = await readLocalFile(fileName)
  if (local !== null) {
    setMemory(fileName, local)
    return local
  }
  const tmp = await readTmpFile(fileName)
  if (tmp !== null) {
    setMemory(fileName, tmp)
    return tmp
  }
  return defaultWhenMissing
}

export async function readJsonFile<T>(fileName: string, fallback: T, options?: ReadJsonOptions): Promise<T> {
  const raw = await readJsonRaw(fileName, JSON.stringify(fallback), options)
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export async function writeJsonFile(fileName: string, value: unknown, commitMessage: string): Promise<void> {
  const text = JSON.stringify(value, null, 2)
  await runLocked(fileName, async () => {
    await writeTmpFile(fileName, text)

    if (isVercel() && useGitHubPersistence()) {
      try {
        await githubPutFileWithRetries(repoPathForFile(fileName), text, commitMessage)
        setMemory(fileName, text)
      } catch (err) {
        invalidateJsonFile(fileName)
        throw err
      }
      return
    }

    if (isVercel()) {
      console.warn(
        `[writeJsonFile] '${fileName}' wurde nur in /tmp + Memory geschrieben. Setze GIT_TOKEN/GITHUB_REPO_OWNER/GITHUB_REPO_NAME für persistente Speicherung.`,
      )
      setMemory(fileName, text)
      return
    }

    await writeLocalDataFile(fileName, text)
    setMemory(fileName, text)
  })
}

export function invalidateJsonFile(fileName: string): void {
  memory.delete(fileName)
  memoryFreshAt.delete(fileName)
}
