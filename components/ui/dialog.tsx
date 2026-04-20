'use client'

import {
  useEffect,
  useCallback,
  useRef,
  type HTMLAttributes,
  type ReactNode,
  type MouseEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

export interface DialogProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function Dialog({ open, onClose, children }: DialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [open, handleEscape])

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  if (!open) return null

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-warm-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg rounded-xl bg-white shadow-xl ring-1 ring-warm-200/50 animate-in zoom-in-95 duration-200">
        {children}
      </div>
    </div>,
    document.body,
  )
}

export function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-6 pt-6 pb-2', className)} {...props} />
}

export function DialogTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn('text-lg font-semibold text-warm-900', className)}
      {...props}
    />
  )
}

export function DialogDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('mt-1 text-sm text-warm-500', className)} {...props} />
  )
}

export function DialogContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-6 py-4', className)} {...props} />
}

export function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center justify-end gap-3 px-6 pb-6 pt-2', className)}
      {...props}
    />
  )
}

export function DialogClose({ onClose, className }: { onClose: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className={cn(
        'absolute right-4 top-4 rounded-md p-1 text-warm-400 transition-colors hover:text-warm-600',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        className,
      )}
      aria-label="Schließen"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  )
}
