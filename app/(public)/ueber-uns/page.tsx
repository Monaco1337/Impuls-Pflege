import Link from 'next/link'
import Image from 'next/image'
import {
  Heart,
  Shield,
  GraduationCap,
  Clock,
  Fingerprint,
  Users,
  MapPin,
  ArrowRight,
  Phone,
  UserCheck,
  Navigation,
  Sparkles,
  CalendarCheck,
} from 'lucide-react'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/animations/fade-in'
import { TextReveal } from '@/components/animations/text-reveal'
import { AboutHeroSection } from '@/components/sections/about-hero-section'
import { PremiumCta } from '@/components/sections/premium-cta'

export const metadata = {
  title: 'Über uns – IMPULS Ambulanter Pflegedienst in Unna',
  description:
    'Lernen Sie das Team hinter IMPULS kennen – engagiert, erfahren und mit Herz bei der Sache. Ambulante Pflege in Unna mit Menschlichkeit und Kompetenz.',
}

const values = [
  {
    icon: Heart,
    title: 'Menschlichkeit',
    description:
      'Pflege beginnt mit Mitgefühl. Wir begegnen jedem Menschen mit Wärme, Empathie und aufrichtigem Interesse.',
  },
  {
    icon: Shield,
    title: 'Respekt & Würde',
    description:
      'Jeder Mensch verdient Achtung – unabhängig von Alter, Herkunft oder gesundheitlicher Situation.',
  },
  {
    icon: GraduationCap,
    title: 'Fachliche Kompetenz',
    description:
      'Unser Team bildet sich kontinuierlich fort, um Ihnen die bestmögliche Versorgung zu bieten.',
  },
  {
    icon: Clock,
    title: 'Verlässlichkeit',
    description:
      'Wir halten unsere Zusagen, sind pünktlich und stehen Ihnen zuverlässig zur Seite.',
  },
  {
    icon: Fingerprint,
    title: 'Individualität',
    description:
      'Wir passen unsere Pflege an Ihre persönlichen Bedürfnisse, Wünsche und Gewohnheiten an.',
  },
]

const areas = [
  'Unna Stadtmitte',
  'Königsborn',
  'Massen',
  'Hemmerde',
  'Billmerich',
  'Lünern',
  'Uelzen',
  'Weitere Ortsteile',
]

