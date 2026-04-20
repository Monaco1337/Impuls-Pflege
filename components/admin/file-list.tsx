'use client'

import { useState, useTransition, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  FileText,
  Image as ImageIcon,
  File,
  Download,
  Trash2,
  RotateCcw,
} from 'lucide-react'
import { cn, formatDate, formatFileSize } from '@/lib/utils'
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
                return (
                  <TableRow key={file.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-warm-400">
                          {getFileIcon(file.fileType)}
                        </span>
                        <span className="font-medium text-warm-900">
                          {file.fileName}
                        </span>
                      </div>
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
                        <a href={`/api/files/${file.id}`} download>
                          <Button variant="ghost" size="sm">
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
