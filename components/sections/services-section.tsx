import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { MotionWrapper } from '@/components/sections/motion-wrapper'

const services = [
  {
    title: 'Grundpflege',
    description:
      'Professionelle Unterstützung bei der täglichen Körperpflege, Ernährung und Mobilität – respektvoll und mit Würde.',
  },
  {
    title: 'Behandlungspflege',
    description:
      'Medizinische Pflege nach ärztlicher Verordnung: Medikamentengabe, Wundversorgung, Injektionen und mehr.',
  },
  {
    title: 'Betreuungsangebote',
    description:
      'Aktivierende Betreuung, Gesellschaft und Beschäftigung für mehr Lebensfreude im Alltag.',
  },
  {
    title: 'Hauswirtschaftliche Unterstützung',
    description:
      'Hilfe im Haushalt – von der Reinigung über Einkäufe bis zur Wäschepflege.',
  },
  {
    title: 'Individuelle Beratung',
    description:
      'Persönliche Beratung zu Pflegeleistungen, Kostenübernahme und individuellen Versorgungsmöglichkeiten.',
  },
  {
    title: 'Pflege in vertrauter Umgebung',
    description:
      'Professionelle Versorgung in den eigenen vier Wänden – für Sicherheit und Geborgenheit.',
  },
]

export function ServicesSection() {
  return (
    <Section className="bg-white py-16 sm:py-24">
      <Container size="lg">
        <MotionWrapper>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
              Leistungen
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-warm-900 sm:text-3xl lg:text-4xl">
              Unsere Leistungen
            </h2>
            <p className="mt-4 text-base leading-relaxed text-warm-500 sm:text-lg">
              Umfassende Pflege und Betreuung, individuell auf Sie abgestimmt
            </p>
          </div>
        </MotionWrapper>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <MotionWrapper key={service.title} delay={0.05 * i}>
              <div className="group rounded-xl border border-warm-200 bg-white px-6 py-8 transition-all duration-200 hover:border-primary-200 hover:shadow-md">
                <h3 className="text-lg font-semibold text-warm-900 transition-colors duration-200 group-hover:text-primary-600">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-warm-500">
                  {service.description}
                </p>
              </div>
            </MotionWrapper>
          ))}
        </div>

        <MotionWrapper delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href="/leistungen"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-50 px-6 py-3 text-sm font-semibold text-primary-700 transition-colors duration-200 hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Alle Leistungen entdecken
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </MotionWrapper>
      </Container>
    </Section>
  )
}
