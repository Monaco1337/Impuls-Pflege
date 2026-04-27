'use client'

import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

export function LogoutConfirmButton({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)

  async function confirmLogout() {
    setPending(true)
    try {
      await signOut({ redirectTo: '/admin/login' })
    } catch {
      setPending(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-800 bg-white py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition',
          'hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2',
          compact && 'lg:gap-0',
        )}
        title="Sitzung beenden und abmelden"
        aria-label="Abmelden – Dialog öffnen"
      >
        <LogOut className="h-4 w-4 shrink-0" aria-hidden />
        <span className={cn(compact && 'lg:sr-only')}>Abmelden</span>
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
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={pending}>
            Abbrechen
          </Button>
          <Button type="button" variant="destructive" loading={pending} onClick={() => void confirmLogout()}>
            Abmelden
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
