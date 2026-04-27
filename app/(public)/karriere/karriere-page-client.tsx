'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CmsImage } from '@/components/site-content/cms-image'
import { motion } from 'framer-motion'
import {
  Heart,
  Users,
  GraduationCap,
  Banknote,
  Clock,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Briefcase,
  Sparkles,
  Phone,
  Quote,
} from 'lucide-react'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/animations/fade-in'
import { TextReveal } from '@/components/animations/text-reveal'
import { PremiumCta } from '@/components/sections/premium-cta'
import { KarriereQuiz } from '@/components/sections/karriere-quiz'

const staticJobs = [
  {
    id: '1',
    title: 'Pflegefachkraft (m/w/d)',
    slug: 'pflegefachkraft',
    employmentType: 'Vollzeit / Teilzeit',
    location: 'Unna',
    shortIntro: 'Werden Sie Teil unseres engagierten Pflegeteams und begleiten Sie Menschen mit Herz und Fachkompetenz in ihrem Zuhause.',
  },
  {
    id: '2',
    title: 'Pflegehilfskraft (m/w/d)',
    slug: 'pflegehilfskraft',
    employmentType: 'Teilzeit / Minijob',
    location: 'Unna',
    shortIntro: 'Unterstützen Sie unser Team in der täglichen Pflege und Betreuung – auch als Quereinsteiger mit Herz willkommen.',
  },
  {
    id: '3',
    title: 'Betreuungskraft (m/w/d)',
    slug: 'betreuungskraft',
    employmentType: 'Teilzeit',
    location: 'Unna',
    shortIntro: 'Schenken Sie Menschen wertvolle Zeit – durch aktivierende Betreuung und einfühlsame Begleitung im Alltag.',
  },
  {
    id: '4',
    title: 'Hauswirtschaftskraft (m/w/d)',
    slug: 'hauswirtschaftskraft',
    employmentType: 'Minijob / Teilzeit',
    location: 'Unna',
    shortIntro: 'Sorgen Sie für ein gepflegtes Zuhause unserer Klienten – mit Sorgfalt, Zuverlässigkeit und einem freundlichen Wesen.',
  },
]

const benefits = [
  {
    icon: Heart,
    title: 'Sinnstiftende Arbeit',
    description: 'Jeden Tag einen echten Unterschied im Leben von Menschen machen – das ist mehr als ein Job.',
  },
  {
    icon: Users,
    title: 'Wertschätzendes Team',
    description: 'Kollegiales Miteinander, flache Hierarchien und ein Umfeld, in dem Sie gehört werden.',
  },
  {
    icon: GraduationCap,
    title: 'Fort- & Weiterbildung',
    description: 'Regelmäßige Schulungen und gezielte Förderung Ihrer fachlichen und persönlichen Entwicklung.',
  },
  {
    icon: Banknote,
    title: 'Faire Vergütung',
    description: 'Leistungsgerechte Bezahlung, Zuschläge und attraktive Zusatzleistungen, die Sie verdienen.',
  },
  {
    icon: Clock,
    title: 'Flexible Arbeitszeiten',
    description: 'Arbeitszeitmodelle, die sich wirklich an Ihre Lebenssituation und Familie anpassen.',
  },
  {
    icon: ShieldCheck,
    title: 'Sichere Perspektive',
    description: 'Unbefristeter Arbeitsvertrag mit echten Entwicklungsmöglichkeiten in einer krisensicheren Branche.',
  },
]

const testimonials = [
  {
    quote: 'Bei IMPULS habe ich nicht nur einen Job gefunden – sondern eine Berufung. Die Wertschätzung im Team und die Zeit für unsere Patienten machen den Unterschied.',
    name: 'Sandra M.',
    role: 'Pflegefachkraft',
    years: '4 Jahre im Team',
  },
  {
    quote: 'Ich wurde als Quereinsteigerin herzlich aufgenommen. Die Einarbeitung war intensiv, die Unterstützung konstant – und heute kann ich mir keinen schöneren Beruf vorstellen.',
    name: 'Thomas K.',
    role: 'Pflegehilfskraft',
    years: '2 Jahre im Team',
  },
  {
    quote: 'Flexibilität und Familienfreundlichkeit sind bei IMPULS kein leeres Versprechen. Ich kann Beruf und Familie wirklich gut verbinden.',
    name: 'Aylin S.',
    role: 'Betreuungskraft',
    years: '3 Jahre im Team',
  },
]

