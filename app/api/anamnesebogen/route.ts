import { NextResponse } from 'next/server'
import { persistAnamneseSubmission } from '@/lib/public/persist-anamnese-submission'
import { logServerError } from '@/lib/error-handling'

export async function POST(request: Request) {
  try {
    let data: unknown
    try {
      data = await request.json()
    } catch {
      return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 })
    }
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return NextResponse.json({ error: 'Ungültige Formulardaten' }, { status: 400 })
    }

    const result = await persistAnamneseSubmission(data as Record<string, unknown>)
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
