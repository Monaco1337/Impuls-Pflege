'use client'

import { forwardRef, useId, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  placeholder?: string
  options: SelectOption[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, error, helperText, placeholder, options, id: externalId, ...props },
    ref,
  ) => {
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
          <select
            ref={ref}
            id={id}
            className={cn(
              'flex h-10 w-full appearance-none rounded-lg border bg-white px-3 py-2 pr-10 text-sm text-warm-900',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
              'disabled:cursor-not-allowed disabled:bg-warm-50 disabled:opacity-60',
              error
                ? 'border-error-500 focus:ring-error-500'
                : 'border-warm-300 hover:border-warm-400',
              className,
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-warm-400" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
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

Select.displayName = 'Select'
