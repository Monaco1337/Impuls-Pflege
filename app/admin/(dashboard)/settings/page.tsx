import { Metadata } from 'next'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getSettings } from '@/lib/actions/settings'
import { getCurrentUser } from '@/lib/auth/session'
import { SettingsForm } from '@/components/admin/settings-form'
import { PasswordForm } from '@/components/admin/password-form'

export const metadata: Metadata = {
  title: 'Einstellungen',
}

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const [settingsResult, currentUser] = await Promise.all([
    getSettings(),
    getCurrentUser(),
  ])

  const settings = (settingsResult.data ?? {}) as Record<string, unknown>

  const initialValues = {
    org_name: typeof settings.org_name === 'string' ? settings.org_name : '',
    org_address: typeof settings.org_address === 'string' ? settings.org_address : '',
    org_phone: typeof settings.org_phone === 'string' ? settings.org_phone : '',
    org_email: typeof settings.org_email === 'string' ? settings.org_email : '',
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-warm-900">Einstellungen</h2>
        <p className="mt-1 text-sm text-warm-500">
          Organisationsdaten und Kontoeinstellungen verwalten
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Organisationsdaten</CardTitle>
          </CardHeader>
          <CardContent>
            <SettingsForm initialValues={initialValues} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Passwort ändern</CardTitle>
          </CardHeader>
          <CardContent>
            <PasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
