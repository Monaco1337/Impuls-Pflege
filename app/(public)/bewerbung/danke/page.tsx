import Link from 'next/link'
import { CheckCircle2, ArrowRight, Phone, Mail } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { MotionWrapper } from '@/components/sections/motion-wrapper'

export const metadata = {
  title: 'Bewerbung erhalten – IMPULS Ambulanter Pflegedienst',
  description:
    'Vielen Dank für Ihre Bewerbung beim IMPULS Ambulanten Pflegedienst. Wir melden uns in Kürze bei Ihnen.',
}

export default function DankePage() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-b from-warm-50 via-white to-white py-24 sm:py-32 lg:py-40">
      <div
        className="pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] rounded-full opacity-[0.08]"
        style={{
          background:
            'radial-gradient(circle, var(--color-primary-400) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 -left-24 h-64 w-64 rounded-full opacity-[0.06]"
        style={{
          background:
            'radial-gradient(circle, var(--color-accent-400) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <Container size="lg">
        <div className="mx-auto max-w-xl text-center">
          <MotionWrapper>
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-50 ring-8 ring-success-50/50">
              <CheckCircle2
                className="h-8 w-8 text-success-500"
                aria-hidden="true"
              />
            </span>
          </MotionWrapper>

          <MotionWrapper delay={0.1}>
            <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-warm-900 sm:text-4xl">
              Vielen Dank für Ihre Bewerbung!
            </h1>
          </MotionWrapper>

          <MotionWrapper delay={0.15}>
            <p className="mt-5 text-lg leading-relaxed text-warm-600">
              Wir haben Ihre Unterlagen erhalten und werden uns in Kürze bei
              Ihnen melden. Wir freuen uns, Sie bald kennenzulernen.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <div className="mt-8 rounded-xl border border-warm-200 bg-warm-50/50 px-6 py-5">
              <p className="text-sm font-medium text-warm-700">
                Bei Fragen erreichen Sie uns jederzeit:
              </p>
              <div className="mt-3 flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-6">
                <a
                  href="tel:+4923032920589"
                  className="inline-flex items-center gap-2 text-sm font-medium text-warm-600 transition-colors duration-150 hover:text-primary-600"
                >
                  <Phone className="h-4 w-4 text-primary-500" aria-hidden="true" />
                  02303 2920589
                </a>
                <a
                  href="mailto:info@impuls-unna.de"
                  className="inline-flex items-center gap-2 text-sm font-medium text-warm-600 transition-colors duration-150 hover:text-primary-600"
                >
                  <Mail className="h-4 w-4 text-primary-500" aria-hidden="true" />
                  info@impuls-unna.de
                </a>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.25}>
            <div className="mt-10 flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-4">
              <Link
                href="/"
                className="inline-flex h-11 w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-primary-600 active:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 lg:w-auto lg:max-w-none"
              >
                Zur Startseite
              </Link>
              <Link
                href="/karriere"
                className="inline-flex h-11 w-full max-w-xs items-center justify-center gap-2 rounded-lg border border-warm-300 bg-white px-6 text-sm font-semibold text-warm-700 transition-colors duration-200 hover:bg-warm-50 active:bg-warm-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 lg:w-auto lg:max-w-none"
              >
                Karriere entdecken
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </MotionWrapper>
        </div>
      </Container>
    </Section>
  )
}
