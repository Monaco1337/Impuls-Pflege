import { Metadata } from 'next'
import Link from 'next/link'
import { MessageSquare, ArrowRight } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { InquiryStatusBadge } from '@/components/ui/status-badge'
import { EmptyState } from '@/components/ui/empty-state'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { getInquiries } from '@/lib/actions/inquiries'
import { InquiryFilters } from '@/components/admin/inquiry-filters'

export const metadata: Metadata = {
  title: 'Anfragen',
}

export const dynamic = 'force-dynamic'

const priorityConfig: Record<string, { label: string; variant: 'default' | 'primary' | 'warning' | 'error' }> = {
  NIEDRIG: { label: 'Niedrig', variant: 'default' },
  NORMAL: { label: 'Normal', variant: 'primary' },
  HOCH: { label: 'Hoch', variant: 'warning' },
  DRINGEND: { label: 'Dringend', variant: 'error' },
}

const inquiryTypeLabels: Record<string, string> = {
  PFLEGE: 'Pflegeanfrage',
  BERATUNG: 'Beratung',
  KONTAKT: 'Kontaktanfrage',
  SONSTIGES: 'Sonstiges',
}

function PriorityBadge({ priority }: { priority: string }) {
  const config = priorityConfig[priority] ?? { label: priority, variant: 'default' as const }
  return <Badge variant={config.variant}>{config.label}</Badge>
}

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const search = typeof params.search === 'string' ? params.search : undefined
  const status = typeof params.status === 'string' ? params.status : undefined
  const priority = typeof params.priority === 'string' ? params.priority : undefined

  const result = await getInquiries({
    page,
    search,
    status: status as any,
    priority: priority as any,
  })

  const inquiries = (result.data as any)?.inquiries ?? []
  const total = (result.data as any)?.total ?? 0
  const totalPages = (result.data as any)?.totalPages ?? 1
  const currentPage = (result.data as any)?.page ?? 1

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-warm-900">Anfragen</h2>
        <p className="mt-1 text-sm text-warm-500">
          Verwalten Sie eingehende Kontakt- und Pflegeanfragen
        </p>
      </div>

      <InquiryFilters
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
      />

      {inquiries.length === 0 ? (
        <Card>
          <CardContent className="py-0">
            <EmptyState
              icon={<MessageSquare className="h-6 w-6" />}
              title="Keine Anfragen gefunden"
              description={
                search || status || priority
                  ? 'Versuchen Sie, Ihre Filterkriterien anzupassen.'
                  : 'Es sind noch keine Anfragen eingegangen.'
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
                <TableHead>Anfrageart</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priorität</TableHead>
                <TableHead>Zugewiesen an</TableHead>
                <TableHead className="text-right">Datum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry: any) => (
                <TableRow key={inquiry.id}>
                  <TableCell>
                    <Link
                      href={`/admin/inquiries/${inquiry.id}`}
                      className="group inline-flex items-center gap-1.5 font-medium text-warm-900 hover:text-primary-600"
                    >
                      {inquiry.fullName}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </TableCell>
                  <TableCell className="text-warm-600">
                    {inquiryTypeLabels[inquiry.inquiryType] ?? inquiry.inquiryType}
                  </TableCell>
                  <TableCell>
                    <InquiryStatusBadge status={inquiry.status} />
                  </TableCell>
                  <TableCell>
                    <PriorityBadge priority={inquiry.priority} />
                  </TableCell>
                  <TableCell className="text-warm-600">
                    {inquiry.assignedTo
                      ? `${inquiry.assignedTo.firstName} ${inquiry.assignedTo.lastName}`
                      : <span className="text-warm-400">—</span>}
                  </TableCell>
                  <TableCell className="text-right text-warm-500">
                    {formatDate(inquiry.createdAt)}
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
