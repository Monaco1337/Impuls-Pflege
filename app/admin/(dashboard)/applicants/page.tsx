import { Metadata } from 'next'
import Link from 'next/link'
import { Users, ArrowRight, LayoutList, Kanban } from 'lucide-react'
import { AdminDataTableRow } from '@/components/admin/admin-data-table-row'
import { cn, formatDate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ApplicantStatusBadge } from '@/components/ui/status-badge'
import { EmptyState } from '@/components/ui/empty-state'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { getApplicants } from '@/lib/actions/applicants'
import { getUsers } from '@/lib/actions/users'
import { ApplicantFilters } from '@/components/admin/applicant-filters'
import { ApplicantPipeline } from '@/components/admin/applicant-pipeline'
import { ApplicantInboxRefreshOnMount } from '@/components/admin/applicant-inbox-refresh-on-mount'

export const metadata: Metadata = {
  title: 'Bewerber',
}

export const dynamic = 'force-dynamic'

export default async function ApplicantsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const view = params.view === 'pipeline' ? 'pipeline' : 'table'
  const page = Number(params.page) || 1
  const search = typeof params.search === 'string' ? params.search : undefined
  const status = typeof params.status === 'string' ? params.status : undefined
  const position = typeof params.position === 'string' ? params.position : undefined
  const assignedTo = typeof params.assignedTo === 'string' ? params.assignedTo : undefined

  const isPipeline = view === 'pipeline'

  const [result, usersResult] = await Promise.all([
    getApplicants({
      page: isPipeline ? 1 : page,
      pageSize: isPipeline ? 500 : 20,
      search: isPipeline ? undefined : search,
      status: isPipeline ? undefined : (status as any),
      positionApplied: isPipeline ? undefined : position,
      assignedToId: isPipeline ? undefined : assignedTo,
    }),
    getUsers(),
  ])

  const applicants = (result.data as any)?.applicants ?? []
  const total = (result.data as any)?.total ?? 0
  const totalPages = (result.data as any)?.totalPages ?? 1
  const currentPage = (result.data as any)?.page ?? 1

  const users = ((usersResult.data ?? []) as any[]).filter(
    (u: any) => u.active !== false,
  )
  const positions = [
    ...new Set(
      applicants
        .map((a: any) => a.positionApplied)
        .filter(Boolean) as string[],
    ),
  ].sort()

  function viewHref(v: string) {
    const p = new URLSearchParams()
    if (v !== 'table') p.set('view', v)
    return `/admin/applicants${p.toString() ? `?${p.toString()}` : ''}`
  }

  const viewToggle = (
    <div className="inline-flex items-center gap-1 rounded-lg border border-warm-200 bg-warm-50 p-1">
      <Link
        href={viewHref('table')}
        className={cn(
          'inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors',
          view === 'table'
            ? 'bg-white text-warm-900 shadow-sm'
            : 'text-warm-500 hover:text-warm-700',
        )}
      >
        <LayoutList className="h-4 w-4" />
        Tabelle
      </Link>
      <Link
        href={viewHref('pipeline')}
        className={cn(
          'inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors',
          view === 'pipeline'
            ? 'bg-white text-warm-900 shadow-sm'
            : 'text-warm-500 hover:text-warm-700',
        )}
      >
        <Kanban className="h-4 w-4" />
        Pipeline
      </Link>
    </div>
  )

  return (
    <div className="space-y-6">
      <ApplicantInboxRefreshOnMount />
      {isPipeline ? (
        <>
          <div className="flex justify-end">{viewToggle}</div>
          {applicants.length === 0 ? (
            <Card>
              <CardContent className="py-0">
                <EmptyState
                  icon={<Users className="h-6 w-6" />}
                  title="Keine Bewerber vorhanden"
                  description="Es sind noch keine Bewerbungen eingegangen."
                />
              </CardContent>
            </Card>
          ) : (
            <ApplicantPipeline applicants={applicants} />
          )}
        </>
      ) : (
        <>
          <ApplicantFilters
            currentPage={currentPage}
            totalPages={totalPages}
            total={total}
            positions={positions}
            users={users}
            toolbarEnd={viewToggle}
          />

          {applicants.length === 0 ? (
            <Card>
              <CardContent className="py-0">
                <EmptyState
                  icon={<Users className="h-6 w-6" />}
                  title="Keine Bewerber gefunden"
                  description={
                    search || status || position || assignedTo
                      ? 'Versuchen Sie, Ihre Filterkriterien anzupassen.'
                      : 'Es sind noch keine Bewerbungen eingegangen.'
                  }
                />
              </CardContent>
            </Card>
          ) : (
            <Card className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Zugewiesen</TableHead>
                    <TableHead className="text-center">Dokumente</TableHead>
                    <TableHead className="text-right">Datum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicants.map((applicant: any) => (
                    <AdminDataTableRow
                      key={applicant.id}
                      href={`/admin/applicants/${applicant.id}`}
                      label={`${applicant.firstName} ${applicant.lastName}`}
                    >
                      <TableCell>
                        <span className="inline-flex items-center gap-2 font-semibold text-warm-900 transition-colors group-hover:text-primary-800">
                          {applicant.firstName} {applicant.lastName}
                          <ArrowRight
                            className="h-3.5 w-3.5 shrink-0 text-primary-600 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                            aria-hidden
                          />
                        </span>
                        {applicant.tags?.length > 0 && (
                          <div className="mt-1 flex gap-1">
                            {applicant.tags.slice(0, 3).map((t: any) => (
                              <span
                                key={t.tag.id}
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ backgroundColor: t.tag.color }}
                                title={t.tag.name}
                              />
                            ))}
                            {applicant.tags.length > 3 && (
                              <span className="text-xs text-warm-400">
                                +{applicant.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-warm-600">
                        {applicant.positionApplied}
                      </TableCell>
                      <TableCell>
                        <ApplicantStatusBadge status={applicant.status} />
                      </TableCell>
                      <TableCell className="text-warm-600">
                        {applicant.assignedTo ? (
                          `${applicant.assignedTo.firstName} ${applicant.assignedTo.lastName}`
                        ) : (
                          <span className="text-warm-400">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center text-warm-500">
                        {applicant._count.documents > 0 ? (
                          <Badge variant="outline">
                            {applicant._count.documents}
                          </Badge>
                        ) : (
                          <span className="text-warm-400">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right text-warm-500 tabular-nums">
                        {formatDate(applicant.createdAt)}
                      </TableCell>
                    </AdminDataTableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
