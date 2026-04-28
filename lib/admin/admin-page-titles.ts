/**
 * Titel in der oberen Admin-Leiste (Header), passend zur aktuellen Route.
 */

const EXACT: Record<string, string> = {
  '/admin/dashboard': 'Übersicht',
  '/admin/inquiries': 'Anfragen',
  '/admin/anamnese': 'Anamnesebögen',
  '/admin/anamnese-ergaenzung': 'Anamnese-Ergänzung',
  '/admin/applicants': 'Bewerbungen',
  '/admin/jobs': 'Stellenangebote',
  '/admin/content': 'Inhalte',
  '/admin/files': 'Dokumente',
  '/admin/settings': 'Einstellungen',
  '/admin/users': 'Benutzer & Rollen',
  '/admin/activity': 'Aktivitätsprotokoll',
  '/admin/settings/users': 'Benutzer & Rollen',
  '/admin/settings/activity': 'Aktivitätsprotokoll',
  '/admin/settings/notifications': 'Benachrichtigungen',
  '/admin/settings/profile': 'Profil & Sicherheit',
  '/admin/settings/system': 'System & Organisation',
}

const PREFIX: { prefix: string; title: string }[] = [
  { prefix: '/admin/settings/users/', title: 'Benutzer & Rollen' },
  { prefix: '/admin/users/', title: 'Benutzer & Rollen' },
  { prefix: '/admin/applicants/', title: 'Bewerbung' },
  { prefix: '/admin/anamnese-ergaenzung/', title: 'Anamnese-Ergänzung' },
  { prefix: '/admin/anamnese/', title: 'Anamnese' },
  { prefix: '/admin/inquiries/', title: 'Anfrage' },
  { prefix: '/admin/jobs/', title: 'Stellenangebot' },
  { prefix: '/admin/content', title: 'Inhalte' },
]

export function getAdminPageTitle(pathname: string): string {
  if (EXACT[pathname]) return EXACT[pathname]!
  const sorted = [...PREFIX].sort((a, b) => b.prefix.length - a.prefix.length)
  for (const { prefix, title } of sorted) {
    if (pathname.startsWith(prefix)) return title
  }
  return 'Admin'
}
