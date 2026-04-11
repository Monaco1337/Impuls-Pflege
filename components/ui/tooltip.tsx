'use client'

import { useState, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface TooltipProps {
  content: ReactNode
  children: ReactNode
  side?: 'top' | 'bottom'
  className?: string
}

export function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setVisible(true), 200)
  }

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setVisible(false)
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={cn(
            'absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-warm-800 px-2.5 py-1 text-xs text-white shadow-lg',
            'pointer-events-none animate-in fade-in duration-150',
            side === 'top' && 'bottom-full mb-2',
            side === 'bottom' && 'top-full mt-2',
            className,
          )}
        >
          {content}
        </span>
      )}
    </span>
  )
}
