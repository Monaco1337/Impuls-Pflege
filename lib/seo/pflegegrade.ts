/**
 * Pflegegrade 1–5 als SEO-Entitäten + Zusatzthemen (Antrag, MD, Widerspruch).
 *
 * Beträge auf Stand 2025 (PSG-Reform). Wenn ein Wert geändert wird, MUSS
 * geprüft werden, dass auch Service-FAQs in `lib/seo/services.ts` mitgeführt
 * werden.
 */

export interface PflegegradEntry {
  slug: string
  /** „Pflegegrad 1" / „Pflegegrad-Antrag" / „MD-Begutachtung". */
  title: string
  /** Subtitle für H1. */
  subtitle: string
  /** Punkte-Bandbreite NBA (nur für PG 1–5). */
  points?: string
  /** Beschreibung des Pflegegrad-Profils. */
  profile: string
  /** Geldleistungen Stand 2025. */
  benefits?: {
    pflegegeld?: string
    pflegesachleistung?: string
    entlastungsbetrag?: string
    verhinderungspflege?: string
    kurzzeitpflege?: string
    tagespflege?: string
    wohnumfeld?: string
    pflegehilfsmittel?: string
  }
  /** Was leistet IMPULS bei diesem Pflegegrad konkret? */
  whatWeDo: string[]
  faqs: { question: string; answer: string }[]
}