export default function UeberUnsPage() {
  return (
    <>
      <AboutHeroSection />

      {/* ── Unsere Geschichte ── */}
      <section className="relative bg-white py-24 sm:py-32 lg:py-44">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 xl:px-14">

          {/* ── DESKTOP ── */}
          <div className="hidden lg:grid lg:grid-cols-11 lg:items-center lg:gap-0">

            {/* Image — col 1–5, slightly oversize for visual weight */}
            <div className="lg:col-span-5 lg:pl-8 lg:pr-4 xl:pl-12">
              <FadeIn direction="left" distance={32}>
                <Image
                  src="/images/care-together.jpg"
                  alt="Pflegerin im vertrauensvollen Gespräch mit Patient"
                  width={760}
                  height={940}
                  className="w-full object-cover"
                  style={{
                    borderRadius: '32px',
                    boxShadow: '0 32px 80px -16px rgba(0,0,0,0.12), 0 8px 24px -4px rgba(0,0,0,0.06)',
                    aspectRatio: '4/5',
                    objectPosition: '15% 20%',
                  }}
                  sizes="(min-width: 1024px) 44vw, 0vw"
                />
              </FadeIn>
            </div>

            {/* Text — col 7–11, centered vertically */}
            <div className="lg:col-span-6 lg:col-start-6 lg:pl-12 xl:pl-16">

              {/* Eyebrow */}
              <FadeIn direction="right" distance={20}>
                <p
                  className="text-[11px] font-[660] uppercase tracking-[0.24em]"
                  style={{ color: 'rgba(24,193,163,0.82)' }}
                >
                  Unsere Geschichte
                </p>
              </FadeIn>

              {/* Headline */}
              <FadeIn direction="right" distance={22} delay={0.08}>
                <h2
                  className="mt-6 text-[clamp(2rem,3.8vw,3.1rem)] font-[800] leading-[1.06] tracking-[-0.046em]"
                  style={{ color: '#0F172A' }}
                >
                  Pflege aus Überzeugung –
                  <br />nicht aus Routine.
                </h2>
              </FadeIn>

              {/* Accent rule */}
              <FadeIn direction="right" distance={14} delay={0.14}>
                <div className="mt-6 flex items-center gap-2">
                  <div className="h-[1.5px] w-6 rounded-full"
                    style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
                  <div className="h-[1.5px] w-16 rounded-full"
                    style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.30), transparent)' }} />
                </div>
              </FadeIn>

              {/* Body */}
              <FadeIn direction="right" distance={18} delay={0.20}>
                <div className="mt-8 space-y-6">
                  <p
                    className="text-[16.5px] font-[400] leading-[1.90] tracking-[-0.012em]"
                    style={{ color: '#475569' }}
                  >
                    IMPULS wurde mit einer klaren Überzeugung gegründet: Jeder
                    Mensch hat das Recht, in seiner vertrauten Umgebung würdevoll
                    und selbstbestimmt zu leben – auch wenn er auf Unterstützung
                    angewiesen ist.
                  </p>
                  <p
                    className="text-[16.5px] font-[400] leading-[1.90] tracking-[-0.012em]"
                    style={{ color: '#475569' }}
                  >
                    Als ambulanter Pflegedienst verstehen wir uns nicht nur als
                    Dienstleister, sondern als verlässlicher Begleiter in einer
                    Lebensphase, die Vertrauen und Einfühlungsvermögen erfordert.
                    Unsere Arbeit beginnt immer mit Zuhören.
                  </p>
                </div>
              </FadeIn>

              {/* Quote */}
              <FadeIn direction="right" distance={16} delay={0.28}>
                <div
                  className="mt-10 py-1 pl-6"
                  style={{ borderLeft: '2px solid #18C1A3' }}
                >
                  <p
                    className="text-[17.5px] font-[440] italic leading-[1.68] tracking-[-0.015em]"
                    style={{ color: '#334155' }}
                  >
                    „Bei IMPULS erleben Sie Pflege, die nicht nur versorgt,
                    sondern bereichert – heute und morgen."
                  </p>
                </div>
              </FadeIn>

            </div>
          </div>

          {/* ── MOBILE: stacked — text first, image last ── */}
          <div className="flex flex-col items-center text-center lg:hidden">

            <FadeIn direction="up" distance={14}>
              <p className="text-[11px] font-[660] uppercase tracking-[0.24em]"
                style={{ color: 'rgba(24,193,163,0.82)' }}>
                Unsere Geschichte
              </p>
            </FadeIn>

            <FadeIn direction="up" distance={20} delay={0.07}>
              <h2
                className="mt-5 max-w-xl text-[clamp(1.9rem,7.5vw,2.7rem)] font-[800] leading-[1.06] tracking-[-0.046em]"
                style={{ color: '#0F172A' }}
              >
                Pflege aus Überzeugung –
                nicht aus Routine.
              </h2>
            </FadeIn>

            <FadeIn direction="up" distance={14} delay={0.12}>
              <div className="mt-5 flex items-center justify-center gap-2">
                <div className="h-[1.5px] w-6 rounded-full"
                  style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
                <div className="h-[1.5px] w-14 rounded-full"
                  style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.30), transparent)' }} />
              </div>
            </FadeIn>

            <FadeIn direction="up" distance={16} delay={0.16}>
              <div className="mt-8 space-y-6">
                <p className="text-[16px] font-[400] leading-[1.87] tracking-[-0.01em]"
                  style={{ color: '#475569' }}>
                  IMPULS wurde mit einer klaren Überzeugung gegründet: Jeder
                  Mensch hat das Recht, in seiner vertrauten Umgebung würdevoll
                  und selbstbestimmt zu leben – auch wenn er auf Unterstützung
                  angewiesen ist.
                </p>
                <p className="text-[16px] font-[400] leading-[1.87] tracking-[-0.01em]"
                  style={{ color: '#475569' }}>
                  Als ambulanter Pflegedienst verstehen wir uns nicht nur als
                  Dienstleister, sondern als verlässlicher Begleiter in einer
                  Lebensphase, die Vertrauen und Einfühlungsvermögen erfordert.
                  Unsere Arbeit beginnt immer mit Zuhören.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" distance={14} delay={0.22}>
              <div className="mx-auto mt-9 max-w-xl py-1 pl-5 pr-5 sm:pr-0"
                style={{ borderLeft: '2px solid #18C1A3' }}>
                <p className="text-[16.5px] font-[440] italic leading-[1.68] tracking-[-0.012em]"
                  style={{ color: '#334155' }}>
                  „Bei IMPULS erleben Sie Pflege, die nicht nur versorgt,
                  sondern bereichert – heute und morgen."
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" distance={22} delay={0.28}>
              <Image
                src="/images/care-together.jpg"
                alt="Pflegerin im vertrauensvollen Gespräch mit Patient"
                width={800}
                height={560}
                className="mt-12 w-full object-cover"
                style={{
                  borderRadius: '20px',
                  aspectRatio: '4/3',
                  objectPosition: 'center 20%',
                  boxShadow: '0 16px 48px -8px rgba(0,0,0,0.10)',
                }}
                sizes="100vw"
              />
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── Werte ── */}
      <section className="relative py-24 sm:py-32 lg:py-44" style={{ background: '#F7FAFA' }}>

        {/* Subtle glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(24,193,163,0.06) 0%, transparent 65%)', filter: 'blur(80px)' }} />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 xl:px-14">

          {/* Header — centered */}
          <div className="flex flex-col items-center text-center">
            <FadeIn direction="up" distance={14}>
              <p className="text-[11px] font-[660] uppercase tracking-[0.24em]"
                style={{ color: 'rgba(24,193,163,0.82)' }}>
                Wofür wir stehen
              </p>
            </FadeIn>
            <FadeIn direction="up" distance={18} delay={0.07}>
              <h2
                className="mt-5 mx-auto max-w-[560px] text-[clamp(1.9rem,3.8vw,3rem)] font-[800] leading-[1.07] tracking-[-0.046em]"
                style={{ color: '#0F172A' }}
              >
                Unsere Werte leiten uns –
                <br />jeden einzelnen Tag.
              </h2>
            </FadeIn>
            <FadeIn direction="up" distance={12} delay={0.12}>
              <div className="mt-5 flex items-center gap-2">
                <div className="h-[1.5px] w-6 rounded-full"
                  style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
                <div className="h-[1.5px] w-16 rounded-full"
                  style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.30), transparent)' }} />
              </div>
            </FadeIn>
          </div>

          {/* ── DESKTOP: image left + 2×2 grid right ── */}
          <div className="mt-20 hidden items-stretch gap-10 lg:grid lg:grid-cols-[1fr_1fr] xl:mt-24 xl:gap-14">

            {/* Image — left, full height, visually dominant */}
            <FadeIn direction="left" distance={30} delay={0.08}>
              <div
                className="relative h-full overflow-hidden"
                style={{
                  borderRadius: '32px',
                  minHeight: '580px',
                  boxShadow: '0 32px 80px -16px rgba(0,0,0,0.16)',
                }}
              >
                <Image
                  src="/images/care-values.jpg"
                  alt="Pflegerin und ältere Dame im vertrauensvollen Gespräch"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                {/* Bottom gradient for overlay text */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(8,18,34,0.80) 0%, rgba(8,18,34,0.18) 42%, transparent 66%)' }}
                />
                {/* Overlay text */}
                <div className="absolute inset-x-0 bottom-0 p-9">
                  <p
                    className="text-[23px] font-[760] leading-[1.14] tracking-[-0.032em] text-white"
                  >
                    Werte, die man<br />spüren kann.
                  </p>
                  <p
                    className="mt-3 max-w-[300px] text-[14.5px] font-[400] leading-[1.68]"
                    style={{ color: 'rgba(255,255,255,0.62)' }}
                  >
                    Nicht nur Worte – sondern gelebte Überzeugung in jedem Moment.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* 2×2 value grid — right */}
            <div className="grid grid-cols-2 gap-5">
              {values.slice(0, 4).map((value, i) => {
                const Icon = value.icon
                return (
                  <FadeIn key={value.title} direction="right" distance={22} delay={0.11 + 0.07 * i}>
                    <div
                      className="group flex h-full flex-col rounded-[22px] border bg-white p-7 transition-all duration-300 hover:-translate-y-[3px] hover:border-[rgba(24,193,163,0.20)] hover:shadow-[0_16px_44px_-8px_rgba(24,193,163,0.12)]"
                      style={{
                        borderColor: 'rgba(0,0,0,0.05)',
                        boxShadow: '0 4px 18px rgba(0,0,0,0.05)',
                      }}
                    >
                      {/* Icon circle */}
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-full"
                        style={{ background: 'rgba(24,193,163,0.10)' }}
                      >
                        <Icon className="h-5 w-5" style={{ color: '#18C1A3' }} strokeWidth={1.5} />
                      </div>

                      <h3
                        className="mt-5 text-[15.5px] font-[720] leading-[1.2] tracking-[-0.022em]"
                        style={{ color: '#0F172A' }}
                      >
                        {value.title}
                      </h3>
                      <p
                        className="mt-3 text-[13.5px] font-[400] leading-[1.72] tracking-[-0.005em]"
                        style={{ color: '#64748b' }}
                      >
                        {value.description}
                      </p>
                    </div>
                  </FadeIn>
                )
              })}
            </div>
          </div>

          {/* ── MOBILE: stacked ── */}
          <div className="mt-12 flex flex-col gap-5 lg:hidden">

            {/* Image */}
            <FadeIn direction="up" distance={22} delay={0.08}>
              <div
                className="relative w-full overflow-hidden"
                style={{
                  borderRadius: '24px',
                  aspectRatio: '4/3',
                  boxShadow: '0 16px 48px -8px rgba(0,0,0,0.13)',
                }}
              >
                <Image
                  src="/images/care-values.jpg"
                  alt="Pflegerin und ältere Dame im vertrauensvollen Gespräch"
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(8,18,34,0.70) 0%, transparent 52%)' }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[19px] font-[740] leading-[1.2] tracking-[-0.025em] text-white">
                    Werte, die man spüren kann.
                  </p>
                  <p className="mt-1.5 text-[13px] font-[400]" style={{ color: 'rgba(255,255,255,0.60)' }}>
                    Gelebte Überzeugung in jedem Moment.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Cards — 1 column */}
            {values.slice(0, 4).map((value, i) => {
              const Icon = value.icon
              return (
                <FadeIn key={value.title} direction="up" distance={18} delay={0.07 + 0.06 * i}>
                  <div
                    className="flex flex-col rounded-[20px] border bg-white p-7"
                    style={{
                      borderColor: 'rgba(0,0,0,0.05)',
                      boxShadow: '0 4px 18px rgba(0,0,0,0.05)',
                    }}
                  >
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full"
                      style={{ background: 'rgba(24,193,163,0.10)' }}
                    >
                      <Icon className="h-5 w-5" style={{ color: '#18C1A3' }} strokeWidth={1.5} />
                    </div>
                    <h3
                      className="mt-5 text-[16px] font-[720] leading-[1.2] tracking-[-0.022em]"
                      style={{ color: '#0F172A' }}
                    >
                      {value.title}
                    </h3>
                    <p
                      className="mt-3 text-[14.5px] font-[400] leading-[1.72] tracking-[-0.005em]"
                      style={{ color: '#64748b' }}
                    >
                      {value.description}
                    </p>
                  </div>
                </FadeIn>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── Team ── */}
      <section id="team-section" className="relative overflow-hidden bg-white py-28 sm:py-36 lg:py-44" style={{ scrollMarginTop: '120px' }}>

        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -right-48 top-1/3 h-[560px] w-[560px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(24,193,163,0.055) 0%, transparent 65%)', filter: 'blur(90px)' }} />
          <div className="absolute -left-32 bottom-1/4 h-[400px] w-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(24,193,163,0.04) 0%, transparent 65%)', filter: 'blur(70px)' }} />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 xl:px-14">

          {/* Section header */}
          <div className="flex flex-col items-center text-center">
            <FadeIn direction="up" distance={14}>
              <p className="text-[11px] font-[660] uppercase tracking-[0.24em]"
                style={{ color: 'rgba(24,193,163,0.82)' }}>
                Gemeinsam stark
              </p>
            </FadeIn>
            <FadeIn direction="up" distance={20} delay={0.07}>
              <h2 className="mt-5 mx-auto max-w-[560px] text-[clamp(1.9rem,3.6vw,2.9rem)] font-[800] leading-[1.07] tracking-[-0.046em]"
                style={{ color: '#0F172A' }}>
                Ein Team, das den<br />Unterschied macht.
              </h2>
            </FadeIn>
            <FadeIn direction="up" distance={10} delay={0.12}>
              <div className="mt-5 flex items-center gap-2">
                <div className="h-[1.5px] w-6 rounded-full" style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
                <div className="h-[1.5px] w-16 rounded-full" style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.30), transparent)' }} />
              </div>
            </FadeIn>
            <FadeIn direction="up" distance={14} delay={0.16}>
              <p className="mt-6 mx-auto max-w-[580px] text-[16px] font-[410] leading-[1.82] tracking-[-0.01em]"
                style={{ color: '#475569' }}>
                Hinter IMPULS steht ein engagiertes Team aus examinierten Pflegefachkräften,
                Pflegehilfskräften und Betreuungspersonal – verbunden durch eine gemeinsame
                Haltung: Pflege beginnt beim Menschen.
              </p>
            </FadeIn>
          </div>

          {/* Main content grid */}
          <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-8">

            {/* ── Elena Tschupina — featured card ── */}
            <FadeIn direction="up" distance={24} delay={0.10} className="lg:col-span-5">
              <div className="group relative h-full overflow-hidden rounded-[28px]"
                style={{ boxShadow: '0 24px 64px -12px rgba(0,0,0,0.14)', minHeight: '520px' }}>

                {/* Portrait photo */}
                <Image
                  src="/images/team-elena-tschupina.jpg"
                  alt="Elena Tschupina – Geschäftsführerin IMPULS"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  style={{ objectPosition: '30% 15%' }}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(8,18,34,0.88) 0%, rgba(8,18,34,0.40) 45%, rgba(8,18,34,0.05) 75%, transparent 100%)' }} />

                {/* Mint top accent */}
                <div className="absolute inset-x-0 top-0 h-[3px]"
                  style={{ background: 'linear-gradient(to right, #18C1A3, rgba(24,193,163,0.40), transparent)' }} />

                {/* Info overlay */}
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                  {/* Role pill */}
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-[10.5px] font-[640] uppercase tracking-[0.16em]"
                    style={{ background: 'rgba(24,193,163,0.22)', color: '#7EEEDD', border: '1px solid rgba(24,193,163,0.30)' }}>
                    Geschäftsführung
                  </span>

                  {/* Name */}
                  <p className="mt-3 text-[26px] font-[780] leading-[1.10] tracking-[-0.030em] text-white">
                    Elena Tschupina
                  </p>

                  {/* Divider */}
                  <div className="my-4 h-px w-12" style={{ background: 'rgba(24,193,163,0.60)' }} />

                  {/* Quote */}
                  <p className="text-[14px] font-[420] italic leading-[1.70]"
                    style={{ color: 'rgba(255,255,255,0.72)' }}>
                    „Pflege bedeutet für mich, Menschen in ihrer schwersten Zeit
                    mit Würde und echter Fürsorge zu begleiten."
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* ── Right column ── */}
            <div className="flex flex-col gap-6 lg:col-span-7">

              {/* Team group photo */}
              <FadeIn direction="right" distance={24} delay={0.14}>
                <div className="relative overflow-hidden rounded-[24px]"
                  style={{ boxShadow: '0 16px 48px -8px rgba(0,0,0,0.11)' }}>
                  <Image
                    src="/images/care-team-group.jpg"
                    alt="Das IMPULS-Pflegeteam"
                    width={900}
                    height={500}
                    className="w-full object-cover object-top"
                    style={{ aspectRatio: '16/9' }}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                  />
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.12) 0%, transparent 40%)' }} />

                  {/* Floating team label */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-[12px] px-3.5 py-2.5"
                    style={{ background: 'rgba(255,255,255,0.90)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full"
                      style={{ background: 'rgba(24,193,163,0.12)' }}>
                      <Users className="h-3.5 w-3.5" style={{ color: '#18C1A3' }} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-[12px] font-[660] leading-tight tracking-[-0.01em]" style={{ color: '#0F172A' }}>
                        Unser Pflegeteam
                      </p>
                      <p className="text-[10.5px] font-[430]" style={{ color: '#64748b' }}>
                        Engagiert. Kompetent. Mit Herz.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Stats + info row */}
              <FadeIn direction="right" distance={20} delay={0.20}>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: '15+', label: 'Jahre Erfahrung' },
                    { value: '24/7', label: 'Erreichbar' },
                    { value: '100%', label: 'Engagement' },
                  ].map((stat) => (
                    <div key={stat.value}
                      className="flex flex-col items-center rounded-[18px] border py-5 text-center"
                      style={{ borderColor: 'rgba(0,0,0,0.065)', background: '#FAFAF9', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                      <p className="text-[24px] font-[800] leading-none tracking-[-0.04em]"
                        style={{ color: '#18C1A3' }}>
                        {stat.value}
                      </p>
                      <p className="mt-1.5 text-[11px] font-[520] uppercase tracking-[0.10em]"
                        style={{ color: '#94a3b8' }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* CTA row */}
              <FadeIn direction="right" distance={16} delay={0.26}>
                <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-center lg:justify-start">
                  <Link href="/team"
                    className="group inline-flex w-full max-w-xs items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[14.5px] font-[620] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_16px_36px_-6px_rgba(24,193,163,0.38)] lg:w-auto lg:max-w-none"
                    style={{ background: 'linear-gradient(135deg, #18C1A3, #20C9AA)', boxShadow: '0 6px 20px -4px rgba(24,193,163,0.28)' }}>
                    Team von IMPULS kennenlernen
                    <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
                      style={{ background: 'rgba(255,255,255,0.22)' }}>
                      <ArrowRight className="h-3.5 w-3.5 text-white" strokeWidth={2} />
                    </span>
                  </Link>
                  <Link href="/kontakt"
                    className="group inline-flex items-center gap-1.5 text-[14px] font-[540] tracking-[-0.01em] transition-colors duration-300"
                    style={{ color: '#18C1A3' }}>
                    Persönlich Kontakt aufnehmen
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </FadeIn>

            </div>
          </div>
        </div>
      </section>

      {/* ── Regional / Verwurzelt in Unna ── */}
      <section className="relative overflow-hidden py-28 sm:py-36 lg:py-44" style={{ background: '#F7FAFA' }}>

        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-32 top-1/3 h-[480px] w-[480px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(24,193,163,0.055) 0%, transparent 65%)', filter: 'blur(80px)' }} />
          <div className="absolute -right-24 bottom-1/4 h-[320px] w-[320px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(242,75,106,0.04) 0%, transparent 65%)', filter: 'blur(60px)' }} />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 xl:px-14">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-28">

            {/* ── Left: text + card ── */}
            <div className="flex flex-col text-center lg:text-left">

              <FadeIn direction="up" distance={14}>
                <p className="text-[11px] font-[660] uppercase tracking-[0.24em]"
                  style={{ color: 'rgba(24,193,163,0.82)' }}>
                  Regional verwurzelt
                </p>
              </FadeIn>

              <FadeIn direction="up" distance={20} delay={0.07}>
                <h2
                  className="mt-5 mx-auto max-w-xl text-[clamp(1.9rem,3.6vw,2.9rem)] font-[800] leading-[1.07] tracking-[-0.046em] lg:mx-0"
                  style={{ color: '#0F172A' }}
                >
                  Verwurzelt in Unna –
                  <br />nah an den Menschen.
                </h2>
              </FadeIn>

              <FadeIn direction="up" distance={10} delay={0.12}>
                <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
                  <div className="h-[1.5px] w-6 rounded-full"
                    style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
                  <div className="h-[1.5px] w-16 rounded-full"
                    style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.30), transparent)' }} />
                </div>
              </FadeIn>

              <FadeIn direction="up" distance={16} delay={0.16}>
                <div
                  className="mt-9 mx-auto max-w-[520px] space-y-5 text-[16px] font-[400] leading-[1.82] tracking-[-0.01em] lg:mx-0"
                  style={{ color: '#475569' }}
                >
                  <p>
                    Unna ist unsere Heimat – und genau hier kennen wir die
                    Menschen, Wege und Bedürfnisse. Als ambulanter Pflegedienst
                    mit regionaler Verankerung begleiten wir mit kurzen Wegen,
                    persönlicher Nähe und echter Verlässlichkeit.
                  </p>
                  <p>
                    Diese Nähe ist kein Zufall, sondern Teil unserer Haltung.
                    Wir möchten für unsere Klientinnen und Klienten erreichbar
                    sein – nicht nur telefonisch, sondern auch im Alltag, dort
                    wo Unterstützung gebraucht wird.
                  </p>
                  <p>
                    Regionale Pflege bedeutet für uns: vertraute Ansprechpartner,
                    schnelle Hilfe und Betreuung auf Augenhöhe.
                  </p>
                </div>
              </FadeIn>

              {/* ── Versorgungsgebiet Card ── */}
              <FadeIn direction="up" distance={18} delay={0.24}>
                <div
                  className="mt-10 rounded-[22px] border bg-white p-6 sm:p-7"
                  style={{
                    borderColor: 'rgba(0,0,0,0.06)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                  }}
                >
                  {/* Card header */}
                  <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                      style={{ background: 'rgba(24,193,163,0.10)' }}
                    >
                      <MapPin className="h-5 w-5" style={{ color: '#18C1A3' }} strokeWidth={1.6} />
                    </div>
                    <div>
                      <p className="text-[15px] font-[700] tracking-[-0.018em]" style={{ color: '#0F172A' }}>
                        Unna und Umgebung
                      </p>
                      <p className="mt-0.5 text-[12px] font-[500] uppercase tracking-[0.10em]"
                        style={{ color: 'rgba(24,193,163,0.75)' }}>
                        Unser Versorgungsgebiet
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-5 h-px" style={{ background: 'rgba(0,0,0,0.055)' }} />

                  {/* Locations grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {areas.map((area) => (
                      <div key={area} className="flex items-start gap-2.5">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#18C1A3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-px shrink-0" aria-hidden="true">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <span
                          className="icon-list-prose min-w-0 flex-1 text-[13.5px] font-[460] tracking-[-0.005em]"
                          style={{ color: '#334155' }}
                        >
                          {area}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

            </div>

            {/* ── Right: image + standort card ── */}
            <div className="flex flex-col gap-5">

              <FadeIn direction="right" distance={30} delay={0.10}>
                <div
                  className="relative overflow-hidden"
                  style={{
                    borderRadius: '28px',
                    aspectRatio: '4/3',
                    boxShadow: '0 28px 72px -12px rgba(0,0,0,0.14)',
                  }}
                >
                  <Image
                    src="/images/care-regional.jpg"
                    alt="Pflegekraft begleitet ältere Dame spazieren in Unna"
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  {/* Soft bottom vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.10) 0%, transparent 40%)' }}
                  />
                  {/* Region badge — floating bottom left */}
                  <div
                  className="absolute bottom-4 left-4 flex items-center gap-2 rounded-[12px] px-3 py-2"
                  style={{
                    background: 'rgba(255,255,255,0.84)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    border: '1px solid rgba(255,255,255,0.92)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
                  }}
                >
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full"
                    style={{ background: 'rgba(24,193,163,0.12)' }}
                  >
                    <MapPin className="h-3 w-3" style={{ color: '#18C1A3' }} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-[12px] font-[640] leading-tight tracking-[-0.01em]" style={{ color: '#0F172A' }}>
                      Unna & Umgebung
                    </p>
                    <p className="text-[10.5px] font-[440]" style={{ color: '#64748b' }}>
                      Ihr lokaler Pflegedienst
                    </p>
                  </div>
                </div>
                </div>
              </FadeIn>

              {/* ── Standort Card ── */}
              <FadeIn direction="right" distance={22} delay={0.20}>
                <div
                  className="rounded-[22px] border bg-white p-6 mt-2"
                  style={{
                    borderColor: 'rgba(0,0,0,0.06)',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.05)',
                  }}
                >
                  <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                    {/* Icon */}
                    <div
                      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{ background: 'rgba(24,193,163,0.10)' }}
                    >
                      <MapPin className="h-[18px] w-[18px]" style={{ color: '#18C1A3' }} strokeWidth={1.7} />
                    </div>

                    {/* Address */}
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-[600] uppercase tracking-[0.10em]"
                        style={{ color: 'rgba(24,193,163,0.80)' }}>
                        Standort in Unna
                      </p>
                      <p className="mt-2 text-[14.5px] font-[640] leading-tight tracking-[-0.015em]"
                        style={{ color: '#0F172A' }}>
                        IMPULS Ambulante Pflege
                      </p>
                      <p className="mt-1 text-[14px] font-[400] leading-[1.6]"
                        style={{ color: '#64748b' }}>
                        Massener Str. 147<br />59423 Unna
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-5 h-px" style={{ background: 'rgba(0,0,0,0.055)' }} />

                  {/* Buttons */}
                  <div className="flex flex-col items-center gap-2.5 sm:flex-row sm:items-stretch">
                    <a
                      href="https://maps.google.com/?q=Massener+Str.+147,+59423+Unna"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full max-w-xs flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-[13.5px] font-[600] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_24px_-4px_rgba(24,193,163,0.32)] sm:max-w-none"
                      style={{
                        background: 'linear-gradient(135deg, #18C1A3, #20C9AA)',
                        boxShadow: '0 4px 14px -3px rgba(24,193,163,0.28)',
                      }}
                    >
                      <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
                      Route planen
                    </a>
                    <Link
                      href="/kontakt"
                      className="group flex w-full max-w-xs flex-1 items-center justify-center gap-2 rounded-full border py-2.5 text-[13.5px] font-[560] tracking-[-0.01em] transition-all duration-200 hover:border-[rgba(24,193,163,0.25)] hover:bg-[rgba(24,193,163,0.04)] sm:max-w-none"
                      style={{
                        borderColor: 'rgba(0,0,0,0.09)',
                        color: '#334155',
                      }}
                    >
                      <Phone className="h-3.5 w-3.5" style={{ color: '#18C1A3' }} strokeWidth={2} />
                      Kontakt aufnehmen
                    </Link>
                  </div>
                </div>
              </FadeIn>

            </div>

          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="relative py-16 sm:py-20" style={{ background: '#ffffff' }}>
        {/* Top + bottom hairlines */}
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />

        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 xl:px-14">
          <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-6">
            {[
              {
                icon: UserCheck,
                title: 'Persönliche Ansprechpartner',
                sub: 'Immer ein vertrautes Gesicht an Ihrer Seite.',
              },
              {
                icon: Navigation,
                title: 'Kurze Wege',
                sub: 'Regional verankert – schnell und verlässlich erreichbar.',
              },
              {
                icon: Sparkles,
                title: 'Individuelle Pflege',
                sub: 'Jeder Mensch ist einzigartig – unsere Betreuung auch.',
              },
              {
                icon: CalendarCheck,
                title: 'Zuverlässige Betreuung',
                sub: 'Pünktlich, konsistent und mit echtem Engagement.',
              },
            ].map((item, i) => (
              <FadeIn key={item.title} direction="up" distance={14} delay={0.06 * i}>
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ background: 'rgba(24,193,163,0.09)' }}
                  >
                    <item.icon className="h-5 w-5" style={{ color: '#18C1A3' }} strokeWidth={1.6} />
                  </div>

                  {/* Title */}
                  <p
                    className="mt-4 text-[14.5px] font-[680] leading-tight tracking-[-0.018em]"
                    style={{ color: '#0F172A' }}
                  >
                    {item.title}
                  </p>

                  {/* Subtext */}
                  <p
                    className="mt-2 text-[13px] font-[400] leading-[1.65]"
                    style={{ color: '#64748b' }}
                  >
                    {item.sub}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <PremiumCta
        eyebrow="Persönliche Beratung"
        headline="Lassen Sie uns gemeinsam die passende Unterstützung finden."
        subtext="Haben Sie Fragen oder wünschen eine persönliche Beratung? Wir freuen uns darauf, gemeinsam die passende Unterstützung für Ihre Situation zu finden."
        primaryLabel="Jetzt Kontakt aufnehmen"
      />
    </>
  )
}
