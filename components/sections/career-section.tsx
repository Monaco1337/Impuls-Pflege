import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { MotionWrapper } from '@/components/sections/motion-wrapper'

const jobs = [
  {
    title: 'Pflegefachkraft (m/w/d)',
    types: ['Vollzeit', 'Teilzeit'],
    location: 'Unna',
    teaser:
      'Sie bringen Fachkompetenz und Herz mit? Begleiten Sie Menschen professionell und eigenverantwortlich in ihrem Zuhause.',
  },
  {
    title: 'Pflegehilfskraft (m/w/d)',
    types: ['Teilzeit', 'Minijob'],
    location: 'Unna',
    teaser:
      'Unterstützen Sie unser Team bei der Grundpflege und schenken Sie Menschen im Alltag wertvolle Hilfe.',
  },
  {
    title: 'Betreuungskraft (m/w/d)',
    types: ['Teilzeit'],
    location: 'Unna',
    teaser:
      'Gesellschaft, Aktivierung und Zuwendung – gestalten Sie den Alltag unserer Klienten mit Freude und Empathie.',
  },
  {
    title: 'Hauswirtschaftskraft (m/w/d)',
    types: ['Minijob', 'Teilzeit'],
    location: 'Unna',
    teaser:
      'Sorgen Sie mit hauswirtschaftlicher Unterstützung für ein gepflegtes und behagliches Zuhause unserer Klienten.',
  },
]

export function CareerSection() {
  return (
    <Section className="bg-warm-50 py-16 sm:py-24">
      <Container size="lg">
        <MotionWrapper>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
              Karriere
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-warm-900 sm:text-3xl lg:text-4xl">
              Karriere mit Sinn, Verantwortung und Menschlichkeit
            </h2>
            <p className="mt-4 text-base leading-relaxed text-warm-500 sm:text-lg">
              Werden Sie Teil eines Teams, das jeden Tag einen Unterschied macht
            </p>
          </div>
        </MotionWrapper>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {jobs.map((job, i) => (
            <MotionWrapper key={job.title} delay={0.05 * i}>
              <div className="group flex flex-col justify-between rounded-xl border border-warm-200 bg-white p-6 transition-all duration-200 hover:border-primary-200 hover:shadow-md sm:p-8">
                <div>
                  <h3 className="text-lg font-semibold text-warm-900 transition-colors duration-200 group-hover:text-primary-600">
                    {job.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {job.types.map((type) => (
                      <Badge key={type} variant="primary">
                        {type}
                      </Badge>
                    ))}
                    <span className="flex items-center gap-1 text-xs text-warm-400">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {job.location}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-warm-500">
                    {job.teaser}
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    href="/karriere"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 transition-colors duration-200 hover:text-primary-700"
                  >
                    Mehr erfahren
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>

        <MotionWrapper delay={0.25}>
          <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/karriere"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-primary-500 px-7 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-primary-600 active:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Offene Stellen ansehen
            </Link>
            <Link
              href="/bewerbung"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-primary-50 px-7 text-base font-semibold text-primary-700 transition-colors duration-200 hover:bg-primary-100 active:bg-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Jetzt bewerben
            </Link>
          </div>
        </MotionWrapper>
      </Container>
    </Section>
  )
}
