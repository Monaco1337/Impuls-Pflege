'use client'

import { useRef, useState, useTransition } from 'react'
import { Send, MessageSquare } from 'lucide-react'
import { cn, formatDateTime } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { addApplicantNote } from '@/lib/actions/applicants'

interface Note {
  id: string
  content: string
  createdAt: string | Date
  author: { firstName: string; lastName: string }
}

interface ApplicantNotesProps {
  applicantId: string
  initialNotes: Note[]
}

export function ApplicantNotes({
  applicantId,
  initialNotes,
}: ApplicantNotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [content, setContent] = useState('')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return

    setError(null)
    const noteContent = content.trim()
    setContent('')

    startTransition(async () => {
      const result = await addApplicantNote(applicantId, noteContent)
      if (result.success && result.data) {
        setNotes((prev) => [result.data as Note, ...prev])
      } else {
        setError(result.error ?? 'Notiz konnte nicht gespeichert werden')
        setContent(noteContent)
      }
    })
  }

  return (
    <div className="space-y-6">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
        <Textarea
          placeholder="Interne Notiz hinzufügen…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPending}
          className="min-h-[80px]"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault()
              formRef.current?.requestSubmit()
            }
          }}
        />
        {error && (
          <p className="text-xs text-error-500" role="alert">
            {error}
          </p>
        )}
        <div className="flex items-center justify-between">
          <p className="text-xs text-warm-400">
            ⌘ + Enter zum Senden
          </p>
          <Button
            type="submit"
            size="sm"
            disabled={!content.trim() || isPending}
            loading={isPending}
            icon={<Send className="h-3.5 w-3.5" />}
          >
            Notiz speichern
          </Button>
        </div>
      </form>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center py-8 text-center">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-warm-100">
            <MessageSquare className="h-4 w-4 text-warm-400" />
          </div>
          <p className="text-sm text-warm-500">Noch keine Notizen vorhanden</p>
        </div>
      ) : (
        <div className="space-y-0">
          {notes.map((note, index) => (
            <div
              key={note.id}
              className={cn(
                'relative py-4 pl-6',
                index < notes.length - 1 && 'border-b border-warm-100',
              )}
            >
              <div className="absolute left-0 top-5 h-2 w-2 rounded-full bg-primary-300" />
              {index < notes.length - 1 && (
                <div className="absolute bottom-0 left-[3px] top-7 w-px bg-warm-200" />
              )}
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-sm font-medium text-warm-800">
                  {note.author.firstName} {note.author.lastName}
                </p>
                <time className="shrink-0 text-xs text-warm-400">
                  {formatDateTime(note.createdAt)}
                </time>
              </div>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-warm-600">
                {note.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
