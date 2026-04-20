'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { deleteApplicant } from '@/lib/actions/applicants'

interface ApplicantDeleteButtonProps {
  applicantId: string
}

export function ApplicantDeleteButton({
  applicantId,
}: ApplicantDeleteButtonProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleDelete() {
    setError(null)
    startTransition(async () => {
      const result = await deleteApplicant(applicantId)
      if (result.success) {
        router.push('/admin/applicants')
      } else {
        setError(result.error ?? 'Bewerber konnte nicht gelöscht werden')
      }
    })
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        icon={<Trash2 className="h-4 w-4" />}
        className="text-error-500 hover:bg-error-50 hover:text-error-600"
      >
        Löschen
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogClose onClose={() => setOpen(false)} />
        <DialogHeader>
          <DialogTitle>Bewerber löschen</DialogTitle>
          <DialogDescription>
            Sind Sie sicher, dass Sie diesen Bewerber und alle zugehörigen Daten
            unwiderruflich löschen möchten? Alle Dokumente, Notizen und der
            Statusverlauf werden ebenfalls entfernt.
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
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Abbrechen
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            loading={isPending}
          >
            Endgültig löschen
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
