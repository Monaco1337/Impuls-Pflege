'use client'

import { useState, useTransition } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Select } from '@/components/ui/select'
import { AnamneseStatus } from '@/lib/types/enums'
import { assignAnamnese, updateAnamneseStatus } from '@/lib/actions/anamnese'

const statusOptions = [
  { value: AnamneseStatus.NEU_EINGEGANGEN, label: 'Neu eingegangen' },
  { value: AnamneseStatus.GESICHTET, label: 'Gesichtet' },
  { value: AnamneseStatus.IN_BEARBEITUNG, label: 'In Bearbeitung' },
  { value: AnamneseStatus.ERLEDIGT, label: 'Erledigt' },
  { value: AnamneseStatus.ARCHIVIERT, label: 'Archiviert' },
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

type Props = {
  submissionId: string
  currentStatus: string
  currentAssignedToId: string | null
  users: User[]
}

export function AnamneseStatusUpdate({
  submissionId,
  currentStatus,
  currentAssignedToId,
  users,
}: Props) {
  const [statusPending, startStatus] = useTransition()
  const [assignPending, startAssign] = useTransition()
  const [statusSaved, setStatusSaved] = useState(false)
  const [assignSaved, setAssignSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function flash(setter: (v: boolean) => void) {
    setter(true)
    setTimeout(() => setter(false), 2000)
  }

  function handleStatusChange(value: string) {
    if (!value || value === currentStatus) return
    setError(null)
    startStatus(async () => {
      const r = await updateAnamneseStatus(submissionId, value as AnamneseStatus)
      if (r.success) flash(setStatusSaved)
      else setError(r.error ?? 'Fehler beim Aktualisieren')
    })
  }

  function handleAssignChange(value: string) {
    setError(null)
    startAssign(async () => {
      const r = await assignAnamnese(submissionId, value || null)
      if (r.success) flash(setAssignSaved)
      else setError(r.error ?? 'Fehler bei der Zuweisung')
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
    <div className="space-y-5">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-warm-700">Status</label>
          <SuccessIndicator visible={statusSaved} />
        </div>
        <Select
          options={statusOptions}
          value={currentStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={statusPending}
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
