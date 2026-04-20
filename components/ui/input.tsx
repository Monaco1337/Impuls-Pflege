'use client'

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, id: externalId, ...props }, ref) => {
    const generatedId = useId()
    const id = externalId ?? generatedId
    const errorId = `${id}-error`
    const helperId = `${id}-helper`

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-warm-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-warm-400" aria-hidden="true">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              'flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm text-warm-900',
              'placeholder:text-warm-400',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
              'disabled:cursor-not-allowed disabled:bg-warm-50 disabled:opacity-60',
              error
                ? 'border-error-500 focus:ring-error-500'
                : 'border-warm-300 hover:border-warm-400',
              icon ? 'pl-10' : false,
              className,
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            {...props}
          />
        </div>
        {error && (
          <p id={errorId} className="text-xs text-error-500" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="text-xs text-warm-500">
            {helperText}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
