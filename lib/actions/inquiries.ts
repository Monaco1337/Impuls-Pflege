'use server'

import { requireAccess } from '@/lib/rbac/check'
import { logAudit } from '@/lib/audit/logger'
import { inquirySchema } from '@/lib/validation/schemas'
import { revalidatePath } from 'next/cache'
import { after } from 'next/server'
import { logServerError } from '@/lib/error-handling'
import { InquiryStatus, type InquiryPriority } from '@/lib/types/enums'
import {
  newId,
  nowIso,
  repoJoinUserBrief,
  repoJoinUserBriefNoEmail,
  repoLoadInquiries,
} from '@/lib/data/json-repository'
import type { JsonInquiry, JsonInquiryNote } from '@/lib/data/schema'
import { DATA_FILES } from '@/lib/data/schema'
import { writeJsonFile } from '@/lib/storage/json-data-layer'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

function matchesSearch(inv: JsonInquiry, search: string) {
  const q = search.toLowerCase()
  return (
    inv.fullName.toLowerCase().includes(q) ||
    inv.email.toLowerCase().includes(q) ||
    inv.message.toLowerCase().includes(q)
  )
}

async function attachInquiryNotes(inv: JsonInquiry, notes: JsonInquiryNote[]) {
  const list = notes
    .filter((n) => n.inquiryId === inv.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const withAuthors = await Promise.all(
    list.map(async (n) => ({
      ...n,
      createdAt: new Date(n.createdAt),
      author: await repoJoinUserBriefNoEmail(n.authorId),
    })),
  )
  return withAuthors
}

export async function submitInquiry(formData: unknown): Promise<ActionResult> {
  try {
    const parsed = inquirySchema.safeParse(formData)
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message ?? 'Ungültige Eingabe' }
    }

    const bundle = await repoLoadInquiries()
    const t = nowIso()
    const inquiry: JsonInquiry = {
      id: newId(),
      fullName: parsed.data.fullName,
      phone: parsed.data.phone ?? null,
      email: parsed.data.email,
      inquiryType: parsed.data.inquiryType,
      message: parsed.data.message,
      preferredCallback: parsed.data.preferredCallback ?? null,
      status: 'NEU',
      priority: 'NORMAL',
      assignedToId: null,
      createdAt: t,
      updatedAt: t,
    }
    bundle.inquiries.push(inquiry)

    await writeJsonFile(DATA_FILES.inquiries, bundle, `Data update inquiries create: ${t}`)

    await logAudit({
      action: 'create',
      entityType: 'inquiry',
      entityId: inquiry.id,
      metadata: { fullName: inquiry.fullName, inquiryType: inquiry.inquiryType },
    })

    return { success: true, data: { ...inquiry, createdAt: new Date(inquiry.createdAt), updatedAt: new Date(inquiry.updatedAt) } }
  } catch (error) {
    logServerError('submitInquiry error', error)
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

    const bundle = await repoLoadInquiries()
    let list = bundle.inquiries

    if (filters?.status) list = list.filter((i) => i.status === filters.status)
    if (filters?.priority) list = list.filter((i) => i.priority === filters.priority)
    if (filters?.assignedToId) list = list.filter((i) => i.assignedToId === filters.assignedToId)
    if (filters?.search) list = list.filter((i) => matchesSearch(i, filters.search!))

    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    const total = list.length
    const slice = list.slice(skip, skip + pageSize)

    const inquiries = await Promise.all(
      slice.map(async (inv) => ({
        ...inv,
        createdAt: new Date(inv.createdAt),
        updatedAt: new Date(inv.updatedAt),
        assignedTo: await repoJoinUserBriefNoEmail(inv.assignedToId),
        _count: { notes: bundle.notes.filter((n) => n.inquiryId === inv.id).length },
      })),
    )

    return {
      success: true,
      data: { inquiries, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    }
  } catch (error) {
    logServerError('getInquiries error', error)
    return { success: false, error: 'Anfragen konnten nicht geladen werden' }
  }
}

export async function getInquiry(id: string): Promise<ActionResult> {
  try {
    await requireAccess('inquiries', 'view')

    const bundle = await repoLoadInquiries()
    const inv = bundle.inquiries.find((i) => i.id === id)
    if (!inv) return { success: false, error: 'Anfrage nicht gefunden' }

    const notes = await attachInquiryNotes(inv, bundle.notes)
    const inquiry = {
      ...inv,
      createdAt: new Date(inv.createdAt),
      updatedAt: new Date(inv.updatedAt),
      assignedTo: await repoJoinUserBrief(inv.assignedToId),
      notes,
    }

    return { success: true, data: inquiry }
  } catch (error) {
    logServerError('getInquiry error', error)
    return { success: false, error: 'Anfrage konnte nicht geladen werden' }
  }
}

