/**
 * Verständliche deutsche Kurztexte für Audit-Events.
 * Niemals rohe technische Aktion/Entity-Strings anzeigen.
 */


function metaString(metadata: unknown): string {
  if (!metadata || typeof metadata !== 'object') return ''
  const o = metadata as Record<string, unknown>
  if (o.fullName) return String(o.fullName)
  if (o.name) return String(o.name)
  if (o.title) return String(o.title)
  if (o.fromStatus && o.toStatus) return ''
  return ''
}

/**
 * Liefert eine einzeilige, menschenlesbare Beschreibung.
 */
export function formatAuditEventDescription(
  action: string,
  entityType: string,
  metadata: unknown,
): string {
  const a = (action || '').toLowerCase()
  const e = (entityType || '').toLowerCase()
  const detail = metaString(metadata)

  // Klar definierte Kombinationen
  if (a === 'create' && e === 'inquiry') {
    return detail
      ? `Neue Anfrage eingegangen: ${detail}`
      : 'Neue Anfrage eingegangen'
  }
  if (a === 'status_change' && e === 'inquiry') {
    return 'Anfragestatus geändert'
  }
  if (a === 'create' && e === 'applicant') {
    return detail
      ? `Neue Bewerbung eingegangen: ${detail}`
      : 'Neue Bewerbung eingegangen'
  }
  if (a === 'status_change' && e === 'applicant') {
    return 'Bewerbungsstatus geändert'
  }
  if (a === 'create' && e === 'anamnese_submission') {
    return detail
      ? `Neuer Anamnesebogen: ${detail}`
      : 'Neuer Anamnesebogen eingegangen'
  }
  if (a === 'status_change' && e === 'anamnese_submission') {
    return 'Anamnese-Status geändert'
  }
  if (a === 'assign' && e === 'anamnese_submission') {
    return 'Anamnesebogen zugewiesen'
  }
  if (a === 'delete' && e === 'document') {
    return 'Dokument entfernt'
  }
  if (a === 'create' && e === 'job_posting') {
    return 'Stellenanzeige erstellt'
  }
  if (a === 'update' && e === 'job_posting') {
    return 'Stellenanzeige aktualisiert'
  }
  if (a === 'note_added' && e === 'inquiry') {
    return 'Notiz bei Anfrage hinzugefügt'
  }
  if (a === 'note_added' && e === 'applicant') {
    return 'Notiz bei Bewerbung hinzugefügt'
  }
  if (a === 'assign' && e === 'inquiry') {
    return 'Anfrage zugewiesen'
  }
  if (a === 'assign' && e === 'applicant') {
    return 'Bewerbung zugewiesen'
  }
  if (a === 'login' && e === 'user') {
    return 'Anmeldung im System'
  }
  if (a === 'password_change' && e === 'user') {
    return 'Passwort geändert'
  }
  if (a === 'settings_update' && e === 'setting') {
    return 'Systemeinstellung angepasst'
  }
  if (a === 'update' && e === 'user') {
    return 'Benutzerkonto geändert'
  }
  if (a === 'create' && e === 'user') {
    return 'Neuer Benutzer angelegt'
  }
  if (a === 'delete' && e === 'inquiry') {
    return 'Anfrage entfernt'
  }
  if (a === 'delete' && e === 'applicant') {
    return 'Bewerbung entfernt'
  }
  if (a === 'update' && e === 'content_block') {
    return 'Inhalt bearbeitet'
  }
  if (a === 'update' && (e === 'inquiry' || e === 'applicant')) {
    return e === 'inquiry' ? 'Anfrage bearbeitet' : 'Bewerbung bearbeitet'
  }

  // Rückfallebene: nur freundliche Sammelbegriffe, keine Roh-IDs
  const entityGloss: Record<string, string> = {
    inquiry: 'Anfrage',
    applicant: 'Bewerbung',
    job_posting: 'Stelle',
    user: 'Benutzer',
    document: 'Dokument',
    content_block: 'Inhalt',
    setting: 'Einstellung',
  }
  const actGloss: Record<string, string> = {
    create: 'Neu',
    update: 'Bearbeitung',
    delete: 'Entfernung',
    status_change: 'Status',
    note_added: 'Notiz',
    assign: 'Zuordnung',
    upload: 'Upload',
    download: 'Download',
    role_change: 'Rolle',
  }
  const eg = entityGloss[e] ?? 'Eintrag'
  const ag = actGloss[a] ?? 'Ereignis'
  return `${eg}: ${ag}`
}
