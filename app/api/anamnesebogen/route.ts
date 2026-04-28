import { NextResponse } from 'next/server'
import { persistAnamneseSubmission } from '@/lib/public/persist-anamnese-submission'
import { logServerError } from '@/lib/error-handling'

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') ?? ''

    let data: Record<string, unknown> = {}
    let files: File[] = []

    if (contentType.includes('multipart/form-data')) {
      let form: FormData
      try {
        form = await request.formData()
      } catch {
        return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 })
      }

      const payloadRaw = form.get('payload')
      if (typeof payloadRaw !== 'string') {
        return NextResponse.json({ error: 'Ungültige Formulardaten' }, { status: 400 })
      }
      try {
        const parsed = JSON.parse(payloadRaw)
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
          return NextResponse.json({ error: 'Ungültige Formulardaten' }, { status: 400 })
        }
        data = parsed as Record<string, unknown>
      } catch {
        return NextResponse.json({ error: 'Ungültige Formulardaten' }, { status: 400 })
      }

      const dischargeRaw = form.getAll('discharge')
      files = dischargeRaw.filter((entry): entry is File => entry instanceof File && entry.size > 0)
    } else {
      // Backwards-Kompatibilität: ältere Clients schicken evtl. noch JSON
      let parsed: unknown
      try {
        parsed = await request.json()
      } catch {
        return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 })
      }
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return NextResponse.json({ error: 'Ungültige Formulardaten' }, { status: 400 })
      }
      data = parsed as Record<string, unknown>
    }

    const result = await persistAnamneseSubmission(data, files)
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status })
    }

    return NextResponse.json(
      { success: true, message: 'Anamnesebogen erfolgreich übermittelt', id: result.id },
      { status: 200 },
    )
  } catch (e) {
    logServerError('POST /api/anamnesebogen', e)
    return NextResponse.json({ error: 'Fehler bei der Verarbeitung' }, { status: 500 })
  }
}
