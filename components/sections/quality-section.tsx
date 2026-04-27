'use client'

import Link from 'next/link'
import { CmsImage } from '@/components/site-content/cms-image'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/animations/fade-in'
import { Counter } from '@/components/animations/counter'

const MINT = '#18C1A3'

const stats = [
  {
    value: 24,
    suffix: '/7',
    label: 'Erreichbarkeit',
    sub: 'Für Sie und Ihre Familie, wenn es darauf ankommt',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Individuelle Pflegeplanung',
    sub: 'Abgestimmt auf Ihre persönliche Lebenssituation',
  },
  {
    value: 15,
    suffix: '+',
    label: 'Jahre Erfahrung',
    sub: 'Kompetenz, auf die Sie langfristig vertrauen können',
  },
]

const points = [
  'Selbstbestimmung und Würde im Alltag',
  'Entlastung für pflegende Angehörige',
  'Verlässliche Begleitung auf Augenhöhe',
  'Strukturierte und sichere Versorgung',
  'Mehr Lebensqualität im eigenen Zuhause',
]

const DEF_SUPPORT = '/images/care-support.jpg'

export function QualitySection({ supportImageSrc = DEF_SUPPORT }: { supportImageSrc?: string } = {}) {
  return (
    <section
      className="relative overflow-hidden py-28 sm:py-36 lg:py-44"
      style={{ background: '#FAFAF9' }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(24,193,163,0.05) 0%, transparent 65%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      {/* Top hairline */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />

      <Container size="xl" className="relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-14">

          {/* ── Left column ── */}
          <div className="flex flex-col text-center lg:col-span-7 lg:justify-center lg:text-left">

            {/* Eyebrow */}
            <FadeIn>
              <p
                className="text-[11px] font-[680] uppercase tracking-[0.24em]"
                style={{ color: 'rgba(24,193,163,0.80)' }}
              >
                Unser Anspruch
              </p>
            </FadeIn>

            {/* Headline */}
            <FadeIn delay={0.07}>
              <h2
                className="mt-5 max-w-[560px] mx-auto text-[clamp(1.9rem,3.8vw,3rem)] font-[800] leading-[1.07] tracking-[-0.045em] lg:mx-0"
                style={{ color: '#0F172A' }}
              >
                Ihre Lebensqualität
                <br />
                steht im{' '}
                <span style={{ color: MINT }}>Mittelpunkt.</span>
              </h2>
            </FadeIn>

            {/* Accent rule */}
            <FadeIn delay={0.13}>
              <div className="mt-6 flex items-center justify-center gap-2 lg:justify-start">
                <div
                  className="h-[1.5px] w-6 rounded-full"
                  style={{ background: '#F24B6A' }}
                />
                <div
                  className="h-[1.5px] w-16 rounded-full"
                  style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.30), transparent)' }}
                />
              </div>
            </FadeIn>

            {/* Premium stat cards */}
            <div className="mt-10 grid grid-cols-3 gap-3">
              {stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={0.18 + 0.08 * i}>
                  <div
                    className="flex flex-col rounded-[18px] p-5 sm:p-6"
                    style={{
                      background: '#ffffff',
                      border: '1px solid rgba(0,0,0,0.06)',
                      boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                      borderTop: i === 0 ? `2px solid ${MINT}` : '1px solid rgba(0,0,0,0.06)',
                    }}
                  >
                    {/* Metric */}
                    <p
                      className="text-[clamp(1.9rem,3.6vw,2.7rem)] font-[830] leading-none tracking-[-0.05em]"
                      style={{ color: '#0F172A' }}
                    >
                      <Counter target={stat.value} className="tabular-nums" />
                      <span style={{ color: MINT }}>{stat.suffix}</span>
                    </p>

                    {/* Label */}
                    <p
                      className="mt-3 text-[12.5px] font-[660] leading-tight tracking-[-0.01em]"
                      style={{ color: '#0F172A' }}
                    >
                      {stat.label}
                    </p>

                    {/* Supporting text */}
                    <p
                      className="mt-1.5 text-[11.5px] font-[400] leading-[1.55] tracking-[-0.005em]"
                      style={{ color: '#94A3B8' }}
                    >
                      {stat.sub}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Body text */}
            <FadeIn delay={0.44}>
              <p
                className="mx-auto mt-10 max-w-[460px] text-[16px] font-[390] leading-[1.85] tracking-[-0.01em] lg:mx-0"
                style={{ color: '#475569' }}
              >
                Würde und Selbstbestimmung sind der Maßstab unseres Handelns.
                Wir unterstützen Menschen dabei, so eigenständig wie möglich
                in ihrem vertrauten Umfeld zu leben –{' '}
                <span className="font-[540]" style={{ color: '#334155' }}>
                  und entlasten Angehörige spürbar und nachhaltig.
                </span>
              </p>
            </FadeIn>

            {/* CTA */}
            <FadeIn delay={0.50}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-5 lg:justify-start">
                <Link
                  href="/ueber-uns"
                  className="group inline-flex items-center gap-2 text-[14px] font-[580] tracking-[-0.01em] transition-all duration-300"
                  style={{ color: MINT }}
                >
                  Mehr über uns erfahren
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: 'rgba(24,193,163,0.10)',
                      border: '1px solid rgba(24,193,163,0.20)',
                    }}
                  >
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2.2} />
                  </span>
                </Link>

                <div className="h-4 w-px" style={{ background: 'rgba(0,0,0,0.10)' }} />

                <Link
                  href="/kontakt"
                  className="text-[14px] font-[480] tracking-[-0.01em] transition-colors duration-300 hover:opacity-70"
                  style={{ color: '#64748B' }}
                >
                  Kontakt aufnehmen
                </Link>
              </div>
            </FadeIn>

          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-4 lg:col-span-5">

            {/* Image */}
            <FadeIn delay={0.18} direction="right" distance={28}>
              <div
                className="overflow-hidden"
                style={{
                  borderRadius: '24px',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.09)',
                }}
              >
                <CmsImage
                  src={supportImageSrc}
                  alt="Pflegerin unterstützt Patientin im Alltag"
                  width={640}
                  height={460}
                  className="w-full object-cover"
                  style={{ aspectRatio: '4/3', objectPosition: 'center 25%' }}
                  sizes="(min-width: 1024px) 36vw, 100vw"
                />
              </div>
            </FadeIn>

            {/* Premium benefit card */}
            <FadeIn delay={0.28} direction="right" distance={28}>
              <div
                className="rounded-[22px] p-7 sm:p-8"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.065)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.055)',
                }}
              >
                {/* Card eyebrow */}
                <p
                  className="text-[10.5px] font-[700] uppercase tracking-[0.22em]"
                  style={{ color: 'rgba(24,193,163,0.75)' }}
                >
                  Was Sie bei IMPULS spürbar erleben
                </p>

                {/* Divider */}
                <div
                  className="mt-4 h-px w-full"
                  style={{ background: 'rgba(0,0,0,0.055)' }}
                />

                {/* Points — mobile: centered block, icons one vertical line */}
                <ul className="icon-list-stack mt-5 space-y-4">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-3.5">
                      {/* Heart icon */}
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={MINT}
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-[2px] shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      <span
                        className="icon-list-prose min-w-0 flex-1 text-[14px] font-[490] leading-snug tracking-[-0.012em]"
                        style={{ color: '#1E293B' }}
                      >
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

          </div>
        </div>
      </Container>
    </section>
  )
}
