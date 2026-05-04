import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/animations/fade-in'

export const metadata = {
  title: 'Datenschutzerklärung – IMPULS Ambulanter Pflegedienst',
  description:
    'Datenschutzerklärung der IMPULS Ambulanter Pflegedienst in Unna. Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.',
}

const MINT = '#18C1A3'

function LegalSection({
  number,
  title,
  children,
  delay = 0,
}: {
  number: string
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
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left">
          <span
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-[740] tabular-nums"
            style={{ background: 'rgba(24,193,163,0.10)', color: MINT }}
          >
            {number}
          </span>
          <div className="min-w-0 flex-1">
            <h2
              className="text-[16px] font-[740] tracking-[-0.022em]"
              style={{ color: '#0F172A' }}
            >
              {title}
            </h2>
            <div
              className="mx-auto mt-1.5 h-[1.5px] w-8 rounded-full sm:mx-0"
              style={{ background: `linear-gradient(to right, ${MINT}, transparent)` }}
            />
            <div className="mt-5 space-y-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="pt-2 text-[14px] font-[680] tracking-[-0.015em]"
      style={{ color: '#0F172A' }}
    >
      {children}
    </h3>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[14.5px] font-[410] leading-[1.78] tracking-[-0.008em]"
      style={{ color: '#475569' }}
    >
      {children}
    </p>
  )
}

function LegalLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="break-all font-[540] underline underline-offset-2 transition-opacity hover:opacity-70"
      style={{ color: MINT }}
    >
      {children}
    </a>
  )
}

