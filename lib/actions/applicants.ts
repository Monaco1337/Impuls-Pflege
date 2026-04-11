'use server'

import { prisma } from '@/lib/db'
import { requireAccess } from '@/lib/rbac/check'
import { logAudit } from '@/lib/audit/logger'
import { applicationSchema } from '@/lib/validation/schemas'
import { saveFile, deleteFile } from '@/lib/storage'
import { revalidatePath } from 'next/cache'
import { ApplicantStatus } from '@prisma/client'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

export async function submitApplication(formData: FormData): Promise<ActionResult> {
  try {
    const raw = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      positionApplied: formData.get('positionApplied'),
      availability: formData.get('availability'),
      qualification: formData.get('qualification'),
      experience: formData.get('experience'),
      motivation: formData.get('motivation'),
      privacy: formData.get('privacy') === 'true',
    }

    const parsed = applicationSchema.safeParse(raw)
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message ?? 'Ungültige Eingabe' }
    }

    const { privacy: _, ...applicantData } = parsed.data

    const applicant = await prisma.applicant.create({
      data: applicantData,
    })

    const files = formData.getAll('documents') as File[]
    for (const file of files) {
      if (file.size > 0) {
        const saved = await saveFile(file, `applicants/${applicant.id}`)
        await prisma.applicantDocument.create({
          data: {
            applicantId: applicant.id,
            fileName: saved.fileName,
            fileType: saved.fileType,
            filePath: saved.filePath,
            fileSize: saved.fileSize,
          },
        })
      }
    }

    await logAudit({
      action: 'create',
      entityType: 'applicant',
      entityId: applicant.id,
      metadata: { name: `${applicant.firstName} ${applicant.lastName}`, position: applicant.positionApplied },
    })

    return { success: true, data: { id: applicant.id } }
  } catch (error) {
    console.error('submitApplication error:', error)
    return { success: false, error: 'Bewerbung konnte nicht eingereicht werden' }
  }
}

