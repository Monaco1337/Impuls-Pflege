import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { hasPermission } from '@/lib/rbac/permissions'
import { prisma } from '@/lib/db'
import { getFile } from '@/lib/storage'
import { RoleName } from '@prisma/client'

export async function GET(
  _request: NextRequest,
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

    const document = await prisma.applicantDocument.findUnique({
      where: { id },
      select: { fileName: true, fileType: true, filePath: true },
    })

    if (!document) {
      return NextResponse.json({ error: 'Dokument nicht gefunden' }, { status: 404 })
    }

    const buffer = await getFile(document.filePath)
    const uint8 = new Uint8Array(buffer)

    return new Response(uint8, {
      headers: {
        'Content-Type': document.fileType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(document.fileName)}"`,
        'Content-Length': String(buffer.length),
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
