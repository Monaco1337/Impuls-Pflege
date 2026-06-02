/**
 * Admin-Endpunkt zum Hochladen eines Website-Fotos für einen festen Slot.
 *
 * Erwartet `multipart/form-data` mit den Feldern:
 *  - `file`     – die Bilddatei (JPEG, PNG, WebP, max. 12 MB Original)
 *  - `slotKey`  – Schlüssel des Ziel-Slots (siehe `SITE_IMAGE_SLOTS`)
 *
 * Antwortet mit `{ success: true, data: { publicPath, mime, size } }`,
 * wobei `publicPath` eine sofort gültige URL ist (`/api/site-image/<key>?v=…`).
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { hasPermission } from '@/lib/rbac/permissions'
import { saveCmsSiteImageFile } from '@/lib/storage/cms-site-image'
import type { RoleName } from '@/lib/types/enums'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

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
    const file = formData.get('file')
    const rawSlot = formData.get('slotKey')
    const slotKey =
      typeof rawSlot === 'string' && rawSlot.trim() ? rawSlot.trim() : undefined

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Keine Datei' }, { status: 400 })
    }

    // slotKey ist OPTIONAL:
    //  - feste Slots aus SITE_IMAGE_SLOTS schicken einen konstanten Key
    //    → identische Slots werden beim erneuten Upload überschrieben
    //  - dynamische Uploads (Team-Mitglieder, Galerien) lassen den Slot
    //    weg → der Server generiert eine kollisionsfreie ID
    const result = await saveCmsSiteImageFile({ slotKey, file })

    return NextResponse.json({
      success: true,
      data: {
        publicPath: result.publicPath,
        mime: result.mime,
        size: result.size,
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload fehlgeschlagen'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
