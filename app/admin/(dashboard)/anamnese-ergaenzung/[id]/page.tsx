import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Mail, Phone, User } from 'lucide-react'
import { formatDate, formatDateTime } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { checkAccess } from '@/lib/rbac/check'
import { AnamneseStatusBadge } from '@/components/ui/status-badge'
import { getAnamneseErgaenzung } from '@/lib/actions/anamnese-ergaenzung'
import { AnamneseErgaenzungForm } from '@/components/admin/anamnese-ergaenzung-form'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const result = await getAnamneseErgaenzung(id)
  const data = result.data
  return {
    title: data
      ? `${data.patientLastName}, ${data.patientFirstName} – Vor-Ort-Erfassung`
      : 'Anamnese-Ergänzung',
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

export default async function AnamneseErgaenzungDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!(await checkAccess('anamnese', 'view'))) {
    notFound()
  }

  const [result, canEdit] = await Promise.all([
    getAnamneseErgaenzung(id),
    checkAccess('anamnese', 'edit'),
  ])

  if (!result.success || !result.data) {
    notFound()
  }
  const data = result.data
  const fullName = `${data.patientFirstName} ${data.patientLastName}`

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/anamnese-ergaenzung"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-warm-500 transition-colors hover:text-warm-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zur Übersicht
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-warm-900">
              {data.patientLastName}, {data.patientFirstName}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <AnamneseStatusBadge status={data.status as 'NEU_EINGEGANGEN'} />
              <span className="text-xs text-warm-400">
                Bogen eingegangen {formatDate(data.submissionCreatedAt)}
              </span>
              {data.hasErgaenzung && data.ergaenzung.updatedAt && (
                <span className="text-xs text-warm-400">
                  · Erfasst {formatDateTime(new Date(data.ergaenzung.updatedAt))}
                  {data.filledByName ? ` von ${data.filledByName}` : ''}
                </span>
              )}
            </div>
          </div>
          <Link
            href={`/admin/anamnese/${data.submissionId}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-warm-200 bg-white px-3 py-1.5 text-sm font-medium text-warm-700 transition-colors hover:border-primary-300 hover:text-primary-700"
          >
            Vollständigen Bogen öffnen
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        <Card className="self-start lg:sticky lg:top-24">
          <CardHeader className="border-b border-warm-100 pb-3">
            <CardTitle className="text-base">Patient</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <InfoRow icon={User} label="Name">
              {fullName}
            </InfoRow>
            <InfoRow icon={Calendar} label="Geburtsdatum">
              {data.birthDate}
            </InfoRow>
            <InfoRow icon={Phone} label="Telefon">
              <a
                className="text-primary-600 hover:underline"
                href={`tel:${data.phone.replace(/\s/g, '')}`}
              >
                {data.phone}
              </a>
            </InfoRow>
            {data.email && (
              <InfoRow icon={Mail} label="E-Mail">
                <a
                  className="text-primary-600 hover:underline"
                  href={`mailto:${data.email}`}
                >
                  {data.email}
                </a>
              </InfoRow>
            )}
          </CardContent>
        </Card>

        <div className="min-w-0">
          <AnamneseErgaenzungForm
            submissionId={data.submissionId}
            patientName={fullName}
            initial={data.ergaenzung}
            hasErgaenzung={data.hasErgaenzung}
            canEdit={canEdit}
          />
        </div>
      </div>
    </div>
  )
}
