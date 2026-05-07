import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/animations/fade-in'

export const metadata = {
  title: 'Datenschutzerklärung – IMPULS Ambulanter Pflegedienst',
  description:
    'Datenschutzerklärung der IMPULS Ambulanter Pflegedienst in Unna. Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.',
}

const MINT = '#18C1A3'
const STAND = '06. Mai 2026'

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
      <article
        className="rounded-[22px] border bg-white p-7 sm:p-9"
        style={{ borderColor: 'rgba(0,0,0,0.065)', boxShadow: '0 2px 18px rgba(15,23,42,0.04)' }}
      >
        <header className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:gap-5 sm:text-left">
          <span
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12.5px] font-[740] tabular-nums"
            style={{
              background: 'rgba(24,193,163,0.10)',
              color: MINT,
              boxShadow: 'inset 0 0 0 1px rgba(24,193,163,0.18)',
            }}
          >
            {number}
          </span>
          <div className="min-w-0 flex-1">
            <h2
              className="text-[18px] font-[740] tracking-[-0.024em] sm:text-[19px]"
              style={{ color: '#0F172A' }}
            >
              {title}
            </h2>
            <div
              className="mx-auto mt-2 h-[2px] w-9 rounded-full sm:mx-0"
              style={{ background: `linear-gradient(to right, ${MINT}, rgba(24,193,163,0))` }}
            />
          </div>
        </header>
        <div className="mt-6 space-y-5 sm:mt-7 sm:space-y-6">{children}</div>
      </article>
    </FadeIn>
  )
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="pt-2 text-[15px] font-[700] tracking-[-0.018em]"
      style={{ color: '#0F172A' }}
    >
      {children}
    </h3>
  )
}

