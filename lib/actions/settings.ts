'use server'

import { prisma } from '@/lib/db'
import { requireAccess } from '@/lib/rbac/check'
import { logAudit } from '@/lib/audit/logger'
import { revalidatePath } from 'next/cache'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

export async function getSettings(): Promise<ActionResult> {
  try {
    await requireAccess('settings', 'view')

    const settings = await prisma.setting.findMany()

    const mapped = settings.reduce(
      (acc, setting) => {
        acc[setting.key] = setting.value
        return acc
      },
      {} as Record<string, unknown>
    )

    return { success: true, data: mapped }
  } catch (error) {
    console.error('getSettings error:', error)
    return { success: false, error: 'Einstellungen konnten nicht geladen werden' }
  }
}

export async function updateSettings(data: Record<string, unknown>): Promise<ActionResult> {
  try {
    const user = await requireAccess('settings', 'edit')

    const updates = Object.entries(data).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value: value as any },
        create: { key, value: value as any },
      })
    )

    await prisma.$transaction(updates)

    await logAudit({
      userId: user.id,
      action: 'settings_update',
      entityType: 'setting',
      metadata: { keys: Object.keys(data) },
    })

    revalidatePath('/admin/settings')
    return { success: true }
  } catch (error) {
    console.error('updateSettings error:', error)
    return { success: false, error: 'Einstellungen konnten nicht gespeichert werden' }
  }
}
