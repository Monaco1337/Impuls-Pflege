import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { telHrefFromDisplay } from '@/lib/content/tel-href'

interface PremiumCtaProps {
  eyebrow?: string
  headline?: string
  subtext?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  phone?: string
  trustItems?: string[]
  background?: string
}

const defaultTrustItems = [
  'Persönliche Beratung',
  'Unverbindlich & kostenlos',
  'Kurzfristige Termine',
  'Regionale Ansprechpartner',
]

export function PremiumCta({
  eyebrow = 'Persönliche Beratung',
  headline = 'Lassen Sie uns gemeinsam die passende Unterstützung finden.',
  subtext = 'Wir nehmen uns Zeit für Ihre Situation und beraten Sie persönlich, verständlich und unverbindlich.',
  primaryLabel = 'Jetzt unverbindlich anfragen',
  primaryHref = '/kontakt',
  secondaryLabel,
  secondaryHref,
  phone = '02303 2920589',
  trustItems = defaultTrustItems,
  background = '#F7FAFA',
}: PremiumCtaProps) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40" style={{ background }}>

      {/* Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[480px] w-[640px] -translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(24,193,163,0.08) 0%, transparent 65%)', filter: 'blur(60px)' }} />
        <div className="absolute -bottom-16 -right-16 h-[280px] w-[280px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(242,75,106,0.05) 0%, transparent 65%)', filter: 'blur(50px)' }} />
      </div>

      <div className="relative mx-auto max-w-[860px] px-6 sm:px-10">
        <FadeIn direction="up" distance={20}>
          <div
            className="relative overflow-hidden rounded-[32px] px-8 py-12 text-center sm:px-14 sm:py-16"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.07)',
              boxShadow: '0 16px 56px -10px rgba(0,0,0,0.09)',
            }}
          >
            {/* Top mint line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(to right, transparent, rgba(24,193,163,0.50), transparent)' }}
              aria-hidden="true" />

            {/* Heart badge */}
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: 'rgba(24,193,163,0.09)', border: '1px solid rgba(24,193,163,0.18)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#18C1A3" aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>

            {/* Eyebrow */}
            <p className="text-[11px] font-[660] uppercase tracking-[0.24em]"
              style={{ color: 'rgba(24,193,163,0.82)' }}>
              {eyebrow}
            </p>

            {/* Headline */}
            <h2
              className="mx-auto mt-4 max-w-[560px] text-[clamp(1.65rem,3.2vw,2.6rem)] font-[800] leading-[1.08] tracking-[-0.044em]"
              style={{ color: '#0F172A' }}
            >
              {headline}
            </h2>

            {/* Accent rule */}
            <div className="mx-auto mt-5 flex items-center justify-center gap-2">
              <div className="h-[1.5px] w-5 rounded-full"
                style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
              <div className="h-[1.5px] w-14 rounded-full"
                style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.30), transparent)' }} />
            </div>

            {/* Subtext */}
            <p className="mx-auto mt-6 max-w-[480px] text-[16px] font-[400] leading-[1.75] tracking-[-0.01em]"
              style={{ color: '#475569' }}>
              {subtext}
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-4">
              <Link
                href={primaryHref}
                className="group inline-flex w-full max-w-xs items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-[620] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_16px_36px_-6px_rgba(24,193,163,0.36)] lg:w-auto lg:max-w-none"
                style={{
                  background: 'linear-gradient(135deg, #18C1A3, #20C9AA)',
                  boxShadow: '0 6px 20px -4px rgba(24,193,163,0.28)',
                }}
              >
                {primaryLabel}
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
                  style={{ background: 'rgba(255,255,255,0.22)' }}
                >
                  <ArrowRight className="h-3.5 w-3.5 text-white" strokeWidth={2} />
                </span>
              </Link>

              {secondaryLabel && secondaryHref ? (
                <Link
                  href={secondaryHref}
                  className="group inline-flex w-full max-w-xs items-center justify-center gap-1.5 rounded-full border px-7 py-3.5 text-[15px] font-[520] tracking-[-0.01em] transition-all duration-300 hover:-translate-y-[1px] hover:border-[rgba(24,193,163,0.25)] hover:bg-[rgba(24,193,163,0.04)] lg:w-auto lg:max-w-none"
                  style={{ borderColor: 'rgba(0,0,0,0.09)', color: '#334155' }}
                >
                  {secondaryLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" style={{ color: '#18C1A3' }} />
                </Link>
              ) : (
                <a
                  href={telHrefFromDisplay(phone)}
                  className="group inline-flex w-full max-w-xs items-center justify-center gap-2.5 rounded-full border px-7 py-3.5 text-[15px] font-[520] tracking-[-0.01em] transition-all duration-300 hover:-translate-y-[1px] hover:border-[rgba(24,193,163,0.25)] hover:bg-[rgba(24,193,163,0.04)] lg:w-auto lg:max-w-none"
                  style={{ borderColor: 'rgba(0,0,0,0.09)', color: '#334155' }}
                >
                  <Phone className="h-4 w-4" style={{ color: '#18C1A3' }} strokeWidth={1.8} />
                  {phone}
                </a>
              )}
            </div>

            {/* Trust bar */}
            <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-2.5">
              {trustItems.map((item) => (
                <span
                  key={item}
                  className="whitespace-nowrap px-5 py-2.5 text-[12.5px] font-[500] tracking-[-0.01em]"
                  style={{
                    borderRadius: '100px',
                    background: 'rgba(255,255,255,0.70)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    color: '#64748b',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  )
}
