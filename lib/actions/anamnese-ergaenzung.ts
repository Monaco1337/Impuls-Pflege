'use server'

import { revalidatePath } from 'next/cache'
import { logAudit } from '@/lib/audit/logger'
import { logServerError } from '@/lib/error-handling'
import { requireAccess } from '@/lib/rbac/check'
import { nowIso, repoLoadAnamnese, repoJoinUserBriefNoEmail } from '@/lib/data/json-repository'
import { DATA_FILES } from '@/lib/data/schema'
import { writeJsonFile } from '@/lib/storage/json-data-layer'
import {
  ERGAENZUNG_KEYS,
  isErgaenzungFilled,
  type AnamneseErgaenzung,
} from '@/lib/types/anamnese-ergaenzung'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

/* ─────────────────────── Helpers ─────────────────────── */

/**
 * Liest die Ergänzung sicher aus dem Submission-Payload aus.
 * Schema-Wechsel-tolerant: erkennt fehlende oder fehlgeformte Daten.
 */
function readErgaenzungFromPayload(payload: unknown): AnamneseErgaenzung | null {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null
  const v = (payload as Record<string, unknown>).vorOrt
  if (!v || typeof v !== 'object' || Array.isArray(v)) return null
  return v as AnamneseErgaenzung
}

/** Filtert nur erlaubte Felder aus User-Input — wirft Unbekanntes weg. */
function sanitizeErgaenzungInput(input: unknown): AnamneseErgaenzung {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {}
  const src = input as Record<string, unknown>
  const out: Record<string, unknown> = {}
  for (const k of ERGAENZUNG_KEYS) {
    const raw = src[k]
    if (raw === undefined) continue
    if (typeof raw === 'boolean') out[k] = raw
    else if (typeof raw === 'string') out[k] = raw.trim()
    else if (raw === null) out[k] = ''
  }
  return out as AnamneseErgaenzung
}

export type AnamneseErgaenzungSummary = {
  submissionId: string
  patientFirstName: string
  patientLastName: string
  birthDate: string
  phone: string
  status: string
  submissionCreatedAt: Date
  ergaenzungUpdatedAt: Date | null
  filledByUserId: string | null
  filledByName: string | null
  hasErgaenzung: boolean
}

/* ─────────────────────── Reads ─────────────────────── */

/**
 * Listet alle Anamnese-Submissions mit Status zur Vor-Ort-Ergänzung.
 * Sortiert: zuerst „offen" (ohne Ergänzung), dann nach jüngstem Update.
 */
export async function listAnamneseErgaenzungen(filters?: {
  search?: string
  status?: 'offen' | 'erfasst' | 'all'
}): Promise<ActionResult<{ items: AnamneseErgaenzungSummary[]; total: number }>> {
  try {
    await requireAccess('anamnese', 'view')

    const data = await repoLoadAnamnese()
    const search = filters?.search?.toLowerCase().trim() ?? ''
    const status = filters?.status ?? 'all'

    const summaries: AnamneseErgaenzungSummary[] = []
    for (const s of data.submissions) {
      const erg = readErgaenzungFromPayload(s.payload)
      const filled = isErgaenzungFilled(erg)
      if (status === 'offen' && filled) continue
      if (status === 'erfasst' && !filled) continue

      if (search) {
        const haystack = [
          s.patientFirstName,
          s.patientLastName,
          s.phone,
          s.email ?? '',
          s.birthDate,
        ].join(' ').toLowerCase()
        if (!haystack.includes(search)) continue
      }

      const filledBy = await repoJoinUserBriefNoEmail(erg?.filledByUserId ?? null)

      summaries.push({
        submissionId: s.id,
        patientFirstName: s.patientFirstName,
        patientLastName: s.patientLastName,
        birthDate: s.birthDate,
        phone: s.phone,
        status: s.status,
        submissionCreatedAt: new Date(s.createdAt),
        ergaenzungUpdatedAt: erg?.updatedAt ? new Date(erg.updatedAt) : null,
        filledByUserId: erg?.filledByUserId ?? null,
        filledByName: filledBy ? `${filledBy.firstName} ${filledBy.lastName}` : null,
        hasErgaenzung: filled,
      })
    }

    summaries.sort((a, b) => {
      if (a.hasErgaenzung !== b.hasErgaenzung) return a.hasErgaenzung ? 1 : -1
      const aT = a.ergaenzungUpdatedAt ?? a.submissionCreatedAt
      const bT = b.ergaenzungUpdatedAt ?? b.submissionCreatedAt
      return bT.getTime() - aT.getTime()
    })

    return { success: true, data: { items: summaries, total: summaries.length } }
  } catch (error) {
    logServerError('listAnamneseErgaenzungen error', error)
    return { success: false, error: 'Liste konnte nicht geladen werden' }
  }
}

/** Lädt die Ergänzung samt Patientenkontext für die Detail-Seite. */
export async function getAnamneseErgaenzung(submissionId: string): Promise<
  ActionResult<{
    submissionId: string
    patientFirstName: string
    patientLastName: string
    birthDate: string
    phone: string
    email: string | null
    status: string
    submissionCreatedAt: Date
    ergaenzung: AnamneseErgaenzung
    filledByName: string | null
    hasErgaenzung: boolean
  }>