/** Beim Öffnen der Detailseite: „Neu“ → „In Bearbeitung“, Eingang-Badge sinkt. Mit `view` erlaubt. */
export async function acknowledgeInquiryOnOpen(id: string): Promise<void> {
  try {
    const user = await requireAccess('inquiries', 'view')

    const bundle = await repoLoadInquiries()
    const inv = bundle.inquiries.find((i) => i.id === id)
    if (!inv || inv.status !== InquiryStatus.NEU) return

    const fromStatus = inv.status
    inv.status = InquiryStatus.IN_BEARBEITUNG
    inv.updatedAt = nowIso()

    await writeJsonFile(DATA_FILES.inquiries, bundle, `Data update inquiry ack open ${id}: ${inv.updatedAt}`)

    await logAudit({
      userId: user.id,
      action: 'status_change',
      entityType: 'inquiry',
      entityId: id,
      metadata: { fromStatus, toStatus: InquiryStatus.IN_BEARBEITUNG, source: 'detail_open' },
    })

    after(() => {
      revalidatePath('/admin/inquiries')
      revalidatePath(`/admin/inquiries/${id}`)
      revalidatePath('/admin/dashboard')
    })
  } catch (error) {
    logServerError('acknowledgeInquiryOnOpen error', error)
  }
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<ActionResult> {
  try {
    const user = await requireAccess('inquiries', 'edit')

    const bundle = await repoLoadInquiries()
    const inv = bundle.inquiries.find((i) => i.id === id)
    if (!inv) return { success: false, error: 'Anfrage nicht gefunden' }

    inv.status = status
    inv.updatedAt = nowIso()

    await writeJsonFile(DATA_FILES.inquiries, bundle, `Data update inquiry status ${id}: ${inv.updatedAt}`)

    await logAudit({
      userId: user.id,
      action: 'status_change',
      entityType: 'inquiry',
      entityId: id,
      metadata: { status },
    })

    revalidatePath('/admin/inquiries')
    return { success: true, data: { ...inv, createdAt: new Date(inv.createdAt), updatedAt: new Date(inv.updatedAt) } }
  } catch (error) {
    logServerError('updateInquiryStatus error', error)
    return { success: false, error: 'Status konnte nicht aktualisiert werden' }
  }
}

export async function updateInquiryPriority(id: string, priority: InquiryPriority): Promise<ActionResult> {
  try {
    const user = await requireAccess('inquiries', 'edit')

    const bundle = await repoLoadInquiries()
    const inv = bundle.inquiries.find((i) => i.id === id)
    if (!inv) return { success: false, error: 'Anfrage nicht gefunden' }

    inv.priority = priority
    inv.updatedAt = nowIso()

    await writeJsonFile(DATA_FILES.inquiries, bundle, `Data update inquiry priority ${id}: ${inv.updatedAt}`)

    await logAudit({
      userId: user.id,
      action: 'update',
      entityType: 'inquiry',
      entityId: id,
      metadata: { priority },
    })

    revalidatePath('/admin/inquiries')
    return { success: true, data: { ...inv, createdAt: new Date(inv.createdAt), updatedAt: new Date(inv.updatedAt) } }
  } catch (error) {
    logServerError('updateInquiryPriority error', error)
    return { success: false, error: 'Priorität konnte nicht aktualisiert werden' }
  }
}

export async function assignInquiry(id: string, userId: string | null): Promise<ActionResult> {
  try {
    const user = await requireAccess('inquiries', 'edit')

    const bundle = await repoLoadInquiries()
    const inv = bundle.inquiries.find((i) => i.id === id)
    if (!inv) return { success: false, error: 'Anfrage nicht gefunden' }

    inv.assignedToId = userId
    inv.updatedAt = nowIso()

    await writeJsonFile(DATA_FILES.inquiries, bundle, `Data update inquiry assign ${id}: ${inv.updatedAt}`)

    await logAudit({
      userId: user.id,
      action: 'assign',
      entityType: 'inquiry',
      entityId: id,
      metadata: { assignedToId: userId },
    })

    revalidatePath('/admin/inquiries')
    const assignedTo = await repoJoinUserBriefNoEmail(inv.assignedToId)
    return {
      success: true,
      data: {
        ...inv,
        createdAt: new Date(inv.createdAt),
        updatedAt: new Date(inv.updatedAt),
        assignedTo,
      },
    }
  } catch (error) {
    logServerError('assignInquiry error', error)
    return { success: false, error: 'Zuweisung konnte nicht aktualisiert werden' }
  }
}

export async function addInquiryNote(inquiryId: string, content: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('inquiries', 'edit')

    if (!content.trim()) return { success: false, error: 'Notiz darf nicht leer sein' }

    const bundle = await repoLoadInquiries()
    if (!bundle.inquiries.some((i) => i.id === inquiryId)) {
      return { success: false, error: 'Anfrage nicht gefunden' }
    }

    const t = nowIso()
    const note: JsonInquiryNote = {
      id: newId(),
      inquiryId,
      authorId: user.id,
      content: content.trim(),
      createdAt: t,
    }
    bundle.notes.push(note)

    const inv = bundle.inquiries.find((i) => i.id === inquiryId)!
    inv.updatedAt = t

    await writeJsonFile(DATA_FILES.inquiries, bundle, `Data update inquiry note ${inquiryId}: ${t}`)

    await logAudit({
      userId: user.id,
      action: 'note_added',
      entityType: 'inquiry',
      entityId: inquiryId,
    })

    revalidatePath(`/admin/inquiries/${inquiryId}`)
    const author = await repoJoinUserBriefNoEmail(user.id)
    return {
      success: true,
      data: { ...note, createdAt: new Date(note.createdAt), author },
    }
  } catch (error) {
    logServerError('addInquiryNote error', error)
    return { success: false, error: 'Notiz konnte nicht hinzugefügt werden' }
  }
}

export async function deleteInquiry(id: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('inquiries', 'delete')

    const bundle = await repoLoadInquiries()
    if (!bundle.inquiries.some((i) => i.id === id)) {
      return { success: false, error: 'Anfrage nicht gefunden' }
    }

    bundle.inquiries = bundle.inquiries.filter((i) => i.id !== id)
    bundle.notes = bundle.notes.filter((n) => n.inquiryId !== id)

    await writeJsonFile(DATA_FILES.inquiries, bundle, `Data update inquiries delete ${id}: ${nowIso()}`)

    await logAudit({
      userId: user.id,
      action: 'delete',
      entityType: 'inquiry',
      entityId: id,
    })

    revalidatePath('/admin/inquiries')
    return { success: true }
  } catch (error) {
    logServerError('deleteInquiry error', error)
    return { success: false, error: 'Anfrage konnte nicht gelöscht werden' }
  }
}
