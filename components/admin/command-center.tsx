import Link from 'next/link'
import {
  MessageSquare,
  AlertCircle,
  UserPlus,
  Search,
  Calendar,
  Briefcase,
  ArrowRight,
  Sparkles,
  Inbox,
  FileEdit,
  type LucideIcon,
} from 'lucide-react'
import { cn, formatDate, formatDateTime } from '@/lib/utils'
import { InquiryStatusBadge, ApplicantStatusBadge } from '@/components/ui/status-badge'
import { Avatar } from '@/components/ui/avatar'
import { formatAuditEventDescription } from '@/lib/admin/audit-messages'

const MINT = 'rgb(24, 193, 163)'
const ROSE = 'rgb(242, 75, 106)'

const kpiConfig: {
  key: string
  label: string
  icon: LucideIcon
  href: string
}[] = [
  { key: 'newInquiries', label: 'Neu • Anfragen', icon: MessageSquare, href: '/admin/inquiries?status=NEU' },
  { key: 'openInquiries', label: 'Offen • Anfragen', icon: AlertCircle, href: '/admin/inquiries' },
  { key: 'newApplicants', label: 'Neu • Bewerbungen', icon: UserPlus, href: '/admin/applicants?status=NEU_EINGEGANGEN' },
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

const quick: { href: string; label: string; sub: string; icon: LucideIcon }[] = [
  { href: '/admin/inquiries?status=NEU', label: 'Eingang Anfragen', sub: 'Neu eingegangen', icon: Inbox },
  { href: '/admin/applicants?status=NEU_EINGEGANGEN', label: 'Eingang Bewerbungen', sub: 'Neu eingereicht', icon: UserPlus },
  { href: '/admin/jobs/new', label: 'Stelle ausgeben', sub: 'Neue Ausschreibung', icon: Briefcase },
  { href: '/admin/files', label: 'Dokumente', sub: 'Alle Unterlagen', icon: FileEdit },
]

type Props = {
  firstName: string
  stats: Record<string, number> | undefined
  inquiryPipeline: Record<string, number>
  applicantPipeline: Record<string, number>
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
  activity: Array<{
    id: string
    action: string
    entityType: string
    entityId: string
    metadata?: unknown
    createdAt: string | Date
    user: { firstName: string; lastName: string } | null
  }>
}

function pipelineBar(
  pipeline: Record<string, number>,
  stages: { key: string; label: string; className: string }[],
) {
  const total = Object.values(pipeline).reduce((a, b) => a + b, 0)
  if (total === 0) return null
  return (
    <>
      <div className="mb-4 flex h-3.5 overflow-hidden rounded-full bg-warm-100/80 ring-1 ring-warm-200/40">
        {stages.map((stage) => {
          const count = pipeline[stage.key] ?? 0
          if (count === 0) return null
          const pct = (count / total) * 100
          return (
            <div
              key={stage.key}
              className={cn('bg-gradient-to-b', stage.className)}
              style={{ width: `${pct}%` }}
              title={`${stage.label}: ${count}`}
            />
          )
        })}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-warm-600">
        {stages.map((stage) => {
          const count = pipeline[stage.key] ?? 0
          if (count === 0) return null
          return (
            <span key={stage.key}>
              <span
                className={cn('mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-gradient-to-br', stage.className)}
                aria-hidden
              />
              {stage.label} <span className="font-semibold text-warm-900">{count}</span>
            </span>
          )
        })}
      </div>
    </>
  )
}

export function CommandCenter({
  firstName,
  stats,
  inquiryPipeline,
  applicantPipeline,
  inquiries,
  applicants,
  activity,
}: Props) {
  const tasks: { href: string; text: string; n: number }[] = [
    { href: '/admin/inquiries?status=NEU', text: 'neue Anfrage(n) warten', n: stats?.newInquiries ?? 0 },
    {
      href: '/admin/applicants?status=NEU_EINGEGANGEN',
      text: 'neue Bewerbung(en) prüfen',
      n: stats?.newApplicants ?? 0,
    },
  ].filter((t) => t.n > 0)

  return (
    <div className="space-y-10 sm:space-y-12">
      <section
        className="relative overflow-hidden rounded-[1.25rem] border border-warm-200/50 bg-gradient-to-br from-white via-primary-50/25 to-rose-50/20 px-5 py-6 shadow-[0_1px_0_0_rgba(0,0,0,0.04)] sm:px-8 sm:py-7"
        style={{ boxShadow: '0 12px 40px -20px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(0,0,0,0.02)' }}
      >
        <div
          className="pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-full opacity-40 blur-3xl"
          style={{ background: MINT }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-4 bottom-0 h-32 w-32 rounded-full opacity-20 blur-3xl"
          style={{ background: ROSE }}
          aria-hidden
        />
        <div className="relative flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-600"
              style={{ letterSpacing: '0.12em' }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Command Center
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-3xl">
              Guten Tag, {firstName}
            </h1>
            <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-slate-500">
              Tagesüberblick für Ihren ambulanten Pflegedienst – fokussiert auf das, was heute
              ansteht.
            </p>
          </div>
        </div>

        {tasks.length > 0 && (
          <div className="relative mt-6 space-y-2.5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Zuerst erledigen</p>
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
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold tracking-wide text-slate-500">Kennzahlen heute</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
          {kpiConfig.map(({ key, label, icon: Icon, href }) => (
            <Link
              key={key}
              href={href}
              className="group rounded-2xl border border-warm-200/60 bg-white p-4 transition hover:border-primary-200/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30"
            >
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-primary-100/30 text-primary-600 ring-1 ring-primary-100/60">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </div>
                <p className="text-[11px] font-medium leading-tight text-slate-500">{label}</p>
                <p className="mt-0.5 text-2xl font-semibold tabular-nums tracking-tight text-slate-900">
                  {stats != null && key in stats ? (stats as Record<string, number>)[key] : 0}
                </p>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-warm-200/50 bg-white/90 p-5 shadow-sm sm:p-6">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Anfragen-Pipeline</h2>
            <Link
              className="text-xs font-medium text-primary-600 hover:underline"
              href="/admin/inquiries"
            >
              Alle
            </Link>
          </div>
          {pipelineBar(inquiryPipeline, inquiryPipelineStages) ?? (
            <p className="py-6 text-center text-sm text-slate-400">Noch keine Anfragen in der Übersicht</p>
          )}
        </div>
        <div className="overflow-hidden rounded-2xl border border-warm-200/50 bg-white/90 p-5 shadow-sm sm:p-6">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Bewerber-Pipeline</h2>
            <Link
              className="text-xs font-medium text-primary-600 hover:underline"
              href="/admin/applicants"
            >
              Alle
            </Link>
          </div>
          {pipelineBar(applicantPipeline, applicantPipelineStages) ?? (
            <p className="py-6 text-center text-sm text-slate-400">Noch keine Bewerbungen in der Übersicht</p>
          )}
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-sm font-semibold tracking-wide text-slate-500">Schnellaktionen</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quick.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="group flex min-h-[5.5rem] flex-col rounded-2xl border border-warm-200/50 bg-gradient-to-b from-white to-slate-50/40 p-4 transition hover:border-primary-200/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30"
            >
              <q.icon className="mb-2 h-4 w-4 text-primary-600" strokeWidth={1.75} />
              <p className="text-sm font-semibold text-slate-900 group-hover:text-primary-800">{q.label}</p>
              <p className="mt-0.5 text-xs text-slate-500">{q.sub}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
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

      <section className="overflow-hidden rounded-2xl border border-warm-200/50 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-sm font-semibold tracking-wide text-slate-500">Aktuell</h2>
        {activity.length === 0 ? (
          <p className="py-4 text-sm text-slate-400">Noch keine protokollierten Vorgänge</p>
        ) : (
          <ul className="space-y-0">
            {activity.slice(0, 5).map((entry, i) => {
              const who = entry.user
                ? [entry.user.firstName, entry.user.lastName]
                    .filter(Boolean)
                    .join(' ')
                    .trim() || 'Unbekannt'
                : 'System'
              const line = formatAuditEventDescription(
                entry.action,
                entry.entityType,
                entry.metadata,
              )
              return (
                <li
                  key={entry.id}
                  className={cn(
                    'flex gap-3 py-3',
                    i < Math.min(5, activity.length) - 1 && 'border-b border-slate-100/90',
                  )}
                >
                  <Avatar name={who} size="sm" className="mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-slate-700">
                      <span className="font-medium text-slate-900">{who}:</span> {line}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">{formatDateTime(entry.createdAt)}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
        <p className="mt-2 text-xs text-slate-400">
          Vollständige Liste unter{' '}
          <Link className="font-medium text-primary-600 hover:underline" href="/admin/settings/activity">
            Einstellungen → Aktivitätsprotokoll
          </Link>
        </p>
      </section>
    </div>
  )
}
