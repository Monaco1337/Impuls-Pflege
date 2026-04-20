import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/session'
import { AdminShell } from '@/components/admin/admin-shell'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <AdminShell
      user={{
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      }}
    >
      {children}
    </AdminShell>
  )
}
