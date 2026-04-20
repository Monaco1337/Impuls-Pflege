import { auth } from './config'
import type { RoleName } from '@/lib/types/enums'
import type { SessionUser } from './types'

export async function getSession() {
  return await auth()
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await auth()
  if (!session?.user) return null
  return {
    ...session.user,
    role: session.user.role as RoleName,
  }
}

export async function requireAuth(): Promise<SessionUser> {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')
  return user
}

export async function requireRole(...roles: RoleName[]): Promise<SessionUser> {
  const user = await requireAuth()
  if (!roles.includes(user.role)) throw new Error('Forbidden')
  return user
}
