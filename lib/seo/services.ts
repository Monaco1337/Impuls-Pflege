/**
 * Pflege-Leistungen als SEO-Entitäten.
 *
 * Jede Leistung hat:
 *  - SEO-Slug, H1, kurze und lange Beschreibung
 *  - SGB-Bezug (§ 36 / § 37 / § 39 / § 45a SGB XI etc.) für E-A-T-Signale
 *  - Items / Maßnahmen (was IMPULS konkret leistet)
 *  - "fundedBy" (welche Kasse/Stelle übernimmt Kosten — Trust-Signal)
 *  - FAQs mit echten Pflegekassen-Antworten
 *  - intentTokens für Keyword-Generation
 */

export interface PflegeService {
  slug: string
  /** Sehr kurzer Name (Navigation). */
  name: string
  /** Display-Titel, oft mit „Pflege" oder Suffix. */
  title: string
  /** Default-H1. Wird auf Stadt × Service zu „… in {Stadt}" erweitert. */
  h1: string
  /** Meta-Title-Basis (kurz). */
  metaTitleBase: string
  /** Meta-Description-Basis (Stadtname wird angehängt). */
  metaDescBase: string
  /** Lucide-Icon-Name (Mapping in Komponente). */
  icon: 'Heart' | 'Stethoscope' | 'Smile' | 'Home' | 'MessageCircle' | 'ShieldCheck' | 'Brain' | 'Pill' | 'Bandage' | 'HandHeart'
  /** Rechtsbezug (für E-A-T). */
  legalBasis: string[]
  /** Kostenträger. */
  fundedBy: string[]
  /** Kurzer einleitender Absatz (1–2 Sätze). */
  short: string
  /** Langer, fachlich präziser Absatz (3–6 Sätze). */
  long: string
  /** Was wir konkret leisten. */
  items: string[]
  /** Wann sinnvoll (Trigger / Symptome). */
  triggers: string[]
  /** Worauf achten Angehörige? (vermeidet Doorway-Wirkung). */
  forRelatives: string[]
  /** FAQ — pflegefachlich & kostenseitig. */
  faqs: { question: string; answer: string }[]
  /** Intent-Tokens für Keyword-Generation. */
  intentTokens: string[]
  /** Welche anderen Services hängen sinnvoll dran? */
  relatedSlugs: string[]
}

