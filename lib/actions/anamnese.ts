'use server'

import { requireAccess } from '@/lib/rbac/check'
import { logAudit } from '@/lib/audit/logger'
import { revalidatePath } from 'next/cache'
import { after } from 'next/server'
import { logServerError } from '@/lib/error-handling'
import { AnamneseStatus } from '@/lib/types/enums'
import { nowIso, repoJoinUserBriefNoEmail, repoLoadAnamnese } from '@/lib/data/json-repository'
import type { JsonAnamneseSubmission } from '@/lib/data/schema'
import { DATA_FILES } from '@/lib/data/schema'
import { writeJsonFile } from '@/lib/storage/json-data-layer'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

function matchesSearch(s: JsonAnamneseSubmission, search: string) {
  const q = search.toLowerCase()
  return (
    s.patientFirstName.toLowerCase().includes(q) ||
    s.patientLastName.toLowerCase().includes(q) ||
    s.phone.replace(/\s/g, '').toLowerCase().includes(q) ||
    (s.email?.toLowerCase().includes(q) ?? false) ||
    s.birthDate.toLowerCase().includes(q)
  )
}

export async function getAnamneseSubmissions(filters?: {
  page?: number
  pageSize?: number
  search?: string
  status?: AnamneseStatus
  assignedToId?: string
}): Promise<ActionResult> {
  try {
    await requireAccess('anamnese', 'view')

    const page = filters?.page ?? 1
    const pageSize = filters?.pageSize ?? 20
    const skip = (page - 1) * pageSize

    const data = await repoLoadAnamnese()
    let list = data.submissions

    if (filters?.status) list = list.filter((s) => s.status === filters.status)
    if (filters?.assignedToId) list = list.filter((s) => s.assignedToId === filters.assignedToId)
    if (filters?.search) list = list.filter((s) => matchesSearch(s, filters.search!))

    list = [...list].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    const total = list.length
    const slice = list.slice(skip, skip + pageSize)

    const submissions = await Promise.all(
      slice.map(async (s) => {
        const { payload: _p, ...rest } = s
        return {
          ...rest,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt),
          assignedTo: await repoJoinUserBriefNoEmail(s.assignedToId),
        }
      }),
    )

    return {
      success: true,
      data: { submissions, total, page, pageSize, totalPages: Math.ceil(total / pageSize) || 1 },
    }
  } catch (error) {
    logServerError('getAnamneseSubmissions error', error)
    return { success: false, error: 'Anamnese-Einträge konnten nicht geladen werden' }
  }
}

export async function getAnamneseSubmission(id: string): Promise<ActionResult> {
  try {
    await requireAccess('anamnese', 'view')

    const data = await repoLoadAnamnese()
    const s = data.submissions.find((x) => x.id === id)
    if (!s) return { success: false, error: 'Eintrag nicht gefunden' }

    const out = {
      ...s,
      createdAt: new Date(s.createdAt),
      updatedAt: new Date(s.updatedAt),
      assignedTo: await repoJoinUserBriefNoEmail(s.assignedToId),
    }

    return { success: true, data: out }
  } catch (error) {
    logServerError('getAnamneseSubmission error', error)
    return { success: false, error: 'Eintrag konnte nicht geladen werden' }
  }
}

export async function acknowledgeAllNewAnamnese(): Promise<
  ActionResult<{ acknowledged: number }>
> {
  try {
    const user = await requireAccess('anamnese', 'view')

    const bundle = await repoLoadAnamnese()
    const t = nowIso()
    const targets = bundle.submissions.filter(
      (s) => s.status === AnamneseStatus.NEU_EINGEGANGEN,
    )
    if (targets.length === 0) {
      return { success: true, data: { acknowledged: 0 } }
    }

    for (const s of targets) {
      s.status = AnamneseStatus.GESICHTET
      s.updatedAt = t
    }

    await writeJsonFile(
      DATA_FILES.anamnese,
      bundle,
      `Data update anamnese ack-all (${targets.length}): ${t}`,
    )

    await logAudit({
      userId: user.id,
      action: 'status_change',
      entityType: 'anamnese_submission',
      metadata: {
        bulk: true,
        count: targets.length,
        fromStatus: AnamneseStatus.NEU_EINGEGANGEN,
        toStatus: AnamneseStatus.GESICHTET,
        source: 'inbox_click',
      },
    })

    after(() => {
      revalidatePath('/admin/anamnese')
      revalidatePath('/admin/dashboard')
    })

    return { success: true, data: { acknowledged: targets.length } }
  } catch (error) {
    logServerError('acknowledgeAllNewAnamnese error', error)
    return { success: false, error: 'Eingänge konnten nicht quittiert werden' }
  }
}

