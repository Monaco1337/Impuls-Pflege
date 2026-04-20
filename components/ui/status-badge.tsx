import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

type ApplicantStatus =
  | 'NEU_EINGEGANGEN'
  | 'GESICHTET'
  | 'IN_PRUEFUNG'
  | 'INTERESSANT'
  | 'GESPRAECH_GEPLANT'
  | 'WARTELISTE'
  | 'ABGELEHNT'
  | 'EINGESTELLT'
  | 'ARCHIVIERT'

type InquiryStatus =
  | 'NEU'
  | 'IN_BEARBEITUNG'
  | 'RUECKRUF_GEPLANT'
  | 'WARTET_AUF_RUECKMELDUNG'
  | 'ERLEDIGT'
  | 'ARCHIVIERT'

const applicantLabels: Record<ApplicantStatus, string> = {
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

const inquiryLabels: Record<InquiryStatus, string> = {
  NEU: 'Neu',
  IN_BEARBEITUNG: 'In Bearbeitung',
  RUECKRUF_GEPLANT: 'Rückruf geplant',
  WARTET_AUF_RUECKMELDUNG: 'Wartet auf Rückmeldung',
  ERLEDIGT: 'Erledigt',
  ARCHIVIERT: 'Archiviert',
}

const applicantColors: Record<ApplicantStatus, string> = {
  NEU_EINGEGANGEN: 'bg-primary-50 text-primary-700',
  GESICHTET: 'bg-primary-100 text-primary-800',
  IN_PRUEFUNG: 'bg-warning-50 text-warning-700',
  INTERESSANT: 'bg-success-50 text-success-700',
  GESPRAECH_GEPLANT: 'bg-accent-50 text-accent-700',
  WARTELISTE: 'bg-warm-100 text-warm-600',
  ABGELEHNT: 'bg-error-50 text-error-700',
  EINGESTELLT: 'bg-success-50 text-success-700',
  ARCHIVIERT: 'bg-warm-100 text-warm-500',
}

const inquiryColors: Record<InquiryStatus, string> = {
  NEU: 'bg-primary-50 text-primary-700',
  IN_BEARBEITUNG: 'bg-warning-50 text-warning-700',
  RUECKRUF_GEPLANT: 'bg-accent-50 text-accent-700',
  WARTET_AUF_RUECKMELDUNG: 'bg-warm-100 text-warm-600',
  ERLEDIGT: 'bg-success-50 text-success-700',
  ARCHIVIERT: 'bg-warm-100 text-warm-500',
}

export interface ApplicantStatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: ApplicantStatus
}

export function ApplicantStatusBadge({ status, className, ...props }: ApplicantStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium leading-5',
        applicantColors[status],
        className,
      )}
      {...props}
    >
      {applicantLabels[status]}
    </span>
  )
}

export interface InquiryStatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: InquiryStatus
}

export function InquiryStatusBadge({ status, className, ...props }: InquiryStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium leading-5',
        inquiryColors[status],
        className,
      )}
      {...props}
    >
      {inquiryLabels[status]}
    </span>
  )
}
