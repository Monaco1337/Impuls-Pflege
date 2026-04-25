import { Metadata } from 'next'
import { Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { getUsers } from '@/lib/actions/users'
import { getCurrentUser } from '@/lib/auth/session'
import { UserList } from '@/components/admin/user-list'

export const metadata: Metadata = {
  title: 'Benutzer & Rollen',
}

export const dynamic = 'force-dynamic'

export default async function SettingsUsersPage() {
  const [result, currentUser] = await Promise.all([
    getUsers(),
    getCurrentUser(),
  ])

  const users = (result.data ?? []) as any[]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-warm-900 sm:text-2xl">
          Benutzer & Rollen
        </h2>
        <p className="mt-1.5 text-sm text-warm-500">
          Teamkonten verwalten und Berechtigungen zuweisen
        </p>
      </div>

      {users.length === 0 ? (
        <Card>
          <CardContent className="py-0">
            <EmptyState
              icon={<Users className="h-6 w-6" />}
              title="Keine Benutzer vorhanden"
              description="Es wurden noch keine Benutzer angelegt."
            />
          </CardContent>
        </Card>
      ) : (
        <UserList users={users} currentUserId={currentUser?.id ?? null} />
      )}
    </div>
  )
}
