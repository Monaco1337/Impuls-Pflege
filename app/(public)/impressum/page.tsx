import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { MotionWrapper } from '@/components/sections/motion-wrapper'

export const metadata = {
  title: 'Impressum – IMPULS Ambulanter Pflegedienst',
  description:
    'Impressum und rechtliche Angaben der IMPULS Ambulanter Pflegedienst in Unna gemäß § 5 TMG.',
}

export default function ImpressumPage() {
  return (
    <>
      {/* Hero */}
      <Section className="bg-gradient-to-b from-warm-50 via-white to-white pt-16 pb-8 sm:pt-24 sm:pb-12 lg:pt-32 lg:pb-14">
        <Container size="md">
          <MotionWrapper>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
              Rechtliches
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-warm-900 sm:text-4xl lg:text-5xl">
              Impressum
            </h1>
          </MotionWrapper>
        </Container>
      </Section>

      {/* Content */}
      <Section className="bg-white py-12 sm:py-16">
        <Container size="md">
          <div className="prose-warm max-w-none space-y-12 text-warm-700">
            {/* Angaben gemäß § 5 TMG */}
            <MotionWrapper>
              <div>
                <h2 className="text-xl font-bold text-warm-900">
                  Angaben gemäß § 5 TMG
                </h2>
                <div className="mt-4 space-y-1 text-sm leading-relaxed">
                  <p className="font-semibold text-warm-900">
                    IMPULS Ambulanter Pflegedienst
                  </p>
                  <p>Musterstraße 1</p>
                  <p>59423 Unna</p>
                </div>
              </div>
            </MotionWrapper>

            {/* Vertreten durch */}
            <MotionWrapper delay={0.05}>
              <div>
                <h2 className="text-xl font-bold text-warm-900">
                  Vertreten durch
                </h2>
                <p className="mt-4 text-sm leading-relaxed">
                  Geschäftsführer/in: [Name der Geschäftsführung]
                </p>
              </div>
            </MotionWrapper>

            {/* Kontakt */}
            <MotionWrapper delay={0.1}>
              <div>
                <h2 className="text-xl font-bold text-warm-900">Kontakt</h2>
                <div className="mt-4 space-y-1 text-sm leading-relaxed">
                  <p>
                    Telefon:{' '}
                    <a
                      href="tel:+492303123456"
                      className="font-medium text-primary-600 underline underline-offset-2 transition-colors hover:text-primary-700"
                    >
                      02303 / 123 456
                    </a>
                  </p>
                  <p>
                    E-Mail:{' '}
                    <a
                      href="mailto:info@impuls-pflege.de"
                      className="font-medium text-primary-600 underline underline-offset-2 transition-colors hover:text-primary-700"
                    >
                      info@impuls-pflege.de
                    </a>
                  </p>
                </div>
              </div>
            </MotionWrapper>

            {/* Aufsichtsbehörde */}
            <MotionWrapper delay={0.15}>
              <div>
                <h2 className="text-xl font-bold text-warm-900">
                  Aufsichtsbehörde
                </h2>
                <p className="mt-4 text-sm leading-relaxed">
                  [Zuständige Aufsichtsbehörde, z.&nbsp;B. Bezirksregierung
                  Arnsberg oder zuständige Kreisverwaltung]
                </p>
              </div>
            </MotionWrapper>

            {/* Berufsbezeichnung / Kammer */}
            <MotionWrapper delay={0.2}>
              <div>
                <h2 className="text-xl font-bold text-warm-900">
                  Berufsbezeichnung und berufsrechtliche Regelungen
                </h2>
                <div className="mt-4 space-y-1 text-sm leading-relaxed">
                  <p>
                    Berufsbezeichnung: [z.&nbsp;B. Gesundheits- und
                    Krankenpfleger/in, Altenpfleger/in]
                  </p>
                  <p>Verliehen in: Bundesrepublik Deutschland</p>
                  <p>
                    Zuständige Kammer: [Name der zuständigen Pflegekammer oder
                    Berufsgenossenschaft]
                  </p>
                  <p>
                    Es gelten folgende berufsrechtliche Regelungen:
                    Pflegeberufegesetz (PflBG), einsehbar unter{' '}
                    <a
                      href="https://www.gesetze-im-internet.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary-600 underline underline-offset-2 transition-colors hover:text-primary-700"
                    >
                      www.gesetze-im-internet.de
                    </a>
                  </p>
                </div>
              </div>
            </MotionWrapper>

            {/* Streitschlichtung */}
            <MotionWrapper delay={0.25}>
              <div>
                <h2 className="text-xl font-bold text-warm-900">
                  EU-Streitschlichtung
                </h2>
                <p className="mt-4 text-sm leading-relaxed">
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit:{' '}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary-600 underline underline-offset-2 break-all transition-colors hover:text-primary-700"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                  . Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind
                  nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
                  einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </MotionWrapper>

            <hr className="border-warm-200" />

            {/* Haftung für Inhalte */}
            <MotionWrapper delay={0.3}>
              <div>
                <h2 className="text-xl font-bold text-warm-900">
                  Haftung für Inhalte
                </h2>
                <p className="mt-4 text-sm leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
                  Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                  verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                  gespeicherte fremde Informationen zu überwachen oder nach
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                  hinweisen.
                </p>
                <p className="mt-3 text-sm leading-relaxed">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                  Informationen nach den allgemeinen Gesetzen bleiben hiervon
                  unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
                  Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                  möglich. Bei Bekanntwerden von entsprechenden
                  Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </div>
            </MotionWrapper>

            {/* Haftung für Links */}
            <MotionWrapper delay={0.35}>
              <div>
                <h2 className="text-xl font-bold text-warm-900">
                  Haftung für Links
                </h2>
                <p className="mt-4 text-sm leading-relaxed">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf
                  deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                  diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                  Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                  oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
                  wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
                  überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
                  Verlinkung nicht erkennbar.
                </p>
                <p className="mt-3 text-sm leading-relaxed">
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
                  jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
                  zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
                  derartige Links umgehend entfernen.
                </p>
              </div>
            </MotionWrapper>

            {/* Urheberrecht */}
            <MotionWrapper delay={0.4}>
              <div>
                <h2 className="text-xl font-bold text-warm-900">
                  Urheberrecht
                </h2>
                <p className="mt-4 text-sm leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                  diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
                  schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  Downloads und Kopien dieser Seite sind nur für den privaten,
                  nicht kommerziellen Gebrauch gestattet.
                </p>
                <p className="mt-3 text-sm leading-relaxed">
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
                  wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
                  werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
                  trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
                  bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden
                  von Rechtsverletzungen werden wir derartige Inhalte umgehend
                  entfernen.
                </p>
              </div>
            </MotionWrapper>
          </div>
        </Container>
      </Section>
    </>
  )
}
