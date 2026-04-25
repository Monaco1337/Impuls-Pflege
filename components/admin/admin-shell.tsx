'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAdminInbox } from '@/components/admin/use-admin-inbox'
import { InboxBellDropdown } from '@/components/admin/inbox-bell-dropdown'
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Briefcase,
  FileText,
  UserCog,
  FolderOpen,
  Clock,
  Settings,
  LogOut,
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
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, resource: 'dashboard' },
  { label: 'Anfragen', href: '/admin/inquiries', icon: MessageSquare, resource: 'inquiries', inbox: 'inquiries' },
  { label: 'Bewerber', href: '/admin/applicants', icon: Users, resource: 'applicants', inbox: 'applicants' },
  { label: 'Stellenanzeigen', href: '/admin/jobs', icon: Briefcase, resource: 'jobs' },
  { label: 'Inhalte', href: '/admin/content', icon: FileText, resource: 'content' },
  { label: 'Benutzer', href: '/admin/users', icon: UserCog, resource: 'users' },
  { label: 'Dokumente', href: '/admin/files', icon: FolderOpen, resource: 'files' },
  { label: 'Aktivitätslog', href: '/admin/activity', icon: Clock, resource: 'activity' },
  { label: 'Einstellungen', href: '/admin/settings', icon: Settings, resource: 'settings' },
]

function getPageTitle(pathname: string): string {
  const item = navItems.find((n) => pathname.startsWith(n.href))
  return item?.label ?? 'Admin'
}

function hrefForInbox(
  item: (typeof navItems)[number],
  newInquiries: number,
  newApplicants: number,
) {
  if (item.inbox === 'inquiries' && newInquiries > 0) return INQ_INBOX
  if (item.inbox === 'applicants' && newApplicants > 0) return APP_INBOX
  return item.href
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

  const pageTitle = getPageTitle(pathname)

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-warm-900/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-warm-200 bg-warm-50 transition-transform duration-200 lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between border-b border-warm-200 px-5">
          <Logo size="sm" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1.5 text-warm-400 hover:bg-warm-100 hover:text-warm-600 lg:hidden"
            aria-label="Seitenleiste schließen"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {visibleItems.map((item) => {
              const href = hrefForInbox(item, counts.newInquiries, counts.newApplicants)
              const isActive =
                item.href === '/admin/dashboard'
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(item.href + '/')
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
                      'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150',
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-warm-600 hover:bg-warm-100 hover:text-warm-900',
                    )}
                    title={
                      showBadge
                        ? (() => {
                            const n = navCount
                            if (item.inbox === 'inquiries') {
                              return `${n} ${n === 1 ? 'neue Anfrage' : 'neue Anfragen'} (gefiltert)`
                            }
                            return `${n} ${n === 1 ? 'neue Bewerbung' : 'neue Bewerbungen'} (gefiltert)`
                          })()
                        : undefined
                    }
                    aria-label={
                      showBadge
                        ? `${item.label}, ${navCount} neue Eingänge`
                        : item.label
                    }
                  >
                    <Icon
                      className={cn(
                        'h-[18px] w-[18px] shrink-0',
                        isActive ? 'text-primary-500' : 'text-warm-400 group-hover:text-warm-500',
                      )}
                    />
                    <span className="min-w-0 flex-1 leading-snug">{item.label}</span>
                    {showBadge && (
                      <span
                        className={cn(
                          'shrink-0 tabular-nums',
                          'inline-flex h-5 min-w-[1.5rem] items-center justify-center rounded-md px-1.5',
                          'bg-rose-500 text-[11px] font-semibold leading-none text-white shadow-sm',
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

        {/* Sidebar footer — user info */}
        <div className="border-t border-warm-200 px-4 py-4">
          <div className="flex items-center gap-3">
            <Avatar name={user.name} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-warm-900">
                {user.name}
              </p>
              <p className="truncate text-xs text-warm-500">
                {getRoleLabel(user.role)}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-warm-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-md p-1.5 text-warm-400 hover:bg-warm-50 hover:text-warm-600 lg:hidden"
              aria-label="Seitenleiste öffnen"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold text-warm-900">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
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
            <span className="hidden text-sm text-warm-600 sm:inline">
              {user.name}
            </span>
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="rounded-md p-2 text-warm-400 transition-colors hover:bg-warm-50 hover:text-warm-600"
                aria-label="Abmelden"
                title="Abmelden"
              >
                <LogOut className="h-[18px] w-[18px]" />
              </button>
            </form>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
