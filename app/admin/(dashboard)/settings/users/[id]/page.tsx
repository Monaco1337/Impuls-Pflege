import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Mail,
  Shield,
  CalendarDays,
  Clock,
  Activity,
  KeyRound,
} from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/actions/users'
import { getRoleLabel } from '@/lib/rbac/permissions'
import { UserForm } from '@/components/admin/user-form'
import { requireFullSettingsAdmin } from '@/lib/auth/require-full-settings-admin'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const result = await getUser(id)
  const user = result.data as any
  return {
    title: user
      ? `${user.firstName} ${user.lastName} – Benutzer`
      : 'Benutzer',
  }
}

export const dynamic = 'force-dynamic'

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-warm-100">
        <Icon className="h-4 w-4 text-warm-500" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-warm-500">{label}</p>
        <div className="mt-0.5 text-sm text-warm-800">{children}</div>
      </div>
    </div>
  )
}

export default async function SettingsUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireFullSettingsAdmin()
  const { id } = await params
  const result = await getUser(id)

  if (!result.success || !result.data) {
    notFound()
  }

  const user = result.data as any

  const roleBadgeVariant =
    user.role === 'SUPER_ADMIN' || user.role === 'ADMIN'
      ? 'primary'
      : user.role === 'RECRUITING'
        ? 'warning'
        : 'default'

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/settings/users"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-warm-500 transition-colors hover:text-warm-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zu Benutzer & Rollen
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              src={user.avatar}
              name={`${user.firstName} ${user.lastName}`}
              size="lg"
            />
            <div>
              <h2 className="text-2xl font-bold text-warm-900">
                {user.firstName} {user.lastName}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant={roleBadgeVariant as any}>
                  {getRoleLabel(user.role)}
                </Badge>
                <Badge variant={user.active ? 'success' : 'error'}>
                  {user.active ? 'Aktiv' : 'Inaktiv'}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Benutzer bearbeiten</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <UserForm user={user} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informationen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-0 divide-y divide-warm-100 pt-0">
              <InfoRow icon={KeyRound} label="Benutzername (Anmeldung)">
                <span className="font-mono text-sm">{user.username ?? '—'}</span>
              </InfoRow>
              <InfoRow icon={Mail} label="E-Mail">
                <a
                  href={`mailto:${user.email}`}
                  className="text-primary-600 hover:text-primary-700"
                >
                  {user.email}
                </a>
              </InfoRow>
              <InfoRow icon={Shield} label="Rolle">
                {getRoleLabel(user.role)}
              </InfoRow>
              <InfoRow icon={Clock} label="Letzte Anmeldung">
                {user.lastLoginAt ? (
                  formatDateTime(user.lastLoginAt)
                ) : (
                  <span className="text-warm-400">Noch nie angemeldet</span>
                )}
              </InfoRow>
              <InfoRow icon={CalendarDays} label="Erstellt am">
                {formatDateTime(user.createdAt)}
              </InfoRow>
              <InfoRow icon={CalendarDays} label="Zuletzt aktualisiert">
                {formatDateTime(user.updatedAt)}
              </InfoRow>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-5">
              <Link href={`/admin/settings/activity?userId=${user.id}`}>
                <Button
                  variant="outline"
                  className="w-full"
                  icon={<Activity className="h-4 w-4" />}
                >
                  Einträge im Protokoll anzeigen
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
