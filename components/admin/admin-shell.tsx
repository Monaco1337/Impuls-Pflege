'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAdminInbox } from '@/components/admin/use-admin-inbox'
import { InboxBellDropdown } from '@/components/admin/inbox-bell-dropdown'
import { LogoutConfirmButton } from '@/components/admin/logout-confirm-button'
import { getAdminPageTitle } from '@/lib/admin/admin-page-titles'
import {
  LayoutGrid,
  MessageSquare,
  UserPlus,
  Briefcase,
  FileText,
  FolderOpen,
  Settings,
  Menu,
  X,
} from 'lucide-react'
import type { RoleName } from '@/lib/types/enums'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/logo'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { hasPermission, getRoleLabel } from '@/lib/rbac/permissions'
import type { Resource } from '@/lib/rbac/permissions'

interface AdminUser {
  id: string
  name: string
  firstName: string
  lastName: string
  email: string
  role: RoleName
}

interface AdminShellProps {
  user: AdminUser
  children: React.ReactNode
}

const INQ_INBOX = '/admin/inquiries?status=NEU' as const
const APP_INBOX = '/admin/applicants?status=NEU_EINGEGANGEN' as const

const navItems: {
  label: string
  href: string
  icon: React.ElementType
  resource: Resource
  inbox?: 'inquiries' | 'applicants'
}[] = [
  { label: 'Übersicht', href: '/admin/dashboard', icon: LayoutGrid, resource: 'dashboard' },
  { label: 'Anfragen', href: '/admin/inquiries', icon: MessageSquare, resource: 'inquiries', inbox: 'inquiries' },
  { label: 'Bewerbungen', href: '/admin/applicants', icon: UserPlus, resource: 'applicants', inbox: 'applicants' },
  { label: 'Stellenangebote', href: '/admin/jobs', icon: Briefcase, resource: 'jobs' },
  { label: 'Inhalte', href: '/admin/content', icon: FileText, resource: 'content' },
  { label: 'Dokumente', href: '/admin/files', icon: FolderOpen, resource: 'files' },
  { label: 'Einstellungen', href: '/admin/settings', icon: Settings, resource: 'settings' },
]

function hrefForInbox(
  item: (typeof navItems)[number],
  newInquiries: number,
  newApplicants: number,
) {
  if (item.inbox === 'inquiries' && newInquiries > 0) return INQ_INBOX
  if (item.inbox === 'applicants' && newApplicants > 0) return APP_INBOX
  return item.href
}

function navActive(pathname: string, item: (typeof navItems)[number]): boolean {
  if (item.href === '/admin/settings') {
    return pathname === '/admin/settings' || pathname.startsWith('/admin/settings/')
  }
  if (item.href === '/admin/dashboard') {
    return pathname === item.href
  }
  return pathname === item.href || pathname.startsWith(item.href + '/')
}

export function AdminShell({ user, children }: AdminShellProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const {
    counts,
    ready: inboxReady,
    acknowledgeInquiries,
    acknowledgeApplicants,
  } = useAdminInbox()

  const visibleItems = navItems.filter((item) =>
    hasPermission(user.role, item.resource, 'view'),
  )

  const pageTitle = getAdminPageTitle(pathname)

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8faf9]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/25 backdrop-blur-[2px] transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[min(19rem,88vw)] flex-col border-r border-slate-200/80 bg-white shadow-[4px_0_24px_-8px_rgba(15,23,42,0.08)] transition-transform duration-300 ease-out lg:static lg:w-[17.5rem] lg:translate-x-0 lg:shadow-none',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100/90 px-4 sm:px-5">
          <Link href="/admin/dashboard" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-2 rounded-md" onClick={() => setSidebarOpen(false)}>
            <Logo size="sm" />
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 lg:hidden"
            aria-label="Seitenleiste schließen"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="shrink-0 px-4 pt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:px-5">
          Arbeitsbereich
        </p>

        <nav className="mt-1 flex-1 overflow-y-auto px-2.5 py-2 sm:px-3" aria-label="Hauptnavigation">
          <ul className="space-y-0.5">
            {visibleItems.map((item) => {
              const href = hrefForInbox(item, counts.newInquiries, counts.newApplicants)
              const isActive = navActive(pathname, item)
              const Icon = item.icon
              const navCount =
                item.inbox === 'inquiries'
                  ? counts.newInquiries
                  : item.inbox === 'applicants'
                    ? counts.newApplicants
                    : 0
              const showBadge = inboxReady && item.inbox && navCount > 0

              const onNavClick = () => {
                setSidebarOpen(false)
                if (item.inbox === 'inquiries' && counts.newInquiries > 0) {
                  void acknowledgeInquiries()
                } else if (item.inbox === 'applicants' && counts.newApplicants > 0) {
                  void acknowledgeApplicants()
                }
              }

              return (
                <li key={item.href}>
                  <Link
                    href={href}
                    onClick={onNavClick}
                    className={cn(
                      'group flex min-h-[2.75rem] items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium transition-all duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-2',
                      isActive
                        ? 'bg-gradient-to-r from-primary-50 to-primary-50/20 text-primary-800 shadow-sm ring-1 ring-primary-100/70'
                        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900',
                    )}
                    title={
                      showBadge
                        ? (() => {
                            const n = navCount
                            if (item.inbox === 'inquiries') {
                              return `${n} ${n === 1 ? 'neue Anfrage' : 'neue Anfragen'}`
                            }
                            return `${n} ${n === 1 ? 'neue Bewerbung' : 'neue Bewerbungen'}`
                          })()
                        : undefined
                    }
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={
                      showBadge
                        ? `${item.label}, ${navCount} neue Eingänge`
                        : item.label
                    }
                  >
                    <span
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors',
                        isActive
                          ? 'bg-primary-100/90 text-primary-700'
                          : 'bg-slate-100/80 text-slate-500 group-hover:bg-slate-200/60 group-hover:text-slate-700',
                      )}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1 leading-snug">{item.label}</span>
                    {showBadge && (
                      <span
                        className={cn(
                          'shrink-0 tabular-nums',
                          'inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-md px-1.5',
                          'bg-gradient-to-b from-rose-500 to-rose-600 text-[10px] font-bold leading-none text-white shadow-sm ring-1 ring-rose-400/30',
                        )}
                        aria-hidden
                      >
                        {navCount > 9 ? '9+' : navCount}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="shrink-0 space-y-2 border-t border-slate-100/90 p-3 sm:p-4">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200/60 bg-gradient-to-b from-slate-50/80 to-white p-2.5 shadow-sm">
            <Avatar name={user.name} size="md" className="shrink-0 ring-2 ring-white" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{user.name}</p>
              <p className="truncate text-xs text-slate-500">{getRoleLabel(user.role)}</p>
            </div>
          </div>
          <LogoutConfirmButton />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200/60 bg-white/90 px-3 shadow-sm backdrop-blur-sm sm:px-5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 lg:hidden"
              aria-label="Menü öffnen"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="truncate text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
              {pageTitle}
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <InboxBellDropdown
              userRole={user.role}
              newInquiries={counts.newInquiries}
              newApplicants={counts.newApplicants}
              liveReady={inboxReady}
              onAckInquiries={acknowledgeInquiries}
              onAckApplicants={acknowledgeApplicants}
            />
            <Badge variant="primary" className="hidden sm:inline-flex">
              {getRoleLabel(user.role)}
            </Badge>
            <span className="hidden max-w-[8rem] truncate text-sm text-slate-500 md:inline">
              {user.name}
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
