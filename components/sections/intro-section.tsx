'use client'

import { useRef } from 'react'
import { CmsImage } from '@/components/site-content/cms-image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Heart } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'

// ── Brand tokens ─────────────────────────────────────────────────────────────
const MINT = '#18C1A3'
const PINK = '#F24B6A'

// ── Stat cards ───────────────────────────────────────────────────────────────
const stats = [
  { value: '24/7',  label: 'Persönlich erreichbar' },
  { value: '100%',  label: 'Individuelle Pflege' },
  { value: '15+',   label: 'Jahre Erfahrung' },
]

const DEF_IMG = '/images/care-editorial.jpg'

const DEF_EYEBROW = 'Über IMPULS'
const DEF_HEADLINE = 'Menschlichkeit ist\nkeine Zusatzleistung.'
const DEF_BODY =
  'IMPULS ist mehr als ein Pflegedienst. Wir sind der verlässliche\nBegleiter, der morgens da ist – und der am Abend ans Telefon geht.\n\nJede Beziehung bei uns beginnt mit Zuhören. Wir lernen zuerst den\nMenschen kennen – erst dann entsteht der Pflegeplan. Weil echte\nFürsorge nur wächst, wenn Vertrauen an erster Stelle steht.'
const DEF_QUOTE =
  '„Pflege ist dann wirklich gut, wenn man vergisst, dass man gepflegt wird – und nur noch spürt, dass jemand wirklich für einen da ist."'
const DEF_QUOTE_BY = 'Das IMPULS-Versprechen'