function Question({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[14px] font-[640] tracking-[-0.012em]"
      style={{ color: '#334155' }}
    >
      {children}
    </p>
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

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span
            className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: MINT }}
            aria-hidden="true"
          />
          <span
            className="min-w-0 flex-1 text-[14.5px] font-[410] leading-[1.75] tracking-[-0.008em]"
            style={{ color: '#475569' }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

function DefList({
  items,
}: {
  items: { term: React.ReactNode; desc: React.ReactNode }[]
}) {
  return (
    <dl className="space-y-3.5">
      {items.map((row, i) => (
        <div
          key={i}
          className="rounded-[12px] border bg-white px-4 py-3 sm:px-5 sm:py-4"
          style={{ borderColor: 'rgba(0,0,0,0.05)', background: '#FBFBFA' }}
        >
          <dt
            className="text-[13px] font-[680] tracking-[-0.012em]"
            style={{ color: '#0F172A' }}
          >
            {row.term}
          </dt>
          <dd
            className="mt-1.5 text-[14.5px] font-[410] leading-[1.75] tracking-[-0.008em]"
            style={{ color: '#475569' }}
          >
            {row.desc}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function ContactCard({
  variant = 'mint',
  title,
  lines,
  contacts,
}: {
  variant?: 'mint' | 'neutral'
  title: string
  lines: string[]
  contacts?: { label: string; value: React.ReactNode }[]
}) {
  const isMint = variant === 'mint'
  return (
    <div
      className="rounded-[14px] border p-5"
      style={
        isMint
          ? { borderColor: 'rgba(24,193,163,0.18)', background: 'rgba(24,193,163,0.04)' }
          : { borderColor: 'rgba(0,0,0,0.07)', background: '#FAFAF9' }
      }
    >
      <p
        className="text-[14.5px] font-[660] tracking-[-0.012em]"
        style={{ color: '#0F172A' }}
      >
        {title}
      </p>
      <p
        className="mt-1 text-[14px] font-[420] leading-[1.65]"
        style={{ color: '#475569' }}
      >
        {lines.map((l, i) => (
          <span key={i}>
            {l}
            {i < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </p>
      {contacts && contacts.length > 0 ? (
        <div
          className="mt-3 space-y-1 text-[14px] font-[420]"
          style={{ color: '#475569' }}
        >
          {contacts.map((c, i) => (
            <p key={i}>
              {c.label}: {c.value}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function LegalLink({
  href,
  children,
  external = false,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="break-words font-[540] underline underline-offset-2 transition-opacity hover:opacity-70"
      style={{ color: MINT }}
    >
      {children}
    </a>
  )
}

const Mail = () => (
  <LegalLink href="mailto:info@impuls-unna.de">info@impuls-unna.de</LegalLink>
)

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
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(24,193,163,0.45), transparent)',
          }}
        />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2"
            style={{
              background:
                'radial-gradient(ellipse, rgba(24,193,163,0.07) 0%, transparent 65%)',
              filter: 'blur(60px)',
            }}
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
              <div
                className="h-[1.5px] w-16 rounded-full"
                style={{
                  background:
                    'linear-gradient(to right, rgba(24,193,163,0.30), transparent)',
                }}
              />
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

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{ background: 'rgba(0,0,0,0.06)' }}
        />
      </section>

      {/* Content */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container size="md">
          <div className="space-y-5">
            {/* 1 */}
            <LegalSection number="1" title="Datenschutz auf einen Blick" delay={0.05}>
              <Sub>Allgemeine Hinweise</Sub>
              <P>
                Die folgenden Hinweise geben einen Überblick darüber, welche personenbezogenen
                Daten beim Besuch dieser Website und bei der Nutzung der angebotenen Formulare
                verarbeitet werden. Dies betrifft insbesondere das Kontaktformular, den
                Online-Anamnesebogen, das Bewerbungsformular sowie die technisch
                erforderlichen Verbindungsdaten beim Aufruf der Website.
              </P>
              <P>
                Personenbezogene Daten sind alle Informationen, die sich auf eine
                identifizierte oder identifizierbare natürliche Person beziehen. Hierzu
                gehören insbesondere Name, Anschrift, Kontaktdaten, Gesundheitsdaten,
                Bewerbungsdaten, technische Verbindungsdaten und sonstige Angaben, die einer
                Person unmittelbar oder mittelbar zugeordnet werden können.
              </P>
              <P>
                Die vollständigen Informationen zu den einzelnen Verarbeitungstätigkeiten,
                Datenkategorien, Zwecken, Rechtsgrundlagen, Empfängern, Drittlandübermittlungen
                und Speicherdauern finden Sie in den nachfolgenden Abschnitten.
              </P>

              <Sub>Datenerfassung auf dieser Website</Sub>

              <Question>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</Question>
              <P>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist der
                Websitebetreiber. Die vollständigen Kontaktdaten finden Sie im Abschnitt
                „Hinweis zur verantwortlichen Stelle“.
              </P>

              <Question>Wie erfassen wir Ihre Daten?</Question>
              <P>
                Wir verarbeiten Daten, die Sie uns aktiv mitteilen. Dies betrifft
                insbesondere Eingaben in das Kontaktformular, den Online-Anamnesebogen und
                das Bewerbungsformular sowie Mitteilungen per E-Mail, Telefon, Fax oder Post.
              </P>
              <P>
                Zusätzlich werden technisch erforderliche Verbindungsdaten verarbeitet, die
                beim Aufruf der Website durch den Browser des Endgeräts automatisch an die
                eingesetzte Hosting-Infrastruktur übermittelt werden. Diese Daten werden in
                Server-Log-Dateien verarbeitet, soweit dies zur technischen Auslieferung der
                Website, zur Fehleranalyse, zur Missbrauchsabwehr und zur IT-Sicherheit
                erforderlich ist.
              </P>
              <P>
                Auf dieser Website werden im öffentlichen Bereich keine Tracking-Pixel,
                Webanalyse-Werkzeuge, Heatmaps, Werbenetzwerke, Social-Media-Plugins,
                geräteübergreifende Wiedererkennungsmechanismen oder Profiling-Verfahren
                eingesetzt.
              </P>

              <Question>Wofür nutzen wir Ihre Daten?</Question>
              <P>
                Technische Verbindungsdaten werden ausschließlich zur Bereitstellung der
                Website, zur Sicherstellung der technischen Stabilität, zur Fehleranalyse und
                zur Abwehr missbräuchlicher oder sicherheitsrelevanter Zugriffe verarbeitet.
              </P>
              <P>
                Daten aus dem Kontaktformular werden ausschließlich zur Bearbeitung der
                konkreten Anfrage und zur Kommunikation mit der anfragenden Person
                verarbeitet.
              </P>
              <P>
                Daten aus dem Online-Anamnesebogen werden ausschließlich zur Prüfung des
                Pflegebedarfs, zur Vorbereitung eines Erstgesprächs, zur Anbahnung eines
                Pflegevertrags und, bei anschließendem Vertragsabschluss, zur Durchführung
                der Pflegeversorgung verarbeitet.
              </P>
              <P>
                Bewerbungsdaten werden ausschließlich zur Durchführung des
                Bewerbungsverfahrens, zur Prüfung der fachlichen und persönlichen Eignung
                sowie zur Kommunikation mit Bewerberinnen und Bewerbern verarbeitet.
              </P>
              <P>
                Eine Nutzung zu Werbezwecken, zur Profilbildung, zur Reichweitenmessung oder
                zur Weitergabe an Dritte zu deren eigenen Werbe- oder Analysezwecken findet
                nicht statt.
              </P>

              <Question>Welche Rechte haben Sie bezüglich Ihrer Daten?</Question>
              <P>
                Ihnen stehen nach Maßgabe der gesetzlichen Voraussetzungen insbesondere
                folgende Rechte zu:
              </P>
              <P>
                Auskunft über die zu Ihrer Person verarbeiteten Daten, Berichtigung
                unrichtiger Daten, Löschung personenbezogener Daten, Einschränkung der
                Verarbeitung, Datenübertragbarkeit, Widerspruch gegen Verarbeitungen auf
                Grundlage berechtigter Interessen sowie Widerruf erteilter Einwilligungen
                mit Wirkung für die Zukunft.
              </P>
              <P>
                Ihnen steht außerdem ein Beschwerderecht bei einer
                Datenschutzaufsichtsbehörde zu.
              </P>
            </LegalSection>

            {/* 2 */}
            <LegalSection
              number="2"
              title="Allgemeine Hinweise und Pflichtinformationen"
              delay={0.08}
            >
              <Sub>Datenschutz</Sub>
              <P>
                Wir verarbeiten personenbezogene Daten ausschließlich nach Maßgabe der
                Datenschutz-Grundverordnung, des Bundesdatenschutzgesetzes, des
                Telekommunikation-Digitale-Dienste-Datenschutz-Gesetzes sowie, soweit
                einschlägig, der datenschutz- und dokumentationsrechtlichen Vorgaben aus dem
                Sozial-, Pflege-, Berufs- und Zivilrecht.
              </P>
              <P>
                Eine Verarbeitung erfolgt nur, soweit hierfür ein konkret benannter Zweck und
                eine tragfähige Rechtsgrundlage bestehen. Eine Weitergabe personenbezogener
                Daten an Dritte erfolgt nur, wenn dies in dieser Datenschutzerklärung
                ausdrücklich beschrieben ist, gesetzlich vorgeschrieben ist, zur
                Vertragserfüllung erforderlich ist, auf einer wirksamen Einwilligung beruht
                oder im Rahmen einer Auftragsverarbeitung nach Art. 28 DSGVO erfolgt.
              </P>

              <Sub>Hinweis zur Datenübertragung im Internet</Sub>
              <P>
                Die Übertragung dieser Website erfolgt verschlüsselt über HTTPS/TLS. Bei
                unverschlüsselter Kommunikation außerhalb der Website, insbesondere per
                einfacher E-Mail, kann ein vollständiger Schutz vor Kenntnisnahme durch
                Dritte nicht gewährleistet werden.
              </P>
              <P>
                Für die Übermittlung sensibler Daten, insbesondere Gesundheitsdaten,
                empfehlen wir die Nutzung der hierfür vorgesehenen Online-Formulare,
                telefonische Abstimmung, Fax oder postalische Übermittlung. Gesundheitsdaten
                sollten nicht unaufgefordert über einfache, unverschlüsselte E-Mail
                übermittelt werden.
              </P>

              <Sub>Hinweis zur verantwortlichen Stelle</Sub>
              <P>Verantwortlicher im Sinne des Art. 4 Nr. 7 DSGVO ist:</P>
              <ContactCard
                title="IMPULS Ambulanter Pflegedienst"
                lines={['Inhaberin: Elena Tschupina', 'Massener Str. 147', '59423 Unna']}
                contacts={[
                  {
                    label: 'Telefon',
                    value: <LegalLink href="tel:+4923032920589">02303 2920589</LegalLink>,
                  },
                  { label: 'Fax', value: '02303 2920587' },
                  { label: 'E-Mail', value: <Mail /> },
                ]}
              />
              <P>
                Verantwortliche Stelle ist die natürliche oder juristische Person, die
                allein oder gemeinsam mit anderen über die Zwecke und Mittel der
                Verarbeitung personenbezogener Daten entscheidet.
              </P>

              <Sub>Datenschutzbeauftragter</Sub>
              <P>Ein Datenschutzbeauftragter ist derzeit nicht benannt.</P>
              <P>
                Die Pflicht zur Benennung eines Datenschutzbeauftragten richtet sich
                insbesondere nach Art. 37 DSGVO und § 38 BDSG. Maßgeblich sind dabei unter
                anderem die tatsächliche Betriebsgröße, die Anzahl der Personen, die
                regelmäßig mit der automatisierten Verarbeitung personenbezogener Daten
                befasst sind, sowie Art, Umfang, Zweck und Systematik der Verarbeitung.
              </P>
              <P>
                Der Verantwortliche prüft fortlaufend, ob eine gesetzliche Pflicht zur
                Benennung eines Datenschutzbeauftragten besteht. Datenschutzanfragen können
                unabhängig hiervon jederzeit schriftlich an die oben genannte Anschrift oder
                per E-Mail an <Mail /> gerichtet werden.
              </P>

              <Sub>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung</Sub>
              <P>
                Wir verarbeiten personenbezogene Daten nur, wenn mindestens eine der
                folgenden Rechtsgrundlagen einschlägig ist:
              </P>
              <DefList
                items={[
                  {
                    term: 'Art. 6 Abs. 1 lit. a DSGVO',
                    desc:
                      'Verarbeitung auf Grundlage einer Einwilligung, insbesondere bei freiwilligen Zusatzangaben, ausdrücklicher Einwilligung in bestimmte Übermittlungen oder Aufnahme in einen Bewerberpool.',
                  },
                  {
                    term: 'Art. 6 Abs. 1 lit. b DSGVO',
                    desc:
                      'Verarbeitung zur Erfüllung eines Vertrags oder zur Durchführung vorvertraglicher Maßnahmen, insbesondere bei Pflegeanfragen, Vertragsvorbereitung, Kontaktaufnahme mit konkretem Leistungsbezug und Durchführung eines Pflegevertrags.',
                  },
                  {
                    term: 'Art. 6 Abs. 1 lit. c DSGVO',
                    desc:
                      'Verarbeitung zur Erfüllung rechtlicher Verpflichtungen, insbesondere steuer-, handels-, sozial-, pflege- und dokumentationsrechtlicher Pflichten.',
                  },
                  {
                    term: 'Art. 6 Abs. 1 lit. f DSGVO',
                    desc:
                      'Verarbeitung zur Wahrung berechtigter Interessen, insbesondere zur technischen Bereitstellung der Website, IT-Sicherheit, Fehleranalyse, Missbrauchsabwehr, organisatorischen Bearbeitung von Anfragen und Nachweisführung.',
                  },
                  {
                    term: '§ 26 BDSG in Verbindung mit Art. 88 DSGVO',
                    desc:
                      'Verarbeitung personenbezogener Daten von Bewerberinnen und Bewerbern zur Entscheidung über die Begründung eines Beschäftigungsverhältnisses.',
                  },
                  {
                    term: 'Art. 9 Abs. 2 lit. h DSGVO in Verbindung mit § 22 Abs. 1 Nr. 1 lit. b BDSG',
                    desc:
                      'Verarbeitung von Gesundheitsdaten zum Zweck der Gesundheitsversorgung, Pflegeversorgung, pflegerischen Beurteilung, Versorgung im Gesundheits- und Sozialbereich sowie zur Durchführung damit zusammenhängender Verträge.',
                  },
                  {
                    term: 'Art. 9 Abs. 2 lit. a DSGVO',
                    desc:
                      'Verarbeitung besonderer Kategorien personenbezogener Daten auf Grundlage einer ausdrücklichen Einwilligung, soweit die Verarbeitung nicht bereits auf Art. 9 Abs. 2 lit. h DSGVO gestützt wird oder soweit freiwillige Zusatzangaben betroffen sind.',
                  },
                  {
                    term: 'Art. 45 DSGVO und Art. 46 DSGVO',
                    desc:
                      'Soweit personenbezogene Daten in ein Drittland übermittelt werden, erfolgt dies vorrangig auf Grundlage eines Angemessenheitsbeschlusses der Europäischen Kommission gemäß Art. 45 DSGVO oder auf Grundlage geeigneter Garantien gemäß Art. 46 DSGVO, insbesondere Standardvertragsklauseln der Europäischen Kommission.',
                  },
                  {
                    term: 'Art. 49 Abs. 1 lit. a DSGVO',
                    desc: (
                      <>
                        Art. 49 Abs. 1 lit. a DSGVO wird nicht als reguläre Grundlage für
                        laufende Drittlandübermittlungen eingesetzt. Laufende
                        Drittlandübermittlungen werden, soweit sie stattfinden, vorrangig
                        auf einen Angemessenheitsbeschluss gemäß Art. 45 DSGVO oder auf
                        geeignete Garantien gemäß Art. 46 DSGVO gestützt.
                        <br />
                        <br />
                        Eine ausdrückliche Einwilligung in eine Drittlandübermittlung nach
                        Art. 49 Abs. 1 lit. a DSGVO kommt nur in gesetzlich vorgesehenen
                        Ausnahmefällen in Betracht, wenn keine vorrangige
                        Übermittlungsgrundlage besteht und die betroffene Person zuvor
                        ausdrücklich über die möglichen Risiken einer solchen Übermittlung
                        informiert wurde.
                      </>
                    ),
                  },
                ]}
              />
              <P>
                Die jeweils konkret einschlägige Rechtsgrundlage wird in den einzelnen
                Verarbeitungsabschnitten benannt.
              </P>

              <Sub>Speicherdauer</Sub>
              <P>
                Personenbezogene Daten werden nur so lange gespeichert, wie dies für die
                jeweils benannten Zwecke erforderlich ist oder gesetzliche
                Aufbewahrungspflichten bestehen.
              </P>
              <P>
                Soweit in den nachfolgenden Abschnitten keine speziellere Frist genannt ist,
                gelten folgende Fristen:
              </P>
              <DefList
                items={[
                  {
                    term: 'Server-Log-Dateien',
                    desc:
                      'Maximal 30 Tage, anschließend Löschung oder Anonymisierung durch den Hosting-Anbieter, soweit keine längere Speicherung zur Aufklärung konkreter Sicherheitsvorfälle erforderlich ist.',
                  },
                  {
                    term: 'Kontaktanfragen',
                    desc:
                      '24 Monate ab abschließender Bearbeitung der Anfrage. Bei fortlaufender Korrespondenz oder rechtlich relevanter Anschlusskommunikation maximal 36 Monate, sofern keine längeren gesetzlichen Aufbewahrungspflichten bestehen.',
                  },
                  {
                    term: 'Online-Anamnesebogen ohne anschließenden Pflegevertrag',
                    desc:
                      '12 Monate ab Eingang, anschließend Löschung der digitalen Übermittlung und der hochgeladenen Unterlagen, sofern keine gesetzlichen Aufbewahrungspflichten oder berechtigten Nachweisinteressen entgegenstehen.',
                  },
                  {
                    term: 'Online-Anamnesebogen mit anschließendem Pflegevertrag',
                    desc:
                      'Übernahme in die Pflege- beziehungsweise Versorgungsdokumentation; Aufbewahrung grundsätzlich 10 Jahre nach Abschluss der Behandlung beziehungsweise Pflegeversorgung, soweit keine längeren gesetzlichen Pflichten bestehen.',
                  },
                  {
                    term: 'Bewerbungsunterlagen bei Absage',
                    desc: '6 Monate nach Abschluss des Bewerbungsverfahrens.',
                  },
                  {
                    term: 'Bewerbungsdaten bei Aufnahme in einen Bewerberpool',
                    desc: 'Bis zum Widerruf der Einwilligung, längstens 24 Monate.',
                  },
                  {
                    term: 'Steuer- und handelsrechtlich relevante Unterlagen',
                    desc:
                      '6 beziehungsweise 10 Jahre nach Maßgabe der gesetzlichen Aufbewahrungspflichten.',
                  },
                  {
                    term: 'Einwilligungs-, Prüf- und Auditnachweise',
                    desc:
                      '3 Jahre ab Erteilung, Widerruf oder Abschluss des nachweispflichtigen Vorgangs, soweit keine längere Aufbewahrung zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist.',
                  },
                ]}
              />
              <P>
                Nach Ablauf der jeweiligen Frist werden die Daten gelöscht oder, soweit eine
                Löschung wegen gesetzlicher Aufbewahrungspflichten nicht zulässig ist, in
                ihrer Verarbeitung eingeschränkt.
              </P>

              <Sub>Widerruf erteilter Einwilligungen</Sub>
              <P>
                Soweit eine Verarbeitung auf einer Einwilligung beruht, können Sie diese
                Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Die
                Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.
              </P>
              <P>
                Der Widerruf kann formlos per E-Mail an <Mail />, postalisch oder per Fax
                erfolgen.
              </P>

              <Sub>
                Widerspruchsrecht gegen die Datenverarbeitung in besonderen Fällen sowie
                gegen Direktwerbung
              </Sub>
              <P>
                Wenn personenbezogene Daten auf Grundlage von Art. 6 Abs. 1 lit. e oder
                Art. 6 Abs. 1 lit. f DSGVO verarbeitet werden, haben Sie das Recht, aus
                Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit
                Widerspruch gegen diese Verarbeitung einzulegen.
              </P>
              <P>
                Wir verarbeiten die betroffenen personenbezogenen Daten nach einem
                Widerspruch nicht mehr, es sei denn, wir können zwingende schutzwürdige
                Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und
                Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung,
                Ausübung oder Verteidigung von Rechtsansprüchen.
              </P>
              <P>Direktwerbung wird durch uns nicht durchgeführt.</P>

              <Sub>Beschwerderecht bei der zuständigen Aufsichtsbehörde</Sub>
              <P>
                Ihnen steht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu,
                insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthalts, Ihres
                Arbeitsplatzes oder des Orts des mutmaßlichen Datenschutzverstoßes.
              </P>
              <P>Für den Verantwortlichen zuständig ist:</P>
              <ContactCard
                variant="neutral"
                title="Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen"
                lines={[
                  'Kavalleriestraße 2–4',
                  '40213 Düsseldorf',
                  'Postfach 20 04 44',
                  '40102 Düsseldorf',
                ]}
                contacts={[
                  { label: 'Telefon', value: '0211 38424-0' },
                  { label: 'Fax', value: '0211 38424-999' },
                  {
                    label: 'E-Mail',
                    value: (
                      <LegalLink href="mailto:poststelle@ldi.nrw.de">
                        poststelle@ldi.nrw.de
                      </LegalLink>
                    ),
                  },
                  {
                    label: 'Web',
                    value: (
                      <LegalLink href="https://www.ldi.nrw.de" external>
                        www.ldi.nrw.de
                      </LegalLink>
                    ),
                  },
                ]}
              />

              <Sub>Recht auf Datenübertragbarkeit</Sub>
              <P>
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder
                zur Erfüllung eines Vertrags automatisiert verarbeiten, in einem
                strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder die
                direkte Übermittlung an einen anderen Verantwortlichen zu verlangen, soweit
                dies technisch machbar ist und Rechte Dritter nicht beeinträchtigt werden.
              </P>

              <Sub>Auskunft, Berichtigung und Löschung</Sub>
              <P>
                Sie haben nach Maßgabe der gesetzlichen Voraussetzungen das Recht auf
                Auskunft über die bei uns zu Ihrer Person verarbeiteten personenbezogenen
                Daten, deren Herkunft, Empfänger, Zwecke, Speicherdauer und
                Rechtsgrundlagen.
              </P>
              <P>
                Sie haben außerdem das Recht auf Berichtigung unrichtiger oder
                unvollständiger Daten sowie auf Löschung personenbezogener Daten, soweit
                keine gesetzlichen Aufbewahrungspflichten, überwiegenden berechtigten
                Interessen oder Rechte zur Geltendmachung, Ausübung oder Verteidigung von
                Rechtsansprüchen entgegenstehen.
              </P>

              <Sub>Recht auf Einschränkung der Verarbeitung</Sub>
              <P>
                Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
                personenbezogenen Daten zu verlangen, soweit die gesetzlichen
                Voraussetzungen vorliegen.
              </P>
              <P>
                Das Recht besteht insbesondere, wenn Sie die Richtigkeit der Daten
                bestreiten, die Verarbeitung unrechtmäßig ist und Sie statt der Löschung die
                Einschränkung verlangen, wir die Daten für die ursprünglichen Zwecke nicht
                mehr benötigen, Sie diese jedoch zur Geltendmachung, Ausübung oder
                Verteidigung von Rechtsansprüchen benötigen oder Sie Widerspruch gegen die
                Verarbeitung eingelegt haben und noch nicht feststeht, ob unsere
                berechtigten Gründe überwiegen.
              </P>
              <P>
                Eingeschränkt verarbeitete Daten dürfen, abgesehen von ihrer Speicherung,
                nur mit Ihrer Einwilligung, zur Geltendmachung, Ausübung oder Verteidigung
                von Rechtsansprüchen, zum Schutz der Rechte einer anderen natürlichen oder
                juristischen Person oder aus Gründen eines wichtigen öffentlichen
                Interesses verarbeitet werden.
              </P>

              <Sub>SSL-/TLS-Verschlüsselung</Sub>
              <P>
                Diese Website nutzt HTTPS/TLS-Verschlüsselung. Eine verschlüsselte
                Verbindung erkennen Sie an der Zeichenfolge „https://“ in der Adresszeile
                des Browsers sowie am Schloss-Symbol.
              </P>
              <P>
                Die Verschlüsselung schützt die Übertragung von Daten zwischen Ihrem
                Endgerät und der Website gegen einfache Kenntnisnahme durch Dritte während
                der Übermittlung. Sie ersetzt nicht die Prüfung, ob ein Kommunikationsweg
                für besonders sensible Daten geeignet ist.
              </P>
            </LegalSection>

            {/* 3 */}
            <LegalSection number="3" title="Datenerhebung auf dieser Website" delay={0.11}>
              <Sub>Cookies und vergleichbare Technologien</Sub>
              <P>
                Im öffentlichen Bereich dieser Website werden keine Tracking-Cookies,
                Analyse-Cookies, Marketing-Cookies, Profiling-Cookies oder vergleichbaren
                Technologien zur Reichweitenmessung eingesetzt.
              </P>
              <P>Es findet keine geräte- oder browserübergreifende Wiedererkennung statt.</P>
              <P>
                Technisch erforderlich können ausschließlich solche Sitzungs- oder
                Sicherheitsmechanismen sein, die für die Auslieferung der Website, die
                Formularfunktion, die Lastverteilung, den Schutz vor missbräuchlichen
                Zugriffen oder die Absicherung gegen unbefugte Formularübermittlungen
                erforderlich sind.
              </P>
              <P>
                Der Einsatz solcher technisch erforderlichen Mechanismen erfolgt auf
                Grundlage von § 25 Abs. 2 Nr. 2 TDDDG, soweit die Speicherung von
                Informationen im Endgerät oder der Zugriff auf Informationen im Endgerät
                unbedingt erforderlich ist, um den von Ihnen ausdrücklich gewünschten
                digitalen Dienst bereitzustellen. Die anschließende Verarbeitung
                personenbezogener Daten erfolgt, soweit einschlägig, auf Grundlage von
                Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse liegt in der sicheren,
                fehlerfreien und manipulationsgeschützten Bereitstellung der Website.
              </P>
              <P>
                Im passwortgeschützten Verwaltungsbereich werden authentifizierungsbezogene
                Sitzungs-Cookies oder vergleichbare Sitzungsmechanismen eingesetzt. Diese
                dienen ausschließlich der Anmeldung, Sitzungsverwaltung und Zugriffskontrolle
                autorisierter Personen. Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TDDDG sowie
                Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse liegt in der
                Absicherung des nicht öffentlichen Verwaltungsbereichs gegen unbefugten
                Zugriff.
              </P>

              <Sub>Server-Log-Dateien</Sub>
              <P>
                Beim Aufruf dieser Website werden durch die eingesetzte Hosting-Infrastruktur
                technisch erforderliche Verbindungsdaten verarbeitet. Hierzu können gehören:
              </P>
              <Bullets
                items={[
                  'IP-Adresse des anfragenden Endgeräts',
                  'Datum und Uhrzeit der Anfrage',
                  'aufgerufene URL',
                  'HTTP-Methode',
                  'HTTP-Antwortcode',
                  'übertragene Datenmenge',
                  'Browsertyp und Browserversion',
                  'Betriebssystem',
                  'Referrer-URL, sofern durch den Browser übermittelt',
                  'technische Fehlermeldungen im Zusammenhang mit der Anfrage',
                ]}
              />
              <P>
                Die Verarbeitung erfolgt ausschließlich zur technischen Auslieferung der
                Website, zur Sicherstellung der Systemstabilität, zur Fehleranalyse, zur
                Erkennung und Abwehr missbräuchlicher Zugriffe, zur Abwehr automatisierter
                Angriffe und zur Gewährleistung der IT-Sicherheit.
              </P>
              <P>
                Eine Zusammenführung mit anderen Datenquellen, eine Nutzung zur
                Reichweitenmessung, eine Erstellung personenbezogener Nutzungsprofile oder
                eine Weitergabe zu Werbezwecken findet nicht statt.
              </P>
              <P>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse
                liegt in der sicheren, stabilen und missbrauchsresistenten Bereitstellung
                der Website.
              </P>
              <P>
                Die Speicherdauer beträgt maximal 30 Tage. Eine längere Speicherung erfolgt
                nur, soweit dies im Einzelfall zur Aufklärung konkreter Sicherheitsvorfälle,
                zur Abwehr von Angriffen oder zur Geltendmachung, Ausübung oder Verteidigung
                von Rechtsansprüchen erforderlich ist.
              </P>

              <Sub>Kontaktformular, E-Mail, Telefon und Fax</Sub>
              <P>
                Wenn Sie uns über das Kontaktformular, per E-Mail, telefonisch, per Fax oder
                postalisch kontaktieren, verarbeiten wir die von Ihnen übermittelten Daten
                zur Bearbeitung des konkreten Anliegens.
              </P>
              <P>Hierzu können gehören:</P>
              <Bullets
                items={[
                  'Vor- und Nachname',
                  'E-Mail-Adresse',
                  'Telefonnummer',
                  'Anschrift, soweit angegeben',
                  'Art der Anfrage',
                  'Inhalt der Nachricht',
                  'bevorzugte Kontakt- oder Rückrufzeit',
                  'Angaben zur Pflegesituation, soweit freiwillig mitgeteilt',
                  'technische Übermittlungsdaten bei Nutzung des Kontaktformulars',
                ]}
              />
              <P>
                Die Verarbeitung erfolgt ausschließlich zur Bearbeitung der konkreten
                Anfrage, zur Kommunikation mit Ihnen und, soweit die Anfrage auf
                Pflegeleistungen gerichtet ist, zur Durchführung vorvertraglicher Maßnahmen.
              </P>
              <P>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf den
                Abschluss oder die Durchführung eines Pflegevertrags oder auf vorvertragliche
                Maßnahmen gerichtet ist. In allen übrigen Fällen ist Rechtsgrundlage Art. 6
                Abs. 1 lit. f DSGVO. Das berechtigte Interesse liegt in der sachgerechten
                Bearbeitung eingehender Anfragen.
              </P>
              <P>
                Soweit Sie im Rahmen der Anfrage Gesundheitsdaten oder sonstige besondere
                Kategorien personenbezogener Daten mitteilen, erfolgt die Verarbeitung
                zusätzlich auf Grundlage von Art. 9 Abs. 2 lit. h DSGVO in Verbindung mit
                § 22 Abs. 1 Nr. 1 lit. b BDSG, soweit die Angaben zur Beurteilung,
                Vorbereitung oder Durchführung pflegerischer Leistungen erforderlich sind.
                Soweit besondere Kategorien personenbezogener Daten ohne Erforderlichkeit
                freiwillig mitgeteilt werden, erfolgt die Verarbeitung auf Grundlage von
                Art. 9 Abs. 2 lit. a DSGVO.
              </P>
              <P>
                Die Speicherdauer beträgt 24 Monate ab abschließender Bearbeitung der
                Anfrage. Bei fortlaufender Korrespondenz oder rechtlich relevanter
                Anschlusskommunikation beträgt die Speicherdauer maximal 36 Monate, soweit
                keine längeren gesetzlichen Aufbewahrungspflichten bestehen. Kommt ein
                Pflegevertrag zustande, werden die hierfür erforderlichen Daten in die
                Pflege- beziehungsweise Versorgungsdokumentation übernommen und nach den
                dort geltenden Fristen verarbeitet.
              </P>
              <P>
                Eine Weitergabe an Dritte erfolgt nur, soweit dies zur Bearbeitung Ihrer
                konkreten Anfrage erforderlich ist, gesetzlich vorgeschrieben ist oder Sie
                ausdrücklich eingewilligt haben.
              </P>
            </LegalSection>

            {/* 4 */}
            <LegalSection number="4" title="Online-Anamnesebogen" delay={0.13}>
              <Sub>Verarbeitungstätigkeit</Sub>
              <P>
                Über den Online-Anamnesebogen werden personenbezogene Daten verarbeitet, die
                zur Prüfung des Pflegebedarfs, zur Vorbereitung eines Erstgesprächs, zur
                Anbahnung eines Pflegevertrags und, bei anschließendem Vertragsschluss, zur
                Durchführung der Pflegeversorgung erforderlich sind.
              </P>
              <P>Hierzu können gehören:</P>
              <Bullets
                items={[
                  'Personendaten der zu pflegenden Person, insbesondere Vorname, Nachname, Geburtsdatum und Anschrift',
                  'Kontaktdaten der Ansprechperson und gegebenenfalls der zu pflegenden Person',
                  'Versicherungsdaten, insbesondere Krankenkasse, Pflegekasse, Versichertennummer und Pflegegrad',
                  'gesundheitsbezogene Angaben, insbesondere Diagnosen, Krankheitsverlauf, Pflegebedarf, Medikation, Allergien und Hilfsmittel',
                  'Angaben zum gewünschten Pflegeumfang',
                  'Angaben zur Wohnsituation, soweit für die Pflegeplanung erforderlich',
                  'freiwillig hochgeladene medizinische Unterlagen, insbesondere Entlassungsbriefe',
                  'Datum, Inhalt und technische Nachweise erteilter Einwilligungen oder Bestätigungen',
                  'technische Übermittlungsdaten der Formularübermittlung',
                ]}
              />
              <P>
                Die Verarbeitung erfolgt ausschließlich zur pflegebezogenen Prüfung,
                Beratung, Vertragsvorbereitung, Pflegeplanung, Versorgung und Dokumentation.
                Eine Nutzung zu Werbezwecken, Profiling, Scoring oder automatisierter
                Entscheidungsfindung findet nicht statt.
              </P>

              <Sub>Besondere Kategorien personenbezogener Daten</Sub>
              <P>
                Im Online-Anamnesebogen können Gesundheitsdaten verarbeitet werden.
                Gesundheitsdaten sind besondere Kategorien personenbezogener Daten im Sinne
                von Art. 9 Abs. 1 DSGVO.
              </P>
              <P>
                Rechtsgrundlage für die Verarbeitung gesundheitsbezogener Angaben ist Art. 9
                Abs. 2 lit. h DSGVO in Verbindung mit § 22 Abs. 1 Nr. 1 lit. b BDSG, soweit
                die Verarbeitung für Zwecke der Gesundheitsversorgung, Pflegeversorgung,
                pflegerischen Beurteilung, Versorgung im Gesundheits- oder Sozialbereich
                oder zur Durchführung des Pflegevertrags erforderlich ist.
              </P>
              <P>
                Soweit die Übermittlung bestimmter Angaben oder Unterlagen auf einer
                ausdrücklichen Einwilligung beruht oder über das zwingend Erforderliche
                hinausgeht, erfolgt die Verarbeitung zusätzlich auf Grundlage von Art. 9
                Abs. 2 lit. a DSGVO.
              </P>
              <P>
                Für personenbezogene Daten außerhalb besonderer Kategorien ist
                Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO, soweit die Verarbeitung zur
                Durchführung vorvertraglicher Maßnahmen oder zur Durchführung eines
                Pflegevertrags erforderlich ist. Soweit gesetzliche Dokumentations- oder
                Aufbewahrungspflichten bestehen, ist Rechtsgrundlage Art. 6 Abs. 1 lit. c
                DSGVO. Soweit technische Sicherheits- und Nachweiszwecke betroffen sind,
                ist Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO.
              </P>
              <P>
                Der interne Zugriff ist auf Personen beschränkt, die die Daten zur
                Bearbeitung der konkreten Pflegeanfrage, zur Pflegeplanung, zur Verwaltung
                oder zur gesetzlichen Dokumentation benötigen. Diese Personen sind zur
                Vertraulichkeit verpflichtet.
              </P>

              <Sub>Übermittlung im Auftrag Dritter</Sub>
              <P>
                Wird der Online-Anamnesebogen nicht von der zu pflegenden Person selbst,
                sondern durch Angehörige, Betreuerinnen, Betreuer, Bevollmächtigte oder
                sonstige Kontaktpersonen übermittelt, verarbeitet der Verantwortliche die
                Daten zur Prüfung und Bearbeitung der konkreten Pflegeanfrage.
              </P>
              <P>
                Die übermittelnde Person ist dafür verantwortlich, dass sie zur Übermittlung
                der Angaben berechtigt ist. Der Verantwortliche kann vor Vertragsschluss oder
                vor weitergehender Verarbeitung einen Nachweis der Vertretungsberechtigung,
                Vollmacht oder gesetzlichen Betreuung verlangen, soweit dies zur
                rechtssicheren Bearbeitung erforderlich ist.
              </P>

              <Sub>Empfänger und Auftragsverarbeiter</Sub>
              <P>
                Die über den Online-Anamnesebogen übermittelten Daten werden technisch über
                die in den Abschnitten „Hosting“ und „Code- und Datenrepository“
                beschriebenen Dienstleister verarbeitet.
              </P>
              <P>
                Eine Weitergabe an Pflegekassen, Krankenkassen, behandelnde Ärztinnen und
                Ärzte, Krankenhäuser, den Medizinischen Dienst oder sonstige externe Stellen
                erfolgt nur, soweit dies zur Durchführung der Pflegeversorgung erforderlich
                ist, gesetzlich vorgeschrieben ist oder eine ausdrückliche Einwilligung
                beziehungsweise Beauftragung vorliegt.
              </P>

              <Sub>Hochgeladene Unterlagen</Sub>
              <P>
                Soweit über den Online-Anamnesebogen Unterlagen hochgeladen werden, werden
                diese ausschließlich zur Prüfung des Pflegebedarfs, zur Vorbereitung des
                Erstgesprächs, zur Vertragsvorbereitung und, bei anschließendem
                Pflegevertrag, zur Pflege- beziehungsweise Versorgungsdokumentation
                verarbeitet.
              </P>
              <P>
                Hochgeladene Unterlagen sollen ausschließlich solche Informationen
                enthalten, die für die konkrete Pflegeanfrage erforderlich sind. Nicht
                erforderliche Diagnosen, Befunde, Angaben Dritter oder sonstige sensible
                Informationen sollen vor dem Upload geschwärzt oder nicht übermittelt
                werden.
              </P>
              <P>
                Soweit Dokumente technisch codiert gespeichert werden, insbesondere durch
                Base64-Codierung, dient diese Codierung ausschließlich der technischen
                Speicherung und Übertragung innerhalb des eingesetzten Systems. Eine solche
                Codierung stellt weder eine Anonymisierung noch eine Pseudonymisierung noch
                eine Verschlüsselung im datenschutzrechtlichen Sinne dar.
              </P>
              <P>
                Der Zugriff auf hochgeladene Unterlagen ist intern auf Personen beschränkt,
                die diese Unterlagen zur Bearbeitung der konkreten Pflegeanfrage, zur
                Pflegeplanung, zur Vertragsvorbereitung oder zur gesetzlichen Dokumentation
                benötigen.
              </P>
              <P>
                Zulässige Dateiformate, Dateigrößen und technische Upload-Grenzen ergeben
                sich aus dem Formular.
              </P>

              <Sub>Speicherdauer</Sub>
              <P>
                Kommt nach Übermittlung des Online-Anamnesebogens kein Pflegevertrag
                zustande, werden die übermittelten Daten und hochgeladenen Unterlagen
                spätestens 12 Monate nach Eingang gelöscht, soweit keine gesetzlichen
                Aufbewahrungspflichten, Nachweispflichten oder berechtigten Interessen zur
                Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen
                entgegenstehen.
              </P>
              <P>
                Kommt ein Pflegevertrag zustande, werden die erforderlichen Daten in die
                Pflege- beziehungsweise Versorgungsdokumentation übernommen. Die Aufbewahrung
                erfolgt grundsätzlich 10 Jahre nach Abschluss der Behandlung beziehungsweise
                Pflegeversorgung, soweit keine längeren gesetzlichen Aufbewahrungspflichten
                bestehen.
              </P>

              <Sub>Freiwilligkeit, Widerruf und Folgen der Nichtangabe</Sub>
              <P>
                Die Nutzung des Online-Anamnesebogens ist freiwillig. Ohne die erforderlichen
                Angaben kann eine pflegefachliche Prüfung des Pflegebedarfs, die Vorbereitung
                eines Erstgesprächs oder die Anbahnung eines Pflegevertrags nicht oder nur
                eingeschränkt erfolgen.
              </P>
              <P>
                Soweit eine Verarbeitung auf Einwilligung beruht, kann diese Einwilligung
                jederzeit mit Wirkung für die Zukunft widerrufen werden. Die Rechtmäßigkeit
                der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt. Gesetzliche
                Aufbewahrungs- und Dokumentationspflichten bleiben ebenfalls unberührt.
              </P>
            </LegalSection>

            {/* 5 */}
            <LegalSection number="5" title="Bewerbungsverfahren" delay={0.16}>
              <Sub>Umfang und Zweck der Datenerhebung</Sub>
              <P>
                Wenn Sie sich über das Online-Bewerbungsformular, per E-Mail oder postalisch
                bewerben, verarbeiten wir die von Ihnen übermittelten Bewerbungsdaten
                ausschließlich zur Durchführung des Bewerbungsverfahrens und zur
                Entscheidung über die Begründung eines Beschäftigungsverhältnisses.
              </P>
              <P>Hierzu können gehören:</P>
              <Bullets
                items={[
                  'Vor- und Nachname',
                  'Anschrift',
                  'E-Mail-Adresse',
                  'Telefonnummer',
                  'gewünschte Position',
                  'Verfügbarkeit',
                  'Qualifikationen',
                  'Berufserfahrung',
                  'Angaben aus Anschreiben oder Freitextfeldern',
                  'Lebenslauf',
                  'Zeugnisse',
                  'Zertifikate',
                  'Beschäftigungsnachweise',
                  'sonstige von Ihnen übermittelte Bewerbungsunterlagen',
                  'technische Übermittlungsdaten bei Nutzung des Online-Formulars',
                ]}
              />
              <P>
                Eine automatisierte Entscheidungsfindung im Sinne von Art. 22 DSGVO findet
                nicht statt.
              </P>

              <Sub>Rechtsgrundlage</Sub>
              <P>
                Rechtsgrundlage für die Verarbeitung von Bewerbungsdaten ist § 26 Abs. 1
                BDSG in Verbindung mit Art. 88 DSGVO.
              </P>
              <P>
                Soweit Sie ausdrücklich in die Aufnahme in einen Bewerberpool einwilligen,
                ist Rechtsgrundlage für diese weitergehende Speicherung Art. 6 Abs. 1 lit. a
                DSGVO.
              </P>
              <P>
                Soweit Bewerbungsunterlagen besondere Kategorien personenbezogener Daten
                enthalten, etwa Angaben zu Gesundheit, Schwerbehinderung,
                Religionszugehörigkeit oder Gewerkschaftszugehörigkeit, verarbeiten wir
                diese Daten nur, soweit dies für das Bewerbungsverfahren, arbeitsrechtliche
                Pflichten oder die Ausübung arbeitsrechtlicher Rechte erforderlich ist.
                Rechtsgrundlage ist § 26 Abs. 3 BDSG sowie Art. 9 Abs. 2 lit. b DSGVO.
                Soweit solche Angaben ohne Erforderlichkeit freiwillig übermittelt werden,
                erfolgt die Verarbeitung auf Grundlage von Art. 9 Abs. 2 lit. a DSGVO.
              </P>

              <Sub>Empfänger und interne Zugriffsberechtigte</Sub>
              <P>
                Bewerbungsdaten sind ausschließlich den Personen zugänglich, die mit der
                Bearbeitung der konkreten Bewerbung, der Personalauswahl oder der
                Entscheidung über die Einstellung befasst sind.
              </P>
              <P>
                Eine Weitergabe an externe Dritte erfolgt nicht, es sei denn, sie ist
                gesetzlich vorgeschrieben, zur Geltendmachung, Ausübung oder Verteidigung
                von Rechtsansprüchen erforderlich oder erfolgt im Rahmen der in dieser
                Datenschutzerklärung beschriebenen technischen Auftragsverarbeitung.
              </P>

              <Sub>Speicherdauer</Sub>
              <P>
                Bei Absage werden Bewerbungsunterlagen 6 Monate nach Abschluss des
                Bewerbungsverfahrens gelöscht. Die Frist dient der Verteidigung gegen
                mögliche Ansprüche nach dem Allgemeinen Gleichbehandlungsgesetz.
              </P>
              <P>
                Bei Aufnahme in einen Bewerberpool werden die Daten bis zum Widerruf der
                Einwilligung, längstens jedoch 24 Monate gespeichert.
              </P>
              <P>
                Wird ein Beschäftigungsverhältnis begründet, werden die für das
                Beschäftigungsverhältnis erforderlichen Bewerbungsdaten in die Personalakte
                übernommen und nach den hierfür geltenden gesetzlichen Fristen verarbeitet.
              </P>

              <Sub>Widerruf</Sub>
              <P>
                Eine Einwilligung in die Aufnahme in einen Bewerberpool kann jederzeit mit
                Wirkung für die Zukunft widerrufen werden. Der Widerruf kann formlos per
                E-Mail an <Mail /> erfolgen. Die Rechtmäßigkeit der bis zum Widerruf
                erfolgten Verarbeitung bleibt unberührt.
              </P>
            </LegalSection>

            {/* 6 */}
            <LegalSection number="6" title="Hosting" delay={0.19}>
              <Sub>Anbieter und Verarbeitungszweck</Sub>
              <P>Die technische Auslieferung dieser Website erfolgt über:</P>
              <ContactCard
                variant="neutral"
                title="Vercel Inc."
                lines={[
                  '440 N Barranca Avenue #4133',
                  'Covina, CA 91723',
                  'Vereinigte Staaten von Amerika',
                ]}
              />
              <P>
                Vercel stellt die technische Infrastruktur zur Auslieferung der Website
                bereit. Hierzu gehören die Bereitstellung statischer und serverseitig
                erzeugter Inhalte, die Verarbeitung technisch erforderlicher
                Verbindungsdaten, die Ausführung serverseitiger Funktionen und die
                Verarbeitung von Formularübermittlungen, soweit dies für die technische
                Entgegennahme, Validierung und Weiterleitung der Eingaben erforderlich ist.
              </P>
              <P>
                Im Rahmen der Nutzung dieser Website können insbesondere folgende Daten über
                Vercel verarbeitet werden:
              </P>
              <Bullets
                items={[
                  'technische Verbindungsdaten',
                  'Server-Log-Daten',
                  'Formularinhalte bei Übermittlung über die Website',
                  'technische Fehler- und Sicherheitsereignisse',
                  'Metadaten der Anfrage, insbesondere Zeitpunkt, URL, Antwortstatus und IP-Adresse',
                ]}
              />
              <P>
                Die Verarbeitung erfolgt ausschließlich zur technischen Auslieferung der
                Website, zur Bearbeitung von Formularübermittlungen, zur Fehleranalyse, zur
                Missbrauchsabwehr und zur IT-Sicherheit.
              </P>

              <Sub>Rechtsgrundlage</Sub>
              <P>
                Rechtsgrundlage für den Einsatz von Vercel zur technischen Bereitstellung
                der Website ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse liegt
                in der sicheren, stabilen und performanten Auslieferung der Website.
              </P>
              <P>
                Soweit über Vercel Formularinhalte verarbeitet werden, gelten zusätzlich die
                Rechtsgrundlagen der jeweiligen Verarbeitungstätigkeit, insbesondere Art. 6
                Abs. 1 lit. b DSGVO, Art. 6 Abs. 1 lit. c DSGVO, Art. 9 Abs. 2 lit. h DSGVO
                in Verbindung mit § 22 Abs. 1 Nr. 1 lit. b BDSG sowie § 26 BDSG.
              </P>

              <Sub>Auftragsverarbeitung</Sub>
              <P>
                Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO.
                Vercel verarbeitet personenbezogene Daten im Rahmen der beauftragten
                Leistungen nach dokumentierten Weisungen des Verantwortlichen und auf
                Grundlage der vereinbarten technischen und organisatorischen Maßnahmen.
              </P>

              <Sub>Drittlandübermittlung in die USA</Sub>
              <P>
                Der Einsatz von Vercel kann zu einer Übermittlung personenbezogener Daten in
                die Vereinigten Staaten von Amerika führen.
              </P>
              <P>
                Vercel gibt an, unter dem EU-U.S. Data Privacy Framework zertifiziert zu
                sein. Das EU-U.S. Data Privacy Framework ist ein Mechanismus für
                Datenübermittlungen an zertifizierte US-Organisationen. Die Europäische
                Kommission hat hierzu den Durchführungsbeschluss (EU) 2023/1795 zum
                angemessenen Schutzniveau für Übermittlungen an entsprechend zertifizierte
                Organisationen erlassen.
              </P>
              <P>
                Ergänzend werden, soweit einschlägig, Standardvertragsklauseln der
                Europäischen Kommission gemäß Art. 46 Abs. 2 lit. c DSGVO vereinbart.
              </P>

              <Sub>Restrisiko bei Drittlandübermittlungen</Sub>
              <P>
                Trotz Angemessenheitsbeschluss, Data Privacy Framework,
                Standardvertragsklauseln und technischer Schutzmaßnahmen kann nicht
                ausgeschlossen werden, dass US-amerikanische Sicherheits- oder
                Strafverfolgungsbehörden nach US-Recht Zugriff auf personenbezogene Daten
                verlangen.
              </P>
              <P>
                Dies betrifft insbesondere mögliche Zugriffe auf Grundlage von
                US-Überwachungs- oder Sicherheitsgesetzen. Betroffene Personen können
                dadurch unter Umständen nicht in gleicher Weise wie innerhalb der
                Europäischen Union über Zugriffe informiert werden oder gerichtlichen
                Rechtsschutz in einem Umfang erlangen, der vollständig dem Schutzniveau der
                Europäischen Union entspricht.
              </P>
              <P>
                Eine vollständige Gleichwertigkeit zum Schutzniveau innerhalb der
                Europäischen Union kann daher nicht für jeden Einzelfall garantiert werden.
                Dieses Restrisiko besteht insbesondere bei der Verarbeitung personenbezogener
                Daten durch Anbieter mit Sitz in den Vereinigten Staaten.
              </P>
            </LegalSection>

            {/* 7 */}
            <LegalSection number="7" title="Code- und Datenrepository" delay={0.22}>
              <Sub>Anbieter und Verarbeitungszweck</Sub>
              <P>
                Die Quellcodeverwaltung und strukturierte Datenpersistenz dieser Website
                erfolgt über:
              </P>
              <ContactCard
                variant="neutral"
                title="GitHub, Inc."
                lines={[
                  '88 Colin P Kelly Jr Street',
                  'San Francisco, CA 94107',
                  'Vereinigte Staaten von Amerika',
                ]}
              />
              <P>
                GitHub wird zur Verwaltung des Quellcodes, zur technischen Versionierung und
                zur strukturierten Ablage bestimmter Website-Daten eingesetzt. Soweit über
                Formulare personenbezogene Daten übermittelt werden, können diese in einem
                privaten, nicht öffentlich zugänglichen Repository verarbeitet werden.
              </P>
              <P>Dies kann insbesondere folgende Daten betreffen:</P>
              <Bullets
                items={[
                  'Kontaktanfragen',
                  'Anamnesedaten',
                  'hochgeladene Unterlagen',
                  'Bewerbungsdaten',
                  'technische Nachweise der Formularübermittlung',
                  'Einwilligungs- und Prüfprotokolle',
                  'administrative Inhalts- und Konfigurationsdaten',
                ]}
              />
              <P>
                Der Zugriff auf das Repository ist auf berechtigte Personen beschränkt.
                Öffentlich abrufbare Repositories werden für die Speicherung
                personenbezogener Formularinhalte nicht eingesetzt.
              </P>
              <P>
                Hochgeladene Dokumente können technisch codiert in Datensätzen abgelegt
                werden. Eine technische Codierung, insbesondere Base64-Codierung, dient
                ausschließlich der technischen Speicherung und Übertragung. Sie stellt weder
                eine Anonymisierung noch eine Pseudonymisierung noch eine Verschlüsselung im
                datenschutzrechtlichen Sinne dar.
              </P>
              <P>
                Die Speicherung erfolgt ausschließlich in einem privaten, nicht öffentlich
                zugänglichen Repository. Der Zugriff ist auf berechtigte Personen
                beschränkt, die zur Bearbeitung der jeweiligen Anfrage, zur Pflegeplanung,
                zur Bewerbungsbearbeitung, zur technischen Administration oder zur
                gesetzlichen Dokumentation Zugriff benötigen.
              </P>
              <P>
                Der Zugriff auf das Repository erfolgt ausschließlich über individuelle
                Zugänge. Berechtigungen sind zweckbezogen zu vergeben und zu entziehen,
                sobald ein Zugriff nicht mehr erforderlich ist. Öffentlich zugängliche
                Repositories werden für personenbezogene Formularinhalte, Gesundheitsdaten,
                Bewerbungsunterlagen oder hochgeladene Dokumente nicht verwendet.
              </P>

              <Sub>Rechtsgrundlage</Sub>
              <P>
                Rechtsgrundlage für die Nutzung von GitHub zur strukturierten, versionierten
                und zugriffsbeschränkten Ablage betriebsnotwendiger Daten ist Art. 6 Abs. 1
                lit. f DSGVO. Das berechtigte Interesse liegt in einer integritätsgesicherten,
                nachvollziehbaren und technisch kontrollierten Verwaltung der für den
                Betrieb der Website und die Bearbeitung der Anfragen erforderlichen
                Datensätze.
              </P>
              <P>
                Soweit über GitHub Formularinhalte verarbeitet werden, gelten zusätzlich die
                Rechtsgrundlagen der jeweiligen Verarbeitungstätigkeit, insbesondere Art. 6
                Abs. 1 lit. b DSGVO, Art. 6 Abs. 1 lit. c DSGVO, Art. 9 Abs. 2 lit. h DSGVO
                in Verbindung mit § 22 Abs. 1 Nr. 1 lit. b BDSG sowie § 26 BDSG.
              </P>

              <Sub>Auftragsverarbeitung</Sub>
              <P>
                Mit GitHub besteht, soweit GitHub als Auftragsverarbeiter eingesetzt wird,
                ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO. GitHub verarbeitet
                personenbezogene Daten im Rahmen der beauftragten Leistungen nach
                dokumentierten Weisungen und auf Grundlage vereinbarter technischer und
                organisatorischer Maßnahmen.
              </P>

              <Sub>Drittlandübermittlung in die USA</Sub>
              <P>
                Der Einsatz von GitHub kann zu einer Übermittlung personenbezogener Daten in
                die Vereinigten Staaten von Amerika führen.
              </P>
              <P>
                GitHub gibt an, am EU-U.S. Data Privacy Framework teilzunehmen und gegenüber
                dem U.S. Department of Commerce zertifiziert zu sein. GitHub verweist
                außerdem auf Regelungen zum Data Protection Agreement und auf
                Standardvertragsklauseln für internationale Datenübermittlungen.
              </P>
              <P>
                Die Übermittlung an zertifizierte US-Organisationen kann auf den
                Angemessenheitsbeschluss der Europäischen Kommission zum EU-U.S. Data
                Privacy Framework gestützt werden. Ergänzend werden, soweit einschlägig,
                Standardvertragsklauseln gemäß Art. 46 Abs. 2 lit. c DSGVO eingesetzt.
              </P>

              <Sub>Restrisiko bei Drittlandübermittlungen</Sub>
              <P>
                Trotz Data Privacy Framework, Angemessenheitsbeschluss,
                Standardvertragsklauseln und technischer Schutzmaßnahmen kann nicht
                ausgeschlossen werden, dass US-amerikanische Sicherheits- oder
                Strafverfolgungsbehörden nach US-Recht Zugriff auf personenbezogene Daten
                verlangen.
              </P>
              <P>
                Betroffene Personen können dadurch unter Umständen nicht in gleicher Weise
                wie innerhalb der Europäischen Union über Zugriffe informiert werden oder
                gerichtlichen Rechtsschutz in einem Umfang erlangen, der vollständig dem
                Schutzniveau der Europäischen Union entspricht.
              </P>
              <P>
                Eine vollständige Gleichwertigkeit zum Schutzniveau innerhalb der
                Europäischen Union kann daher nicht für jeden Einzelfall garantiert werden.
                Dieses Restrisiko besteht insbesondere bei der Verarbeitung personenbezogener
                Daten durch Anbieter mit Sitz in den Vereinigten Staaten.
              </P>
            </LegalSection>

            {/* 8 */}
            <LegalSection number="8" title="Schriften" delay={0.25}>
              <Sub>Lokal eingebundene Google Fonts</Sub>
              <P>
                Diese Website nutzt zur einheitlichen Darstellung von Schriftarten
                sogenannte Google Fonts. Die Schriftdateien werden lokal über die Website
                beziehungsweise die eingesetzte Hosting-Infrastruktur ausgeliefert.
              </P>
              <P>
                Beim Aufruf der Website wird keine Verbindung zu Servern von Google
                hergestellt, um Schriftarten nachzuladen. Insbesondere wird zu diesem Zweck
                keine IP-Adresse an Google übermittelt.
              </P>
              <P>
                Rechtsgrundlage für die lokale Einbindung der Schriften ist Art. 6 Abs. 1
                lit. f DSGVO. Das berechtigte Interesse liegt in einer einheitlichen,
                stabilen und ladezeitoptimierten Darstellung der Website.
              </P>
            </LegalSection>

            {/* 9 */}
            <LegalSection
              number="9"
              title="Datenminimierung und Verarbeitungsgrenzen"
              delay={0.28}
            >
              <P>
                Wir setzen den Grundsatz der Datenminimierung durch technische,
                organisatorische und zweckbezogene Begrenzungen um.
              </P>
              <P>Für diese Website gilt:</P>
              <Bullets
                items={[
                  'kein Webtracking',
                  'keine Webanalyse',
                  'keine Heatmaps',
                  'keine Werbenetzwerke',
                  'keine Social-Media-Plugins',
                  'keine geräte- oder browserübergreifende Wiedererkennung',
                  'keine Profilbildung',
                  'keine automatisierte Entscheidungsfindung im Sinne von Art. 22 DSGVO',
                  'keine Weitergabe personenbezogener Daten zu Werbezwecken',
                  'keine Verarbeitung personenbezogener Daten zu Marketingprofilen',
                  'keine Nutzung von Gesundheitsdaten zu anderen Zwecken als Pflegeanfrage, Pflegeplanung, Pflegeversorgung, Dokumentation oder gesetzlich erforderlicher Nachweisführung',
                ]}
              />
              <P>
                Besondere Kategorien personenbezogener Daten, insbesondere
                Gesundheitsdaten, sollen nur übermittelt werden, wenn sie für die konkrete
                Pflegeanfrage, Pflegeplanung oder Pflegeversorgung erforderlich sind. Nicht
                erforderliche sensible Angaben sollen nicht übermittelt oder vor
                Übermittlung geschwärzt werden.
              </P>
              <P>
                Personenbezogene Daten werden nur solchen Personen zugänglich gemacht, die
                sie für den jeweiligen Zweck benötigen. Zugriffe werden organisatorisch
                begrenzt. Technische Schutzmaßnahmen werden nach Maßgabe des Art. 32 DSGVO
                eingesetzt, insbesondere Transportverschlüsselung, Zugriffsbeschränkung,
                Berechtigungskontrolle und zweckgebundene Verarbeitung.
              </P>
              <P>
                Diese Festlegungen gelten unabhängig davon, ob für einzelne
                Verarbeitungsvorgänge eine Einwilligung eingeholt wird. Eine weitergehende
                Verarbeitung erfolgt nur, wenn sie rechtlich zulässig ist und in dieser
                Datenschutzerklärung oder einer gesonderten Information transparent benannt
                wird.
              </P>
            </LegalSection>

            {/* Stand */}
            <FadeIn delay={0.31}>
              <div className="flex items-center justify-between px-1 pt-2">
                <p
                  className="text-[12.5px] font-[420]"
                  style={{ color: '#94A3B8' }}
                >
                  Stand: {STAND}
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Back link */}
          <FadeIn delay={0.34}>
            <div className="mt-10">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-[13.5px] font-[520] tracking-[-0.01em] transition-opacity hover:opacity-60"
                style={{ color: '#64748B' }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
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