export async function getApplicants(filters?: {
  page?: number
  pageSize?: number
  search?: string
  status?: ApplicantStatus
  positionApplied?: string
  assignedToId?: string
}): Promise<ActionResult> {
  try {
    await requireAccess('applicants', 'view')

    const page = filters?.page ?? 1
    const pageSize = filters?.pageSize ?? 20
    const skip = (page - 1) * pageSize

    const where: Record<string, unknown> = {}

    if (filters?.status) where.status = filters.status
    if (filters?.positionApplied) where.positionApplied = filters.positionApplied
    if (filters?.assignedToId) where.assignedToId = filters.assignedToId
    if (filters?.search) {
      where.OR = [
        { firstName: { contains: filters.search, mode: 'insensitive' } },
        { lastName: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { positionApplied: { contains: filters.search, mode: 'insensitive' } },
      ]
    }

    const [applicants, total] = await Promise.all([
      prisma.applicant.findMany({
        where,
        include: {
          assignedTo: { select: { id: true, firstName: true, lastName: true } },
          tags: { include: { tag: true } },
          _count: { select: { documents: true, notes: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      prisma.applicant.count({ where }),
    ])

    return {
      success: true,
      data: { applicants, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    }
  } catch (error) {
    console.error('getApplicants error:', error)
    return { success: false, error: 'Bewerber konnten nicht geladen werden' }
  }
}

export async function getApplicant(id: string): Promise<ActionResult> {
  try {
    await requireAccess('applicants', 'view')

    const applicant = await prisma.applicant.findUnique({
      where: { id },
      include: {
        assignedTo: { select: { id: true, firstName: true, lastName: true, email: true } },
        documents: { orderBy: { uploadedAt: 'desc' } },
        notes: {
          include: { author: { select: { id: true, firstName: true, lastName: true } } },
          orderBy: { createdAt: 'desc' },
        },
        statusHistory: {
          include: { changedBy: { select: { id: true, firstName: true, lastName: true } } },
          orderBy: { changedAt: 'desc' },
        },
        tags: { include: { tag: true } },
        jobPosting: { select: { id: true, title: true, slug: true } },
      },
    })

    if (!applicant) return { success: false, error: 'Bewerber nicht gefunden' }
    return { success: true, data: applicant }
  } catch (error) {
    console.error('getApplicant error:', error)
    return { success: false, error: 'Bewerber konnte nicht geladen werden' }
  }
}

export async function updateApplicantStatus(
  id: string,
  status: ApplicantStatus,
  note?: string
): Promise<ActionResult> {
  try {
    const user = await requireAccess('applicants', 'edit')

    const current = await prisma.applicant.findUnique({ where: { id }, select: { status: true } })
    if (!current) return { success: false, error: 'Bewerber nicht gefunden' }

    const [applicant] = await prisma.$transaction([
      prisma.applicant.update({ where: { id }, data: { status } }),
      prisma.applicantStatusHistory.create({
        data: {
          applicantId: id,
          fromStatus: current.status,
          toStatus: status,
          changedById: user.id,
          note: note?.trim() || null,
        },
      }),
    ])

    await logAudit({
      userId: user.id,
      action: 'status_change',
      entityType: 'applicant',
      entityId: id,
      metadata: { fromStatus: current.status, toStatus: status },
    })

    revalidatePath('/admin/applicants')
    revalidatePath(`/admin/applicants/${id}`)
    return { success: true, data: applicant }
  } catch (error) {
    console.error('updateApplicantStatus error:', error)
    return { success: false, error: 'Status konnte nicht aktualisiert werden' }
  }
}

export async function assignApplicant(id: string, userId: string | null): Promise<ActionResult> {
  try {
    const user = await requireAccess('applicants', 'edit')

    const applicant = await prisma.applicant.update({
      where: { id },
      data: { assignedToId: userId },
      include: { assignedTo: { select: { id: true, firstName: true, lastName: true } } },
    })

    await logAudit({
      userId: user.id,
      action: 'assign',
      entityType: 'applicant',
      entityId: id,
      metadata: { assignedToId: userId },
    })

    revalidatePath('/admin/applicants')
    revalidatePath(`/admin/applicants/${id}`)
    return { success: true, data: applicant }
  } catch (error) {
    console.error('assignApplicant error:', error)
    return { success: false, error: 'Zuweisung konnte nicht aktualisiert werden' }
  }
}

export async function addApplicantNote(applicantId: string, content: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('applicants', 'edit')

    if (!content.trim()) return { success: false, error: 'Notiz darf nicht leer sein' }

    const note = await prisma.applicantNote.create({
      data: { applicantId, authorId: user.id, content: content.trim() },
      include: { author: { select: { id: true, firstName: true, lastName: true } } },
    })

    await logAudit({
      userId: user.id,
      action: 'note_added',
      entityType: 'applicant',
      entityId: applicantId,
    })

    revalidatePath(`/admin/applicants/${applicantId}`)
    return { success: true, data: note }
  } catch (error) {
    console.error('addApplicantNote error:', error)
    return { success: false, error: 'Notiz konnte nicht hinzugefügt werden' }
  }
}

export async function addApplicantTag(applicantId: string, tagId: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('applicants', 'edit')

    await prisma.applicantTag.create({
      data: { applicantId, tagId },
    })

    await logAudit({
      userId: user.id,
      action: 'update',
      entityType: 'applicant',
      entityId: applicantId,
      metadata: { action: 'tag_added', tagId },
    })

    revalidatePath(`/admin/applicants/${applicantId}`)
    return { success: true }
  } catch (error) {
    console.error('addApplicantTag error:', error)
    return { success: false, error: 'Tag konnte nicht hinzugefügt werden' }
  }
}

export async function removeApplicantTag(applicantId: string, tagId: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('applicants', 'edit')

    await prisma.applicantTag.delete({
      where: { applicantId_tagId: { applicantId, tagId } },
    })

    await logAudit({
      userId: user.id,
      action: 'update',
      entityType: 'applicant',
      entityId: applicantId,
      metadata: { action: 'tag_removed', tagId },
    })

    revalidatePath(`/admin/applicants/${applicantId}`)
    return { success: true }
  } catch (error) {
    console.error('removeApplicantTag error:', error)
    return { success: false, error: 'Tag konnte nicht entfernt werden' }
  }
}

export async function deleteApplicant(id: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('applicants', 'delete')

    const documents = await prisma.applicantDocument.findMany({
      where: { applicantId: id },
      select: { filePath: true },
    })

    for (const doc of documents) {
      await deleteFile(doc.filePath)
    }

    await prisma.applicant.delete({ where: { id } })

    await logAudit({
      userId: user.id,
      action: 'delete',
      entityType: 'applicant',
      entityId: id,
      metadata: { documentsDeleted: documents.length },
    })

    revalidatePath('/admin/applicants')
    return { success: true }
  } catch (error) {
    console.error('deleteApplicant error:', error)
    return { success: false, error: 'Bewerber konnte nicht gelöscht werden' }
  }
}

export async function getApplicantsByStatus(): Promise<ActionResult> {
  try {
    await requireAccess('applicants', 'view')

    const counts = await prisma.applicant.groupBy({
      by: ['status'],
      _count: { _all: true },
    })

    const pipeline = counts.reduce(
      (acc, item) => {
        acc[item.status] = item._count._all
        return acc
      },
      {} as Record<string, number>
    )

    return { success: true, data: pipeline }
  } catch (error) {
    console.error('getApplicantsByStatus error:', error)
    return { success: false, error: 'Pipeline-Daten konnten nicht geladen werden' }
  }
}
