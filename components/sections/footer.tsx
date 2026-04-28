'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  Phone,
  Printer,
  Mail,
  MapPin,
  ArrowUpRight,
  Heart,
  Clock,
  Shield,
  ChevronUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/container'
import { Logo } from '@/components/ui/logo'
import type { PublicContactInfo } from '@/lib/content/contact-cms'
import { mergeContactContent } from '@/lib/content/contact-cms'
import { telHrefFromDisplay, faxHrefFromDisplay } from '@/lib/content/tel-href'

const MINT = '#18C1A3'

const nav = {
  Leistungen: [
    { label: 'Grundpflege', href: '/leistungen#grundpflege' },
    { label: 'Behandlungspflege', href: '/leistungen#behandlungspflege' },
    { label: 'Betreuung', href: '/leistungen#betreuung' },
    { label: 'Hauswirtschaft', href: '/leistungen#hauswirtschaft' },
    { label: 'Verhinderungspflege', href: '/leistungen#verhinderungspflege' },
    { label: 'Pflegeberatung', href: '/leistungen#pflegeberatung' },
  ],
  Unternehmen: [
    { label: 'Über uns', href: '/ueber-uns' },
    { label: 'Karriere', href: '/karriere' },
    { label: 'Anamnesebogen', href: '/anamnesebogen' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
  Rechtliches: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ],
}

export function Footer({ contact }: { contact?: PublicContactInfo }) {
  const c = contact ?? mergeContactContent(null)
  const tel = telHrefFromDisplay(c.phone)
  const hoursOneLine = c.hours.replace(/\s*\n+\s*/g, ' · ')
  // Fax-Zeile nur anzeigen, wenn im CMS gepflegt — leerer String blendet aus.
  // `tel:`-Link ist auch für Fax üblich (Schema.org & Mobile-OS akzeptieren).
  const contactItems = [
    { icon: Phone, label: c.phone, href: tel } as { icon: typeof Phone; label: string; href: string | undefined },
    ...(c.fax
      ? [
          {
            icon: Printer,
            label: `Fax: ${c.fax}`,
            href: faxHrefFromDisplay(c.fax),
          },
        ]
      : []),
    { icon: Mail, label: c.email, href: `mailto:${c.email}` },
    { icon: MapPin, label: c.address, href: undefined },
    { icon: Clock, label: hoursOneLine, href: undefined },
  ]

  const mainRef = useRef<HTMLDivElement>(null)
  const mainInView = useInView(mainRef, { once: true, margin: '-16px' })

  return (
    <footer className="relative overflow-hidden" style={{ background: '#F7FAFA' }}>

      {/* Top mint accent line */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: 'linear-gradient(to right, transparent 0%, rgba(24,193,163,0.50) 30%, rgba(24,193,163,0.50) 70%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* ── Premium action bar ── */}
      <div
        className="relative border-b"
        style={{
          background: 'rgba(255,255,255,0.90)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: 'rgba(0,0,0,0.06)',
        }}
      >
        <Container size="xl">
          {/* Mobile / Tablet: ruhig, ohne Kartenrahmen · ab lg wie bisher die kompakte sm-Zeile */}
          <div className="py-8 sm:py-9 lg:py-3">
            <div
              className={cn(
                'mx-auto max-w-lg sm:max-w-none',
                'max-lg:max-w-none max-lg:rounded-none max-lg:border-0 max-lg:bg-transparent max-lg:px-0 max-lg:shadow-none',
                'rounded-[22px] border border-[rgba(0,0,0,0.07)] bg-[rgba(255,255,255,0.96)] px-5 py-5 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.12)] sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none',
              )}
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="max-lg:space-y-2 max-lg:text-left sm:space-y-0 sm:text-left">
                  <p
                    className="text-[17px] font-[650] leading-snug tracking-[-0.024em] text-[#0F172A] sm:text-[13px] sm:font-[440]"
                  >
                    <span className="sm:font-[660]">Persönlich für Sie da</span>
                    <span className="hidden sm:inline font-[440]" style={{ color: 'rgba(24,193,163,0.55)' }}> · </span>
                    <span className="hidden sm:inline font-[440]" style={{ color: '#475569' }}>
                      Rufen Sie an – wir melden uns zeitnah.
                    </span>
                  </p>
                  <p
                    className="text-[15px] font-[420] leading-[1.6] tracking-[-0.01em] text-[#64748b] sm:hidden"
                  >
                    Rufen Sie an – wir melden uns zeitnah.
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-2">
                  <a
                    href={tel}
                    className="inline-flex h-[3.25rem] w-full shrink-0 items-center justify-center gap-2 rounded-2xl px-6 text-[15px] font-[620] tracking-[-0.01em] text-white transition-transform duration-200 active:scale-[0.98] sm:h-9 sm:rounded-full sm:px-4 sm:text-[12.5px]"
                    style={{
                      background: 'linear-gradient(135deg, #18C1A3, #20C9AA)',
                      boxShadow: '0 4px 20px -4px rgba(24,193,163,0.45), 0 2px 8px -2px rgba(0,0,0,0.06)',
                    }}
                  >
                    <Phone className="h-4 w-4 sm:h-3.5 sm:w-3.5" strokeWidth={2} />
                    {c.phone}
                  </a>
                  <Link
                    href="/kontakt"
                    className="inline-flex h-[3.25rem] w-full shrink-0 items-center justify-center rounded-2xl border bg-white px-6 text-[15px] font-[560] tracking-[-0.01em] text-[#334155] transition-colors duration-200 active:scale-[0.98] sm:h-9 sm:rounded-full sm:px-4 sm:text-[12.5px]"
                    style={{ borderColor: 'rgba(0,0,0,0.10)' }}
                  >
                    Kontakt
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Main footer body ── */}
      <div ref={mainRef} className="relative">
        <Container size="xl">
          <div className="py-12 sm:py-14 lg:py-20">
            <div className="grid max-lg:grid-cols-1 max-lg:gap-14 lg:grid-cols-12 lg:gap-10 xl:gap-16">

              {/* ── Brand + Kontakt · mobil: zwei klare Blöcke untereinander · Desktop: unverändert ── */}
              <div className="order-first w-full lg:order-last lg:col-span-4 lg:col-start-9 lg:pl-8 xl:pl-12">

                <div className="pointer-events-none absolute hidden lg:block"
                  style={{
                    left: 'calc(66.666% - 1px)',
                    top: '0', height: '100%', width: '1px',
                    background: 'linear-gradient(to bottom, transparent, rgba(24,193,163,0.14) 20%, rgba(24,193,163,0.14) 80%, transparent)',
                  }}
                  aria-hidden="true"
                />

                {/* Mobile: Block 1 — Marke */}
                <div className="max-lg:flex max-lg:flex-col max-lg:items-start max-lg:gap-0 lg:contents">
                  <div className="max-lg:mb-10 max-lg:w-full lg:mb-0">
                    <Logo size="md" className="max-lg:origin-left lg:origin-left" />
                    <p
                      className="mt-5 max-w-[32rem] text-[15px] font-[420] leading-[1.75] tracking-[-0.012em] text-[#64748b] lg:mt-4 lg:max-w-[280px] lg:text-[14px] lg:leading-[1.72]"
                    >
                      Ambulante Pflege & Betreuung in Unna – mit Herz, Kompetenz und persönlicher Nähe.
                    </p>
                  </div>

                  {/* Mobile: Block 2 — Kontakt · Desktop: Liste unter Logo wie zuvor */}
                  <div
                    className={cn(
                      'flex flex-col gap-5 text-left lg:mt-6 lg:gap-3.5',
                    )}
                  >
                    {contactItems.map(({ icon: Icon, label, href }) => {
                      const inner = (
                        <div className="flex items-start gap-4 lg:gap-3">
                          <div
                            className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full lg:h-7 lg:w-7"
                            style={{ background: 'rgba(24,193,163,0.09)', border: '1px solid rgba(24,193,163,0.12)' }}
                          >
                            <Icon className="h-4 w-4 lg:h-3 lg:w-3" style={{ color: MINT }} strokeWidth={1.8} />
                          </div>
                          <span
                            className="icon-list-prose pt-1 text-[15px] font-[440] leading-snug tracking-[-0.012em] text-[#334155] lg:pt-0.5 lg:text-[13px] lg:text-[#475569]"
                          >
                            {label}
                          </span>
                        </div>
                      )
                      return href ? (
                        <a key={label} href={href} className="group block w-full transition-opacity hover:opacity-75">
                          {inner}
                        </a>
                      ) : (
                        <div key={label} className="w-full">{inner}</div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* ── Navigation · mobil: eine Spalte, Gruppen untereinander · Desktop: unverändert ── */}
              <div className="order-last grid max-lg:grid-cols-1 max-lg:justify-items-stretch max-lg:gap-12 max-lg:text-left sm:max-lg:gap-14 grid-cols-2 justify-items-center gap-x-6 gap-y-8 text-center sm:grid-cols-3 lg:order-first lg:col-span-8 lg:justify-items-stretch lg:gap-x-10 lg:gap-y-8 lg:text-left xl:gap-x-14">
                {Object.entries(nav).map(([title, links], colIndex) => (
                  <div key={title} className="w-full max-lg:max-w-none max-w-[200px] sm:max-w-none">
                    <div className="mb-5 flex items-center justify-start gap-2 lg:mb-4">
                      <span
                        className="hidden h-[2px] w-4 shrink-0 rounded-full lg:block"
                        style={{ background: 'linear-gradient(to right, #18C1A3, rgba(24,193,163,0.20))' }}
                        aria-hidden="true"
                      />
                      <p className="text-[11px] font-[650] uppercase tracking-[0.2em] text-[#64748b] lg:text-[10px] lg:font-[700] lg:tracking-[0.22em] lg:text-[rgba(24,193,163,0.75)]">
                        {title}
                      </p>
                    </div>
                    <ul className="max-lg:space-y-3.5 space-y-2.5">
                      {links.map((link, i) => (
                        <motion.li
                          key={link.href}
                          className="flex justify-start"
                          initial={{ opacity: 0, x: -6 }}
                          animate={mainInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.35, delay: 0.04 * colIndex + 0.03 * i, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Link
                            href={link.href}
                            className="group inline-flex items-center gap-1.5 py-0.5 text-[15px] font-[450] tracking-[-0.015em] text-[#475569] transition-all duration-200 hover:text-[#0F172A] lg:text-[14px] lg:text-[#64748b]"
                          >
                            <span className="relative">
                              {link.label}
                              <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-[rgba(24,193,163,0.45)] transition-transform duration-200 group-hover:scale-x-100" />
                            </span>
                            <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition-all duration-200 group-hover:opacity-55 group-hover:translate-x-px group-hover:-translate-y-px lg:h-2.5 lg:w-2.5" style={{ color: MINT }} />
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ── Trust · mobil: drei gleichmäßige Spalten nebeneinander · Desktop: Pills wie zuvor ── */}
          <div
            className="flex flex-row items-stretch justify-between gap-4 border-t px-0.5 py-10 lg:flex-wrap lg:items-center lg:justify-center lg:gap-3 lg:px-0 lg:py-6"
            style={{ borderColor: 'rgba(0,0,0,0.06)' }}
          >
            {[
              { icon: Shield, text: 'DSGVO-konform' },
              { icon: Heart, text: 'Pflege mit Herz' },
              { icon: Clock, text: '24/7 erreichbar' },
            ].map((b) => (
              <span
                key={b.text}
                className={cn(
                  'flex min-w-0 flex-1 flex-col items-center justify-start gap-2.5 text-balance text-center',
                  'text-[12px] font-[560] leading-[1.38] tracking-[-0.018em] text-[#334155]',
                  'max-lg:border-0 max-lg:bg-transparent max-lg:shadow-none',
                  'lg:inline-flex lg:w-auto lg:flex-none lg:flex-row lg:items-center lg:gap-1.5 lg:text-left lg:rounded-full lg:border lg:bg-white lg:px-3.5 lg:py-1.5 lg:text-[11.5px] lg:font-[540] lg:leading-normal lg:tracking-[0.04em] lg:text-[#475569] lg:shadow-[0_1px_4px_rgba(0,0,0,0.04)]',
                )}
                style={{ borderColor: 'rgba(0,0,0,0.07)' }}
              >
                <b.icon
                  className="h-5 w-5 shrink-0 lg:h-3 lg:w-3"
                  style={{ color: MINT }}
                  strokeWidth={2}
                />
                {b.text}
              </span>
            ))}
          </div>

          {/* ── Bottom bar · mobil: aufgeräumte Stapelfolge · Desktop: unverändert ── */}
          <div
            className="flex flex-col gap-6 border-t py-9 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-5"
            style={{ borderColor: 'rgba(0,0,0,0.06)' }}
          >
            <div className="flex max-lg:w-full max-lg:flex-col max-lg:items-start max-lg:gap-5 sm:flex-row sm:items-center sm:gap-5">
              <p className="text-[13px] font-[420] leading-snug tracking-[-0.01em] text-[#94a3b8] sm:text-[12px]">
                © {new Date().getFullYear()} IMPULS · Unna
              </p>
              <div className="hidden h-3 w-px sm:block" style={{ background: 'rgba(0,0,0,0.10)' }} aria-hidden="true" />
              <nav className="flex max-lg:w-full max-lg:flex-wrap max-lg:gap-x-6 max-lg:gap-y-2 items-center gap-4">
                <Link
                  href="/impressum"
                  className="text-[14px] font-[500] tracking-[-0.01em] text-[#64748b] transition-colors duration-200 hover:text-[#0F172A] sm:text-[12px] sm:font-[480]"
                >
                  Impressum
                </Link>
                <Link
                  href="/datenschutz"
                  className="text-[14px] font-[500] tracking-[-0.01em] text-[#64748b] transition-colors duration-200 hover:text-[#0F172A] sm:text-[12px] sm:font-[480]"
                >
                  Datenschutz
                </Link>
              </nav>
            </div>

            <div className="flex max-lg:w-full max-lg:items-center max-lg:justify-between items-center gap-3 sm:justify-end">
              <span className="flex items-center gap-1.5 text-[13px] font-[440] tracking-[-0.01em] text-[#94a3b8] sm:text-[12px]">
                Made with
                <Heart className="h-3.5 w-3.5 sm:h-3 sm:w-3" style={{ color: '#F24B6A' }} fill="#F24B6A" strokeWidth={0} />
                in Unna
              </span>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-200 hover:-translate-y-[1px] hover:border-[rgba(24,193,163,0.28)] hover:bg-[rgba(24,193,163,0.06)] sm:h-8 sm:w-8"
                style={{ borderColor: 'rgba(0,0,0,0.09)', background: '#ffffff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                aria-label="Nach oben scrollen"
              >
                <ChevronUp className="h-4 w-4 sm:h-3.5 sm:w-3.5" style={{ color: '#64748b' }} strokeWidth={2} />
              </button>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
