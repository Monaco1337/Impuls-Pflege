import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { hasPermission } from '@/lib/rbac/permissions'
import { repoAnamneseDocumentToBuffer } from '@/lib/data/json-repository'
import type { RoleName } from '@/lib/types/enums'

/**
 * Liefert ein Anamnese-Dokument (z. B. Entlassungsbrief) für authentifizierte
 * Admin-Benutzer mit `anamnese.view`. Standardmäßig als Download, optional
 * inline (?inline=1) für die Vorschau im Admin-Detail.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    if (!hasPermission(session.user.role as RoleName, 'anamnese', 'view')) {
      return NextResponse.json({ error: 'Keine Berechtigung' }, { status: 403 })
    }

    const { id } = await params

    const hit = await repoAnamneseDocumentToBuffer(id)
    if (!hit) {
      return NextResponse.json({ error: 'Dokument nicht gefunden' }, { status: 404 })
    }

    const uint8 = new Uint8Array(hit.buffer)
    const inline = request.nextUrl.searchParams.get('inline') === '1'
    const disposition = inline ? 'inline' : 'attachment'

    return new Response(uint8, {
      headers: {
        'Content-Type': hit.fileType,
        'Content-Disposition': `${disposition}; filename="${encodeURIComponent(hit.fileName)}"`,
        'Content-Length': String(hit.buffer.length),
        'Cache-Control': 'private, max-age=0, no-store',
      },
    })
  } catch (error) {
    console.error('Anamnese file download error:', error)
    return NextResponse.json(
      { error: 'Datei konnte nicht heruntergeladen werden' },
      { status: 500 },
    )
  }
}
