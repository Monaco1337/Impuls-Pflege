import { Metadata } from 'next'
import { Activity } from 'lucide-react'
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

export const metadata: Metadata = {
  title: 'Aktivitätslog',
}

export const dynamic = 'force-dynamic'

const ACTION_LABELS: Record<string, string> = {
  create: 'Erstellt',
  update: 'Aktualisiert',
  delete: 'Gelöscht',
  status_change: 'Status geändert',
  login: 'Anmeldung',
  logout: 'Abmeldung',
  upload: 'Hochgeladen',
  download: 'Heruntergeladen',
  password_change: 'Passwort geändert',
  settings_update: 'Einstellungen geändert',
  assign: 'Zugewiesen',
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
}

const ENTITY_TYPE_LABELS: Record<string, string> = {
  applicant: 'Bewerber',
  inquiry: 'Anfrage',
  job_posting: 'Stellenanzeige',
  user: 'Benutzer',
  document: 'Dokument',
  setting: 'Einstellung',
  content: 'Inhalt',
  note: 'Notiz',
}

export default async function ActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
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
        <h2 className="text-2xl font-bold text-warm-900">Aktivitätslog</h2>
        <p className="mt-1 text-sm text-warm-500">
          Protokoll aller wichtigen Systemaktionen
        </p>
      </div>

      <ActivityFilters
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
      />

      {logs.length === 0 ? (
        <Card>
          <CardContent className="py-0">
            <EmptyState
              icon={<Activity className="h-6 w-6" />}
              title="Keine Aktivitäten gefunden"
              description={
                hasFilters
                  ? 'Versuchen Sie, Ihre Filterkriterien anzupassen.'
                  : 'Es sind noch keine Aktivitäten protokolliert worden.'
              }
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Benutzer</TableHead>
                <TableHead>Aktion</TableHead>
                <TableHead>Bereich</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Zeitpunkt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log: any) => {
                const actionLabel = ACTION_LABELS[log.action] ?? log.action
                const actionVariant = ACTION_VARIANTS[log.action] ?? 'default'
                const entityLabel = ENTITY_TYPE_LABELS[log.entityType] ?? log.entityType

                return (
                  <TableRow key={log.id}>
                    <TableCell>
                      {log.user ? (
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
                            {log.user.firstName?.[0]}
                            {log.user.lastName?.[0]}
                          </div>
                          <span className="font-medium text-warm-900">
                            {log.user.firstName} {log.user.lastName}
                          </span>
                        </div>
                      ) : (
                        <span className="text-warm-400">System</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={actionVariant}>{actionLabel}</Badge>
                    </TableCell>
                    <TableCell className="text-warm-600">
                      {entityLabel}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-warm-500">
                      {log.entityId && (
                        <span className="font-mono text-xs text-warm-400">
                          {log.entityId.slice(0, 8)}
                        </span>
                      )}
                      {log.metadata && typeof log.metadata === 'object' && (
                        <span className="ml-2 text-xs text-warm-500">
                          {Object.entries(log.metadata as Record<string, unknown>)
                            .filter(([key]) => key !== 'entityId')
                            .map(([key, val]) => `${key}: ${val}`)
                            .join(', ')
                            .slice(0, 80)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-warm-500">
                      {formatDateTime(log.createdAt)}
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
