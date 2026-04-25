'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutGrid,
  Users,
  History,
  Bell,
  UserCircle,
  Server,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { hasPermission, type Resource } from '@/lib/rbac/permissions'
import type { RoleName } from '@/lib/types/enums'

type SubItem = {
  href: string
  label: string
  icon: React.ElementType
  resource: Resource
  exact?: boolean
}

const subItems: SubItem[] = [
  { href: '/admin/settings', label: 'Start', icon: LayoutGrid, resource: 'settings', exact: true },
  { href: '/admin/settings/users', label: 'Benutzer & Rollen', icon: Users, resource: 'users' },
  { href: '/admin/settings/activity', label: 'Aktivitätsprotokoll', icon: History, resource: 'activity' },
  { href: '/admin/settings/notifications', label: 'Benachrichtigungen', icon: Bell, resource: 'settings' },
  { href: '/admin/settings/profile', label: 'Profil & Sicherheit', icon: UserCircle, resource: 'settings' },
  { href: '/admin/settings/system', label: 'System', icon: Server, resource: 'settings' },
]

function pathActive(pathname: string, item: SubItem): boolean {
  if (item.exact) {
    return pathname === item.href || pathname === `${item.href}/`
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`)
}

export function SettingsArea({
  userRole,
  children,
}: {
  userRole: RoleName
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const visible = subItems.filter((i) => hasPermission(userRole, i.resource, 'view'))

  return (
    <div className="flex min-h-0 flex-col gap-6 lg:flex-row lg:gap-8">
      <nav
        className="shrink-0 lg:w-56"
        aria-label="Bereich Einstellungen"
      >
        <p className="mb-2 px-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-warm-400">
          Einstellungen
        </p>
        <ul className="flex flex-row gap-1 overflow-x-auto pb-1 lg:flex-col lg:pb-0 lg:overflow-visible">
          {visible.map((item) => {
            const active = pathActive(pathname, item)
            const Icon = item.icon
            return (
              <li key={item.href} className="shrink-0 lg:shrink">
                <Link
                  href={item.href}
                  className={cn(
                    'group flex min-h-[2.5rem] items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-2',
                    active
                      ? 'bg-gradient-to-r from-primary-50 to-primary-50/30 text-primary-800 shadow-sm ring-1 ring-primary-100/80'
                      : 'text-warm-600 hover:bg-warm-50/90 hover:text-warm-900',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors',
                      active
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-warm-100/80 text-warm-400 group-hover:bg-warm-200/50 group-hover:text-warm-600',
                    )}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="min-w-0 pr-1 leading-snug">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="min-w-0 flex-1 pb-2">{children}</div>
    </div>
  )
}
