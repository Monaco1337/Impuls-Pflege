'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function ContentManagementError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('admin/content:', error)
  }, [error])

  return (
    <div className="space-y-4 rounded-xl border border-error-200/80 bg-error-50/40 p-6">
      <h2 className="text-lg font-semibold text-warm-900">Inhaltsverwaltung</h2>
      <p className="text-sm text-warm-700">
        Die Seite konnte nicht geladen werden. Bitte versuchen Sie es erneut.
      </p>
      {process.env.NODE_ENV === 'development' && (
        <pre className="max-h-40 overflow-auto rounded-lg bg-warm-900/5 p-3 text-xs text-warm-800">
          {error.message}
        </pre>
      )}
      <Button type="button" size="sm" onClick={() => reset()}>
        Erneut laden
      </Button>
    </div>
  )
}
