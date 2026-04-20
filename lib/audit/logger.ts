import { prisma } from '@/lib/db'
import { logServerError } from '@/lib/error-handling'

type AuditAction =
  | 'login'
  | 'logout'
  | 'create'
  | 'update'
  | 'delete'
  | 'status_change'
  | 'assign'
  | 'upload'
  | 'download'
  | 'note_added'
  | 'role_change'
  | 'password_change'
  | 'settings_update'

type EntityType =
  | 'user'
  | 'inquiry'
  | 'applicant'
  | 'job_posting'
  | 'content_block'
  | 'document'
  | 'setting'

export async function logAudit(params: {
  userId?: string | null
  action: AuditAction
  entityType: EntityType
  entityId?: string | null
  metadata?: Record<string, unknown>
  ipAddress?: string
}) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: params.userId ?? null,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId ?? null,
        metadata: (params.metadata as any) ?? undefined,
        ipAddress: params.ipAddress ?? null,
      },
    })
  } catch (error) {
    logServerError('Failed to create audit log', error)
  }
}
