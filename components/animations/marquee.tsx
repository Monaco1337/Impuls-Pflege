'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: ReactNode
  speed?: number
  className?: string
  reverse?: boolean
}

export function Marquee({ children, speed = 40, className, reverse = false }: MarqueeProps) {
  return (
    <div className={cn('flex overflow-hidden', className)}>
      <div
        className="marquee-animate flex shrink-0 items-center gap-12"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {children}
        {children}
      </div>
      <div
        className="marquee-animate flex shrink-0 items-center gap-12"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
        aria-hidden="true"
      >
        {children}
        {children}
      </div>
    </div>
  )
}