export default function DatenschutzPage() {
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
              Datenschutzerklärung
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
              Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.
            </p>
          </FadeIn>
        </Container>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />
      </section>

      {/* Content */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container size="md">
          <div className="space-y-4">

            {/* 1 */}
            <LegalSection number="1" title="Datenschutz auf einen Blick" delay={0.05}>
              <Sub>Allgemeine Hinweise</Sub>
              <P>
                Die folgenden Hinweise geben einen Überblick darüber, welche personenbezogenen
                Daten beim Besuch dieser Website und bei der Nutzung der angebotenen Formulare
                (Kontaktformular, Online-Anamnesebogen, Bewerbungsformular) erhoben und zu
                welchen genau benannten Zwecken verarbeitet werden. Personenbezogene Daten
                sind alle Informationen, die sich auf eine identifizierte oder
                identifizierbare natürliche Person beziehen (Art. 4 Nr. 1 DSGVO). Die
                vollständigen Informationen zu Verarbeitungstätigkeiten, Rechtsgrundlagen und
                Speicherdauern finden Sie in den nachfolgenden Abschnitten.
              </P>

              <Sub>Datenerfassung auf dieser Website</Sub>
              <p className="text-[14px] font-[620] tracking-[-0.012em]" style={{ color: '#334155' }}>
                Wer ist verantwortlich für die Datenerfassung auf dieser Website?
              </p>
              <P>
                Verantwortlicher im Sinne des Art. 4 Nr. 7 DSGVO ist der Websitebetreiber.
                Dessen vollständige Kontaktdaten finden Sie im Abschnitt „Hinweis zur
                verantwortlichen Stelle".
              </P>

              <p className="text-[14px] font-[620] tracking-[-0.012em]" style={{ color: '#334155' }}>
                Wie erfassen wir Ihre Daten?
              </p>
              <P>
                Wir erheben ausschließlich solche Daten, die Sie uns aktiv mitteilen
                (Eingaben in Kontaktformular, Anamnesebogen oder Bewerbungsformular,
                E-Mail-Verkehr, Telefonate, Faxsendungen) sowie technisch zwingend
                erforderliche Verbindungsdaten, die beim Aufruf der Website durch Ihren Browser
                automatisch übermittelt und in Server-Log-Dateien protokolliert werden
                (siehe Abschnitt „Server-Log-Dateien"). Wir setzen weder Tracking-Pixel noch
                Web-Analytics, Heatmaps, Werbenetzwerke, Social-Media-Plugins oder
                Profiling-Mechanismen ein.
              </P>

              <p className="text-[14px] font-[620] tracking-[-0.012em]" style={{ color: '#334155' }}>
                Wofür nutzen wir Ihre Daten?
              </p>
              <P>
                Verbindungsdaten werden ausschließlich zur Sicherstellung der technischen
                Auslieferung der Website, zur Fehleranalyse und zur Abwehr missbräuchlicher
                Zugriffe verarbeitet. Daten aus Kontaktformular, Anamnesebogen und
                Bewerbungsformular werden ausschließlich zur Bearbeitung der jeweils konkreten
                Anfrage, zur Anbahnung und Durchführung des Pflegevertrags bzw. zur
                Durchführung des Bewerbungsverfahrens verwendet. Eine darüber hinausgehende
                Nutzung – insbesondere zu Werbezwecken, zur Profilbildung oder zur Weitergabe
                an Dritte zu eigenen Zwecken Dritter – findet nicht statt.
              </P>

              <p className="text-[14px] font-[620] tracking-[-0.012em]" style={{ color: '#334155' }}>
                Welche Rechte haben Sie bezüglich Ihrer Daten?
              </p>
              <P>
                Ihnen stehen die Rechte aus Art. 15 bis 22 DSGVO zu: Auskunft (Art. 15),
                Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung
                (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen
                auf Grundlage berechtigter Interessen (Art. 21). Erteilte Einwilligungen
                können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3
                DSGVO). Ihnen steht ferner ein Beschwerderecht bei der zuständigen
                Aufsichtsbehörde zu (Art. 77 DSGVO; siehe Abschnitt „Beschwerderecht").
              </P>
            </LegalSection>

            {/* 2 */}
            <LegalSection number="2" title="Allgemeine Hinweise und Pflichtinformationen" delay={0.08}>
              <Sub>Datenschutz</Sub>
              <P>
                Der Schutz Ihrer personenbezogenen Daten hat für uns höchste Priorität. Wir
                verarbeiten Ihre Daten ausschließlich auf Grundlage der DSGVO, des BDSG, des
                TDDDG sowie – soweit einschlägig – der Vorgaben des SGB XI und des § 630f
                BGB. Eine Weitergabe an Dritte erfolgt ausschließlich zu den in dieser
                Datenschutzerklärung benannten Zwecken und auf den dort genannten
                Rechtsgrundlagen.
              </P>
              <P>
                Hinweis zur Datenübertragung im Internet: Bei unverschlüsselter Kommunikation
                per E-Mail kann ein lückenloser Schutz vor Kenntnisnahme durch Dritte nicht
                gewährleistet werden. Für die Übermittlung sensibler Daten empfehlen wir die
                Nutzung des verschlüsselten Online-Anamnesebogens, des Telefons, des Fax oder
                postalischer Übermittlung.
              </P>

              <Sub>Hinweis zur verantwortlichen Stelle</Sub>
              <P>Verantwortlicher im Sinne des Art. 4 Nr. 7 DSGVO ist:</P>
              <div
                className="rounded-[14px] border p-5"
                style={{ borderColor: 'rgba(24,193,163,0.18)', background: 'rgba(24,193,163,0.04)' }}
              >
                <p className="text-[14.5px] font-[660] tracking-[-0.012em]" style={{ color: '#0F172A' }}>
                  IMPULS Ambulanter Pflegedienst
                </p>
                <p className="mt-1 text-[14px] font-[420] leading-[1.65]" style={{ color: '#475569' }}>
                  Inhaberin: Elena Tschupina<br />
                  Massener Str. 147<br />
                  59423 Unna
                </p>
                <div className="mt-3 space-y-1 text-[14px] font-[420]" style={{ color: '#475569' }}>
                  <p>Telefon: <LegalLink href="tel:+4923032920589">02303 2920589</LegalLink></p>
                  <p>Fax: 02303 2920587</p>
                  <p>E-Mail: <LegalLink href="mailto:info@impuls-pflege.de">info@impuls-pflege.de</LegalLink></p>
                </div>
              </div>
              <P>
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein
                oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung
                personenbezogener Daten entscheidet (Art. 4 Nr. 7 DSGVO).
              </P>

              <Sub>Datenschutzbeauftragter</Sub>
              <P>
                Eine gesetzliche Pflicht zur Bestellung eines Datenschutzbeauftragten besteht
                derzeit nicht (§ 38 Abs. 1 BDSG). Datenschutzanfragen richten Sie bitte
                schriftlich an die oben genannte Anschrift oder per E-Mail an{' '}
                <LegalLink href="mailto:info@impuls-pflege.de">info@impuls-pflege.de</LegalLink>.
              </P>

              <Sub>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung</Sub>
              <P>
                Wir verarbeiten personenbezogene Daten nur auf Grundlage einer der folgenden
                Rechtsgrundlagen:
              </P>
              <ul className="icon-list-stack space-y-2 pl-1">
                {[
                  'Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) — z. B. ausdrückliche Einwilligung in den Versand des Online-Anamnesebogens oder die Aufnahme in einen Bewerberpool.',
                  'Art. 6 Abs. 1 lit. b DSGVO (Vertrag / vorvertragliche Maßnahmen) — z. B. Pflegevertrag, Anbahnung eines Beschäftigungsverhältnisses, Bearbeitung konkreter Leistungsanfragen.',
                  'Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung) — z. B. Aufbewahrung steuer- und handelsrechtlich relevanter Belege nach §§ 147 AO, 257 HGB; Dokumentationspflichten nach § 113 SGB XI; Patientenakte nach § 630f BGB.',
                  'Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen) — z. B. Sicherstellung der technischen Auslieferung, Fehleranalyse, Abwehr missbräuchlicher Zugriffe, IT-Sicherheit, organisatorische Bearbeitung von Anfragen.',
                  'Art. 9 Abs. 2 lit. h DSGVO i. V. m. § 22 Abs. 1 Nr. 1 lit. b BDSG (Gesundheitsversorgung) — Verarbeitung von Gesundheitsdaten zur Beurteilung der Pflegebedürftigkeit, Erstellung des Pflegeplans, Abrechnung mit Pflegekassen sowie Durchführung des Pflegevertrags.',
                  'Art. 9 Abs. 2 lit. a DSGVO (ausdrückliche Einwilligung) — soweit Sie über den Online-Anamnesebogen freiwillig Gesundheitsdaten an uns übermitteln.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: MINT }} />
                    <span className="icon-list-prose min-w-0 flex-1 text-[14.5px] font-[410] leading-[1.75] tracking-[-0.008em]" style={{ color: '#475569' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <P>
                Im Falle einer ausdrücklichen Einwilligung in die Übermittlung personenbezogener
                Daten in Drittstaaten erfolgt die Datenverarbeitung zusätzlich auf Grundlage
                von Art. 49 Abs. 1 lit. a DSGVO. Die jeweils einschlägige Rechtsgrundlage wird
                im konkreten Verarbeitungsabschnitt benannt.
              </P>

              <Sub>Speicherdauer</Sub>
              <P>
                Wir speichern personenbezogene Daten nur so lange, wie dies für die jeweils
                benannten Zwecke erforderlich ist und keine längeren gesetzlichen
                Aufbewahrungsfristen entgegenstehen. Sofern in den nachfolgenden Abschnitten
                keine konkrete Frist genannt ist, gelten folgende Standardfristen:
              </P>
              <ul className="icon-list-stack space-y-2 pl-1">
                {[
                  'Server-Log-Dateien des Hosting-Anbieters: maximal 30 Tage; danach automatische Löschung durch den Auftragsverarbeiter.',
                  'Eingaben aus dem Kontaktformular: 24 Monate ab abschließender Bearbeitung der Anfrage; bei darüber hinausgehender Korrespondenzhistorie maximal 36 Monate.',
                  'Online-Anamnesebogen ohne anschließenden Pflegevertrag: 12 Monate ab Eingang; danach Löschung der digitalen Übermittlung. Übergeordnete Aufbewahrungspflichten bleiben unberührt.',
                  'Online-Anamnesebogen mit anschließendem Pflegevertrag: Übernahme in die Pflegedokumentation/Patientenakte; Aufbewahrung gemäß § 630f Abs. 3 BGB grundsätzlich 10 Jahre nach Abschluss der Behandlung.',
                  'Bewerbungsunterlagen bei Absage: 6 Monate nach Abschluss des Bewerbungsverfahrens (Verteidigung gegen Ansprüche nach AGG, § 15 Abs. 4 AGG).',
                  'Bewerbungsunterlagen mit Einwilligung in den Bewerberpool: bis Widerruf der Einwilligung, längstens 24 Monate.',
                  'Steuer- und handelsrechtlich relevante Belege: 6 bzw. 10 Jahre (§ 147 AO, § 257 HGB).',
                  'Einwilligungs- und Auditprotokolle (Consent-Logs): 3 Jahre ab Erteilung bzw. Widerruf der Einwilligung zur Erfüllung der Rechenschaftspflicht (Art. 5 Abs. 2, Art. 7 Abs. 1 DSGVO).',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: MINT }} />
                    <span className="icon-list-prose min-w-0 flex-1 text-[14.5px] font-[410] leading-[1.75] tracking-[-0.008em]" style={{ color: '#475569' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <P>
                Nach Ablauf der jeweiligen Frist werden die Daten gelöscht oder, soweit eine
                Vernichtung wegen besonderer Speicherform unverhältnismäßig wäre, in ihrer
                Verarbeitung eingeschränkt (Art. 18 DSGVO).
              </P>

              <Sub>Widerruf erteilter Einwilligungen</Sub>
              <P>
                Soweit eine Verarbeitung auf Ihrer Einwilligung beruht, können Sie diese
                jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO). Die
                Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.
                Der Widerruf kann formlos per E-Mail an{' '}
                <LegalLink href="mailto:info@impuls-pflege.de">info@impuls-pflege.de</LegalLink>,
                postalisch oder per Fax erfolgen.
              </P>

              <Sub>
                Widerspruchsrecht gegen die Datenverarbeitung in besonderen Fällen sowie gegen
                Direktwerbung (Art. 21 DSGVO)
              </Sub>
              <P>
                Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO
                erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer
                besonderen Situation ergeben, gegen die Verarbeitung Widerspruch einzulegen.
                Die jeweilige Rechtsgrundlage finden Sie im jeweiligen Verarbeitungsabschnitt.
                Direktwerbung wird durch uns nicht durchgeführt.
              </P>

              <Sub>Beschwerderecht bei der zuständigen Aufsichtsbehörde</Sub>
              <P>
                Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen
                Rechtsbehelfs steht Ihnen ein Beschwerderecht bei einer Aufsichtsbehörde zu,
                insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthalts, Ihres
                Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes (Art. 77 DSGVO).
                Zuständige Aufsichtsbehörde für den Verantwortlichen ist:
              </P>
              <div
                className="rounded-[14px] border p-5"
                style={{ borderColor: 'rgba(0,0,0,0.07)', background: '#FAFAF9' }}
              >
                <p className="text-[14px] font-[620] tracking-[-0.012em]" style={{ color: '#0F172A' }}>
                  Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen
                </p>
                <p className="mt-1 text-[14px] font-[420] leading-[1.65]" style={{ color: '#475569' }}>
                  Kavalleriestraße 2–4<br />
                  40213 Düsseldorf<br />
                  Postfach 20 04 44, 40102 Düsseldorf
                </p>
                <div className="mt-3 space-y-1 text-[14px] font-[420]" style={{ color: '#475569' }}>
                  <p>Telefon: 0211 38424-0</p>
                  <p>E-Mail: <LegalLink href="mailto:poststelle@ldi.nrw.de">poststelle@ldi.nrw.de</LegalLink></p>
                  <p>Web: <LegalLink href="https://www.ldi.nrw.de" external>www.ldi.nrw.de</LegalLink></p>
                </div>
              </div>

              <Sub>Recht auf Datenübertragbarkeit</Sub>
              <P>
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in
                Erfüllung eines Vertrags automatisiert verarbeiten, in einem strukturierten,
                gängigen und maschinenlesbaren Format zu erhalten oder die direkte Übermittlung
                an einen anderen Verantwortlichen zu verlangen, soweit dies technisch machbar
                ist (Art. 20 DSGVO).
              </P>

              <Sub>Auskunft, Berichtigung, Löschung</Sub>
              <P>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre bei uns
                gespeicherten personenbezogenen Daten, deren Herkunft, Empfänger und den Zweck
                der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung
                (Art. 15, 16, 17 DSGVO). Bitte beachten Sie, dass die Löschung beschränkt
                ist, soweit gesetzliche Aufbewahrungsfristen oder die Geltendmachung,
                Ausübung oder Verteidigung von Rechtsansprüchen entgegenstehen.
              </P>

              <Sub>Recht auf Einschränkung der Verarbeitung</Sub>
              <P>
                Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
                personenbezogenen Daten zu verlangen (Art. 18 DSGVO). Das Recht besteht
                insbesondere in folgenden Fällen:
              </P>
              <ul className="icon-list-stack space-y-2 pl-1">
                {[
                  'Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten — für die Dauer der Überprüfung.',
                  'Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig erfolgt(e) und Sie statt der Löschung die Einschränkung verlangen.',
                  'Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen.',
                  'Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben — bis zur Klärung, wessen Interessen überwiegen.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: MINT }} />
                    <span className="icon-list-prose min-w-0 flex-1 text-[14.5px] font-[410] leading-[1.75] tracking-[-0.008em]" style={{ color: '#475569' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <P>
                Eingeschränkt verarbeitete Daten dürfen – von ihrer Speicherung abgesehen – nur
                mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von
                Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder
                juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses
                der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.
              </P>

              <Sub>SSL-/TLS-Verschlüsselung</Sub>
              <P>
                Diese Website nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung
                vertraulicher Inhalte – insbesondere bei Übermittlungen an den Verantwortlichen
                über Formulare – eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte
                Verbindung erkennen Sie am „https://" in der Adresszeile Ihres Browsers sowie
                am Schloss-Symbol.
              </P>
            </LegalSection>

            {/* 3 */}
            <LegalSection number="3" title="Datenerhebung auf dieser Website" delay={0.11}>
              <Sub>Cookies und vergleichbare Technologien</Sub>
              <P>
                Im öffentlichen Bereich dieser Website (alle Seiten außerhalb des
                passwortgeschützten Verwaltungsbereichs) werden weder Tracking-Cookies noch
                Analyse-, Marketing- oder Profiling-Cookies eingesetzt. Es findet keine
                geräte- oder browserübergreifende Wiedererkennung statt.
              </P>
              <P>
                Technisch erforderlich sind ausschließlich kurzlebige Sitzungsmechanismen, die
                der ordnungsgemäßen Auslieferung der Website, der Lastverteilung und dem Schutz
                vor missbräuchlichen Zugriffen (CSRF-Schutz) dienen. Diese werden auf Grundlage
                von § 25 Abs. 2 Nr. 2 TDDDG ohne Einwilligung gesetzt, weil sie für die
                Bereitstellung des vom Nutzer ausdrücklich gewünschten Telemedien­dienstes
                unbedingt erforderlich sind. Eine darüber hinausgehende Verarbeitung der so
                erlangten Informationen erfolgt nicht.
              </P>
              <P>
                Im passwortgeschützten Verwaltungsbereich (nicht öffentlich zugänglich) werden
                authentifizierungsbezogene Sitzungs-Cookies eingesetzt, die ausschließlich der
                Anmeldung autorisierter Mitarbeiter:innen dienen. Rechtsgrundlage ist Art. 6
                Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem zugriffs- und
                manipulationsgeschützten Verwaltungsbereich) sowie § 25 Abs. 2 Nr. 2 TDDDG.
              </P>

              <Sub>Server-Log-Dateien</Sub>
              <P>
                Beim Aufruf dieser Website werden durch den Hosting-Anbieter (siehe
                Abschnitt „Hosting") technisch zwingend folgende Verbindungsdaten
                protokolliert:
              </P>
              <ul className="icon-list-stack space-y-1.5 pl-1">
                {[
                  'IP-Adresse des anfragenden Endgeräts',
                  'Datum und Uhrzeit der Anfrage',
                  'angeforderte URL und HTTP-Antwortcode',
                  'übertragene Datenmenge',
                  'Browsertyp, Browserversion und Betriebssystem',
                  'Referrer-URL (sofern übermittelt)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: MINT }} />
                    <span className="icon-list-prose min-w-0 flex-1 text-[14.5px] font-[410] tracking-[-0.008em]" style={{ color: '#475569' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <P>
                Zweck: Sicherstellung der technischen Auslieferung, Aufrechterhaltung der
                IT-Sicherheit, Erkennung und Abwehr missbräuchlicher Zugriffe (insbesondere
                Brute-Force-Angriffe, Bot-Traffic), Fehleranalyse. Eine Zusammenführung mit
                anderen Datenquellen oder eine Nutzung zu Zwecken der Reichweitenmessung,
                Profilbildung oder Werbung erfolgt nicht. Rechtsgrundlage ist Art. 6 Abs. 1
                lit. f DSGVO; das berechtigte Interesse liegt in der dargestellten technischen
                Sicherheit und Stabilität. Speicherdauer: maximal 30 Tage, anschließend
                automatische Löschung durch den Auftragsverarbeiter.
              </P>

              <Sub>Kontaktformular, E-Mail, Telefon und Fax</Sub>
              <P>
                Bei Anfragen über das Kontaktformular, per E-Mail, Telefon oder Fax verarbeiten
                wir die folgenden Daten zur Bearbeitung des konkreten Anliegens und zur
                Beantwortung etwaiger Anschlussfragen: Vor- und Nachname, E-Mail-Adresse,
                Telefonnummer, Art der Anfrage, Inhalt der Nachricht, bevorzugter Rückrufzeit,
                Bezug zur Pflegesituation (soweit von Ihnen angegeben).
              </P>
              <P>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf den
                Abschluss eines Pflegevertrags oder die Durchführung vorvertraglicher Maßnahmen
                gerichtet ist; im Übrigen Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
                der ordnungsgemäßen Bearbeitung von Anfragen). Soweit Ihre Anfrage
                Gesundheitsdaten enthält, beruht die Verarbeitung zusätzlich auf Art. 9 Abs. 2
                lit. a DSGVO (ausdrückliche Einwilligung durch freiwillige Übermittlung) bzw.
                Art. 9 Abs. 2 lit. h DSGVO i. V. m. § 22 Abs. 1 Nr. 1 lit. b BDSG.
              </P>
              <P>
                Speicherdauer: 24 Monate ab abschließender Bearbeitung; danach Löschung. Bei
                Pflegevertragsabschluss Übergang in die Pflegedokumentation mit den dort
                geltenden Aufbewahrungsfristen. Eine Weitergabe an Dritte erfolgt nur, soweit
                dies zur Bearbeitung Ihrer Anfrage zwingend erforderlich ist (z. B. Pflegekasse
                bei ausdrücklichem Auftrag).
              </P>
            </LegalSection>

            {/* 4 — Anamnesebogen */}
            <LegalSection number="4" title="Online-Anamnesebogen (Gesundheitsdaten)" delay={0.13}>
              <Sub>Verarbeitungstätigkeit</Sub>
              <P>
                Über den Online-Anamnesebogen (<LegalLink href="/anamnesebogen">/anamnesebogen</LegalLink>)
                erheben wir Daten, die zur Beurteilung des Pflegebedarfs, zur Vorbereitung
                eines Erstgesprächs und zur Anbahnung eines Pflegevertrags zwingend erforderlich
                sind. Dies umfasst insbesondere:
              </P>
              <ul className="icon-list-stack space-y-1.5 pl-1">
                {[
                  'Personendaten der zu pflegenden Person (Vor-/Nachname, Geburtsdatum, Anschrift)',
                  'Kontaktdaten der Ansprechperson und ggf. der zu pflegenden Person (Telefon, E-Mail)',
                  'Versicherungsdaten (Krankenkasse/Pflegekasse, Versichertennummer, vorhandener Pflegegrad)',
                  'Gesundheitsbezogene Angaben (Diagnosen, Krankheitsverlauf, Pflegebedarf, Medikation, Allergien, Hilfsmittel)',
                  'Optional hochgeladene medizinische Unterlagen (insbesondere Entlassungsbriefe als PDF, JPG, PNG, WEBP, HEIC; max. 4 MB pro Datei, max. 12 MB gesamt, max. 8 Dateien)',
                  'Angaben zur Wohnsituation (Wohnform, Wohnungstyp, Barrierefreiheit)',
                  'Angaben zum gewünschten Pflegeumfang und persönlichen Wünschen',
                  'Datum und Inhalt der erteilten Einwilligungen',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: MINT }} />
                    <span className="icon-list-prose min-w-0 flex-1 text-[14.5px] font-[410] tracking-[-0.008em]" style={{ color: '#475569' }}>{item}</span>
                  </li>
                ))}
              </ul>

              <Sub>Besondere Kategorien personenbezogener Daten (Art. 9 DSGVO)</Sub>
              <P>
                Die im Anamnesebogen verarbeiteten Gesundheits- und Diagnosedaten sind
                besondere Kategorien personenbezogener Daten im Sinne des Art. 9 Abs. 1 DSGVO.
                Rechtsgrundlage der Verarbeitung ist Art. 9 Abs. 2 lit. h DSGVO i. V. m. § 22
                Abs. 1 Nr. 1 lit. b BDSG (Verarbeitung zum Zweck der Gesundheitsversorgung,
                medizinischen Diagnostik, Versorgung und Behandlung im Gesundheits- und
                Sozialbereich) sowie ergänzend Art. 9 Abs. 2 lit. a DSGVO (Ihre ausdrückliche
                Einwilligung durch aktive Bestätigung der Datenschutz- und
                Richtigkeitserklärung im Formular). Die Verarbeitung erfolgt unter Wahrung des
                Berufsgeheimnisses gemäß § 203 StGB; intern haben ausschließlich
                schweigepflichtige Personen (Pflegefachkräfte und Verwaltungspersonal mit
                schriftlicher Verpflichtung auf das Datengeheimnis) Zugriff.
              </P>

              <Sub>Übermittlung im Auftrag Dritter (Vollmacht)</Sub>
              <P>
                Wird der Anamnesebogen nicht von der zu pflegenden Person selbst, sondern von
                Angehörigen, Betreuer:innen oder Bevollmächtigten übermittelt, setzen wir
                voraus, dass eine entsprechende Vollmacht oder gesetzliche Vertretungsbefugnis
                (z. B. § 1814 ff. BGB) besteht. Die Verantwortung für das Vorliegen einer
                wirksamen Berechtigung trägt die übermittelnde Person. Wir behalten uns vor,
                vor Vertragsschluss einen Nachweis zu verlangen.
              </P>

              <Sub>Empfänger / Auftragsverarbeiter</Sub>
              <P>
                Die im Anamnesebogen erhobenen Daten werden zunächst auf der Hosting- und
                Speicherinfrastruktur der in den Abschnitten 6 und 7 genannten
                Auftragsverarbeiter (Vercel Inc., GitHub, Inc.) verarbeitet und dort in
                verschlüsselter Form bis zur Übernahme in die interne Pflegedokumentation
                vorgehalten. Eine Weitergabe an Dritte (Pflegekasse, Krankenkasse, Hausarzt,
                Krankenhaus, Medizinischer Dienst) erfolgt ausschließlich nach Ihrer
                ausdrücklichen Einwilligung oder soweit gesetzlich vorgeschrieben.
              </P>

              <Sub>Speicherdauer</Sub>
              <P>
                Kommt im Anschluss an den Anamnesebogen kein Pflegevertrag zustande, werden
                die übermittelten Daten und hochgeladenen Unterlagen spätestens 12 Monate nach
                Eingang gelöscht. Mit Abschluss eines Pflegevertrags gehen die Daten in die
                Pflegedokumentation/Patientenakte über und unterliegen ab diesem Zeitpunkt
                den gesetzlichen Aufbewahrungsfristen, insbesondere § 630f Abs. 3 BGB
                (10 Jahre nach Abschluss der Behandlung) sowie § 113 SGB XI.
              </P>

              <Sub>Freiwilligkeit, Widerruf, Folgen der Nichtangabe</Sub>
              <P>
                Die Übermittlung des Anamnesebogens ist freiwillig. Ohne diese Angaben ist eine
                seriöse Beurteilung des Pflegebedarfs und damit ein Vertragsschluss nicht
                möglich. Die erteilte Einwilligung können Sie jederzeit mit Wirkung für die
                Zukunft widerrufen (Art. 7 Abs. 3 DSGVO); bitte richten Sie den Widerruf
                schriftlich an die im Abschnitt „Verantwortliche Stelle" genannte Adresse oder
                per E-Mail an{' '}
                <LegalLink href="mailto:info@impuls-pflege.de">info@impuls-pflege.de</LegalLink>.
                Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt;
                gesetzliche Aufbewahrungsfristen bleiben ebenfalls unberührt.
              </P>
            </LegalSection>

            {/* 5 — Bewerbungsverfahren */}
            <LegalSection number="5" title="Bewerbungsverfahren" delay={0.16}>
              <Sub>Umfang und Zweck der Datenerhebung</Sub>
              <P>
                Bei einer Bewerbung über das Online-Bewerbungsformular, per E-Mail oder per
                Post verarbeiten wir folgende Daten zur Durchführung des Bewerbungsverfahrens:
                Vor- und Nachname, Anschrift, E-Mail-Adresse, Telefonnummer, gewünschte
                Position, Verfügbarkeit, Qualifikationen, Berufserfahrung, Motivationsschreiben
                sowie hochgeladene Dokumente (Lebenslauf, Zeugnisse, Zertifikate,
                Beschäftigungsnachweise).
              </P>

              <Sub>Rechtsgrundlage</Sub>
              <P>
                Rechtsgrundlage ist § 26 Abs. 1 BDSG i. V. m. Art. 88 DSGVO (Anbahnung eines
                Beschäftigungsverhältnisses). Soweit Sie einer Aufnahme in unseren
                Bewerberpool ausdrücklich zugestimmt haben, beruht die weitergehende
                Verarbeitung zusätzlich auf Art. 6 Abs. 1 lit. a DSGVO. Soweit Bewerbungs­unterlagen
                vereinzelt Daten besonderer Kategorien (z. B. Schwerbehinderung,
                Konfessionsangabe in Zeugnissen, Gesundheitsangaben) enthalten, beruht deren
                Verarbeitung – soweit erforderlich – auf § 26 Abs. 3 BDSG bzw. Art. 9 Abs. 2
                lit. b DSGVO (Pflichten und Rechte aus dem Arbeitsrecht und Recht der sozialen
                Sicherheit).
              </P>

              <Sub>Empfänger / interne Zugriffsberechtigte</Sub>
              <P>
                Bewerbungsdaten sind ausschließlich für das mit der konkreten Stelle befasste
                Auswahlpersonal zugänglich. Eine Weitergabe an Dritte erfolgt nicht. Eine
                automatisierte Entscheidungsfindung im Sinne des Art. 22 DSGVO findet nicht
                statt.
              </P>

              <Sub>Speicherdauer</Sub>
              <P>
                Bei Absage werden Bewerbungsunterlagen 6 Monate nach Abschluss des
                Bewerbungsverfahrens gelöscht (Aufbewahrung zur Verteidigung gegen
                Entschädigungsansprüche nach § 15 Abs. 4 AGG). Bei Aufnahme in den
                Bewerberpool nach ausdrücklicher Einwilligung Speicherung bis zum Widerruf,
                längstens 24 Monate. Wird ein Beschäftigungsverhältnis begründet, gehen die
                Bewerbungsunterlagen in die Personalakte über und unterliegen den dort
                geltenden Aufbewahrungs- und Löschpflichten.
              </P>

              <Sub>Widerruf</Sub>
              <P>
                Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft
                widerrufen. Der Widerruf kann formlos per E-Mail an{' '}
                <LegalLink href="mailto:info@impuls-pflege.de">info@impuls-pflege.de</LegalLink>{' '}
                erfolgen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt
                unberührt; Verarbeitungen auf gesetzlicher Grundlage bleiben unberührt.
              </P>
            </LegalSection>

            {/* 6 — Hosting Vercel */}
            <LegalSection number="6" title="Hosting (Vercel)" delay={0.19}>
              <Sub>Anbieter und Verarbeitungszweck</Sub>
              <P>
                Die technische Auslieferung dieser Website erfolgt durch:
              </P>
              <div
                className="rounded-[14px] border p-5"
                style={{ borderColor: 'rgba(0,0,0,0.07)', background: '#FAFAF9' }}
              >
                <p className="text-[14px] font-[620] tracking-[-0.012em]" style={{ color: '#0F172A' }}>
                  Vercel Inc.
                </p>
                <p className="mt-1 text-[14px] font-[420] leading-[1.65]" style={{ color: '#475569' }}>
                  440 N Barranca Avenue #4133<br />
                  Covina, CA 91723<br />
                  Vereinigte Staaten von Amerika
                </p>
                <div className="mt-3 space-y-1 text-[14px] font-[420]" style={{ color: '#475569' }}>
                  <p>Datenschutzerklärung: <LegalLink href="https://vercel.com/legal/privacy-policy" external>vercel.com/legal/privacy-policy</LegalLink></p>
                  <p>Auftragsverarbeitung (DPA): <LegalLink href="https://vercel.com/legal/dpa" external>vercel.com/legal/dpa</LegalLink></p>
                </div>
              </div>
              <P>
                Vercel stellt die globale Auslieferung statischer und serverseitig generierter
                Inhalte über ein Content-Delivery-Network (CDN) bereit, betreibt die zur
                Beantwortung Ihrer Anfragen erforderlichen Serverless-Funktionen und
                protokolliert Verbindungs- und Sicherheitsdaten in Server-Log-Dateien (siehe
                Abschnitt 3 „Server-Log-Dateien"). Im Rahmen der Verarbeitung von Eingaben aus
                Kontaktformular, Anamnesebogen und Bewerbungsformular werden die übermittelten
                Daten kurzzeitig durch die Serverless-Funktionen von Vercel verarbeitet, bevor
                die Persistenz im Code- und Datenrepository (siehe Abschnitt 7) erfolgt.
              </P>

              <Sub>Rechtsgrundlage</Sub>
              <P>
                Rechtsgrundlage für den Einsatz von Vercel ist Art. 6 Abs. 1 lit. f DSGVO
                (berechtigtes Interesse an einer technisch zuverlässigen, performanten und
                sicheren Auslieferung der Website). Soweit Eingaben aus Formularen verarbeitet
                werden, gelten zusätzlich die im jeweiligen Verarbeitungsabschnitt genannten
                Rechtsgrundlagen (Art. 6 Abs. 1 lit. b DSGVO, Art. 9 Abs. 2 lit. h DSGVO,
                § 26 BDSG).
              </P>

              <Sub>Auftragsverarbeitung</Sub>
              <P>
                Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO
                („Data Processing Agreement"). Vercel verarbeitet die personenbezogenen Daten
                ausschließlich nach unseren dokumentierten Weisungen und unter Einhaltung der
                technischen und organisatorischen Maßnahmen des DPA.
              </P>

              <Sub>Drittlandtransfer in die USA</Sub>
              <P>
                Der Einsatz von Vercel führt zu einer Übermittlung personenbezogener Daten in
                die Vereinigten Staaten von Amerika (Drittland im Sinne der DSGVO). Die
                Übermittlung wird durch folgende Garantien abgesichert:
              </P>
              <ul className="icon-list-stack space-y-2 pl-1">
                {[
                  'EU-US Data Privacy Framework (DPF): Vercel Inc. ist nach dem DPF zertifiziert. Die Übermittlung beruht insoweit auf einem Angemessenheitsbeschluss der Europäischen Kommission gemäß Art. 45 Abs. 3 DSGVO (Durchführungsbeschluss (EU) 2023/1795). Der Zertifizierungsstatus ist abrufbar unter dataprivacyframework.gov.',
                  'Standardvertragsklauseln (SCC): Ergänzend wurden mit Vercel die EU-Standardvertragsklauseln in der Fassung des Durchführungsbeschlusses (EU) 2021/914 als Bestandteil des DPA vereinbart (Art. 46 Abs. 2 lit. c DSGVO).',
                  'Technische Maßnahmen: Übertragung ausschließlich über TLS 1.2 oder höher; Verschlüsselung der ruhenden Daten gemäß den Sicherheitsmaßnahmen des DPA.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: MINT }} />
                    <span className="icon-list-prose min-w-0 flex-1 text-[14.5px] font-[410] leading-[1.75] tracking-[-0.008em]" style={{ color: '#475569' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Sub>Restrisiko (Schrems II)</Sub>
              <P>
                Wir weisen ausdrücklich darauf hin: US-amerikanische Sicherheits- und
                Strafverfolgungsbehörden können nach US-amerikanischem Recht – insbesondere
                Section 702 FISA (Foreign Intelligence Surveillance Act) und Executive Order
                12333 – Zugriff auf bei US-Anbietern verarbeitete personenbezogene Daten
                verlangen, ohne dass die betroffene Person hierüber zwingend informiert wird
                oder einen wirksamen gerichtlichen Rechtsbehelf vor einem unabhängigen
                Gericht erlangen kann. Eine vollständige Gleichwertigkeit zum europäischen
                Schutzniveau besteht nach der Rechtsprechung des EuGH (Urt. v. 16.07.2020 –
                C-311/18, „Schrems II") trotz Data Privacy Framework und
                Standardvertragsklauseln nicht. Es verbleibt insoweit ein Restrisiko, über
                das wir Sie an dieser Stelle ausdrücklich aufklären. Mit dem Absenden des
                Online-Anamnesebogens, des Kontaktformulars oder des Bewerbungsformulars
                bestätigen Sie, von diesem Restrisiko Kenntnis genommen zu haben.
              </P>
            </LegalSection>

            {/* 7 — GitHub Repository */}
            <LegalSection number="7" title="Code- und Datenrepository (GitHub)" delay={0.22}>
              <Sub>Anbieter und Verarbeitungszweck</Sub>
              <P>
                Die Quellcode- und strukturierte Datenpersistenz dieser Website (Inhalte,
                Konfigurationen sowie die persistente Speicherung der über Formulare
                übermittelten Datensätze) erfolgt über die Plattform:
              </P>
              <div
                className="rounded-[14px] border p-5"
                style={{ borderColor: 'rgba(0,0,0,0.07)', background: '#FAFAF9' }}
              >
                <p className="text-[14px] font-[620] tracking-[-0.012em]" style={{ color: '#0F172A' }}>
                  GitHub, Inc.
                </p>
                <p className="mt-1 text-[14px] font-[420] leading-[1.65]" style={{ color: '#475569' }}>
                  88 Colin P Kelly Jr Street<br />
                  San Francisco, CA 94107<br />
                  Vereinigte Staaten von Amerika
                </p>
                <div className="mt-3 space-y-1 text-[14px] font-[420]" style={{ color: '#475569' }}>
                  <p>Datenschutzerklärung: <LegalLink href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement" external>docs.github.com/.../github-general-privacy-statement</LegalLink></p>
                  <p>Auftragsverarbeitung (DPA): <LegalLink href="https://docs.github.com/site-policy/privacy-policies/github-data-protection-agreement" external>docs.github.com/.../github-data-protection-agreement</LegalLink></p>
                </div>
              </div>
              <P>
                Datensätze, die über das Kontaktformular, den Online-Anamnesebogen oder das
                Bewerbungsformular eingereicht werden, werden zur revisions­sicheren
                Speicherung in einem privaten, nicht öffentlich zugänglichen Repository bei
                GitHub abgelegt. Hochgeladene Dokumente (insbesondere Entlassungsbriefe und
                Bewerbungsunterlagen) werden hierbei base64-codiert in den Datensätzen
                hinterlegt. Der Zugriff ist auf einen abschließend definierten Personenkreis
                mit individuellen Zugangsdaten und Mehrfaktor-Authentifizierung beschränkt.
              </P>

              <Sub>Rechtsgrundlage</Sub>
              <P>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
                einer integritätsgesicherten, versionierten Ablage der für den
                Geschäftsbetrieb erforderlichen Datensätze) sowie – für Eingaben aus
                Formularen – die im jeweiligen Verarbeitungsabschnitt genannten weiteren
                Rechtsgrundlagen (Art. 6 Abs. 1 lit. b DSGVO; Art. 9 Abs. 2 lit. h DSGVO
                i. V. m. § 22 BDSG; § 26 BDSG).
              </P>

              <Sub>Auftragsverarbeitung</Sub>
              <P>
                Mit GitHub, Inc. besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28
                DSGVO. GitHub verarbeitet personenbezogene Daten ausschließlich nach unseren
                dokumentierten Weisungen.
              </P>

              <Sub>Drittlandtransfer in die USA</Sub>
              <P>
                Der Einsatz von GitHub führt zu einer Übermittlung personenbezogener Daten in
                die Vereinigten Staaten. Die Übermittlung wird durch folgende Garantien
                abgesichert:
              </P>
              <ul className="icon-list-stack space-y-2 pl-1">
                {[
                  'EU-US Data Privacy Framework (DPF): GitHub, Inc. (als Tochter von Microsoft Corporation) ist nach dem DPF zertifiziert. Die Übermittlung beruht insoweit auf einem Angemessenheitsbeschluss der Europäischen Kommission gemäß Art. 45 Abs. 3 DSGVO. Der Zertifizierungsstatus ist abrufbar unter dataprivacyframework.gov.',
                  'Standardvertragsklauseln (SCC): Ergänzend wurden mit GitHub die EU-Standardvertragsklauseln in der Fassung des Durchführungsbeschlusses (EU) 2021/914 als Bestandteil des DPA vereinbart (Art. 46 Abs. 2 lit. c DSGVO).',
                  'Technische Maßnahmen: Übertragung ausschließlich über TLS 1.2 oder höher; Verschlüsselung der ruhenden Daten auf Speicherebene; Zugriffsbeschränkung über Mehrfaktor-Authentifizierung.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: MINT }} />
                    <span className="icon-list-prose min-w-0 flex-1 text-[14.5px] font-[410] leading-[1.75] tracking-[-0.008em]" style={{ color: '#475569' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Sub>Restrisiko (Schrems II)</Sub>
              <P>
                Es gelten die im Abschnitt 6 unter „Restrisiko (Schrems II)" beschriebenen
                Risiken eines Zugriffs durch US-amerikanische Sicherheits- und
                Strafverfolgungsbehörden nach Section 702 FISA und Executive Order 12333
                entsprechend. Eine vollständige Gleichwertigkeit zum europäischen Schutzniveau
                besteht nicht; das Restrisiko ist nicht vollständig auszuschließen. Mit dem
                Absenden eines Formulars erklären Sie, hierüber informiert zu sein.
              </P>
            </LegalSection>

            {/* 8 — Schriften */}
            <LegalSection number="8" title="Schriften" delay={0.25}>
              <Sub>Google Fonts (lokal eingebunden)</Sub>
              <P>
                Diese Website nutzt zur einheitlichen Darstellung von Schriftarten sogenannte
                Google Fonts, die ausschließlich lokal vom Hosting-Server ausgeliefert werden.
                Eine Verbindung Ihres Browsers zu Servern von Google LLC findet beim Aufruf
                dieser Website nicht statt; insbesondere wird keine IP-Adresse an Google
                übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                Interesse an einer einheitlichen, ladezeitoptimierten typografischen
                Darstellung).
              </P>
              <P>
                Weitere Informationen zu Google Fonts:{' '}
                <LegalLink href="https://developers.google.com/fonts/faq" external>
                  developers.google.com/fonts/faq
                </LegalLink>{' '}
                · Datenschutzerklärung von Google:{' '}
                <LegalLink href="https://policies.google.com/privacy" external>
                  policies.google.com/privacy
                </LegalLink>
                .
              </P>
            </LegalSection>

            {/* 9 — Datenminimierung */}
            <LegalSection number="9" title="Datenminimierung und Verarbeitungsgrenzen" delay={0.28}>
              <P>
                Wir setzen den Grundsatz der Datenminimierung (Art. 5 Abs. 1 lit. c DSGVO) durch
                folgende verbindliche Festlegungen technisch und organisatorisch um:
              </P>
              <ul className="icon-list-stack space-y-2 pl-1">
                {[
                  'Kein Tracking, kein Webanalyse-Werkzeug, keine Heatmaps, keine Reichweitenmessung.',
                  'Keine geräte- oder browserübergreifende Wiedererkennung; keine Profilbildung im Sinne des Art. 4 Nr. 4 DSGVO.',
                  'Keine Weitergabe personenbezogener Daten an Dritte zu Werbezwecken; keine Erstellung von Werbeprofilen.',
                  'Keine automatisierte Entscheidungsfindung im Sinne des Art. 22 DSGVO.',
                  'Keine Einbindung von Social-Media-Plugins oder externen Drittanbieter-Skripten zu Marketingzwecken.',
                  'Erhebung besonderer Kategorien personenbezogener Daten ausschließlich, soweit dies zur Anbahnung und Durchführung des Pflegevertrags erforderlich ist und durch Art. 9 Abs. 2 lit. h DSGVO i. V. m. § 22 BDSG bzw. ausdrückliche Einwilligung gedeckt ist.',
                  'Pseudonymisierung und Verschlüsselung gemäß Art. 32 DSGVO im Rahmen der technisch verfügbaren Maßnahmen.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: MINT }} />
                    <span className="icon-list-prose min-w-0 flex-1 text-[14.5px] font-[410] leading-[1.75] tracking-[-0.008em]" style={{ color: '#475569' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <P>
                Diese Festlegungen gelten unabhängig davon, ob eine Einwilligung der betroffenen
                Person eingeholt wurde, und können nur durch eine ausdrückliche Aktualisierung
                dieser Datenschutzerklärung geändert werden.
              </P>
            </LegalSection>

            {/* Stand */}
            <FadeIn delay={0.31}>
              <div className="flex items-center justify-between px-1">
                <p
                  className="text-[12.5px] font-[420]"
                  style={{ color: '#94A3B8' }}
                >
                  Stand: 04. Mai 2026
                </p>
              </div>
            </FadeIn>

          </div>

          {/* Back link */}
          <FadeIn delay={0.26}>
            <div className="mt-10">
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
