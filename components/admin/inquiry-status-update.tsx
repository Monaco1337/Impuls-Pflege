'use client'

import { useState, useTransition } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Select } from '@/components/ui/select'
import { updateInquiryStatus, updateInquiryPriority, assignInquiry } from '@/lib/actions/inquiries'

const statusOptions = [
  { value: 'NEU', label: 'Neu' },
  { value: 'IN_BEARBEITUNG', label: 'In Bearbeitung' },
  { value: 'RUECKRUF_GEPLANT', label: 'Rückruf geplant' },
  { value: 'WARTET_AUF_RUECKMELDUNG', label: 'Wartet auf Rückmeldung' },
  { value: 'ERLEDIGT', label: 'Erledigt' },
  { value: 'ARCHIVIERT', label: 'Archiviert' },
]

const priorityOptions = [
  { value: 'NIEDRIG', label: 'Niedrig' },
  { value: 'NORMAL', label: 'Normal' },
  { value: 'HOCH', label: 'Hoch' },
  { value: 'DRINGEND', label: 'Dringend' },
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

interface InquiryStatusUpdateProps {
  inquiryId: string
  currentStatus: string
  currentPriority: string
  currentAssignedToId: string | null
  users: User[]
}

export function InquiryStatusUpdate({
  inquiryId,
  currentStatus,
  currentPriority,
  currentAssignedToId,
  users,
}: InquiryStatusUpdateProps) {
  const [statusPending, startStatusTransition] = useTransition()
  const [priorityPending, startPriorityTransition] = useTransition()
  const [assignPending, startAssignTransition] = useTransition()

  const [statusSaved, setStatusSaved] = useState(false)
  const [prioritySaved, setPrioritySaved] = useState(false)
  const [assignSaved, setAssignSaved] = useState(false)

  const [error, setError] = useState<string | null>(null)

  function flashSaved(setter: (v: boolean) => void) {
    setter(true)
    setTimeout(() => setter(false), 2000)
  }

  function handleStatusChange(value: string) {
    if (!value || value === currentStatus) return
    setError(null)
    startStatusTransition(async () => {
      const result = await updateInquiryStatus(inquiryId, value as any)
      if (result.success) {
        flashSaved(setStatusSaved)
      } else {
        setError(result.error ?? 'Fehler beim Aktualisieren')
      }
    })
  }

  function handlePriorityChange(value: string) {
    if (!value || value === currentPriority) return
    setError(null)
    startPriorityTransition(async () => {
      const result = await updateInquiryPriority(inquiryId, value as any)
      if (result.success) {
        flashSaved(setPrioritySaved)
      } else {
        setError(result.error ?? 'Fehler beim Aktualisieren')
      }
    })
  }

  function handleAssignChange(value: string) {
    setError(null)
    startAssignTransition(async () => {
      const result = await assignInquiry(inquiryId, value || null)
      if (result.success) {
        flashSaved(setAssignSaved)
      } else {
        setError(result.error ?? 'Fehler beim Aktualisieren')
      }
    })
  }

  const userOptions = [
    { value: '', label: 'Nicht zugewiesen' },
    ...users.map((u) => ({ value: u.id, label: `${u.firstName} ${u.lastName}` })),
  ]

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-warm-700">Status</label>
          <SuccessIndicator visible={statusSaved} />
        </div>
        <Select
          options={statusOptions}
          defaultValue={currentStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={statusPending}
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-warm-700">Priorität</label>
          <SuccessIndicator visible={prioritySaved} />
        </div>
        <Select
          options={priorityOptions}
          defaultValue={currentPriority}
          onChange={(e) => handlePriorityChange(e.target.value)}
          disabled={priorityPending}
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-warm-700">Zugewiesen an</label>
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
