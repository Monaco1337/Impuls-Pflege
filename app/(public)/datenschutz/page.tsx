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
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
                Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
                werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie
                unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </P>

              <Sub>Datenerfassung auf dieser Website</Sub>
              <p className="text-[14px] font-[620] tracking-[-0.012em]" style={{ color: '#334155' }}>
                Wer ist verantwortlich für die Datenerfassung auf dieser Website?
              </p>
              <P>
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
                Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen
                Stelle" in dieser Datenschutzerklärung entnehmen.
              </P>

              <p className="text-[14px] font-[620] tracking-[-0.012em]" style={{ color: '#334155' }}>
                Wie erfassen wir Ihre Daten?
              </p>
              <P>
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen.
                Hierbei kann es sich z.&nbsp;B. um Daten handeln, die Sie in ein
                Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer
                Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind
                vor allem technische Daten (z.&nbsp;B. Internetbrowser, Betriebssystem oder
                Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch,
                sobald Sie diese Website betreten.
              </P>

              <p className="text-[14px] font-[620] tracking-[-0.012em]" style={{ color: '#334155' }}>
                Wofür nutzen wir Ihre Daten?
              </p>
              <P>
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der
                Website zu gewährleisten. Andere Daten können zur Analyse Ihres
                Nutzerverhaltens verwendet werden. Wenn Sie über das Kontaktformular oder
                Bewerbungsformular Daten übermitteln, nutzen wir diese ausschließlich zur
                Bearbeitung Ihrer Anfrage bzw. Bewerbung.
              </P>

              <p className="text-[14px] font-[620] tracking-[-0.012em]" style={{ color: '#334155' }}>
                Welche Rechte haben Sie bezüglich Ihrer Daten?
              </p>
              <P>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger
                und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben
                außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
                Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie
                diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das
                Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer
                personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein
                Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </P>
              <P>Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.</P>
            </LegalSection>

            {/* 2 */}
            <LegalSection number="2" title="Allgemeine Hinweise und Pflichtinformationen" delay={0.08}>
              <Sub>Datenschutz</Sub>
              <P>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr
                ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend
                den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten
                erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich
                identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert,
                welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und
                zu welchem Zweck das geschieht.
              </P>
              <P>
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z.&nbsp;B. bei
                der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser
                Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
              </P>

              <Sub>Hinweis zur verantwortlichen Stelle</Sub>
              <P>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</P>
              <div
                className="rounded-[14px] border p-5"
                style={{ borderColor: 'rgba(24,193,163,0.18)', background: 'rgba(24,193,163,0.04)' }}
              >
                <p className="text-[14.5px] font-[660] tracking-[-0.012em]" style={{ color: '#0F172A' }}>
                  IMPULS Ambulanter Pflegedienst
                </p>
                <p className="mt-1 text-[14px] font-[420] leading-[1.65]" style={{ color: '#475569' }}>
                  Elena Tschupina<br />
                  Massener Str. 147<br />
                  59423 Unna
                </p>
                <div className="mt-3 space-y-1 text-[14px] font-[420]" style={{ color: '#475569' }}>
                  <p>Telefon: <LegalLink href="tel:+4923032920589">02303 2920589</LegalLink></p>
                  <p>E-Mail: <LegalLink href="mailto:info@impuls-pflege.de">info@impuls-pflege.de</LegalLink></p>
                </div>
              </div>
              <P>
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein
                oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von
                personenbezogenen Daten (z.&nbsp;B. Namen, E-Mail-Adressen o.&nbsp;Ä.)
                entscheidet.
              </P>

              <Sub>Speicherdauer</Sub>
              <P>
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer
                genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck
                für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen
                geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden
                Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für
                die Speicherung Ihrer personenbezogenen Daten haben (z.&nbsp;B. steuer- oder
                handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die
                Löschung nach Fortfall dieser Gründe.
              </P>

              <Sub>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</Sub>
              <P>
                Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre
                personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw.
                Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9
                Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in
                die Übertragung personenbezogener Daten in Drittstaaten erfolgt die
                Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO.
                Sofern die Datenverarbeitung zur Erfüllung eines Vertrages oder zur
                Durchführung vorvertraglicher Maßnahmen erforderlich ist, verarbeiten wir Ihre
                Daten auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten
                wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung
                erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die
                Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses
                nach Art. 6 Abs. 1 lit. f DSGVO erfolgen.
              </P>

              <Sub>Widerruf Ihrer Einwilligung zur Datenverarbeitung</Sub>
              <P>
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung
                möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen.
                Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom
                Widerruf unberührt.
              </P>

              <Sub>Beschwerderecht bei der zuständigen Aufsichtsbehörde</Sub>
              <P>
                Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein
                Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat
                ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des
                mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet
                anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
              </P>
              <P>
                Zuständige Aufsichtsbehörde: [Landesbeauftragte/r für Datenschutz und
                Informationsfreiheit Nordrhein-Westfalen, Postfach 20 04 44, 40102 Düsseldorf]
              </P>

              <Sub>Recht auf Datenübertragbarkeit</Sub>
              <P>
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in
                Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen
                Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.
                Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen
                verlangen, erfolgt dies nur, soweit es technisch machbar ist.
              </P>

              <Sub>Auskunft, Löschung und Berichtigung</Sub>
              <P>
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das
                Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen
                Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und
                ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu
                weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit
                an uns wenden.
              </P>

              <Sub>Recht auf Einschränkung der Verarbeitung</Sub>
              <P>
                Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
                personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns
                wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden
                Fällen:
              </P>
              <ul className="icon-list-stack space-y-2 pl-1">
                {[
                  'Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.',
                  'Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.',
                  'Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.',
                  'Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.',
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
                Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben,
                dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer
                Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von
                Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder
                juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses
                der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.
              </P>
            </LegalSection>

            {/* 3 */}
            <LegalSection number="3" title="Datenerfassung auf dieser Website" delay={0.11}>
              <Sub>Cookies</Sub>
              <P>
                Unsere Internetseiten verwenden teilweise so genannte Cookies. Cookies richten
                auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen
                dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
                Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und
                die Ihr Browser speichert.
              </P>
              <P>
                Die meisten der von uns verwendeten Cookies sind so genannte
                „Session-Cookies". Sie werden nach Ende Ihres Besuchs automatisch gelöscht.
                Andere Cookies bleiben auf Ihrem Endgerät gespeichert bis Sie diese löschen.
                Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch
                wiederzuerkennen.
              </P>
              <P>
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies
                informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von
                Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische
                Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der
                Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt
                sein.
              </P>
              <P>
                Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs, zur
                Bereitstellung bestimmter, von Ihnen erwünschter Funktionen oder zur
                Optimierung der Website erforderlich sind, werden auf Grundlage von Art. 6
                Abs. 1 lit. f DSGVO gespeichert. Der Websitebetreiber hat ein berechtigtes
                Interesse an der Speicherung von Cookies zur technisch fehlerfreien und
                optimierten Bereitstellung seiner Dienste. Sofern eine entsprechende
                Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf
                Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit
                widerrufbar.
              </P>

              <Sub>Kontaktformular</Sub>
              <P>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben
                aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten
                (Name, E-Mail-Adresse, Telefonnummer, Art der Anfrage, Nachricht, bevorzugter
                Rückruftermin) zwecks Bearbeitung der Anfrage und für den Fall von
                Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre
                Einwilligung weiter.
              </P>
              <P>
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
                DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder
                zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen
                Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der
                effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f
                DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern diese
                abgefragt wurde.
              </P>
              <P>
                Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis
                Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen
                oder der Zweck für die Datenspeicherung entfällt (z.&nbsp;B. nach
                abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen
                – insbesondere Aufbewahrungsfristen – bleiben unberührt.
              </P>

              <Sub>Bewerbungsformular</Sub>
              <P>
                Wenn Sie sich über unser Online-Bewerbungsformular bei uns bewerben, erheben
                wir folgende personenbezogene Daten: Name, E-Mail-Adresse, Telefonnummer,
                Adresse, gewünschte Position, Verfügbarkeit, Qualifikation, Berufserfahrung,
                Motivationsschreiben sowie hochgeladene Dokumente (Lebenslauf, Zeugnisse,
                Zertifikate).
              </P>
              <P>
                Die Verarbeitung erfolgt zum Zweck der Durchführung des Bewerbungsverfahrens
                auf Grundlage von § 26 BDSG (Anbahnung eines Beschäftigungsverhältnisses).
                Ihre Bewerbungsdaten werden ausschließlich von den am Bewerbungsverfahren
                beteiligten Personen eingesehen.
              </P>
              <P>
                Sofern die Bewerbung nicht erfolgreich ist, werden Ihre Daten spätestens sechs
                Monate nach Abschluss des Bewerbungsverfahrens gelöscht, sofern keine längere
                Speicherung aufgrund berechtigter Interessen erforderlich ist oder Sie in eine
                längere Speicherung eingewilligt haben.
              </P>

              <Sub>Server-Log-Dateien</Sub>
              <P>
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so
                genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt.
                Dies sind:
              </P>
              <ul className="icon-list-stack space-y-1.5 pl-1">
                {['Browsertyp und Browserversion', 'verwendetes Betriebssystem', 'Referrer URL', 'Hostname des zugreifenden Rechners', 'Uhrzeit der Serveranfrage', 'IP-Adresse'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: MINT }} />
                    <span className="icon-list-prose min-w-0 flex-1 text-[14.5px] font-[410] tracking-[-0.008em]" style={{ color: '#475569' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <P>
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht
                vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6
                Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an
                der technisch fehlerfreien Darstellung und der Optimierung seiner Website –
                hierzu müssen die Server-Log-Dateien erfasst werden.
              </P>
            </LegalSection>

            {/* 4 */}
            <LegalSection number="4" title="Hosting" delay={0.14}>
              <P>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</P>

              <Sub>[Hosting-Anbieter]</Sub>
              <P>
                Anbieter ist [Name und Adresse des Hosting-Anbieters]. Wenn Sie unsere Website
                besuchen, erfasst der Hosting-Anbieter verschiedene Logfiles inklusive Ihrer
                IP-Adressen. Details entnehmen Sie der Datenschutzerklärung des
                Hosting-Anbieters: [URL der Datenschutzerklärung des Hosting-Anbieters].
              </P>
              <P>
                Die Verwendung des Hosting-Anbieters erfolgt auf Grundlage von Art. 6 Abs. 1
                lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst
                zuverlässigen Darstellung unserer Website. Sofern eine entsprechende
                Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf
                Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit
                widerrufbar.
              </P>

              <Sub>Auftragsverarbeitung</Sub>
              <P>
                Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben
                genannten Dienstes geschlossen. Hierbei handelt es sich um einen
                datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser
                die personenbezogenen Daten unserer Websitebesucher nur nach unseren
                Weisungen und unter Einhaltung der DSGVO verarbeitet.
              </P>
            </LegalSection>

            {/* 5 */}
            <LegalSection number="5" title="Plugins und Tools" delay={0.17}>
              <Sub>Google Fonts (lokal)</Sub>
              <P>
                Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte
                Google Fonts, die lokal installiert sind. Eine Verbindung zu Servern von Google
                findet dabei nicht statt. Weitere Informationen zu Google Fonts finden Sie
                unter{' '}
                <LegalLink href="https://developers.google.com/fonts/faq" external>
                  https://developers.google.com/fonts/faq
                </LegalLink>{' '}
                und in der Datenschutzerklärung von Google:{' '}
                <LegalLink href="https://policies.google.com/privacy" external>
                  https://policies.google.com/privacy
                </LegalLink>
                .
              </P>
              <div
                className="rounded-[12px] border p-4 text-[13px] font-[420] leading-[1.65]"
                style={{ borderColor: 'rgba(0,0,0,0.07)', background: '#FAFAF9', color: '#94A3B8' }}
              >
                [Hinweis: Sollten weitere Plugins oder externe Tools (z.&nbsp;B. Google Maps,
                Analytics, Social-Media-Plugins) eingebunden werden, sind diese hier
                entsprechend zu ergänzen.]
              </div>
            </LegalSection>

            {/* 6 */}
            <LegalSection number="6" title="Bewerberdaten" delay={0.20}>
              <Sub>Umfang und Zweck der Datenerhebung</Sub>
              <P>
                Wenn Sie sich bei uns bewerben (z.&nbsp;B. per Online-Formular, E-Mail oder
                Post), verarbeiten wir Ihre Bewerberdaten zur Abwicklung des
                Bewerbungsverfahrens. Die Verarbeitung kann auch auf elektronischem Wege
                erfolgen. Dies ist insbesondere dann der Fall, wenn Sie uns entsprechende
                Bewerbungsunterlagen auf elektronischem Wege, beispielsweise per E-Mail oder
                über ein auf der Website befindliches Bewerbungsformular, zukommen lassen.
              </P>

              <Sub>Rechtsgrundlage</Sub>
              <P>
                Die Rechtsgrundlage für die Verarbeitung Ihrer Bewerberdaten ist § 26 BDSG in
                Verbindung mit Art. 88 DSGVO (Anbahnung eines Beschäftigungsverhältnisses).
                Sofern Sie uns eine ausdrückliche Einwilligung zur Verarbeitung erteilt haben
                (z.&nbsp;B. Aufnahme in einen Bewerberpool), ist die Rechtsgrundlage Art. 6
                Abs. 1 lit. a DSGVO.
              </P>

              <Sub>Speicherdauer</Sub>
              <P>
                Im Falle einer Absage werden Ihre Bewerbungsdaten spätestens nach sechs
                Monaten gelöscht. Sofern Sie einer längeren Speicherung zugestimmt haben
                (Bewerberpool), verarbeiten wir Ihre Daten auf Grundlage Ihrer Einwilligung
                (Art. 6 Abs. 1 lit. a DSGVO). Wird Ihnen im Rahmen des Bewerbungsverfahrens
                ein Arbeitsvertrag angeboten, werden die Daten in Ihrem
                Beschäftigtenverhältnis weiterverarbeitet, sofern dies der Durchführung des
                Beschäftigungsverhältnisses dient.
              </P>

              <Sub>Widerruf</Sub>
              <P>
                Sie können eine bereits erteilte Einwilligung zur Datenverarbeitung jederzeit
                widerrufen. Der Widerruf kann formlos per E-Mail an{' '}
                <LegalLink href="mailto:info@impuls-pflege.de">info@impuls-pflege.de</LegalLink>{' '}
                erfolgen. Bitte beachten Sie, dass ein Widerruf die Rechtmäßigkeit der bis
                dahin erfolgten Verarbeitung nicht berührt und dass Daten, deren Verarbeitung
                aufgrund anderer Rechtsgrundlagen erfolgt, hiervon unberührt bleiben.
              </P>
            </LegalSection>

            {/* Stand */}
            <FadeIn delay={0.24}>
              <div className="flex items-center justify-between px-1">
                <p
                  className="text-[12.5px] font-[420]"
                  style={{ color: '#94A3B8' }}
                >
                  Stand: [Datum der letzten Aktualisierung]
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
