import { RoleName } from '@prisma/client'
import { getCurrentUser } from '@/lib/auth/session'
import { hasPermission, type Resource, type Action } from './permissions'

export async function checkAccess(resource: Resource, action: Action): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user) return false
  return hasPermission(user.role as RoleName, resource, action)
}

export async function requireAccess(resource: Resource, action: Action) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Nicht authentifiziert')
  if (!hasPermission(user.role as RoleName, resource, action)) {
    throw new Error('Keine Berechtigung für diese Aktion')
  }
  return user
}
