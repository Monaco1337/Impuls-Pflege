import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { getInboxCountsForRole } from '@/lib/admin/inbox-counts'
import type { RoleName } from '@/lib/types/enums'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const role = session.user.role as RoleName
  const counts = await getInboxCountsForRole(role)

  return NextResponse.json(counts, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
  })
}
