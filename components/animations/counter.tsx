'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

interface CounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function Counter({ target, suffix = '', prefix = '', duration = 2000, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setValue(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{value}{suffix}
    </span>
  )
}
