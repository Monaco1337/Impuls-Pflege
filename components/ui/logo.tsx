import { cn } from '@/lib/utils'

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: { heading: 'text-lg', sub: 'text-[10px]' },
  md: { heading: 'text-2xl', sub: 'text-xs' },
  lg: { heading: 'text-4xl', sub: 'text-sm' },
} as const

export function Logo({ size = 'md', className }: LogoProps) {
  const s = sizes[size]

  return (
    <span className={cn('inline-flex flex-col leading-none select-none', className)} aria-label="IMPULS Ambulanter Pflegedienst">
      <span className={cn('font-bold tracking-tight text-primary-500', s.heading)}>
        IMPULS
      </span>
      <span className={cn('font-medium tracking-widest uppercase text-warm-500', s.sub)}>
        Ambulanter Pflegedienst
      </span>
    </span>
  )
}
