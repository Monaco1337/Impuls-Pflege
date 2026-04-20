import { Metadata } from 'next'
import Link from 'next/link'
import { Briefcase, Plus, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { getJobs } from '@/lib/actions/jobs'
import { JobActions } from '@/components/admin/job-actions'
import { JobSearch } from './search'

export const metadata: Metadata = {
  title: 'Stellenanzeigen',
}

export const dynamic = 'force-dynamic'

const EMPLOYMENT_TYPE_LABELS: Record<string, string> = {
  VOLLZEIT: 'Vollzeit',
  TEILZEIT: 'Teilzeit',
  MINIJOB: 'Minijob',
  WERKSTUDENT: 'Werkstudent',
  PRAKTIKUM: 'Praktikum',
  FREIBERUFLICH: 'Freiberuflich',
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const search = typeof params.search === 'string' ? params.search : undefined

  const result = await getJobs({ page, search })

  const jobs = (result.data as any)?.jobs ?? []
  const total = (result.data as any)?.total ?? 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-warm-900">Stellenanzeigen</h2>
          <p className="mt-1 text-sm text-warm-500">
            {total} {total === 1 ? 'Stelle' : 'Stellen'} verwalten
          </p>
        </div>

        <Link href="/admin/jobs/new">
          <Button icon={<Plus className="h-4 w-4" />}>Neue Stelle</Button>
        </Link>
      </div>

      <JobSearch />

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="py-0">
            <EmptyState
              icon={<Briefcase className="h-6 w-6" />}
              title="Keine Stellen gefunden"
              description={
                search
                  ? 'Versuchen Sie, Ihre Suchkriterien anzupassen.'
                  : 'Erstellen Sie Ihre erste Stellenanzeige.'
              }
              action={
                !search ? (
                  <Link href="/admin/jobs/new">
                    <Button size="sm" icon={<Plus className="h-4 w-4" />}>
                      Neue Stelle
                    </Button>
                  </Link>
                ) : undefined
              }
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titel</TableHead>
                <TableHead>Standort</TableHead>
                <TableHead>Beschäftigungsart</TableHead>
                <TableHead className="text-center">Bewerber</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Veröffentlicht</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job: any) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <Link
                      href={`/admin/jobs/${job.id}/edit`}
                      className="group inline-flex items-center gap-1.5 font-medium text-warm-900 hover:text-primary-600"
                    >
                      {job.title}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                    {job.department && (
                      <p className="mt-0.5 text-xs text-warm-400">
                        {job.department}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-warm-600">
                    {job.location || <span className="text-warm-400">—</span>}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {EMPLOYMENT_TYPE_LABELS[job.employmentType] ?? job.employmentType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-warm-500">
                    {job._count.applicants > 0 ? (
                      <Badge variant="primary">{job._count.applicants}</Badge>
                    ) : (
                      <span className="text-warm-400">0</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={job.active ? 'success' : 'default'}>
                      {job.active ? 'Aktiv' : 'Inaktiv'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-warm-500">
                    {job.publishDate ? formatDate(job.publishDate) : '—'}
                  </TableCell>
                  <TableCell className="text-right">
                    <JobActions
                      jobId={job.id}
                      jobTitle={job.title}
                      active={job.active}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}
