import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'light'
  className?: string
}

// natural ratio: 1024 × 549
const heights = {
  sm: 36,   // scrolled pill nav (48px container)
  md: 44,   // default full nav (60px container)
  lg: 52,   // footer / large display
} as const

export function Logo({ size = 'md', variant = 'default', className }: LogoProps) {
  const h = heights[size]
  const w = Math.round(h * (1024 / 549))
  const src = variant === 'light' ? '/images/logo-white.png' : '/images/logo.png'

  return (
    <span
      className={cn('inline-flex shrink-0 select-none items-center', className)}
      aria-label="IMPULS Ambulanter Pflegedienst"
    >
      <Image
        src={src}
        alt="IMPULS Ambulanter Pflegedienst"
        width={w}
        height={h}
        className="h-auto w-auto object-contain"
        priority
      />
    </span>
  )
}
