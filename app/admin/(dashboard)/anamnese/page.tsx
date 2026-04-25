import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { checkAccess } from '@/lib/rbac/check'
import { Stethoscope, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { AnamneseStatusBadge } from '@/components/ui/status-badge'
import { EmptyState } from '@/components/ui/empty-state'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { getAnamneseSubmissions } from '@/lib/actions/anamnese'
import { getUsers } from '@/lib/actions/users'
import { AnamneseFilters } from '@/components/admin/anamnese-filters'
import { AnamneseStatus } from '@/lib/types/enums'

export const metadata: Metadata = {
  title: 'Anamnesebögen',
}

export const dynamic = 'force-dynamic'

export default async function AnamnesePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  if (!(await checkAccess('anamnese', 'view'))) {
    notFound()
  }

  const params = await searchParams
  const page = Number(params.page) || 1
  const search = typeof params.search === 'string' ? params.search : undefined
  const status = typeof params.status === 'string' ? params.status : undefined
  const assignedTo = typeof params.assignedTo === 'string' ? params.assignedTo : undefined

  const [result, usersResult] = await Promise.all([
    getAnamneseSubmissions({
      page,
      search,
      status: (status as AnamneseStatus) || undefined,
      assignedToId: assignedTo || undefined,
    }),
    getUsers(),
  ])

  const rowList = (result.data as { submissions: unknown[] } | undefined)?.submissions ?? []
  const total = (result.data as { total: number } | undefined)?.total ?? 0
  const totalPages = (result.data as { totalPages: number } | undefined)?.totalPages ?? 1
  const currentPage = (result.data as { page: number } | undefined)?.page ?? 1
  const submissions = rowList as Array<{
    id: string
    patientFirstName: string
    patientLastName: string
    birthDate: string
    phone: string
    status: string
    createdAt: Date
    assignedTo: { firstName: string; lastName: string } | null
  }>
  const users = ((usersResult.data ?? []) as { id: string; firstName: string; lastName: string; role: string; active?: boolean }[]).filter(
    (u) => u.active !== false,
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-warm-900">Anamnesebögen</h2>
        <p className="mt-1 text-sm text-warm-500">
          Eingereichte Patientenanamnesen von der Webseite – gleich wie Eingang bei Anfragen und
          Bewerbungen.
        </p>
      </div>

      <AnamneseFilters
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
        users={users}
      />

      {submissions.length === 0 ? (
        <Card>
          <CardContent className="py-0">
            <EmptyState
              icon={<Stethoscope className="h-6 w-6" />}
              title="Keine Einträge"
              description={
                search || status || assignedTo
                  ? 'Versuchen Sie, Ihre Filter anzupassen.'
                  : 'Es sind noch keine Anamnesebögen eingegangen.'
              }
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Zugewiesen an</TableHead>
                <TableHead className="text-right">Eingang</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <Link
                      href={`/admin/anamnese/${s.id}`}
                      className="group inline-flex items-center gap-1.5 font-medium text-warm-900 hover:text-primary-600"
                    >
                      {s.patientLastName}, {s.patientFirstName}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                    <p className="text-xs text-warm-500">geb. {s.birthDate}</p>
                  </TableCell>
                  <TableCell className="text-warm-600 tabular-nums">{s.phone}</TableCell>
                  <TableCell>
                    <AnamneseStatusBadge status={s.status as any} />
                  </TableCell>
                  <TableCell className="text-warm-600">
                    {s.assignedTo
                      ? `${s.assignedTo.firstName} ${s.assignedTo.lastName}`
                      : <span className="text-warm-400">—</span>}
                  </TableCell>
                  <TableCell className="text-right text-warm-500">
                    {formatDate(s.createdAt)}
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
