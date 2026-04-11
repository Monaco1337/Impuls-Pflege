import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Reduce vertical padding */
  compact?: boolean
}

export function Section({ compact, className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        compact ? 'py-6 sm:py-8' : 'py-10 sm:py-16',
        className,
      )}
      {...props}
    />
  )
}
