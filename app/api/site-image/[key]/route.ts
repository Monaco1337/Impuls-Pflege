/**
 * Öffentlicher Streaming-Endpoint für vom Admin hochgeladene Website-Fotos.
 *
 * Liefert das Bild eines bekannten Slots aus dem JSON-Blob-Store mit
 * korrekten Cache-Headern aus. Wird sowohl von `next/image` (Optimizer) als
 * auch direkt von `<img>`-Tags konsumiert.
 *
 * Cache-Strategie:
 *  - `Cache-Control: public, max-age=60, s-maxage=86400,
 *    stale-while-revalidate=604800`
 *  - Client darf 60 s ohne Revalidierung weiterverwenden, CDN cached 24 h
 *    und liefert während der Revalidierung weiter. Da der gespeicherte
 *    `src` jedes Mal mit einem `?v=…`-Cache-Buster aktualisiert wird,
 *    sehen Nutzer neue Bilder beim nächsten HTML-Refresh sofort.
 */

import { NextRequest, NextResponse } from 'next/server'
import { readSiteImageBlob } from '@/lib/storage/cms-site-image-blob'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CACHE_HEADER =
  'public, max-age=60, s-maxage=86400, stale-while-revalidate=604800'

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ key: string }> },
) {
  const { key } = await context.params
  const slotKey = (key ?? '').trim()
  if (!slotKey || !/^[a-zA-Z0-9_-]{1,64}$/.test(slotKey)) {
    return NextResponse.json(
      { error: 'Ungültiger Bild-Slot' },
      { status: 400 },
    )
  }

  const blob = await readSiteImageBlob(slotKey)
  if (!blob) {
    return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  }

  const buffer = Buffer.from(blob.data, 'base64')
  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      'Content-Type': blob.mime,
      'Content-Length': String(buffer.byteLength),
      'Cache-Control': CACHE_HEADER,
      'Last-Modified': new Date(blob.updatedAt).toUTCString(),
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

export async function HEAD(
  _request: NextRequest,
  context: { params: Promise<{ key: string }> },
) {
  const { key } = await context.params
  const slotKey = (key ?? '').trim()
  if (!slotKey || !/^[a-zA-Z0-9_-]{1,64}$/.test(slotKey)) {
    return new NextResponse(null, { status: 400 })
  }
  const blob = await readSiteImageBlob(slotKey)
  if (!blob) return new NextResponse(null, { status: 404 })
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Content-Type': blob.mime,
      'Content-Length': String(Buffer.byteLength(blob.data, 'base64')),
      'Cache-Control': CACHE_HEADER,
      'Last-Modified': new Date(blob.updatedAt).toUTCString(),
    },
  })
}
