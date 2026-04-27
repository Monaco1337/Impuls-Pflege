'use client'

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { X, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { addApplicantTag, removeApplicantTag } from '@/lib/actions/applicants'
import { createTag, getTags } from '@/lib/actions/tags'

interface Tag {
  id: string
  name: string
  color: string
}

const DEFAULT_TAG_COLOR = '#0097A7'

function normalizeTag(raw: { id: string; name: string; color: string | null }): Tag {
  return {
    id: raw.id,
    name: raw.name,
    color: raw.color?.trim() || DEFAULT_TAG_COLOR,
  }
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
  const [tags, setTags] = useState<Tag[]>(initialTags.map((t) => normalizeTag(t)))
  const [extraTags, setExtraTags] = useState<Tag[]>([])
  const [input, setInput] = useState('')
  const [openSuggestions, setOpenSuggestions] = useState(false)
  const [addPending, startAddTransition] = useTransition()
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef(tags)
  tagsRef.current = tags

  const pool = useMemo(
    () => [...availableTags.map((t) => normalizeTag(t)), ...extraTags],
    [availableTags, extraTags],
  )

  const currentIds = useMemo(() => new Set(tags.map((t) => t.id)), [tags])

  const suggestions = useMemo(() => {
    const q = input.trim().toLowerCase()
    if (!q) {
      return pool.filter((t) => !currentIds.has(t.id)).slice(0, 8)
    }
    return pool
      .filter((t) => !currentIds.has(t.id) && t.name.toLowerCase().includes(q))
      .slice(0, 8)
  }, [pool, currentIds, input])

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpenSuggestions(false)
      }
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [])

  const resolveTag = useCallback(
    (tagId: string, tagPool: Tag[]) => tagPool.find((t) => t.id === tagId),
    [],
  )

  function applyTagOptimistic(tag: Tag) {
    setTags((prev) => (prev.some((t) => t.id === tag.id) ? prev : [...prev, tag]))
  }

  async function persistAdd(tagId: string): Promise<boolean> {
    const result = await addApplicantTag(applicantId, tagId)
    if (!result.success) {
      setTags((prev) => prev.filter((t) => t.id !== tagId))
      setError(result.error ?? 'Tag konnte nicht hinzugefügt werden')
      return false
    }
    return true
  }

  function handleAdd(tagId: string, tagPool: Tag[]) {
    setError(null)
    const tag = resolveTag(tagId, tagPool)
    if (!tag) return
    applyTagOptimistic(tag)
    startAddTransition(async () => {
      await persistAdd(tagId)
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

  function submitInput() {
    const name = input.trim()
    if (!name || addPending) return

    const existing = pool.find((t) => t.name.toLowerCase() === name.toLowerCase())
    if (existing) {
      if (currentIds.has(existing.id)) {
        setError('Dieses Tag ist bereits zugewiesen')
        return
      }
      handleAdd(existing.id, pool)
      setInput('')
      setOpenSuggestions(false)
      return
    }

    setError(null)
    startAddTransition(async () => {
      const created = await createTag(name, DEFAULT_TAG_COLOR)
      if (!created.success || !created.data) {
        const msg = created.error ?? 'Tag konnte nicht erstellt werden'
        if (msg.includes('existiert')) {
          const tagsFresh = await getTags()
          const list = (tagsFresh.data ?? []) as { id: string; name: string; color: string | null }[]
          const found = list.find((t) => t.name.toLowerCase() === name.toLowerCase())
          if (found) {
            const t = normalizeTag(found)
            setExtraTags((prev) => (prev.some((x) => x.id === t.id) ? prev : [...prev, t]))
            if (tagsRef.current.some((x) => x.id === t.id)) {
              setError('Dieses Tag ist bereits zugewiesen')
              return
            }
            applyTagOptimistic(t)
            await persistAdd(t.id)
            setInput('')
            setOpenSuggestions(false)
            return
          }
        }
        setError(msg)
        return
      }

      const tag = normalizeTag(created.data as { id: string; name: string; color: string | null })
      setExtraTags((prev) => (prev.some((x) => x.id === tag.id) ? prev : [...prev, tag]))
      applyTagOptimistic(tag)
      await persistAdd(tag.id)
      setInput('')
      setOpenSuggestions(false)
    })
  }

  function pickSuggestion(tag: Tag) {
    if (currentIds.has(tag.id)) {
      setError('Bereits zugewiesen')
      return
    }
    handleAdd(tag.id, pool)
    setInput('')
    setOpenSuggestions(false)
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

      <div ref={wrapRef} className="relative space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <div className="min-w-0 flex-1">
              <Input
                placeholder="Tag eingeben oder aus Liste wählen…"
                value={input}
                disabled={addPending}
                onChange={(e) => {
                  setInput(e.target.value)
                  setOpenSuggestions(true)
                  setError(null)
                }}
                onFocus={() => setOpenSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    submitInput()
                  }
                  if (e.key === 'Escape') {
                    setOpenSuggestions(false)
                  }
                }}
                autoComplete="off"
                aria-autocomplete="list"
                aria-expanded={openSuggestions}
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              loading={addPending}
              disabled={addPending || !input.trim()}
              onClick={() => submitInput()}
              icon={<Plus className="h-4 w-4" />}
              className="shrink-0 sm:mb-px"
            >
              Hinzufügen
            </Button>
          </div>

          {openSuggestions && suggestions.length > 0 && (
            <ul
              className={cn(
                'absolute left-0 right-0 top-full z-20 mt-1 max-h-48 overflow-auto rounded-xl border border-warm-200 bg-white py-1 shadow-lg',
                'sm:right-auto sm:min-w-[min(100%,20rem)]',
              )}
              role="listbox"
            >
              {suggestions.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    role="option"
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-warm-800 hover:bg-warm-50"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => pickSuggestion(t)}
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: t.color }}
                      aria-hidden
                    />
                    {t.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
      </div>

      {error && (
        <p className="text-xs text-error-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
