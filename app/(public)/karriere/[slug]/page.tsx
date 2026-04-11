import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Clock, ArrowRight, ChevronRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { MotionWrapper } from '@/components/sections/motion-wrapper'
import { getPublicJob } from '@/lib/actions/jobs'

const employmentTypeLabels: Record<string, string> = {
  VOLLZEIT: 'Vollzeit',
  TEILZEIT: 'Teilzeit',
  MINIJOB: 'Minijob',
  WERKSTUDENT: 'Werkstudent',
  PRAKTIKUM: 'Praktikum',
  FREIBERUFLICH: 'Freiberuflich',
}

function renderContent(text: string | null | undefined) {
  if (!text) return null

  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let listItems: string[] = []
  let key = 0

  const flushList = () => {
    if (listItems.length === 0) return
    elements.push(
      <ul key={key++} className="my-4 space-y-2 pl-1">
        {listItems.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>,
    )
    listItems = []
  }

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      flushList()
      continue
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      listItems.push(trimmed.slice(2))
    } else {
      flushList()
      elements.push(
        <p key={key++} className="my-3">
          {trimmed}
        </p>,
      )
    }
  }

  flushList()

  return elements
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = await getPublicJob(slug)

  if (!result.success || !result.data) {
    return { title: 'Stelle nicht gefunden – IMPULS' }
  }

  const job = result.data as { title: string; shortIntro: string }

  return {
    title: `${job.title} – Karriere bei IMPULS`,
    description: job.shortIntro,
  }
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = await getPublicJob(slug)

  if (!result.success || !result.data) {
    notFound()
  }

  const job = result.data as {
    id: string
    title: string
    slug: string
    department: string | null
    location: string
    employmentType: string
    workload: string | null
    shortIntro: string
    description: string
    requirements: string | null
    benefits: string | null
  }

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

        <Container size="lg">
          {/* Breadcrumb */}
          <MotionWrapper>
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center gap-1.5 text-sm text-warm-400"
            >
              <Link
                href="/karriere"
                className="transition-colors duration-150 hover:text-primary-600"
              >
                Karriere
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="truncate text-warm-600">{job.title}</span>
            </nav>
          </MotionWrapper>

          <div className="max-w-3xl">
            <MotionWrapper delay={0.05}>
              {job.department && (
                <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
                  {job.department}
                </p>
              )}
              <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-warm-900 sm:text-4xl lg:text-5xl lg:leading-[1.15]">
                {job.title}
              </h1>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Badge variant="primary">
                  {employmentTypeLabels[job.employmentType] ??
                    job.employmentType}
                </Badge>
                {job.workload && (
                  <span className="flex items-center gap-1.5 text-sm text-warm-500">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {job.workload}
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-sm text-warm-500">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {job.location}
                </span>
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-warm-600">
                {job.shortIntro}
              </p>
            </MotionWrapper>
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section className="bg-white py-16 sm:py-24">
        <Container size="lg">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
            {/* Main content */}
            <div className="min-w-0">
              {/* Description */}
              <MotionWrapper>
                <div>
                  <h2 className="text-xl font-bold text-warm-900 sm:text-2xl">
                    Stellenbeschreibung
                  </h2>
                  <div className="mt-4 text-base leading-relaxed text-warm-600">
                    {renderContent(job.description)}
                  </div>
                </div>
              </MotionWrapper>

              {/* Requirements */}
              {job.requirements && (
                <MotionWrapper delay={0.1}>
                  <div className="mt-12 border-t border-warm-200 pt-12">
                    <h2 className="text-xl font-bold text-warm-900 sm:text-2xl">
                      Anforderungen
                    </h2>
                    <div className="mt-4 text-base leading-relaxed text-warm-600">
                      {renderContent(job.requirements)}
                    </div>
                  </div>
                </MotionWrapper>
              )}

              {/* Benefits */}
              {job.benefits && (
                <MotionWrapper delay={0.15}>
                  <div className="mt-12 border-t border-warm-200 pt-12">
                    <h2 className="text-xl font-bold text-warm-900 sm:text-2xl">
                      Was wir bieten
                    </h2>
                    <div className="mt-4 text-base leading-relaxed text-warm-600">
                      {renderContent(job.benefits)}
                    </div>
                  </div>
                </MotionWrapper>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-8">
              <MotionWrapper delay={0.1}>
                <div className="rounded-xl border border-warm-200 bg-warm-50/50 p-6 sm:p-8">
                  <h3 className="text-lg font-semibold text-warm-900">
                    Interesse geweckt?
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-warm-500">
                    Bewerben Sie sich jetzt auf diese Stelle. Wir freuen uns
                    darauf, Sie kennenzulernen.
                  </p>
                  <Link
                    href={`/bewerbung?stelle=${job.slug}`}
                    className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-primary-600 active:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  >
                    Jetzt bewerben
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>

                  <div className="mt-6 space-y-3 border-t border-warm-200 pt-6">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-warm-400">
                        Beschäftigungsart
                      </p>
                      <p className="mt-1 text-sm font-medium text-warm-700">
                        {employmentTypeLabels[job.employmentType] ??
                          job.employmentType}
                      </p>
                    </div>
                    {job.workload && (
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-warm-400">
                          Arbeitsumfang
                        </p>
                        <p className="mt-1 text-sm font-medium text-warm-700">
                          {job.workload}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-warm-400">
                        Standort
                      </p>
                      <p className="mt-1 text-sm font-medium text-warm-700">
                        {job.location}
                      </p>
                    </div>
                    {job.department && (
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-warm-400">
                          Bereich
                        </p>
                        <p className="mt-1 text-sm font-medium text-warm-700">
                          {job.department}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </MotionWrapper>

              <MotionWrapper delay={0.15}>
                <div className="mt-4 text-center">
                  <Link
                    href="/karriere"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-warm-500 transition-colors duration-200 hover:text-primary-600"
                  >
                    Alle Stellen ansehen
                  </Link>
                </div>
              </MotionWrapper>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
