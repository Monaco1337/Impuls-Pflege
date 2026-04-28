import { revalidatePath } from 'next/cache'
import { logAudit } from '@/lib/audit/logger'
import { newId, nowIso, repoLoadAnamnese } from '@/lib/data/json-repository'
import type { JsonAnamneseDocument, JsonAnamneseSubmission } from '@/lib/data/schema'
import { DATA_FILES } from '@/lib/data/schema'
import { logServerError } from '@/lib/error-handling'
import { AnamneseStatus } from '@/lib/types/enums'
import { writeJsonFile } from '@/lib/storage/json-data-layer'

const MAX_PAYLOAD_BYTES = 400_000
const MAX_DISCHARGE_FILES = 8
const MAX_DISCHARGE_FILE_BYTES = 4_000_000
const MAX_DISCHARGE_TOTAL_BYTES = 12_000_000
const ACCEPTED_DISCHARGE_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
])

export type PersistAnamneseResult =
  | { ok: true; id: string }
  | { ok: false; error: string; status: number }

/**
 * Speichert einen öffentlich eingereichten Anamnesebogen (ohne Admin-Session).
 *
 * Optionale {@link files} werden als Entlassungsbrief-Dokumente inline
 * (base64) im selben JSON-Bundle persistiert — analog zu Bewerber-Uploads.
 */
export async function persistAnamneseSubmission(
  body: Record<string, unknown>,
  files: File[] = [],
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

  if (files.length > MAX_DISCHARGE_FILES) {
    return {
      ok: false,
      error: `Maximal ${MAX_DISCHARGE_FILES} Dateien pro Einreichung.`,
      status: 413,
    }
  }

  const bundle = await repoLoadAnamnese()
  const submissionId = newId()
  const t = nowIso()

  const documents: JsonAnamneseDocument[] = []
  let totalBytes = 0
  for (const file of files) {
    if (!file || file.size <= 0) continue

    const buf = Buffer.from(await file.arrayBuffer())
    if (buf.length > MAX_DISCHARGE_FILE_BYTES) {
      return {
        ok: false,
        error: `Datei „${file.name}“ ist zu groß. Maximal erlaubt sind 4 MB pro Datei.`,
        status: 413,
      }
    }
    totalBytes += buf.length
    if (totalBytes > MAX_DISCHARGE_TOTAL_BYTES) {
      return {
        ok: false,
        error: 'Gesamtgröße der Dateien zu hoch (max. 12 MB).',
        status: 413,
      }
    }

    const looksAcceptable =
      ACCEPTED_DISCHARGE_TYPES.has(file.type) ||
      /\.(pdf|jpe?g|png|webp|heic)$/i.test(file.name)
    if (!looksAcceptable) {
      return {
        ok: false,
        error: `Dateityp von „${file.name}“ wird nicht unterstützt. Erlaubt: PDF, JPG, PNG, WEBP.`,
        status: 415,
      }
    }

    documents.push({
      id: newId(),
      submissionId,
      kind: 'entlassungsbrief',
      fileName: file.name,
      fileType: file.type || 'application/octet-stream',
      fileSize: buf.length,
      uploadedAt: t,
      contentBase64: buf.toString('base64'),
    })
  }

  const row: JsonAnamneseSubmission = {
    id: submissionId,
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
  if (!Array.isArray(bundle.documents)) bundle.documents = []
  if (documents.length > 0) bundle.documents.push(...documents)

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
      metadata: {
        name: `${vorname} ${nachname}`,
        phone: telefon,
        documents: documents.length,
      },
    })
  } catch (auditErr) {
    logServerError('persistAnamneseSubmission audit (non-fatal)', auditErr)
  }

  revalidatePath('/admin/anamnese')
  revalidatePath('/admin/dashboard')

  return { ok: true, id: row.id }
}
