'use client'

import { useCallback, useRef, useState } from 'react'
import { ImagePlus, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type CmsImageDropzoneProps = {
  src: string
  /**
   * Optionaler, semantisch stabiler Slot-Schlüssel. Wenn gesetzt, wird
   * derselbe Slot beim nächsten Upload überschrieben (statt einen neuen
   * Blob anzulegen). Für dynamische Stellen (z. B. Team-Karten) kann der
   * Slot weggelassen werden – der Server vergibt dann automatisch eine
   * kollisionsfreie ID.
   */
  slotKey?: string
  className?: string
  frameClassName?: string
  aspectClassName?: string
  onPathChange: (publicPath: string) => void | Promise<void>
  disabled?: boolean
}

export function CmsImageDropzone({
  src,
  slotKey,
  className,
  frameClassName,
  aspectClassName = 'aspect-[4/3]',
  onPathChange,
  disabled,
}: CmsImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [drag, setDrag] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const upload = useCallback(
    async (file: File | undefined) => {
      if (!file || !file.type.startsWith('image/') || disabled || busy) return
      setBusy(true)
      setErr(null)
      try {
        const fd = new FormData()
        fd.append('file', file)
        if (slotKey) fd.append('slotKey', slotKey)
        const res = await fetch('/api/admin/site-image', { method: 'POST', body: fd })
        const json = (await res.json().catch(() => ({}))) as { error?: string; data?: { publicPath?: string } }
        if (!res.ok) throw new Error(json.error || 'Upload fehlgeschlagen')
        const path = json.data?.publicPath
        if (!path) throw new Error('Keine URL')
        await onPathChange(path)
      } catch (e) {
        setErr(e instanceof Error ? e.message : 'Fehler')
      } finally {
        setBusy(false)
      }
    },
    [disabled, busy, onPathChange, slotKey],
  )

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDrag(false)
      void upload(e.dataTransfer.files[0])
    },
    [upload],
  )

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'group relative overflow-hidden rounded-xl border border-warm-200/80 bg-warm-50 shadow-sm outline-none transition',
          drag && 'ring-2 ring-primary-400 ring-offset-2',
          frameClassName,
        )}
        role="button"
        tabIndex={0}
        aria-busy={busy}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if (!busy && !disabled) inputRef.current?.click()
          }
        }}
        onClick={() => !busy && !disabled && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDrag(true)
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
      >
        <div className={cn('relative w-full bg-warm-100', aspectClassName)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className="h-full w-full object-cover" />
          {!disabled && (
            <div
              className={cn(
                'absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/45 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100',
                busy && 'opacity-100',
              )}
            >
              {busy ? (
                <Loader2 className="h-8 w-8 animate-spin text-white" aria-hidden />
              ) : (
                <ImagePlus className="h-8 w-8 text-white" aria-hidden />
              )}
            </div>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          className="sr-only"
          tabIndex={-1}
          disabled={disabled || busy}
          onChange={(e) => {
            void upload(e.target.files?.[0])
            e.target.value = ''
          }}
        />
      </div>
      {err && (
        <p className="mt-1 text-center text-[11px] text-error-600" role="alert">
          {err}
        </p>
      )}
    </div>
  )
}
