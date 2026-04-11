'use client'

import { useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-50">
      <Container size="sm" className="text-center py-20">
        <div className="w-16 h-16 rounded-full bg-error-50 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-error-500" />
        </div>
        <h1 className="text-2xl font-semibold text-warm-900 mb-3">
          Ein Fehler ist aufgetreten
        </h1>
        <p className="text-warm-600 mb-8 max-w-md mx-auto">
          Entschuldigung, es ist ein unerwarteter Fehler aufgetreten.
          Bitte versuchen Sie es erneut oder kontaktieren Sie uns.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset}>Erneut versuchen</Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Zur Startseite
          </Button>
        </div>
      </Container>
    </div>
  )
}
