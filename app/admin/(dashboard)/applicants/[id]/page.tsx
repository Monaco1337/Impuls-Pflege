import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  GraduationCap,
  Briefcase,
  FileText,
  StickyNote,
  History,
  Settings2,
  Tag,
  ArrowRight,
} from 'lucide-react'
import { cn, formatDate, formatDateTime } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ApplicantStatusBadge } from '@/components/ui/status-badge'
import { acknowledgeApplicantOnOpen, getApplicant } from '@/lib/actions/applicants'
import { getUsers } from '@/lib/actions/users'
import { getTags } from '@/lib/actions/tags'
import { ApplicantStatusUpdate } from '@/components/admin/applicant-status-update'
import { ApplicantTags } from '@/components/admin/applicant-tags'
import { ApplicantNotes } from '@/components/admin/applicant-notes'
import { ApplicantDocumentsList } from '@/components/admin/applicant-documents-list'
import { ApplicantInboxRefreshOnMount } from '@/components/admin/applicant-inbox-refresh-on-mount'
import { ApplicantDeleteButton } from './delete-button'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const result = await getApplicant(id)
  const applicant = result.data as any
  return {
    title: applicant
      ? `${applicant.firstName} ${applicant.lastName} – Bewerber`
      : 'Bewerber',
  }
}

export const dynamic = 'force-dynamic'

const statusLabels: Record<string, string> = {
  NEU_EINGEGANGEN: 'Neu eingegangen',
  GESICHTET: 'Gesichtet',
  IN_PRUEFUNG: 'In Prüfung',
  INTERESSANT: 'Interessant',
  GESPRAECH_GEPLANT: 'Gespräch geplant',
  WARTELISTE: 'Warteliste',
  ABGELEHNT: 'Abgelehnt',
  EINGESTELLT: 'Eingestellt',
  ARCHIVIERT: 'Archiviert',
}

const sourceLabels: Record<string, string> = {
  WEBSITE: 'Website',
  JOBPORTAL: 'Jobportal',
  EMPFEHLUNG: 'Empfehlung',
  INITIATIV: 'Initiativbewerbung',
  MESSE: 'Messe',
  SONSTIGES: 'Sonstiges',
}

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

