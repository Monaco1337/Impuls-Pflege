'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const variants = {
  primary:
    'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm',
  secondary:
    'bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200',
  outline:
    'border border-warm-300 bg-white text-warm-700 hover:bg-warm-50 active:bg-warm-100',
  ghost:
    'text-warm-600 hover:bg-warm-100 active:bg-warm-200',
  destructive:
    'bg-error-500 text-white hover:bg-error-700 active:bg-error-700 shadow-sm',
} as const

const sizes = {
  sm: 'h-8 px-3 text-sm gap-1.5 rounded-md',
  md: 'h-10 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-12 px-6 text-base gap-2.5 rounded-lg',
} as const

export type ButtonVariant = keyof typeof variants
export type ButtonSize = keyof typeof sizes

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: ReactNode
  iconRight?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      icon,
      iconRight,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className,
        )}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : icon ? (
          <span className="shrink-0" aria-hidden="true">{icon}</span>
        ) : null}
        {children}
        {iconRight && !loading && (
          <span className="shrink-0" aria-hidden="true">{iconRight}</span>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
