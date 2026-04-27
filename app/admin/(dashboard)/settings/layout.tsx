import { getCurrentUser } from '@/lib/auth/session'
import { SettingsArea } from '@/components/admin/settings-area'

export default async function SettingsGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  if (!user) return null

  return (
    <SettingsArea userId={user.id} userRole={user.role}>
      {children}
    </SettingsArea>
  )
}
