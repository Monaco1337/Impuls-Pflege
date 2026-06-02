'use client'

/**
 * High-End-Editor für ein einzelnes Website-Foto:
 *  - klickbare Kachel mit Live-Vorschau (Fokuspunkt sichtbar als feiner Ring)
 *  - Modal zum Hochladen, Zentrieren & Speichern
 *  - Drag-Punkt direkt im Foto verschiebt das Motiv
 *  - drei realistische Vorschauen (Hero Desktop 16:9, Hero Mobil 4:5, Karte 4:3)
 *
 * Datenmodell: { src: string, focusX: number, focusY: number } pro Slot.
 * Wird vom Parent als `entry` gehalten und über `onSave` zurückgespielt.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Check, ImagePlus, Loader2, Move, RotateCcw, Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SiteImageEntry } from '@/lib/content/site-image-slots'
import { focusToObjectPosition } from '@/lib/content/site-image-slots'

type CmsImageEditorProps = {
  /** Stabiler Schlüssel des Slots – wird beim Upload mitgeschickt, damit
   *  der Server das Bild eindeutig diesem Slot zuordnen und unter
   *  `/api/site-image/<key>` ausliefern kann. */
  slotKey: string
  /** UI-Beschriftung (z. B. „Start · Hero Desktop"). */
  label: string
  /** Aktueller persistierter Eintrag. */
  entry: SiteImageEntry
  /** Default-Quelle, falls Eintrag leer. */
  defaultSrc: string
  /** Wird mit dem neuen Eintrag aufgerufen. */
  onSave: (next: SiteImageEntry) => void | Promise<void>
  disabled?: boolean
}

const PREVIEW_FRAMES: ReadonlyArray<{
  key: string
  label: string
  hint: string
  className: string
}> = [
  {
    key: 'hero',
    label: 'Hero · Desktop',
    hint: 'Großes Querformat',
    className: 'aspect-[16/9]',
  },
  {
    key: 'mobile',
    label: 'Hero · Mobil',
    hint: 'Hochformat',
    className: 'aspect-[4/5]',
  },
  {
    key: 'card',
    label: 'Bildkarte',
    hint: 'Standard 4:3',
    className: 'aspect-[4/3]',
  },
]

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

