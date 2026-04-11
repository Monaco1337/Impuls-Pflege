import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Render as a circle (e.g. for avatar placeholders) */
  circle?: boolean
}

export function Skeleton({ circle, className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-warm-200/60',
        circle ? 'rounded-full' : 'rounded-lg',
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  )
}
