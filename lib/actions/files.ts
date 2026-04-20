'use server'

import { prisma } from '@/lib/db'
import { requireAccess } from '@/lib/rbac/check'
import { logAudit } from '@/lib/audit/logger'
import { saveFile, deleteFile } from '@/lib/storage'
import { revalidatePath } from 'next/cache'
import { logServerError } from '@/lib/error-handling'

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

    const where: Record<string, unknown> = {}

    if (filters?.fileType) where.fileType = filters.fileType
    if (filters?.applicantId) where.applicantId = filters.applicantId

    const [files, total] = await Promise.all([
      prisma.applicantDocument.findMany({
        where,
        include: {
          applicant: { select: { id: true, firstName: true, lastName: true } },
        },
        orderBy: { uploadedAt: 'desc' },
        skip,
        take: pageSize,
      }),
      prisma.applicantDocument.count({ where }),
    ])

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

    const applicant = await prisma.applicant.findUnique({
      where: { id: applicantId },
      select: { id: true },
    })
    if (!applicant) return { success: false, error: 'Bewerber nicht gefunden' }

    const saved = await saveFile(file, `applicants/${applicantId}`)

    const document = await prisma.applicantDocument.create({
      data: {
        applicantId,
        fileName: saved.fileName,
        fileType: saved.fileType,
        filePath: saved.filePath,
        fileSize: saved.fileSize,
      },
    })

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

    const document = await prisma.applicantDocument.findUnique({
      where: { id },
      select: { filePath: true, fileName: true, applicantId: true },
    })
    if (!document) return { success: false, error: 'Dokument nicht gefunden' }

    await deleteFile(document.filePath)
    await prisma.applicantDocument.delete({ where: { id } })

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
