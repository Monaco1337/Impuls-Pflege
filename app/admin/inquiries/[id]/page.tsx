import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Mail,
  Phone,
  Clock,
  CalendarDays,
  FileText,
  User,
  StickyNote,
  Settings2,
} from 'lucide-react'
import { cn, formatDate, formatDateTime } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { InquiryStatusBadge } from '@/components/ui/status-badge'
import { getInquiry } from '@/lib/actions/inquiries'
import { getUsers } from '@/lib/actions/users'
import { InquiryStatusUpdate } from '@/components/admin/inquiry-status-update'
import { InquiryNotes } from '@/components/admin/inquiry-notes'
import { InquiryDeleteButton } from './delete-button'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const result = await getInquiry(id)
  const inquiry = result.data as any
  return {
    title: inquiry ? `${inquiry.fullName} – Anfrage` : 'Anfrage',
  }
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

const preferredCallbackLabels: Record<string, string> = {
  VORMITTAGS: 'Vormittags',
  NACHMITTAGS: 'Nachmittags',
  ABENDS: 'Abends',
  JEDERZEIT: 'Jederzeit',
}

function InfoRow({ icon: Icon, label, children }: { icon: React.ElementType; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-warm-100">
        <Icon className="h-4 w-4 text-warm-500" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-warm-500">{label}</p>
        <div className="mt-0.5 text-sm text-warm-800">{children}</div>
      </div>
    </div>
  )
}

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [inquiryResult, usersResult] = await Promise.all([
    getInquiry(id),
    getUsers(),
  ])

  if (!inquiryResult.success || !inquiryResult.data) {
    notFound()
  }

  const inquiry = inquiryResult.data as any
  const users = ((usersResult.data ?? []) as any[]).filter((u: any) => u.active !== false)
  const priority = priorityConfig[inquiry.priority] ?? { label: inquiry.priority, variant: 'default' as const }

  return (
    <div className="space-y-6">
      {/* Back link + header */}
      <div>
        <Link
          href="/admin/inquiries"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-warm-500 transition-colors hover:text-warm-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zu Anfragen
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-warm-900">{inquiry.fullName}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <InquiryStatusBadge status={inquiry.status} />
              <Badge variant={priority.variant}>{priority.label}</Badge>
              <span className="text-xs text-warm-400">
                Erstellt am {formatDate(inquiry.createdAt)}
              </span>
            </div>
          </div>
          <InquiryDeleteButton inquiryId={inquiry.id} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content — left 2 cols */}
        <div className="space-y-6 lg:col-span-2">
          {/* Contact info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4 text-warm-400" />
                Kontaktdaten
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0 divide-y divide-warm-100 pt-0">
              <InfoRow icon={Mail} label="E-Mail">
                <a href={`mailto:${inquiry.email}`} className="text-primary-600 hover:text-primary-700">
                  {inquiry.email}
                </a>
              </InfoRow>
              {inquiry.phone && (
                <InfoRow icon={Phone} label="Telefon">
                  <a href={`tel:${inquiry.phone}`} className="text-primary-600 hover:text-primary-700">
                    {inquiry.phone}
                  </a>
                </InfoRow>
              )}
              {inquiry.preferredCallback && (
                <InfoRow icon={Clock} label="Bevorzugte Rückrufzeit">
                  {preferredCallbackLabels[inquiry.preferredCallback] ?? inquiry.preferredCallback}
                </InfoRow>
              )}
              <InfoRow icon={CalendarDays} label="Eingegangen am">
                {formatDateTime(inquiry.createdAt)}
              </InfoRow>
            </CardContent>
          </Card>

          {/* Message */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-warm-400" />
                Nachricht
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-warm-500">Anfrageart:</span>
                <Badge variant="outline">
                  {inquiryTypeLabels[inquiry.inquiryType] ?? inquiry.inquiryType}
                </Badge>
              </div>
              <div className="rounded-lg border border-warm-150 bg-warm-50/50 px-4 py-3">
                <p className="whitespace-pre-wrap text-sm text-warm-700 leading-relaxed">
                  {inquiry.message}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <StickyNote className="h-4 w-4 text-warm-400" />
                Interne Notizen
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <InquiryNotes inquiryId={inquiry.id} initialNotes={inquiry.notes ?? []} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar — right col */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Settings2 className="h-4 w-4 text-warm-400" />
                Verwaltung
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <InquiryStatusUpdate
                inquiryId={inquiry.id}
                currentStatus={inquiry.status}
                currentPriority={inquiry.priority}
                currentAssignedToId={inquiry.assignedTo?.id ?? null}
                users={users}
              />
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardContent className="space-y-3 py-5">
              <div>
                <p className="text-xs font-medium text-warm-500">Erstellt</p>
                <p className="mt-0.5 text-sm text-warm-700">{formatDateTime(inquiry.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-warm-500">Zuletzt aktualisiert</p>
                <p className="mt-0.5 text-sm text-warm-700">{formatDateTime(inquiry.updatedAt)}</p>
              </div>
              {inquiry.assignedTo && (
                <div>
                  <p className="text-xs font-medium text-warm-500">Zugewiesen an</p>
                  <p className="mt-0.5 text-sm text-warm-700">
                    {inquiry.assignedTo.firstName} {inquiry.assignedTo.lastName}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
