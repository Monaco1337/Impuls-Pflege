import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { hasPermission } from '@/lib/rbac/permissions'
import { saveCmsSiteImageFile } from '@/lib/storage/cms-site-image'
import type { RoleName } from '@/lib/types/enums'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    if (!hasPermission(session.user.role as RoleName, 'content', 'edit')) {
      return NextResponse.json({ error: 'Keine Berechtigung' }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'Keine Datei' }, { status: 400 })
    }

    const { publicPath } = await saveCmsSiteImageFile(file)
    return NextResponse.json({ success: true, data: { publicPath } })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload fehlgeschlagen'
    const status = message.includes('EROFS') || message.includes('EACCES') ? 503 : 400
    return NextResponse.json({ error: message }, { status })
  }
}
