import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { MotionWrapper } from '@/components/sections/motion-wrapper'

export const metadata = {
  title: 'Datenschutzerklärung – IMPULS Ambulanter Pflegedienst',
  description:
    'Datenschutzerklärung der IMPULS Ambulanter Pflegedienst in Unna. Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.',
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="text-xl font-bold text-warm-900">
      {number}. {title}
    </h2>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-6 text-base font-semibold text-warm-900">{children}</h3>
}

export default function DatenschutzPage() {
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
              Datenschutzerklärung
            </h1>
          </MotionWrapper>
        </Container>
      </Section>

      {/* Content */}
      <Section className="bg-white py-12 sm:py-16">
        <Container size="md">
          <div className="max-w-none space-y-12 text-sm leading-relaxed text-warm-700">
            {/* 1. Datenschutz auf einen Blick */}
            <MotionWrapper>
              <div className="space-y-4">
                <SectionHeading number="1" title="Datenschutz auf einen Blick" />

                <SubHeading>Allgemeine Hinweise</SubHeading>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber,
                  was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
                  Website besuchen. Personenbezogene Daten sind alle Daten, mit
                  denen Sie persönlich identifiziert werden können. Ausführliche
                  Informationen zum Thema Datenschutz entnehmen Sie unserer unter
                  diesem Text aufgeführten Datenschutzerklärung.
                </p>

                <SubHeading>Datenerfassung auf dieser Website</SubHeading>
                <p className="font-semibold text-warm-800">
                  Wer ist verantwortlich für die Datenerfassung auf dieser
                  Website?
                </p>
                <p>
                  Die Datenverarbeitung auf dieser Website erfolgt durch den
                  Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt
                  „Hinweis zur verantwortlichen Stelle" in dieser
                  Datenschutzerklärung entnehmen.
                </p>

                <p className="font-semibold text-warm-800">
                  Wie erfassen wir Ihre Daten?
                </p>
                <p>
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
                  mitteilen. Hierbei kann es sich z.&nbsp;B. um Daten handeln,
                  die Sie in ein Kontaktformular eingeben. Andere Daten werden
                  automatisch oder nach Ihrer Einwilligung beim Besuch der
                  Website durch unsere IT-Systeme erfasst. Das sind vor allem
                  technische Daten (z.&nbsp;B. Internetbrowser, Betriebssystem
                  oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten
                  erfolgt automatisch, sobald Sie diese Website betreten.
                </p>

                <p className="font-semibold text-warm-800">
                  Wofür nutzen wir Ihre Daten?
                </p>
                <p>
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie
                  Bereitstellung der Website zu gewährleisten. Andere Daten
                  können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                  Wenn Sie über das Kontaktformular oder Bewerbungsformular Daten
                  übermitteln, nutzen wir diese ausschließlich zur Bearbeitung
                  Ihrer Anfrage bzw. Bewerbung.
                </p>

                <p className="font-semibold text-warm-800">
                  Welche Rechte haben Sie bezüglich Ihrer Daten?
                </p>
                <p>
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über
                  Herkunft, Empfänger und Zweck Ihrer gespeicherten
                  personenbezogenen Daten zu erhalten. Sie haben außerdem ein
                  Recht, die Berichtigung oder Löschung dieser Daten zu
                  verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung
                  erteilt haben, können Sie diese Einwilligung jederzeit für die
                  Zukunft widerrufen. Außerdem haben Sie das Recht, unter
                  bestimmten Umständen die Einschränkung der Verarbeitung Ihrer
                  personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen
                  ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                </p>
                <p>
                  Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können
                  Sie sich jederzeit an uns wenden.
                </p>
              </div>
            </MotionWrapper>

            <hr className="border-warm-200" />

            {/* 2. Allgemeine Hinweise und Pflichtinformationen */}
            <MotionWrapper delay={0.05}>
              <div className="space-y-4">
                <SectionHeading
                  number="2"
                  title="Allgemeine Hinweise und Pflichtinformationen"
                />

                <SubHeading>Datenschutz</SubHeading>
                <p>
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer
                  persönlichen Daten sehr ernst. Wir behandeln Ihre
                  personenbezogenen Daten vertraulich und entsprechend den
                  gesetzlichen Datenschutzvorschriften sowie dieser
                  Datenschutzerklärung. Wenn Sie diese Website benutzen, werden
                  verschiedene personenbezogene Daten erhoben.
                  Personenbezogene Daten sind Daten, mit denen Sie persönlich
                  identifiziert werden können. Die vorliegende
                  Datenschutzerklärung erläutert, welche Daten wir erheben und
                  wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem
                  Zweck das geschieht.
                </p>
                <p>
                  Wir weisen darauf hin, dass die Datenübertragung im Internet
                  (z.&nbsp;B. bei der Kommunikation per E-Mail)
                  Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der
                  Daten vor dem Zugriff durch Dritte ist nicht möglich.
                </p>

                <SubHeading>Hinweis zur verantwortlichen Stelle</SubHeading>
                <p>
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser
                  Website ist:
                </p>
                <div className="mt-2 space-y-1 rounded-lg border border-warm-200 bg-warm-50/60 p-4">
                  <p className="font-semibold text-warm-900">
                    IMPULS Ambulanter Pflegedienst
                  </p>
                  <p>[Name der Geschäftsführung]</p>
                  <p>Musterstraße 1</p>
                  <p>59423 Unna</p>
                  <p className="mt-2">Telefon: 02303 / 123 456</p>
                  <p>E-Mail: info@impuls-pflege.de</p>
                </div>
                <p className="mt-3">
                  Verantwortliche Stelle ist die natürliche oder juristische
                  Person, die allein oder gemeinsam mit anderen über die Zwecke
                  und Mittel der Verarbeitung von personenbezogenen Daten
                  (z.&nbsp;B. Namen, E-Mail-Adressen o.&nbsp;Ä.) entscheidet.
                </p>

                <SubHeading>Speicherdauer</SubHeading>
                <p>
                  Soweit innerhalb dieser Datenschutzerklärung keine speziellere
                  Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen
                  Daten bei uns, bis der Zweck für die Datenverarbeitung
                  entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend
                  machen oder eine Einwilligung zur Datenverarbeitung widerrufen,
                  werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich
                  zulässigen Gründe für die Speicherung Ihrer personenbezogenen
                  Daten haben (z.&nbsp;B. steuer- oder handelsrechtliche
                  Aufbewahrungsfristen); im letztgenannten Fall erfolgt die
                  Löschung nach Fortfall dieser Gründe.
                </p>

                <SubHeading>
                  Allgemeine Hinweise zu den Rechtsgrundlagen der
                  Datenverarbeitung auf dieser Website
                </SubHeading>
                <p>
                  Sofern Sie in die Datenverarbeitung eingewilligt haben,
                  verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von
                  Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO,
                  sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO
                  verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung
                  in die Übertragung personenbezogener Daten in Drittstaaten
                  erfolgt die Datenverarbeitung außerdem auf Grundlage von Art.
                  49 Abs. 1 lit. a DSGVO. Sofern die Datenverarbeitung zur
                  Erfüllung eines Vertrages oder zur Durchführung
                  vorvertraglicher Maßnahmen erforderlich ist, verarbeiten wir
                  Ihre Daten auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Des
                  Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung
                  einer rechtlichen Verpflichtung erforderlich sind auf Grundlage
                  von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann
                  ferner auf Grundlage unseres berechtigten Interesses nach Art.
                  6 Abs. 1 lit. f DSGVO erfolgen.
                </p>

                <SubHeading>
                  Widerruf Ihrer Einwilligung zur Datenverarbeitung
                </SubHeading>
                <p>
                  Viele Datenverarbeitungsvorgänge sind nur mit Ihrer
                  ausdrücklichen Einwilligung möglich. Sie können eine bereits
                  erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit
                  der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom
                  Widerruf unberührt.
                </p>

                <SubHeading>
                  Beschwerderecht bei der zuständigen Aufsichtsbehörde
                </SubHeading>
                <p>
                  Im Falle von Verstößen gegen die DSGVO steht den Betroffenen
                  ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in
                  dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres
                  Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das
                  Beschwerderecht besteht unbeschadet anderweitiger
                  verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
                </p>
                <p>
                  Zuständige Aufsichtsbehörde: [Landesbeauftragte/r für
                  Datenschutz und Informationsfreiheit Nordrhein-Westfalen,
                  Postfach 20 04 44, 40102 Düsseldorf]
                </p>

                <SubHeading>Recht auf Datenübertragbarkeit</SubHeading>
                <p>
                  Sie haben das Recht, Daten, die wir auf Grundlage Ihrer
                  Einwilligung oder in Erfüllung eines Vertrags automatisiert
                  verarbeiten, an sich oder an einen Dritten in einem gängigen,
                  maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die
                  direkte Übertragung der Daten an einen anderen
                  Verantwortlichen verlangen, erfolgt dies nur, soweit es
                  technisch machbar ist.
                </p>

                <SubHeading>Auskunft, Löschung und Berichtigung</SubHeading>
                <p>
                  Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen
                  jederzeit das Recht auf unentgeltliche Auskunft über Ihre
                  gespeicherten personenbezogenen Daten, deren Herkunft und
                  Empfänger und den Zweck der Datenverarbeitung und ggf. ein
                  Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie
                  zu weiteren Fragen zum Thema personenbezogene Daten können Sie
                  sich jederzeit an uns wenden.
                </p>

                <SubHeading>
                  Recht auf Einschränkung der Verarbeitung
                </SubHeading>
                <p>
                  Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
                  personenbezogenen Daten zu verlangen. Hierzu können Sie sich
                  jederzeit an uns wenden. Das Recht auf Einschränkung der
                  Verarbeitung besteht in folgenden Fällen:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>
                    Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten
                    personenbezogenen Daten bestreiten, benötigen wir in der
                    Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung
                    haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer
                    personenbezogenen Daten zu verlangen.
                  </li>
                  <li>
                    Wenn die Verarbeitung Ihrer personenbezogenen Daten
                    unrechtmäßig geschah/geschieht, können Sie statt der Löschung
                    die Einschränkung der Datenverarbeitung verlangen.
                  </li>
                  <li>
                    Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen,
                    Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung
                    von Rechtsansprüchen benötigen, haben Sie das Recht, statt
                    der Löschung die Einschränkung der Verarbeitung Ihrer
                    personenbezogenen Daten zu verlangen.
                  </li>
                  <li>
                    Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO
                    eingelegt haben, muss eine Abwägung zwischen Ihren und
                    unseren Interessen vorgenommen werden. Solange noch nicht
                    feststeht, wessen Interessen überwiegen, haben Sie das Recht,
                    die Einschränkung der Verarbeitung Ihrer personenbezogenen
                    Daten zu verlangen.
                  </li>
                </ul>
                <p className="mt-2">
                  Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten
                  eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung
                  abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung,
                  Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz
                  der Rechte einer anderen natürlichen oder juristischen Person
                  oder aus Gründen eines wichtigen öffentlichen Interesses der
                  Europäischen Union oder eines Mitgliedstaats verarbeitet
                  werden.
                </p>
              </div>
            </MotionWrapper>

            <hr className="border-warm-200" />

            {/* 3. Datenerfassung auf dieser Website */}
            <MotionWrapper delay={0.1}>
              <div className="space-y-4">
                <SectionHeading
                  number="3"
                  title="Datenerfassung auf dieser Website"
                />

                <SubHeading>Cookies</SubHeading>
                <p>
                  Unsere Internetseiten verwenden teilweise so genannte Cookies.
                  Cookies richten auf Ihrem Rechner keinen Schaden an und
                  enthalten keine Viren. Cookies dienen dazu, unser Angebot
                  nutzerfreundlicher, effektiver und sicherer zu machen. Cookies
                  sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden
                  und die Ihr Browser speichert.
                </p>
                <p>
                  Die meisten der von uns verwendeten Cookies sind so genannte
                  „Session-Cookies". Sie werden nach Ende Ihres Besuchs
                  automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät
                  gespeichert bis Sie diese löschen. Diese Cookies ermöglichen
                  es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.
                </p>
                <p>
                  Sie können Ihren Browser so einstellen, dass Sie über das
                  Setzen von Cookies informiert werden und Cookies nur im
                  Einzelfall erlauben, die Annahme von Cookies für bestimmte
                  Fälle oder generell ausschließen sowie das automatische Löschen
                  der Cookies beim Schließen des Browsers aktivieren. Bei der
                  Deaktivierung von Cookies kann die Funktionalität dieser
                  Website eingeschränkt sein.
                </p>
                <p>
                  Cookies, die zur Durchführung des elektronischen
                  Kommunikationsvorgangs, zur Bereitstellung bestimmter, von
                  Ihnen erwünschter Funktionen oder zur Optimierung der Website
                  erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit.
                  f DSGVO gespeichert. Der Websitebetreiber hat ein berechtigtes
                  Interesse an der Speicherung von Cookies zur technisch
                  fehlerfreien und optimierten Bereitstellung seiner Dienste.
                  Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt
                  die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1
                  lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.
                </p>

                <SubHeading>Kontaktformular</SubHeading>
                <p>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen,
                  werden Ihre Angaben aus dem Anfrageformular inklusive der von
                  Ihnen dort angegebenen Kontaktdaten (Name, E-Mail-Adresse,
                  Telefonnummer, Art der Anfrage, Nachricht, bevorzugter
                  Rückruftermin) zwecks Bearbeitung der Anfrage und für den Fall
                  von Anschlussfragen bei uns gespeichert. Diese Daten geben wir
                  nicht ohne Ihre Einwilligung weiter.
                </p>
                <p>
                  Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6
                  Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung
                  eines Vertrags zusammenhängt oder zur Durchführung
                  vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen
                  Fällen beruht die Verarbeitung auf unserem berechtigten
                  Interesse an der effektiven Bearbeitung der an uns gerichteten
                  Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
                  Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern diese
                  abgefragt wurde.
                </p>
                <p>
                  Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben
                  bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung
                  zur Speicherung widerrufen oder der Zweck für die
                  Datenspeicherung entfällt (z.&nbsp;B. nach abgeschlossener
                  Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen
                  – insbesondere Aufbewahrungsfristen – bleiben unberührt.
                </p>

                <SubHeading>Bewerbungsformular</SubHeading>
                <p>
                  Wenn Sie sich über unser Online-Bewerbungsformular bei uns
                  bewerben, erheben wir folgende personenbezogene Daten: Name,
                  E-Mail-Adresse, Telefonnummer, Adresse, gewünschte Position,
                  Verfügbarkeit, Qualifikation, Berufserfahrung,
                  Motivationsschreiben sowie hochgeladene Dokumente (Lebenslauf,
                  Zeugnisse, Zertifikate).
                </p>
                <p>
                  Die Verarbeitung erfolgt zum Zweck der Durchführung des
                  Bewerbungsverfahrens auf Grundlage von § 26 BDSG
                  (Anbahnung eines Beschäftigungsverhältnisses). Ihre
                  Bewerbungsdaten werden ausschließlich von den am
                  Bewerbungsverfahren beteiligten Personen eingesehen.
                </p>
                <p>
                  Sofern die Bewerbung nicht erfolgreich ist, werden Ihre Daten
                  spätestens sechs Monate nach Abschluss des
                  Bewerbungsverfahrens gelöscht, sofern keine längere Speicherung
                  aufgrund berechtigter Interessen erforderlich ist oder Sie in
                  eine längere Speicherung eingewilligt haben.
                </p>

                <SubHeading>Server-Log-Dateien</SubHeading>
                <p>
                  Der Provider der Seiten erhebt und speichert automatisch
                  Informationen in so genannten Server-Log-Dateien, die Ihr
                  Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Browsertyp und Browserversion</li>
                  <li>verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p className="mt-2">
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen wird
                  nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf
                  Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der
                  Websitebetreiber hat ein berechtigtes Interesse an der
                  technisch fehlerfreien Darstellung und der Optimierung seiner
                  Website – hierzu müssen die Server-Log-Dateien erfasst werden.
                </p>
              </div>
            </MotionWrapper>

            <hr className="border-warm-200" />

            {/* 4. Hosting */}
            <MotionWrapper delay={0.15}>
              <div className="space-y-4">
                <SectionHeading number="4" title="Hosting" />
                <p>
                  Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
                </p>

                <SubHeading>[Hosting-Anbieter]</SubHeading>
                <p>
                  Anbieter ist [Name und Adresse des Hosting-Anbieters]. Wenn Sie
                  unsere Website besuchen, erfasst der Hosting-Anbieter
                  verschiedene Logfiles inklusive Ihrer IP-Adressen. Details
                  entnehmen Sie der Datenschutzerklärung des Hosting-Anbieters:
                  [URL der Datenschutzerklärung des Hosting-Anbieters].
                </p>
                <p>
                  Die Verwendung des Hosting-Anbieters erfolgt auf Grundlage von
                  Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes
                  Interesse an einer möglichst zuverlässigen Darstellung unserer
                  Website. Sofern eine entsprechende Einwilligung abgefragt
                  wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage
                  von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit
                  widerrufbar.
                </p>

                <SubHeading>Auftragsverarbeitung</SubHeading>
                <p>
                  Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur
                  Nutzung des oben genannten Dienstes geschlossen. Hierbei
                  handelt es sich um einen datenschutzrechtlich vorgeschriebenen
                  Vertrag, der gewährleistet, dass dieser die personenbezogenen
                  Daten unserer Websitebesucher nur nach unseren Weisungen und
                  unter Einhaltung der DSGVO verarbeitet.
                </p>
              </div>
            </MotionWrapper>

            <hr className="border-warm-200" />

            {/* 5. Plugins und Tools */}
            <MotionWrapper delay={0.2}>
              <div className="space-y-4">
                <SectionHeading number="5" title="Plugins und Tools" />

                <SubHeading>Google Fonts (lokal)</SubHeading>
                <p>
                  Diese Seite nutzt zur einheitlichen Darstellung von
                  Schriftarten so genannte Google Fonts, die lokal installiert
                  sind. Eine Verbindung zu Servern von Google findet dabei nicht
                  statt. Weitere Informationen zu Google Fonts finden Sie unter{' '}
                  <a
                    href="https://developers.google.com/fonts/faq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary-600 underline underline-offset-2 transition-colors hover:text-primary-700"
                  >
                    https://developers.google.com/fonts/faq
                  </a>{' '}
                  und in der Datenschutzerklärung von Google:{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary-600 underline underline-offset-2 transition-colors hover:text-primary-700"
                  >
                    https://policies.google.com/privacy
                  </a>
                  .
                </p>

                <p className="mt-4 rounded-lg border border-warm-200 bg-warm-50/60 p-4 text-xs text-warm-500">
                  [Hinweis: Sollten weitere Plugins oder externe Tools
                  (z.&nbsp;B. Google Maps, Analytics, Social-Media-Plugins)
                  eingebunden werden, sind diese hier entsprechend zu ergänzen.]
                </p>
              </div>
            </MotionWrapper>

            <hr className="border-warm-200" />

            {/* 6. Bewerberdaten */}
            <MotionWrapper delay={0.25}>
              <div className="space-y-4">
                <SectionHeading number="6" title="Bewerberdaten" />

                <SubHeading>Umfang und Zweck der Datenerhebung</SubHeading>
                <p>
                  Wenn Sie sich bei uns bewerben (z.&nbsp;B. per
                  Online-Formular, E-Mail oder Post), verarbeiten wir Ihre
                  Bewerberdaten zur Abwicklung des Bewerbungsverfahrens. Die
                  Verarbeitung kann auch auf elektronischem Wege erfolgen. Dies
                  ist insbesondere dann der Fall, wenn Sie uns entsprechende
                  Bewerbungsunterlagen auf elektronischem Wege, beispielsweise
                  per E-Mail oder über ein auf der Website befindliches
                  Bewerbungsformular, zukommen lassen.
                </p>

                <SubHeading>Rechtsgrundlage</SubHeading>
                <p>
                  Die Rechtsgrundlage für die Verarbeitung Ihrer Bewerberdaten
                  ist § 26 BDSG in Verbindung mit Art. 88 DSGVO (Anbahnung
                  eines Beschäftigungsverhältnisses). Sofern Sie uns eine
                  ausdrückliche Einwilligung zur Verarbeitung erteilt haben
                  (z.&nbsp;B. Aufnahme in einen Bewerberpool), ist die
                  Rechtsgrundlage Art. 6 Abs. 1 lit. a DSGVO.
                </p>

                <SubHeading>Speicherdauer</SubHeading>
                <p>
                  Im Falle einer Absage werden Ihre Bewerbungsdaten spätestens
                  nach sechs Monaten gelöscht. Sofern Sie einer längeren
                  Speicherung zugestimmt haben (Bewerberpool), verarbeiten wir
                  Ihre Daten auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1
                  lit. a DSGVO). Wird Ihnen im Rahmen des
                  Bewerbungsverfahrens ein Arbeitsvertrag angeboten, werden die
                  Daten in Ihrem Beschäftigtenverhältnis weiterverarbeitet,
                  sofern dies der Durchführung des Beschäftigungsverhältnisses
                  dient.
                </p>

                <SubHeading>Widerruf</SubHeading>
                <p>
                  Sie können eine bereits erteilte Einwilligung zur
                  Datenverarbeitung jederzeit widerrufen. Der Widerruf kann
                  formlos per E-Mail an{' '}
                  <a
                    href="mailto:info@impuls-pflege.de"
                    className="font-medium text-primary-600 underline underline-offset-2 transition-colors hover:text-primary-700"
                  >
                    info@impuls-pflege.de
                  </a>{' '}
                  erfolgen. Bitte beachten Sie, dass ein Widerruf die
                  Rechtmäßigkeit der bis dahin erfolgten Verarbeitung nicht
                  berührt und dass Daten, deren Verarbeitung aufgrund anderer
                  Rechtsgrundlagen erfolgt, hiervon unberührt bleiben.
                </p>
              </div>
            </MotionWrapper>

            {/* Last updated */}
            <MotionWrapper delay={0.3}>
              <div className="mt-8 border-t border-warm-200 pt-6">
                <p className="text-xs text-warm-400">
                  Stand: [Datum der letzten Aktualisierung]
                </p>
              </div>
            </MotionWrapper>
          </div>
        </Container>
      </Section>
    </>
  )
}
