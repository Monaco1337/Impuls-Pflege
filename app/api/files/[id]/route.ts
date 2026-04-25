import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { hasPermission } from '@/lib/rbac/permissions'
import { repoApplicantDocumentToBuffer } from '@/lib/data/json-repository'
import type { RoleName } from '@/lib/types/enums'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    if (!hasPermission(session.user.role as RoleName, 'files', 'view')) {
      return NextResponse.json({ error: 'Keine Berechtigung' }, { status: 403 })
    }

    const { id } = await params

    const hit = await repoApplicantDocumentToBuffer(id)
    if (!hit) {
      return NextResponse.json({ error: 'Dokument nicht gefunden' }, { status: 404 })
    }

    const uint8 = new Uint8Array(hit.buffer)

    // ?inline=1 → im Browser anzeigen (für Vorschau im Admin-Dialog).
    // Sonst (Default) → als Download zurückgeben.
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
    console.error('File download error:', error)
    return NextResponse.json(
      { error: 'Datei konnte nicht heruntergeladen werden' },
      { status: 500 },
    )
  }
}
