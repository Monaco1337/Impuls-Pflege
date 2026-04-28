'use client'

import Link from 'next/link'
import {
  MessageSquare,
  AlertCircle,
  UserPlus,
  Search,
  Calendar,
  Briefcase,
  ArrowRight,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import {
  InquiryStatusBadge,
  ApplicantStatusBadge,
  AnamneseStatusBadge,
} from '@/components/ui/status-badge'
import { hasPermission } from '@/lib/rbac/permissions'
import type { RoleName } from '@/lib/types/enums'
import {
  useDashboardStatsLive,
  type DashboardStatsLive,
} from '@/components/admin/use-dashboard-stats'

const kpiConfig: {
  key: string
  label: string
  icon: LucideIcon
  href: string
}[] = [
  { key: 'newInquiries', label: 'Neu • Anfragen', icon: MessageSquare, href: '/admin/inquiries?status=NEU' },
  { key: 'openInquiries', label: 'Offen • Anfragen', icon: AlertCircle, href: '/admin/inquiries' },
  { key: 'newApplicants', label: 'Neu • Bewerbungen', icon: UserPlus, href: '/admin/applicants?status=NEU_EINGEGANGEN' },
  { key: 'newAnamnese', label: 'Neu • Anamnese', icon: Stethoscope, href: '/admin/anamnese?status=NEU_EINGEGANGEN' },
  { key: 'inReview', label: 'In Prüfung', icon: Search, href: '/admin/applicants?status=IN_PRUEFUNG' },
  { key: 'interviewsPlanned', label: 'Gespräche', icon: Calendar, href: '/admin/applicants?status=GESPRAECH_GEPLANT' },
  { key: 'activeJobs', label: 'Aktive Stellen', icon: Briefcase, href: '/admin/jobs' },
]

const applicantPipelineStages: { key: string; label: string; className: string }[] = [
  { key: 'NEU_EINGEGANGEN', label: 'Neu', className: 'from-primary-500 to-primary-400' },
  { key: 'GESICHTET', label: 'Gesichtet', className: 'from-primary-400 to-cyan-400' },
  { key: 'IN_PRUEFUNG', label: 'Prüfung', className: 'from-amber-400 to-amber-300' },
  { key: 'INTERESSANT', label: 'Kandidat', className: 'from-emerald-500 to-emerald-400' },
  { key: 'GESPRAECH_GEPLANT', label: 'Gespräch', className: 'from-sky-500 to-sky-400' },
  { key: 'WARTELISTE', label: 'Warteliste', className: 'from-slate-400 to-slate-300' },
  { key: 'EINGESTELLT', label: 'Eingestellt', className: 'from-green-600 to-green-500' },
  { key: 'ABGELEHNT', label: 'Abgelehnt', className: 'from-rose-500 to-rose-400' },
]

const inquiryPipelineStages: { key: string; label: string; className: string }[] = [
  { key: 'NEU', label: 'Neu', className: 'from-primary-500 to-primary-400' },
  { key: 'IN_BEARBEITUNG', label: 'In Bearbeitung', className: 'from-cyan-500 to-cyan-400' },
  { key: 'RUECKRUF_GEPLANT', label: 'Rückruf', className: 'from-violet-500 to-violet-400' },
  { key: 'WARTET_AUF_RUECKMELDUNG', label: 'Rückmeldung', className: 'from-amber-500 to-amber-400' },
  { key: 'ERLEDIGT', label: 'Erledigt', className: 'from-emerald-600 to-emerald-500' },
  { key: 'ARCHIVIERT', label: 'Archiv', className: 'from-slate-400 to-slate-300' },
]

const anamnesePipelineStages: { key: string; label: string; className: string }[] = [
  { key: 'NEU_EINGEGANGEN', label: 'Neu', className: 'from-primary-500 to-primary-400' },
  { key: 'GESICHTET', label: 'Gesichtet', className: 'from-cyan-500 to-cyan-400' },
  { key: 'IN_BEARBEITUNG', label: 'In Bearb.', className: 'from-amber-500 to-amber-400' },
  { key: 'ERLEDIGT', label: 'Erledigt', className: 'from-emerald-600 to-emerald-500' },
  { key: 'ARCHIVIERT', label: 'Archiv', className: 'from-slate-400 to-slate-300' },
]

type Props = {
  firstName: string
  userRole: RoleName
  stats: Record<string, number> | undefined
  inquiryPipeline: Record<string, number>
  applicantPipeline: Record<string, number>
  anamnesePipeline: Record<string, number>
  inquiries: Array<{
    id: string
    fullName: string
    inquiryType: string
    status: string
    createdAt: string | Date
  }>
  applicants: Array<{
    id: string
    firstName: string
    lastName: string
    positionApplied: string
    status: string
    createdAt: string | Date
  }>
  anamnese: Array<{
    id: string
    patientFirstName: string
    patientLastName: string
    status: string
    createdAt: string | Date
  }>
}

type PipelineTheme = {
  /** Tailwind classes for the from→to gradient of the active progress fill */
  barGradient: string
  /** Soft glow shadow color (rgba) */
  glow: string
  /** Tailwind text color class for the status dot when active */
  dot: string
  /** Tailwind text color class for the hero stage emphasis */
  accent: string
  /** Soft tinted aura behind the card top-right */
  aura: string
}

const pipelineThemes = {
  inquiry: {
    barGradient: 'from-violet-500 via-indigo-500 to-indigo-400',
    glow: 'rgba(99, 102, 241, 0.35)',
    dot: 'bg-violet-500',
    accent: 'text-indigo-600',
    aura: 'bg-violet-200/40',
  },
  applicant: {
    barGradient: 'from-sky-500 via-cyan-500 to-cyan-400',
    glow: 'rgba(14, 165, 233, 0.32)',
    dot: 'bg-sky-500',
    accent: 'text-sky-600',
    aura: 'bg-sky-200/40',
  },
  anamnese: {
    barGradient: 'from-amber-500 via-orange-400 to-amber-300',
    glow: 'rgba(245, 158, 11, 0.32)',
    dot: 'bg-amber-500',
    accent: 'text-amber-600',
    aura: 'bg-amber-200/45',
  },
} satisfies Record<string, PipelineTheme>

type PipelineStage = { key: string; label: string }

/**
 * Stages that should be excluded when picking the "hero stage" — these are
 * end-states that don't reflect active operational load.
 */
const TERMINAL_STAGE_KEYS = new Set([
  'ERLEDIGT',
  'ARCHIVIERT',
  'EINGESTELLT',
  'ABGELEHNT',
])

function buildHeroPhrase(stageLabel: string, count: number): string {
  const map: Record<string, (n: number) => string> = {
    Rückruf: (n) => `${n} ${n === 1 ? 'Rückruf' : 'Rückrufe'} geplant`,
    Rückmeldung: (n) => `${n} ${n === 1 ? 'Rückmeldung' : 'Rückmeldungen'} offen`,
    'In Bearbeitung': (n) => `${n} in Bearbeitung`,
    'In Bearb.': (n) => `${n} in Bearbeitung`,
    Gespräch: (n) => `${n} ${n === 1 ? 'Gespräch' : 'Gespräche'} aktiv`,
    Prüfung: (n) => `${n} in Prüfung`,
    Neu: (n) => `${n} neu eingegangen`,
    Gesichtet: (n) => `${n} gesichtet`,
    Kandidat: (n) => `${n} ${n === 1 ? 'Kandidat' : 'Kandidaten'}`,
    Warteliste: (n) => `${n} auf Warteliste`,
  }
  const fn = map[stageLabel]
  return fn ? fn(count) : `${count} ${stageLabel}`
}

function PipelineCard({
  title,
  href,
  pipeline,
  stages,
  theme,
  emptyText,
}: {
  title: string
  href: string
  pipeline: Record<string, number>
  stages: PipelineStage[]
  theme: PipelineTheme
  emptyText: string
}) {
  const total = Object.values(pipeline).reduce((a, b) => a + b, 0)
  const active = stages
    .filter((s) => !TERMINAL_STAGE_KEYS.has(s.key))
    .reduce((sum, s) => sum + (pipeline[s.key] ?? 0), 0)

  // Hero stage = highest non-terminal count
  const heroStage = stages
    .filter((s) => !TERMINAL_STAGE_KEYS.has(s.key))
    .map((s) => ({ ...s, count: pipeline[s.key] ?? 0 }))
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count)[0]

  const isActive = active > 0
  const statusLabel = total === 0 ? 'Leer' : isActive ? 'Aktiv' : 'Ruhig'
  const statusDotClass =
    total === 0
      ? 'bg-slate-300'
      : isActive
        ? theme.dot
        : 'bg-emerald-500'

  const activePercent = total > 0 ? Math.min(100, (active / total) * 100) : 0

  const visibleStages = stages
    .map((s) => ({ ...s, count: pipeline[s.key] ?? 0 }))
    .filter((s) => s.count > 0)

  return (
    <Link
      href={href}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white',
        'px-5 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7',
        'shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_36px_-24px_rgba(15,23,42,0.14)]',
        'ring-1 ring-slate-900/[0.04]',
        'transition-all duration-300',
        'hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_28px_56px_-24px_rgba(15,23,42,0.22)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40',
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
      />
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500',
          theme.aura,
        )}
      />

      <div className="relative flex items-center justify-between gap-3">
        <h3 className="text-[13px] font-semibold tracking-tight text-slate-800">
          {title}
        </h3>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
          <span
            aria-hidden
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              statusDotClass,
              isActive && 'animate-pulse',
            )}
          />
          {statusLabel}
        </span>
      </div>

      {total === 0 ? (
        <p className="relative mt-6 py-4 text-[13px] text-slate-400">
          {emptyText}
        </p>
      ) : (
        <>
          <div className="relative mt-4 flex items-baseline gap-2">
            <span
              className={cn(
                'font-serif text-[2.5rem] font-light leading-none tabular-nums tracking-[-0.04em] sm:text-[2.75rem] lg:text-[3rem]',
                'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent',
              )}
              style={{
                fontFeatureSettings: '"lnum","tnum"',
                filter:
                  'drop-shadow(0 1px 0 rgba(255,255,255,0.9)) drop-shadow(0 6px 12px rgba(15,23,42,0.06))',
              }}
            >
              {heroStage?.count ?? 0}
            </span>
            <span className="text-[13px] leading-snug text-slate-500">
              {heroStage
                ? buildHeroPhrase(heroStage.label, heroStage.count).replace(
                    new RegExp(`^${heroStage.count}\\s*`),
                    '',
                  )
                : 'aktiv'}
            </span>
          </div>

          <div className="relative mt-5">
            <div
              className={cn(
                'relative h-2 overflow-hidden rounded-full bg-slate-100',
              )}
            >
              <div
                className={cn(
                  'absolute inset-y-0 left-0 rounded-full bg-gradient-to-r transition-[width] duration-700 ease-out',
                  theme.barGradient,
                )}
                style={{
                  width: `${activePercent}%`,
                  boxShadow: `0 0 12px 0 ${theme.glow}, 0 0 1px 0 ${theme.glow}`,
                }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/40 to-transparent"
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span className="tabular-nums">
                <span className="font-medium text-slate-600">{active}</span>
                {' / '}
                {total} aktiv
              </span>
              <span className={cn('font-medium', theme.accent)}>
                {Math.round(activePercent)}%
              </span>
            </div>
          </div>

          <div className="relative mt-5 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-slate-100 pt-4 text-[11px] text-slate-500">
            {visibleStages.map((stage) => (
              <span key={stage.key} className="inline-flex items-baseline gap-1.5">
                <span className="text-slate-500">{stage.label}</span>
                <span className="font-medium tabular-nums text-slate-800">
                  {stage.count}
                </span>
              </span>
            ))}
          </div>
        </>
      )}
    </Link>
  )
}

