'use client'

import { useState, useTransition } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { updateContentBlock } from '@/lib/actions/content'
import { SiteImagesEditor } from '@/components/admin/site-images-editor'
import { TeamCmsEditor } from '@/components/admin/team-cms-editor'
import { cmsFieldMeta } from '@/lib/content/cms-block-fields'
import { mergeContactContent } from '@/lib/content/contact-cms'
import { mergeHeroContent } from '@/lib/content/hero-cms'
import { mergeIntroContent } from '@/lib/content/intro-cms'

interface ContentBlock {
  id: string
  key: string
  title: string | null
  content: unknown
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

function fieldOrderForBlock(key: string): string[] | null {
  if (key === 'hero') return ['headline', 'subheadline', 'body']
  if (key === 'intro') return ['eyebrow', 'headline', 'body', 'quote', 'quoteBy']
  if (key === 'contact-info') return ['phone', 'email', 'address', 'hours']
  return null
}

function isLongValue(value: string, rows?: number): boolean {
  if (rows && rows >= 3) return true
  return value.length > 100 || value.includes('\n')
}

export function ContentBlockEditor({ block }: ContentBlockEditorProps) {
  if (block.key === 'site-images') {
    return (
      <SiteImagesEditor
        block={{
          id: block.id,
          key: block.key,
          title: block.title,
          content:
            block.content && typeof block.content === 'object' && !Array.isArray(block.content)
              ? (block.content as Record<string, unknown>)
              : {},
          sortOrder: block.sortOrder,
        }}
      />
    )
  }

  if (block.key === 'team') {
    return (
      <TeamCmsEditor
        block={{
          id: block.id,
          key: block.key,
          title: block.title,
          content: block.content,
          sortOrder: block.sortOrder,
        }}
      />
    )
  }

  const [values, setValues] = useState<Record<string, string>>(() => {
    if (block.key === 'hero') {
      const m = mergeHeroContent(block.content)
      return { headline: m.headline, subheadline: m.subheadline, body: m.body }
    }
    if (block.key === 'intro') {
      const m = mergeIntroContent(block.content)
      return {
        eyebrow: m.eyebrow,
        headline: m.headline,
        body: m.body,
        quote: m.quote,
        quoteBy: m.quoteBy,
      }
    }
    if (block.key === 'contact-info') {
      const m = mergeContactContent(block.content)
      return { phone: m.phone, fax: m.fax, email: m.email, address: m.address, hours: m.hours }
    }
    if (block.content && typeof block.content === 'object' && !Array.isArray(block.content)) {
      return Object.fromEntries(
        Object.entries(block.content as Record<string, unknown>).map(([k, v]) => [
          k,
          typeof v === 'string' ? v : v == null ? '' : JSON.stringify(v),
        ]),
      )
    }
    return {}
  })
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
        key: block.key,
        title: block.title,
        content: values,
        imageUrl: imageUrl || undefined,
        sortOrder: block.sortOrder ?? undefined,
      })

      if (result.success) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        setError(result.error ?? 'Fehler beim Speichern')
      }
    })
  }

  const ordered = fieldOrderForBlock(block.key)
  const keys = ordered
    ? [...ordered.filter((k) => k in values), ...Object.keys(values).filter((k) => !ordered.includes(k)).sort()]
    : Object.keys(values).sort()

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {keys.map((key) => {
          const value = values[key] ?? ''
          const meta = cmsFieldMeta(block.key, key)
          const label = meta?.label ?? formatFieldLabel(key)
          const long = isLongValue(value, meta?.rows)

          return long ? (
            <div key={key} className={meta?.wide !== false ? 'sm:col-span-2' : undefined}>
              <Textarea
                label={label}
                value={value}
                onChange={(e) => handleFieldChange(key, e.target.value)}
                rows={meta?.rows ?? 4}
              />
              {meta?.hint && (
                <p className="mt-1.5 text-[11px] leading-relaxed text-warm-500">{meta.hint}</p>
              )}
            </div>
          ) : (
            <div key={key} className={meta?.wide ? 'sm:col-span-2' : undefined}>
              <Input
                label={label}
                value={value}
                onChange={(e) => handleFieldChange(key, e.target.value)}
              />
              {meta?.hint && (
                <p className="mt-1.5 text-[11px] leading-relaxed text-warm-500">{meta.hint}</p>
              )}
            </div>
          )
        })}
      </div>

      {Boolean(block.imageUrl) && (
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

      <div className="flex flex-wrap items-center gap-3 border-t border-warm-100 pt-4">
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