export function IntroSection({
  imageSrc = DEF_IMG,
  eyebrow = DEF_EYEBROW,
  headline = DEF_HEADLINE,
  body = DEF_BODY,
  quote = DEF_QUOTE,
  quoteBy = DEF_QUOTE_BY,
}: {
  imageSrc?: string
  eyebrow?: string
  headline?: string
  body?: string
  quote?: string
  quoteBy?: string
} = {}) {
  const nl = headline.indexOf('\n')
  const headlineMain = nl >= 0 ? headline.slice(0, nl) : headline
  const headlineAccent = nl >= 0 ? headline.slice(nl + 1) : ''
  const bodyParas = body.split(/\n\n+/).filter(Boolean)
  const afterBodyDelay = 0.17 + Math.max(1, bodyParas.length) * 0.05
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 sm:py-32 lg:py-36"
      style={{ background: '#F7FAFA' }}
    >

      {/* ── Atmosphäre ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(24,193,163,0.07) 0%, transparent 65%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute -right-32 top-1/3 h-[500px] w-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(24,193,163,0.04) 0%, transparent 65%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute -bottom-20 right-16 h-[340px] w-[340px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(242,75,106,0.05) 0%, transparent 65%)', filter: 'blur(70px)' }}
        />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 xl:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-28">

          {/* ── Linke Spalte: Bild ── */}
          <FadeIn direction="left" distance={28}>
            <div className="relative">

              {/* Mint glow hinter dem Bild */}
              <div
                className="absolute -inset-4 rounded-[36px]"
                style={{ background: 'radial-gradient(ellipse at 40% 50%, rgba(24,193,163,0.09) 0%, transparent 70%)', filter: 'blur(24px)' }}
                aria-hidden="true"
              />

              {/* Image frame */}
              <div
                className="relative overflow-hidden rounded-[28px] sm:rounded-[32px]"
                style={{ boxShadow: '0 24px 80px -12px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.03)' }}
              >
                <motion.div style={{ y: imageY }} className="absolute inset-0 scale-[1.10]">
                  <CmsImage
                    src={imageSrc}
                    alt="Pflegekraft im einfühlsamen Gespräch mit einem Patienten"
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/[0.06] via-transparent to-transparent" />
                <div className="relative aspect-[4/5]" />
              </div>

              {/* Floating trust badge */}
              <FadeIn delay={0.35} direction="up" distance={14}>
                <div
                  className="absolute -bottom-5 -left-4 z-10 sm:-left-6"
                  style={{
                    background: 'rgba(255,255,255,0.82)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: '18px',
                    border: '1px solid rgba(24,193,163,0.28)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  {/* Icon — ohne Box */}
                  <Heart className="h-[15px] w-[15px] shrink-0" style={{ color: PINK }} strokeWidth={1.8} />

                  {/* Text */}
                  <div>
                    <p
                      className="text-[13.5px] leading-tight tracking-[-0.02em]"
                      style={{ fontWeight: 720, color: '#0F172A' }}
                    >
                      Echte Nähe
                    </p>
                    <p
                      className="mt-[3px] text-[12px] leading-tight tracking-[-0.005em]"
                      style={{ fontWeight: 500, color: '#475569' }}
                    >
                      Vertrauen von Anfang an
                    </p>
                  </div>
                </div>
              </FadeIn>

            </div>
          </FadeIn>

          {/* ── Rechte Spalte: Text ── */}
          <div className="flex flex-col text-center lg:text-left">

            {/* Label */}
            <FadeIn direction="right" distance={20}>
              <div className="flex items-center justify-center gap-2.5 lg:justify-start">
                <Heart className="h-3 w-3 shrink-0" style={{ color: MINT }} strokeWidth={1.8} />
                <p
                  className="text-[11px] font-[640] uppercase tracking-[0.22em]"
                  style={{ color: 'rgba(24,193,163,0.8)' }}
                >
                  {eyebrow}
                </p>
              </div>
            </FadeIn>

            {/* Headline — editorial, zwei Zeilen, starke Aussage */}
            <FadeIn direction="right" distance={20} delay={0.08}>
              <h2
                className="mt-4 text-[clamp(2rem,3.8vw,3rem)] font-[790] leading-[1.07] tracking-[-0.045em]"
                style={{ color: '#0F172A' }}
              >
                {headlineAccent ? (
                  <>
                    {headlineMain}
                    <br />
                    <span style={{ color: MINT }}>{headlineAccent}</span>
                  </>
                ) : (
                  headlineMain
                )}
              </h2>
            </FadeIn>

            {/* Accent divider */}
            <FadeIn direction="right" distance={20} delay={0.13}>
              <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
                <div className="h-[1.5px] w-6 rounded-full" style={{ background: `linear-gradient(to right, ${PINK}, transparent)` }} />
                <div className="h-[1.5px] w-14 rounded-full" style={{ background: `linear-gradient(to right, rgba(24,193,163,0.3), transparent)` }} />
              </div>
            </FadeIn>

            {/* Intro — Absätze aus CMS (Trenner: Leerzeile) */}
            {bodyParas.map((para, i) => (
              <FadeIn key={i} direction="right" distance={20} delay={0.17 + i * 0.05}>
                <p
                  className={i === 0 ? 'mt-6 text-[16px] font-[520] leading-[1.75] tracking-[-0.015em]' : 'mt-4 text-[15px] font-[390] leading-[1.88] tracking-[-0.01em]'}
                  style={{ color: i === 0 ? '#334155' : '#64748b' }}
                >
                  {para.replace(/\n/g, ' ')}
                </p>
              </FadeIn>
            ))}

            {/* Stat cards */}
            <FadeIn direction="right" distance={20} delay={afterBodyDelay + 0.05}>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {stats.map(({ value, label }) => (
                  <div
                    key={value}
                    className="flex flex-col gap-0.5 rounded-[14px] border bg-white px-3.5 py-3.5"
                    style={{
                      borderColor: 'rgba(0,0,0,0.06)',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                    }}
                  >
                    <span
                      className="text-[1.4rem] font-[780] leading-none tracking-[-0.04em]"
                      style={{ color: MINT }}
                    >
                      {value}
                    </span>
                    <span className="mt-1 text-[11.5px] font-[480] leading-[1.4]" style={{ color: '#64748b' }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Zitat */}
            <FadeIn direction="right" distance={20} delay={afterBodyDelay + 0.11}>
              <div
                className="mt-8 rounded-[14px] border-l-[2.5px] bg-white px-5 py-4"
                style={{
                  borderColor: PINK,
                  boxShadow: '0 2px 14px rgba(0,0,0,0.04)',
                }}
              >
                <p
                  className="text-[14.5px] font-[440] italic leading-[1.75] tracking-[-0.01em]"
                  style={{ color: '#475569' }}
                >
                  {quote}
                </p>
                <p className="mt-2.5 text-[11.5px] font-[560] tracking-[0.06em] uppercase" style={{ color: MINT }}>
                  {quoteBy}
                </p>
              </div>
            </FadeIn>

            {/* CTAs */}
            <FadeIn direction="right" distance={20} delay={afterBodyDelay + 0.17}>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link
                  href="/ueber-uns"
                  className="group inline-flex items-center gap-2 rounded-full border border-warm-200 bg-white px-5 py-2.5 text-[13.5px] font-[520] tracking-[-0.01em] text-warm-600 shadow-sm transition-all duration-300 hover:border-warm-300 hover:shadow-md hover:text-warm-900"
                >
                  Mehr erfahren
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-[2px]" />
                </Link>
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-[580] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[1px]"
                  style={{
                    background: `linear-gradient(135deg, ${MINT}, #20C9AA)`,
                    boxShadow: '0 4px 20px rgba(24,193,163,0.28)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(242,75,106,0.15), 0 4px 20px rgba(24,193,163,0.20)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(24,193,163,0.28)'
                  }}
                >
                  <Heart className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
                  Pflege anfragen
                </Link>
              </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </section>
  )
}
