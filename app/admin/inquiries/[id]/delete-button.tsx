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
import { deleteInquiry } from '@/lib/actions/inquiries'

interface InquiryDeleteButtonProps {
  inquiryId: string
}

export function InquiryDeleteButton({ inquiryId }: InquiryDeleteButtonProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleDelete() {
    setError(null)
    startTransition(async () => {
      const result = await deleteInquiry(inquiryId)
      if (result.success) {
        router.push('/admin/inquiries')
      } else {
        setError(result.error ?? 'Anfrage konnte nicht gelöscht werden')
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
          <DialogTitle>Anfrage löschen</DialogTitle>
          <DialogDescription>
            Sind Sie sicher, dass Sie diese Anfrage unwiderruflich löschen möchten?
            Alle zugehörigen Notizen werden ebenfalls entfernt.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <DialogContent>
            <p className="text-sm text-error-500">{error}</p>
          </DialogContent>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
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
