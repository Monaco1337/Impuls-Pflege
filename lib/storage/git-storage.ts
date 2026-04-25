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
  message?: string
}

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
  if (data.type !== 'file' || !data.content || !data.sha) {
    throw new Error(`GitHub GET ${repoPath}: unexpected payload`)
  }

  const text = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf8')
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
