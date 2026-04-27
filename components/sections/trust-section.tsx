'use client'

import { CmsImage } from '@/components/site-content/cms-image'
import { Heart, Users, Home, Shield, HandHeart, Clock } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/animations/fade-in'

// ── Brand tokens ─────────────────────────────────────────────────────────────
const MINT  = '#18C1A3'
const PINK  = '#F24B6A'

const pillars = [
  {
    icon: Users,
    title: 'Erfahrene Fachkräfte',
    description: 'Jede Pflegekraft bei IMPULS bringt jahrelange Erfahrung mit – und vor allem: echtes Herzblut.',
  },
  {
    icon: Heart,
    title: 'Persönliche Betreuung',
    description: 'Kein Dienstplan-Denken. Wir nehmen uns Zeit für den Menschen hinter der Diagnose.',
  },
  {
    icon: HandHeart,
    title: 'Individuelle Versorgung',
    description: 'Ihr Pflegeplan passt zu Ihrem Leben – nicht umgekehrt. Abgestimmt auf das, was wirklich zählt.',
  },
  {
    icon: Home,
    title: 'Vertrautes Zuhause',
    description: 'Das Vertraute gibt Kraft. Wir bringen die Pflege dorthin, wo Sie sich geborgen fühlen.',
  },
  {
    icon: Shield,
    title: 'Würde & Respekt',
    description: 'Würde ist keine Option – sie ist unser Grundsatz. In jedem Einsatz, ohne Ausnahme.',
  },
  {
    icon: Clock,
    title: 'Verlässlichkeit',
    description: 'Wenn Sie uns brauchen, sind wir da. Morgens, abends und auch am Wochenende.',
  },
]

const DEF_FEATURE = '/images/care-hands.jpg'

