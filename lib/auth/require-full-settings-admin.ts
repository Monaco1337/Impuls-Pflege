import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/session'
import { isFullSettingsAdmin } from '@/lib/rbac/permissions'
import type { RoleName } from '@/lib/types/enums'

/**
 * Server-Guard für interne Admin-Bereiche, die nur SUPER_ADMIN sehen darf.
 * Nicht autorisierte Konten werden auf das eigene Profil umgeleitet,
 * unangemeldete auf den Admin-Login.
 */
export async function requireFullSettingsAdmin() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/admin/login')
  }
  if (!isFullSettingsAdmin({ id: user.id, role: user.role as RoleName })) {
    redirect('/admin/settings/profile')
  }
  return user
}
