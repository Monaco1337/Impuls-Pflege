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

type Side = 'left' | 'right'

const slideClasses: Record<Side, string> = {
  left: 'left-0 top-0 h-full animate-in slide-in-from-left duration-300',
  right: 'right-0 top-0 h-full animate-in slide-in-from-right duration-300',
}

export interface SheetProps {
  open: boolean
  onClose: () => void
  side?: Side
  children: ReactNode
  className?: string
}

export function Sheet({ open, onClose, side = 'right', children, className }: SheetProps) {
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
      className="fixed inset-0 z-50 bg-warm-900/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn(
          'fixed flex flex-col bg-white shadow-xl w-full max-w-md',
          slideClasses[side],
          className,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

export function SheetHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center justify-between px-6 py-4 border-b border-warm-200', className)}
      {...props}
    />
  )
}

export function SheetTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn('text-lg font-semibold text-warm-900', className)}
      {...props}
    />
  )
}

export function SheetContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex-1 overflow-y-auto px-6 py-4', className)}
      {...props}
    />
  )
}

export function SheetFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center justify-end gap-3 border-t border-warm-200 px-6 py-4', className)}
      {...props}
    />
  )
}

export function SheetClose({ onClose, className }: { onClose: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className={cn(
        'rounded-md p-1 text-warm-400 transition-colors hover:text-warm-600',
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