export function CmsImageEditor({
  slotKey,
  label,
  entry,
  defaultSrc,
  onSave,
  disabled,
}: CmsImageEditorProps) {
  const [open, setOpen] = useState(false)
  const [draftSrc, setDraftSrc] = useState(entry.src || defaultSrc)
  const [draftX, setDraftX] = useState(entry.focusX)
  const [draftY, setDraftY] = useState(entry.focusY)
  const [busy, setBusy] = useState(false)
  const [savedFlash, setSavedFlash] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setDraftSrc(entry.src || defaultSrc)
    setDraftX(entry.focusX)
    setDraftY(entry.focusY)
  }, [entry.src, entry.focusX, entry.focusY, defaultSrc])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    // Body-Scroll sperren, solange das Modal offen ist – verhindert dass
    // der Hintergrund hinter dem Overlay weiterscrollt und stellt sicher,
    // dass die viewport-relative Höhe des Modals stabil bleibt.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  const objPos = useMemo(
    () => focusToObjectPosition(entry.focusX, entry.focusY),
    [entry.focusX, entry.focusY],
  )
  const draftObjPos = useMemo(
    () => focusToObjectPosition(draftX, draftY),
    [draftX, draftY],
  )

  const isDirty =
    draftSrc !== (entry.src || defaultSrc) ||
    draftX !== entry.focusX ||
    draftY !== entry.focusY

  const upload = useCallback(
    async (file: File | undefined) => {
      if (!file || !file.type.startsWith('image/')) return
      setBusy(true)
      setError(null)
      try {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('slotKey', slotKey)
        const res = await fetch('/api/admin/site-image', { method: 'POST', body: fd })
        const json = (await res.json().catch(() => ({}))) as {
          error?: string
          data?: { publicPath?: string }
        }
        if (!res.ok) throw new Error(json.error || 'Upload fehlgeschlagen')
        const path = json.data?.publicPath
        if (!path) throw new Error('Keine URL erhalten')
        setDraftSrc(path)
        // Bei einem frischen Bild Fokus zurücksetzen, damit der Kunde
        // bewusst zentriert (statt evtl. unpassende Altwerte zu erben).
        setDraftX(50)
        setDraftY(50)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Upload fehlgeschlagen')
      } finally {
        setBusy(false)
      }
    },
    [slotKey],
  )

  const handlePoint = useCallback(
    (clientX: number, clientY: number) => {
      const stage = stageRef.current
      if (!stage) return
      const rect = stage.getBoundingClientRect()
      const x = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100)
      const y = clamp(((clientY - rect.top) / rect.height) * 100, 0, 100)
      setDraftX(Math.round(x * 10) / 10)
      setDraftY(Math.round(y * 10) / 10)
    },
    [],
  )

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (busy) return
      e.preventDefault()
      ;(e.target as Element).setPointerCapture?.(e.pointerId)
      setDragging(true)
      handlePoint(e.clientX, e.clientY)
    },
    [busy, handlePoint],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return
      handlePoint(e.clientX, e.clientY)
    },
    [dragging, handlePoint],
  )

  const onPointerUp = useCallback(() => {
    setDragging(false)
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      void upload(e.dataTransfer.files[0])
    },
    [upload],
  )

  const handleSave = useCallback(async () => {
    setBusy(true)
    setError(null)
    try {
      await onSave({ src: draftSrc, focusX: draftX, focusY: draftY })
      setSavedFlash(true)
      setTimeout(() => setSavedFlash(false), 1400)
      setOpen(false)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Speichern fehlgeschlagen')
    } finally {
      setBusy(false)
    }
  }, [draftSrc, draftX, draftY, onSave])

  const resetFocus = useCallback(() => {
    setDraftX(50)
    setDraftY(50)
  }, [])

  const previewSrc = draftSrc

  return (
    <div className="space-y-1">
      <p className="truncate text-center text-[11px] font-medium text-warm-500">{label}</p>

      {/* Karte: zeigt gespeicherten Stand mit gespeichertem Fokus */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(true)}
        className={cn(
          'group relative block w-full overflow-hidden rounded-xl border border-warm-200/80 bg-warm-50 shadow-sm outline-none transition',
          'hover:border-primary-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
          disabled && 'cursor-not-allowed opacity-60',
        )}
        aria-label={`${label} bearbeiten`}
      >
        <div className="relative aspect-[4/3] w-full bg-warm-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={entry.src || defaultSrc}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: objPos }}
          />
          {/* Hover-Overlay */}
          <div
            className={cn(
              'absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-gradient-to-t from-black/55 via-black/20 to-transparent opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100',
              savedFlash && 'opacity-100',
            )}
          >
            {savedFlash ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success-500/95 px-3 py-1 text-[11px] font-medium text-white shadow-sm">
                <Check className="h-3.5 w-3.5" />
                Live
              </span>
            ) : (
              <>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-warm-800 shadow-sm">
                  <Move className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-medium text-white drop-shadow">
                  Foto bearbeiten
                </span>
              </>
            )}
          </div>
          {/* Markiert die aktuelle Fokus-Position dezent */}
          {(entry.focusX !== 50 || entry.focusY !== 50) && (
            <span
              className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow-[0_0_0_2px_rgba(15,23,42,0.35)] opacity-0 transition group-hover:opacity-100"
              style={{ left: `${entry.focusX}%`, top: `${entry.focusY}%` }}
              aria-hidden
            />
          )}
        </div>
      </button>

      {/* ── Modal-Editor ── */}
      {open && (
        <div
          className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/55 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${label} bearbeiten`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          {/* Scroll-Container: zentriert horizontal, oben startend mit
              gleichmäßigem vertikalen Abstand. Das Modal selbst kann
              höher sein als der Viewport – dann scrollt der äußere
              Container, nicht das Body-Element. */}
          <div
            className="flex min-h-full items-start justify-center px-4 py-6 sm:py-10"
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false)
            }}
          >
            <div
              className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/5 my-auto max-h-[calc(100vh-3rem)] sm:max-h-[calc(100vh-5rem)]"
              onClick={(e) => e.stopPropagation()}
            >
            {/* Header (sticky innerhalb des Modals) */}
            <div className="flex shrink-0 items-center justify-between border-b border-warm-100 bg-white/95 px-6 py-4 backdrop-blur">
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-warm-400">
                  Foto bearbeiten
                </p>
                <h3 className="mt-0.5 truncate text-base font-semibold text-warm-900">
                  {label}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-warm-500 transition hover:bg-warm-50 hover:text-warm-800"
                aria-label="Schließen"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body – scrollt intern, falls Inhalte größer als Viewport */}
            <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto p-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              {/* ── Stage: Foto + Drag-Punkt ── */}
              <div className="space-y-3">
                <div
                  ref={stageRef}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDrop}
                  className={cn(
                    'relative w-full select-none overflow-hidden rounded-xl bg-warm-100',
                    'aspect-[16/10] cursor-crosshair touch-none',
                    busy && 'pointer-events-none opacity-70',
                  )}
                >
                  {previewSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewSrc}
                      alt=""
                      className="pointer-events-none h-full w-full object-contain"
                      draggable={false}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-warm-400">
                      Kein Bild
                    </div>
                  )}

                  {/* Fadenkreuz */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/0"
                    style={{
                      top: `${draftY}%`,
                      background:
                        'linear-gradient(to right, transparent, rgba(255,255,255,0.55) 20%, rgba(255,255,255,0.55) 80%, transparent)',
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 w-px"
                    style={{
                      left: `${draftX}%`,
                      background:
                        'linear-gradient(to bottom, transparent, rgba(255,255,255,0.55) 20%, rgba(255,255,255,0.55) 80%, transparent)',
                    }}
                  />

                  {/* Fokus-Punkt */}
                  <div
                    className={cn(
                      'pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary-500 shadow-[0_0_0_2px_rgba(15,23,42,0.35),0_4px_14px_rgba(15,23,42,0.35)] transition-transform',
                      dragging && 'scale-110',
                    )}
                    style={{ left: `${draftX}%`, top: `${draftY}%` }}
                    aria-hidden
                  />

                  {/* Hilfslabel */}
                  <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-slate-900/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                    <Move className="h-3 w-3" />
                    Klicken oder ziehen
                  </div>
                  {busy && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/55 backdrop-blur-sm">
                      <Loader2 className="h-7 w-7 animate-spin text-primary-600" />
                    </div>
                  )}
                </div>

                {/* Aktionen unter der Bühne */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={busy}
                    className="inline-flex items-center gap-1.5 rounded-full border border-warm-200 bg-white px-3.5 py-1.5 text-xs font-medium text-warm-800 transition hover:border-warm-300 hover:bg-warm-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    Neues Foto wählen
                  </button>
                  <button
                    type="button"
                    onClick={resetFocus}
                    disabled={busy || (draftX === 50 && draftY === 50)}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-warm-500 transition hover:text-warm-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Mittig zentrieren
                  </button>
                  <span className="ml-auto font-mono text-[11px] tabular-nums text-warm-400">
                    {Math.round(draftX)}% · {Math.round(draftY)}%
                  </span>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                    className="sr-only"
                    onChange={(e) => {
                      void upload(e.target.files?.[0])
                      e.target.value = ''
                    }}
                  />
                </div>

                <p className="text-xs leading-relaxed text-warm-500">
                  Tipp: Ziehe den Punkt auf die wichtigste Stelle des Fotos – z. B. das Gesicht.
                  Die Vorschau rechts zeigt sofort, wie das Bild auf der Webseite zugeschnitten wird.
                </p>
              </div>

              {/* ── Live-Vorschauen ── */}
              <div className="space-y-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-warm-400">
                  Live-Vorschau auf der Webseite
                </p>
                <div className="space-y-3">
                  {PREVIEW_FRAMES.map((frame) => (
                    <div
                      key={frame.key}
                      className="overflow-hidden rounded-lg border border-warm-100 bg-warm-50 shadow-sm"
                    >
                      <div className="flex items-center justify-between border-b border-warm-100/70 bg-white px-3 py-1.5">
                        <span className="text-[11px] font-medium text-warm-700">
                          {frame.label}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-warm-400">
                          {frame.hint}
                        </span>
                      </div>
                      <div className={cn('relative w-full bg-warm-100', frame.className)}>
                        {previewSrc && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={previewSrc}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                            style={{ objectPosition: draftObjPos }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer (sticky am unteren Modal-Rand) */}
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-warm-100 bg-warm-50/80 px-6 py-4 backdrop-blur">
              <div className="min-h-[1.25rem] text-xs">
                {error ? (
                  <span className="font-medium text-error-600" role="alert">
                    {error}
                  </span>
                ) : isDirty ? (
                  <span className="text-warm-500">
                    Änderungen werden erst beim Speichern aktiv.
                  </span>
                ) : (
                  <span className="text-warm-400">Keine Änderungen.</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={busy}
                  className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-warm-600 transition hover:bg-warm-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Abbrechen
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={busy || !isDirty}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {busy ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  Übernehmen & live schalten
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/** Re-exportierter Drop-Indicator für Empty-States in der Übersicht. */
export const CmsImageEditorEmpty = ImagePlus
