import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate minimum required fields
    if (!data.vorname || !data.nachname || !data.geburtsdatum || !data.telefon) {
      return NextResponse.json(
        { error: 'Pflichtfelder fehlen' },
        { status: 400 },
      )
    }

    if (!data.datenschutz || !data.richtigkeit) {
      return NextResponse.json(
        { error: 'Einwilligungen fehlen' },
        { status: 400 },
      )
    }

    // Log submission (in production: store to DB, send email notification, etc.)
    console.log('[Anamnesebogen] Neue Einreichung:', {
      name: `${data.vorname} ${data.nachname}`,
      geburtsdatum: data.geburtsdatum,
      telefon: data.telefon,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { success: true, message: 'Anamnesebogen erfolgreich übermittelt' },
      { status: 200 },
    )
  } catch {
    return NextResponse.json(
      { error: 'Fehler bei der Verarbeitung' },
      { status: 500 },
    )
  }
}
