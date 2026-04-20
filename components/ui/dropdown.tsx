'use client'

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
} from 'react'
import { cn } from '@/lib/utils'

interface DropdownContextValue {
  open: boolean
  toggle: () => void
  close: () => void
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

function useDropdownContext() {
  const ctx = useContext(DropdownContext)
  if (!ctx) throw new Error('Dropdown compound components must be used within <Dropdown>')
  return ctx
}

export function Dropdown({ children, className }: { children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggle = useCallback(() => setOpen((v) => !v), [])
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close()
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open, close])

  return (
    <DropdownContext.Provider value={{ open, toggle, close }}>
      <div ref={containerRef} className={cn('relative inline-block', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export function DropdownTrigger({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { toggle, open } = useDropdownContext()

  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        className,
      )}
      onClick={toggle}
      aria-expanded={open}
      aria-haspopup="menu"
      {...props}
    >
      {children}
    </button>
  )
}

export interface DropdownContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'right'
}

export function DropdownContent({ align = 'right', className, ...props }: DropdownContentProps) {
  const { open } = useDropdownContext()
  if (!open) return null

  return (
    <div
      role="menu"
      className={cn(
        'absolute z-50 mt-1 min-w-[180px] rounded-lg border border-warm-200 bg-white py-1 shadow-lg',
        'animate-in fade-in zoom-in-95 duration-150',
        align === 'right' && 'right-0',
        align === 'left' && 'left-0',
        className,
      )}
      {...props}
    />
  )
}

export interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  destructive?: boolean
}

export function DropdownItem({ destructive, className, ...props }: DropdownItemProps) {
  const { close } = useDropdownContext()

  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        'flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors',
        'focus-visible:outline-none focus-visible:bg-warm-50',
        destructive
          ? 'text-error-500 hover:bg-error-50'
          : 'text-warm-700 hover:bg-warm-50',
        className,
      )}
      onClick={(e) => {
        props.onClick?.(e)
        close()
      }}
      {...props}
    />
  )
}

export function DropdownSeparator({ className }: { className?: string }) {
  return (
    <div
      role="separator"
      className={cn('my-1 h-px bg-warm-100', className)}
    />
  )
}
