import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ClipboardCheck, ArrowRight, CircleDashed, CheckCircle2 } from 'lucide-react'
import { checkAccess } from '@/lib/rbac/check'
import { formatDate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { AdminDataTableRow } from '@/components/admin/admin-data-table-row'
import { listAnamneseErgaenzungen } from '@/lib/actions/anamnese-ergaenzung'

export const metadata: Metadata = {
  title: 'Anamnese-Ergänzung',
}

export const dynamic = 'force-dynamic'

type StatusFilter = 'offen' | 'erfasst' | 'all'

const STATUS_TABS: { id: StatusFilter; label: string }[] = [
  { id: 'offen', label: 'Offen' },
  { id: 'erfasst', label: 'Bereits erfasst' },
  { id: 'all', label: 'Alle' },
]

export default async function AnamneseErgaenzungListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  if (!(await checkAccess('anamnese', 'view'))) {
    notFound()
  }

  const params = await searchParams
  const search = typeof params.search === 'string' ? params.search.trim() : ''
  const statusRaw = typeof params.status === 'string' ? params.status : 'offen'
  const status: StatusFilter =
    statusRaw === 'erfasst' ? 'erfasst' : statusRaw === 'all' ? 'all' : 'offen'

  const result = await listAnamneseErgaenzungen({ search: search || undefined, status })
  const items = result.success ? result.data?.items ?? [] : []
  const total = items.length

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-warm-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-warm-900">
              Vor-Ort-Ergänzung
            </h2>
            <p className="mt-1 text-sm text-warm-500">
              Pflegekraft erfasst Konfession, Gewicht, Schmerzen, Mobilität,
              Kognition und Wohnungszugang während des Erstgesprächs.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-warm-200 px-3 py-1 text-xs font-medium text-warm-600">
            <ClipboardCheck className="h-3.5 w-3.5 text-primary-600" />
            {total} {total === 1 ? 'Eintrag' : 'Einträge'}
          </span>
        </div>

        <form
          method="GET"
          className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <input type="hidden" name="status" value={status} />
          <input
            name="search"
            defaultValue={search}
            placeholder="Patient, Telefon, Geburtsdatum…"
            className="flex-1 rounded-lg border border-warm-200 bg-warm-50 px-3 py-2 text-sm text-warm-900 placeholder:text-warm-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            Suchen
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {STATUS_TABS.map((tab) => {
            const params = new URLSearchParams()
            params.set('status', tab.id)
            if (search) params.set('search', search)
            const active = tab.id === status
            return (
              <Link
                key={tab.id}
                href={`/admin/anamnese-ergaenzung?${params.toString()}`}
                className={
                  active
                    ? 'inline-flex items-center gap-1.5 rounded-full bg-primary-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm'
                    : 'inline-flex items-center gap-1.5 rounded-full border border-warm-200 bg-white px-3 py-1.5 text-xs font-medium text-warm-600 hover:border-primary-300 hover:text-primary-700'
                }
              >
                {tab.id === 'offen' && <CircleDashed className="h-3.5 w-3.5" />}
                {tab.id === 'erfasst' && <CheckCircle2 className="h-3.5 w-3.5" />}
                {tab.label}
              </Link>
            )
          })}
        </div>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="py-0">
            <EmptyState
              icon={<ClipboardCheck className="h-6 w-6" />}
              title="Nichts zu erfassen"
              description={
                search
                  ? 'Versuchen Sie, Ihre Suche anzupassen.'
                  : status === 'offen'
                    ? 'Aktuell sind keine offenen Vor-Ort-Erfassungen vorhanden.'
                    : status === 'erfasst'
                      ? 'Es wurden noch keine Ergänzungen erfasst.'
                      : 'Noch keine Anamnesebögen vorhanden.'
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
                <TableHead>Erfasst von</TableHead>
                <TableHead className="text-right">Letzte Änderung</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((s) => (
                <AdminDataTableRow
                  key={s.submissionId}
                  href={`/admin/anamnese-ergaenzung/${s.submissionId}`}
                  label={`Ergänzung ${s.patientLastName}, ${s.patientFirstName}`}
                >
                  <TableCell>
                    <div>
                      <span className="inline-flex items-center gap-2 font-semibold text-warm-900 transition-colors group-hover:text-primary-800">
                        {s.patientLastName}, {s.patientFirstName}
                        <ArrowRight
                          className="h-3.5 w-3.5 shrink-0 text-primary-600 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                          aria-hidden
                        />
                      </span>
                      <p className="mt-0.5 text-xs text-warm-500">geb. {s.birthDate}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-warm-600 tabular-nums">{s.phone}</TableCell>
                  <TableCell>
                    {s.hasErgaenzung ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-success-200 bg-success-50 px-2.5 py-0.5 text-xs font-medium text-success-700">
                        <CheckCircle2 className="h-3 w-3" /> Erfasst
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-warm-200 bg-warm-50 px-2.5 py-0.5 text-xs font-medium text-warm-600">
                        <CircleDashed className="h-3 w-3" /> Offen
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-warm-600">
                    {s.filledByName ?? <span className="text-warm-400">—</span>}
                  </TableCell>
                  <TableCell className="text-right text-warm-500 tabular-nums">
                    {s.ergaenzungUpdatedAt
                      ? formatDate(s.ergaenzungUpdatedAt)
                      : formatDate(s.submissionCreatedAt)}
                  </TableCell>
                </AdminDataTableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}
