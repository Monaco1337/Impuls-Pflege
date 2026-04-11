import Link from 'next/link'
import {
  Heart,
  Shield,
  GraduationCap,
  Clock,
  Fingerprint,
  Users,
  MapPin,
  ArrowRight,
  Phone,
} from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { MotionWrapper } from '@/components/sections/motion-wrapper'

export const metadata = {
  title: 'Über uns – IMPULS Ambulanter Pflegedienst in Unna',
  description:
    'Lernen Sie das Team hinter IMPULS kennen – engagiert, erfahren und mit Herz bei der Sache. Ambulante Pflege in Unna mit Menschlichkeit und Kompetenz.',
}

const values = [
  {
    icon: Heart,
    title: 'Menschlichkeit',
    description:
      'Pflege beginnt mit Mitgefühl. Wir begegnen jedem Menschen mit Wärme, Empathie und aufrichtigem Interesse an seinem Wohlbefinden.',
  },
  {
    icon: Shield,
    title: 'Respekt & Würde',
    description:
      'Jeder Mensch verdient es, mit Achtung behandelt zu werden – unabhängig von Alter, Herkunft oder gesundheitlicher Situation.',
  },
  {
    icon: GraduationCap,
    title: 'Fachliche Kompetenz',
    description:
      'Exzellente Pflege erfordert fundiertes Wissen. Unser Team bildet sich kontinuierlich fort, um Ihnen die bestmögliche Versorgung zu bieten.',
  },
  {
    icon: Clock,
    title: 'Verlässlichkeit',
    description:
      'Vertrauen entsteht durch Beständigkeit. Wir halten unsere Zusagen, sind pünktlich und stehen Ihnen zuverlässig zur Seite.',
  },
  {
    icon: Fingerprint,
    title: 'Individualität',
    description:
      'Kein Mensch ist wie der andere. Wir passen unsere Pflege an Ihre persönlichen Bedürfnisse, Wünsche und Lebensgewohnheiten an.',
  },
]

