'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function TextReveal({ children, delay = 0, className }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div
        initial={{ y: '110%', rotate: 2 }}
        animate={isInView ? { y: 0, rotate: 0 } : { y: '110%', rotate: 2 }}
        transition={{
          duration: 1,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
