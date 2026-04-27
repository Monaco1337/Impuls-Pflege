import Link from 'next/link'
import { cn, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const STATUS_ORDER = [
  'NEU_EINGEGANGEN',
  'GESICHTET',
  'IN_PRUEFUNG',
  'INTERESSANT',
  'GESPRAECH_GEPLANT',
  'WARTELISTE',
  'ABGELEHNT',
  'EINGESTELLT',
  'ARCHIVIERT',
] as const

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

const columnAccent: Record<string, string> = {
  NEU_EINGEGANGEN: 'border-t-primary-400',
  GESICHTET: 'border-t-primary-500',
  IN_PRUEFUNG: 'border-t-warning-400',
  INTERESSANT: 'border-t-success-400',
  GESPRAECH_GEPLANT: 'border-t-accent-400',
  WARTELISTE: 'border-t-warm-400',
  ABGELEHNT: 'border-t-error-400',
  EINGESTELLT: 'border-t-success-500',
  ARCHIVIERT: 'border-t-warm-300',
}

const countBadgeVariant: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
  NEU_EINGEGANGEN: 'primary',
  GESICHTET: 'primary',
  IN_PRUEFUNG: 'warning',
  INTERESSANT: 'success',
  GESPRAECH_GEPLANT: 'primary',
  WARTELISTE: 'default',
  ABGELEHNT: 'error',
  EINGESTELLT: 'success',
  ARCHIVIERT: 'default',
}

interface Applicant {
  id: string
  firstName: string
  lastName: string
  positionApplied: string
  status: string
  createdAt: string | Date
  tags?: Array<{ tag: { id: string; name: string; color: string } }>
}

interface ApplicantPipelineProps {
  applicants: Applicant[]
}

export function ApplicantPipeline({ applicants }: ApplicantPipelineProps) {
  const grouped: Record<string, Applicant[]> = {}
  for (const status of STATUS_ORDER) {
    grouped[status] = []
  }
  for (const applicant of applicants) {
    if (grouped[applicant.status]) {
      grouped[applicant.status].push(applicant)
    }
  }

  return (
    <div className="overflow-x-auto pb-4">
      <div className="inline-flex gap-4" style={{ minWidth: 'max-content' }}>
        {STATUS_ORDER.map((status) => {
          const items = grouped[status]
          return (
            <div
              key={status}
              className={cn(
                'w-72 shrink-0 rounded-xl border border-warm-200 border-t-[3px] bg-warm-50/50',
                columnAccent[status],
              )}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <h3 className="text-sm font-semibold text-warm-800">
                  {statusLabels[status]}
                </h3>
                <Badge variant={countBadgeVariant[status] ?? 'default'}>
                  {items.length}
                </Badge>
              </div>

              <div className="space-y-2 px-3 pb-3">
                {items.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-warm-200 px-3 py-6 text-center">
                    <p className="text-xs text-warm-400">Keine Bewerber</p>
                  </div>
                ) : (
                  items.map((applicant) => (
                    <Link
                      key={applicant.id}
                      href={`/admin/applicants/${applicant.id}`}
                      prefetch
                      className="block rounded-xl border border-warm-200/90 bg-white p-3 shadow-sm ring-1 ring-black/[0.02] transition-all duration-200 hover:border-primary-300/80 hover:bg-gradient-to-br hover:from-primary-50/50 hover:to-white hover:shadow-md hover:ring-primary-500/10 active:scale-[0.99]"
                    >
                      <p className="text-sm font-medium text-warm-900">
                        {applicant.firstName} {applicant.lastName}
                      </p>
                      <p className="mt-0.5 text-xs text-warm-500">
                        {applicant.positionApplied}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        {applicant.tags && applicant.tags.length > 0 ? (
                          <div className="flex gap-1">
                            {applicant.tags.slice(0, 4).map((t) => (
                              <span
                                key={t.tag.id}
                                className="inline-block h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: t.tag.color }}
                                title={t.tag.name}
                              />
                            ))}
                            {applicant.tags.length > 4 && (
                              <span className="text-[10px] text-warm-400">
                                +{applicant.tags.length - 4}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span />
                        )}
                        <time className="text-[11px] text-warm-400">
                          {formatDate(applicant.createdAt)}
                        </time>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
