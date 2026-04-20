'use server'

import { requireAccess } from '@/lib/rbac/check'
import { logAudit } from '@/lib/audit/logger'
import { revalidatePath } from 'next/cache'
import { logServerError } from '@/lib/error-handling'
import { newId, nowIso, repoLoadSettings } from '@/lib/data/json-repository'
import { DATA_FILES, type JsonSetting } from '@/lib/data/schema'
import { writeJsonFile } from '@/lib/storage/json-data-layer'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

export async function getSettings(): Promise<ActionResult> {
  try {
    await requireAccess('settings', 'view')

    const settings = await repoLoadSettings()

    const mapped = settings.reduce(
      (acc, setting) => {
        acc[setting.key] = setting.value
        return acc
      },
      {} as Record<string, unknown>,
    )

    return { success: true, data: mapped }
  } catch (error) {
    logServerError('getSettings error', error)
    return { success: false, error: 'Einstellungen konnten nicht geladen werden' }
  }
}

export async function updateSettings(data: Record<string, unknown>): Promise<ActionResult> {
  try {
    const user = await requireAccess('settings', 'edit')

    const settings = await repoLoadSettings()
    const byKey = new Map(settings.map((s) => [s.key, s]))

    for (const [key, value] of Object.entries(data)) {
      const existing = byKey.get(key)
      if (existing) {
        existing.value = value
      } else {
        const row: JsonSetting = { id: newId(), key, value }
        settings.push(row)
        byKey.set(key, row)
      }
    }

    await writeJsonFile(
      DATA_FILES.settings,
      settings,
      `Data update ${DATA_FILES.settings}: ${nowIso()}`,
    )

    await logAudit({
      userId: user.id,
      action: 'settings_update',
      entityType: 'setting',
      metadata: { keys: Object.keys(data) },
    })

    revalidatePath('/admin/settings')
    return { success: true }
  } catch (error) {
    logServerError('updateSettings error', error)
    return { success: false, error: 'Einstellungen konnten nicht gespeichert werden' }
  }
}
