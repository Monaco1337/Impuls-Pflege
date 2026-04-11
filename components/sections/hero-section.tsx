import Link from 'next/link'
import { Heart, Users, MapPin } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { MotionWrapper } from '@/components/sections/motion-wrapper'

const trustIndicators = [
  { icon: Heart, label: 'Erfahrenes Team' },
  { icon: Users, label: 'Individuelle Pflege' },
  { icon: MapPin, label: 'In Ihrer Nähe' },
]

export function HeroSection() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-b from-warm-50 via-white to-white pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-20">
      {/* Decorative accent */}
      <div
        className="pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] rounded-full opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle, var(--color-accent-400) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 -left-24 h-64 w-64 rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, var(--color-primary-400) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <Container size="lg">
        <div className="relative mx-auto max-w-3xl text-center">
          <MotionWrapper>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-warm-900 sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              Herzlich willkommen beim{' '}
              <span className="text-primary-600">Impuls</span>{' '}
              Ambulanten Pflegedienst in Unna
            </h1>
          </MotionWrapper>

          <MotionWrapper delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-warm-600 sm:text-xl">
              Ihr vertrauensvoller Partner für Betreuung, Pflege und Unterstützung in den eigenen vier Wänden.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.15}>
            <p className="mt-4 text-base leading-relaxed text-warm-500 sm:text-lg">
              Unser erfahrenes und einfühlsames Team begleitet Menschen im vertrauten Zuhause – mit fachlicher Kompetenz, Respekt und echter Menschlichkeit.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Link
                href="/kontakt"
                className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-primary-500 px-7 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-primary-600 active:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:w-auto"
              >
                Jetzt Kontakt aufnehmen
              </Link>
              <Link
                href="/leistungen"
                className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-primary-50 px-7 text-base font-semibold text-primary-700 transition-colors duration-200 hover:bg-primary-100 active:bg-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:w-auto"
              >
                Leistungen ansehen
              </Link>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.25}>
            <div className="mt-4 flex justify-center">
              <Link
                href="/karriere"
                className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-warm-500 transition-colors duration-200 hover:text-primary-600 hover:bg-warm-50"
              >
                Karriere entdecken
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.3}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              {trustIndicators.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-warm-500">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50">
                    <Icon className="h-4 w-4 text-primary-500" aria-hidden="true" />
                  </span>
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>
          </MotionWrapper>
        </div>
      </Container>
    </Section>
  )
}