export function TrustSection({ featureImageSrc = DEF_FEATURE }: { featureImageSrc?: string } = {}) {
  return (
    <section
      className="relative overflow-hidden py-28 sm:py-36 lg:py-44"
      style={{ background: '#F7FAFA' }}
    >

      {/* ── Atmosphäre ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(24,193,163,0.06) 0%, transparent 65%)', filter: 'blur(70px)' }}
        />
        <div
          className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(242,75,106,0.04) 0%, transparent 65%)', filter: 'blur(80px)' }}
        />
      </div>

      <Container size="xl" className="relative z-[2]">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
              style={{ borderColor: 'rgba(24,193,163,0.25)', background: 'rgba(255,255,255,0.7)' }}
            >
              <Heart className="h-3 w-3 shrink-0" style={{ color: MINT }} strokeWidth={1.8} />
              <p className="text-[11px] font-[640] uppercase tracking-[0.18em]" style={{ color: MINT }}>
                Unsere Werte
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.07}>
            <h2
              className="mt-5 text-[clamp(1.85rem,3.8vw,3rem)] font-[790] leading-[1.07] tracking-[-0.045em]"
              style={{ color: '#0F172A' }}
            >
              Das ist unser Versprechen
              <br />
              <span style={{ color: MINT }}>an jeden Menschen.</span>
            </h2>
          </FadeIn>

          {/* Accent rule */}
          <FadeIn delay={0.12}>
            <div className="mt-5 flex items-center gap-2">
              <div className="h-[1.5px] w-6 rounded-full" style={{ background: `linear-gradient(to right, ${PINK}, transparent)` }} />
              <div className="h-[1.5px] w-14 rounded-full" style={{ background: `linear-gradient(to right, rgba(24,193,163,0.3), transparent)` }} />
            </div>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p
              className="mt-6 mx-auto max-w-[520px] text-[15.5px] font-[400] leading-[1.85] tracking-[-0.01em]"
              style={{ color: '#64748b' }}
            >
              Sechs Grundsätze, die bei IMPULS nicht auf dem Papier stehen –
              sondern täglich gelebt werden.
            </p>
          </FadeIn>
        </div>

        {/* ── Bento Grid ── */}
        <div className="mx-auto mt-14 grid max-w-[1120px] gap-4 lg:mt-16 lg:grid-cols-3">

          {/* Feature image card — spans 2 rows */}
          <FadeIn delay={0.08} className="lg:row-span-2">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-[22px] lg:min-h-0"
              style={{ boxShadow: '0 24px 60px -12px rgba(0,0,0,0.12)' }}
            >
              <CmsImage
                src={featureImageSrc}
                alt="Hände halten – Pflege mit Vertrauen"
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Mint top-accent line */}
              <div
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: `linear-gradient(to right, ${MINT}, rgba(24,193,163,0.3))` }}
              />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                {/* Label */}
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
                  style={{ background: 'rgba(24,193,163,0.18)', border: '1px solid rgba(24,193,163,0.30)' }}
                >
                  <Heart className="h-2.5 w-2.5" style={{ color: MINT }} strokeWidth={1.8} />
                  <span className="text-[10px] font-[600] uppercase tracking-[0.12em]" style={{ color: MINT }}>
                    IMPULS
                  </span>
                </div>
                <p className="text-[19px] font-[700] leading-[1.2] tracking-[-0.025em] text-white">
                  Pflege beginnt,<br />wo Vertrauen wächst.
                </p>
                <p className="mt-2.5 text-[13px] font-[400] leading-[1.65] text-white/70">
                  Jede gute Begleitung baut auf einer ehrlichen,
                  menschlichen Beziehung auf.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Pillar cards */}
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <FadeIn key={pillar.title} delay={0.07 + 0.06 * i}>
                <div
                  className="group relative h-full overflow-hidden rounded-[20px] border bg-white p-6 transition-all duration-500 hover:-translate-y-[2px] sm:p-7"
                  style={{
                    borderColor: 'rgba(0,0,0,0.06)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 16px 40px -8px rgba(24,193,163,0.12), 0 2px 12px rgba(0,0,0,0.04)`
                    e.currentTarget.style.borderColor = 'rgba(24,193,163,0.22)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'
                  }}
                >
                  {/* Top mint accent bar on hover */}
                  <div
                    className="absolute inset-x-0 top-0 h-[2.5px] rounded-t-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `linear-gradient(to right, ${MINT}, rgba(24,193,163,0.3))` }}
                  />

                  {/* Icon */}
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[10px] transition-colors duration-400"
                    style={{ background: 'rgba(247,250,250,1)' }}
                  >
                    <Icon
                      className="h-[18px] w-[18px] transition-colors duration-400"
                      style={{ color: 'rgba(24,193,163,0.55)' }}
                      strokeWidth={1.6}
                    />
                  </div>

                  <h3
                    className="mt-4 text-[15px] font-[660] leading-tight tracking-[-0.02em]"
                    style={{ color: '#0F172A' }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className="mt-2 text-[13.5px] font-[400] leading-[1.68] tracking-[-0.005em]"
                    style={{ color: '#64748b' }}
                  >
                    {pillar.description}
                  </p>
                </div>
              </FadeIn>
            )
          })}

        </div>

        {/* ── Bottom trust strip ── */}
        <FadeIn delay={0.3}>
          <div className="mx-auto mt-14 flex max-w-[860px] flex-col items-center justify-center gap-4 rounded-[20px] border px-8 py-6 sm:flex-row sm:gap-10"
            style={{
              borderColor: 'rgba(24,193,163,0.18)',
              background: 'rgba(255,255,255,0.7)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            }}
          >
            {[
              { num: '24/7',  text: 'Persönlich erreichbar' },
              { num: '100%',  text: 'Individuelle Pflegepläne' },
              { num: '15+',   text: 'Jahre Erfahrung in Unna' },
            ].map(({ num, text }, i) => (
              <div key={num} className="flex items-start gap-3">
                {i > 0 && (
                  <div className="hidden h-6 w-px sm:block" style={{ background: 'rgba(24,193,163,0.2)' }} />
                )}
                <span
                  className="icon-list-prose text-[1.35rem] font-[780] tracking-[-0.04em]"
                  style={{ color: MINT }}
                >
                  {num}
                </span>
                <span className="icon-list-prose text-[13px] font-[480]" style={{ color: '#475569' }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

      </Container>
    </section>
  )
}