export const SERVICES: PflegeService[] = [
  {
    slug: 'grundpflege',
    name: 'Grundpflege',
    title: 'Grundpflege',
    h1: 'Grundpflege im Kreis Unna',
    metaTitleBase: 'Grundpflege',
    metaDescBase:
      'Liebevolle Grundpflege durch IMPULS: Körperpflege, Mobilität, Ernährung — verlässlich, würdevoll und durch die Pflegekasse abrechenbar',
    icon: 'Heart',
    legalBasis: ['§ 36 SGB XI – Pflegesachleistung', '§ 37 SGB XI – Pflegegeld'],
    fundedBy: ['Gesetzliche Pflegeversicherung', 'Private Pflegeversicherung', 'Beihilfe', 'Selbstzahler'],
    short:
      'Würdevolle Unterstützung bei Körperpflege, Mobilität und Ernährung — durch feste Bezugs­pflegekräfte, abgestimmt auf den Pflegegrad.',
    long:
      'Grundpflege umfasst alle pflegerischen Maßnahmen, die zur Aufrechterhaltung der körperlichen Selbst­versorgung notwendig sind. Sie ist Kern­leistung nach § 36 SGB XI und wird ab Pflegegrad 2 durch die gesetzliche Pflege­kasse als Sachleistung erstattet. Wir planen die Einsätze fest, dokumentieren digital nach SGB-Standard und halten den Kontakt zu Hausärzten — so bleibt Lebens­qualität und Würde im eigenen Zuhause erhalten.',
    items: [
      'Unterstützung bei Körperpflege (Waschen, Duschen, Baden)',
      'Hilfe beim An- und Auskleiden',
      'Hilfe bei der Nahrungs- und Flüssigkeits­aufnahme',
      'Unterstützung beim Toilettengang und bei Inkontinenz',
      'Lagerung, Mobilisation, Transfer',
      'Hautpflege, Mund- und Zahnpflege',
      'Dekubitus- und Kontraktur­prophylaxe',
    ],
    triggers: [
      'Nachlassende Beweglichkeit',
      'Sturz oder Schlaganfall',
      'Pflegebedürftigkeit ab Pflegegrad 2',
      'Entlastung pflegender Angehöriger',
    ],
    forRelatives: [
      'Sie behalten die volle Entscheidungs­hoheit — wir ergänzen, was Sie nicht mehr leisten können.',
      'Mit Pflegegrad 2 erhalten Sie 796 € monatlich als Sachleistung (Stand 2025), die wir direkt mit der Kasse abrechnen.',
      'Bei Kombination mit Pflegegeld (§ 38 SGB XI) reduziert sich das Pflegegeld nur anteilig.',
    ],
    faqs: [
      {
        question: 'Ab welchem Pflegegrad zahlt die Pflegekasse Grundpflege?',
        answer:
          'Ab Pflegegrad 2. Pflegegrad 1 erhält 131 € Entlastungs­betrag pro Monat (§ 45b SGB XI) — auch das können wir abrechnen. Ab Pflegegrad 2 stehen Ihnen Pflege­sach­leistungen nach § 36 SGB XI zu (PG 2: 796 €, PG 3: 1.497 €, PG 4: 1.859 €, PG 5: 2.299 € — Stand 2025).',
      },
      {
        question: 'Was kostet Grundpflege, wenn man sie selbst zahlen muss?',
        answer:
          'Wir rechnen nach den NRW-Vergütungs­vereinbarungen mit den Pflege­kassen ab. Selbst­zahler zahlen denselben Punkte­wert. Eine konkrete Kalkulation erstellen wir kostenfrei beim Erstbesuch.',
      },
      {
        question: 'Bekommen wir feste Pflegekräfte oder wechselnde?',
        answer:
          'Feste Bezugspflege ist unsere Regel, kein Werbeversprechen. Bei Urlaub oder Krankheit übernimmt eine bekannte Kollegin — niemals eine völlig fremde Person ohne Übergabe.',
      },
    ],
    intentTokens: ['körperpflege', 'waschen', 'duschen hilfe', 'pflege zuhause', 'pflegehilfe', 'morgenpflege', 'abendpflege'],
    relatedSlugs: ['behandlungspflege', 'hauswirtschaftliche-hilfe', 'verhinderungspflege', 'pflegeberatung'],
  },
  {
    slug: 'behandlungspflege',
    name: 'Behandlungspflege',
    title: 'Behandlungspflege',
    h1: 'Medizinische Behandlungspflege im Kreis Unna',
    metaTitleBase: 'Behandlungspflege',
    metaDescBase:
      'Medizinische Behandlungspflege auf Verordnung: Wund­versorgung, Injektionen, Medikamenten­gabe — durch examinierte Fachkräfte, Abrechnung mit Krankenkasse',
    icon: 'Stethoscope',
    legalBasis: ['§ 37 SGB V – Häusliche Krankenpflege', '§ 132a SGB V – Versorgungsverträge'],
    fundedBy: ['Gesetzliche Krankenversicherung (Verordnung Muster 12)', 'Private Krankenversicherung', 'Beihilfe'],
    short:
      'Verordnungsgebundene medizinische Pflege durch examinierte Fachkräfte: Wundversorgung, Medikamenten­gabe, Injektionen, Verbandswechsel — fachlich präzise, dokumentiert, ärztlich abgestimmt.',
    long:
      'Behandlungspflege wird vom Arzt auf Muster 12 verordnet und durch die gesetzliche Krankenversicherung getragen — nicht durch die Pflegekasse. Sie umfasst alle medizinischen Pflege­maßnahmen, die früher im Krankenhaus, heute in Ihrem Zuhause stattfinden. Bei IMPULS arbeiten ausschließlich examinierte Pflegefachkräfte mit aktuellen Pflichtfortbildungen — von chronischer Wundbehandlung über s.c.-Injektionen bis zur Stoma- und Katheter­pflege. Wir dokumentieren digital, halten engen Kontakt zur Praxis und versorgen 24/7 in akuten Situationen.',
    items: [
      'Wundversorgung und Verbandswechsel (chronische Wunden, Dekubitus)',
      'Subkutane Injektionen (z. B. Insulin, Heparin)',
      'Medikamentengabe und Stellen der Wochenboxen',
      'Blutdruck-, Blutzucker- und Vital­zeichen­messung',
      'Kompressionstherapie',
      'Kathetervorlagewechsel und Stomaversorgung',
      'PEG-Sonden- und Tracheostoma­pflege',
      'Anus-praeter-Versorgung',
    ],
    triggers: [
      'Krankenhaus­entlassung mit ärztlicher Verordnung',
      'Chronische Wunde (Dekubitus, Ulcus cruris)',
      'Diabetes mellitus mit Insulinpflicht',
      'Postoperative Versorgung',
    ],
    forRelatives: [
      'Ihre Hausärztin oder Ihr Hausarzt verordnet Behandlungspflege auf Muster 12 — keine eigenen Anträge nötig.',
      'Verordnung gilt zunächst meist 14 Tage, anschließend Folge­verordnung möglich.',
      'Eigenanteil 10 % der Kosten zzgl. 10 €/Verordnung, maximal Belastungs­grenze nach § 62 SGB V.',
    ],
    faqs: [
      {
        question: 'Wer zahlt die Behandlungspflege?',
        answer:
          'Die gesetzliche Krankenversicherung (nicht die Pflegekasse). Voraussetzung ist eine ärztliche Verordnung auf Muster 12. Eigenanteil: 10 % der Kosten zzgl. 10 € pro Verordnung, gedeckelt durch die persönliche Belastungsgrenze (§ 62 SGB V).',
      },
      {
        question: 'Übernehmt ihr auch Wundversorgung bei chronischen Wunden?',
        answer:
          'Ja. Wir verfügen über zertifizierte Wund­manager*innen (Wundexperten ICW®) und arbeiten nach aktuellen Expertenstandards des DNQP.',
      },
      {
        question: 'Wie schnell könnt ihr Insulin spritzen, wenn ich morgens essen will?',
        answer:
          'Wir planen Insulin­einsätze fest und pünktlich vor den Mahlzeiten ein. In der Regel mit ±15 Minuten Toleranzfenster — bei Diabetes Typ 1 oft enger getaktet.',
      },
    ],
    intentTokens: ['medikamentengabe', 'wundversorgung', 'insulin spritzen', 'verbandswechsel', 'krankenpflege', 'häusliche krankenpflege'],
    relatedSlugs: ['wundversorgung', 'medikamentengabe', 'pflege-nach-krankenhaus', 'grundpflege'],
  },
  {
    slug: 'demenzpflege',
    name: 'Demenzpflege',
    title: 'Demenzpflege & Betreuung',
    h1: 'Demenzpflege und Demenzbetreuung im Kreis Unna',
    metaTitleBase: 'Demenzpflege',
    metaDescBase:
      'Spezialisierte Demenzpflege bei Alzheimer & Demenz: validierende Begleitung, Betreuung nach § 45a SGB XI, Entlastung für Angehörige',
    icon: 'Brain',
    legalBasis: ['§ 45a SGB XI – Angebote zur Unterstützung im Alltag', '§ 45b SGB XI – Entlastungsbetrag'],
    fundedBy: ['Pflegekasse (Entlastungsbetrag 131 €/Monat)', 'Pflegesachleistung ab PG 2', 'Selbstzahler'],
    short:
      'Validierende, biografisch verankerte Begleitung von Menschen mit Alzheimer, vaskulärer Demenz oder Lewy-Body-Demenz — und gezielte Entlastung für Angehörige.',
    long:
      'Demenz ist nicht „mehr Pflege", sondern andere Pflege. Unsere Pflegekräfte arbeiten nach validierender Grundhaltung (Naomi Feil), berücksichtigen Biografie­daten und Tagesrhythmen und sorgen für eine ruhige, vorhersehbare Umgebung. Wir entlasten Angehörige durch verlässliche Stunden­blöcke, integrieren Beschäftigung über bekannte Lieder, alte Fotos oder vertraute Tätigkeiten und reagieren ruhig auf herausforderndes Verhalten. Finanzierung läuft über die Pflegesachleistung (PG 2+), den Entlastungs­betrag (131 €/Monat) sowie ggf. Verhinderungs- und Kurzzeitpflege.',
    items: [
      'Validierende Gesprächsführung und Tagesstrukturierung',
      'Beschäftigung nach Biografie (Musik, Erinnerungs­arbeit, alte Hobbys)',
      'Begleitung bei Spaziergängen und kleinen Ausflügen',
      'Verhinderungs­pflege als Vertretung pflegender Angehöriger',
      'Beratung Angehöriger zu Verhaltens­auffälligkeiten',
      'Koordination mit Tagespflege­einrichtungen',
      'Sicherheits­konzepte (Weglauf, Sturz, Orientierung)',
    ],
    triggers: [
      'Diagnose Alzheimer / vaskuläre Demenz / Lewy-Body',
      'Angehörige fühlen sich überfordert',
      'Tag-/Nachtumkehr',
      'Vergessen, Weglaufen, Verkennungen',
    ],
    forRelatives: [
      'Demenz ist eine Erkrankung des Gehirns — kein „Sich-Anstellen" und keine bewusste Provokation.',
      'Sie haben Anspruch auf Entlastungs­betrag 131 €/Monat (§ 45b SGB XI), der für unsere Betreuungs­einsätze verwendbar ist.',
      'Pflege­kurse für Angehörige nach § 45 SGB XI sind kostenfrei — wir verweisen gern auf passende Anbieter.',
    ],
    faqs: [
      {
        question: 'Was ist der Unterschied zwischen Demenzpflege und Grundpflege?',
        answer:
          'Grundpflege deckt körperliche Maßnahmen ab. Demenzpflege ergänzt um validierende Kommunikation, Tages­struktur und Beschäftigung — und um Sicherheit gegen Sturz oder Weglauf. Beides kann sich überschneiden.',
      },
      {
        question: 'Was kann ich mit dem Entlastungsbetrag von 131 €/Monat finanzieren?',
        answer:
          'Betreuungs- und Entlastungs­leistungen, z. B. stunden­weise Demenz­betreuung, Spaziergänge, Beschäftigung. Nicht ausgeschöpfte Beträge können im Folgejahr (bis 30. Juni) verbraucht werden.',
      },
      {
        question: 'Mein Angehöriger läuft nachts weg. Was tun?',
        answer:
          'Sofort einen Pflegegrad­antrag stellen oder höher­stufen. Wir beraten zu Sicherheits­technik (Bettsensor, Türalarm, GPS-Uhr) und stunden­weiser Nacht­betreuung über Verhinderungs­pflege.',
      },
    ],
    intentTokens: ['demenz', 'alzheimer', 'demenzbetreuung', 'demenz hilfe', 'pflege bei demenz', 'demenz tagesbetreuung'],
    relatedSlugs: ['verhinderungspflege', 'pflegeberatung', 'seniorenbetreuung'],
  },
  {
    slug: 'verhinderungspflege',
    name: 'Verhinderungspflege',
    title: 'Verhinderungspflege',
    h1: 'Verhinderungspflege im Kreis Unna — Entlastung für Angehörige',
    metaTitleBase: 'Verhinderungspflege',
    metaDescBase:
      'Verhinderungspflege nach § 39 SGB XI: bis 1.612 €/Jahr für die Vertretung pflegender Angehöriger — durch IMPULS unkompliziert organisiert',
    icon: 'HandHeart',
    legalBasis: ['§ 39 SGB XI – Häusliche Pflege bei Verhinderung der Pflegeperson'],
    fundedBy: ['Pflegekasse: bis 1.612 €/Jahr (übertragbar mit Kurzzeitpflege bis 2.418 €)'],
    short:
      'Wenn Sie als pflegender Angehöriger Urlaub, Krank­heits­tage oder Auszeiten brauchen, übernehmen wir — bis 1.612 € im Jahr finanziert die Pflegekasse.',
    long:
      'Verhinderungspflege ist eine der wichtigsten und leider unterschätztesten Leistungen der Pflege­versicherung. Pflegende Angehörige haben Anspruch ab Pflegegrad 2 und nach mindestens 6-monatiger Pflege­zeit. Mit bis zu 1.612 € pro Kalender­jahr (durch Übertragung von 50 % der Kurzzeit­pflege bis 2.418 €) können Sie sich Auszeit verschaffen — wir kümmern uns in dieser Zeit um Ihren Angehörigen, ohne dass Routinen leiden. Wir stellen Anträge auf Wunsch gemeinsam mit Ihnen aus.',
    items: [
      'Stundenweise Vertretung der Pflegeperson (z. B. ein Wochenende, ein Urlaub)',
      'Tageweise Übernahme der vollen Versorgung',
      'Komplette Übernahme bei Reha-Aufenthalt der Pflegeperson',
      'Hilfe bei der Antragstellung gegenüber der Pflegekasse',
      'Koordination mit Kurzzeit­pflege, falls stationäre Lösung nötig',
    ],
    triggers: [
      'Sie brauchen Urlaub oder Erholung',
      'Sie sind selbst krank',
      'Familien­feier, Termine, Auszeit',
      'Reha oder Krankenhaus­aufenthalt der Pflegeperson',
    ],
    forRelatives: [
      'Voraussetzung: mindestens 6 Monate vorherige häusliche Pflege durch die Pflege­person, mind. PG 2.',
      'Dauer max. 6 Wochen pro Kalenderjahr.',
      'Pflegegeld läuft während Verhinderungs­pflege zu 50 % weiter.',
    ],
    faqs: [
      {
        question: 'Wie viel Verhinderungspflege steht uns zu?',
        answer:
          'Bis 1.612 € pro Kalenderjahr direkt aus der Verhinderungs­pflege. Plus 50 % der Kurzzeitpflege (bis 806 € zusätzlich), insgesamt also bis 2.418 €. Voraussetzung: PG 2+ und mind. 6 Monate Vorpflege.',
      },
      {
        question: 'Können wir Verhinderungspflege auch stundenweise nutzen?',
        answer:
          'Ja. Bis zu 8 Stunden täglich gilt sie als „stundenweise" — das Pflegegeld wird dann nicht gekürzt. Über 8 Stunden gilt als „tageweise" mit anteiliger Kürzung des Pflegegelds.',
      },
      {
        question: 'Beantragt ihr das für uns?',
        answer:
          'Ja. Wir füllen den Antrag der Pflege­kasse mit Ihnen aus oder reichen ihn nachträglich für die geleistete Versorgung ein.',
      },
    ],
    intentTokens: ['urlaubsvertretung pflege', 'pflegeurlaub', 'verhinderungspflege beantragen', 'angehoerige urlaub', 'auszeit pflege'],
    relatedSlugs: ['pflegeberatung', 'demenzpflege', 'grundpflege'],
  },
  {
    slug: 'seniorenbetreuung',
    name: 'Seniorenbetreuung',
    title: 'Seniorenbetreuung & Alltagsbegleitung',
    h1: 'Seniorenbetreuung und Alltagsbegleitung im Kreis Unna',
    metaTitleBase: 'Seniorenbetreuung',
    metaDescBase:
      'Stundenweise Seniorenbetreuung: Spaziergänge, Gespräche, Begleitung zu Terminen, kreative Beschäftigung — abrechenbar über § 45b SGB XI',
    icon: 'Smile',
    legalBasis: ['§ 45b SGB XI – Entlastungsbetrag', '§ 45a SGB XI – Angebote zur Unterstützung im Alltag'],
    fundedBy: ['Entlastungsbetrag 131 €/Monat', 'Selbstzahler', 'Sachleistung ab PG 2'],
    short:
      'Stundenweise Begleitung im Alltag — vom Spaziergang über das Vorlesen bis zur Begleitung zum Hausarzt.',
    long:
      'Seniorenbetreuung füllt den Tag mit Bedeutung. Soziale Teilhabe, Bewegung und Gespräche sind nachweislich entscheidend für Lebens­qualität und kognitiven Erhalt. Wir kommen stundenweise, machen Spaziergänge, begleiten zu Arzt, Friseur oder zum Markt, lesen vor, erinnern an Tabletten — und entlasten so Familien, die berufstätig sind oder weiter weg wohnen.',
    items: [
      'Spaziergänge und Bewegung an der frischen Luft',
      'Gespräche, Vorlesen, gemeinsame Erinnerungen',
      'Begleitung zu Ärzten, Friseur, Behörden',
      'Gedächtnis­training, kreative Beschäftigung',
      'Begleitung beim Einkaufen oder Marktbesuch',
      'Telefon-/Brief­korrespondenz',
    ],
    triggers: [
      'Einsamkeit / Isolation',
      'Angehörige weit entfernt oder berufstätig',
      'Mobilitäts­einschränkungen',
      'Beginnende kognitive Veränderungen',
    ],
    forRelatives: [
      'Seniorenbetreuung ist über den Entlastungs­betrag (131 €/Monat) abrechen­bar — auch bei Pflegegrad 1.',
      'Sinnvoll auch ohne Pflegegrad als selbst­finanzierte Leistung.',
    ],
    faqs: [
      {
        question: 'Brauche ich einen Pflegegrad für Seniorenbetreuung?',
        answer:
          'Nein. Aber mit Pflegegrad 1+ können Sie 131 €/Monat aus dem Entlastungs­betrag dafür einsetzen.',
      },
      {
        question: 'Wie lange dauern eure Betreuungs­einsätze?',
        answer:
          'Üblich sind 1–4 Stunden pro Termin, je nach Bedarf. Wir planen feste Wochen­termine, damit Routinen entstehen.',
      },
    ],
    intentTokens: ['alltagsbegleitung', 'spaziergang senioren', 'einkaufshilfe senioren', 'gesellschaft senioren', 'seniorenbetreuung stundenweise'],
    relatedSlugs: ['demenzpflege', 'hauswirtschaftliche-hilfe', 'verhinderungspflege'],
  },
  {
    slug: 'pflegeberatung',
    name: 'Pflegeberatung',
    title: 'Pflegeberatung nach § 37.3 SGB XI',
    h1: 'Pflegeberatung im Kreis Unna — kostenlos für Pflegegeld­bezieher',
    metaTitleBase: 'Pflegeberatung',
    metaDescBase:
      'Pflichtberatung § 37.3 SGB XI bei Pflegegeld­bezug — kostenfrei, neutral, dokumentiert. Wir beraten zu Pflegegrad, Anträgen, Leistungen, Hilfsmitteln',
    icon: 'MessageCircle',
    legalBasis: ['§ 37 Abs. 3 SGB XI – Pflichtberatung', '§ 7a SGB XI – Pflegeberatung'],
    fundedBy: ['Pflegekasse (verpflichtende Beratung kostenfrei)'],
    short:
      'Wir beraten zu Pflegegrad, Antrag, Hilfsmitteln, Leistungen — kostenlos im Rahmen der Pflichtberatung nach § 37.3 SGB XI.',
    long:
      'Pflegegeld­bezieher sind verpflichtet, regelmäßig (PG 2+3 halbjährlich, PG 4+5 vierteljährlich) eine Beratung wahrzunehmen — sonst droht Leistungs­kürzung. Wir machen das nicht als Pflicht­abhakung, sondern nutzen den Termin für echte Klärung: Pflege­situation, Hilfsmittel, Antrags­optimierung, Höher­stufung, Wohnraum­anpassung. Auch ohne Pflegegeld­bezug beraten wir kostenfrei zum Erstkontakt.',
    items: [
      'Pflichtberatung nach § 37.3 SGB XI mit Dokumentation',
      'Pflegegrad­einschätzung vor MD-Begutachtung',
      'Hilfe bei Pflegegrad­antrag und Widerspruch',
      'Beratung zu Hilfsmitteln & Wohnraum­anpassung (bis 4.180 €)',
      'Beratung zu Verhinderungs- und Kurzzeit­pflege',
      'Information zu Entlastungs­leistungen, Pflege­kursen, Tagespflege',
    ],
    triggers: [
      'Erstmaliger Pflegefall',
      'Verschlechterung der Pflege­situation',
      'Unsicherheit zu Leistungen',
      'Widerspruch nach MD-Begutachtung',
    ],
    forRelatives: [
      'Sie sind als Angehörige expliziter Beratungs­partner — wir nehmen uns Zeit für Ihre Fragen.',
      'Beratungsschein erhält die Pflege­kasse direkt von uns, kein Papier­krieg für Sie.',
    ],
    faqs: [
      {
        question: 'Wann muss ich eine Beratung nach § 37.3 SGB XI machen?',
        answer:
          'Bei Pflegegrad 2 und 3 alle 6 Monate, bei Pflegegrad 4 und 5 alle 3 Monate, sofern Sie Pflegegeld beziehen. Versäumte Beratungen können das Pflegegeld kürzen.',
      },
      {
        question: 'Was kostet eine Pflegeberatung?',
        answer:
          'Die Pflichtberatung ist für Sie kostenfrei — die Pflegekasse zahlt direkt an uns. Auch das freiwillige Erstgespräch berechnen wir nicht.',
      },
      {
        question: 'Helft ihr beim Pflegegrad­antrag?',
        answer:
          'Ja. Wir bereiten auf die MD-Begutachtung vor, helfen beim Erfassen von Pflege­zeiten und unterstützen bei Widersprüchen.',
      },
    ],
    intentTokens: ['pflegegrad beantragen', 'pflegeberatung', 'pflegegrad höherstufen', 'widerspruch pflegegrad', 'beratungseinsatz'],
    relatedSlugs: ['grundpflege', 'verhinderungspflege', 'demenzpflege'],
  },
  {
    slug: 'wundversorgung',
    name: 'Wundversorgung',
    title: 'Professionelle Wundversorgung',
    h1: 'Wundversorgung zuhause im Kreis Unna',
    metaTitleBase: 'Wundversorgung',
    metaDescBase:
      'Wundversorgung & Verbandswechsel zuhause: chronische Wunden, Dekubitus, Ulcus cruris — durch zertifizierte Wundexpert*innen ICW®',
    icon: 'Bandage',
    legalBasis: ['§ 37 SGB V – Häusliche Krankenpflege'],
    fundedBy: ['Gesetzliche Krankenversicherung (Verordnung Muster 12)', 'Private KV', 'Beihilfe'],
    short:
      'Moderne Wundversorgung nach Expertenstandard — bei chronischen Wunden, Dekubitus, Ulcus cruris venosum, diabetischem Fußsyndrom, postoperativ.',
    long:
      'Eine schlecht versorgte Wunde wird chronisch — und das bedeutet oft jahrelang Schmerzen. Wir arbeiten nach dem aktuellen Expertenstandard des DNQP, dokumentieren digital mit Fotostatus, stimmen den Wundplan eng mit Hausärzten und Wundambulanzen ab und nutzen moderne Wundauflagen (hydroaktiv, antimikrobiell, NPWT). Verordnung erfolgt durch die Hausärztin oder den Hausarzt auf Muster 12 — Krankenkasse trägt 90 % der Kosten.',
    items: [
      'Wundbeurteilung nach Expertenstandard DNQP',
      'Verbandswechsel (hydroaktive Auflagen, Vakuumtherapie)',
      'Versorgung Dekubitus, Ulcus cruris venosum/arteriosum, diabetisches Fußsyndrom',
      'Postoperative Wundpflege',
      'Fotodokumentation und Verlaufs­bewertung',
      'Abstimmung mit Wundambulanz / Diabetolog*in',
    ],
    triggers: [
      'Chronische Wunde > 8 Wochen',
      'Dekubitus ab Grad I',
      'Diabetisches Fußsyndrom',
      'Postoperative Wundheilungs­störungen',
    ],
    forRelatives: [
      'Eine Wunde, die sich nach 4 Wochen nicht bessert, gehört in fachliche Versorgung.',
      'Schmerzmedikation und Wundverband müssen aufeinander abgestimmt sein.',
    ],
    faqs: [
      {
        question: 'Wie kommt die Wundversorgung zustande?',
        answer:
          'Ihre Hausärztin oder Ihr Hausarzt stellt eine Verordnung auf Muster 12 aus, wir starten meist binnen 24 Stunden mit der ersten Versorgung.',
      },
      {
        question: 'Sind eure Pflegekräfte besonders qualifiziert?',
        answer:
          'Ja, wir haben zertifizierte Wundexpert*innen ICW®/TÜV im Team und nehmen regelmäßig an Pflicht­fortbildungen nach DNQP-Standard teil.',
      },
    ],
    intentTokens: ['wundversorgung zuhause', 'verbandswechsel', 'dekubitus pflege', 'ulcus cruris', 'wundmanagement'],
    relatedSlugs: ['behandlungspflege', 'pflege-nach-krankenhaus'],
  },
  {
    slug: 'medikamentengabe',
    name: 'Medikamentengabe',
    title: 'Medikamentengabe & Stellen',
    h1: 'Medikamentengabe zuhause im Kreis Unna',
    metaTitleBase: 'Medikamentengabe',
    metaDescBase:
      'Sichere Medikamenten­gabe und Wochenboxen­stellen durch examinierte Pflegekräfte — auf ärztliche Verordnung, abgerechnet mit der Krankenkasse',
    icon: 'Pill',
    legalBasis: ['§ 37 SGB V – Häusliche Krankenpflege'],
    fundedBy: ['Gesetzliche Krankenversicherung (Verordnung Muster 12)'],
    short:
      'Pünktliche und sichere Medikamenten­gabe — vom Stellen der Wochenbox bis zur Insulin­injektion, lückenlos dokumentiert.',
    long:
      'Falsche Dosierung, vergessene Tabletten oder Wechselwirkungen sind in der häuslichen Pflege ein häufiges Problem. Wir stellen die Wochen­dispenser nach aktuellem Medikamenten­plan, kontrollieren die Einnahme, dokumentieren und melden zurück, wenn etwas auffällt. Bei Insulinpflicht arbeiten wir nach festen Zeit­fenstern in Abstimmung mit Diabetolog*in oder Hausarzt.',
    items: [
      'Stellen der Wochen­dispenser (auch 4×/Tag)',
      'Verabreichung oraler Medikamente',
      'Subkutane Insulin- oder Heparin­injektionen',
      'Augen-/Ohrentropfen, Inhalationen',
      'Kontrolle und Dokumentation der Einnahme',
      'Abstimmung mit Apotheke und Hausärztin',
    ],
    triggers: [
      'Diabetes mellitus mit Insulin',
      'Polypharmazie (>5 Medikamente)',
      'Demenz mit Vergessen der Einnahme',
      'Postoperative Schmerz­medikation',
    ],
    forRelatives: [
      'Eine ärztliche Verordnung (Muster 12) ist Voraussetzung.',
      'Der Arzt kann Stellen der Wochen­box als eigenständige Leistung verordnen.',
    ],
    faqs: [
      {
        question: 'Stellt ihr auch nur die Wochenboxen, ohne dass ihr selbst gebt?',
        answer:
          'Ja. „Stellen" und „Verabreichen" sind getrennte Leistungen — die Hausärztin verordnet, was passt. Bei kognitiv eingeschränkten Patient*innen ist „Verabreichen" sinnvoller.',
      },
      {
        question: 'Bekommt ihr die Medikamente von der Apotheke?',
        answer:
          'Wir koordinieren mit der von Ihnen gewählten Apotheke — viele bieten kosten­freien Botendienst.',
      },
    ],
    intentTokens: ['tabletten geben', 'insulin spritzen pflegedienst', 'wochenbox stellen', 'medikamente kontrolle'],
    relatedSlugs: ['behandlungspflege', 'wundversorgung', 'grundpflege'],
  },
  {
    slug: 'pflege-nach-krankenhaus',
    name: 'Pflege nach Krankenhaus',
    title: 'Pflege nach Krankenhaus­entlassung',
    h1: 'Pflege nach Krankenhaus­entlassung im Kreis Unna',
    metaTitleBase: 'Pflege nach Krankenhaus',
    metaDescBase:
      'Nahtlose Übernahme nach Krankenhaus­entlassung: häusliche Krankenpflege, Wundversorgung, Mobilisation — wir starten am Entlasstag',
    icon: 'ShieldCheck',
    legalBasis: ['§ 37 Abs. 1a SGB V – Übergangs­pflege', '§ 39c SGB V – Kurzzeit­pflege bei fehlender Pflegebedürftigkeit'],
    fundedBy: ['Gesetzliche Krankenversicherung', 'Gesetzliche Pflegeversicherung'],
    short:
      'Wir übernehmen direkt am Entlasstag — Wund­versorgung, Mobilisation, Medikamenten­gabe, alles nahtlos zur Klinik.',
    long:
      'Die ersten Tage nach einer Klinikent­lassung entscheiden über Genesung oder Drehtür­effekt. Wir stimmen mit dem Sozialdienst der Klinik ab, übernehmen Verbandswechsel, Wund­versorgung, Mobilisations­plan und Medikamenten­gabe. Falls noch kein Pflegegrad besteht, klären wir Übergangs­pflege nach § 39c SGB V (bis zu 8 Wochen) oder häusliche Krankenpflege nach § 37 SGB V — Sie verlieren keinen Tag.',
    items: [
      'Direkte Übernahme am Entlasstag oder Folgetag',
      'Abstimmung mit dem Sozialdienst der Klinik',
      'Wundversorgung und Verbandswechsel',
      'Mobilisations­plan nach Reha-Empfehlung',
      'Medikamenten­plan und -gabe',
      'Antrag auf Pflegegrad parallel begleitet',
    ],
    triggers: [
      'Geplanter Klinik­entlasstag',
      'Postoperative Versorgung',
      'Sturz- oder Schlaganfall­folge',
      'Kein Pflegegrad, aber Hilfe­bedarf',
    ],
    forRelatives: [
      'Melden Sie sich beim Sozialdienst der Klinik mindestens 3 Tage vor Entlassung — das spart Hektik.',
      'Auch ohne Pflegegrad gibt es Übergangs­leistungen (§ 39c SGB V, bis zu 8 Wochen).',
    ],
    faqs: [
      {
        question: 'Wie schnell könnt ihr nach der Entlassung starten?',
        answer:
          'In der Regel am Entlass­tag. Voraussetzung ist, dass der Sozial­dienst der Klinik uns rechtzeitig kontaktiert oder Sie einen Tag im Voraus anrufen.',
      },
      {
        question: 'Was, wenn noch kein Pflegegrad da ist?',
        answer:
          'Dann läuft die Versorgung über häusliche Krankenpflege (§ 37 SGB V, ärztliche Verordnung) und/oder Übergangs­pflege (§ 39c SGB V, bis 8 Wochen ohne Pflegegrad). Pflege­grad­antrag stellen wir parallel.',
      },
    ],
    intentTokens: ['pflege nach op', 'pflege nach krankenhaus', 'pflege nach entlassung', 'übergangspflege', 'reha pflege'],
    relatedSlugs: ['behandlungspflege', 'wundversorgung', 'pflegeberatung'],
  },
  {
    slug: 'hauswirtschaftliche-hilfe',
    name: 'Hauswirtschaftliche Hilfe',
    title: 'Hauswirtschaftliche Hilfe',
    h1: 'Hauswirtschaftliche Hilfe im Kreis Unna',
    metaTitleBase: 'Hauswirtschaftliche Hilfe',
    metaDescBase:
      'Hauswirtschaftliche Hilfe zuhause: Reinigung, Einkauf, Wäsche, Kochen — abrechenbar über Pflegesachleistung oder Entlastungsbetrag',
    icon: 'Home',
    legalBasis: ['§ 36 SGB XI – Pflegesachleistung', '§ 45b SGB XI – Entlastungsbetrag'],
    fundedBy: ['Pflegesachleistung (PG 2+)', 'Entlastungsbetrag (131 €/Monat ab PG 1)', 'Selbstzahler'],
    short:
      'Reinigung, Einkauf, Wäsche, Mahlzeiten — wir halten den Alltag in Bewegung, damit Sie zuhause bleiben können.',
    long:
      'Eine saubere Wohnung, frische Wäsche und etwas Warmes auf dem Tisch sind keine Lifestyle-Themen, sondern Voraussetzung für Würde und Sicherheit zuhause. Wir übernehmen, was Sie nicht mehr leisten können — diskret, zuverlässig, ohne dass es sich nach „Personal" anfühlt. Abrechenbar über Pflegesach­leistung (ab PG 2) oder Entlastungs­betrag (131 €/Monat, ab PG 1).',
    items: [
      'Reinigung der Wohnung (Bad, Küche, Wohnräume)',
      'Wäsche waschen, bügeln, einräumen',
      'Einkäufe und Botengänge',
      'Mahlzeiten zubereiten oder Essen auf Rädern koordinieren',
      'Müll, Lüften, Heizen, kleine Ordnung',
    ],
    triggers: [
      'Eingeschränkte Mobilität',
      'Pflegegrad mit Anspruch auf Sachleistung',
      'Angehörige berufstätig oder weit entfernt',
    ],
    forRelatives: [
      'Hauswirtschaftliche Hilfe zählt voll als Pflege­sachleistung — Sie verbrauchen damit Ihren PG-Topf, nicht zusätzlich Geld.',
      'Mit Entlastungs­betrag (131 €/Monat) können Sie auch ohne Sachleistungs­anspruch Hilfe finanzieren.',
    ],
    faqs: [
      {
        question: 'Zählt das als Pflege oder ist das nur Putzen?',
        answer:
          'Es ist Teil der Pflege, wenn es Pflege­bedürftigkeit ausgleicht. Die Pflegekasse erkennt es ausdrücklich an.',
      },
      {
        question: 'Was, wenn ich nur Hauswirtschaft brauche, keine Körperpflege?',
        answer:
          'Sehr verbreitet. Wir bieten reine Hauswirtschafts-Pakete an, abgerechnet über Sach­leistung oder Entlastungs­betrag.',
      },
    ],
    intentTokens: ['putzhilfe senioren', 'einkaufshilfe', 'wäsche service', 'haushaltshilfe pflege', 'mahlzeiten zuhause'],
    relatedSlugs: ['grundpflege', 'seniorenbetreuung'],
  },
]

export const SERVICE_BY_SLUG = new Map(SERVICES.map((s) => [s.slug, s]))

export function getService(slug: string): PflegeService | undefined {
  return SERVICE_BY_SLUG.get(slug)
}
