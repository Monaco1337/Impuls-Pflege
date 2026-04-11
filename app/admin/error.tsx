'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function AdminError({
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
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 rounded-full bg-error-50 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="w-7 h-7 text-error-500" />
        </div>
        <h2 className="text-xl font-semibold text-warm-900 mb-2">
          Fehler aufgetreten
        </h2>
        <p className="text-warm-600 mb-6 text-sm">
          {error.message === 'Forbidden' || error.message === 'Keine Berechtigung für diese Aktion'
            ? 'Sie haben keine Berechtigung für diese Aktion.'
            : 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'}
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset} size="sm">
            Erneut versuchen
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = '/admin/dashboard'}
          >
            Zum Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
