import path from 'path'
import crypto from 'crypto'
import {
  MAX_APPLICANT_DOCUMENT_BYTES,
} from '@/lib/data/schema'
import {
  repoAddApplicantDocument,
  repoApplicantDocumentToBuffer,
  repoDeleteApplicantDocument,
} from '@/lib/data/json-repository'

const MAX_FILE_SIZE = (parseInt(process.env.MAX_FILE_SIZE_MB || '10') * 1024 * 1024)

const ALLOWED_TYPES: Record<string, string[]> = {
  document: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  image: [
    'image/jpeg',
    'image/png',
    'image/webp',
  ],
}

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.webp']

function generateSecureFilename(originalName: string): string {
  const ext = path.extname(originalName).toLowerCase()
  const hash = crypto.randomBytes(16).toString('hex')
  const timestamp = Date.now()
  return `${timestamp}-${hash}${ext}`
}

function validateFileType(fileName: string, mimeType: string): boolean {
  const ext = path.extname(fileName).toLowerCase()
  if (!ALLOWED_EXTENSIONS.includes(ext)) return false
  const allAllowed = [...ALLOWED_TYPES.document, ...ALLOWED_TYPES.image]
  return allAllowed.includes(mimeType)
}

/**
 * Speichert eine Datei für einen Bewerber (Binär in applicants.json / GitHub).
 * `subDir` muss `applicants/{applicantId}` sein.
 */
export async function saveFile(
  file: File,
  subDir: string = 'general',
): Promise<{ fileName: string; filePath: string; fileType: string; fileSize: number }> {
  const maxBytes = Math.min(MAX_FILE_SIZE, MAX_APPLICANT_DOCUMENT_BYTES)
  if (file.size > maxBytes) {
    throw new Error(`Datei zu groß. Maximum: ${Math.round(maxBytes / 1024 / 1024)} MB`)
  }

  if (!validateFileType(file.name, file.type)) {
    throw new Error('Dateityp nicht erlaubt. Erlaubt: PDF, DOC, DOCX, JPG, PNG, WebP')
  }

  const m = subDir.match(/^applicants\/([^/]+)$/)
  if (!m) {
    throw new Error('Uploads sind nur für Bewerber-Dokumente unter applicants/{id} erlaubt.')
  }
  const applicantId = m[1]

  const buffer = Buffer.from(await file.arrayBuffer())
  const secureName = generateSecureFilename(file.name)
  const doc = await repoAddApplicantDocument({
    applicantId,
    fileName: file.name,
    fileType: file.type,
    buffer,
  })
  void secureName
  return {
    fileName: doc.fileName,
    filePath: doc.id,
    fileType: doc.fileType,
    fileSize: doc.fileSize,
  }
}

export async function getFile(filePath: string): Promise<Buffer> {
  const hit = await repoApplicantDocumentToBuffer(filePath)
  if (!hit) throw new Error('Datei nicht gefunden')
  return hit.buffer
}

export async function deleteFile(filePath: string): Promise<void> {
  await repoDeleteApplicantDocument(filePath)
}

export { MAX_FILE_SIZE as MAX_FILE_SIZE_BYTES, ALLOWED_EXTENSIONS }
