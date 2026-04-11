import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { MotionWrapper } from '@/components/sections/motion-wrapper'

export function QualitySection() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50/30 py-16 sm:py-24">
      <div
        className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, var(--color-accent-400) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <Container size="lg">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <MotionWrapper>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-100/60 to-accent-100/40 ring-1 ring-primary-200/40">
                <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary-200/60" />
                  <p className="text-sm text-warm-400">Bildelement</p>
                </div>
              </div>
            </div>
          </MotionWrapper>

          <div>
            <MotionWrapper delay={0.1}>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
                Unser Anspruch
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-warm-900 sm:text-3xl lg:text-4xl">
                Lebensqualität im Mittelpunkt
              </h2>
            </MotionWrapper>

            <MotionWrapper delay={0.15}>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-warm-600 sm:text-lg">
                <p>
                  Würde und Selbstbestimmung sind keine leeren Worte, sondern der Maßstab unseres Handelns. Wir unterstützen Menschen dabei, so eigenständig wie möglich in ihrem vertrauten Umfeld zu leben – mit genau der Hilfe, die sie brauchen, und dem Respekt, den sie verdienen.
                </p>
                <p>
                  Auch für Angehörige bedeutet unsere Begleitung spürbare Entlastung. Sie können darauf vertrauen, dass Ihre Liebsten in sicheren Händen sind – professionell betreut und menschlich begleitet.
                </p>
                <p>
                  Pflege bei IMPULS heißt: auf Augenhöhe, mit Wärme und dem festen Versprechen, immer das Beste für die Menschen zu geben, die uns anvertraut werden.
                </p>
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <div className="mt-8">
                <Link
                  href="/ueber-uns"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-50 px-6 py-3 text-sm font-semibold text-primary-700 transition-colors duration-200 hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  Erfahren Sie mehr über uns
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </Container>
    </Section>
  )
}
