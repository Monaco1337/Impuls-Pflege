'use client'

import { useState, useTransition } from 'react'
import { Check, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { updateApplicantStatus, assignApplicant } from '@/lib/actions/applicants'

const statusOptions = [
  { value: 'NEU_EINGEGANGEN', label: 'Neu eingegangen' },
  { value: 'GESICHTET', label: 'Gesichtet' },
  { value: 'IN_PRUEFUNG', label: 'In Prüfung' },
  { value: 'INTERESSANT', label: 'Interessant' },
  { value: 'GESPRAECH_GEPLANT', label: 'Gespräch geplant' },
  { value: 'WARTELISTE', label: 'Warteliste' },
  { value: 'ABGELEHNT', label: 'Abgelehnt' },
  { value: 'EINGESTELLT', label: 'Eingestellt' },
  { value: 'ARCHIVIERT', label: 'Archiviert' },
]

interface User {
  id: string
  firstName: string
  lastName: string
  role: string
}

function SuccessIndicator({ visible }: { visible: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs font-medium text-success-600 transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0',
      )}
    >
      <Check className="h-3.5 w-3.5" />
      Gespeichert
    </span>
  )
}

interface ApplicantStatusUpdateProps {
  applicantId: string
  currentStatus: string
  currentAssignedToId: string | null
  users: User[]
}

export function ApplicantStatusUpdate({
  applicantId,
  currentStatus,
  currentAssignedToId,
  users,
}: ApplicantStatusUpdateProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus)
  const [note, setNote] = useState('')
  const [statusPending, startStatusTransition] = useTransition()
  const [assignPending, startAssignTransition] = useTransition()

  const [statusSaved, setStatusSaved] = useState(false)
  const [assignSaved, setAssignSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const hasStatusChange = selectedStatus !== currentStatus

  function flashSaved(setter: (v: boolean) => void) {
    setter(true)
    setTimeout(() => setter(false), 2000)
  }

  function handleStatusSubmit() {
    if (!hasStatusChange) return
    setError(null)
    const noteValue = note.trim()

    startStatusTransition(async () => {
      const result = await updateApplicantStatus(
        applicantId,
        selectedStatus as any,
        noteValue || undefined,
      )
      if (result.success) {
        setNote('')
        flashSaved(setStatusSaved)
      } else {
        setError(result.error ?? 'Status konnte nicht aktualisiert werden')
      }
    })
  }

  function handleAssignChange(value: string) {
    setError(null)
    startAssignTransition(async () => {
      const result = await assignApplicant(applicantId, value || null)
      if (result.success) {
        flashSaved(setAssignSaved)
      } else {
        setError(result.error ?? 'Zuweisung konnte nicht aktualisiert werden')
      }
    })
  }

  const userOptions = [
    { value: '', label: 'Nicht zugewiesen' },
    ...users.map((u) => ({
      value: u.id,
      label: `${u.firstName} ${u.lastName}`,
    })),
  ]

  return (
    <div className="space-y-6">
      {/* Status change with note */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-warm-700">Status</label>
          <SuccessIndicator visible={statusSaved} />
        </div>
        <Select
          options={statusOptions}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          disabled={statusPending}
        />
        {hasStatusChange && (
          <div className="space-y-2">
            <Textarea
              placeholder="Optionale Notiz zum Statuswechsel…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={statusPending}
              className="min-h-[60px]"
            />
            <Button
              size="sm"
              onClick={handleStatusSubmit}
              loading={statusPending}
              icon={<Send className="h-3.5 w-3.5" />}
              className="w-full"
            >
              Status aktualisieren
            </Button>
          </div>
        )}
      </div>

      {/* Assignment */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-warm-700">
            Zugewiesen an
          </label>
          <SuccessIndicator visible={assignSaved} />
        </div>
        <Select
          options={userOptions}
          defaultValue={currentAssignedToId ?? ''}
          onChange={(e) => handleAssignChange(e.target.value)}
          disabled={assignPending}
        />
      </div>

      {error && (
        <p className="text-xs text-error-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
