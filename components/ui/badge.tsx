import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

const variants = {
  default: 'bg-warm-100 text-warm-700',
  primary: 'bg-primary-50 text-primary-700',
  success: 'bg-success-50 text-success-700',
  warning: 'bg-warning-50 text-warning-700',
  error: 'bg-error-50 text-error-700',
  outline: 'border border-warm-300 text-warm-600 bg-transparent',
} as const

export type BadgeVariant = keyof typeof variants

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium leading-5',
        'transition-colors duration-150',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
