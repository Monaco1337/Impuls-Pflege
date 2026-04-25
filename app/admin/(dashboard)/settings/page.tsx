import { Metadata } from 'next'
import Link from 'next/link'
import {
  Users,
  History,
  Bell,
  UserCircle,
  Server,
  ArrowUpRight,
} from 'lucide-react'
import { getCurrentUser } from '@/lib/auth/session'
import { hasPermission } from '@/lib/rbac/permissions'
import type { RoleName } from '@/lib/types/enums'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Einstellungen',
}

export const dynamic = 'force-dynamic'

type CardDef = {
  href: string
  title: string
  desc: string
  icon: React.ElementType
  can: (r: RoleName) => boolean
  accent: 'mint' | 'soft' | 'rose'
}

const cards: CardDef[] = [
  {
    href: '/admin/settings/users',
    title: 'Benutzer & Rollen',
    desc: 'Team, Zugänge und Berechtigungen verwalten',
    icon: Users,
    can: (r) => hasPermission(r, 'users', 'view'),
    accent: 'mint',
  },
  {
    href: '/admin/settings/activity',
    title: 'Aktivitätsprotokoll',
    desc: 'Wichtige Vorgänge nachvollziehen, ohne technische Details',
    icon: History,
    can: (r) => hasPermission(r, 'activity', 'view'),
    accent: 'soft',
  },
  {
    href: '/admin/settings/notifications',
    title: 'Benachrichtigungen',
    desc: 'Eingang von Anfragen & Bewerbungen in der Leiste',
    icon: Bell,
    can: (r) => hasPermission(r, 'settings', 'view'),
    accent: 'rose',
  },
  {
    href: '/admin/settings/profile',
    title: 'Profil & Sicherheit',
    desc: 'Passwort und Anzeigedaten Ihres Zugangs',
    icon: UserCircle,
    can: (r) => hasPermission(r, 'settings', 'view'),
    accent: 'soft',
  },
  {
    href: '/admin/settings/system',
    title: 'System',
    desc: 'Organisation & Kontaktdaten für Kundenkanäle',
    icon: Server,
    can: (r) => hasPermission(r, 'settings', 'view'),
    accent: 'mint',
  },
]

export default async function SettingsHubPage() {
  const user = await getCurrentUser()
  if (!user) return null
  const role = user.role as RoleName
  const visible = cards.filter((c) => c.can(role))

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-warm-200/60 bg-gradient-to-br from-primary-50/50 via-white to-rose-50/30 p-6 shadow-sm sm:p-8">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary-200/25 blur-3xl"
          aria-hidden
        />
        <h2 className="text-xl font-semibold tracking-tight text-warm-900 sm:text-2xl">
          Einstellungen
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-warm-600">
          Bereiche, die seltener gebraucht werden: Team, Protokoll, Sicherheit und
          Systemdaten – übersichtlich gegliedert, weg vom Tagesgeschäft.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {visible.map((c) => {
          const Icon = c.icon
          return (
            <li key={c.href}>
              <Link
                href={c.href}
                className={cn(
                  'group flex h-full min-h-[7.5rem] flex-col rounded-2xl border p-5 transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-2',
                  c.accent === 'mint' &&
                    'border-primary-100/80 bg-gradient-to-b from-primary-50/30 to-white hover:border-primary-200 hover:shadow-md',
                  c.accent === 'soft' &&
                    'border-warm-200/60 bg-white hover:border-warm-300/80 hover:shadow-md',
                  c.accent === 'rose' &&
                    'border-rose-100/80 bg-gradient-to-b from-rose-50/20 to-white hover:border-rose-200/60 hover:shadow-md',
                )}
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-xl',
                      c.accent === 'mint' && 'bg-primary-100/80 text-primary-700',
                      c.accent === 'soft' && 'bg-warm-100/90 text-warm-600',
                      c.accent === 'rose' && 'bg-rose-100/70 text-rose-600',
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-warm-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-500"
                    aria-hidden
                  />
                </div>
                <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-warm-900 group-hover:text-primary-800">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-warm-500 line-clamp-2">
                  {c.desc}
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
