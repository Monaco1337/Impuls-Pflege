'use server'

import { requireAccess } from '@/lib/rbac/check'
import { logAudit } from '@/lib/audit/logger'
import { applicationSchema } from '@/lib/validation/schemas'
import { revalidatePath } from 'next/cache'
import { after } from 'next/server'
import { ApplicantStatus } from '@/lib/types/enums'
import { logServerError } from '@/lib/error-handling'
import {
  newId,
  nowIso,
  repoJoinUserBrief,
  repoJoinUserBriefNoEmail,
  repoLoadApplicantTags,
  repoLoadApplicants,
  repoLoadJobs,
  repoLoadTags,
} from '@/lib/data/json-repository'
import type { JsonApplicant, JsonApplicantDocument } from '@/lib/data/schema'
import {
  DATA_FILES,
  MAX_APPLICANT_DOCUMENT_BYTES,
  MAX_APPLICANT_TOTAL_UPLOAD_BYTES,
} from '@/lib/data/schema'
import { writeJsonFile } from '@/lib/storage/json-data-layer'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

function stripDoc(d: JsonApplicantDocument) {
  const { contentBase64: _c, ...rest } = d
  return { ...rest, uploadedAt: new Date(rest.uploadedAt) }
}

function applicantMatchesSearch(a: JsonApplicant, search: string) {
  const q = search.toLowerCase()
  return (
    a.firstName.toLowerCase().includes(q) ||
    a.lastName.toLowerCase().includes(q) ||
    a.email.toLowerCase().includes(q) ||
    a.positionApplied.toLowerCase().includes(q)
  )
}

function safeErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  try {
    return String(err)
  } catch {
    return 'Unbekannter Fehler'
  }
}

