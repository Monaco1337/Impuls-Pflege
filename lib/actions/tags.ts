'use server'

import { prisma } from '@/lib/db'
import { requireAccess } from '@/lib/rbac/check'
import { logAudit } from '@/lib/audit/logger'
import { revalidatePath } from 'next/cache'
import { logServerError } from '@/lib/error-handling'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

export async function getTags(): Promise<ActionResult> {
  try {
    await requireAccess('applicants', 'view')

    const tags = await prisma.tag.findMany({
      include: { _count: { select: { applicants: true } } },
      orderBy: { name: 'asc' },
    })

    return { success: true, data: tags }
  } catch (error) {
    logServerError('getTags error', error)
    return { success: false, error: 'Tags konnten nicht geladen werden' }
  }
}

export async function createTag(name: string, color?: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('applicants', 'edit')

    if (!name.trim()) return { success: false, error: 'Tag-Name ist erforderlich' }

    const existing = await prisma.tag.findUnique({ where: { name: name.trim() } })
    if (existing) return { success: false, error: 'Tag existiert bereits' }

    const tag = await prisma.tag.create({
      data: { name: name.trim(), color: color || null },
    })

    await logAudit({
      userId: user.id,
      action: 'create',
      entityType: 'applicant',
      entityId: tag.id,
      metadata: { type: 'tag', name: tag.name },
    })

    revalidatePath('/admin/applicants')
    return { success: true, data: tag }
  } catch (error) {
    logServerError('createTag error', error)
    return { success: false, error: 'Tag konnte nicht erstellt werden' }
  }
}

export async function deleteTag(id: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('applicants', 'delete')

    const tag = await prisma.tag.findUnique({ where: { id }, select: { name: true } })
    if (!tag) return { success: false, error: 'Tag nicht gefunden' }

    await prisma.tag.delete({ where: { id } })

    await logAudit({
      userId: user.id,
      action: 'delete',
      entityType: 'applicant',
      entityId: id,
      metadata: { type: 'tag', name: tag.name },
    })

    revalidatePath('/admin/applicants')
    return { success: true }
  } catch (error) {
    logServerError('deleteTag error', error)
    return { success: false, error: 'Tag konnte nicht gelöscht werden' }
  }
}
