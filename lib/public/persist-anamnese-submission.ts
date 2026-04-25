import { revalidatePath } from 'next/cache'
import { logAudit } from '@/lib/audit/logger'
import { newId, nowIso, repoLoadAnamnese } from '@/lib/data/json-repository'
import type { JsonAnamneseSubmission } from '@/lib/data/schema'
import { DATA_FILES } from '@/lib/data/schema'
import { logServerError } from '@/lib/error-handling'
import { AnamneseStatus } from '@/lib/types/enums'
import { writeJsonFile } from '@/lib/storage/json-data-layer'

const MAX_PAYLOAD_BYTES = 400_000

export type PersistAnamneseResult =
  | { ok: true; id: string }
  | { ok: false; error: string; status: number }

/**
 * Speichert einen öffentlich eingereichten Anamnesebogen (ohne Admin-Session).
 */
export async function persistAnamneseSubmission(
  body: Record<string, unknown>,
): Promise<PersistAnamneseResult> {
  const vorname = String(body.vorname ?? '').trim()
  const nachname = String(body.nachname ?? '').trim()
  const geburtsdatum = String(body.geburtsdatum ?? '').trim()
  const telefon = String(body.telefon ?? '').trim()
  if (!vorname || !nachname || !geburtsdatum || !telefon) {
    return { ok: false, error: 'Pflichtfelder fehlen', status: 400 }
  }
  if (!body.datenschutz || !body.richtigkeit) {
    return { ok: false, error: 'Einwilligungen fehlen', status: 400 }
  }
  const emailRaw = body.email
  const email =
    typeof emailRaw === 'string' && emailRaw.trim() ? emailRaw.trim() : null

  let sizeCheck: string
  try {
    sizeCheck = JSON.stringify(body)
  } catch {
    return { ok: false, error: 'Ungültige Formulardaten', status: 400 }
  }
  if (sizeCheck.length > MAX_PAYLOAD_BYTES) {
    return { ok: false, error: 'Daten zu umfangreich. Bitte kürzen oder später erneut versuchen.', status: 413 }
  }

  const bundle = await repoLoadAnamnese()
  const t = nowIso()
  const row: JsonAnamneseSubmission = {
    id: newId(),
    status: AnamneseStatus.NEU_EINGEGANGEN,
    patientFirstName: vorname,
    patientLastName: nachname,
    birthDate: geburtsdatum,
    phone: telefon,
    email,
    payload: body,
    assignedToId: null,
    createdAt: t,
    updatedAt: t,
  }
  bundle.submissions.push(row)

  try {
    await writeJsonFile(DATA_FILES.anamnese, bundle, `Data update anamnese create: ${t}`)
  } catch (e) {
    logServerError('persistAnamneseSubmission write', e)
    return { ok: false, error: 'Speichern fehlgeschlagen. Bitte später erneut versuchen.', status: 500 }
  }

  try {
    await logAudit({
      action: 'create',
      entityType: 'anamnese_submission',
      entityId: row.id,
      metadata: { name: `${vorname} ${nachname}`, phone: telefon },
    })
  } catch (auditErr) {
    logServerError('persistAnamneseSubmission audit (non-fatal)', auditErr)
  }

  revalidatePath('/admin/anamnese')
  revalidatePath('/admin/dashboard')

  return { ok: true, id: row.id }
}