export default async function ApplicantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  await acknowledgeApplicantOnOpen(id)

  const [applicantResult, usersResult, tagsResult] = await Promise.all([
    getApplicant(id),
    getUsers(),
    getTags(),
  ])

  if (!applicantResult.success || !applicantResult.data) {
    notFound()
  }

  const applicant = applicantResult.data as any
  const users = ((usersResult.data ?? []) as any[]).filter(
    (u: any) => u.active !== false,
  )
  const allTags = (tagsResult.data ?? []) as any[]

  return (
    <div className="space-y-6">
      <ApplicantInboxRefreshOnMount />
      {/* Back link + header */}
      <div>
        <Link
          href="/admin/applicants"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-warm-500 transition-colors hover:text-warm-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zu Bewerber
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-warm-900">
              {applicant.firstName} {applicant.lastName}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <ApplicantStatusBadge status={applicant.status} />
              {applicant.positionApplied && (
                <Badge variant="outline">{applicant.positionApplied}</Badge>
              )}
              <span className="text-xs text-warm-400">
                Beworben am {formatDate(applicant.createdAt)}
              </span>
            </div>
          </div>
          <ApplicantDeleteButton applicantId={applicant.id} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Personal info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Briefcase className="h-4 w-4 text-warm-400" />
                Persönliche Informationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0 divide-y divide-warm-100 pt-0">
              <InfoRow icon={Mail} label="E-Mail">
                <a
                  href={`mailto:${applicant.email}`}
                  className="text-primary-600 hover:text-primary-700"
                >
                  {applicant.email}
                </a>
              </InfoRow>
              {applicant.phone && (
                <InfoRow icon={Phone} label="Telefon">
                  <a
                    href={`tel:${applicant.phone}`}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {applicant.phone}
                  </a>
                </InfoRow>
              )}
              {applicant.address && (
                <InfoRow icon={MapPin} label="Adresse">
                  {applicant.address}
                </InfoRow>
              )}
              {applicant.availability && (
                <InfoRow icon={Clock} label="Verfügbarkeit">
                  {applicant.availability}
                </InfoRow>
              )}
              {applicant.qualification && (
                <InfoRow icon={GraduationCap} label="Qualifikation">
                  {applicant.qualification}
                </InfoRow>
              )}
              {applicant.experience && (
                <InfoRow icon={Briefcase} label="Berufserfahrung">
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {applicant.experience}
                  </p>
                </InfoRow>
              )}
            </CardContent>
          </Card>

          {/* Motivation */}
          {applicant.motivation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4 text-warm-400" />
                  Motivation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="rounded-lg border border-warm-150 bg-warm-50/50 px-4 py-3">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-warm-700">
                    {applicant.motivation}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-warm-400" />
                Dokumente
                {applicant.documents?.length > 0 && (
                  <Badge variant="outline">{applicant.documents.length}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ApplicantDocumentsList
                documents={applicant.documents ?? []}
              />
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
              <ApplicantNotes
                applicantId={applicant.id}
                initialNotes={applicant.notes ?? []}
              />
            </CardContent>
          </Card>

          {/* Status history */}
          {applicant.statusHistory?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <History className="h-4 w-4 text-warm-400" />
                  Statusverlauf
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-0">
                  {applicant.statusHistory.map(
                    (entry: any, index: number) => (
                      <div
                        key={entry.id}
                        className={cn(
                          'relative py-4 pl-6',
                          index < applicant.statusHistory.length - 1 &&
                            'border-b border-warm-100',
                        )}
                      >
                        <div className="absolute left-0 top-5 h-2 w-2 rounded-full bg-warm-300" />
                        {index < applicant.statusHistory.length - 1 && (
                          <div className="absolute bottom-0 left-[3px] top-7 w-px bg-warm-200" />
                        )}
                        <div className="flex items-baseline justify-between gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-warm-600">
                              {statusLabels[entry.fromStatus] ??
                                entry.fromStatus}
                            </span>
                            <ArrowRight className="h-3 w-3 text-warm-400" />
                            <span className="font-medium text-warm-900">
                              {statusLabels[entry.toStatus] ?? entry.toStatus}
                            </span>
                          </div>
                          <time className="shrink-0 text-xs text-warm-400">
                            {formatDateTime(entry.changedAt)}
                          </time>
                        </div>
                        <p className="mt-0.5 text-xs text-warm-500">
                          von {entry.changedBy?.firstName}{' '}
                          {entry.changedBy?.lastName}
                        </p>
                        {entry.note && (
                          <p className="mt-1.5 rounded-md bg-warm-50 px-3 py-2 text-sm text-warm-600">
                            {entry.note}
                          </p>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Settings2 className="h-4 w-4 text-warm-400" />
                Verwaltung
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ApplicantStatusUpdate
                applicantId={applicant.id}
                currentStatus={applicant.status}
                currentAssignedToId={applicant.assignedTo?.id ?? null}
                users={users}
              />
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Tag className="h-4 w-4 text-warm-400" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ApplicantTags
                applicantId={applicant.id}
                currentTags={
                  applicant.tags?.map((t: any) => t.tag) ?? []
                }
                availableTags={allTags}
              />
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardContent className="space-y-3 py-5">
              {applicant.source && (
                <div>
                  <p className="text-xs font-medium text-warm-500">Quelle</p>
                  <p className="mt-0.5 text-sm text-warm-700">
                    {sourceLabels[applicant.source] ?? applicant.source}
                  </p>
                </div>
              )}
              {applicant.jobPosting && (
                <div>
                  <p className="text-xs font-medium text-warm-500">
                    Stellenanzeige
                  </p>
                  <p className="mt-0.5 text-sm text-primary-600">
                    {applicant.jobPosting.title}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs font-medium text-warm-500">Erstellt</p>
                <p className="mt-0.5 text-sm text-warm-700">
                  {formatDateTime(applicant.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-warm-500">
                  Zuletzt aktualisiert
                </p>
                <p className="mt-0.5 text-sm text-warm-700">
                  {formatDateTime(applicant.updatedAt)}
                </p>
              </div>
              {applicant.assignedTo && (
                <div>
                  <p className="text-xs font-medium text-warm-500">
                    Zugewiesen an
                  </p>
                  <p className="mt-0.5 text-sm text-warm-700">
                    {applicant.assignedTo.firstName}{' '}
                    {applicant.assignedTo.lastName}
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
