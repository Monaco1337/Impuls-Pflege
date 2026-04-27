import { readJsonFile, writeJsonFile } from '@/lib/storage/json-data-layer'
import { signInNameForUser } from '@/lib/data/user-login'
import {
  type AnamneseData,
  type ApplicantsData,
  type InquiriesData,
  type JsonApplicantDocument,
  type JsonApplicantTag,
  type JsonAuditLog,
  type JsonContentBlock,
  type JsonJobPosting,
  type JsonSetting,
  type JsonTag,
  type JsonUser,
  DATA_FILES,
  MAX_APPLICANT_DOCUMENT_BYTES,
  MAX_AUDIT_LOGS,
} from '@/lib/data/schema'

const emptyInquiries = (): InquiriesData => ({ inquiries: [], notes: [] })
const emptyApplicants = (): ApplicantsData => ({
  applicants: [],
  notes: [],
  statusHistory: [],
  documents: [],
})

const emptyAnamnese = (): AnamneseData => ({ submissions: [] })

export function newId(): string {
  return globalThis.crypto.randomUUID()
}

export function nowIso(): string {
  return new Date().toISOString()
}

async function saveUsers(users: JsonUser[]) {
  await writeJsonFile(
    DATA_FILES.users,
    users,
    `Data update ${DATA_FILES.users}: ${nowIso()}`,
  )
}

async function saveInquiries(data: InquiriesData) {
  await writeJsonFile(
    DATA_FILES.inquiries,
    data,
    `Data update ${DATA_FILES.inquiries}: ${nowIso()}`,
  )
}

async function saveApplicants(data: ApplicantsData) {
  await writeJsonFile(
    DATA_FILES.applicants,
    data,
    `Data update ${DATA_FILES.applicants}: ${nowIso()}`,
  )
}

async function saveApplicantTags(rows: JsonApplicantTag[]) {
  await writeJsonFile(
    DATA_FILES.applicantTags,
    rows,
    `Data update ${DATA_FILES.applicantTags}: ${nowIso()}`,
  )
}

async function saveTags(tags: JsonTag[]) {
  await writeJsonFile(DATA_FILES.tags, tags, `Data update ${DATA_FILES.tags}: ${nowIso()}`)
}

async function saveJobs(jobs: JsonJobPosting[]) {
  await writeJsonFile(DATA_FILES.jobs, jobs, `Data update ${DATA_FILES.jobs}: ${nowIso()}`)
}

async function saveContent(blocks: JsonContentBlock[]) {
  await writeJsonFile(DATA_FILES.content, blocks, `Data update ${DATA_FILES.content}: ${nowIso()}`)
}

async function saveSettings(settings: JsonSetting[]) {
  await writeJsonFile(DATA_FILES.settings, settings, `Data update ${DATA_FILES.settings}: ${nowIso()}`)
}

async function saveAudit(logs: JsonAuditLog[]) {
  await writeJsonFile(DATA_FILES.audit, logs, `Data update ${DATA_FILES.audit}: ${nowIso()}`)
}

export async function repoLoadUsers(): Promise<JsonUser[]> {
  return readJsonFile<JsonUser[]>(DATA_FILES.users, [])
}

export async function repoLoadInquiries(): Promise<InquiriesData> {
  const raw = await readJsonFile<Partial<InquiriesData>>(DATA_FILES.inquiries, {})
  return {
    inquiries: Array.isArray(raw.inquiries) ? raw.inquiries : [],
    notes: Array.isArray(raw.notes) ? raw.notes : [],
  }
}

export async function repoLoadApplicants(): Promise<ApplicantsData> {
  const raw = await readJsonFile<Partial<ApplicantsData>>(DATA_FILES.applicants, {})
  return {
    applicants: Array.isArray(raw.applicants) ? raw.applicants : [],
    notes: Array.isArray(raw.notes) ? raw.notes : [],
    statusHistory: Array.isArray(raw.statusHistory) ? raw.statusHistory : [],
    documents: Array.isArray(raw.documents) ? raw.documents : [],
  }
}

export async function repoLoadAnamnese(): Promise<AnamneseData> {
  const raw = await readJsonFile<Partial<AnamneseData>>(DATA_FILES.anamnese, emptyAnamnese())
  return {
    submissions: Array.isArray(raw.submissions) ? raw.submissions : [],
  }
}

export async function repoLoadApplicantTags(): Promise<JsonApplicantTag[]> {
  return readJsonFile<JsonApplicantTag[]>(DATA_FILES.applicantTags, [])
}

export async function repoLoadTags(): Promise<JsonTag[]> {
  return readJsonFile<JsonTag[]>(DATA_FILES.tags, [])
}

export async function repoLoadJobs(): Promise<JsonJobPosting[]> {
  return readJsonFile<JsonJobPosting[]>(DATA_FILES.jobs, [])
}

export async function repoLoadContentBlocks(): Promise<JsonContentBlock[]> {
  return readJsonFile<JsonContentBlock[]>(DATA_FILES.content, [])
}

export async function repoLoadSettings(): Promise<JsonSetting[]> {
  return readJsonFile<JsonSetting[]>(DATA_FILES.settings, [])
}

export async function repoLoadAuditLogs(): Promise<JsonAuditLog[]> {
  return readJsonFile<JsonAuditLog[]>(DATA_FILES.audit, [])
}