export async function submitApplication(formData: FormData): Promise<ActionResult> {
  const debug = process.env.APP_DEBUG_SUBMIT === '1'
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
    console.info('[submitApplication] received', {
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: raw.email,
      positionApplied: raw.positionApplied,
      privacy: raw.privacy,
      filesAttached: formData.getAll('documents').length,
    })

    const parsed = applicationSchema.safeParse(raw)
    if (!parsed.success) {
      const first = parsed.error.errors[0]
      console.warn('[submitApplication] validation failed', parsed.error.errors)
      return {
        success: false,
        error: first ? `${first.path.join('.')}: ${first.message}` : 'Ungültige Eingabe',
      }
    }

    const { privacy: _, ...applicantData } = parsed.data

    const t = nowIso()
    const applicant: JsonApplicant = {
      id: newId(),
      firstName: applicantData.firstName,
      lastName: applicantData.lastName,
      email: applicantData.email,
      phone: applicantData.phone ?? null,
      address: applicantData.address ?? null,
      positionApplied: applicantData.positionApplied,
      availability: applicantData.availability ?? null,
      qualification: applicantData.qualification ?? null,
      experience: applicantData.experience ?? null,
      motivation: applicantData.motivation ?? null,
      source: 'website',
      status: 'NEU_EINGEGANGEN',
      assignedToId: null,
      jobPostingId: null,
      createdAt: t,
      updatedAt: t,
    }

    const files = formData.getAll('documents') as File[]
    const newDocuments: JsonApplicantDocument[] = []
    let totalBytes = 0
    for (const file of files) {
      if (!file || typeof file === 'string') continue
      if (file.size > 0) {
        const buf = Buffer.from(await file.arrayBuffer())
        totalBytes += buf.length
        if (buf.length > MAX_APPLICANT_DOCUMENT_BYTES) {
          return {
            success: false,
            error: `Datei „${file.name}“ ist zu groß. Maximal erlaubt sind 4 MB pro Datei.`,
          }
        }
        if (totalBytes > MAX_APPLICANT_TOTAL_UPLOAD_BYTES) {
          return {
            success: false,
            error: 'Die Gesamtgröße der hochgeladenen Dateien ist zu hoch (max. 7 MB).',
          }
        }
        newDocuments.push({
          id: newId(),
          applicantId: applicant.id,
          fileName: file.name,
          fileType: file.type,
          fileSize: buf.length,
          uploadedAt: t,
          contentBase64: buf.toString('base64'),
        })
      }
    }

    let bundle
    try {
      bundle = await repoLoadApplicants()
    } catch (loadErr) {
      console.error('[submitApplication] repoLoadApplicants failed', loadErr)
      return {
        success: false,
        error: debug
          ? `Daten konnten nicht geladen werden: ${safeErrorMessage(loadErr)}`
          : 'Bewerbung konnte nicht gespeichert werden (Datenladefehler).',
      }
    }
    bundle.applicants.push(applicant)
    bundle.documents.push(...newDocuments)

    try {
      await writeJsonFile(DATA_FILES.applicants, bundle, `Data update applicants submit: ${t}`)
    } catch (writeErr) {
      console.error('[submitApplication] writeJsonFile failed', writeErr)
      return {
        success: false,
        error: debug
          ? `Speichern fehlgeschlagen: ${safeErrorMessage(writeErr)}`
          : 'Bewerbung konnte nicht gespeichert werden. Bitte später erneut versuchen.',
      }
    }

    try {
      await logAudit({
        action: 'create',
        entityType: 'applicant',
        entityId: applicant.id,
        metadata: { name: `${applicant.firstName} ${applicant.lastName}`, position: applicant.positionApplied },
      })
    } catch (auditErr) {
      console.warn('[submitApplication] audit log failed (non-fatal)', auditErr)
    }

    console.info('[submitApplication] success', { id: applicant.id })
    return { success: true, data: { id: applicant.id } }
  } catch (error) {
    logServerError('submitApplication error', error)
    return {
      success: false,
      error: debug
        ? `Bewerbung konnte nicht eingereicht werden: ${safeErrorMessage(error)}`
        : 'Bewerbung konnte nicht eingereicht werden',
    }
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

    const bundle = await repoLoadApplicants()
    const tags = await repoLoadTags()
    const applicantTags = await repoLoadApplicantTags()

    let list = bundle.applicants
    if (filters?.status) list = list.filter((a) => a.status === filters.status)
    if (filters?.positionApplied) list = list.filter((a) => a.positionApplied === filters.positionApplied)
    if (filters?.assignedToId) list = list.filter((a) => a.assignedToId === filters.assignedToId)
    if (filters?.search) list = list.filter((a) => applicantMatchesSearch(a, filters.search!))

    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    const total = list.length
    const slice = list.slice(skip, skip + pageSize)

    const applicants = await Promise.all(
      slice.map(async (a) => {
        const tagRows = applicantTags.filter((r) => r.applicantId === a.id)
        const tagObjs = tagRows
          .map((r) => tags.find((t) => t.id === r.tagId))
          .filter(Boolean)
          .map((t) => ({ tag: t! }))

        return {
          ...a,
          createdAt: new Date(a.createdAt),
          updatedAt: new Date(a.updatedAt),
          assignedTo: await repoJoinUserBriefNoEmail(a.assignedToId),
          tags: tagObjs,
          _count: {
            documents: bundle.documents.filter((d) => d.applicantId === a.id).length,
            notes: bundle.notes.filter((n) => n.applicantId === a.id).length,
          },
        }
      }),
    )

    return {
      success: true,
      data: { applicants, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    }
  } catch (error) {
    logServerError('getApplicants error', error)
    return { success: false, error: 'Bewerber konnten nicht geladen werden' }
  }
}

export async function getApplicant(id: string): Promise<ActionResult> {
  try {
    await requireAccess('applicants', 'view')

    const bundle = await repoLoadApplicants()
    const applicant = bundle.applicants.find((a) => a.id === id)
    if (!applicant) return { success: false, error: 'Bewerber nicht gefunden' }

    const tags = await repoLoadTags()
    const applicantTags = await repoLoadApplicantTags()
    const jobs = await repoLoadJobs()

    const tagObjs = applicantTags
      .filter((r) => r.applicantId === id)
      .map((r) => tags.find((t) => t.id === r.tagId))
      .filter(Boolean)
      .map((t) => ({ tag: t! }))

    const notes = await Promise.all(
      bundle.notes
        .filter((n) => n.applicantId === id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map(async (n) => ({
          ...n,
          createdAt: new Date(n.createdAt),
          author: await repoJoinUserBriefNoEmail(n.authorId),
        })),
    )

    const statusHistory = await Promise.all(
      bundle.statusHistory
        .filter((h) => h.applicantId === id)
        .sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime())
        .map(async (h) => ({
          ...h,
          changedAt: new Date(h.changedAt),
          changedBy: await repoJoinUserBriefNoEmail(h.changedById),
        })),
    )

    const documents = bundle.documents
      .filter((d) => d.applicantId === id)
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
      .map(stripDoc)

    const job = applicant.jobPostingId ? jobs.find((j) => j.id === applicant.jobPostingId) : null

    return {
      success: true,
      data: {
        ...applicant,
        createdAt: new Date(applicant.createdAt),
        updatedAt: new Date(applicant.updatedAt),
        assignedTo: await repoJoinUserBrief(applicant.assignedToId),
        documents,
        notes,
        statusHistory,
        tags: tagObjs,
        jobPosting: job
          ? { id: job.id, title: job.title, slug: job.slug }
          : null,
      },
    }
  } catch (error) {
    logServerError('getApplicant error', error)
    return { success: false, error: 'Bewerber konnte nicht geladen werden' }
  }
}

