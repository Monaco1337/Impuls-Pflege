import Link from 'next/link'
import {
  Heart,
  Stethoscope,
  Smile,
  Home,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  Phone,
  CheckCircle2,
} from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { MotionWrapper } from '@/components/sections/motion-wrapper'

export const metadata = {
  title: 'Leistungen – IMPULS Ambulanter Pflegedienst in Unna',
  description:
    'Umfassende ambulante Pflege und Betreuung in Unna: Grundpflege, Behandlungspflege, Betreuungsangebote, hauswirtschaftliche Unterstützung und individuelle Beratung.',
}

const services = [
  {
    icon: Heart,
    title: 'Grundpflege',
    description:
      'Körperpflege, Ernährung und Mobilität gehören zu den grundlegendsten Bedürfnissen eines jeden Menschen. Wenn diese Bereiche nicht mehr selbstständig bewältigt werden können, ist verlässliche Unterstützung gefragt – einfühlsam, respektvoll und ganz auf Ihre persönlichen Gewohnheiten abgestimmt. Unser Team begleitet Sie mit Geduld und Wärme durch den Alltag, damit Sie sich sicher und wohl fühlen.',
    items: [
      'Körperpflege (Waschen, Duschen, Baden)',
      'Unterstützung beim An- und Auskleiden',
      'Hilfe bei der Nahrungsaufnahme',
      'Lagern und Mobilisieren',
      'Unterstützung beim Toilettengang',
      'Hautpflege und Prophylaxen',
    ],
  },
  {
    icon: Stethoscope,
    title: 'Behandlungspflege',
    description:
      'Medizinische Pflege erfordert höchste Sorgfalt und Fachkompetenz. Unsere examinierten Pflegekräfte führen alle verordneten Maßnahmen zuverlässig und professionell durch – in enger Abstimmung mit Ihrem behandelnden Arzt. So erhalten Sie die medizinische Versorgung, die Sie brauchen, ohne Ihr Zuhause verlassen zu müssen.',
    items: [
      'Medikamentengabe und -überwachung',
      'Wundversorgung und Verbandswechsel',
      'Injektionen (z. B. Insulin)',
      'Blutzucker- und Blutdruckmessung',
      'Kompressionstherapie',
      'Katheter- und Stomapflege',
    ],
  },
  {
    icon: Smile,
    title: 'Betreuungsangebote',
    description:
      'Gute Pflege ist mehr als medizinische Versorgung – sie umfasst auch Zuwendung, Anregung und menschliche Nähe. Unsere Betreuungsangebote schaffen Momente der Freude und fördern die geistige Aktivität. Ob gemeinsame Spaziergänge, anregende Gespräche oder kreative Beschäftigung: Wir bringen Lebensqualität in Ihren Alltag.',
    items: [
      'Spaziergänge und Begleitung im Freien',
      'Gespräche und Gesellschaft',
      'Gedächtnistraining und Denkspiele',
      'Kreative Beschäftigung und Vorlesen',
      'Unterstützung bei Hobbys',
      'Begleitung zu Terminen und Veranstaltungen',
    ],
  },
  {
    icon: Home,
    title: 'Hauswirtschaftliche Unterstützung',
    description:
      'Ein gepflegtes und ordentliches Zuhause trägt wesentlich zum Wohlbefinden bei. Wenn der Haushalt zur Herausforderung wird, übernehmen wir die Aufgaben, die Ihnen schwerfallen – zuverlässig und diskret. So bleibt Ihr Zuhause ein Ort, an dem Sie sich rundum wohlfühlen.',
    items: [
      'Reinigung der Wohnung',
      'Wäschepflege und Bügeln',
      'Einkäufe und Besorgungen',
      'Zubereitung von Mahlzeiten',
      'Müllentsorgung und Hausordnung',
      'Beheizen und Lüften der Räume',
    ],
  },
  {
    icon: MessageCircle,
    title: 'Individuelle Beratung',
    description:
      'Die Pflegelandschaft in Deutschland ist komplex – von Pflegegraden über Kassenleistungen bis zu Entlastungsangeboten. Wir stehen Ihnen und Ihren Angehörigen als kompetente Ansprechpartner zur Seite und helfen Ihnen, die bestmögliche Versorgung zu finden und alle Ihnen zustehenden Leistungen in Anspruch zu nehmen.',
    items: [
      'Beratung zu Pflegeleistungen und Pflegegraden',
      'Unterstützung bei Anträgen an die Pflegekasse',
      'Information über Entlastungsleistungen (§ 45b SGB XI)',
      'Beratung zu Verhinderungs- und Kurzzeitpflege',
      'Klärung der Kostenübernahme',
      'Individuelle Versorgungsplanung',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Pflege in vertrauter Umgebung',
    description:
      'Das eigene Zuhause ist mehr als vier Wände – es ist ein Ort voller Erinnerungen, Geborgenheit und Selbstbestimmung. Unsere gesamte Philosophie baut auf der Überzeugung, dass Menschen am besten dort versorgt werden, wo sie sich heimisch fühlen. Wir passen unsere Pflege an Ihr Leben an – nicht umgekehrt.',
    items: [
      'Pflege und Betreuung in Ihrem Zuhause',
      'Wahrung von Selbstständigkeit und Eigenständigkeit',
      'Feste Bezugspflegekräfte für Vertrauen und Kontinuität',
      'Flexible Einsatzzeiten nach Ihrem Rhythmus',
      'Enge Einbindung von Angehörigen',
      'Respektvoller Umgang in vertrauter Atmosphäre',
    ],
  },
]

export default function LeistungenPage() {
  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-warm-50 via-white to-white pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-20">
        <div
          className="pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] rounded-full opacity-[0.08]"
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
                Leistungen
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-warm-900 sm:text-4xl lg:text-5xl lg:leading-[1.15]">
                Unsere Leistungen
              </h1>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-warm-600 sm:text-xl">
                Umfassende ambulante Pflege und Betreuung – individuell auf Ihre
                Bedürfnisse abgestimmt.
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.15}>
              <p className="mt-4 text-base leading-relaxed text-warm-500 sm:text-lg">
                Von der professionellen Grund- und Behandlungspflege über
                aktivierende Betreuung bis hin zur Unterstützung im Haushalt:
                Bei IMPULS erhalten Sie genau die Hilfe, die zu Ihrem Leben
                passt.
              </p>
            </MotionWrapper>
          </div>
        </Container>
      </Section>

      {/* Service sections */}
      {services.map((service, index) => {
        const Icon = service.icon
        const isReversed = index % 2 !== 0

        return (
          <Section
            key={service.title}
            className={`py-16 sm:py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-warm-50/50'}`}
          >
            <Container size="lg">
              <div
                className={`grid items-start gap-12 lg:grid-cols-2 lg:gap-20 ${isReversed ? 'lg:[direction:rtl]' : ''}`}
              >
                {/* Text */}
                <div className={isReversed ? 'lg:[direction:ltr]' : ''}>
                  <MotionWrapper>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                        <Icon
                          className="h-5 w-5 text-primary-600"
                          aria-hidden="true"
                        />
                      </span>
                      <h2 className="text-2xl font-bold leading-tight text-warm-900 sm:text-3xl">
                        {service.title}
                      </h2>
                    </div>
                  </MotionWrapper>

                  <MotionWrapper delay={0.1}>
                    <p className="mt-5 text-base leading-relaxed text-warm-600 sm:text-lg">
                      {service.description}
                    </p>
                  </MotionWrapper>

                  <MotionWrapper delay={0.15}>
                    <ul className="mt-6 space-y-3">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2
                            className="mt-0.5 h-5 w-5 shrink-0 text-primary-500"
                            aria-hidden="true"
                          />
                          <span className="text-sm leading-relaxed text-warm-700 sm:text-base">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </MotionWrapper>
                </div>

                {/* Visual element */}
                <MotionWrapper
                  delay={0.2}
                  className={isReversed ? 'lg:[direction:ltr]' : ''}
                >
                  <div className="relative">
                    <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-warm-50 to-primary-50 ring-1 ring-warm-200/60">
                      <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100/80">
                          <Icon
                            className="h-8 w-8 text-primary-500"
                            aria-hidden="true"
                          />
                        </span>
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
        )
      })}

      {/* CTA */}
      <Section className="bg-primary-50/60 py-16 sm:py-24">
        <Container size="lg">
          <div className="mx-auto max-w-2xl text-center">
            <MotionWrapper>
              <h2 className="text-2xl font-bold leading-tight text-warm-900 sm:text-3xl lg:text-4xl">
                Haben Sie Fragen zu unseren Leistungen?
              </h2>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-warm-600 sm:text-lg">
                Wir beraten Sie gerne persönlich und unverbindlich zu allen
                unseren Pflege- und Betreuungsleistungen. Gemeinsam finden wir
                die passende Unterstützung für Ihre Situation.
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.15}>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <Link
                  href="/kontakt"
                  className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-primary-500 px-7 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-primary-600 active:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:w-auto"
                >
                  Jetzt unverbindlich anfragen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href="tel:+492303123456"
                  className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg border border-warm-300 bg-white px-7 text-base font-semibold text-warm-700 transition-colors duration-200 hover:bg-warm-50 active:bg-warm-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:w-auto"
                >
                  <Phone className="h-4 w-4 text-primary-500" aria-hidden="true" />
                  02303 / 123 456
                </a>
              </div>
            </MotionWrapper>
          </div>
        </Container>
      </Section>
    </>
  )
}
