import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/animations/fade-in'

export const metadata = {
  title: 'Impressum – IMPULS Ambulanter Pflegedienst',
  description:
    'Impressum und rechtliche Angaben der IMPULS Ambulanter Pflegedienst in Unna gemäß § 5 TMG.',
}

const MINT = '#18C1A3'

function LegalSection({
  title,
  children,
  delay = 0,
}: {
  title: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <FadeIn delay={delay} direction="up" distance={14}>
      <div
        className="rounded-[20px] border bg-white p-7 sm:p-8"
        style={{ borderColor: 'rgba(0,0,0,0.065)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
      >
        <h2
          className="text-[16px] font-[740] tracking-[-0.022em]"
          style={{ color: '#0F172A' }}
        >
          {title}
        </h2>
        <div
          className="mx-auto mt-1.5 h-[1.5px] w-8 rounded-full lg:mx-0"
          style={{ background: `linear-gradient(to right, ${MINT}, transparent)` }}
        />
        <div
          className="mt-5 space-y-2 text-[14.5px] font-[410] leading-[1.78] tracking-[-0.008em]"
          style={{ color: '#475569' }}
        >
          {children}
        </div>
      </div>
    </FadeIn>
  )
}

export default function ImpressumPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-20 sm:py-28"
        style={{ background: '#F7FAFA' }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
          style={{ background: 'linear-gradient(to right, transparent, rgba(24,193,163,0.45), transparent)' }}
        />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2"
            style={{ background: 'radial-gradient(ellipse, rgba(24,193,163,0.07) 0%, transparent 65%)', filter: 'blur(60px)' }}
          />
        </div>

        <Container size="md" className="relative text-center lg:text-left">
          <FadeIn>
            <p
              className="text-[11px] font-[680] uppercase tracking-[0.24em]"
              style={{ color: 'rgba(24,193,163,0.82)' }}
            >
              Rechtliches
            </p>
          </FadeIn>
          <FadeIn delay={0.07}>
            <h1
              className="mt-5 text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.07] tracking-[-0.044em]"
              style={{ color: '#0F172A' }}
            >
              Impressum
            </h1>
          </FadeIn>
          <FadeIn delay={0.13}>
            <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
              <div className="h-[1.5px] w-6 rounded-full" style={{ background: '#F24B6A' }} />
              <div className="h-[1.5px] w-16 rounded-full" style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.30), transparent)' }} />
            </div>
          </FadeIn>
          <FadeIn delay={0.18}>
            <p
              className="mx-auto mt-5 max-w-lg text-[15.5px] font-[410] leading-[1.78] tracking-[-0.01em] lg:mx-0"
              style={{ color: '#64748B' }}
            >
              Angaben gemäß § 5 TMG und rechtliche Hinweise für den Betrieb dieser Website.
            </p>
          </FadeIn>
        </Container>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />
      </section>

      {/* Content */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container size="md">
          <div className="space-y-4">

            <LegalSection title="Angaben gemäß § 5 TMG" delay={0.05}>
              <p className="font-[600]" style={{ color: '#0F172A' }}>IMPULS Ambulanter Pflegedienst</p>
              <p>Massener Str. 147</p>
              <p>59423 Unna</p>
            </LegalSection>

            <LegalSection title="Vertreten durch" delay={0.09}>
              <p>Geschäftsführerin: Elena Tschupina</p>
            </LegalSection>

            <LegalSection title="Kontakt" delay={0.13}>
              <p>
                Telefon:{' '}
                <a
                  href="tel:+4923032920589"
                  className="font-[540] underline underline-offset-2 transition-opacity hover:opacity-70"
                  style={{ color: MINT }}
                >
                  02303 2920589
                </a>
              </p>
              <p>
                E-Mail:{' '}
                <a
                  href="mailto:info@impuls-pflege.de"
                  className="font-[540] underline underline-offset-2 transition-opacity hover:opacity-70"
                  style={{ color: MINT }}
                >
                  info@impuls-pflege.de
                </a>
              </p>
            </LegalSection>

            <LegalSection title="Aufsichtsbehörde" delay={0.17}>
              <p>
                [Zuständige Aufsichtsbehörde, z.&nbsp;B. Bezirksregierung
                Arnsberg oder zuständige Kreisverwaltung]
              </p>
            </LegalSection>

            <LegalSection title="Berufsbezeichnung und berufsrechtliche Regelungen" delay={0.21}>
              <p>Berufsbezeichnung: [z.&nbsp;B. Gesundheits- und Krankenpfleger/in, Altenpfleger/in]</p>
              <p>Verliehen in: Bundesrepublik Deutschland</p>
              <p>Zuständige Kammer: [Name der zuständigen Pflegekammer oder Berufsgenossenschaft]</p>
              <p>
                Es gelten folgende berufsrechtliche Regelungen: Pflegeberufegesetz (PflBG), einsehbar unter{' '}
                <a
                  href="https://www.gesetze-im-internet.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[540] underline underline-offset-2 transition-opacity hover:opacity-70"
                  style={{ color: MINT }}
                >
                  www.gesetze-im-internet.de
                </a>
              </p>
            </LegalSection>

            <LegalSection title="EU-Streitschlichtung" delay={0.25}>
              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all font-[540] underline underline-offset-2 transition-opacity hover:opacity-70"
                  style={{ color: MINT }}
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
              <p>
                Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </LegalSection>

            {/* Separator */}
            <FadeIn delay={0.28}>
              <div className="py-2">
                <div className="h-px w-full" style={{ background: 'rgba(0,0,0,0.06)' }} />
              </div>
            </FadeIn>

            <LegalSection title="Haftung für Inhalte" delay={0.30}>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
                Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                gespeicherte fremde Informationen zu überwachen oder nach
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                Informationen nach den allgemeinen Gesetzen bleiben hiervon
                unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
                Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                möglich. Bei Bekanntwerden von entsprechenden
                Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </LegalSection>

            <LegalSection title="Haftung für Links" delay={0.34}>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
                wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
                überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
                Verlinkung nicht erkennbar.
              </p>
              <p>
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
                jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
                zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
                derartige Links umgehend entfernen.
              </p>
            </LegalSection>

            <LegalSection title="Urheberrecht" delay={0.38}>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                der schriftlichen Zustimmung des jeweiligen Autors bzw.
                Erstellers. Downloads und Kopien dieser Seite sind nur für den
                privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
              <p>
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
                wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
                werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
                trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
                bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden
                von Rechtsverletzungen werden wir derartige Inhalte umgehend
                entfernen.
              </p>
            </LegalSection>

          </div>

          {/* Back link */}
          <FadeIn delay={0.42}>
            <div className="mt-12">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-[13.5px] font-[520] tracking-[-0.01em] transition-opacity hover:opacity-60"
                style={{ color: '#64748B' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Zurück zur Startseite
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
