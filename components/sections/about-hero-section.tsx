'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'

const MINT = '#18C1A3'
const PINK = '#F24B6A'

export function AboutHeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const imageY   = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '3%'])

  return (
    <section
      ref={sectionRef}
      className="hero-section relative min-h-[100svh] overflow-hidden"
    >

      {/* ── Fullscreen background image ── */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: imageY }}
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1.0 }}
        transition={{
          opacity: { duration: 1.4, ease: 'easeOut' },
          scale:   { duration: 3.0, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <Image
          src="/images/about-hero.jpg"
          alt="Pflegekraft mit älterer Dame und Angehörigem"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* ── Gradient overlays for text readability ── */}

      {/* Desktop: soft left-to-right white gradient — strong behind text, fades to transparent right */}
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(100deg, rgba(247,250,250,0.92) 0%, rgba(247,250,250,0.82) 28%, rgba(247,250,250,0.52) 50%, rgba(247,250,250,0.15) 68%, rgba(247,250,250,0) 100%)',
        }}
      />

      {/* Mobile: top-to-bottom soft white overlay */}
      <div
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(to bottom, rgba(247,250,250,0.94) 0%, rgba(247,250,250,0.88) 45%, rgba(247,250,250,0.70) 70%, rgba(247,250,250,0.40) 100%)',
        }}
      />

      {/* Bottom blend into next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background: 'linear-gradient(to top, #ffffff 0%, transparent 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 xl:px-16">
        <motion.div
          style={{ y: contentY }}
          className="flex flex-col items-center justify-center py-28 pb-36 text-center lg:min-h-[100svh] lg:max-w-[50%] lg:items-start lg:py-36 lg:text-left"
        >

          {/* Badge */}
          <FadeIn direction="up" distance={16}>
            <div
              className="inline-flex items-center self-center lg:self-start"
              style={{
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.80)',
                border: '1px solid rgba(0,0,0,0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <Heart style={{ width: 16, height: 16, flexShrink: 0, fill: MINT, color: MINT }} strokeWidth={0} />
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.2px',
                  color: '#334155',
                  whiteSpace: 'nowrap',
                }}
              >
                Pflege · Nähe · Vertrauen
              </span>
            </div>
          </FadeIn>

          {/* Headline */}
          <FadeIn direction="up" distance={22} delay={0.10}>
            <h1
              className="mt-7 text-[clamp(2.5rem,5vw,3.9rem)] font-[800] leading-[1.04] tracking-[-0.048em]"
              style={{ color: '#0F172A' }}
            >
              Pflege aus
              <br />Überzeugung.
              <br />
              <span style={{ color: MINT }}>
                Für Menschen gemacht.
              </span>
            </h1>
          </FadeIn>

          {/* Accent rule */}
          <FadeIn direction="up" distance={14} delay={0.18}>
            <div className="mt-6 flex items-center justify-center gap-2 lg:justify-start">
              <div className="h-[1.5px] w-6 rounded-full"
                style={{ background: `linear-gradient(to right, ${PINK}, transparent)` }} />
              <div className="h-[1.5px] w-16 rounded-full"
                style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.35), transparent)' }} />
            </div>
          </FadeIn>

          {/* Subtext */}
          <FadeIn direction="up" distance={18} delay={0.23}>
            <p
              className="mt-6 max-w-[430px] text-[15.5px] font-[420] leading-[1.85] tracking-[-0.01em] lg:mx-0 mx-auto"
              style={{ color: '#334155' }}
            >
              IMPULS steht für ambulante Pflege, die Nähe, Verlässlichkeit
              und fachliche Qualität miteinander verbindet. Für Menschen, die
              zuhause gut versorgt sein wollen – und für Pflegekräfte, die
              mit Haltung arbeiten möchten.
            </p>
          </FadeIn>

          {/* CTAs */}
          <FadeIn direction="up" distance={16} delay={0.31}>
            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="/kontakt"
                className="group relative inline-flex h-[52px] items-center gap-3 overflow-hidden rounded-[13px] pl-6 pr-2 text-[14.5px] font-[640] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[1px]"
                style={{
                  background: `linear-gradient(135deg, ${MINT} 0%, #20C9AA 100%)`,
                  boxShadow: `0 6px 24px rgba(24,193,163,0.30), inset 0 1px 0 rgba(255,255,255,0.15)`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-[600ms] group-hover:translate-x-full"
                />
                <Heart className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
                Pflege anfragen
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-white/[0.18] transition-all duration-300 group-hover:bg-white/[0.28]">
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2.2} />
                </span>
              </Link>

              <Link
                href="/karriere"
                className="group inline-flex h-[52px] items-center gap-2 rounded-[13px] border px-6 text-[14.5px] font-[540] tracking-[-0.01em] transition-all duration-300 hover:-translate-y-[1px]"
                style={{
                  borderColor: 'rgba(0,0,0,0.12)',
                  color: '#334155',
                  background: 'rgba(255,255,255,0.70)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(24,193,163,0.32)'
                  e.currentTarget.style.boxShadow   = '0 4px 18px rgba(24,193,163,0.10)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'
                  e.currentTarget.style.boxShadow   = '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                Karriere entdecken
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2} />
              </Link>
            </div>
          </FadeIn>

          {/* Trust strip — mobil: Karten mit Kontrast, ab lg: kompakte Zeile */}
          <FadeIn direction="up" distance={12} delay={0.40}>
            <div className="mt-10 flex w-full max-w-md flex-col gap-3 lg:max-w-none lg:flex-row lg:flex-wrap lg:items-center lg:justify-start lg:gap-x-5 lg:gap-y-2">
              {[
                { num: '15+',  text: 'Jahre Erfahrung' },
                { num: '24/7', text: 'Erreichbar'      },
                { num: '100%', text: 'Herzblut'        },
              ].map(({ num, text }, i) => (
                <div
                  key={num}
                  className="flex w-full items-center gap-3 rounded-[18px] border border-[rgba(0,0,0,0.08)] bg-[rgba(255,255,255,0.93)] px-4 py-3.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] backdrop-blur-md lg:w-auto lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none lg:backdrop-blur-none"
                >
                  {i > 0 && (
                    <div
                      className="mr-1 hidden h-3.5 w-px lg:block"
                      style={{ background: 'rgba(24,193,163,0.35)' }}
                    />
                  )}
                  <span
                    className="min-w-[2.75rem] text-[1.125rem] font-[800] tabular-nums tracking-[-0.035em] lg:min-w-0 lg:text-[15px] lg:font-[760]"
                    style={{ color: MINT }}
                  >
                    {num}
                  </span>
                  <span
                    className="text-[14px] font-[580] leading-snug tracking-[-0.015em] text-[#1e293b] lg:text-[12.5px] lg:font-[470] lg:text-[#475569]"
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>

        </motion.div>
      </div>

    </section>
  )
}
