'use client'

import { useState, useTransition } from 'react'
import { X, Plus, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Select } from '@/components/ui/select'
import { addApplicantTag, removeApplicantTag } from '@/lib/actions/applicants'

interface Tag {
  id: string
  name: string
  color: string
}

interface ApplicantTagsProps {
  applicantId: string
  currentTags: Tag[]
  availableTags: Tag[]
}

export function ApplicantTags({
  applicantId,
  currentTags: initialTags,
  availableTags,
}: ApplicantTagsProps) {
  const [tags, setTags] = useState<Tag[]>(initialTags)
  const [addPending, startAddTransition] = useTransition()
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const currentIds = new Set(tags.map((t) => t.id))
  const addableOptions = [
    { value: '', label: 'Tag hinzufügen…' },
    ...availableTags
      .filter((t) => !currentIds.has(t.id))
      .map((t) => ({ value: t.id, label: t.name })),
  ]

  function handleAdd(tagId: string) {
    if (!tagId) return
    setError(null)

    const tag = availableTags.find((t) => t.id === tagId)
    if (!tag) return

    setTags((prev) => [...prev, tag])

    startAddTransition(async () => {
      const result = await addApplicantTag(applicantId, tagId)
      if (!result.success) {
        setTags((prev) => prev.filter((t) => t.id !== tagId))
        setError(result.error ?? 'Tag konnte nicht hinzugefügt werden')
      }
    })
  }

  function handleRemove(tagId: string) {
    setError(null)
    setRemovingId(tagId)

    const removed = tags.find((t) => t.id === tagId)
    setTags((prev) => prev.filter((t) => t.id !== tagId))

    startAddTransition(async () => {
      const result = await removeApplicantTag(applicantId, tagId)
      if (!result.success) {
        if (removed) setTags((prev) => [...prev, removed])
        setError(result.error ?? 'Tag konnte nicht entfernt werden')
      }
      setRemovingId(null)
    })
  }

  return (
    <div className="space-y-3">
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1.5 rounded-full py-1 pl-2.5 pr-1.5 text-xs font-medium text-white"
              style={{ backgroundColor: tag.color }}
            >
              {tag.name}
              <button
                type="button"
                onClick={() => handleRemove(tag.id)}
                disabled={removingId === tag.id}
                className="inline-flex h-4 w-4 items-center justify-center rounded-full transition-colors hover:bg-white/25"
                aria-label={`${tag.name} entfernen`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-warm-400">Keine Tags zugewiesen</p>
      )}

      {addableOptions.length > 1 && (
        <Select
          options={addableOptions}
          value=""
          onChange={(e) => handleAdd(e.target.value)}
          disabled={addPending}
        />
      )}

      {error && (
        <p className="text-xs text-error-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
