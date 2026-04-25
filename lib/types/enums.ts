/** Ersetzt frühere @prisma/client-Enums (kein Prisma mehr). */

export const RoleName = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  RECRUITING: 'RECRUITING',
  OFFICE_STAFF: 'OFFICE_STAFF',
  CONTENT_MANAGER: 'CONTENT_MANAGER',
  READ_ONLY: 'READ_ONLY',
} as const
export type RoleName = (typeof RoleName)[keyof typeof RoleName]

export const ApplicantStatus = {
  NEU_EINGEGANGEN: 'NEU_EINGEGANGEN',
  GESICHTET: 'GESICHTET',
  IN_PRUEFUNG: 'IN_PRUEFUNG',
  INTERESSANT: 'INTERESSANT',
  GESPRAECH_GEPLANT: 'GESPRAECH_GEPLANT',
  WARTELISTE: 'WARTELISTE',
  ABGELEHNT: 'ABGELEHNT',
  EINGESTELLT: 'EINGESTELLT',
  ARCHIVIERT: 'ARCHIVIERT',
} as const
export type ApplicantStatus = (typeof ApplicantStatus)[keyof typeof ApplicantStatus]

export const InquiryStatus = {
  NEU: 'NEU',
  IN_BEARBEITUNG: 'IN_BEARBEITUNG',
  RUECKRUF_GEPLANT: 'RUECKRUF_GEPLANT',
  WARTET_AUF_RUECKMELDUNG: 'WARTET_AUF_RUECKMELDUNG',
  ERLEDIGT: 'ERLEDIGT',
  ARCHIVIERT: 'ARCHIVIERT',
} as const
export type InquiryStatus = (typeof InquiryStatus)[keyof typeof InquiryStatus]

export const InquiryPriority = {
  NIEDRIG: 'NIEDRIG',
  NORMAL: 'NORMAL',
  HOCH: 'HOCH',
  DRINGEND: 'DRINGEND',
} as const
export type InquiryPriority = (typeof InquiryPriority)[keyof typeof InquiryPriority]

export const EmploymentType = {
  VOLLZEIT: 'VOLLZEIT',
  TEILZEIT: 'TEILZEIT',
  MINIJOB: 'MINIJOB',
  WERKSTUDENT: 'WERKSTUDENT',
  PRAKTIKUM: 'PRAKTIKUM',
  FREIBERUFLICH: 'FREIBERUFLICH',
} as const
export type EmploymentType = (typeof EmploymentType)[keyof typeof EmploymentType]

export const AnamneseStatus = {
  NEU_EINGEGANGEN: 'NEU_EINGEGANGEN',
  GESICHTET: 'GESICHTET',
  IN_BEARBEITUNG: 'IN_BEARBEITUNG',
  ERLEDIGT: 'ERLEDIGT',
  ARCHIVIERT: 'ARCHIVIERT',
} as const
export type AnamneseStatus = (typeof AnamneseStatus)[keyof typeof AnamneseStatus]
