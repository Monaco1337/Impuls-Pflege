import { Metadata } from 'next'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getSettings } from '@/lib/actions/settings'
import { getCurrentUser } from '@/lib/auth/session'
import { hasPermission } from '@/lib/rbac/permissions'
import { SettingsForm } from '@/components/admin/settings-form'
import { Building2 } from 'lucide-react'
import type { RoleName } from '@/lib/types/enums'

export const metadata: Metadata = {
  title: 'System & Organisation',
}

export const dynamic = 'force-dynamic'

export default async function SettingsSystemPage() {
  const [settingsResult, user] = await Promise.all([getSettings(), getCurrentUser()])
  const settings = (settingsResult.data ?? {}) as Record<string, unknown>
  const canEdit = user ? hasPermission(user.role as RoleName, 'settings', 'edit') : false

  const initialValues = {
    org_name: typeof settings.org_name === 'string' ? settings.org_name : '',
    org_address: typeof settings.org_address === 'string' ? settings.org_address : '',
    org_phone: typeof settings.org_phone === 'string' ? settings.org_phone : '',
    org_email: typeof settings.org_email === 'string' ? settings.org_email : '',
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-warm-900 sm:text-2xl">System</h2>
        <p className="mt-1.5 text-sm text-warm-500">
          Öffentliche Organisations- und Kontaktdaten, die in Formularen und E-Mails genutzt werden
          können
        </p>
      </div>

      <Card className="border-warm-100/90 shadow-sm ring-1 ring-warm-100/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              <Building2 className="h-4 w-4" />
            </span>
            Organisation & Ansprechpartner
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!canEdit && (
            <p className="mb-4 rounded-lg border border-amber-100/80 bg-amber-50/50 px-3 py-2 text-sm text-amber-900/90">
              Sie haben nur Lesezugriff. Änderungen an der Organisation nehmen Administrator:innen
              vor.
            </p>
          )}
          <SettingsForm initialValues={initialValues} readOnly={!canEdit} />
        </CardContent>
      </Card>
    </div>
  )
}