export const PFLEGEGRADE: PflegegradEntry[] = [
  {
    slug: '1',
    title: 'Pflegegrad 1',
    subtitle: 'Geringe Beeinträchtigung der Selbstständigkeit',
    points: '12,5 – 27 NBA-Punkte',
    profile:
      'Pflegegrad 1 bedeutet eine geringe Beeinträchtigung der Selbstständigkeit. Häufig betroffen: leichte Mobilitäts­einschränkungen, beginnende Demenz, chronische Erkrankungen mit punktuellem Hilfebedarf. Anspruch auf Pflegegeld besteht nicht, dafür stehen 131 €/Monat Entlastungs­betrag und Pflegehilfsmittel zur Verfügung.',
    benefits: {
      entlastungsbetrag: '131 € / Monat',
      wohnumfeld: 'bis 4.180 € Zuschuss (einmalig pro Maßnahme)',
      pflegehilfsmittel: '42 € / Monat (Verbrauchs­hilfsmittel)',
    },
    whatWeDo: [
      'Beratung zu Hilfsmitteln und Wohnraum­anpassung',
      'Stundenweise Entlastungs­leistungen über § 45b SGB XI',
      'Begleitung zu Arzt- und Therapie­terminen',
      'Vorbereitung auf Höher­stufung, falls Pflege­bedarf steigt',
    ],
    faqs: [
      {
        question: 'Bekomme ich mit Pflegegrad 1 Pflegegeld?',
        answer:
          'Nein. Pflegegeld gibt es erst ab Pflegegrad 2. PG 1 erhält 131 €/Monat Entlastungs­betrag, der für anerkannte Anbieter (auch IMPULS) verwendbar ist.',
      },
      {
        question: 'Lohnt sich der Pflegegrad-Antrag bei nur leichten Einschränkungen?',
        answer:
          'Ja — schon allein wegen 4.180 € Wohnraum­anpassung (Treppenlift, ebenerdige Dusche), Pflegehilfsmitteln und der Tür-zur-Tür-Beratung. Plus: Bei Verschlechterung können Sie schneller höher gestuft werden.',
      },
    ],
  },
  {
    slug: '2',
    title: 'Pflegegrad 2',
    subtitle: 'Erhebliche Beeinträchtigung der Selbstständigkeit',
    points: '27 – 47,5 NBA-Punkte',
    profile:
      'Pflegegrad 2 ist die häufigste Einstufung. Typisch: Hilfe bei Körperpflege oder Mobilität nötig, beginnende Demenz, deutliche Einschränkung im Alltag. Hier beginnt Pflegegeld und Pflege­sachleistungs­anspruch.',
    benefits: {
      pflegegeld: '347 € / Monat',
      pflegesachleistung: '796 € / Monat',
      entlastungsbetrag: '131 € / Monat',
      verhinderungspflege: 'bis 1.612 € / Jahr (zzgl. Übertragung Kurzzeitpflege)',
      kurzzeitpflege: 'bis 1.774 € / Jahr',
      tagespflege: '721 € / Monat (zusätzlich zu PSL)',
      wohnumfeld: 'bis 4.180 €',
      pflegehilfsmittel: '42 € / Monat',
    },
    whatWeDo: [
      'Grundpflege als Sachleistung (bis 796 €/Monat)',
      'Behandlungspflege auf ärztliche Verordnung (separat über Krankenkasse)',
      'Pflichtberatung nach § 37.3 SGB XI alle 6 Monate',
      'Verhinderungspflege bei Auszeit pflegender Angehöriger',
      'Hauswirtschaft und Betreuung über Entlastungs­betrag',
    ],
    faqs: [
      {
        question: 'Kann ich Pflegegeld und Sachleistung gleichzeitig nutzen?',
        answer:
          'Ja, das nennt sich Kombinations­leistung (§ 38 SGB XI). Wenn Sie z. B. 50 % der Sachleistungen bei IMPULS in Anspruch nehmen, erhalten Sie 50 % des Pflegegelds zusätzlich.',
      },
    ],
  },
  {
    slug: '3',
    title: 'Pflegegrad 3',
    subtitle: 'Schwere Beeinträchtigung der Selbstständigkeit',
    points: '47,5 – 70 NBA-Punkte',
    profile:
      'Pflegegrad 3 bedeutet einen deutlich erhöhten Pflegeaufwand: erhebliche Hilfe bei Körperpflege, Mobilität, oft kognitive Einschränkungen. Pflege durch eine Person allein wird häufig zur Belastung — wir entlasten gezielt.',
    benefits: {
      pflegegeld: '599 € / Monat',
      pflegesachleistung: '1.497 € / Monat',
      entlastungsbetrag: '131 € / Monat',
      verhinderungspflege: 'bis 1.612 € / Jahr',
      kurzzeitpflege: 'bis 1.774 € / Jahr',
      tagespflege: '1.357 € / Monat',
      wohnumfeld: 'bis 4.180 €',
      pflegehilfsmittel: '42 € / Monat',
    },
    whatWeDo: [
      'Mehrfache tägliche Einsätze möglich (Morgen-/Abend­pflege)',
      'Strukturierte Tour mit festen Bezugs­pflegekräften',
      'Eng verzahnte Behandlungs- und Grundpflege',
      'Aktive Begleitung in Richtung Pflege­grad 4, falls Bedarf steigt',
    ],
    faqs: [
      {
        question: 'Reicht Pflegegrad 3 für 2 Einsätze pro Tag?',
        answer:
          'Meistens ja — 1.497 €/Monat decken bei NRW-Vergütung typischerweise 2 Pflege­einsätze pro Tag plus Hauswirtschaft. Der genaue Umfang hängt vom Maßnahmen­plan ab.',
      },
    ],
  },
  {
    slug: '4',
    title: 'Pflegegrad 4',
    subtitle: 'Schwerste Beeinträchtigung der Selbstständigkeit',
    points: '70 – 90 NBA-Punkte',
    profile:
      'Pflegegrad 4 markiert eine schwerste Beeinträchtigung. Mehrere Pflege­einsätze pro Tag sind regelmäßig nötig, oft kombiniert mit Behandlungs­pflege. Pflege durch Angehörige ohne professionelle Entlastung wird hier kaum zumutbar.',
    benefits: {
      pflegegeld: '800 € / Monat',
      pflegesachleistung: '1.859 € / Monat',
      entlastungsbetrag: '131 € / Monat',
      verhinderungspflege: 'bis 1.612 € / Jahr',
      kurzzeitpflege: 'bis 1.774 € / Jahr',
      tagespflege: '1.685 € / Monat',
      wohnumfeld: 'bis 4.180 €',
      pflegehilfsmittel: '42 € / Monat',
    },
    whatWeDo: [
      'Mehrfache tägliche Einsätze, ggf. 24/7-Koordination',
      'Komplexe Behandlungspflege (Wundmanagement, PEG, Stoma)',
      'Pflichtberatung alle 3 Monate',
      'Intensive Einbindung der Angehörigen',
    ],
    faqs: [
      {
        question: 'Können wir bei Pflegegrad 4 zuhause bleiben oder müssen wir ins Heim?',
        answer:
          'Mit guter Tagesstruktur, Kombination aus Pflegedienst und Tagespflege, Hilfsmitteln und Wohnraum­anpassung ist Pflege zuhause meist möglich. Wir beraten ehrlich, wann eine Heim­alternative sinnvoll wird.',
      },
    ],
  },
  {
    slug: '5',
    title: 'Pflegegrad 5',
    subtitle: 'Schwerste Beeinträchtigung mit besonderen Anforderungen',
    points: 'ab 90 NBA-Punkte',
    profile:
      'Pflegegrad 5 ist die höchste Stufe. Häufig: bettlägerige Patient*innen, Schwerstpflege­bedürftige, kombinierte Versorgungen. Hier ist eine engmaschige Pflege­planung mit medizinischer Behandlungs­pflege Standard.',
    benefits: {
      pflegegeld: '990 € / Monat',
      pflegesachleistung: '2.299 € / Monat',
      entlastungsbetrag: '131 € / Monat',
      verhinderungspflege: 'bis 1.612 € / Jahr',
      kurzzeitpflege: 'bis 1.774 € / Jahr',
      tagespflege: '2.085 € / Monat',
      wohnumfeld: 'bis 4.180 €',
      pflegehilfsmittel: '42 € / Monat',
    },
    whatWeDo: [
      'Komplexe Pflegeplanung, mehrere Einsätze pro Tag',
      'Wund-, PEG-, Tracheostoma-, Stoma-Management',
      'Begleitung bei Palliativsituationen (in Kooperation mit SAPV)',
      'Engste Abstimmung mit Familie, Hausarzt, Pflegekasse',
    ],
    faqs: [
      {
        question: 'Lässt sich Pflegegrad 5 zuhause überhaupt leisten?',
        answer:
          'Ja, oft. Mit voller Pflege­sachleistung, Behandlungs­pflege über Krankenkasse, 24-Stunden-Betreuungs­konzepten und Verhinderungs­pflege ist auch PG 5 zuhause realisierbar — vorausgesetzt, die Familie akzeptiert die nötige Strukturierung.',
      },
    ],
  },
  {
    slug: 'antrag',
    title: 'Pflegegrad beantragen',
    subtitle: 'So stellen Sie den Antrag richtig',
    profile:
      'Der Pflegegrad­antrag ist formfrei — ein Anruf bei der Pflegekasse reicht. Aber: Die MD-Begutachtung (Medizinischer Dienst) entscheidet, welcher Pflegegrad herauskommt. Eine gute Vorbereitung mit Pflegetagebuch und realistischer Selbst­einschätzung der Selbstständigkeit ist Gold wert. Wir bereiten Sie vor und sind beim MD-Termin auf Wunsch dabei.',
    whatWeDo: [
      'Telefonisches Beratungs­gespräch zur Klärung der Ausgangslage',
      'Hilfe beim Ausfüllen des Pflege­tagebuchs',
      'Vorbereitungs­termin vor MD-Begutachtung (kostenlos)',
      'Begleitung zum MD-Termin auf Wunsch',
      'Hilfe bei Widerspruch, falls Einstufung zu niedrig',
    ],
    faqs: [
      {
        question: 'Wie lange dauert ein Pflegegrad-Antrag?',
        answer:
          'In der Regel 5 Wochen. Bei Eilbedürftigkeit (akute Krankenhaus­entlassung) kann die Begutachtung beschleunigt werden. Leistungen werden rückwirkend ab Antrags­tag gewährt.',
      },
      {
        question: 'Wer kann den Antrag stellen?',
        answer:
          'Die pflegebedürftige Person selbst oder mit Vollmacht ein Angehöriger. Anruf bei der Pflegekasse genügt. Eine Vollmacht stellen wir auf Wunsch zur Verfügung.',
      },
      {
        question: 'Was passiert beim MD-Termin?',
        answer:
          'Eine Pflegefachkraft des Medizinischen Dienstes besucht Sie zuhause (60–90 Min.), prüft 6 Module der Selbstständigkeit und erstellt ein Gutachten. Sie sollten realistisch beschreiben, wie der Alltag an einem schlechten Tag aussieht — nicht den besten.',
      },
    ],
  },
  {
    slug: 'md-begutachtung',
    title: 'MD-Begutachtung',
    subtitle: 'So bereiten Sie sich auf den Medizinischen Dienst vor',
    profile:
      'Der Medizinische Dienst (MD, früher MDK) prüft Ihre Pflege­bedürftigkeit anhand des Neuen Begutachtungs­assessments (NBA) in 6 Modulen: Mobilität, kognitive/kommunikative Fähigkeiten, Verhaltens­weisen, Selbst­versorgung, Krankheits­bewältigung, Alltagsleben. Punkte werden gewichtet, daraus ergibt sich der Pflegegrad.',
    whatWeDo: [
      'Pflegetagebuch mit Ihnen führen',
      'Selbstständigkeit ehrlich einschätzen lernen',
      'Sammlung relevanter Befunde (Arztbriefe, Reha-Berichte, Medikamenten­plan)',
      'Auf Wunsch Anwesenheit beim Termin',
    ],
    faqs: [
      {
        question: 'Was sollte ich beim MD-Termin nicht tun?',
        answer:
          'Nicht „tapfer" sein. Beschreiben Sie ehrlich, was Sie nicht mehr können — auch wenn es Überwindung kostet. Stolz kostet hier Pflegegrade.',
      },
    ],
  },
  {
    slug: 'widerspruch',
    title: 'Widerspruch gegen Pflegegrad',
    subtitle: 'Wenn die Einstufung zu niedrig ist',
    profile:
      'Etwa jeder dritte Pflegegrad­bescheid ist nach Erfahrungs­werten zu niedrig. Sie haben einen Monat Zeit, schriftlich Widerspruch einzulegen. Wir helfen, das Gutachten zu lesen, Schwach­stellen zu identifizieren und gezielt zu argumentieren.',
    whatWeDo: [
      'Lesen und Interpretieren des MD-Gutachtens',
      'Identifikation übersehener Pflege­bedarfe',
      'Formulierung des Widerspruchs',
      'Begleitung bei Folge-Begutachtung',
    ],
    faqs: [
      {
        question: 'Was kostet ein Widerspruch?',
        answer:
          'Nichts. Der Widerspruch gegen den Pflegekassen-Bescheid ist kostenfrei. Wir berechnen für unsere Hilfe ebenfalls keine Gebühr — das ist Teil unseres Beratungs­auftrags.',
      },
    ],
  },
]

export const PFLEGEGRAD_BY_SLUG = new Map(PFLEGEGRADE.map((p) => [p.slug, p]))
