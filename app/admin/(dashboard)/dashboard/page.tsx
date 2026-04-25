import { Metadata } from 'next'
import Link from 'next/link'
import {
  MessageSquare,
  AlertCircle,
  UserPlus,
  Search,
  Calendar,
  Briefcase,
  ArrowRight,
} from 'lucide-react'
import { getCurrentUser } from '@/lib/auth/session'
import { redirect } from 'next/navigation'
import { cn, formatDate, formatDateTime } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { InquiryStatusBadge, ApplicantStatusBadge } from '@/components/ui/status-badge'
import {
  getDashboardStats,
  getRecentInquiries,
  getRecentApplicants,
  getRecentActivity,
  getPipelineSummary,
} from '@/lib/actions/dashboard'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export const dynamic = 'force-dynamic'

const kpiConfig = [
  { key: 'newInquiries', label: 'Neue Anfragen', icon: MessageSquare, href: '/admin/inquiries?status=NEU' },
  { key: 'openInquiries', label: 'Offene Anfragen', icon: AlertCircle, href: '/admin/inquiries' },
  { key: 'newApplicants', label: 'Neue Bewerbungen', icon: UserPlus, href: '/admin/applicants?status=NEU_EINGEGANGEN' },
  { key: 'inReview', label: 'In Prüfung', icon: Search, href: '/admin/applicants?status=IN_PRUEFUNG' },
  { key: 'interviewsPlanned', label: 'Gespräche geplant', icon: Calendar, href: '/admin/applicants?status=GESPRAECH_GEPLANT' },
  { key: 'activeJobs', label: 'Aktive Stellen', icon: Briefcase, href: '/admin/jobs' },
] as const

const pipelineStages: { key: string; label: string; color: string }[] = [
  { key: 'NEU_EINGEGANGEN', label: 'Neu', color: 'bg-primary-400' },
  { key: 'GESICHTET', label: 'Gesichtet', color: 'bg-primary-300' },
  { key: 'IN_PRUEFUNG', label: 'Prüfung', color: 'bg-warning-400' },
  { key: 'INTERESSANT', label: 'Interessant', color: 'bg-success-400' },
  { key: 'GESPRAECH_GEPLANT', label: 'Gespräch', color: 'bg-accent-400' },
  { key: 'WARTELISTE', label: 'Warteliste', color: 'bg-warm-300' },
  { key: 'EINGESTELLT', label: 'Eingestellt', color: 'bg-success-500' },
  { key: 'ABGELEHNT', label: 'Abgelehnt', color: 'bg-error-400' },
]

const actionLabels: Record<string, string> = {
  CREATE: 'erstellt',
  UPDATE: 'aktualisiert',
  DELETE: 'gelöscht',
  STATUS_CHANGE: 'Status geändert',
  LOGIN: 'angemeldet',
  ASSIGN: 'zugewiesen',
  NOTE_ADDED: 'Notiz hinzugefügt',
}

const entityLabels: Record<string, string> = {
  INQUIRY: 'Anfrage',
  APPLICANT: 'Bewerber',
  JOB_POSTING: 'Stellenanzeige',
  USER: 'Benutzer',
  DOCUMENT: 'Dokument',
  CONTENT: 'Inhalt',
}

