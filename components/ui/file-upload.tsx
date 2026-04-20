'use client'

import { useState, useRef, useCallback, useEffect, type DragEvent, type ChangeEvent } from 'react'
import { cn } from '@/lib/utils'
import { formatFileSize } from '@/lib/utils'

export interface UploadedFile {
  file: File
  id: string
}

export interface FileUploadProps {
  accept?: string
  maxSizeMB?: number
  multiple?: boolean
  onChange?: (files: File[]) => void
  className?: string
  label?: string
  helperText?: string
  error?: string
}

export function FileUpload({
  accept,
  maxSizeMB = 10,
  multiple = false,
  onChange,
  className,
  label,
  helperText,
  error,
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const maxSizeBytes = maxSizeMB * 1024 * 1024

  // Notify parent after state update, never during render
  useEffect(() => {
    onChange?.(files.map((f) => f.file))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files])

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const valid = Array.from(incoming).filter((f) => f.size <= maxSizeBytes)
      const newFiles: UploadedFile[] = valid.map((file) => ({
        file,
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      }))

      setFiles((prev) => {
        const next = multiple ? [...prev, ...newFiles] : newFiles
        return next
      })
    },
    [maxSizeBytes, multiple],
  )

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) addFiles(e.target.files)
    e.target.value = ''
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <span className="text-sm font-medium text-warm-700">{label}</span>
      )}
      <div
        className={cn(
          'relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 transition-colors cursor-pointer',
          dragOver
            ? 'border-primary-400 bg-primary-50/50'
            : error
              ? 'border-error-500 bg-error-50/30'
              : 'border-warm-300 hover:border-primary-300 hover:bg-warm-50/50',
        )}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Dateien hochladen"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click() }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="sr-only"
          tabIndex={-1}
        />
        <svg className="h-10 w-10 text-warm-400" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path d="M20 6v20M12 14l8-8 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 28v4a2 2 0 002 2h24a2 2 0 002-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="text-center">
          <p className="text-sm font-medium text-warm-700">
            Dateien hierher ziehen oder <span className="text-primary-500 underline underline-offset-2">durchsuchen</span>
          </p>
          <p className="mt-1 text-xs text-warm-400">
            {accept ? `Erlaubte Formate: ${accept}` : 'Alle Dateiformate'} &middot; Max. {maxSizeMB} MB
          </p>
        </div>
      </div>

      {error && (
        <p className="text-xs text-error-500" role="alert">{error}</p>
      )}
      {!error && helperText && (
        <p className="text-xs text-warm-500">{helperText}</p>
      )}

      {files.length > 0 && (
        <ul className="mt-2 flex flex-col gap-2" aria-label="Hochgeladene Dateien">
          {files.map((f) => (
            <li
              key={f.id}
              className="flex items-center justify-between rounded-lg border border-warm-200 bg-warm-50 px-3 py-2"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-warm-700">{f.file.name}</p>
                <p className="text-xs text-warm-400">{formatFileSize(f.file.size)}</p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile(f.id) }}
                className="ml-3 shrink-0 rounded-md p-1 text-warm-400 transition-colors hover:text-error-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label={`${f.file.name} entfernen`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