export function repoPickUser(u: JsonUser) {
  return {
    id: u.id,
    username: u.username ?? null,
    email: u.email,
    firstName: u.firstName,
    lastName: u.lastName,
    role: u.role,
    active: u.active,
    hidden: u.hidden ?? false,
    avatar: u.avatar,
    lastLoginAt: u.lastLoginAt ? new Date(u.lastLoginAt) : null,
    createdAt: new Date(u.createdAt),
    updatedAt: new Date(u.updatedAt),
  }
}

/**
 * Liefert die IDs aller hidden user (inkl. OWNER + ID-Fallback).
 * Wird für Server-side-Filter in Audit/Activity/Notifications verwendet.
 */
export async function repoLoadHiddenUserIds(): Promise<Set<string>> {
  const users = await repoLoadUsers()
  const ids = new Set<string>()
  for (const u of users) {
    if (u.hidden === true || u.role === 'OWNER') ids.add(u.id)
  }
  return ids
}

export async function repoFindUserByEmail(email: string): Promise<JsonUser | null> {
  const users = await repoLoadUsers()
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null
}

/** Login über Benutzername (normalisiert), optional Legacy-Match über E-Mail-Lokalteil. */
export async function repoFindUserBySignInName(login: string): Promise<JsonUser | null> {
  const normalized = login.trim().toLowerCase()
  if (!normalized) return null
  const users = await repoLoadUsers()
  return users.find((u) => signInNameForUser(u) === normalized) ?? null
}

export async function repoFindUserById(id: string): Promise<JsonUser | null> {
  const users = await repoLoadUsers()
  return users.find((u) => u.id === id) ?? null
}

export async function repoUpdateUserLastLogin(id: string): Promise<void> {
  const users = await repoLoadUsers()
  const u = users.find((x) => x.id === id)
  if (!u) return
  u.lastLoginAt = nowIso()
  u.updatedAt = nowIso()
  await saveUsers(users)
}

export async function repoAppendAudit(entry: {
  userId?: string | null
  action: string
  entityType: string
  entityId?: string | null
  metadata?: unknown
  ipAddress?: string | null
}): Promise<void> {
  const logs = await repoLoadAuditLogs()
  const row: JsonAuditLog = {
    id: newId(),
    userId: entry.userId ?? null,
    action: entry.action,
    entityType: entry.entityType,
    entityId: entry.entityId ?? null,
    metadata: entry.metadata ?? null,
    ipAddress: entry.ipAddress ?? null,
    createdAt: nowIso(),
  }
  logs.push(row)
  while (logs.length > MAX_AUDIT_LOGS) logs.shift()
  await saveAudit(logs)
}

/**
 * Auflösung einer User-ID zu einem öffentlich anzeigbaren Brief.
 *
 * Hidden user (Owner-Konten) werden für Nicht-Owner auf `null` abgebildet,
 * damit sie in Listen, Notizen, Status-History, Zuweisungen, Kontaktpersonen
 * etc. nicht als „geändert/erstellt von …“ erscheinen.
 *
 * Audit-Schreibungen und IDs in den JSON-Dateien bleiben davon unberührt –
 * Filterung passiert ausschließlich beim Lesen.
 *
 * @param viewerRole Wenn `'OWNER'`, wird auch hidden user als Brief zurückgegeben.
 */
export async function repoJoinUserBrief(
  id: string | null,
  viewerRole?: string,
) {
  if (!id) return null
  const u = await repoFindUserById(id)
  if (!u) return null
  if ((u.hidden === true || u.role === 'OWNER') && viewerRole !== 'OWNER') {
    return null
  }
  return { id: u.id, firstName: u.firstName, lastName: u.lastName, email: u.email }
}

export async function repoJoinUserBriefNoEmail(
  id: string | null,
  viewerRole?: string,
) {
  if (!id) return null
  const u = await repoFindUserById(id)
  if (!u) return null
  if ((u.hidden === true || u.role === 'OWNER') && viewerRole !== 'OWNER') {
    return null
  }
  return { id: u.id, firstName: u.firstName, lastName: u.lastName }
}

export async function repoApplicantDocumentToBuffer(id: string): Promise<{
  buffer: Buffer
  fileName: string
  fileType: string
} | null> {
  const d = await repoLoadApplicants()
  const doc = d.documents.find((x) => x.id === id)
  if (!doc) return null
  return {
    buffer: Buffer.from(doc.contentBase64, 'base64'),
    fileName: doc.fileName,
    fileType: doc.fileType,
  }
}

export async function repoAddApplicantDocument(
  doc: Pick<JsonApplicantDocument, 'applicantId' | 'fileName' | 'fileType'> & {
    buffer: Buffer
  },
): Promise<JsonApplicantDocument> {
  if (doc.buffer.length > MAX_APPLICANT_DOCUMENT_BYTES) {
    throw new Error(`Datei zu groß (max. ${Math.round(MAX_APPLICANT_DOCUMENT_BYTES / 1024 / 1024)} MB)`)
  }
  const d = await repoLoadApplicants()
  const row: JsonApplicantDocument = {
    id: newId(),
    applicantId: doc.applicantId,
    fileName: doc.fileName,
    fileType: doc.fileType,
    fileSize: doc.buffer.length,
    uploadedAt: nowIso(),
    contentBase64: doc.buffer.toString('base64'),
  }
  d.documents.push(row)
  await saveApplicants(d)
  return row
}

export async function repoDeleteApplicantDocument(id: string): Promise<boolean> {
  const d = await repoLoadApplicants()
  const before = d.documents.length
  d.documents = d.documents.filter((x) => x.id !== id)
  if (d.documents.length === before) return false
  await saveApplicants(d)
  return true
}
