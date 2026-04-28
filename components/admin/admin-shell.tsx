'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAdminInbox } from '@/components/admin/use-admin-inbox'
import { InboxBellDropdown } from '@/components/admin/inbox-bell-dropdown'
import { LogoutConfirmButton } from '@/components/admin/logout-confirm-button'
import { getAdminPageTitle } from '@/lib/admin/admin-page-titles'
import {
  LayoutGrid,
  MessageSquare,
  Stethoscope,
  ClipboardCheck,
  UserPlus,
  Briefcase,
  FileText,
  FolderOpen,
  Settings,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
} from 'lucide-react'
import type { RoleName } from '@/lib/types/enums'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/logo'
import { Avatar } from '@/components/ui/avatar'
import { hasPermission, isFullSettingsAdmin } from '@/lib/rbac/permissions'
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
const ANAM_INBOX = '/admin/anamnese?status=NEU_EINGEGANGEN' as const

const SIDEBAR_COLLAPSED_KEY = 'impuls-admin-sidebar-collapsed'
const SETTINGS_PROFILE_HREF = '/admin/settings/profile' as const

const navItems: {
  label: string
  href: string
  icon: React.ElementType
  resource: Resource
  inbox?: 'inquiries' | 'applicants' | 'anamnese'
}[] = [
  { label: 'Übersicht', href: '/admin/dashboard', icon: LayoutGrid, resource: 'dashboard' },
  { label: 'Anfragen', href: '/admin/inquiries', icon: MessageSquare, resource: 'inquiries', inbox: 'inquiries' },
  { label: 'Anamnese', href: '/admin/anamnese', icon: Stethoscope, resource: 'anamnese', inbox: 'anamnese' },
  { label: 'Anamnese-Ergänzung', href: '/admin/anamnese-ergaenzung', icon: ClipboardCheck, resource: 'anamnese' },
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
  newAnamnese: number,
) {
  if (item.inbox === 'inquiries' && newInquiries > 0) return INQ_INBOX
  if (item.inbox === 'applicants' && newApplicants > 0) return APP_INBOX
  if (item.inbox === 'anamnese' && newAnamnese > 0) return ANAM_INBOX
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarPrefsHydrated, setSidebarPrefsHydrated] = useState(false)
  const {
    counts,
    ready: inboxReady,
    acknowledgeInquiries,
    acknowledgeApplicants,
    acknowledgeAnamnese,
  } = useAdminInbox()

  useEffect(() => {
    let collapsed = false
    try {
      if (typeof window !== 'undefined' && localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === '1') {
        collapsed = true
      }
    } catch {
      /* ignore */
    }
    setSidebarCollapsed(collapsed)
    setSidebarPrefsHydrated(true)
  }, [])

  useEffect(() => {
    if (!sidebarPrefsHydrated) return
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, sidebarCollapsed ? '1' : '0')
      }
    } catch {
      /* ignore */
    }
  }, [sidebarCollapsed, sidebarPrefsHydrated])

  const fullSettingsAdmin = isFullSettingsAdmin({ id: user.id, role: user.role })
  const visibleItems = navItems.filter((item) => {
    if (!hasPermission(user.role, item.resource, 'view')) return false
    if (item.href === '/admin/settings' && !fullSettingsAdmin) return false
    return true
  })

  const canOpenProfile = hasPermission(user.role, 'settings', 'view')
  const profileActive =
    pathname === SETTINGS_PROFILE_HREF ||
    pathname === `${SETTINGS_PROFILE_HREF}/`

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
          'fixed inset-y-0 left-0 z-50 flex w-[min(19rem,88vw)] flex-col border-r border-slate-200/80 bg-white shadow-[4px_0_24px_-8px_rgba(15,23,42,0.08)] transition-[transform,width] duration-300 ease-out lg:static lg:translate-x-0 lg:shadow-none',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          sidebarCollapsed ? 'lg:w-[4.25rem] lg:min-w-[4.25rem]' : 'lg:w-[17.5rem]',
        )}
      >
        <div
          className={cn(
            'flex h-16 shrink-0 items-center border-b border-slate-100/90 px-4 sm:px-5 lg:px-3',
            sidebarCollapsed ? 'lg:justify-center' : 'justify-between',
          )}
        >
          <Link
            href="/admin/dashboard"
            className={cn(
              'block shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-2',
              sidebarCollapsed && 'lg:hidden',
            )}
            onClick={() => setSidebarOpen(false)}
          >
            <Logo size="sm" />
          </Link>

          <button
            type="button"
            onClick={() => setSidebarCollapsed(false)}
            className={cn(
              'hidden rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30',
              sidebarCollapsed && 'lg:flex',
            )}
            aria-label="Navigation ausklappen"
          >
            <PanelLeftOpen className="h-5 w-5" strokeWidth={1.75} />
          </button>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 lg:hidden"
            aria-label="Seitenleiste schließen"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => setSidebarCollapsed(true)}
            className={cn(
              'hidden rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30',
              !sidebarCollapsed && 'lg:flex',
            )}
            aria-label="Navigation einklappen"
          >
            <PanelLeftClose className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <p
          className={cn(
            'shrink-0 px-4 pt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:px-5 lg:px-3',
            sidebarCollapsed && 'lg:hidden',
          )}
        >
          Arbeitsbereich
        </p>

        <nav
          className={cn(
            'mt-1 flex-1 overflow-y-auto px-2.5 py-2 sm:px-3 lg:px-2',
            sidebarCollapsed && 'lg:px-1.5',
          )}
          aria-label="Hauptnavigation"
        >
          <ul className="space-y-0.5">
            {visibleItems.map((item) => {
              const href = hrefForInbox(
                item,
                counts.newInquiries,
                counts.newApplicants,
                counts.newAnamnese,
              )
              const isActive = navActive(pathname, item)
              const Icon = item.icon
              const navCount =
                item.inbox === 'inquiries'
                  ? counts.newInquiries
                  : item.inbox === 'applicants'
                    ? counts.newApplicants
                    : item.inbox === 'anamnese'
                      ? counts.newAnamnese
                      : 0
              const showBadge = inboxReady && item.inbox && navCount > 0

              const onNavClick = () => {
                setSidebarOpen(false)
                if (item.inbox === 'inquiries' && counts.newInquiries > 0) {
                  void acknowledgeInquiries()
                } else if (item.inbox === 'applicants' && counts.newApplicants > 0) {
                  void acknowledgeApplicants()
                } else if (item.inbox === 'anamnese' && counts.newAnamnese > 0) {
                  void acknowledgeAnamnese()
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
                      sidebarCollapsed && 'lg:justify-center lg:gap-0 lg:px-1.5',
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
                            if (item.inbox === 'anamnese') {
                              return `${n} ${n === 1 ? 'neuer Anamnesebogen' : 'neue Anamnesebögen'}`
                            }
                            return `${n} ${n === 1 ? 'neue Bewerbung' : 'neue Bewerbungen'}`
                          })()
                        : item.label
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
                        'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors',
                        isActive
                          ? 'bg-primary-100/90 text-primary-700'
                          : 'bg-slate-100/80 text-slate-500 group-hover:bg-slate-200/60 group-hover:text-slate-700',
                      )}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                      {showBadge && sidebarCollapsed && (
                        <span
                          className="absolute -right-0.5 -top-0.5 hidden h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white lg:block"
                          aria-hidden
                        />
                      )}
                    </span>
                    <span
                      className={cn(
                        'min-w-0 flex-1 leading-snug',
                        sidebarCollapsed && 'lg:sr-only lg:w-0 lg:overflow-hidden lg:p-0',
                      )}
                    >
                      {item.label}
                    </span>
                    {showBadge && (
                      <span
                        className={cn(
                          'shrink-0 tabular-nums',
                          'inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-md px-1.5',
                          'bg-gradient-to-b from-rose-500 to-rose-600 text-[10px] font-bold leading-none text-white shadow-sm ring-1 ring-rose-400/30',
                          sidebarCollapsed && 'lg:hidden',
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

        <div
          className={cn(
            'shrink-0 space-y-2 border-t border-slate-100/90 p-3 sm:p-4',
            sidebarCollapsed && 'lg:space-y-2 lg:p-2',
          )}
        >
          {canOpenProfile ? (
            <Link
              href={SETTINGS_PROFILE_HREF}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'group flex w-full items-center gap-3 rounded-xl border p-2.5 shadow-sm transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/35 focus-visible:ring-offset-2',
                sidebarCollapsed && 'lg:flex-col lg:justify-center lg:gap-2 lg:p-2',
                profileActive
                  ? 'border-primary-200/70 bg-gradient-to-b from-primary-50/95 to-white ring-1 ring-primary-100/80'
                  : 'border-slate-200/60 bg-gradient-to-b from-slate-50/80 to-white hover:border-primary-200/55 hover:shadow-md hover:ring-1 hover:ring-primary-100/50',
              )}
              aria-label={`Profil und Sicherheit für ${user.firstName}`}
              title={
                sidebarCollapsed
                  ? `Profil · Hallo, ${user.firstName}`
                  : 'Profil und Sicherheit öffnen'
              }
            >
              <Avatar name={user.name} size="md" className="shrink-0 ring-2 ring-white" />
              <div className={cn('min-w-0 flex-1 text-left', sidebarCollapsed && 'lg:hidden')}>
                <p className="truncate text-sm font-semibold text-slate-900">
                  Hallo, {user.firstName}
                </p>
                <p
                  className={cn(
                    'mt-0.5 truncate text-[11px] font-medium transition-colors',
                    profileActive
                      ? 'text-primary-700'
                      : 'text-slate-400 group-hover:text-primary-600',
                  )}
                >
                  Profil & Sicherheit
                </p>
              </div>
              <ChevronRight
                className={cn(
                  'h-4 w-4 shrink-0 text-slate-300 transition-all duration-200',
                  'opacity-0 group-hover:translate-x-0.5 group-hover:text-primary-600 group-hover:opacity-100',
                  profileActive && 'text-primary-600 opacity-100',
                  sidebarCollapsed && 'lg:hidden',
                )}
                strokeWidth={2}
                aria-hidden
              />
            </Link>
          ) : (
            <div
              className={cn(
                'flex items-center gap-3 rounded-xl border border-slate-200/60 bg-gradient-to-b from-slate-50/80 to-white p-2.5 shadow-sm',
                sidebarCollapsed && 'lg:flex-col lg:justify-center lg:gap-2 lg:p-2',
              )}
              title={sidebarCollapsed ? `Hallo, ${user.firstName}` : undefined}
            >
              <Avatar name={user.name} size="md" className="shrink-0 ring-2 ring-white" />
              <div className={cn('min-w-0 flex-1', sidebarCollapsed && 'lg:hidden')}>
                <p className="truncate text-sm font-semibold text-slate-900">
                  Hallo, {user.firstName}
                </p>
              </div>
            </div>
          )}
          <LogoutConfirmButton compact={sidebarCollapsed} />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="relative z-40 flex h-16 shrink-0 items-center justify-between border-b border-slate-200/60 bg-white/90 px-3 shadow-sm backdrop-blur-sm sm:px-5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 lg:hidden"
              aria-label="Menü öffnen"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setSidebarCollapsed(false)}
              className={cn(
                'hidden rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30',
                sidebarCollapsed && 'lg:inline-flex',
              )}
              aria-label="Navigation ausklappen"
              title="Navigation ausklappen"
            >
              <PanelLeftOpen className="h-5 w-5" strokeWidth={1.75} />
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
              newAnamnese={counts.newAnamnese}
              liveReady={inboxReady}
              onAckInquiries={acknowledgeInquiries}
              onAckApplicants={acknowledgeApplicants}
              onAckAnamnese={acknowledgeAnamnese}
            />
            <span className="hidden max-w-[10rem] truncate text-sm text-slate-600 md:inline">
              Hallo, {user.firstName}
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
