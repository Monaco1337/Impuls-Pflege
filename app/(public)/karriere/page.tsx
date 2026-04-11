import Link from 'next/link'
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
} from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { MotionWrapper } from '@/components/sections/motion-wrapper'
import { getPublicJobs } from '@/lib/actions/jobs'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Karriere – IMPULS Ambulanter Pflegedienst in Unna',
  description:
    'Werden Sie Teil des IMPULS-Teams in Unna. Entdecken Sie offene Stellen in der ambulanten Pflege und bewerben Sie sich jetzt – mit Herz, Kompetenz und echtem Engagement.',
}

const employmentTypeLabels: Record<string, string> = {
  VOLLZEIT: 'Vollzeit',
  TEILZEIT: 'Teilzeit',
  MINIJOB: 'Minijob',
  WERKSTUDENT: 'Werkstudent',
  PRAKTIKUM: 'Praktikum',
  FREIBERUFLICH: 'Freiberuflich',
}

const benefits = [
  {
    icon: Heart,
    title: 'Sinnstiftende Arbeit',
    description:
      'Jeden Tag einen echten Unterschied im Leben von Menschen machen – das gibt Ihrer Arbeit Bedeutung und Tiefe.',
  },
  {
    icon: Users,
    title: 'Wertschätzendes Miteinander',
    description:
      'Ein kollegiales Team, flache Hierarchien und ein respektvoller Umgang bilden die Basis unserer Zusammenarbeit.',
  },
  {
    icon: GraduationCap,
    title: 'Fort- und Weiterbildung',
    description:
      'Wir investieren in Ihre fachliche und persönliche Entwicklung durch regelmäßige Schulungen und Fortbildungen.',
  },
  {
    icon: Banknote,
    title: 'Faire Vergütung',
    description:
      'Leistungsgerechte Bezahlung, Zuschläge und attraktive Zusatzleistungen – weil gute Arbeit angemessen honoriert gehört.',
  },
  {
    icon: Clock,
    title: 'Flexible Arbeitszeiten',
    description:
      'Individuelle Arbeitszeitmodelle, die sich an Ihre Lebenssituation anpassen – für eine gesunde Work-Life-Balance.',
  },
  {
    icon: ShieldCheck,
    title: 'Sichere Perspektive',
    description:
      'Ein unbefristeter Arbeitsplatz in einem wachsenden Unternehmen mit langfristiger Zukunftsperspektive.',
  },
]

export default async function KarrierePage() {
  const result = await getPublicJobs()
  const jobs = result.success && Array.isArray(result.data) ? result.data : []

  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-warm-50 via-white to-white pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-20">
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
          <div className="mx-auto max-w-3xl text-center">
            <MotionWrapper>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
                Karriere
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-warm-900 sm:text-4xl lg:text-5xl lg:leading-[1.15]">
                Karriere bei IMPULS
              </h1>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-warm-600 sm:text-xl">
                Werden Sie Teil eines Teams, das jeden Tag einen Unterschied
                macht – mit Herz, Kompetenz und echtem Engagement.
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.15}>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <a
                  href="#stellen"
                  className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-primary-500 px-7 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-primary-600 active:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:w-auto"
                >
                  Offene Stellen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/bewerbung"
                  className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-primary-50 px-7 text-base font-semibold text-primary-700 transition-colors duration-200 hover:bg-primary-100 active:bg-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:w-auto"
                >
                  Initiativbewerbung
                </Link>
              </div>
            </MotionWrapper>
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section className="bg-white py-16 sm:py-24">
        <Container size="lg">
          <MotionWrapper>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
                Warum IMPULS
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-warm-900 sm:text-3xl lg:text-4xl">
                Das erwartet Sie bei uns
              </h2>
              <p className="mt-4 text-base leading-relaxed text-warm-500 sm:text-lg">
                Bei IMPULS erwartet Sie mehr als ein Arbeitsplatz – ein Umfeld,
                in dem Sie wachsen, wirken und sich wohlfühlen können.
              </p>
            </div>
          </MotionWrapper>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <MotionWrapper key={benefit.title} delay={0.05 * i}>
                  <div className="rounded-xl border border-warm-200 bg-white px-6 py-8 transition-all duration-200 hover:border-primary-200 hover:shadow-md">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                      <Icon
                        className="h-5 w-5 text-primary-600"
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-warm-900">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-warm-500">
                      {benefit.description}
                    </p>
                  </div>
                </MotionWrapper>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Open positions */}
      <Section id="stellen" className="bg-warm-50/50 py-16 sm:py-24">
        <Container size="lg">
          <MotionWrapper>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
                Offene Stellen
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-warm-900 sm:text-3xl lg:text-4xl">
                Aktuelle Stellenangebote
              </h2>
              <p className="mt-4 text-base leading-relaxed text-warm-500 sm:text-lg">
                Finden Sie die passende Position und werden Sie Teil unseres
                engagierten Teams.
              </p>
            </div>
          </MotionWrapper>

          {jobs.length > 0 ? (
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {jobs.map((job: Record<string, string>, i: number) => (
                <MotionWrapper key={job.id} delay={0.05 * i}>
                  <Link
                    href={`/karriere/${job.slug}`}
                    className="group flex h-full flex-col justify-between rounded-xl border border-warm-200 bg-white p-6 transition-all duration-200 hover:border-primary-200 hover:shadow-md sm:p-8"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-warm-900 transition-colors duration-200 group-hover:text-primary-600">
                        {job.title}
                      </h3>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Badge variant="primary">
                          {employmentTypeLabels[job.employmentType] ??
                            job.employmentType}
                        </Badge>
                        {job.workload && (
                          <Badge variant="outline">{job.workload}</Badge>
                        )}
                        <span className="flex items-center gap-1 text-xs text-warm-400">
                          <MapPin
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                          {job.location}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-warm-500">
                        {job.shortIntro}
                      </p>
                    </div>
                    <div className="mt-5">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 transition-colors duration-200 group-hover:text-primary-700">
                        Details ansehen
                        <ArrowRight
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                </MotionWrapper>
              ))}
            </div>
          ) : (
            <MotionWrapper delay={0.1}>
              <div className="mt-14 flex flex-col items-center rounded-xl border border-warm-200 bg-white py-16 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-warm-100">
                  <Briefcase
                    className="h-7 w-7 text-warm-400"
                    aria-hidden="true"
                  />
                </span>
                <p className="mt-4 text-lg font-semibold text-warm-900">
                  Aktuell keine offenen Stellen
                </p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-warm-500">
                  Derzeit sind keine Positionen ausgeschrieben. Senden Sie uns
                  gerne eine Initiativbewerbung – wir freuen uns, von Ihnen zu
                  hören.
                </p>
              </div>
            </MotionWrapper>
          )}
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-primary-50/60 py-16 sm:py-24">
        <Container size="lg">
          <div className="mx-auto max-w-2xl text-center">
            <MotionWrapper>
              <h2 className="text-2xl font-bold leading-tight text-warm-900 sm:text-3xl lg:text-4xl">
                Keine passende Stelle dabei?
              </h2>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-warm-600 sm:text-lg">
                Wir sind immer auf der Suche nach engagierten Menschen, die
                unsere Leidenschaft für gute Pflege teilen. Bewerben Sie sich
                initiativ – wir freuen uns auf Ihre Unterlagen.
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.15}>
              <div className="mt-8">
                <Link
                  href="/bewerbung"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-primary-500 px-7 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-primary-600 active:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  Initiativbewerbung senden
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </MotionWrapper>
          </div>
        </Container>
      </Section>
    </>
  )
}
