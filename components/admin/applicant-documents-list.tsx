'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  FileText,
  FileSpreadsheet,
  FileImage,
  File as FileIcon,
  Download,
  X,
  Loader2,
  ExternalLink,
} from 'lucide-react'
import { formatDate, formatFileSize, cn } from '@/lib/utils'

type Doc = {
  id: string
  fileName: string
  fileType: string
  fileSize: number
  uploadedAt: string | Date
}

type Props = {
  documents: Doc[]
}

function pickIcon(fileType: string) {
  if (!fileType) return FileIcon
  if (fileType.includes('pdf')) return FileText
  if (fileType.includes('spreadsheet') || fileType.includes('excel')) return FileSpreadsheet
  if (fileType.startsWith('image/')) return FileImage
  return FileIcon
}

function isPreviewable(fileType: string): boolean {
  if (!fileType) return false
  if (fileType.startsWith('image/')) return true
  if (fileType === 'application/pdf' || fileType.includes('pdf')) return true
  return false
}

export function ApplicantDocumentsList({ documents }: Props) {
  const [active, setActive] = useState<Doc | null>(null)

  if (!documents || documents.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-warm-100">
          <FileText className="h-4 w-4 text-warm-400" />
        </div>
        <p className="text-sm text-warm-500">Keine Dokumente vorhanden</p>
      </div>
    )
  }

  return (
    <>
      <div className="divide-y divide-warm-100">
        {documents.map((doc) => {
          const Icon = pickIcon(doc.fileType)
          const previewable = isPreviewable(doc.fileType)
          return (
            <div
              key={doc.id}
              className="flex items-center justify-between gap-3 py-3"
            >
              <button
                type="button"
                onClick={() => previewable && setActive(doc)}
                className={cn(
                  'group flex min-w-0 flex-1 items-center gap-3 rounded-lg p-2 -m-2 text-left transition-colors',
                  previewable
                    ? 'cursor-pointer hover:bg-warm-50'
                    : 'cursor-default',
                )}
                title={previewable ? 'Vorschau öffnen' : 'Keine Vorschau verfügbar'}
                disabled={!previewable}
              >
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors',
                    previewable
                      ? 'bg-warm-100 group-hover:bg-primary-50 group-hover:text-primary-600'
                      : 'bg-warm-100',
                  )}
                >
                  <Icon className="h-4 w-4 text-warm-500 group-hover:text-primary-600" />
                </div>
                <div className="min-w-0">
                  <p
                    className={cn(
                      'truncate text-sm font-medium',
                      previewable
                        ? 'text-warm-800 group-hover:text-primary-700'
                        : 'text-warm-800',
                    )}
                  >
                    {doc.fileName}
                  </p>
                  <p className="text-xs text-warm-400">
                    {formatFileSize(doc.fileSize)} · {formatDate(doc.uploadedAt)}
                    {previewable && (
                      <span className="ml-1.5 hidden text-primary-500 group-hover:inline">
                        · Vorschau anzeigen
                      </span>
                    )}
                  </p>
                </div>
              </button>
              <a
                href={`/api/files/${doc.id}`}
                download
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-warm-400 transition-colors hover:bg-warm-100 hover:text-warm-600"
                title="Herunterladen"
                aria-label={`${doc.fileName} herunterladen`}
              >
                <Download className="h-4 w-4" />
              </a>
            </div>
          )
        })}
      </div>

      <DocumentPreviewModal
        doc={active}
        onClose={() => setActive(null)}
      />
    </>
  )
}

function DocumentPreviewModal({
  doc,
  onClose,
}: {
  doc: Doc | null
  onClose: () => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!doc) return
    setLoading(true)
    document.addEventListener('keydown', handleEsc)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = prev
    }
  }, [doc, handleEsc])

  if (!doc) return null

  const inlineUrl = `/api/files/${doc.id}?inline=1`
  const downloadUrl = `/api/files/${doc.id}`
  const isImage = doc.fileType.startsWith('image/')
  const isPdf = doc.fileType === 'application/pdf' || doc.fileType.includes('pdf')

  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-warm-900/70 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Vorschau: ${doc.fileName}`}
    >
      <div className="relative flex h-full max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-warm-200/40 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-warm-200 px-5 py-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              {isImage ? (
                <FileImage className="h-4 w-4" />
              ) : isPdf ? (
                <FileText className="h-4 w-4" />
              ) : (
                <FileIcon className="h-4 w-4" />
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-warm-900">
                {doc.fileName}
              </p>
              <p className="truncate text-xs text-warm-500">
                {formatFileSize(doc.fileSize)} · {formatDate(doc.uploadedAt)}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <a
              href={inlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 items-center gap-1.5 rounded-lg border border-warm-200 px-3 text-xs font-medium text-warm-600 transition-colors hover:border-warm-300 hover:bg-warm-50 hover:text-warm-800 sm:inline-flex"
              title="In neuem Tab öffnen"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Neuer Tab
            </a>
            <a
              href={downloadUrl}
              download={doc.fileName}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary-600 px-3 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
              title="Herunterladen"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
            <button
              type="button"
              onClick={onClose}
              className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-lg text-warm-500 transition-colors hover:bg-warm-100 hover:text-warm-800"
              aria-label="Schließen"
              title="Schließen (Esc)"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="relative flex-1 overflow-auto bg-warm-100">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm text-warm-600 shadow-sm ring-1 ring-warm-200/60">
                <Loader2 className="h-4 w-4 animate-spin text-primary-500" />
                Vorschau wird geladen…
              </div>
            </div>
          )}

          {isImage && (
            <div className="flex h-full w-full items-center justify-center p-4 sm:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={inlineUrl}
                alt={doc.fileName}
                className="max-h-full max-w-full select-none rounded-lg object-contain shadow-md"
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                draggable={false}
              />
            </div>
          )}

          {isPdf && (
            <object
              data={inlineUrl}
              type="application/pdf"
              className="h-full w-full bg-white"
              onLoad={() => setLoading(false)}
            >
              <iframe
                src={inlineUrl}
                title={doc.fileName}
                className="h-full w-full bg-white"
                onLoad={() => setLoading(false)}
              />
              <div className="flex h-full flex-col items-center justify-center gap-3 p-10 text-center">
                <p className="text-sm text-warm-700">
                  Ihr Browser kann PDFs nicht inline anzeigen.
                </p>
                <div className="flex gap-2">
                  <a
                    href={inlineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-warm-200 px-4 py-2 text-xs font-semibold text-warm-700 hover:bg-warm-50"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    In neuem Tab öffnen
                  </a>
                  <a
                    href={downloadUrl}
                    download={doc.fileName}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white hover:bg-primary-700"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </a>
                </div>
              </div>
            </object>
          )}

          {!isImage && !isPdf && (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warm-200 text-warm-500">
                <FileIcon className="h-5 w-5" />
              </div>
              <p className="text-sm text-warm-700">
                Für diesen Dateityp ist keine Vorschau möglich.
              </p>
              <a
                href={downloadUrl}
                download={doc.fileName}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
              >
                <Download className="h-3.5 w-3.5" />
                Datei herunterladen
              </a>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
