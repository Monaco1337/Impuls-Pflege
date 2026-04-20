'use server'

import { requireAccess } from '@/lib/rbac/check'
import { logAudit } from '@/lib/audit/logger'
import { revalidatePath } from 'next/cache'
import { logServerError } from '@/lib/error-handling'
import { newId, nowIso, repoLoadApplicantTags, repoLoadTags } from '@/lib/data/json-repository'
import { DATA_FILES } from '@/lib/data/schema'
import type { JsonTag } from '@/lib/data/schema'
import { writeJsonFile } from '@/lib/storage/json-data-layer'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

export async function getTags(): Promise<ActionResult> {
  try {
    await requireAccess('applicants', 'view')

    const tags = await repoLoadTags()
    const sorted = [...tags].sort((a, b) => a.name.localeCompare(b.name))

    return { success: true, data: sorted }
  } catch (error) {
    logServerError('getTags error', error)
    return { success: false, error: 'Tags konnten nicht geladen werden' }
  }
}

export async function createTag(name: string, color?: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('applicants', 'edit')

    const tags = await repoLoadTags()
    const existing = tags.find((t) => t.name.toLowerCase() === name.trim().toLowerCase())
    if (existing) return { success: false, error: 'Tag existiert bereits' }

    const tag: JsonTag = {
      id: newId(),
      name: name.trim(),
      color: color?.trim() || null,
      createdAt: nowIso(),
    }
    tags.push(tag)

    await writeJsonFile(DATA_FILES.tags, tags, `Data update tags create: ${nowIso()}`)

    await logAudit({
      userId: user.id,
      action: 'create',
      entityType: 'applicant',
      entityId: tag.id,
      metadata: { tagName: tag.name },
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
    const user = await requireAccess('applicants', 'edit')

    const tags = await repoLoadTags()
    const tag = tags.find((t) => t.id === id)
    if (!tag) return { success: false, error: 'Tag nicht gefunden' }

    const nextTags = tags.filter((t) => t.id !== id)
    const applicantTags = (await repoLoadApplicantTags()).filter((r) => r.tagId !== id)

    await writeJsonFile(DATA_FILES.tags, nextTags, `Data update tags delete: ${nowIso()}`)
    await writeJsonFile(
      DATA_FILES.applicantTags,
      applicantTags,
      `Data update applicant-tags after tag delete: ${nowIso()}`,
    )

    await logAudit({
      userId: user.id,
      action: 'delete',
      entityType: 'applicant',
      entityId: id,
      metadata: { tagName: tag.name },
    })

    revalidatePath('/admin/applicants')
    return { success: true }
  } catch (error) {
    logServerError('deleteTag error', error)
    return { success: false, error: 'Tag konnte nicht gelöscht werden' }
  }
}
