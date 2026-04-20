/**
 * Vier Schichten: Memory → /tmp → GitHub (auf Vercel mit Token) → Repo-Datei (data/).
 */

import { mkdir, readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { githubGetFile, githubPutFile } from '@/lib/storage/git-storage'

const memory = new Map<string, string>()
const lockChains = new Map<string, Promise<unknown>>()

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
  return Boolean(
    process.env.GIT_TOKEN?.trim() &&
      process.env.GITHUB_REPO_OWNER?.trim() &&
      process.env.GITHUB_REPO_NAME?.trim(),
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
  const dir = tmpDir()
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true })
  }
  await writeFile(path.join(dir, fileName), text, 'utf8')
}

async function writeLocalDataFile(fileName: string, text: string): Promise<void> {
  const dir = dataDir()
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true })
  }
  await writeFile(path.join(dir, fileName), text, 'utf8')
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

export async function readJsonRaw(fileName: string, defaultWhenMissing = '{}'): Promise<string> {
  const cached = memory.get(fileName)
  if (cached !== undefined) return cached

  if (isVercel() && useGitHubPersistence()) {
    try {
      const gh = await githubGetFile(repoPathForFile(fileName))
      if (gh) {
        memory.set(fileName, gh.text)
        await writeTmpFile(fileName, gh.text).catch(() => {})
        return gh.text
      }
    } catch {
      // Fallback unten
    }
    const tmp = await readTmpFile(fileName)
    if (tmp !== null) {
      memory.set(fileName, tmp)
      return tmp
    }
    const built = await readLocalFile(fileName)
    if (built !== null) {
      memory.set(fileName, built)
      return built
    }
    return defaultWhenMissing
  }

  const local = await readLocalFile(fileName)
  if (local !== null) {
    memory.set(fileName, local)
    return local
  }
  const tmp = await readTmpFile(fileName)
  if (tmp !== null) {
    memory.set(fileName, tmp)
    return tmp
  }
  return defaultWhenMissing
}

export async function readJsonFile<T>(fileName: string, fallback: T): Promise<T> {
  const raw = await readJsonRaw(fileName, JSON.stringify(fallback))
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export async function writeJsonFile(fileName: string, value: unknown, commitMessage: string): Promise<void> {
  const text = JSON.stringify(value, null, 2)
  await runLocked(fileName, async () => {
    memory.set(fileName, text)
    await writeTmpFile(fileName, text)

    if (isVercel() && useGitHubPersistence()) {
      let sha: string | null = null
      try {
        const meta = await githubGetFile(repoPathForFile(fileName))
        sha = meta?.sha ?? null
      } catch {
        sha = null
      }
      await githubPutFile(repoPathForFile(fileName), text, commitMessage, sha)
      return
    }

    await writeLocalDataFile(fileName, text)
  })
}

export function invalidateJsonFile(fileName: string): void {
  memory.delete(fileName)
}
