import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-50">
      <Container size="sm" className="text-center py-20">
        <p className="text-7xl font-bold text-primary-500 mb-4">404</p>
        <h1 className="text-2xl font-semibold text-warm-900 mb-3">
          Seite nicht gefunden
        </h1>
        <p className="text-warm-600 mb-8 max-w-md mx-auto">
          Die gewünschte Seite existiert nicht oder wurde verschoben.
          Bitte überprüfen Sie die URL oder kehren Sie zur Startseite zurück.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button>Zur Startseite</Button>
          </Link>
          <Link href="/kontakt">
            <Button variant="outline">Kontakt</Button>
          </Link>
        </div>
      </Container>
    </div>
  )
}