> {
  try {
    await requireAccess('anamnese', 'view')

    const data = await repoLoadAnamnese()
    const submission = data.submissions.find((s) => s.id === submissionId)
    if (!submission) return { success: false, error: 'Anamnesebogen nicht gefunden' }

    const erg = readErgaenzungFromPayload(submission.payload) ?? {}
    const filledBy = await repoJoinUserBriefNoEmail(erg.filledByUserId ?? null)

    return {
      success: true,
      data: {
        submissionId: submission.id,
        patientFirstName: submission.patientFirstName,
        patientLastName: submission.patientLastName,
        birthDate: submission.birthDate,
        phone: submission.phone,
        email: submission.email,
        status: submission.status,
        submissionCreatedAt: new Date(submission.createdAt),
        ergaenzung: erg,
        filledByName: filledBy ? `${filledBy.firstName} ${filledBy.lastName}` : null,
        hasErgaenzung: isErgaenzungFilled(erg),
      },
    }
  } catch (error) {
    logServerError('getAnamneseErgaenzung error', error)
    return { success: false, error: 'Eintrag konnte nicht geladen werden' }
  }
}

/* ─────────────────────── Writes ─────────────────────── */

/**
 * Schreibt/aktualisiert die Vor-Ort-Ergänzung für eine Submission.
 * Erstellt sie falls noch nicht vorhanden.
 */
export async function saveAnamneseErgaenzung(
  submissionId: string,
  input: AnamneseErgaenzung,
): Promise<ActionResult<{ submissionId: string; updatedAt: string }>> {
  try {
    const user = await requireAccess('anamnese', 'edit')

    const bundle = await repoLoadAnamnese()
    const submission = bundle.submissions.find((s) => s.id === submissionId)
    if (!submission) return { success: false, error: 'Anamnesebogen nicht gefunden' }

    const sanitized = sanitizeErgaenzungInput(input)
    const t = nowIso()
    const previous = readErgaenzungFromPayload(submission.payload) ?? {}

    const next: AnamneseErgaenzung = {
      ...previous,
      ...sanitized,
      filledByUserId: previous.filledByUserId ?? user.id,
      filledAt: previous.filledAt ?? t,
      updatedAt: t,
    }

    if (!submission.payload || typeof submission.payload !== 'object' || Array.isArray(submission.payload)) {
      submission.payload = {}
    }
    ;(submission.payload as Record<string, unknown>).vorOrt = next
    submission.updatedAt = t

    await writeJsonFile(
      DATA_FILES.anamnese,
      bundle,
      `Data update anamnese-ergaenzung save ${submissionId}: ${t}`,
    )

    await logAudit({
      userId: user.id,
      action: isErgaenzungFilled(previous) ? 'update' : 'create',
      entityType: 'anamnese_ergaenzung',
      entityId: submissionId,
      metadata: {
        patient: `${submission.patientLastName}, ${submission.patientFirstName}`,
        fieldsTouched: Object.keys(sanitized),
      },
    })

    revalidatePath('/admin/anamnese-ergaenzung')
    revalidatePath(`/admin/anamnese-ergaenzung/${submissionId}`)
    revalidatePath(`/admin/anamnese/${submissionId}`)
    revalidatePath('/admin/anamnese')
    revalidatePath('/admin/dashboard')

    return { success: true, data: { submissionId, updatedAt: t } }
  } catch (error) {
    logServerError('saveAnamneseErgaenzung error', error)
    return { success: false, error: 'Ergänzung konnte nicht gespeichert werden' }
  }
}

/** Löscht den vorOrt-Block einer Submission (z. B. bei Fehlerfassung). */
export async function deleteAnamneseErgaenzung(submissionId: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('anamnese', 'edit')

    const bundle = await repoLoadAnamnese()
    const submission = bundle.submissions.find((s) => s.id === submissionId)
    if (!submission) return { success: false, error: 'Anamnesebogen nicht gefunden' }

    if (submission.payload && typeof submission.payload === 'object' && !Array.isArray(submission.payload)) {
      delete (submission.payload as Record<string, unknown>).vorOrt
    }
    submission.updatedAt = nowIso()

    await writeJsonFile(
      DATA_FILES.anamnese,
      bundle,
      `Data update anamnese-ergaenzung delete ${submissionId}: ${submission.updatedAt}`,
    )

    await logAudit({
      userId: user.id,
      action: 'delete',
      entityType: 'anamnese_ergaenzung',
      entityId: submissionId,
      metadata: {
        patient: `${submission.patientLastName}, ${submission.patientFirstName}`,
      },
    })

    revalidatePath('/admin/anamnese-ergaenzung')
    revalidatePath(`/admin/anamnese-ergaenzung/${submissionId}`)
    revalidatePath(`/admin/anamnese/${submissionId}`)

    return { success: true }
  } catch (error) {
    logServerError('deleteAnamneseErgaenzung error', error)
    return { success: false, error: 'Ergänzung konnte nicht entfernt werden' }
  }
}
