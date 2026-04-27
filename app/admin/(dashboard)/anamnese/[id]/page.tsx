import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Phone, Mail, User, Calendar, Stethoscope, Settings2 } from 'lucide-react'
import { formatDate, formatDateTime } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { AnamneseStatusBadge } from '@/components/ui/status-badge'
import { acknowledgeAnamneseOnOpen, getAnamneseSubmission } from '@/lib/actions/anamnese'
import { getUsers } from '@/lib/actions/users'
import { AnamneseStatusUpdate } from '@/components/admin/anamnese-status-update'
import { AnamnesePayloadView } from '@/components/admin/anamnese-payload-view'
import { checkAccess } from '@/lib/rbac/check'
import { AnamneseDeleteButton } from './delete-button'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const result = await getAnamneseSubmission(id)
  const s = result.data as { patientFirstName?: string; patientLastName?: string } | undefined
  return {
    title: s
      ? `${s.patientLastName}, ${s.patientFirstName} – Anamnese`
      : 'Anamnesebogen',
  }
}

export const dynamic = 'force-dynamic'

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
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

export default async function AnamneseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!(await checkAccess('anamnese', 'view'))) {
    notFound()
  }

  await acknowledgeAnamneseOnOpen(id)

  const [subResult, usersResult, canEdit, canDelete] = await Promise.all([
    getAnamneseSubmission(id),
    getUsers(),
    checkAccess('anamnese', 'edit'),
    checkAccess('anamnese', 'delete'),
  ])

  if (!subResult.success || !subResult.data) {
    notFound()
  }

  const s = subResult.data as {
    id: string
    status: string
    patientFirstName: string
    patientLastName: string
    birthDate: string
    phone: string
    email: string | null
    payload: Record<string, unknown>
    assignedToId: string | null
    createdAt: Date
    updatedAt: Date
    assignedTo: { firstName: string; lastName: string } | null
  }
  const users = ((usersResult.data ?? []) as { id: string; firstName: string; lastName: string; role: string; active?: boolean }[]).filter(
    (u) => u.active !== false,
  )
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/anamnese"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-warm-500 transition-colors hover:text-warm-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zu Anamnesebögen
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-warm-900">
              {s.patientLastName}, {s.patientFirstName}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <AnamneseStatusBadge status={s.status as any} />
              <span className="text-xs text-warm-400">
                Eingegangen {formatDate(s.createdAt)} · zuletzt {formatDateTime(s.updatedAt)}
              </span>
            </div>
          </div>
          {canDelete && <AnamneseDeleteButton submissionId={s.id} />}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_17rem]">
        <div className="space-y-6 min-w-0">
          <Card>
            <CardHeader className="border-b border-warm-100 pb-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-primary-500" />
                <CardTitle className="text-base">Stammdaten (Kopie)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <InfoRow icon={User} label="Name">
                {s.patientFirstName} {s.patientLastName}
              </InfoRow>
              <InfoRow icon={Calendar} label="Geburtsdatum">
                {s.birthDate}
              </InfoRow>
              <InfoRow icon={Phone} label="Telefon">
                <a className="text-primary-600 hover:underline" href={`tel:${s.phone.replace(/\s/g, '')}`}>
                  {s.phone}
                </a>
              </InfoRow>
              {s.email && (
                <InfoRow icon={Mail} label="E-Mail">
                  <a className="text-primary-600 hover:underline" href={`mailto:${s.email}`}>
                    {s.email}
                  </a>
                </InfoRow>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-warm-100 pb-3">
              <CardTitle className="text-base">Vollständiger Anamnesebogen</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <AnamnesePayloadView payload={s.payload} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:min-w-0">
          {canEdit ? (
            <Card>
              <CardHeader className="border-b border-warm-100 pb-3">
                <div className="flex items-center gap-2">
                  <Settings2 className="h-4 w-4 text-warm-500" />
                  <CardTitle className="text-sm font-semibold">Bearbeitung</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <AnamneseStatusUpdate
                  submissionId={s.id}
                  currentStatus={s.status}
                  currentAssignedToId={s.assignedToId}
                  users={users}
                />
              </CardContent>
            </Card>
          ) : (
            <p className="rounded-xl border border-warm-200/80 bg-warm-50/50 px-4 py-3 text-sm text-warm-600">
              Sie haben nur Leserechte für Anamnesebögen.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
