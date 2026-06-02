'use client'

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { updateContentBlock } from '@/lib/actions/content'
import {
  SITE_IMAGE_SLOTS,
  mergeSiteImageEntries,
  type SiteImageEntry,
} from '@/lib/content/site-image-slots'
import { CmsImageEditor } from '@/components/admin/cms-image-editor'

interface Block {
  id: string
  key: string
  title: string | null
  content: Record<string, unknown>
  sortOrder: number | null
}

export function SiteImagesEditor({ block }: { block: Block }) {
  const [entries, setEntries] = useState<Record<string, SiteImageEntry>>(() =>
    mergeSiteImageEntries(block.content),
  )
  // Ref für synchronen Zugriff auf den aktuellsten Stand – verhindert
  // Stale-Closure-Probleme in `onSlotSave`, ohne `entries` als Dep
  // einbauen zu müssen.
  const entriesRef = useRef(entries)
  useEffect(() => {
    entriesRef.current = entries
  }, [entries])
  const [pending, startTransition] = useTransition()
  const [savedFlash, setSavedFlash] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const persist = useCallback(
    (next: Record<string, SiteImageEntry>) => {
      setError(null)
      // Persistierte Form: pro Slot ein Objekt { src, focusX, focusY }.
      // mergeSiteImageEntries beim Lesen ist rückwärtskompatibel zur alten
      // String-Form, sodass Bestandsdaten weiterlaufen.
      const payload: Record<string, SiteImageEntry> = { ...next }
      startTransition(async () => {
        const result = await updateContentBlock('site-images', {
          key: 'site-images',
          title: block.title ?? 'Website-Fotos',
          content: payload,
          sortOrder: block.sortOrder ?? 3,
        })
        if (result.success) {
          setSavedFlash(true)
          setTimeout(() => setSavedFlash(false), 1600)
        } else {
          setError(result.error ?? 'Speichern fehlgeschlagen')
        }
      })
    },
    [block.sortOrder, block.title],
  )

  const onSlotSave = useCallback(
    async (slotKey: string, entry: SiteImageEntry) => {
      // WICHTIG: startTransition darf NICHT aus einem setState-Updater
      // heraus aufgerufen werden – das gilt in React 19 als „Aufruf
      // während des Renders". Daher: nächste Map einmal berechnen,
      // dann State setzen und separat persistieren.
      const next = { ...entriesRef.current, [slotKey]: entry }
      entriesRef.current = next
      setEntries(next)
      persist(next)
    },
    [persist],
  )

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SITE_IMAGE_SLOTS.map((slot) => {
          const entry = entries[slot.key] ?? {
            src: slot.defaultSrc,
            focusX: 50,
            focusY: 50,
          }
          return (
            <CmsImageEditor
              key={slot.key}
              slotKey={slot.key}
              label={slot.label}
              entry={entry}
              defaultSrc={slot.defaultSrc}
              disabled={pending}
              onSave={(next) => onSlotSave(slot.key, next)}
            />
          )
        })}
      </div>

      <div className="flex min-h-[1.25rem] flex-wrap items-center justify-center gap-2 text-xs">
        {pending && (
          <span className="inline-flex items-center gap-1.5 text-warm-500">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Speichern…
          </span>
        )}
        {savedFlash && !pending && (
          <span className="inline-flex items-center gap-1 font-medium text-success-600">
            <Check className="h-3.5 w-3.5" />
            Live
          </span>
        )}
        {error && (
          <p className="font-medium text-error-600" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
