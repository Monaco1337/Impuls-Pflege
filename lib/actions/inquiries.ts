'use server'

import { prisma } from '@/lib/db'
import { requireAccess } from '@/lib/rbac/check'
import { logAudit } from '@/lib/audit/logger'
import { inquirySchema } from '@/lib/validation/schemas'
import { revalidatePath } from 'next/cache'
import { InquiryStatus, InquiryPriority } from '@prisma/client'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

export async function submitInquiry(formData: unknown): Promise<ActionResult> {
  try {
    const parsed = inquirySchema.safeParse(formData)
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message ?? 'Ungültige Eingabe' }
    }

    const inquiry = await prisma.inquiry.create({
      data: parsed.data,
    })

    await logAudit({
      action: 'create',
      entityType: 'inquiry',
      entityId: inquiry.id,
      metadata: { fullName: inquiry.fullName, inquiryType: inquiry.inquiryType },
    })

    return { success: true, data: inquiry }
  } catch (error) {
    console.error('submitInquiry error:', error)
    return { success: false, error: 'Anfrage konnte nicht gesendet werden' }
  }
}

export async function getInquiries(filters?: {
  page?: number
  pageSize?: number
  search?: string
  status?: InquiryStatus
  priority?: InquiryPriority
  assignedToId?: string
}): Promise<ActionResult> {
  try {
    await requireAccess('inquiries', 'view')

    const page = filters?.page ?? 1
    const pageSize = filters?.pageSize ?? 20
    const skip = (page - 1) * pageSize

    const where: Record<string, unknown> = {}

    if (filters?.status) where.status = filters.status
    if (filters?.priority) where.priority = filters.priority
    if (filters?.assignedToId) where.assignedToId = filters.assignedToId
    if (filters?.search) {
      where.OR = [
        { fullName: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { message: { contains: filters.search, mode: 'insensitive' } },
      ]
    }

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        include: { assignedTo: { select: { id: true, firstName: true, lastName: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      prisma.inquiry.count({ where }),
    ])

    return {
      success: true,
      data: { inquiries, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    }
  } catch (error) {
    console.error('getInquiries error:', error)
    return { success: false, error: 'Anfragen konnten nicht geladen werden' }
  }
}

export async function getInquiry(id: string): Promise<ActionResult> {
  try {
    await requireAccess('inquiries', 'view')

    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
      include: {
        assignedTo: { select: { id: true, firstName: true, lastName: true, email: true } },
        notes: {
          include: { author: { select: { id: true, firstName: true, lastName: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!inquiry) return { success: false, error: 'Anfrage nicht gefunden' }
    return { success: true, data: inquiry }
  } catch (error) {
    console.error('getInquiry error:', error)
    return { success: false, error: 'Anfrage konnte nicht geladen werden' }
  }
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<ActionResult> {
  try {
    const user = await requireAccess('inquiries', 'edit')

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { status },
    })

    await logAudit({
      userId: user.id,
      action: 'status_change',
      entityType: 'inquiry',
      entityId: id,
      metadata: { status },
    })

    revalidatePath('/admin/inquiries')
    return { success: true, data: inquiry }
  } catch (error) {
    console.error('updateInquiryStatus error:', error)
    return { success: false, error: 'Status konnte nicht aktualisiert werden' }
  }
}

export async function updateInquiryPriority(id: string, priority: InquiryPriority): Promise<ActionResult> {
  try {
    const user = await requireAccess('inquiries', 'edit')

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { priority },
    })

    await logAudit({
      userId: user.id,
      action: 'update',
      entityType: 'inquiry',
      entityId: id,
      metadata: { priority },
    })

    revalidatePath('/admin/inquiries')
    return { success: true, data: inquiry }
  } catch (error) {
    console.error('updateInquiryPriority error:', error)
    return { success: false, error: 'Priorität konnte nicht aktualisiert werden' }
  }
}

export async function assignInquiry(id: string, userId: string | null): Promise<ActionResult> {
  try {
    const user = await requireAccess('inquiries', 'edit')

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { assignedToId: userId },
      include: { assignedTo: { select: { id: true, firstName: true, lastName: true } } },
    })

    await logAudit({
      userId: user.id,
      action: 'assign',
      entityType: 'inquiry',
      entityId: id,
      metadata: { assignedToId: userId },
    })

    revalidatePath('/admin/inquiries')
    return { success: true, data: inquiry }
  } catch (error) {
    console.error('assignInquiry error:', error)
    return { success: false, error: 'Zuweisung konnte nicht aktualisiert werden' }
  }
}

export async function addInquiryNote(inquiryId: string, content: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('inquiries', 'edit')

    if (!content.trim()) return { success: false, error: 'Notiz darf nicht leer sein' }

    const note = await prisma.inquiryNote.create({
      data: { inquiryId, authorId: user.id, content: content.trim() },
      include: { author: { select: { id: true, firstName: true, lastName: true } } },
    })

    await logAudit({
      userId: user.id,
      action: 'note_added',
      entityType: 'inquiry',
      entityId: inquiryId,
    })

    revalidatePath(`/admin/inquiries/${inquiryId}`)
    return { success: true, data: note }
  } catch (error) {
    console.error('addInquiryNote error:', error)
    return { success: false, error: 'Notiz konnte nicht hinzugefügt werden' }
  }
}

export async function deleteInquiry(id: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('inquiries', 'delete')

    await prisma.inquiry.delete({ where: { id } })

    await logAudit({
      userId: user.id,
      action: 'delete',
      entityType: 'inquiry',
      entityId: id,
    })

    revalidatePath('/admin/inquiries')
    return { success: true }
  } catch (error) {
    console.error('deleteInquiry error:', error)
    return { success: false, error: 'Anfrage konnte nicht gelöscht werden' }
  }
}