export default function UeberUnsPage() {
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
                Über uns
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-warm-900 sm:text-4xl lg:text-5xl lg:leading-[1.15]">
                Über uns
              </h1>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-warm-600 sm:text-xl">
                Lernen Sie das Team hinter IMPULS kennen – engagiert, erfahren
                und mit Herz bei der Sache.
              </p>
            </MotionWrapper>
          </div>
        </Container>
      </Section>

      {/* Mission */}
      <Section className="bg-white py-16 sm:py-24">
        <Container size="lg">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <MotionWrapper>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
                  Unsere Geschichte
                </p>
                <h2 className="mt-3 text-2xl font-bold leading-tight text-warm-900 sm:text-3xl lg:text-4xl">
                  Unsere Mission
                </h2>
              </MotionWrapper>

              <MotionWrapper delay={0.1}>
                <div className="mt-6 space-y-5 text-base leading-relaxed text-warm-600 sm:text-lg">
                  <p>
                    IMPULS wurde mit einer klaren Überzeugung gegründet: Jeder
                    Mensch hat das Recht, in seiner vertrauten Umgebung
                    würdevoll und selbstbestimmt zu leben – auch wenn er auf
                    Unterstützung angewiesen ist. Dieser Grundsatz prägt unser
                    tägliches Handeln in Unna und Umgebung.
                  </p>
                  <p>
                    Als ambulanter Pflegedienst verstehen wir uns nicht nur als
                    Dienstleister, sondern als verlässlicher Begleiter in einer
                    Lebensphase, die Vertrauen und Einfühlungsvermögen
                    erfordert. Wir wissen, wie wichtig es ist, die richtige
                    Balance zwischen professioneller Pflege und persönlicher
                    Nähe zu finden.
                  </p>
                  <p>
                    Unsere Arbeit beginnt immer mit Zuhören. Wir nehmen uns
                    Zeit, die individuelle Lebenssituation zu verstehen, und
                    entwickeln daraus einen Versorgungsplan, der wirklich passt –
                    fachlich fundiert, menschlich warmherzig und flexibel genug,
                    um sich Ihrem Alltag anzupassen.
                  </p>
                  <p>
                    Bei IMPULS erleben Sie Pflege, die nicht nur versorgt,
                    sondern bereichert. Wir geben den Menschen in Unna und
                    Umgebung die Sicherheit, dass sie in guten Händen sind –
                    heute und morgen.
                  </p>
                </div>
              </MotionWrapper>
            </div>

            <MotionWrapper delay={0.15}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-warm-50 to-primary-50 ring-1 ring-warm-200/60">
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                    <div className="h-16 w-16 rounded-full bg-primary-100" />
                    <p className="text-sm text-warm-400">Bildelement</p>
                  </div>
                </div>
                <div
                  className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-accent-100) 0%, var(--color-primary-100) 100%)',
                  }}
                  aria-hidden="true"
                />
              </div>
            </MotionWrapper>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section className="bg-warm-50/50 py-16 sm:py-24">
        <Container size="lg">
          <MotionWrapper>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
                Wofür wir stehen
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-warm-900 sm:text-3xl lg:text-4xl">
                Unsere Werte
              </h2>
              <p className="mt-4 text-base leading-relaxed text-warm-500 sm:text-lg">
                Diese Werte leiten uns jeden Tag – in der Pflege, in der
                Beratung und im Umgang miteinander.
              </p>
            </div>
          </MotionWrapper>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <MotionWrapper key={value.title} delay={0.05 * i}>
                  <div className="rounded-xl border border-warm-200 bg-white px-6 py-8 transition-all duration-200 hover:border-primary-200 hover:shadow-md">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                      <Icon
                        className="h-5 w-5 text-primary-600"
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-warm-900">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-warm-500">
                      {value.description}
                    </p>
                  </div>
                </MotionWrapper>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section className="bg-white py-16 sm:py-24">
        <Container size="lg">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <MotionWrapper>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-100/60 to-accent-100/40 ring-1 ring-primary-200/40">
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-200/60">
                      <Users
                        className="h-8 w-8 text-primary-500"
                        aria-hidden="true"
                      />
                    </span>
                    <p className="text-sm text-warm-400">Bildelement</p>
                  </div>
                </div>
              </div>
            </MotionWrapper>

            <div>
              <MotionWrapper delay={0.1}>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
                  Gemeinsam stark
                </p>
                <h2 className="mt-3 text-2xl font-bold leading-tight text-warm-900 sm:text-3xl lg:text-4xl">
                  Unser Team
                </h2>
              </MotionWrapper>

              <MotionWrapper delay={0.15}>
                <div className="mt-6 space-y-5 text-base leading-relaxed text-warm-600 sm:text-lg">
                  <p>
                    Hinter IMPULS steht ein engagiertes Team aus examinierten
                    Pflegefachkräften, Pflegehilfskräften und
                    Betreuungsmitarbeitenden, die eines gemeinsam haben: die
                    Leidenschaft für gute Pflege und die aufrichtige
                    Zuwendung zu den Menschen, die uns vertrauen.
                  </p>
                  <p>
                    Vielfalt bereichert unser Team. Unterschiedliche
                    Erfahrungshintergründe und Fachkompetenzen ermöglichen es
                    uns, individuell auf die Bedürfnisse jedes Einzelnen
                    einzugehen. Regelmäßige Fort- und Weiterbildungen
                    sichern dabei ein dauerhaft hohes Qualitätsniveau.
                  </p>
                  <p>
                    Ein wertschätzendes Arbeitsklima, kurze Entscheidungswege
                    und echte Teamarbeit bilden das Fundament unserer
                    Pflegequalität. Denn nur wer sich selbst wohlfühlt, kann
                    andere Menschen mit Herzlichkeit und Kompetenz versorgen.
                  </p>
                </div>
              </MotionWrapper>

              <MotionWrapper delay={0.2}>
                <div className="mt-8">
                  <Link
                    href="/karriere"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary-50 px-6 py-3 text-sm font-semibold text-primary-700 transition-colors duration-200 hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  >
                    Karriere bei IMPULS
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </MotionWrapper>
            </div>
          </div>
        </Container>
      </Section>

      {/* Service area */}
      <Section className="bg-warm-50/50 py-16 sm:py-24">
        <Container size="lg">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <MotionWrapper>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
                  Regional verwurzelt
                </p>
                <h2 className="mt-3 text-2xl font-bold leading-tight text-warm-900 sm:text-3xl lg:text-4xl">
                  Unser Versorgungsgebiet
                </h2>
              </MotionWrapper>

              <MotionWrapper delay={0.1}>
                <div className="mt-6 space-y-5 text-base leading-relaxed text-warm-600 sm:text-lg">
                  <p>
                    Unser Zuhause ist Unna – und genau hier kennen wir uns
                    aus. Als ambulanter Pflegedienst mit regionaler
                    Verankerung versorgen wir Menschen in Unna und den
                    umliegenden Gemeinden mit kurzen Anfahrtswegen und
                    persönlicher Verbundenheit.
                  </p>
                  <p>
                    Diese Nähe ist kein Zufall, sondern Überzeugung: Wir
                    möchten für unsere Klientinnen und Klienten erreichbar
                    sein – nicht nur telefonisch, sondern auch im wortwörtlichen
                    Sinne. So können wir schnell reagieren, flexibel planen
                    und die Versorgung gewährleisten, auf die Sie sich
                    verlassen können.
                  </p>
                </div>
              </MotionWrapper>

              <MotionWrapper delay={0.15}>
                <div className="mt-6 flex items-start gap-4 rounded-xl border border-warm-200 bg-white p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                    <MapPin
                      className="h-5 w-5 text-primary-600"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-warm-900">
                      Unna und Umgebung
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-warm-500">
                      Wir betreuen Klientinnen und Klienten in Unna, Königsborn,
                      Massen, Hemmerde, Billmerich, Lünern und weiteren
                      umliegenden Ortsteilen.
                    </p>
                  </div>
                </div>
              </MotionWrapper>
            </div>

            <MotionWrapper delay={0.2}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-warm-50 to-accent-50 ring-1 ring-warm-200/60">
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-100/80">
                      <MapPin
                        className="h-8 w-8 text-accent-500"
                        aria-hidden="true"
                      />
                    </span>
                    <p className="text-sm text-warm-400">Kartenansicht</p>
                  </div>
                </div>
                <div
                  className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-primary-100) 0%, var(--color-accent-100) 100%)',
                  }}
                  aria-hidden="true"
                />
              </div>
            </MotionWrapper>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-primary-50/60 py-16 sm:py-24">
        <Container size="lg">
          <div className="mx-auto max-w-2xl text-center">
            <MotionWrapper>
              <h2 className="text-2xl font-bold leading-tight text-warm-900 sm:text-3xl lg:text-4xl">
                Kontaktieren Sie uns
              </h2>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-warm-600 sm:text-lg">
                Haben Sie Fragen oder wünschen eine persönliche Beratung? Wir
                freuen uns darauf, Sie kennenzulernen und gemeinsam die passende
                Unterstützung für Ihre Situation zu finden.
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.15}>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <Link
                  href="/kontakt"
                  className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-primary-500 px-7 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-primary-600 active:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:w-auto"
                >
                  Jetzt Kontakt aufnehmen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/karriere"
                  className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg border border-warm-300 bg-white px-7 text-base font-semibold text-warm-700 transition-colors duration-200 hover:bg-warm-50 active:bg-warm-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:w-auto"
                >
                  Karriere entdecken
                </Link>
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <div className="mt-4 flex justify-center">
                <a
                  href="tel:+492303123456"
                  className="inline-flex items-center gap-2 text-sm font-medium text-warm-500 transition-colors duration-200 hover:text-primary-600"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Oder rufen Sie uns an: 02303 / 123 456
                </a>
              </div>
            </MotionWrapper>
          </div>
        </Container>
      </Section>
    </>
  )
}
