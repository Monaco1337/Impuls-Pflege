'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Phone, Clock, Users, Shield, Star, Heart, MapPin } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/animations/fade-in'
import { TextReveal } from '@/components/animations/text-reveal'

// ── Brand palette ──────────────────────────────────────────────────────────────
const MINT    = '#18C1A3'
const MINT_LT = '#20C9AA'
const PINK    = '#F24B6A'

const VALUE_ITEMS = [
  { icon: Clock,  label: '24/7 erreichbar'         },
  { icon: Users,  label: 'Persönliche Betreuung'   },
  { icon: Shield, label: 'Erfahrenes Team'          },
  { icon: Star,   label: 'Individuelle Pflegepläne' },
] as const

const TRUST_ITEMS = [
  { value: '24/7', label: 'Erreichbar'   },
  { value: 'Team', label: 'Wertschätzend'},
  { value: 'Unna', label: '& Umgebung'  },
] as const

// ── Badge ──────────────────────────────────────────────────────────────────────
function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -1 }}
      className="inline-flex cursor-default items-center gap-2 rounded-full border bg-white px-4 py-2"
      style={{
        borderColor: 'rgba(0,0,0,0.08)',
        boxShadow: 'none',
      }}
    >
      <Heart
        className="h-3.5 w-3.5 shrink-0"
        style={{ color: MINT, fill: MINT }}
        strokeWidth={0}
      />
      <span className="flex items-center gap-1.5">
        {(['Pflege', 'Nähe', 'Vertrauen'] as const).map((word, i, arr) => (
          <React.Fragment key={word}>
            <span className="text-[12px] font-[500] tracking-[-0.01em]" style={{ color: '#1a1a1a' }}>
              {word}
            </span>
            {i < arr.length - 1 && (
              <span className="text-[11px]" style={{ color: '#b0b0b0' }} aria-hidden="true">·</span>
            )}
          </React.Fragment>
        ))}
      </span>
    </motion.div>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const imageY   = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '5%'])

  return (
    <section ref={sectionRef} className="hero-section relative isolate min-h-[100vh] overflow-hidden bg-[#F7FAFA]">

      {/* ── Background image ── */}
      <div className="absolute inset-0 -z-10">
        {/* Desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ y: imageY, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          transition={{
            opacity: { duration: 1.2, ease: 'easeOut' },
            scale:   { duration: 2.8, ease: [0.16, 1, 0.3, 1] },
          }}
          className="absolute inset-0 hidden lg:block"
        >
          <Image
            src="/images/hero-care.jpg"
            alt="Pflegekraft mit Patient und Angehöriger"
            fill
            className="object-cover object-center"
            priority
            quality={100}
            sizes="100vw"
          />
        </motion.div>

        {/* Mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="absolute inset-0 lg:hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <Image
            src="/images/hero-care-mobile.jpg"
            alt="Pflegekraft bei der Betreuung"
            fill
            className="object-cover object-[center_30%]"
            priority
            quality={100}
            sizes="100vw"
          />
        </motion.div>

        {/* Desktop: left-to-right overlay */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background: 'linear-gradient(100deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.92) 34%, rgba(255,255,255,0.62) 52%, rgba(255,255,255,0.14) 68%, rgba(255,255,255,0) 100%)',
          }}
        />
        {/* Mobile overlay */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
          }}
        />

        {/* Mint radial — behind text */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 h-[660px] w-[560px] -translate-y-1/2"
          style={{
            background: `radial-gradient(ellipse at 30% 50%, rgba(24,193,163,0.09) 0%, rgba(24,193,163,0.03) 50%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      </div>

      <Container size="xl">
        <motion.div
          style={{ y: contentY }}
          className="flex min-h-[100vh] items-center"
        >
          {/* ── Content column ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-full flex-col items-center pb-16 pt-32 text-center lg:w-[58%] lg:items-start lg:pb-24 lg:pl-[7%] lg:pt-0 lg:text-left xl:w-[54%] xl:pl-[10%]"
          >

            {/* Badge */}
            <HeroBadge />

            {/* Headline */}
            <div className="mt-8 w-full">
              <TextReveal delay={0.18}>
                <h1
                  className="text-[clamp(2rem,5.2vw,3.75rem)] font-[820] leading-[1.05] tracking-[-0.04em]"
                  style={{ color: '#0F172A' }}
                >
                  Pflege, die Menschen bewegt.
                </h1>
              </TextReveal>

              <TextReveal delay={0.30}>
                <h1
                  className="mt-2 text-[clamp(2rem,5.2vw,3.75rem)] font-[820] leading-[1.05] tracking-[-0.04em]"
                  style={{
                    color: MINT,
                    textShadow: `0 1px 4px rgba(255,255,255,0.95), 0 0 40px rgba(24,193,163,0.10)`,
                  }}
                >
                  Ein Arbeitsplatz,<br className="hidden sm:block" /> der Sinn schafft.
                </h1>
              </TextReveal>

              {/* Accent rule */}
              <FadeIn delay={0.42}>
                <div className="mt-7 flex items-center gap-2 justify-center lg:justify-start">
                  <div className="h-[1.5px] w-10 rounded-full" style={{ background: `linear-gradient(to right, ${PINK}, transparent)` }} />
                  <div className="h-[1.5px] w-24 rounded-full" style={{ background: `linear-gradient(to right, ${MINT}44, transparent)` }} />
                </div>
              </FadeIn>
            </div>

            {/* Subline */}
            <FadeIn delay={0.48}>
              <p
                className="mt-8 max-w-[460px] text-[clamp(0.98rem,1.4vw,1.08rem)] font-[440] leading-[1.82] tracking-[-0.01em]"
                style={{ color: '#334155' }}
              >
                Wir begleiten Menschen im Alltag – mit Respekt,
                Fachwissen und echter Menschlichkeit. Und wir suchen
                Pflegekräfte, die genauso denken.
              </p>
            </FadeIn>

            {/* Value pillars */}
            <FadeIn delay={0.55}>
              <div className="mt-7 w-full max-sm:mx-auto max-sm:max-w-[min(100%,24rem)]">
                <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3">
                {VALUE_ITEMS.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-start gap-2.5">
                    <div
                      className="mt-0.5 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: `linear-gradient(135deg, rgba(24,193,163,0.18) 0%, rgba(24,193,163,0.08) 100%)`,
                        boxShadow: `0 0 0 1px rgba(24,193,163,0.20)`,
                      }}
                    >
                      <Icon className="h-[11px] w-[11px]" style={{ color: MINT }} strokeWidth={2.2} />
                    </div>
                    <span
                      className="icon-list-prose text-[13.5px] font-[540] leading-none tracking-[-0.012em]"
                      style={{ color: '#1E293B' }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
                </div>
              </div>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.62}>
              <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
                <Link
                  href="/bewerbung"
                  className="group relative inline-flex h-[52px] w-full items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full pl-6 pr-2 text-[14px] font-[640] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.012] sm:w-auto sm:pl-7 sm:text-[15px]"
                  style={{
                    background: `linear-gradient(135deg, ${MINT} 0%, ${MINT_LT} 100%)`,
                    boxShadow: `0 8px 28px rgba(24,193,163,0.32), inset 0 1px 0 rgba(255,255,255,0.18)`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 14px 36px rgba(24,193,163,0.36), 0 0 0 4px rgba(24,193,163,0.10), inset 0 1px 0 rgba(255,255,255,0.20)`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = `0 8px 28px rgba(24,193,163,0.32), inset 0 1px 0 rgba(255,255,255,0.18)`
                  }}
                >
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-600 group-hover:translate-x-full" />
                  Jetzt Teil des Teams werden
                  <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.18] transition-all duration-300 group-hover:bg-white/[0.26]">
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2.2} />
                  </span>
                </Link>

                <Link
                  href="/kontakt"
                  className="group inline-flex h-[52px] w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full border bg-white/85 px-6 text-[14px] font-[500] tracking-[-0.01em] transition-all duration-300 hover:bg-white sm:w-auto"
                  style={{ borderColor: `rgba(24,193,163,0.35)`, color: '#475569' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `rgba(242,75,106,0.38)`
                    e.currentTarget.style.boxShadow   = `0 8px 24px rgba(242,75,106,0.10)`
                    e.currentTarget.style.color        = '#0F172A'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = `rgba(24,193,163,0.35)`
                    e.currentTarget.style.boxShadow   = ''
                    e.currentTarget.style.color        = '#475569'
                  }}
                >
                  <Phone className="h-[14px] w-[14px] shrink-0" style={{ color: MINT }} strokeWidth={1.8} />
                  Pflege unverbindlich anfragen
                </Link>
              </div>
            </FadeIn>

            {/* Trust strip */}
            <FadeIn delay={0.70}>
              <div
                className="mt-8 flex items-center gap-7 rounded-2xl px-6 py-4 sm:gap-10"
                style={{
                  background: 'rgba(255,255,255,0.82)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.70)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}
              >
                {TRUST_ITEMS.map((item, i) => (
                  <React.Fragment key={item.value}>
                    <div className="flex flex-col gap-0.5">
                      <p
                        className="text-[clamp(1.05rem,1.8vw,1.25rem)] font-[760] tracking-[-0.03em]"
                        style={{ color: MINT }}
                      >
                        {item.value}
                      </p>
                      <p
                        className="text-[10.5px] font-[540] uppercase tracking-[0.06em]"
                        style={{ color: '#64748b' }}
                      >
                        {item.label}
                      </p>
                    </div>
                    {i < TRUST_ITEMS.length - 1 && (
                      <div className="h-8 w-px" style={{ backgroundColor: 'rgba(24,193,163,0.18)' }} aria-hidden="true" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </FadeIn>

          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
