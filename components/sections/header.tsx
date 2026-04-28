'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Printer, ArrowRight, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/logo'
import { Container } from '@/components/ui/container'
import type { PublicContactInfo } from '@/lib/content/contact-cms'
import { mergeContactContent } from '@/lib/content/contact-cms'
import { telHrefFromDisplay, faxHrefFromDisplay } from '@/lib/content/tel-href'

const NAV_ITEMS = [
  { label: 'Startseite',  href: '/',           highlight: false },
  { label: 'Leistungen',  href: '/leistungen', highlight: false },
  { label: 'Über uns',    href: '/ueber-uns',  highlight: false },
  { label: 'Karriere',    href: '/karriere',   highlight: true  },
  { label: 'Kontakt',     href: '/kontakt',    highlight: false },
]

export function Header({ contact }: { contact?: PublicContactInfo }) {
  const c = contact ?? mergeContactContent(null)
  const tel = telHrefFromDisplay(c.phone)
  const fax = c.fax ? faxHrefFromDisplay(c.fax) : ''
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const hideMobileBewerbungCta =
    pathname.startsWith('/impressum') || pathname.startsWith('/datenschutz')

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* ── Navbar container — transitions between transparent and glass pill ── */}
        <motion.div
          animate={scrolled
            ? { y: 0 }
            : { y: 0 }
          }
          className={cn(
            'mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
            scrolled
              ? 'mx-3 mt-2.5 max-w-[1080px] rounded-[18px] border border-white/[0.55] bg-white/80 shadow-[0_4px_32px_rgba(0,0,0,0.07),0_1px_0_rgba(255,255,255,0.9)_inset] backdrop-blur-[28px] backdrop-saturate-[1.4] sm:mx-4 xl:mx-auto'
              : 'max-w-full bg-transparent'
          )}
        >
          <Container size={scrolled ? 'full' : 'xl'}>
            <nav
              className={cn(
                'flex items-center justify-between gap-2 transition-all duration-700',
                scrolled ? 'h-[52px] px-2' : 'h-[68px]'
              )}
              aria-label="Hauptnavigation"
            >

              {/* ── Logo — größe passt sich dem Scroll-State an ── */}
              <Link
                href="/"
                className="shrink-0 transition-opacity duration-300 hover:opacity-80"
                aria-label="Zur Startseite"
              >
                <Logo
                  size={scrolled ? 'sm' : 'md'}
                  variant="default"
                />
              </Link>

              {/* ── Right side: Nav items + Phone + CTA ── */}
              <div className="hidden items-center gap-0.5 lg:flex">

                {/* Nav items — rechtsbündig, links vom CTA */}
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'group relative rounded-[10px] px-3.5 py-2 text-[13.5px] font-[480] tracking-[-0.01em] transition-all duration-200',
                        item.highlight && !active
                          ? 'text-primary-600 hover:text-primary-500'
                          : active
                            ? 'text-warm-900'
                            : 'text-warm-500 hover:text-warm-900',
                      )}
                    >
                      {item.label}

                      {/* Active underline */}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3 -bottom-px h-[1.5px] rounded-full bg-primary-500"
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}

                      {/* Hover underline */}
                      {!active && (
                        <span className="absolute inset-x-3 -bottom-px h-[1.5px] scale-x-0 rounded-full bg-primary-400/40 transition-transform duration-300 group-hover:scale-x-100" />
                      )}

                    </Link>
                  )
                })}

                {/* Divider */}
                <div className="mx-1 h-4 w-px bg-warm-200" />

                {/* Phone */}
                <a
                  href={tel}
                  className="hidden items-center gap-1.5 text-[12.5px] font-[450] tracking-[-0.005em] text-warm-400 transition-colors duration-200 hover:text-warm-700 xl:flex"
                >
                  <Phone className="h-3 w-3" strokeWidth={1.7} />
                  {c.phone}
                </a>

                {/* Fax — nur sichtbar, wenn im CMS gepflegt */}
                {c.fax && (
                  <>
                    <div className="mx-1 hidden h-4 w-px bg-warm-200 xl:block" />
                    <a
                      href={fax}
                      className="hidden items-center gap-1.5 text-[12.5px] font-[450] tracking-[-0.005em] text-warm-400 transition-colors duration-200 hover:text-warm-700 xl:flex"
                      aria-label={`Fax: ${c.fax}`}
                    >
                      <Printer className="h-3 w-3" strokeWidth={1.7} />
                      <span className="text-warm-400">
                        <span className="text-warm-300">Fax</span> {c.fax}
                      </span>
                    </a>
                  </>
                )}

                <div className="mx-1 hidden h-4 w-px bg-warm-200 xl:block" />

                {/* Primary CTA */}
                <Link
                  href="/bewerbung"
                  className="group relative inline-flex h-8 items-center gap-1.5 overflow-hidden rounded-[10px] bg-primary-500 px-4 text-[13px] font-[580] tracking-[-0.01em] text-white shadow-[0_2px_16px_rgba(54,184,201,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-400 hover:bg-primary-400 hover:shadow-[0_4px_24px_rgba(54,184,201,0.35)]"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                  />
                  <Briefcase className="h-3 w-3 shrink-0" strokeWidth={1.7} />
                  Jetzt bewerben
                  <ArrowRight className="h-3 w-3 shrink-0 transition-transform duration-300 group-hover:translate-x-[2px]" />
                </Link>
              </div>

              {/* ── Mobile right: Burger only ── */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className={cn(
                  'inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] transition-colors duration-200 lg:hidden',
                  scrolled
                    ? 'text-warm-600 hover:bg-warm-100 hover:text-warm-900'
                    : 'text-warm-700 hover:bg-warm-100/70 hover:text-warm-900',
                )}
                aria-label="Menü öffnen"
              >
                <Menu className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </button>

            </nav>
          </Container>
        </motion.div>
      </header>

      {/* Spacer — matches nav height */}
      <div className="h-[68px]" />

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-[#080c10]/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 right-0 flex w-full max-w-[320px] flex-col bg-white shadow-[0_0_80px_rgba(0,0,0,0.15)]"
            >
              {/* Drawer header */}
              <div className="flex h-[64px] items-center justify-between border-b border-warm-100 px-5">
                <Logo size="sm" variant="default" />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] text-warm-400 transition-colors hover:bg-warm-50 hover:text-warm-700"
                  aria-label="Menü schließen"
                >
                  <X className="h-[17px] w-[17px]" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto px-3 py-4">
                <div className="space-y-0.5">
                  {NAV_ITEMS.map((item) => {
                    const active = item.href === '/' ? pathname === '/' : isActive(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'flex items-center justify-between rounded-[12px] px-4 py-3 text-[15px] transition-colors',
                          active
                            ? 'bg-warm-50 font-[560] text-warm-900'
                            : item.highlight
                              ? 'font-[500] text-primary-600 hover:bg-primary-50 hover:text-primary-700'
                              : 'font-[440] text-warm-500 hover:bg-warm-50 hover:text-warm-900',
                        )}
                      >
                        <span className="flex items-center gap-2.5">
                          {item.label}
                          {item.highlight && !hideMobileBewerbungCta && (
                            <span className="rounded-full bg-primary-100 px-1.5 py-0.5 text-[10px] font-[560] tracking-[0.03em] text-primary-600">
                              Jetzt bewerben
                            </span>
                          )}
                        </span>
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                        )}
                      </Link>
                    )
                  })}
                </div>

                {/* Mobile CTA block */}
                <div className="mt-5 space-y-2.5 border-t border-warm-100 pt-5">
                  <a
                    href={tel}
                    className="flex items-center gap-3 rounded-[12px] bg-primary-50 px-4 py-3 text-[14.5px] font-[510] text-primary-700 transition-colors hover:bg-primary-100"
                  >
                    <Phone className="h-4 w-4 shrink-0" strokeWidth={1.7} />
                    {c.phone}
                  </a>

                  {c.fax && (
                    <a
                      href={fax}
                      className="flex items-center gap-3 rounded-[12px] border border-warm-100 bg-white px-4 py-2.5 text-[13px] font-[460] text-warm-600 transition-colors hover:bg-warm-50 hover:text-warm-900"
                      aria-label={`Fax: ${c.fax}`}
                    >
                      <Printer className="h-3.5 w-3.5 shrink-0" strokeWidth={1.7} />
                      <span>
                        <span className="text-warm-400">Fax</span> {c.fax}
                      </span>
                    </a>
                  )}

                  {!hideMobileBewerbungCta && (
                    <Link
                      href="/bewerbung"
                      onClick={() => setMobileOpen(false)}
                      className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-[12px] bg-primary-500 px-4 py-3.5 text-[15px] font-[580] text-white shadow-[0_4px_20px_rgba(54,184,201,0.3)] transition-all hover:bg-primary-400"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                      />
                      <Briefcase className="h-4 w-4 shrink-0" strokeWidth={1.7} />
                      Jetzt bewerben
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-[2px]" />
                    </Link>
                  )}

                  <Link
                    href="/kontakt"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-[12px] border border-warm-200 px-4 py-3 text-[14.5px] font-[480] text-warm-600 transition-colors hover:bg-warm-50 hover:text-warm-900"
                  >
                    Pflege anfragen
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