/** Beim Öffnen der Detailseite: „Neu eingegangen“ → „Gesichtet“, Eingang-Badge sinkt. Mit `view` erlaubt. */
export async function acknowledgeApplicantOnOpen(id: string): Promise<void> {
  try {
    const user = await requireAccess('applicants', 'view')

    const bundle = await repoLoadApplicants()
    const a = bundle.applicants.find((x) => x.id === id)
    if (!a || a.status !== ApplicantStatus.NEU_EINGEGANGEN) return

    const fromStatus = a.status
    a.status = ApplicantStatus.GESICHTET
    a.updatedAt = nowIso()

    bundle.statusHistory.push({
      id: newId(),
      applicantId: id,
      fromStatus,
      toStatus: ApplicantStatus.GESICHTET,
      changedById: user.id,
      note: 'Automatisch: Detailansicht geöffnet',
      changedAt: nowIso(),
    })

    await writeJsonFile(DATA_FILES.applicants, bundle, `Data update applicant ack open ${id}: ${a.updatedAt}`)

    await logAudit({
      userId: user.id,
      action: 'status_change',
      entityType: 'applicant',
      entityId: id,
      metadata: { fromStatus, toStatus: ApplicantStatus.GESICHTET, source: 'detail_open' },
    })

    // revalidatePath darf nicht während RSC-Render laufen; after() führt es nach der Response aus.
    after(() => {
      revalidatePath('/admin/applicants')
      revalidatePath(`/admin/applicants/${id}`)
      revalidatePath('/admin/dashboard')
    })
  } catch (error) {
    logServerError('acknowledgeApplicantOnOpen error', error)
  }
}

export async function updateApplicantStatus(
  id: string,
  status: ApplicantStatus,
  note?: string,
): Promise<ActionResult> {
  try {
    const user = await requireAccess('applicants', 'edit')

    const bundle = await repoLoadApplicants()
    const a = bundle.applicants.find((x) => x.id === id)
    if (!a) return { success: false, error: 'Bewerber nicht gefunden' }

    const fromStatus = a.status
    a.status = status
    a.updatedAt = nowIso()

    bundle.statusHistory.push({
      id: newId(),
      applicantId: id,
      fromStatus,
      toStatus: status,
      changedById: user.id,
      note: note?.trim() || null,
      changedAt: nowIso(),
    })

    await writeJsonFile(DATA_FILES.applicants, bundle, `Data update applicant status ${id}: ${a.updatedAt}`)

    await logAudit({
      userId: user.id,
      action: 'status_change',
      entityType: 'applicant',
      entityId: id,
      metadata: { fromStatus, toStatus: status },
    })

    revalidatePath('/admin/applicants')
    revalidatePath(`/admin/applicants/${id}`)
    return { success: true, data: { ...a, createdAt: new Date(a.createdAt), updatedAt: new Date(a.updatedAt) } }
  } catch (error) {
    logServerError('updateApplicantStatus error', error)
    return { success: false, error: 'Status konnte nicht aktualisiert werden' }
  }
}

export async function assignApplicant(id: string, userId: string | null): Promise<ActionResult> {
  try {
    const user = await requireAccess('applicants', 'edit')

    const bundle = await repoLoadApplicants()
    const a = bundle.applicants.find((x) => x.id === id)
    if (!a) return { success: false, error: 'Bewerber nicht gefunden' }

    a.assignedToId = userId
    a.updatedAt = nowIso()

    await writeJsonFile(DATA_FILES.applicants, bundle, `Data update applicant assign ${id}: ${a.updatedAt}`)

    await logAudit({
      userId: user.id,
      action: 'assign',
      entityType: 'applicant',
      entityId: id,
      metadata: { assignedToId: userId },
    })

    revalidatePath('/admin/applicants')
    revalidatePath(`/admin/applicants/${id}`)
    return {
      success: true,
      data: {
        ...a,
        createdAt: new Date(a.createdAt),
        updatedAt: new Date(a.updatedAt),
        assignedTo: await repoJoinUserBriefNoEmail(a.assignedToId),
      },
    }
  } catch (error) {
    logServerError('assignApplicant error', error)
    return { success: false, error: 'Zuweisung konnte nicht aktualisiert werden' }
  }
}

