'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

type Props = {
  href: string
  /** Screenreader & Mittelklick: kurze Beschreibung der Zeile */
  label: string
  children: React.ReactNode
  className?: string
}

export function AdminDataTableRow({ href, label, children, className }: Props) {
  const router = useRouter()

  const navigate = useCallback(
    (e: React.MouseEvent) => {
      if (e.metaKey || e.ctrlKey) {
        window.open(href, '_blank', 'noopener,noreferrer')
        return
      }
      router.push(href)
    },
    [href, router],
  )

  return (
    <TableRow
      variant="plain"
      tabIndex={0}
      role="link"
      aria-label={`Details öffnen: ${label}`}
      className={cn(
        'group relative cursor-pointer select-none border-l-[3px] border-l-transparent',
        'transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out',
        'hover:border-l-primary-500 hover:bg-gradient-to-r hover:from-primary-50/90 hover:to-white',
        'hover:shadow-[inset_0_0_0_1px_rgba(38,179,194,0.12)]',
        'active:scale-[0.998] active:brightness-[0.99]',
        'focus-visible:border-l-primary-600 focus-visible:bg-primary-50/70 focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-primary-500/35 focus-visible:ring-inset',
        className,
      )}
      onClick={navigate}
      onMouseEnter={() => router.prefetch(href)}
      onAuxClick={(e) => {
        if (e.button === 1) {
          e.preventDefault()
          window.open(href, '_blank', 'noopener,noreferrer')
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          if (e.metaKey || e.ctrlKey) {
            window.open(href, '_blank', 'noopener,noreferrer')
          } else {
            router.push(href)
          }
        }
      }}
    >
      {children}
    </TableRow>
  )
}
