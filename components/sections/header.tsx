'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/logo'
import { Container } from '@/components/ui/container'
import { Sheet, SheetHeader, SheetContent, SheetClose } from '@/components/ui/sheet'

const navItems = [
  { label: 'Startseite', href: '/' },
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Karriere', href: '/karriere' },
  { label: 'Kontakt', href: '/kontakt' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-warm-100'
          : 'bg-white/60 backdrop-blur-sm',
      )}
    >
      <Container>
        <nav className="flex h-18 items-center justify-between lg:h-20" aria-label="Hauptnavigation">
          <Link href="/" className="shrink-0 transition-opacity hover:opacity-80" aria-label="Zur Startseite">
            <Logo size="md" />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) =>
              item.href === '/kontakt' ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'ml-3 inline-flex h-10 items-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors duration-200',
                    'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                  )}
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                    isActive(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-warm-600 hover:text-warm-900 hover:bg-warm-50',
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-lg text-warm-600 transition-colors lg:hidden',
              'hover:bg-warm-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
            )}
            aria-label="Menü öffnen"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </Container>

      {/* Mobile sheet */}
      <Sheet open={mobileOpen} onClose={() => setMobileOpen(false)} side="right">
        <SheetHeader>
          <Logo size="sm" />
          <SheetClose onClose={() => setMobileOpen(false)} />
        </SheetHeader>
        <SheetContent className="flex flex-col gap-1 px-4 py-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                isActive(item.href)
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-warm-700 hover:bg-warm-50 hover:text-warm-900',
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 border-t border-warm-200 pt-4">
            <a
              href="tel:+492303123456"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-primary-600 transition-colors hover:bg-primary-50"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              02303 / 123 456
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