export type KarrierePageClientProps = {
  siteImages: Record<string, string>
}

export function KarrierePageClient({ siteImages }: KarrierePageClientProps) {
  const jobs = staticJobs

  return (
    <>
      {/* ─── Hero (light) ─── */}
      <section className="relative isolate overflow-hidden" style={{ background: '#F7FAFA' }}>

        {/* Soft background glows */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute left-0 top-0 h-[700px] w-[600px]"
            style={{ background: 'radial-gradient(ellipse at 20% 30%, rgba(24,193,163,0.09) 0%, transparent 65%)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 right-1/3 h-[400px] w-[500px]"
            style={{ background: 'radial-gradient(ellipse, rgba(242,75,106,0.04) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        </div>

        {/* Top mint accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
          style={{ background: 'linear-gradient(to right, transparent, rgba(24,193,163,0.50), transparent)' }}
          aria-hidden="true" />

        <Container size="xl">
          <div className="grid items-center gap-12 pb-20 pt-18 sm:pb-28 sm:pt-24 lg:grid-cols-2 lg:gap-16 lg:pb-32 lg:pt-28">

            {/* Left: content */}
            <div className="flex flex-col text-center lg:text-left">
              {/* Eyebrow */}
              <FadeIn>
                <div className="inline-flex items-center justify-center self-center rounded-full border px-4 py-2 lg:self-start"
                  style={{ borderColor: 'rgba(24,193,163,0.22)', background: 'rgba(255,255,255,0.90)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <span className="text-[11px] font-[600] uppercase tracking-[0.22em]"
                    style={{ color: 'rgba(24,193,163,0.85)' }}>
                    Karriere bei IMPULS
                  </span>
                </div>
              </FadeIn>

              {/* Headline */}
              <div className="mt-7">
                <TextReveal delay={0.1}>
                  <h1 className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-[820] leading-[1.02] tracking-[-0.044em]"
                    style={{ color: '#0F172A' }}>
                    Pflege mit Herz.
                  </h1>
                </TextReveal>
                <TextReveal delay={0.16}>
                  <h1 className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-[820] leading-[1.02] tracking-[-0.044em]"
                    style={{ color: '#18C1A3' }}>
                    Karriere mit Perspektive.
                  </h1>
                </TextReveal>
              </div>

              {/* Accent rule */}
              <FadeIn delay={0.30}>
                <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
                  <div className="h-[1.5px] w-5 rounded-full" style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
                  <div className="h-[1.5px] w-14 rounded-full" style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.35), transparent)' }} />
                </div>
              </FadeIn>

              {/* Subtext */}
              <FadeIn delay={0.36}>
                <p className="mt-6 mx-auto max-w-[480px] text-[clamp(0.98rem,1.4vw,1.08rem)] font-[400] leading-[1.80] tracking-[-0.01em] lg:mx-0"
                  style={{ color: '#475569' }}>
                  Werden Sie Teil eines Teams, das Zeit für Menschen hat –
                  mit echten Werten, fairen Bedingungen und einem
                  respektvollen Miteinander.
                </p>
              </FadeIn>

              {/* CTAs */}
              <FadeIn delay={0.44}>
                <div className="mt-9 flex flex-col items-center gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:justify-start lg:gap-3">
                  {/* 1 – Primary */}
                  <a
                    href="#stellen"
                    className="group inline-flex h-[54px] w-full max-w-xs items-center justify-center gap-3 rounded-full pl-7 pr-2.5 text-[15px] font-[640] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_16px_36px_-6px_rgba(24,193,163,0.38)] lg:w-auto lg:max-w-none"
                    style={{ background: 'linear-gradient(135deg, #18C1A3, #20C9AA)', boxShadow: '0 6px 20px -4px rgba(24,193,163,0.30)' }}
                  >
                    Offene Stellen ansehen
                    <span className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-[1.06]"
                      style={{ background: 'rgba(255,255,255,0.20)' }}>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2} />
                    </span>
                  </a>

                  {/* 2 – Secondary */}
                  <Link
                    href="/bewerbung"
                    className="group inline-flex h-[54px] w-full max-w-xs items-center justify-center gap-2.5 rounded-full border px-7 text-[15px] font-[510] tracking-[-0.01em] transition-all duration-300 hover:-translate-y-[1px] hover:border-[rgba(24,193,163,0.28)] hover:bg-[rgba(24,193,163,0.04)] lg:w-auto lg:max-w-none"
                    style={{ borderColor: 'rgba(0,0,0,0.10)', color: '#334155', background: 'rgba(255,255,255,0.85)' }}
                  >
                    <Sparkles className="h-4 w-4" style={{ color: '#18C1A3' }} strokeWidth={1.7} />
                    Initiativbewerbung
                  </Link>

                  {/* 3 – Quiz smart CTA */}
                  <Link
                    href="/karriere#quiz-section"
                    className="group relative inline-flex h-[54px] w-full max-w-xs items-center justify-center gap-2.5 rounded-full border px-6 text-[14.5px] font-[510] tracking-[-0.01em] transition-all duration-300 hover:-translate-y-[1px] hover:border-[rgba(24,193,163,0.35)] hover:bg-[rgba(24,193,163,0.05)] hover:shadow-[0_8px_24px_rgba(24,193,163,0.14)] lg:w-auto lg:max-w-none"
                    style={{ borderColor: 'rgba(24,193,163,0.22)', color: '#0d7460', background: 'rgba(24,193,163,0.04)' }}
                  >
                    {/* Compass icon */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#18C1A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 transition-transform duration-300 group-hover:rotate-12">
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                    </svg>
                    Passende Stelle finden
                  </Link>
                </div>

                {/* Micro hint */}
                <p className="mt-4 text-[12px] font-[430] tracking-[-0.005em]" style={{ color: '#94A3B8' }}>
                  <span style={{ color: 'rgba(24,193,163,0.70)' }}>✓</span> unverbindlich
                  {'  '}
                  <span style={{ color: 'rgba(24,193,163,0.70)' }}>✓</span> 4 Fragen
                  {'  '}
                  <span style={{ color: 'rgba(24,193,163,0.70)' }}>✓</span> sofort Ergebnis
                </p>
              </FadeIn>

              {/* Trust badges */}
              <FadeIn delay={0.54}>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Unbefristete Verträge', 'Wertschätzendes Team', 'Flexible Arbeitszeiten', 'Faire Vergütung'].map((t) => (
                    <span key={t}
                      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-[490]"
                      style={{ borderColor: 'rgba(0,0,0,0.07)', background: 'rgba(255,255,255,0.88)', color: '#475569', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#18C1A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                      {t}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right: premium photo */}
            <FadeIn delay={0.22} direction="right" distance={32}>
              <div className="relative">
                {/* Mint glow behind image */}
                <div className="pointer-events-none absolute -inset-4 rounded-[36px]"
                  style={{ background: 'radial-gradient(ellipse, rgba(24,193,163,0.10) 0%, transparent 70%)', filter: 'blur(24px)' }}
                  aria-hidden="true" />

                <div className="relative overflow-hidden rounded-[28px]"
                  style={{ boxShadow: '0 24px 64px -12px rgba(0,0,0,0.14)' }}>
                  <CmsImage
                    src={siteImages.karriereHero || '/images/care-karriere-hero.jpg'}
                    alt="Pflegeleitung begrüßt neue Mitarbeiterin bei IMPULS"
                    width={700}
                    height={840}
                    className="w-full object-cover"
                    style={{ aspectRatio: '5/6' }}
                    priority
                    sizes="(min-width: 1024px) 48vw, 100vw"
                  />
                  {/* Subtle light overlay for editorial feel */}
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.14) 100%)' }} />
                </div>

                {/* Floating trust card */}
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-5 -left-6 overflow-hidden rounded-[20px] border bg-white px-5 py-4 sm:-left-8"
                  style={{ borderColor: 'rgba(0,0,0,0.07)', boxShadow: '0 12px 40px -8px rgba(0,0,0,0.12)' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{ background: 'linear-gradient(135deg, #18C1A3, #20C9AA)' }}>
                      <Briefcase className="h-4.5 w-4.5 text-white" strokeWidth={1.8} />
                    </div>
                    <div className="icon-list-prose min-w-0">
                      <p className="text-[13px] font-[700] leading-tight tracking-[-0.015em]" style={{ color: '#0F172A' }}>
                        Jetzt bewerben
                      </p>
                      <p className="mt-0.5 text-[11px] font-[440]" style={{ color: '#94a3b8' }}>
                        Offene Stellen in Unna
                      </p>
                    </div>
                  </div>
                </motion.div>

              </div>
            </FadeIn>

          </div>
        </Container>
      </section>

      {/* ─── Benefits ─── */}
      <section className="relative bg-white py-28 sm:py-36 lg:py-44">
        <Container size="xl">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">

            {/* Left sticky col */}
            <div className="text-center lg:col-span-5 lg:sticky lg:top-28 lg:self-start lg:text-left">
              <FadeIn>
                <p className="text-[11px] font-[660] uppercase tracking-[0.22em]"
                  style={{ color: 'rgba(24,193,163,0.80)' }}>
                  Warum IMPULS
                </p>
              </FadeIn>
              <FadeIn delay={0.06}>
                <h2 className="mt-5 mx-auto max-w-xl text-[clamp(1.8rem,3.5vw,2.85rem)] font-[800] leading-[1.10] tracking-[-0.038em] lg:mx-0"
                  style={{ color: '#0F172A' }}>
                  Mehr als ein
                  <br />Arbeitsplatz.
                  <br />
                  <span style={{ color: '#18C1A3' }}>Ein Team, das</span>
                  <br />Sie trägt.
                </h2>
              </FadeIn>

              {/* Accent rule */}
              <FadeIn delay={0.10}>
                <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
                  <div className="h-[1.5px] w-5 rounded-full" style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
                  <div className="h-[1.5px] w-14 rounded-full" style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.30), transparent)' }} />
                </div>
              </FadeIn>

              <FadeIn delay={0.14}>
                <p className="mt-5 mx-auto max-w-sm text-[15.5px] font-[390] leading-[1.78] tracking-[-0.01em] lg:mx-0"
                  style={{ color: '#475569' }}>
                  Bei IMPULS erwartet Sie ein Umfeld, in dem Sie wachsen,
                  wirken und wirklich gehört werden.
                </p>
              </FadeIn>

              <FadeIn delay={0.22}>
                <div className="mt-10 overflow-hidden rounded-[24px] shadow-[0_16px_48px_-10px_rgba(0,0,0,0.12)]">
                  <CmsImage
                    src={siteImages.karriereSmile || '/images/care-smile.jpg'}
                    alt="Teamarbeit bei IMPULS"
                    width={600}
                    height={400}
                    className="h-auto w-full object-cover"
                    sizes="(min-width: 1024px) 35vw, 100vw"
                  />
                </div>
              </FadeIn>

              {/* Mini stats */}
              <FadeIn delay={0.28}>
                <div className="mt-7 grid max-w-md grid-cols-2 gap-3 lg:max-w-none mx-auto lg:mx-0">
                  {[['100 %', 'Unbefristete Stellen'], ['5+', 'Jahre Erfahrung']].map(([n, l]) => (
                    <div key={l} className="rounded-[16px] border p-4"
                      style={{ borderColor: 'rgba(0,0,0,0.07)', background: '#FAFAFA' }}>
                      <p className="text-[22px] font-[800] tracking-[-0.04em]" style={{ color: '#18C1A3' }}>{n}</p>
                      <p className="mt-0.5 text-[12px] font-[450] leading-snug" style={{ color: '#64748b' }}>{l}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right benefit cards */}
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit, i) => {
                  const Icon = benefit.icon
                  return (
                    <FadeIn key={benefit.title} delay={0.05 * i}>
                      <motion.div
                        whileHover={{ y: -4, boxShadow: '0 20px 56px -12px rgba(0,0,0,0.10)' }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative h-full overflow-hidden rounded-[20px] border bg-white p-6 sm:p-7"
                        style={{ borderColor: 'rgba(0,0,0,0.07)' }}
                      >
                        {/* Mint hover glow */}
                        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{ background: 'radial-gradient(ellipse at top left, rgba(24,193,163,0.05) 0%, transparent 60%)' }}
                          aria-hidden="true" />

                        <div className="relative">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-400 group-hover:scale-[1.06]"
                            style={{ background: 'rgba(24,193,163,0.08)', border: '1.5px solid rgba(24,193,163,0.15)' }}>
                            <Icon className="h-5 w-5 transition-colors duration-400"
                              style={{ color: '#18C1A3' }} strokeWidth={1.6} />
                          </div>
                          <h3 className="mt-5 text-[15px] font-[700] tracking-[-0.022em]" style={{ color: '#0F172A' }}>
                            {benefit.title}
                          </h3>
                          <p className="mt-2 text-[13.5px] font-[390] leading-[1.72] tracking-[-0.005em]"
                            style={{ color: '#64748b' }}>
                            {benefit.description}
                          </p>
                        </div>
                      </motion.div>
                    </FadeIn>
                  )
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Testimonial ─── */}
      <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: '#F7FAFA' }}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: 'rgba(0,0,0,0.055)' }} />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2"
            style={{ background: 'radial-gradient(ellipse, rgba(24,193,163,0.07) 0%, transparent 65%)', filter: 'blur(60px)' }} />
        </div>

        <Container size="xl" className="relative">
          <div className="grid gap-5 sm:grid-cols-3">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={0.07 * i}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-full flex-col overflow-hidden rounded-[24px] border bg-white p-7"
                  style={{ borderColor: 'rgba(0,0,0,0.07)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
                >
                  {/* Quote icon */}
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ background: 'rgba(24,193,163,0.08)', border: '1.5px solid rgba(24,193,163,0.18)' }}>
                    <Quote className="h-4.5 w-4.5" style={{ color: '#18C1A3' }} strokeWidth={1.8} />
                  </div>

                  <p className="flex-1 text-[14.5px] font-[430] italic leading-[1.72] tracking-[-0.01em]"
                    style={{ color: '#334155' }}>
                    &bdquo;{t.quote}&ldquo;
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t pt-5"
                    style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-[700] text-[13px] text-white"
                      style={{ background: 'linear-gradient(135deg, #18C1A3, #20C9AA)' }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-[13px] font-[620] tracking-[-0.01em]" style={{ color: '#0F172A' }}>{t.name}</p>
                      <p className="text-[11.5px] font-[440]" style={{ color: '#94a3b8' }}>{t.role} · {t.years}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </Container>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px" style={{ background: 'rgba(0,0,0,0.055)' }} />
      </section>

      {/* ─── Quiz ─── */}
      <KarriereQuiz />

      {/* ─── Open positions ─── */}
      <section id="stellen" className="relative scroll-mt-24 bg-white py-28 sm:py-36 lg:py-44">
        <Container size="xl">

          {/* Section header */}
          <div className="flex flex-col items-center text-center">
            <FadeIn>
              <p className="text-[11px] font-[660] uppercase tracking-[0.22em]"
                style={{ color: 'rgba(24,193,163,0.80)' }}>
                Offene Stellen
              </p>
            </FadeIn>
            <FadeIn delay={0.06}>
              <h2 className="mt-5 mx-auto max-w-lg text-[clamp(1.75rem,3.5vw,2.75rem)] font-[800] leading-[1.10] tracking-[-0.038em]"
                style={{ color: '#0F172A' }}>
                Finden Sie Ihre Position
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-4 mx-auto max-w-md text-[15.5px] font-[390] leading-[1.75] tracking-[-0.01em]"
                style={{ color: '#64748b' }}>
                Entdecken Sie aktuelle Stellen bei IMPULS und werden Sie Teil
                eines Teams, das Sie wirklich unterstützt.
              </p>
            </FadeIn>
          </div>

          {/* Job cards */}
          {jobs.length > 0 ? (
            <div className="mx-auto mt-14 max-w-[920px] space-y-3 lg:mt-16">
              {jobs.map((job, i) => (
                <FadeIn key={job.id} delay={0.06 * i}>
                  <motion.div
                    whileHover={{ y: -2, boxShadow: '0 16px 48px -10px rgba(0,0,0,0.10)' }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={`/karriere/${job.slug}`}
                      className="group flex items-center justify-between gap-6 overflow-hidden rounded-[20px] border border-[rgba(0,0,0,0.08)] bg-white p-6 transition-colors duration-300 hover:border-[rgba(24,193,163,0.30)] sm:p-8"
                    >
                      {/* Mint left accent line */}
                      <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] origin-left scale-y-0 rounded-full transition-transform duration-400 group-hover:scale-y-100"
                        style={{ background: 'linear-gradient(to bottom, #18C1A3, rgba(24,193,163,0.30))' }}
                        aria-hidden="true" />

                      <div className="min-w-0 flex-1">
                        <h3 className="text-[17px] font-[700] tracking-[-0.025em] text-[#0F172A] transition-colors duration-300 group-hover:text-[#0d7460]">
                          {job.title}
                        </h3>
                        <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
                          <span className="inline-flex items-center rounded-full px-3 py-1 text-[11.5px] font-[580] tracking-[0.01em]"
                            style={{ background: 'rgba(24,193,163,0.08)', color: '#0d7460', border: '1px solid rgba(24,193,163,0.18)' }}>
                            {job.employmentType}
                          </span>
                          <span className="flex items-center gap-1.5 text-[13px] font-[440]"
                            style={{ color: '#94a3b8' }}>
                            <MapPin className="h-3.5 w-3.5" strokeWidth={1.7} />
                            {job.location}
                          </span>
                        </div>
                        <p className="mt-3.5 max-w-2xl text-[14px] font-[390] leading-[1.68] tracking-[-0.005em]"
                          style={{ color: '#64748b' }}>
                          {job.shortIntro}
                        </p>
                      </div>

                      {/* Arrow CTA */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-[#FAFAFA] transition-all duration-300 group-hover:scale-[1.06] group-hover:border-[rgba(24,193,163,0.35)] group-hover:bg-[rgba(24,193,163,0.07)]">
                        <ArrowRight className="h-4.5 w-4.5 transition-all duration-300 group-hover:translate-x-[2px]"
                          style={{ color: '#18C1A3' }} strokeWidth={2} />
                      </div>
                    </Link>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn delay={0.1}>
              <div className="mx-auto mt-14 flex max-w-lg flex-col items-center rounded-[24px] border py-16 text-center lg:mt-16"
                style={{ borderColor: 'rgba(0,0,0,0.07)', background: '#FAFAFA' }}>
                <div className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: 'rgba(24,193,163,0.08)', border: '1.5px solid rgba(24,193,163,0.18)' }}>
                  <Briefcase className="h-6 w-6" style={{ color: '#18C1A3' }} strokeWidth={1.6} />
                </div>
                <p className="mt-5 text-[17px] font-[700] tracking-[-0.025em]" style={{ color: '#0F172A' }}>
                  Aktuell keine offenen Stellen
                </p>
                <p className="mt-2 max-w-sm text-[14.5px] font-[390] leading-[1.65]" style={{ color: '#64748b' }}>
                  Senden Sie uns gerne eine Initiativbewerbung.
                </p>
                <Link
                  href="/bewerbung"
                  className="group mt-6 inline-flex items-center gap-1.5 text-[14px] font-[560] tracking-[-0.01em] transition-colors duration-300"
                  style={{ color: '#18C1A3' }}>
                  Initiativbewerbung senden
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </FadeIn>
          )}

          {/* Premium Initiativbewerbung card */}
          <FadeIn delay={0.22}>
            <div
              className="mx-auto mt-6 max-w-[920px] overflow-hidden rounded-[24px]"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.07)',
                boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
              }}
            >
              {/* Mint top accent */}
              <div
                className="h-[2px] w-full"
                style={{ background: 'linear-gradient(to right, #18C1A3, rgba(24,193,163,0.15))' }}
              />

              <div className="p-8 sm:p-10">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">

                  {/* Left: text + tags */}
                  <div className="flex-1 text-center lg:text-left">
                    <p
                      className="text-[11px] font-[680] uppercase tracking-[0.24em]"
                      style={{ color: 'rgba(24,193,163,0.80)' }}
                    >
                      Initiativ bewerben
                    </p>

                    <h3
                      className="mt-3 text-[clamp(1.2rem,2.2vw,1.45rem)] font-[780] leading-[1.18] tracking-[-0.032em]"
                      style={{ color: '#0F172A' }}
                    >
                      Keine passende Stelle gefunden?
                    </h3>
                    <p
                      className="mt-2.5 mx-auto max-w-[460px] text-[15px] font-[400] leading-[1.72] tracking-[-0.01em] lg:mx-0"
                      style={{ color: '#64748B' }}
                    >
                      Wir sind immer offen für engagierte Menschen, die mit Herz
                      und Haltung in der Pflege arbeiten möchten.
                    </p>

                    {/* Role tags */}
                    <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                      {[
                        'Pflegefachkraft',
                        'Pflegehilfskraft',
                        'Betreuungskraft',
                        'Hauswirtschaft',
                        'Ausbildung',
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full px-4 py-[7px] text-[12.5px] font-[540] tracking-[-0.005em]"
                          style={{
                            background: 'rgba(24,193,163,0.07)',
                            border: '1px solid rgba(24,193,163,0.18)',
                            color: '#0d7460',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: CTAs */}
                  <div className="flex w-full shrink-0 flex-col items-center gap-3 lg:w-auto lg:items-stretch lg:gap-3">
                    <Link
                      href="/bewerbung"
                      className="group inline-flex h-[52px] w-full max-w-xs items-center justify-center gap-2.5 rounded-full px-7 text-[14.5px] font-[640] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_16px_36px_-6px_rgba(24,193,163,0.38)] lg:w-full lg:max-w-none"
                      style={{
                        background: 'linear-gradient(135deg, #18C1A3, #20C9AA)',
                        boxShadow: '0 6px 22px -4px rgba(24,193,163,0.30)',
                      }}
                    >
                      Initiativbewerbung starten
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2} />
                    </Link>

                    <Link
                      href="/kontakt"
                      className="inline-flex h-[52px] w-full max-w-xs items-center justify-center gap-2 rounded-full border px-7 text-[14px] font-[510] tracking-[-0.01em] transition-all duration-300 hover:border-[rgba(24,193,163,0.28)] hover:bg-[rgba(24,193,163,0.03)] lg:w-full lg:max-w-none"
                      style={{ borderColor: 'rgba(0,0,0,0.09)', color: '#334155' }}
                    >
                      Kontakt aufnehmen
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ─── Premium CTA ─── */}
      <PremiumCta
        eyebrow="Initiativbewerbung"
        headline="Keine passende Stelle dabei?"
        subtext="Wir sind immer auf der Suche nach engagierten Menschen, die unsere Leidenschaft für gute Pflege teilen. Bewerben Sie sich initiativ – wir freuen uns auf Ihre Unterlagen."
        primaryLabel="Initiativbewerbung senden"
        primaryHref="/bewerbung"
        secondaryLabel="Stellenangebote ansehen"
        secondaryHref="/karriere"
        trustItems={['Sicherer Arbeitsplatz', 'Fort- & Weiterbildungen', 'Familiäres Team', 'Faire Vergütung']}
      />

      {/* ─── Mobile sticky CTA ─── */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div className="border-t px-4 py-3 backdrop-blur-xl"
          style={{ background: 'rgba(255,255,255,0.92)', borderColor: 'rgba(0,0,0,0.08)' }}>
          <div className="flex items-center gap-2">
            <Link href="/bewerbung"
              className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-[14px] font-[640] text-white transition-all active:scale-[0.97]"
              style={{ background: 'linear-gradient(135deg, #18C1A3, #20C9AA)', boxShadow: '0 4px 16px rgba(24,193,163,0.30)' }}>
              <Briefcase className="h-4 w-4" strokeWidth={1.8} />
              Jetzt bewerben
            </Link>
            <a href="tel:+4923032920589"
              className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border transition-colors"
              style={{ borderColor: 'rgba(0,0,0,0.10)', color: '#334155' }}
              aria-label="Anrufen">
              <Phone className="h-4.5 w-4.5" strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom spacer for mobile sticky bar */}
      <div className="h-[72px] lg:hidden" />
    </>
  )
}
