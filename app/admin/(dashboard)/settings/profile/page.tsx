import { Metadata } from 'next'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { PasswordForm } from '@/components/admin/password-form'
import { getCurrentUser } from '@/lib/auth/session'
import { Mail, User } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Profil & Sicherheit',
}

export const dynamic = 'force-dynamic'

export default async function SettingsProfilePage() {
  const user = await getCurrentUser()
  if (!user) return null

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-warm-900 sm:text-2xl">
          Profil & Sicherheit
        </h2>
        <p className="mt-1.5 text-sm text-warm-500">
          Ihre Zugangsdaten und Sicherheitseinstellungen
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-warm-100/90 shadow-sm ring-1 ring-warm-100/50">
          <CardHeader>
            <CardTitle className="text-base">Angemeldet als</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 divide-y divide-warm-100/80">
            <div className="flex items-start gap-3 py-3 first:pt-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <User className="h-4 w-4" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-warm-400">Name</p>
                <p className="text-sm font-medium text-warm-900">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 py-3 last:pb-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-warm-100 text-warm-600">
                <Mail className="h-4 w-4" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-warm-400">E-Mail</p>
                <a
                  className="text-sm font-medium text-primary-600 hover:underline"
                  href={`mailto:${user.email}`}
                >
                  {user.email}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warm-100/90 shadow-sm ring-1 ring-warm-100/50">
          <CardHeader>
            <CardTitle className="text-base">Passwort ändern</CardTitle>
          </CardHeader>
          <CardContent>
            <PasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
