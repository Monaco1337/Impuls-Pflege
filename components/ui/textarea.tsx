'use client'

import { forwardRef, useId, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id: externalId, ...props }, ref) => {
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
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'flex min-h-[120px] w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-warm-900',
            'placeholder:text-warm-400',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
            'disabled:cursor-not-allowed disabled:bg-warm-50 disabled:opacity-60',
            'resize-y',
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
        />
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

Textarea.displayName = 'Textarea'