export async function acknowledgeAnamneseOnOpen(id: string): Promise<void> {
  try {
    const user = await requireAccess('anamnese', 'view')

    const bundle = await repoLoadAnamnese()
    const s = bundle.submissions.find((x) => x.id === id)
    if (!s || s.status !== AnamneseStatus.NEU_EINGEGANGEN) return

    const fromStatus = s.status
    s.status = AnamneseStatus.GESICHTET
    s.updatedAt = nowIso()

    await writeJsonFile(
      DATA_FILES.anamnese,
      bundle,
      `Data update anamnese ack open ${id}: ${s.updatedAt}`,
    )

    await logAudit({
      userId: user.id,
      action: 'status_change',
      entityType: 'anamnese_submission',
      entityId: id,
      metadata: { fromStatus, toStatus: AnamneseStatus.GESICHTET, source: 'detail_open' },
    })

    after(() => {
      revalidatePath('/admin/anamnese')
      revalidatePath(`/admin/anamnese/${id}`)
      revalidatePath('/admin/dashboard')
    })
  } catch (error) {
    logServerError('acknowledgeAnamneseOnOpen error', error)
  }
}

export async function updateAnamneseStatus(
  id: string,
  status: AnamneseStatus,
): Promise<ActionResult> {
  try {
    const user = await requireAccess('anamnese', 'edit')

    const bundle = await repoLoadAnamnese()
    const s = bundle.submissions.find((x) => x.id === id)
    if (!s) return { success: false, error: 'Eintrag nicht gefunden' }

    s.status = status
    s.updatedAt = nowIso()

    await writeJsonFile(DATA_FILES.anamnese, bundle, `Data update anamnese status ${id}`)

    await logAudit({
      userId: user.id,
      action: 'status_change',
      entityType: 'anamnese_submission',
      entityId: id,
      metadata: { status },
    })

    revalidatePath('/admin/anamnese')
    revalidatePath(`/admin/anamnese/${id}`)
    revalidatePath('/admin/dashboard')
    return {
      success: true,
      data: { ...s, createdAt: new Date(s.createdAt), updatedAt: new Date(s.updatedAt) },
    }
  } catch (error) {
    logServerError('updateAnamneseStatus error', error)
    return { success: false, error: 'Status konnte nicht aktualisiert werden' }
  }
}

export async function deleteAnamneseSubmission(id: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('anamnese', 'delete')

    const bundle = await repoLoadAnamnese()
    const target = bundle.submissions.find((s) => s.id === id)
    if (!target) {
      return { success: false, error: 'Anamnesebogen nicht gefunden' }
    }

    bundle.submissions = bundle.submissions.filter((s) => s.id !== id)

    await writeJsonFile(
      DATA_FILES.anamnese,
      bundle,
      `Data update anamnese delete ${id}: ${nowIso()}`,
    )

    await logAudit({
      userId: user.id,
      action: 'delete',
      entityType: 'anamnese_submission',
      entityId: id,
      metadata: {
        patient: `${target.patientLastName}, ${target.patientFirstName}`,
        status: target.status,
      },
    })

    revalidatePath('/admin/anamnese')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    logServerError('deleteAnamneseSubmission error', error)
    return { success: false, error: 'Anamnesebogen konnte nicht gelöscht werden' }
  }
}

export async function assignAnamnese(
  id: string,
  userId: string | null,
): Promise<ActionResult> {
  try {
    const user = await requireAccess('anamnese', 'edit')

    const bundle = await repoLoadAnamnese()
    const s = bundle.submissions.find((x) => x.id === id)
    if (!s) return { success: false, error: 'Eintrag nicht gefunden' }

    s.assignedToId = userId
    s.updatedAt = nowIso()

    await writeJsonFile(DATA_FILES.anamnese, bundle, `Data update anamnese assign ${id}`)

    await logAudit({
      userId: user.id,
      action: 'assign',
      entityType: 'anamnese_submission',
      entityId: id,
      metadata: { assignedToId: userId },
    })

    revalidatePath('/admin/anamnese')
    const assignedTo = await repoJoinUserBriefNoEmail(s.assignedToId)
    return {
      success: true,
      data: {
        ...s,
        createdAt: new Date(s.createdAt),
        updatedAt: new Date(s.updatedAt),
        assignedTo,
      },
    }
  } catch (error) {
    logServerError('assignAnamnese error', error)
    return { success: false, error: 'Zuweisung konnte nicht aktualisiert werden' }
  }
}
