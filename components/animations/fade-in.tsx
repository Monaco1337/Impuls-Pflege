'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  duration?: number
  className?: string
  once?: boolean
}

const directionMap = {
  up: { y: 1, x: 0 },
  down: { y: -1, x: 0 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
} as const

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  distance = 32,
  duration = 0.9,
  className,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-80px' })
  const d = directionMap[direction]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: d.x * distance, y: d.y * distance }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: d.x * distance, y: d.y * distance }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
