/**
 * Zentrale Sichtbarkeits-Logik für versteckte Benutzer (Owner-Konten).
 *
 * Regel:
 *   - Ein Benutzer mit `hidden: true` oder mit Rolle `OWNER` ist nur
 *     für andere OWNER sichtbar.
 *   - Für alle anderen Rollen darf weder das Konto selbst, noch
 *     irgendein Aktivitäts- oder Metadaten-Hinweis darauf erscheinen.
 *
 * Diese Funktionen sind die EINZIGE Quelle der Wahrheit für alle
 * UI- und API-Filter. Server-Audit (audit-logs.json) bleibt vollständig
 * und unverändert erhalten – wir filtern nur beim Lesen pro Viewer.
 */
import { SYSTEM_ADMIN_USER_ID } from './permissions'
import type { RoleName } from '@/lib/types/enums'

/** Minimal-Form eines Users zur Sichtbarkeitsprüfung. */
export type VisibilityTarget = {
  id: string
  role: RoleName | string
  hidden?: boolean | null
}

/** Minimal-Form eines Viewers (eingeloggter Nutzer). */
export type VisibilityViewer = {
  id: string
  role: RoleName | string
}

/**
 * Ist der Ziel-Account ein versteckter Owner-Account?
 * Dreifach-Sicherung:
 *   1. explizites `hidden`-Flag
 *   2. Rolle `OWNER`
 *   3. fest verdrahtete Admin-ID (Fallback, falls Datenbank manipuliert)
 */
export function isHiddenUser(target: VisibilityTarget): boolean {
  if (target.hidden === true) return true
  if (target.role === 'OWNER') return true
  if (target.id === SYSTEM_ADMIN_USER_ID) return true
  return false
}

/** Ist der Viewer berechtigt, versteckte Konten zu sehen? */
export function isOwnerViewer(viewer: VisibilityViewer | null | undefined): boolean {
  if (!viewer) return false
  return viewer.role === 'OWNER'
}

/**
 * Zentrale Schutzregel.
 *
 * @returns true, wenn der Viewer den Target-Benutzer sehen darf.
 */
export function isVisibleToViewer(
  target: VisibilityTarget,
  viewer: VisibilityViewer | null | undefined,
): boolean {
  if (!isHiddenUser(target)) return true
  return isOwnerViewer(viewer)
}

/** Filtert eine Userliste so, dass für Nicht-Owner alle hidden user fehlen. */
export function filterVisibleUsers<T extends VisibilityTarget>(
  users: T[],
  viewer: VisibilityViewer | null | undefined,
): T[] {
  if (isOwnerViewer(viewer)) return users
  return users.filter((u) => !isHiddenUser(u))
}

/**
 * Liefert den Actor (Bearbeiter) eines Logs/Datensatzes anonymisiert.
 * Für Nicht-Owner: hidden actor → null (vollständig entfernt).
 */
export function anonymizeActor<
  T extends { id: string; role?: RoleName | string; hidden?: boolean | null } | null,
>(actor: T, viewer: VisibilityViewer | null | undefined): T | null {
  if (!actor) return actor
  // Wenn wir keinen Rollen-Hinweis am actor haben, prüfen wir per ID-Fallback.
  const target: VisibilityTarget = {
    id: actor.id,
    role: (actor.role as RoleName) ?? 'READ_ONLY',
    hidden: actor.hidden ?? null,
  }
  if (isVisibleToViewer(target, viewer)) return actor
  return null
}

/**
 * Filtert Audit-Log-Zeilen für Nicht-Owner. Entfernt alle Einträge,
 * deren `userId` einem hidden user gehört.
 *
 * @param hiddenUserIds Set der IDs, die für den Viewer unsichtbar sind.
 */
export function filterAuditLogsForViewer<T extends { userId: string | null }>(
  logs: T[],
  viewer: VisibilityViewer | null | undefined,
  hiddenUserIds: Set<string>,
): T[] {
  if (isOwnerViewer(viewer)) return logs
  if (hiddenUserIds.size === 0) return logs
  return logs.filter((l) => !l.userId || !hiddenUserIds.has(l.userId))
}
