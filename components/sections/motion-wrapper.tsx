'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MotionWrapperProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function MotionWrapper({ children, delay = 0, className }: MotionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
