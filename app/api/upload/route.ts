import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { hasPermission } from '@/lib/rbac/permissions'
import { saveFile } from '@/lib/storage'
import { RoleName } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    if (!hasPermission(session.user.role as RoleName, 'files', 'create')) {
      return NextResponse.json({ error: 'Keine Berechtigung' }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const subDir = (formData.get('subDir') as string) || 'general'

    if (!file) {
      return NextResponse.json({ error: 'Keine Datei hochgeladen' }, { status: 400 })
    }

    const result = await saveFile(file, subDir)

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload fehlgeschlagen'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
