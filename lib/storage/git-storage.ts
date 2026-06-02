/**
 * GitHub Contents API – Lesen/Schreiben von Dateien im Repo (z. B. data/*.json).
 */

const API = 'https://api.github.com'

function owner(): string {
  const o = process.env.GITHUB_REPO_OWNER?.trim()
  if (!o) throw new Error('GITHUB_REPO_OWNER fehlt')
  return o
}

function repo(): string {
  const r = process.env.GITHUB_REPO_NAME?.trim()
  if (!r) throw new Error('GITHUB_REPO_NAME fehlt')
  return r
}

function token(): string {
  const t =
    process.env.GIT_TOKEN?.trim() ||
    process.env.GITHUB_TOKEN?.trim() ||
    process.env.impulsPflegeToken?.trim()
  if (!t) throw new Error('GIT_TOKEN/GITHUB_TOKEN/impulsPflegeToken fehlt')
  return t
}

function encodeRepoPath(repoPath: string): string {
  return repoPath.split('/').filter(Boolean).map(encodeURIComponent).join('/')
}

type GitHubFileResponse = {
  type: string
  encoding?: string
  content?: string
  sha?: string
  size?: number
  download_url?: string | null
  message?: string
}

/**
 * Liefert Inhalt und aktuelle SHA einer Datei aus dem Repo.
 *
 * Robust gegen das 1-MB-Limit der GitHub Contents API: Wenn GitHub die
 * Metadaten ohne `content` zurückgibt (große Dateien), laden wir den
 * Inhalt über das `download_url` (raw.githubusercontent.com) nach. Damit
 * bleibt die SHA in jedem Fall verfügbar, sodass anschließende PUTs nicht
 * mit „sha wasn't supplied" abbrechen.
 */
export async function githubGetFile(repoPath: string): Promise<{ text: string; sha: string } | null> {
  const url = `${API}/repos/${owner()}/${repo()}/contents/${encodeRepoPath(repoPath)}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token()}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    next: { revalidate: 0 },
  })

  if (res.status === 404) return null
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`GitHub GET ${repoPath}: ${res.status} ${body}`)
  }

  const data = (await res.json()) as GitHubFileResponse
  if (data.type !== 'file' || !data.sha) {
    throw new Error(`GitHub GET ${repoPath}: unexpected payload`)
  }

  if (data.content) {
    const text = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf8')
    return { text, sha: data.sha }
  }

  // Großes File (>1 MB): Contents API liefert nur Metadaten. Inhalt über
  // den signierten Raw-Download nachladen, damit alle Konsumenten – auch
  // der reine Sha-Bedarf bei Updates – konsistent funktionieren.
  if (data.download_url) {
    const raw = await fetch(data.download_url, {
      headers: { Authorization: `Bearer ${token()}` },
      cache: 'no-store',
    })
    if (!raw.ok) {
      throw new Error(`GitHub raw GET ${repoPath}: ${raw.status}`)
    }
    const text = await raw.text()
    return { text, sha: data.sha }
  }

  // Letzter Ausweg: Git Data API direkt anfragen.
  const blob = await fetch(
    `${API}/repos/${owner()}/${repo()}/git/blobs/${encodeURIComponent(data.sha)}`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      cache: 'no-store',
    },
  )
  if (!blob.ok) {
    throw new Error(`GitHub blob GET ${repoPath}: ${blob.status}`)
  }
  const blobJson = (await blob.json()) as { content?: string; encoding?: string }
  if (!blobJson.content) {
    throw new Error(`GitHub blob GET ${repoPath}: empty content`)
  }
  const text = Buffer.from(blobJson.content.replace(/\n/g, ''), 'base64').toString('utf8')
  return { text, sha: data.sha }
}

export async function githubPutFile(
  repoPath: string,
  text: string,
  message: string,
  sha: string | null,
): Promise<void> {
  const url = `${API}/repos/${owner()}/${repo()}/contents/${encodeRepoPath(repoPath)}`
  const content = Buffer.from(text, 'utf8').toString('base64')
  const body: Record<string, string> = {
    message,
    content,
  }
  if (sha) body.sha = sha

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token()}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`GitHub PUT ${repoPath}: ${res.status} ${errText}`)
  }
}

function isGitHubWriteConflict(status: number): boolean {
  return status === 409 || status === 422
}

/**
 * PUT mit frischer SHA; bei Konflikt (parallele Schreibzugriffe / veraltete SHA)
 * erneut lesen und wiederholen.
 */
export async function githubPutFileWithRetries(
  repoPath: string,
  text: string,
  message: string,
  maxAttempts = 5,
): Promise<void> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    let sha: string | null = null
    try {
      const meta = await githubGetFile(repoPath)
      sha = meta?.sha ?? null
    } catch {
      sha = null
    }

    try {
      await githubPutFile(repoPath, text, message, sha)
      return
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e))
      lastError = err
      const m = err.message
      const statusMatch = /GitHub PUT [^:]+: (\d{3})\s/.exec(m)
      const status = statusMatch ? Number(statusMatch[1]) : 0
      const retryable = isGitHubWriteConflict(status) || m.includes('sha') || m.includes('does not match')
      if (!retryable || attempt === maxAttempts) {
        throw err
      }
      await new Promise((r) => setTimeout(r, 120 * attempt))
    }
  }

  throw lastError ?? new Error(`GitHub PUT ${repoPath}: failed after retries`)
}
