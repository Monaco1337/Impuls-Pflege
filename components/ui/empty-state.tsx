import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-6 text-center',
        className,
      )}
    >
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-warm-100 text-warm-400">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-warm-800">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-warm-500">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
