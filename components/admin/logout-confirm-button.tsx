'use client'

import { useState } from 'react'
import { LogOut } from 'lucide-react'
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

export function LogoutConfirmButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-warm-200/80 bg-white/80 py-2.5 text-sm font-medium text-warm-600 transition hover:border-warm-300 hover:bg-warm-50 hover:text-warm-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30"
        title="Vom Konto abmelden"
        aria-label="Abmelden"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        <span>Abmelden</span>
      </button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogClose onClose={() => setOpen(false)} />
        <DialogHeader>
          <DialogTitle>Abmelden?</DialogTitle>
          <DialogDescription>
            Sie werden von der Verwaltung getrennt. Ungespeicherte Eingaben gehen verloren, falls
            Sie noch offene Formulare haben.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <p className="text-sm text-warm-600">Möchten Sie wirklich fortfahren?</p>
        </DialogContent>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Abbrechen
          </Button>
          <form action="/api/auth/signout" method="post" className="inline">
            <Button type="submit" variant="destructive">
              Abmelden
            </Button>
          </form>
        </DialogFooter>
      </Dialog>
    </>
  )
}
