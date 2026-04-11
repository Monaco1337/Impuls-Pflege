import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { MotionWrapper } from '@/components/sections/motion-wrapper'

export function IntroSection() {
  return (
    <Section className="bg-white py-16 sm:py-24">
      <Container size="lg">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <MotionWrapper>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
                Über IMPULS
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-warm-900 sm:text-3xl lg:text-4xl">
                Pflege, die Vertrauen schafft
              </h2>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-warm-600 sm:text-lg">
                <p>
                  Die Entscheidung für einen ambulanten Pflegedienst ist ein Schritt, der Vertrauen voraussetzt. Bei IMPULS nehmen wir dieses Vertrauen ernst – und geben es jeden Tag aufs Neue zurück. Unser Team aus erfahrenen Pflegefachkräften vereint fachliche Exzellenz mit dem, was Pflege im Kern ausmacht: echte Menschlichkeit.
                </p>
                <p>
                  Jede Begleitung beginnt mit Zuhören. Wir stimmen unsere Leistungen individuell auf Ihre Bedürfnisse ab – von der professionellen Grund- und Behandlungspflege über aktivierende Betreuungsangebote bis hin zur Unterstützung im Haushalt. So schenken wir Ihnen und Ihren Liebsten Lebensqualität, Sicherheit und Würde.
                </p>
                <p>
                  Bei IMPULS erleben Sie Pflege auf Augenhöhe: respektvoll, kompetent und stets an Ihren persönlichen Wünschen orientiert.
                </p>
              </div>
            </MotionWrapper>
          </div>

          <MotionWrapper delay={0.15}>
            <div className="relative">
              {/* Accent decorative element / image placeholder */}
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-warm-50 to-primary-50 ring-1 ring-warm-200/60">
                <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary-100" />
                  <p className="text-sm text-warm-400">Bildelement</p>
                </div>
              </div>
              {/* Decorative accent strip */}
              <div
                className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, var(--color-accent-100) 0%, var(--color-primary-100) 100%)',
                }}
                aria-hidden="true"
              />
            </div>
          </MotionWrapper>
        </div>
      </Container>
    </Section>
  )
}
