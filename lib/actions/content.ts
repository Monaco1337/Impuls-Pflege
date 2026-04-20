'use server'

import { requireAccess } from '@/lib/rbac/check'
import { logAudit } from '@/lib/audit/logger'
import { contentBlockSchema } from '@/lib/validation/schemas'
import { revalidatePath } from 'next/cache'
import { logServerError } from '@/lib/error-handling'
import {
  newId,
  nowIso,
  repoJoinUserBriefNoEmail,
  repoLoadContentBlocks,
} from '@/lib/data/json-repository'
import type { JsonContentBlock } from '@/lib/data/schema'
import { DATA_FILES } from '@/lib/data/schema'
import { writeJsonFile } from '@/lib/storage/json-data-layer'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

async function withUpdatedBy(blocks: JsonContentBlock[]) {
  return Promise.all(
    blocks.map(async (b) => ({
      ...b,
      updatedAt: new Date(b.updatedAt),
      updatedBy: await repoJoinUserBriefNoEmail(b.updatedById),
    })),
  )
}

export async function getContentBlocks(): Promise<ActionResult> {
  try {
    await requireAccess('content', 'view')

    const blocks = await repoLoadContentBlocks()
    const sorted = [...blocks].sort((a, b) => a.sortOrder - b.sortOrder || a.key.localeCompare(b.key))
    const withUser = await withUpdatedBy(sorted)

    return { success: true, data: withUser }
  } catch (error) {
    logServerError('getContentBlocks error', error)
    return { success: false, error: 'Inhalte konnten nicht geladen werden' }
  }
}

export async function getContentBlock(key: string): Promise<ActionResult> {
  try {
    await requireAccess('content', 'view')

    const blocks = await repoLoadContentBlocks()
    const block = blocks.find((b) => b.key === key)
    if (!block) return { success: false, error: 'Inhaltsblock nicht gefunden' }

    const [withUser] = await withUpdatedBy([block])
    return { success: true, data: withUser }
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

    const blocks = await repoLoadContentBlocks()
    let idx = blocks.findIndex((b) => b.key === key)
    const t = nowIso()
    if (idx === -1) {
      blocks.push({
        id: newId(),
        key,
        title: parsed.data.title ?? null,
        content: parsed.data.content ?? {},
        imageUrl: parsed.data.imageUrl ?? null,
        sortOrder: parsed.data.sortOrder,
        updatedAt: t,
        updatedById: user.id,
      })
      idx = blocks.length - 1
    } else {
      blocks[idx] = {
        ...blocks[idx],
        title: parsed.data.title ?? null,
        content: parsed.data.content ?? {},
        imageUrl: parsed.data.imageUrl ?? null,
        sortOrder: parsed.data.sortOrder,
        updatedAt: t,
        updatedById: user.id,
      }
    }

    await writeJsonFile(
      DATA_FILES.content,
      blocks,
      `Data update content ${key}: ${t}`,
    )

    const block = blocks[idx]

    await logAudit({
      userId: user.id,
      action: 'update',
      entityType: 'content_block',
      entityId: block.id,
      metadata: { key },
    })

    revalidatePath('/admin/content')
    revalidatePath('/')
    const [withUser] = await withUpdatedBy([block])
    return { success: true, data: withUser }
  } catch (error) {
    logServerError('updateContentBlock error', error)
    return { success: false, error: 'Inhalt konnte nicht aktualisiert werden' }
  }
}

export async function getPublicContent(keys: string[]): Promise<ActionResult> {
  try {
    if (!keys.length) return { success: true, data: {} }

    const blocks = await repoLoadContentBlocks()
    const picked = blocks.filter((b) => keys.includes(b.key))

    const mapped = picked.reduce(
      (acc, block) => {
        acc[block.key] = {
          key: block.key,
          title: block.title,
          content: block.content,
          imageUrl: block.imageUrl,
        }
        return acc
      },
      {} as Record<string, unknown>,
    )

    return { success: true, data: mapped }
  } catch (error) {
    logServerError('getPublicContent error', error)
    return { success: false, error: 'Inhalte konnten nicht geladen werden' }
  }
}
