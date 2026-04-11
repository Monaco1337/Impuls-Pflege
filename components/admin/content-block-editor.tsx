'use client'

import { useState, useTransition } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { updateContentBlock } from '@/lib/actions/content'

interface ContentBlock {
  id: string
  key: string
  title: string | null
  content: Record<string, string>
  imageUrl: string | null
  sortOrder: number | null
  updatedAt: string | Date
  updatedBy: { firstName: string; lastName: string } | null
}

interface ContentBlockEditorProps {
  block: ContentBlock
}

function formatFieldLabel(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function isLongValue(value: string): boolean {
  return value.length > 100 || value.includes('\n')
}

export function ContentBlockEditor({ block }: ContentBlockEditorProps) {
  const [values, setValues] = useState<Record<string, string>>(
    () => ({ ...block.content }),
  )
  const [imageUrl, setImageUrl] = useState(block.imageUrl ?? '')
  const [pending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleFieldChange(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  function handleSave() {
    setError(null)
    startTransition(async () => {
      const result = await updateContentBlock(block.key, {
        title: block.title,
        content: values,
        imageUrl: imageUrl || undefined,
      })

      if (result.success) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        setError(result.error ?? 'Fehler beim Speichern')
      }
    })
  }

  const contentKeys = Object.keys(values)

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {contentKeys.map((key) => {
          const value = values[key] ?? ''
          const long = isLongValue(value)

          return long ? (
            <div key={key} className="sm:col-span-2">
              <Textarea
                label={formatFieldLabel(key)}
                value={value}
                onChange={(e) => handleFieldChange(key, e.target.value)}
                rows={4}
              />
            </div>
          ) : (
            <div key={key}>
              <Input
                label={formatFieldLabel(key)}
                value={value}
                onChange={(e) => handleFieldChange(key, e.target.value)}
              />
            </div>
          )
        })}
      </div>

      {block.imageUrl !== undefined && (
        <Input
          label="Bild-URL"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value)
            setSaved(false)
          }}
          placeholder="https://..."
        />
      )}

      <div className="flex items-center gap-3 pt-1">
        <Button onClick={handleSave} loading={pending} size="sm">
          Speichern
        </Button>

        {saved && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-success-600">
            <Check className="h-3.5 w-3.5" />
            Gespeichert
          </span>
        )}

        {error && (
          <p className="text-xs text-error-500" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
