import type {
  AnamneseStatus,
  ApplicantStatus,
  EmploymentType,
  InquiryPriority,
  InquiryStatus,
  RoleName,
} from '@/lib/types/enums'

export type JsonUser = {
  id: string
  /** Eindeutiger Anmeldename (ohne Leerzeichen); empfohlen für alle Konten. */
  username?: string | null
  email: string
  passwordHash: string
  firstName: string
  lastName: string
  avatar: string | null
  active: boolean
  role: RoleName
  /**
   * Wenn true, ist dieser Benutzer für alle Nicht-OWNER unsichtbar
   * (UI-Listen, Activity-Logs, Content-Metadaten, Direkt-Zugriff via ID).
   * Audit bleibt serverseitig vollständig erhalten und ist für OWNER abrufbar.
   */
  hidden?: boolean
  lastLoginAt: string | null
  createdAt: string
  updatedAt: string
}

export type JsonInquiry = {
  id: string
  fullName: string
  phone: string | null
  email: string
  inquiryType: string
  message: string
  preferredCallback: string | null
  status: InquiryStatus
  priority: InquiryPriority
  assignedToId: string | null
  createdAt: string
  updatedAt: string
}

export type JsonInquiryNote = {
  id: string
  inquiryId: string
  authorId: string
  content: string
  createdAt: string
}

export type InquiriesData = {
  inquiries: JsonInquiry[]
  notes: JsonInquiryNote[]
}

export type JsonApplicant = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string | null
  address: string | null
  positionApplied: string
  availability: string | null
  qualification: string | null
  experience: string | null
  motivation: string | null
  source: string
  status: ApplicantStatus
  assignedToId: string | null
  jobPostingId: string | null
  createdAt: string
  updatedAt: string
}

export type JsonApplicantNote = {
  id: string
  applicantId: string
  authorId: string
  content: string
  createdAt: string
}

export type JsonApplicantStatusHistory = {
  id: string
  applicantId: string
  fromStatus: ApplicantStatus
  toStatus: ApplicantStatus
  changedById: string
  note: string | null
  changedAt: string
}

export type JsonApplicantDocument = {
  id: string
  applicantId: string
  fileName: string
  fileType: string
  fileSize: number
  uploadedAt: string
  contentBase64: string
}

export type ApplicantsData = {
  applicants: JsonApplicant[]
  notes: JsonApplicantNote[]
  statusHistory: JsonApplicantStatusHistory[]
  documents: JsonApplicantDocument[]
}

/**
 * Datei, die zu einem Anamnesebogen gehört (z. B. Entlassungsbrief).
 * Wird genauso wie {@link JsonApplicantDocument} inline base64 gespeichert.
 */
export type JsonAnamneseDocument = {
  id: string
  submissionId: string
  /** Logische Kategorie ("entlassungsbrief", "befund", …) — primär fürs Filtern. */
  kind: string
  fileName: string
  fileType: string
  fileSize: number
  uploadedAt: string
  contentBase64: string
}

export type JsonAnamneseSubmission = {
  id: string
  status: AnamneseStatus
  patientFirstName: string
  patientLastName: string
  birthDate: string
  phone: string
  email: string | null
  payload: Record<string, unknown>
  assignedToId: string | null
  createdAt: string
  updatedAt: string
}

export type AnamneseData = {
  submissions: JsonAnamneseSubmission[]
  /** Optional, da Bestandsdateien diese Spalte noch nicht haben können. */
  documents?: JsonAnamneseDocument[]
}

export type JsonTag = {
  id: string
  name: string
  color: string | null
  createdAt: string
}

export type JsonApplicantTag = {
  applicantId: string
  tagId: string
}

export type JsonJobPosting = {
  id: string
  title: string
  slug: string
  department: string | null
  location: string
  employmentType: EmploymentType
  workload: string | null
  shortIntro: string
  description: string
  requirements: string | null
  benefits: string | null
  contactPersonId: string | null
  active: boolean
  publishDate: string
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export type JsonContentBlock = {
  id: string
  key: string
  title: string | null
  content: unknown
  imageUrl: string | null
  sortOrder: number
  updatedAt: string
  updatedById: string | null
}

export type JsonSetting = {
  id: string
  key: string
  value: unknown
}

export type JsonAuditLog = {
  id: string
  userId: string | null
  action: string
  entityType: string
  entityId: string | null
  metadata: unknown
  ipAddress: string | null
  createdAt: string
}

export const DATA_FILES = {
  users: 'users.json',
  inquiries: 'inquiries.json',
  applicants: 'applicants.json',
  anamnese: 'anamnese-submissions.json',
  applicantTags: 'applicant-tags.json',
  tags: 'tags.json',
  jobs: 'job-postings.json',
  content: 'content-blocks.json',
  settings: 'settings.json',
  audit: 'audit-logs.json',
} as const

export const MAX_AUDIT_LOGS = 500
/** Max. Binärgröße pro Bewerberdokument (Bytes), vor Base64 */
export const MAX_APPLICANT_DOCUMENT_BYTES = 4_000_000
/** Sicherheitslimit für die Summe aller Uploads pro Bewerbung (Bytes), vor Base64 */
export const MAX_APPLICANT_TOTAL_UPLOAD_BYTES = 7_000_000
