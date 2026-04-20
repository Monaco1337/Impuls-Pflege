'use server'

import { prisma } from '@/lib/db'
import { requireAccess } from '@/lib/rbac/check'
import { logAudit } from '@/lib/audit/logger'
import { contentBlockSchema } from '@/lib/validation/schemas'
import { revalidatePath } from 'next/cache'
import { logServerError } from '@/lib/error-handling'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

export async function getContentBlocks(): Promise<ActionResult> {
  try {
    await requireAccess('content', 'view')

    const blocks = await prisma.contentBlock.findMany({
      include: { updatedBy: { select: { id: true, firstName: true, lastName: true } } },
      orderBy: { sortOrder: 'asc' },
    })

    return { success: true, data: blocks }
  } catch (error) {
    logServerError('getContentBlocks error', error)
    return { success: false, error: 'Inhalte konnten nicht geladen werden' }
  }
}

export async function getContentBlock(key: string): Promise<ActionResult> {
  try {
    await requireAccess('content', 'view')

    const block = await prisma.contentBlock.findUnique({
      where: { key },
      include: { updatedBy: { select: { id: true, firstName: true, lastName: true } } },
    })

    if (!block) return { success: false, error: 'Inhaltsblock nicht gefunden' }
    return { success: true, data: block }
  } catch (error) {
    logServerError('getContentBlock error', error)
    return { success: false, error: 'Inhaltsblock konnte nicht geladen werden' }
  }
}

export async function updateContentBlock(key: string, data: unknown): Promise<ActionResult> {
  try {
    const user = await requireAccess('content', 'edit')

    const parsed = contentBlockSchema.safeParse(data)
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message ?? 'Ungültige Eingabe' }
    }

    const block = await prisma.contentBlock.upsert({
      where: { key },
      update: {
        title: parsed.data.title,
        content: parsed.data.content,
        imageUrl: parsed.data.imageUrl,
        sortOrder: parsed.data.sortOrder,
        updatedById: user.id,
      },
      create: {
        key,
        title: parsed.data.title,
        content: parsed.data.content ?? {},
        imageUrl: parsed.data.imageUrl,
        sortOrder: parsed.data.sortOrder,
        updatedById: user.id,
      },
    })

    await logAudit({
      userId: user.id,
      action: 'update',
      entityType: 'content_block',
      entityId: block.id,
      metadata: { key },
    })

    revalidatePath('/admin/content')
    revalidatePath('/')
    return { success: true, data: block }
  } catch (error) {
    logServerError('updateContentBlock error', error)
    return { success: false, error: 'Inhalt konnte nicht aktualisiert werden' }
  }
}

export async function getPublicContent(keys: string[]): Promise<ActionResult> {
  try {
    if (!keys.length) return { success: true, data: {} }

    const blocks = await prisma.contentBlock.findMany({
      where: { key: { in: keys } },
      select: { key: true, title: true, content: true, imageUrl: true },
    })

    const mapped = blocks.reduce(
      (acc, block) => {
        acc[block.key] = block
        return acc
      },
      {} as Record<string, (typeof blocks)[number]>
    )

    return { success: true, data: mapped }
  } catch (error) {
    logServerError('getPublicContent error', error)
    return { success: false, error: 'Inhalte konnten nicht geladen werden' }
  }
}