function formatAction(action: string, entityType: string): string {
  const actionText = actionLabels[action] ?? action.toLowerCase()
  const entityText = entityLabels[entityType] ?? entityType.toLowerCase()
  return `${entityText} ${actionText}`
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/admin/login')

  const [statsResult, inquiriesResult, applicantsResult, activityResult, pipelineResult] =
    await Promise.all([
      getDashboardStats(),
      getRecentInquiries(),
      getRecentApplicants(),
      getRecentActivity(),
      getPipelineSummary(),
    ])

  const stats = statsResult.data as Record<string, number> | undefined
  const inquiries = (inquiriesResult.data ?? []) as Array<{
    id: string
    fullName: string
    inquiryType: string
    status: string
    createdAt: string | Date
  }>
  const applicants = (applicantsResult.data ?? []) as Array<{
    id: string
    firstName: string
    lastName: string
    positionApplied: string
    status: string
    createdAt: string | Date
  }>
  const activity = (activityResult.data ?? []) as Array<{
    id: string
    action: string
    entityType: string
    entityId: string
    createdAt: string | Date
    user: { firstName: string; lastName: string } | null
  }>
  const pipeline = (pipelineResult.data ?? {}) as Record<string, number>

  const pipelineTotal = Object.values(pipeline).reduce((sum, c) => sum + c, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-warm-900">Dashboard</h2>
        <p className="mt-1 text-sm text-warm-500">
          Willkommen zurück, {user.firstName}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {kpiConfig.map(({ key, label, icon: Icon, href }) => (
          <Link key={key} href={href} className="group">
            <Card className="transition-shadow duration-150 group-hover:shadow-md">
              <CardContent className="px-4 py-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50">
                  <Icon className="h-[18px] w-[18px] text-primary-500" />
                </div>
                <p className="text-xs font-medium text-warm-500">{label}</p>
                <p className="mt-0.5 text-2xl font-bold text-warm-900">
                  {stats?.[key] ?? '–'}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pipeline summary */}
      {pipelineTotal > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bewerber-Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Bar */}
            <div className="mb-4 flex h-3 overflow-hidden rounded-full bg-warm-100">
              {pipelineStages.map((stage) => {
                const count = pipeline[stage.key] ?? 0
                if (count === 0) return null
                const pct = (count / pipelineTotal) * 100
                return (
                  <div
                    key={stage.key}
                    className={cn('transition-all duration-300', stage.color)}
                    style={{ width: `${pct}%` }}
                    title={`${stage.label}: ${count}`}
                  />
                )
              })}
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {pipelineStages.map((stage) => {
                const count = pipeline[stage.key] ?? 0
                if (count === 0) return null
                return (
                  <div key={stage.key} className="flex items-center gap-1.5">
                    <span className={cn('h-2.5 w-2.5 rounded-full', stage.color)} />
                    <span className="text-xs text-warm-600">
                      {stage.label}{' '}
                      <span className="font-semibold text-warm-800">{count}</span>
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Two-column: Recent inquiries + Recent applicants */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Inquiries */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">Neueste Anfragen</CardTitle>
            <Link
              href="/admin/inquiries"
              className="flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700"
            >
              Alle ansehen
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="px-0 pb-2">
            {inquiries.length === 0 ? (
              <p className="px-6 py-8 text-center text-sm text-warm-400">
                Keine Anfragen vorhanden
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-warm-100 text-left">
                      <th className="px-6 pb-2 font-medium text-warm-500">Name</th>
                      <th className="px-3 pb-2 font-medium text-warm-500">Typ</th>
                      <th className="px-3 pb-2 font-medium text-warm-500">Status</th>
                      <th className="px-3 pb-2 text-right font-medium text-warm-500">Datum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-warm-50">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-warm-50/50">
                        <td className="px-6 py-2.5">
                          <Link
                            href={`/admin/inquiries/${inq.id}`}
                            className="font-medium text-warm-900 hover:text-primary-600"
                          >
                            {inq.fullName}
                          </Link>
                        </td>
                        <td className="px-3 py-2.5 text-warm-600">{inq.inquiryType}</td>
                        <td className="px-3 py-2.5">
                          <InquiryStatusBadge status={inq.status as any} />
                        </td>
                        <td className="px-3 py-2.5 text-right text-warm-500">
                          {formatDate(inq.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Applicants */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">Neueste Bewerbungen</CardTitle>
            <Link
              href="/admin/applicants"
              className="flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700"
            >
              Alle ansehen
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="px-0 pb-2">
            {applicants.length === 0 ? (
              <p className="px-6 py-8 text-center text-sm text-warm-400">
                Keine Bewerbungen vorhanden
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-warm-100 text-left">
                      <th className="px-6 pb-2 font-medium text-warm-500">Name</th>
                      <th className="px-3 pb-2 font-medium text-warm-500">Position</th>
                      <th className="px-3 pb-2 font-medium text-warm-500">Status</th>
                      <th className="px-3 pb-2 text-right font-medium text-warm-500">Datum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-warm-50">
                    {applicants.map((app) => (
                      <tr key={app.id} className="hover:bg-warm-50/50">
                        <td className="px-6 py-2.5">
                          <Link
                            href={`/admin/applicants/${app.id}`}
                            className="font-medium text-warm-900 hover:text-primary-600"
                          >
                            {app.firstName} {app.lastName}
                          </Link>
                        </td>
                        <td className="px-3 py-2.5 text-warm-600">{app.positionApplied}</td>
                        <td className="px-3 py-2.5">
                          <ApplicantStatusBadge status={app.status as any} />
                        </td>
                        <td className="px-3 py-2.5 text-right text-warm-500">
                          {formatDate(app.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Letzte Aktivitäten</CardTitle>
        </CardHeader>
        <CardContent>
          {activity.length === 0 ? (
            <p className="py-8 text-center text-sm text-warm-400">
              Keine Aktivitäten vorhanden
            </p>
          ) : (
            <div className="space-y-0">
              {activity.map((entry, i) => {
                const who = entry.user
                  ? [entry.user.firstName, entry.user.lastName]
                      .filter(Boolean)
                      .join(' ')
                      .trim() || 'Unbekannt'
                  : 'System'
                return (
                <div
                  key={entry.id}
                  className={cn(
                    'flex items-start gap-3 py-3',
                    i < activity.length - 1 && 'border-b border-warm-50',
                  )}
                >
                  <Avatar
                    name={who}
                    size="sm"
                    className="mt-0.5"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-warm-700">
                      <span className="font-medium text-warm-900">{who}</span>{' '}
                      hat {formatAction(entry.action, entry.entityType)}
                    </p>
                    <p className="mt-0.5 text-xs text-warm-400">
                      {formatDateTime(entry.createdAt)}
                    </p>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
