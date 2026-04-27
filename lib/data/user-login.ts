import type { JsonUser } from '@/lib/data/schema'

/** Erlaubte Zeichen für Anmeldenamen (kein Leerzeichen). */
const LOGIN_NAME = /^[a-zA-Z0-9._-]{2,64}$/

export function normalizeSignInLogin(raw: string): string {
  return raw.trim().toLowerCase()
}

/**
 * Anmeldename für Credentials: `username` aus den Daten, sonst (Legacy) lokaler Teil der E-Mail,
 * bis alle Konten ein explizites `username` haben.
 */
export function signInNameForUser(u: JsonUser): string {
  const explicit = typeof u.username === 'string' ? u.username.trim().toLowerCase() : ''
  if (explicit) return explicit
  const local = u.email.split('@')[0]?.trim().toLowerCase() ?? ''
  return local
}

export function isValidUsernameFormat(raw: string): boolean {
  return LOGIN_NAME.test(raw.trim())
}
