'use server'

import { prisma } from '@/lib/db'
import { requireAccess } from '@/lib/rbac/check'

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
    await requireAccess('activity', 'view')

    const page = filters?.page ?? 1
    const pageSize = filters?.pageSize ?? 30
    const skip = (page - 1) * pageSize

    const where: Record<string, unknown> = {}

    if (filters?.userId) where.userId = filters.userId
    if (filters?.action) where.action = filters.action
    if (filters?.entityType) where.entityType = filters.entityType
    if (filters?.dateFrom || filters?.dateTo) {
      const createdAt: Record<string, Date> = {}
      if (filters.dateFrom) createdAt.gte = new Date(filters.dateFrom)
      if (filters.dateTo) createdAt.lte = new Date(filters.dateTo)
      where.createdAt = createdAt
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        include: {
          user: { select: { id: true, firstName: true, lastName: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      prisma.auditLog.count({ where }),
    ])

    return {
      success: true,
      data: { logs, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    }
  } catch (error) {
    console.error('getAuditLogs error:', error)
    return { success: false, error: 'Aktivitätsprotokolle konnten nicht geladen werden' }
  }
}
