'use server'

import { requireAccess } from '@/lib/rbac/check'
import { logServerError } from '@/lib/error-handling'
import {
  repoJoinUserBrief,
  repoLoadAuditLogs,
  repoLoadHiddenUserIds,
} from '@/lib/data/json-repository'
import {
  filterAuditLogsForViewer,
  isOwnerViewer,
} from '@/lib/rbac/visibility'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

export async function getAuditLogs(filters?: {
  page?: number
  pageSize?: number
  userId?: string
  action?: string
  entityType?: string
  dateFrom?: string
  dateTo?: string
}): Promise<ActionResult> {
  try {
    const viewer = await requireAccess('activity', 'view')

    const page = filters?.page ?? 1
    const pageSize = filters?.pageSize ?? 30
    const skip = (page - 1) * pageSize

    let logs = await repoLoadAuditLogs()
    const hiddenIds = await repoLoadHiddenUserIds()

    // Audit bleibt SERVERSEITIG immer vollständig (audit-logs.json wird
    // unverändert geschrieben). Lediglich beim Lesen filtern wir Einträge
    // versteckter Konten für alle Nicht-OWNER aus.
    logs = filterAuditLogsForViewer(logs, viewer, hiddenIds)

    if (filters?.userId) {
      // Wenn ein Nicht-OWNER nach einer hidden ID filtert, geben wir
      // bewusst null zurück, statt einen 403-artigen Hinweis.
      if (!isOwnerViewer(viewer) && hiddenIds.has(filters.userId)) {
        logs = []
      } else {
        logs = logs.filter((l) => l.userId === filters.userId)
      }
    }
    if (filters?.action) logs = logs.filter((l) => l.action === filters.action)
    if (filters?.entityType) logs = logs.filter((l) => l.entityType === filters.entityType)
    if (filters?.dateFrom) {
      const from = new Date(filters.dateFrom).getTime()
      logs = logs.filter((l) => new Date(l.createdAt).getTime() >= from)
    }
    if (filters?.dateTo) {
      const to = new Date(filters.dateTo).getTime()
      logs = logs.filter((l) => new Date(l.createdAt).getTime() <= to)
    }

    logs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    const total = logs.length
    const slice = logs.slice(skip, skip + pageSize)

    const withUsers = await Promise.all(
      slice.map(async (log) => ({
        ...log,
        createdAt: new Date(log.createdAt),
        // Owner sieht alle Actors, Nicht-Owner sehen hidden user als null.
        user: await repoJoinUserBrief(log.userId, viewer.role),
      })),
    )

    return {
      success: true,
      data: { logs: withUsers, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    }
  } catch (error) {
    logServerError('getAuditLogs error', error)
    return { success: false, error: 'Aktivitätsprotokolle konnten nicht geladen werden' }
  }
}
