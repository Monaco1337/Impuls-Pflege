'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Pencil, Copy, Trash2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogContent,
} from '@/components/ui/dialog'
import { toggleJobActive, duplicateJob, deleteJob } from '@/lib/actions/jobs'

interface JobActionsProps {
  jobId: string
  jobTitle: string
  active: boolean
}

export function JobActions({ jobId, jobTitle, active }: JobActionsProps) {
  const router = useRouter()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isToggling, startToggle] = useTransition()
  const [isDuplicating, startDuplicate] = useTransition()
  const [isDeleting, startDelete] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleToggle() {
    startToggle(async () => {
      const result = await toggleJobActive(jobId)
      if (!result.success) {
        setError(result.error ?? 'Status konnte nicht geändert werden')
      }
      router.refresh()
    })
  }

  function handleDuplicate() {
    startDuplicate(async () => {
      const result = await duplicateJob(jobId)
      if (!result.success) {
        setError(result.error ?? 'Stelle konnte nicht dupliziert werden')
      }
      router.refresh()
    })
  }

  function handleDelete() {
    setError(null)
    startDelete(async () => {
      const result = await deleteJob(jobId)
      if (result.success) {
        setDeleteOpen(false)
        router.refresh()
      } else {
        setError(result.error ?? 'Stelle konnte nicht gelöscht werden')
      }
    })
  }

  return (
    <>
      <div className="flex items-center justify-end gap-1">
        <Link href={`/admin/jobs/${jobId}/edit`}>
          <Button variant="ghost" size="sm" icon={<Pencil className="h-3.5 w-3.5" />}>
            <span className="sr-only">Bearbeiten</span>
          </Button>
        </Link>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          loading={isToggling}
          icon={active ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          title={active ? 'Deaktivieren' : 'Aktivieren'}
        >
          <span className="sr-only">{active ? 'Deaktivieren' : 'Aktivieren'}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleDuplicate}
          loading={isDuplicating}
          icon={<Copy className="h-3.5 w-3.5" />}
          title="Duplizieren"
        >
          <span className="sr-only">Duplizieren</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setDeleteOpen(true)}
          icon={<Trash2 className="h-3.5 w-3.5" />}
          className="text-error-500 hover:bg-error-50 hover:text-error-600"
          title="Löschen"
        >
          <span className="sr-only">Löschen</span>
        </Button>
      </div>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogClose onClose={() => setDeleteOpen(false)} />
        <DialogHeader>
          <DialogTitle>Stelle löschen</DialogTitle>
          <DialogDescription>
            Sind Sie sicher, dass Sie die Stelle &quot;{jobTitle}&quot; unwiderruflich
            löschen möchten? Alle zugehörigen Bewerberdaten bleiben erhalten.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <DialogContent>
            <p className="text-sm text-error-500">{error}</p>
          </DialogContent>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setDeleteOpen(false)}
            disabled={isDeleting}
          >
            Abbrechen
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            loading={isDeleting}
          >
            Endgültig löschen
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
