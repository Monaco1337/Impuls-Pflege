import { Metadata } from 'next'
import { Bell, RefreshCw, ShieldCheck } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Benachrichtigungen',
}

export const dynamic = 'force-dynamic'

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-warm-900 sm:text-2xl">
          Benachrichtigungen
        </h2>
        <p className="mt-1.5 text-sm text-warm-500">
          Wie der Eingang neuer Anfragen und Bewerbungen im System sichtbar ist
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary-50/80 via-white to-rose-50/40 shadow-sm ring-1 ring-primary-100/60">
          <CardHeader className="pb-2">
            <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-primary-600 shadow-sm ring-1 ring-primary-100/50">
              <Bell className="h-5 w-5" strokeWidth={1.6} />
            </div>
            <CardTitle className="text-base">Eingang in der Leiste</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-sm leading-relaxed text-warm-600">
            <p>
              Das Glocken-Symbol oben zeigt, wie viele{' '}
              <strong className="font-medium text-warm-800">neue Anfragen</strong> und{' '}
              <strong className="font-medium text-warm-800">neue Bewerbungen</strong> für Ihre
              Rolle anstehen. Klicken Sie den Eintrag – der Stand wird dabei automatisch
              mitgeteilt, damit der Zähler ruhig wird.
            </p>
          </CardContent>
        </Card>

        <Card className="border-warm-100/90 shadow-sm ring-1 ring-warm-100/50">
          <CardHeader className="pb-2">
            <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-warm-100 text-warm-600">
              <RefreshCw className="h-5 w-5" strokeWidth={1.6} />
            </div>
            <CardTitle className="text-base">Aktualisierung</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-sm leading-relaxed text-warm-600">
            <p>
              Während die Seite offen ist, prüft das System regelmäßig im Hintergrund. Wenn Sie den
              Tab wechseln und zurückkommen, wird sofort erneut geladen. So bleiben die Zahlen
              stimmig, ohne ständig die Seite neu zu öffnen.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-dashed border-warm-200/80 bg-warm-50/40">
        <CardContent className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-warm-500">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="text-sm text-warm-600">
            Ihre <strong className="font-medium text-warm-800">persönlichen</strong> oder{' '}
            <strong className="font-medium text-warm-800">Team-Benachrichtigungen</strong> per
            E-Mail hängen von Ihrer IT- und Mail-Konfiguration ab – hier im Panel steuern wir
            ausschließlich die sichtbaren <strong className="font-medium text-warm-800">Eingänge</strong> im
            Tagesablauf.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
