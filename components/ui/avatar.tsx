'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export interface AvatarProps {
  src?: string | null
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
} as const

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function Avatar({ src, alt, name, size = 'md', className }: AvatarProps) {
  const [imgError, setImgError] = useState(false)
  const showImage = src && !imgError
  const initials = name ? getInitials(name) : '?'

  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full bg-primary-100 font-medium text-primary-700',
        sizeClasses[size],
        className,
      )}
      aria-label={alt ?? name}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? name ?? ''}
          className="h-full w-full rounded-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  )
}
