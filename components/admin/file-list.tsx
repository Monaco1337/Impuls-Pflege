'use client'

import { useState, useTransition, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createPortal } from 'react-dom'
import {
  FileText,
  Image as ImageIcon,
  File,
  Download,
  Trash2,
  RotateCcw,
  Eye,
  X,
  Loader2,
  ExternalLink,
} from 'lucide-react'
import { formatDate, formatFileSize } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { EmptyState } from '@/components/ui/empty-state'
import { Pagination } from '@/components/ui/pagination'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { deleteFileRecord } from '@/lib/actions/files'

const FILE_TYPE_OPTIONS = [
  { value: '', label: 'Alle Typen' },
  { value: 'application/pdf', label: 'PDF' },
  { value: 'application/msword', label: 'Word (DOC)' },
  {
    value:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    label: 'Word (DOCX)',
  },
  { value: 'image/jpeg', label: 'JPEG' },
  { value: 'image/png', label: 'PNG' },
  { value: 'image/webp', label: 'WebP' },
]

function getFileIcon(fileType: string) {
  if (fileType === 'application/pdf' || fileType.includes('word') || fileType.includes('document')) {
    return <FileText className="h-4 w-4" />
  }
  if (fileType.startsWith('image/')) {
    return <ImageIcon className="h-4 w-4" />
  }
  return <File className="h-4 w-4" />
}

function getFileTypeBadge(fileType: string) {
  if (fileType === 'application/pdf') return { label: 'PDF', variant: 'error' as const }
  if (fileType.includes('word') || fileType.includes('document')) return { label: 'DOC', variant: 'primary' as const }
  if (fileType === 'image/jpeg') return { label: 'JPEG', variant: 'warning' as const }
  if (fileType === 'image/png') return { label: 'PNG', variant: 'warning' as const }
  if (fileType === 'image/webp') return { label: 'WebP', variant: 'warning' as const }
  return { label: 'Datei', variant: 'default' as const }
}

interface FileRecord {
  id: string
  fileName: string
  fileType: string
  fileSize: number
  filePath: string
  uploadedAt: string
  applicant: { id: string; firstName: string; lastName: string } | null
}

function isPreviewable(fileType: string): boolean {
  if (!fileType) return false
  if (fileType.startsWith('image/')) return true
  if (fileType === 'application/pdf' || fileType.includes('pdf')) return true
  return false
}

interface FileListProps {
  files: FileRecord[]
  total: number
  currentPage: number
  totalPages: number
  activeFileType?: string
}