export async function addApplicantNote(applicantId: string, content: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('applicants', 'edit')

    if (!content.trim()) return { success: false, error: 'Notiz darf nicht leer sein' }

    const bundle = await repoLoadApplicants()
    if (!bundle.applicants.some((a) => a.id === applicantId)) {
      return { success: false, error: 'Bewerber nicht gefunden' }
    }

    const t = nowIso()
    bundle.notes.push({
      id: newId(),
      applicantId,
      authorId: user.id,
      content: content.trim(),
      createdAt: t,
    })
    const a = bundle.applicants.find((x) => x.id === applicantId)!
    a.updatedAt = t

    await writeJsonFile(DATA_FILES.applicants, bundle, `Data update applicant note ${applicantId}: ${t}`)

    await logAudit({
      userId: user.id,
      action: 'note_added',
      entityType: 'applicant',
      entityId: applicantId,
    })

    revalidatePath(`/admin/applicants/${applicantId}`)
    const n = bundle.notes[bundle.notes.length - 1]
    return {
      success: true,
      data: {
        ...n,
        createdAt: new Date(n.createdAt),
        author: await repoJoinUserBriefNoEmail(user.id),
      },
    }
  } catch (error) {
    logServerError('addApplicantNote error', error)
    return { success: false, error: 'Notiz konnte nicht hinzugefügt werden' }
  }
}

export async function addApplicantTag(applicantId: string, tagId: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('applicants', 'edit')

    const rows = await repoLoadApplicantTags()
    if (rows.some((r) => r.applicantId === applicantId && r.tagId === tagId)) {
      return { success: true }
    }
    rows.push({ applicantId, tagId })
    await writeJsonFile(DATA_FILES.applicantTags, rows, `Data update applicant-tags add: ${nowIso()}`)

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
    logServerError('addApplicantTag error', error)
    return { success: false, error: 'Tag konnte nicht hinzugefügt werden' }
  }
}

export async function removeApplicantTag(applicantId: string, tagId: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('applicants', 'edit')

    const rows = await repoLoadApplicantTags()
    const next = rows.filter((r) => !(r.applicantId === applicantId && r.tagId === tagId))
    await writeJsonFile(DATA_FILES.applicantTags, next, `Data update applicant-tags remove: ${nowIso()}`)

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
    logServerError('removeApplicantTag error', error)
    return { success: false, error: 'Tag konnte nicht entfernt werden' }
  }
}

export async function deleteApplicant(id: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('applicants', 'delete')

    const bundle = await repoLoadApplicants()
    if (!bundle.applicants.some((a) => a.id === id)) {
      return { success: false, error: 'Bewerber nicht gefunden' }
    }

    const docCount = bundle.documents.filter((d) => d.applicantId === id).length
    bundle.applicants = bundle.applicants.filter((a) => a.id !== id)
    bundle.documents = bundle.documents.filter((d) => d.applicantId !== id)
    bundle.notes = bundle.notes.filter((n) => n.applicantId !== id)
    bundle.statusHistory = bundle.statusHistory.filter((h) => h.applicantId !== id)

    const rows = await repoLoadApplicantTags()
    const nextTags = rows.filter((r) => r.applicantId !== id)

    await writeJsonFile(DATA_FILES.applicants, bundle, `Data update applicants delete ${id}: ${nowIso()}`)
    await writeJsonFile(DATA_FILES.applicantTags, nextTags, `Data update applicant-tags delete applicant: ${nowIso()}`)

    await logAudit({
      userId: user.id,
      action: 'delete',
      entityType: 'applicant',
      entityId: id,
      metadata: { documentsDeleted: docCount },
    })

    revalidatePath('/admin/applicants')
    return { success: true }
  } catch (error) {
    logServerError('deleteApplicant error', error)
    return { success: false, error: 'Bewerber konnte nicht gelöscht werden' }
  }
}

export async function getApplicantsByStatus(): Promise<ActionResult> {
  try {
    await requireAccess('applicants', 'view')

    const bundle = await repoLoadApplicants()
    const pipeline = bundle.applicants.reduce(
      (acc, a) => {
        acc[a.status] = (acc[a.status] ?? 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return { success: true, data: pipeline }
  } catch (error) {
    logServerError('getApplicantsByStatus error', error)
    return { success: false, error: 'Pipeline-Daten konnten nicht geladen werden' }
  }
}