export function CommandCenter({
  firstName,
  userRole,
  stats,
  inquiryPipeline,
  applicantPipeline,
  anamnesePipeline,
  inquiries,
  applicants,
  anamnese,
}: Props) {
  void firstName
  const canAnamnese = hasPermission(userRole, 'anamnese', 'view')

  // Live-Stats mit serverseitigem Initial-Snapshot (kein Flash auf 0).
  const initialLive: DashboardStatsLive = {
    newInquiries: stats?.newInquiries ?? 0,
    openInquiries: stats?.openInquiries ?? 0,
    newApplicants: stats?.newApplicants ?? 0,
    newAnamnese: stats?.newAnamnese ?? 0,
    inReview: stats?.inReview ?? 0,
    interviewsPlanned: stats?.interviewsPlanned ?? 0,
    totalApplicants: stats?.totalApplicants ?? 0,
    activeJobs: stats?.activeJobs ?? 0,
    inquiryPipeline,
    applicantPipeline,
    anamnesePipeline,
  }
  const { stats: liveStats } = useDashboardStatsLive(initialLive)
  const liveInquiryPipeline = liveStats.inquiryPipeline
  const liveApplicantPipeline = liveStats.applicantPipeline
  const liveAnamnesePipeline = liveStats.anamnesePipeline
  const kpiRows = kpiConfig.filter(
    (row) => row.key !== 'newAnamnese' || canAnamnese,
  )
  const tasks: { href: string; text: string; n: number }[] = [
    { href: '/admin/inquiries?status=NEU', text: 'neue Anfrage(n) warten', n: liveStats.newInquiries },
    ...(canAnamnese
      ? [
          {
            href: '/admin/anamnese?status=NEU_EINGEGANGEN',
            text: 'neue Anamnesebögen prüfen',
            n: liveStats.newAnamnese,
          },
        ]
      : []),
    {
      href: '/admin/applicants?status=NEU_EINGEGANGEN',
      text: 'neue Bewerbung(en) prüfen',
      n: liveStats.newApplicants,
    },
  ].filter((t) => t.n > 0)

  return (
    <div className="space-y-10 sm:space-y-12">
      {tasks.length > 0 && (
        <section aria-label="Zuerst erledigen">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
            Zuerst erledigen
          </p>
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {tasks.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="flex min-h-[2.75rem] items-center justify-between gap-4 rounded-xl border border-rose-200/50 bg-rose-50/40 px-4 py-2.5 text-sm text-slate-800 transition hover:border-rose-200 hover:bg-rose-50/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40"
                >
                  <span>
                    <strong className="font-semibold text-rose-700">{t.n}</strong> {t.text}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-rose-400" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="kpi-heading" className="space-y-6 sm:space-y-8">
        <div className="flex items-end justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="h-px w-6 bg-primary-500/60 sm:w-8" />
            <h2
              id="kpi-heading"
              className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-[11px] sm:tracking-[0.24em]"
            >
              Kennzahlen heute
            </h2>
          </div>
          <span className="text-[10px] tracking-[0.14em] text-slate-400 sm:text-[11px] sm:tracking-[0.18em]">
            {new Date().toLocaleDateString('de-DE', {
              day: '2-digit',
              month: 'short',
            })}
            <span className="hidden sm:inline">
              {' · '}
              {new Date().toLocaleDateString('de-DE', { weekday: 'long' })}
            </span>
          </span>
        </div>

        {(() => {
          const getValue = (k: string) =>
            k in liveStats
              ? (liveStats as unknown as Record<string, number>)[k]
              : 0

          const primaryKpis = [
            {
              key: 'openInquiries',
              label: 'Offene Anfragen',
              hint: 'Warten auf Bearbeitung',
              href: '/admin/inquiries',
            },
            {
              key: 'interviewsPlanned',
              label: 'Gespräche',
              hint: 'Geplante Bewerbergespräche',
              href: '/admin/applicants?status=GESPRAECH_GEPLANT',
            },
            {
              key: 'activeJobs',
              label: 'Aktive Stellen',
              hint: 'Online ausgeschrieben',
              href: '/admin/jobs',
            },
          ]

          const secondaryKpis = [
            {
              key: 'newApplicants',
              label: 'Neue Bewerbungen',
              href: '/admin/applicants?status=NEU_EINGEGANGEN',
            },
            {
              key: 'newAnamnese',
              label: 'Neue Anamnese',
              href: '/admin/anamnese?status=NEU_EINGEGANGEN',
            },
            {
              key: 'inReview',
              label: 'In Prüfung',
              href: '/admin/applicants?status=IN_PRUEFUNG',
            },
            {
              key: 'newInquiries',
              label: 'Neue Anfragen',
              href: '/admin/inquiries?status=NEU',
            },
          ]

          return (
            <>
              <ul className="grid gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:gap-6">
                {primaryKpis.map(({ key, label, hint, href }) => {
                  const value = getValue(key)
                  const hasValue = value > 0
                  return (
                    <li key={key}>
                      <Link
                        href={href}
                        className={cn(
                          'group relative flex h-full items-center justify-between gap-4 overflow-hidden rounded-2xl bg-white px-5 py-4 sm:px-6 sm:py-5 lg:px-7 lg:py-6',
                          'shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_36px_-24px_rgba(15,23,42,0.14)]',
                          'ring-1 ring-slate-900/[0.04]',
                          'transition-shadow duration-300',
                          'hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_24px_48px_-20px_rgba(15,23,42,0.2)]',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40',
                        )}
                      >
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                        />
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary-100/40 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                        />

                        <div className="relative flex min-w-0 flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span
                              aria-hidden
                              className={cn(
                                'h-1.5 w-1.5 rounded-full',
                                hasValue ? 'bg-primary-500' : 'bg-slate-300',
                              )}
                            />
                            <span className="text-[13px] font-medium text-slate-600">
                              {label}
                            </span>
                          </div>
                          <span className="truncate text-[11px] text-slate-400">
                            {hint}
                          </span>
                        </div>

                        <span
                          className={cn(
                            'relative inline-block shrink-0 font-serif font-light leading-none tabular-nums',
                            'text-[3rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]',
                            'tracking-[-0.04em]',
                            'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent',
                          )}
                          style={{
                            fontFeatureSettings: '"lnum","tnum"',
                            filter:
                              'drop-shadow(0 1px 0 rgba(255,255,255,0.9)) drop-shadow(0 8px 16px rgba(15,23,42,0.08))',
                          }}
                        >
                          {value}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <div
                className={cn(
                  'relative overflow-hidden rounded-2xl bg-white px-2 py-1 sm:px-3 sm:py-2',
                  'shadow-[0_1px_2px_rgba(15,23,42,0.03),0_12px_24px_-16px_rgba(15,23,42,0.1)]',
                  'ring-1 ring-slate-900/[0.04]',
                )}
              >
                <ul className="grid grid-cols-2 divide-slate-100 sm:grid-cols-4 sm:divide-x">
                  {secondaryKpis.map(({ key, label, href }) => {
                    const value = getValue(key)
                    const hasValue = value > 0
                    return (
                      <li key={key}>
                        <Link
                          href={href}
                          className={cn(
                            'group flex items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5',
                            'transition-colors hover:bg-slate-50/60',
                            'focus-visible:outline-none focus-visible:bg-slate-50',
                          )}
                        >
                          <div className="flex min-w-0 items-center gap-2.5">
                            <span
                              aria-hidden
                              className={cn(
                                'h-1.5 w-1.5 shrink-0 rounded-full',
                                hasValue ? 'bg-primary-500' : 'bg-slate-300',
                              )}
                            />
                            <span className="truncate text-[13px] text-slate-500">
                              {label}
                            </span>
                          </div>
                          <span
                            className="font-serif text-2xl font-light leading-none tabular-nums text-slate-900 sm:text-[1.75rem]"
                            style={{
                              fontFeatureSettings: '"lnum","tnum"',
                            }}
                          >
                            {value}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </>
          )
        })()}
      </section>

      <div
        className={cn(
          'grid gap-6',
          canAnamnese ? 'lg:grid-cols-3' : 'lg:grid-cols-2',
        )}
      >
        <div className="overflow-hidden rounded-2xl border border-warm-200/50 bg-white/90 shadow-sm">
          <div className="flex items-center justify-between border-b border-warm-100/80 px-4 py-3.5 sm:px-5">
            <h2 className="text-sm font-semibold text-slate-900">Neueste Anfragen</h2>
            <Link
              className="flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700"
              href="/admin/inquiries"
            >
              Alle
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {inquiries.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-slate-400">Keine Anfragen</p>
          ) : (
            <ul className="divide-y divide-warm-50/90">
              {inquiries.map((inq) => (
                <li key={inq.id}>
                  <Link
                    href={`/admin/inquiries/${inq.id}`}
                    className="block px-4 py-3.5 transition hover:bg-slate-50/80 sm:px-5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="min-w-0 text-sm font-medium text-slate-900">{inq.fullName}</p>
                      <time className="shrink-0 text-xs text-slate-400">{formatDate(inq.createdAt)}</time>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-500">{inq.inquiryType}</p>
                    <div className="mt-1.5">
                      <InquiryStatusBadge status={inq.status as any} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {canAnamnese && (
          <div className="overflow-hidden rounded-2xl border border-warm-200/50 bg-white/90 shadow-sm">
            <div className="flex items-center justify-between border-b border-warm-100/80 px-4 py-3.5 sm:px-5">
              <h2 className="text-sm font-semibold text-slate-900">Neueste Anamnese</h2>
              <Link
                className="flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700"
                href="/admin/anamnese"
              >
                Alle
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {anamnese.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-slate-400">Keine Anamnesebögen</p>
            ) : (
              <ul className="divide-y divide-warm-50/90">
                {anamnese.map((a) => (
                  <li key={a.id}>
                    <Link
                      href={`/admin/anamnese/${a.id}`}
                      className="block px-4 py-3.5 transition hover:bg-slate-50/80 sm:px-5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="min-w-0 text-sm font-medium text-slate-900">
                          {a.patientLastName}, {a.patientFirstName}
                        </p>
                        <time className="shrink-0 text-xs text-slate-400">
                          {formatDate(a.createdAt)}
                        </time>
                      </div>
                      <div className="mt-1.5">
                        <AnamneseStatusBadge status={a.status as any} />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-warm-200/50 bg-white/90 shadow-sm">
          <div className="flex items-center justify-between border-b border-warm-100/80 px-4 py-3.5 sm:px-5">
            <h2 className="text-sm font-semibold text-slate-900">Neueste Bewerbungen</h2>
            <Link
              className="flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700"
              href="/admin/applicants"
            >
              Alle
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {applicants.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-slate-400">Keine Bewerbungen</p>
          ) : (
            <ul className="divide-y divide-warm-50/90">
              {applicants.map((app) => (
                <li key={app.id}>
                  <Link
                    href={`/admin/applicants/${app.id}`}
                    className="block px-4 py-3.5 transition hover:bg-slate-50/80 sm:px-5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="min-w-0 text-sm font-medium text-slate-900">
                        {app.firstName} {app.lastName}
                      </p>
                      <time className="shrink-0 text-xs text-slate-400">{formatDate(app.createdAt)}</time>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-500">{app.positionApplied}</p>
                    <div className="mt-1.5">
                      <ApplicantStatusBadge status={app.status as any} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div
        className={cn(
          'grid gap-4 sm:gap-5 lg:gap-6',
          canAnamnese ? 'lg:grid-cols-2 xl:grid-cols-3' : 'lg:grid-cols-2',
        )}
      >
        <PipelineCard
          title="Anfragen-Pipeline"
          href="/admin/inquiries"
          pipeline={liveInquiryPipeline}
          stages={inquiryPipelineStages}
          theme={pipelineThemes.inquiry}
          emptyText="Noch keine Anfragen in der Übersicht"
        />
        <PipelineCard
          title="Bewerber-Pipeline"
          href="/admin/applicants"
          pipeline={liveApplicantPipeline}
          stages={applicantPipelineStages}
          theme={pipelineThemes.applicant}
          emptyText="Noch keine Bewerbungen in der Übersicht"
        />
        {canAnamnese && (
          <PipelineCard
            title="Anamnese"
            href="/admin/anamnese"
            pipeline={liveAnamnesePipeline}
            stages={anamnesePipelineStages}
            theme={pipelineThemes.anamnese}
            emptyText="Noch keine Anamnesebögen"
          />
        )}
      </div>
    </div>
  )
}
