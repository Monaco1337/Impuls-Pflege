import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { MotionWrapper } from '@/components/sections/motion-wrapper'

const steps = [
  {
    number: '01',
    title: 'Kontaktaufnahme',
    description:
      'Rufen Sie uns an oder schreiben Sie uns. Wir nehmen uns Zeit für Ihr Anliegen und beantworten Ihre ersten Fragen persönlich.',
  },
  {
    number: '02',
    title: 'Persönliche Beratung',
    description:
      'Wir lernen Sie und Ihre Situation kennen und entwickeln gemeinsam einen individuellen Pflegeplan, der genau zu Ihnen passt.',
  },
  {
    number: '03',
    title: 'Individuelle Versorgung',
    description:
      'Unser Team beginnt mit der Betreuung – zuverlässig, einfühlsam und immer an Ihrer Seite.',
  },
]

export function ProcessSection() {
  return (
    <Section className="bg-warm-50/50 py-16 sm:py-24">
      <Container size="lg">
        <MotionWrapper>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
              So funktioniert&apos;s
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-warm-900 sm:text-3xl lg:text-4xl">
              Ihr Weg zu uns
            </h2>
            <p className="mt-4 text-base leading-relaxed text-warm-500 sm:text-lg">
              In drei einfachen Schritten zur passenden Unterstützung
            </p>
          </div>
        </MotionWrapper>

        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div
            className="absolute top-14 right-[calc(16.67%)] left-[calc(16.67%)] hidden h-px bg-primary-200 lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, i) => (
              <MotionWrapper key={step.number} delay={0.1 * i}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white shadow-sm ring-4 ring-white">
                    {step.number}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-warm-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-warm-500">
                    {step.description}
                  </p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>

        <MotionWrapper delay={0.35}>
          <div className="mt-14 text-center">
            <Link
              href="/kontakt"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-primary-500 px-7 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-primary-600 active:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Jetzt Kontakt aufnehmen
            </Link>
          </div>
        </MotionWrapper>
      </Container>
    </Section>
  )
}