export function FileList({
  files,
  total,
  currentPage,
  totalPages,
  activeFileType,
}: FileListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [deleteTarget, setDeleteTarget] = useState<FileRecord | null>(null)
  const [previewTarget, setPreviewTarget] = useState<FileRecord | null>(null)

  const typeValue = activeFileType ?? ''
  const hasActiveFilters = !!activeFileType

  const pushParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      }
      if (updates.type !== undefined) {
        params.delete('page')
      }
      startTransition(() => {
        router.push(`/admin/files?${params.toString()}`)
      })
    },
    [router, searchParams, startTransition],
  )

  function handleReset() {
    startTransition(() => {
      router.push('/admin/files')
    })
  }

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    if (page > 1) {
      params.set('page', String(page))
    } else {
      params.delete('page')
    }
    startTransition(() => {
      router.push(`/admin/files?${params.toString()}`)
    })
  }

  function handleDelete(file: FileRecord) {
    setDeleteTarget(file)
  }

  function confirmDelete() {
    if (!deleteTarget) return
    startTransition(async () => {
      await deleteFileRecord(deleteTarget.id)
      setDeleteTarget(null)
    })
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-wrap items-end gap-3">
          <div className="w-52">
            <Select
              options={FILE_TYPE_OPTIONS}
              value={typeValue}
              onChange={(e) => pushParams({ type: e.target.value })}
            />
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              icon={<RotateCcw className="h-3.5 w-3.5" />}
            >
              Zurücksetzen
            </Button>
          )}
        </div>
      </div>

      {total > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-warm-500">
            {total} {total === 1 ? 'Dokument' : 'Dokumente'} gefunden
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {files.length === 0 ? (
        <Card>
          <EmptyState
            icon={<FileText className="h-6 w-6" />}
            title="Keine Dokumente gefunden"
            description="Versuchen Sie, Ihre Filterkriterien anzupassen."
          />
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dateiname</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Größe</TableHead>
                <TableHead>Bewerber</TableHead>
                <TableHead>Hochgeladen am</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => {
                const typeBadge = getFileTypeBadge(file.fileType)
                const previewable = isPreviewable(file.fileType)
                return (
                  <TableRow key={file.id}>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => previewable && setPreviewTarget(file)}
                        disabled={!previewable}
                        className={`group flex items-center gap-2 text-left ${
                          previewable
                            ? 'cursor-pointer hover:text-primary-600'
                            : 'cursor-default'
                        }`}
                        title={previewable ? 'Vorschau öffnen' : undefined}
                      >
                        <span className="text-warm-400 group-hover:text-primary-500">
                          {getFileIcon(file.fileType)}
                        </span>
                        <span
                          className={`font-medium ${
                            previewable
                              ? 'text-warm-900 group-hover:text-primary-700 group-hover:underline underline-offset-2'
                              : 'text-warm-900'
                          }`}
                        >
                          {file.fileName}
                        </span>
                      </button>
                    </TableCell>
                    <TableCell>
                      <Badge variant={typeBadge.variant}>{typeBadge.label}</Badge>
                    </TableCell>
                    <TableCell className="text-warm-500">
                      {formatFileSize(file.fileSize)}
                    </TableCell>
                    <TableCell>
                      {file.applicant ? (
                        <Link
                          href={`/admin/applicants/${file.applicant.id}`}
                          className="text-primary-600 hover:text-primary-700 hover:underline"
                        >
                          {file.applicant.firstName} {file.applicant.lastName}
                        </Link>
                      ) : (
                        <span className="text-warm-400">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-warm-500">
                      {formatDate(file.uploadedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {previewable && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setPreviewTarget(file)}
                            title="Vorschau"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <a href={`/api/files/${file.id}`} download>
                          <Button variant="ghost" size="sm" title="Herunterladen">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </a>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(file)}
                          disabled={isPending}
                          className="text-error-600 hover:text-error-700 hover:bg-error-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Card>
      )}

      <FilePreviewModal
        file={previewTarget}
        onClose={() => setPreviewTarget(null)}
      />

      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogClose onClose={() => setDeleteTarget(null)} />
        <DialogHeader>
          <DialogTitle>Dokument löschen</DialogTitle>
          <DialogDescription>
            Möchten Sie die Datei{' '}
            <strong>{deleteTarget?.fileName}</strong>{' '}
            wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setDeleteTarget(null)}
            disabled={isPending}
          >
            Abbrechen
          </Button>
          <Button
            variant="destructive"
            loading={isPending}
            onClick={confirmDelete}
          >
            Löschen
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

function FilePreviewModal({
  file,
  onClose,
}: {
  file: FileRecord | null
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
    if (!file) return
    setLoading(true)
    document.addEventListener('keydown', handleEsc)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = prev
    }
  }, [file, handleEsc])

  if (!file) return null
  if (typeof document === 'undefined') return null

  const inlineUrl = `/api/files/${file.id}?inline=1`
  const downloadUrl = `/api/files/${file.id}`
  const isImage = file.fileType.startsWith('image/')
  const isPdf =
    file.fileType === 'application/pdf' || file.fileType.includes('pdf')

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-warm-900/70 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Vorschau: ${file.fileName}`}
    >
      <div className="relative flex h-full max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-warm-200/40 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between gap-3 border-b border-warm-200 px-5 py-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              {getFileIcon(file.fileType)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-warm-900">
                {file.fileName}
              </p>
              <p className="truncate text-xs text-warm-500">
                {formatFileSize(file.fileSize)} · {formatDate(file.uploadedAt)}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <a
              href={inlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 items-center gap-1.5 rounded-lg border border-warm-200 px-3 text-xs font-medium text-warm-600 transition-colors hover:border-warm-300 hover:bg-warm-50 hover:text-warm-800 sm:inline-flex"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Neuer Tab
            </a>
            <a
              href={downloadUrl}
              download={file.fileName}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary-600 px-3 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
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
                alt={file.fileName}
                className="max-h-full max-w-full select-none rounded-lg object-contain shadow-md"
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                draggable={false}
              />
            </div>
          )}
          {isPdf && (
            <iframe
              src={inlineUrl}
              title={file.fileName}
              className="h-full w-full bg-white"
              onLoad={() => setLoading(false)}
            />
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
