import { Heart, Users, Home, Shield, HandHeart, Clock } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { MotionWrapper } from '@/components/sections/motion-wrapper'

const pillars = [
  {
    icon: Users,
    title: 'Erfahrene Pflegefachkräfte',
    description:
      'Unser qualifiziertes Team bringt langjährige Erfahrung und fachliche Exzellenz in jeden Einsatz.',
  },
  {
    icon: Heart,
    title: 'Persönliche Betreuung',
    description:
      'Wir nehmen uns Zeit für jeden Menschen und gehen einfühlsam auf individuelle Bedürfnisse ein.',
  },
  {
    icon: HandHeart,
    title: 'Individuelle Versorgung',
    description:
      'Jeder Pflegeplan wird sorgfältig auf die persönliche Situation und Wünsche abgestimmt.',
  },
  {
    icon: Home,
    title: 'Vertrautes Zuhause',
    description:
      'Pflege dort, wo Sie sich am wohlsten fühlen – in Ihren eigenen vier Wänden.',
  },
  {
    icon: Shield,
    title: 'Menschlichkeit & Respekt',
    description:
      'Würdevoller Umgang und echte Anteilnahme sind die Grundlage unserer täglichen Arbeit.',
  },
  {
    icon: Clock,
    title: 'Verlässlichkeit & Sicherheit',
    description:
      'Sie können sich auf uns verlassen – zuverlässig, strukturiert und immer erreichbar.',
  },
]

export function TrustSection() {
  return (
    <Section className="bg-warm-50/50 py-16 sm:py-24">
      <Container size="lg">
        <MotionWrapper>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
              Unsere Werte
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-warm-900 sm:text-3xl lg:text-4xl">
              Worauf Sie sich verlassen können
            </h2>
            <p className="mt-4 text-base leading-relaxed text-warm-500 sm:text-lg">
              Sechs Versprechen, die unsere tägliche Arbeit leiten – für Pflege, die Sie wirklich verdienen.
            </p>
          </div>
        </MotionWrapper>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <MotionWrapper key={pillar.title} delay={0.05 * i}>
                <div className="rounded-xl border-t-2 border-primary-500 bg-white px-6 py-8 shadow-sm ring-1 ring-warm-100">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                    <Icon className="h-5 w-5 text-primary-600" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-warm-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-warm-500">
                    {pillar.description}
                  </p>
                </div>
              </MotionWrapper>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
