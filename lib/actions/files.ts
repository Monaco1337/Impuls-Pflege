'use server'

import { requireAccess } from '@/lib/rbac/check'
import { logAudit } from '@/lib/audit/logger'
import { saveFile, deleteFile } from '@/lib/storage'
import { revalidatePath } from 'next/cache'
import { logServerError } from '@/lib/error-handling'
import { repoLoadApplicants } from '@/lib/data/json-repository'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

export async function getFiles(filters?: {
  page?: number
  pageSize?: number
  fileType?: string
  applicantId?: string
}): Promise<ActionResult> {
  try {
    await requireAccess('files', 'view')

    const page = filters?.page ?? 1
    const pageSize = filters?.pageSize ?? 20
    const skip = (page - 1) * pageSize

    const bundle = await repoLoadApplicants()
    let docs = bundle.documents

    if (filters?.fileType) docs = docs.filter((d) => d.fileType === filters.fileType)
    if (filters?.applicantId) docs = docs.filter((d) => d.applicantId === filters.applicantId)

    docs = [...docs].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    const total = docs.length
    const slice = docs.slice(skip, skip + pageSize)

    const files = slice.map((d) => {
      const applicant = bundle.applicants.find((a) => a.id === d.applicantId)
      return {
        id: d.id,
        applicantId: d.applicantId,
        fileName: d.fileName,
        fileType: d.fileType,
        filePath: d.id,
        fileSize: d.fileSize,
        uploadedAt: new Date(d.uploadedAt),
        applicant: applicant
          ? { id: applicant.id, firstName: applicant.firstName, lastName: applicant.lastName }
          : { id: d.applicantId, firstName: '?', lastName: '?' },
      }
    })

    return {
      success: true,
      data: { files, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    }
  } catch (error) {
    logServerError('getFiles error', error)
    return { success: false, error: 'Dateien konnten nicht geladen werden' }
  }
}

export async function uploadFile(formData: FormData, applicantId: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('files', 'create')

    const file = formData.get('file') as File | null
    if (!file || file.size === 0) {
      return { success: false, error: 'Keine Datei ausgewählt' }
    }

    const bundle = await repoLoadApplicants()
    if (!bundle.applicants.some((a) => a.id === applicantId)) {
      return { success: false, error: 'Bewerber nicht gefunden' }
    }

    const saved = await saveFile(file, `applicants/${applicantId}`)

    const document = {
      id: saved.filePath,
      applicantId,
      fileName: saved.fileName,
      fileType: saved.fileType,
      filePath: saved.filePath,
      fileSize: saved.fileSize,
      uploadedAt: new Date(),
    }

    await logAudit({
      userId: user.id,
      action: 'upload',
      entityType: 'document',
      entityId: document.id,
      metadata: { fileName: saved.fileName, applicantId },
    })

    revalidatePath(`/admin/applicants/${applicantId}`)
    return { success: true, data: document }
  } catch (error) {
    logServerError('uploadFile error', error)
    return { success: false, error: 'Datei konnte nicht hochgeladen werden' }
  }
}

export async function deleteFileRecord(id: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('files', 'delete')

    const bundle = await repoLoadApplicants()
    const document = bundle.documents.find((d) => d.id === id)
    if (!document) return { success: false, error: 'Dokument nicht gefunden' }

    await deleteFile(document.id)

    await logAudit({
      userId: user.id,
      action: 'delete',
      entityType: 'document',
      entityId: id,
      metadata: { fileName: document.fileName, applicantId: document.applicantId },
    })

    revalidatePath(`/admin/applicants/${document.applicantId}`)
    return { success: true }
  } catch (error) {
    logServerError('deleteFileRecord error', error)
    return { success: false, error: 'Dokument konnte nicht gelöscht werden' }
  }
}
