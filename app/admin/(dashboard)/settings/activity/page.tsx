import { Metadata } from 'next'
import { History } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/ui/empty-state'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { formatDateTime } from '@/lib/utils'
import { getAuditLogs } from '@/lib/actions/audit'
import { ActivityFilters } from '@/components/admin/activity-filters'
import { formatAuditEventDescription } from '@/lib/admin/audit-messages'
import { requireFullSettingsAdmin } from '@/lib/auth/require-full-settings-admin'

export const metadata: Metadata = {
  title: 'Aktivitätsprotokoll',
}

export const dynamic = 'force-dynamic'

const ACTION_LABELS: Record<string, string> = {
  create: 'Erfasst',
  update: 'Aktualisiert',
  delete: 'Entfernt',
  status_change: 'Status',
  login: 'Anmeldung',
  logout: 'Abmeldung',
  upload: 'Upload',
  download: 'Download',
  password_change: 'Sicherheit',
  settings_update: 'System',
  assign: 'Zuordnung',
  note_added: 'Notiz',
  role_change: 'Rolle',
}

const ACTION_VARIANTS: Record<string, 'success' | 'error' | 'warning' | 'primary' | 'default'> = {
  create: 'success',
  update: 'primary',
  delete: 'error',
  status_change: 'warning',
  login: 'default',
  logout: 'default',
  upload: 'success',
  password_change: 'warning',
  settings_update: 'primary',
  note_added: 'primary',
}

export default async function SettingsActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  await requireFullSettingsAdmin()
  const params = await searchParams
  const page = Number(params.page) || 1
  const userId = typeof params.userId === 'string' ? params.userId : undefined
  const action = typeof params.action === 'string' ? params.action : undefined
  const entityType = typeof params.entityType === 'string' ? params.entityType : undefined
  const dateFrom = typeof params.dateFrom === 'string' ? params.dateFrom : undefined
  const dateTo = typeof params.dateTo === 'string' ? params.dateTo : undefined

  const result = await getAuditLogs({ page, userId, action, entityType, dateFrom, dateTo })

  const logs = (result.data as any)?.logs ?? []
  const total = (result.data as any)?.total ?? 0
  const totalPages = (result.data as any)?.totalPages ?? 1
  const currentPage = (result.data as any)?.page ?? 1

  const hasFilters = !!(userId || action || entityType || dateFrom || dateTo)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-warm-900 sm:text-2xl">
          Aktivitätsprotokoll
        </h2>
        <p className="mt-1.5 text-sm text-warm-500">
          Verständliche Übersicht relevanter Aktionen – technische Rohdaten bleiben verborgen
        </p>
      </div>

      <ActivityFilters
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
        basePath="/admin/settings/activity"
      />

      {logs.length === 0 ? (
        <Card>
          <CardContent className="py-0">
            <EmptyState
              icon={<History className="h-6 w-6" />}
              title="Keine Einträge gefunden"
              description={
                hasFilters
                  ? 'Passe die Filter an oder wähle einen anderen Zeitraum.'
                  : 'Hier erscheinen wichtige Vorgänge, sobald das System sie protokolliert.'
              }
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden shadow-sm ring-1 ring-warm-100/80">
          <Table>
            <TableHeader>
              <TableRow className="border-warm-100/80">
                <TableHead className="w-[20%]">Wann</TableHead>
                <TableHead className="w-[20%]">Konto</TableHead>
                <TableHead className="w-[10%]">Art</TableHead>
                <TableHead>Ereignis</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log: any) => {
                const actionLabel = ACTION_LABELS[log.action] ?? 'Vorgang'
                const actionVariant = ACTION_VARIANTS[log.action] ?? 'default'
                const who = log.user
                  ? `${log.user.firstName ?? ''} ${log.user.lastName ?? ''}`.trim() || 'Unbekannt'
                  : 'System'
                const line = formatAuditEventDescription(
                  log.action,
                  log.entityType,
                  log.metadata,
                )

                return (
                  <TableRow key={log.id} className="border-warm-50/80">
                    <TableCell className="whitespace-nowrap text-warm-500 text-sm">
                      {formatDateTime(log.createdAt)}
                    </TableCell>
                    <TableCell>
                      {log.user ? (
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-[10px] font-semibold text-primary-700"
                            aria-hidden
                          >
                            {log.user.firstName?.[0]}
                            {log.user.lastName?.[0]}
                          </div>
                          <span className="truncate text-sm font-medium text-warm-900">
                            {who}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-warm-500">System</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={actionVariant}>{actionLabel}</Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm leading-relaxed text-warm-800">{line}</p>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}
