/**
 * Angehörigen-Hub: Ratgeber-Inhalte mit echtem Praxis-Mehrwert.
 *
 * Jeder Ratgeber zielt auf konkrete Suchintentionen pflegender Angehöriger
 * ("Was tun bei Pflegefall?", "Pflegekosten") und enthält Listen, Beträge,
 * Schritt-für-Schritt-Anleitungen — keine SEO-Floskeln.
 */

export interface RatgeberArticle {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  /** Kurzes Intro für Hero. */
  intro: string
  /** Aktualisierungsdatum (ISO). */
  updatedAt: string
  /** Sektionen mit Heading + Inhalt (Markdown-light). */
  sections: { heading: string; body: string; bullets?: string[] }[]
  faqs: { question: string; answer: string }[]
  /** Welche Money Pages werden im Artikel referenziert? */
  links: { href: string; label: string }[]
}

export const RATGEBER: RatgeberArticle[] = [
  {
    slug: 'pflege-fuer-angehoerige',
    title: 'Pflege für Angehörige: Wenn die Eltern Hilfe brauchen',
    metaTitle: 'Pflege für Angehörige – die wichtigsten ersten Schritte',
    metaDescription:
      'Wenn Vater oder Mutter plötzlich Pflege brauchen: erste Schritte, Pflegegrad-Antrag, Leistungen, Entlastung — verständlich und konkret.',
    intro:
      'Wenn Eltern, Partner oder Geschwister plötzlich Pflege brauchen, fehlt Familien meist genau eines: Zeit zum Sortieren. Diese Seite ist für die ersten 14 Tage gedacht — alles, was wirklich wichtig ist, in der Reihenfolge, in der es passiert.',
    updatedAt: '2026-04-01',
    sections: [
      {
        heading: '1. Erste 24 Stunden — Sicherheit vor Bürokratie',
        body: 'Bevor Sie über Pflegegrade nachdenken, klären Sie das Akute: Sturzgefahr, Medikamenten­einnahme, Versorgung mit warmen Mahlzeiten, Erreichbarkeit per Telefon. Holen Sie ggf. den Hausarzt für eine Krisen­einschätzung.',
        bullets: [
          'Hausnotruf-Knopf installieren oder Familie als Tagesanruf etablieren',
          'Stolperfallen entfernen (Teppichkante, Kabel)',
          'Medikamenten­plan auf den Tisch legen — wer kontrolliert die Einnahme?',
          'Lebensmittel und Getränke griffbereit',
        ],
      },
      {
        heading: '2. Pflegegrad-Antrag stellen — heute',
        body: 'Der Antrag ist formlos: Ein Anruf bei der Pflegekasse genügt. Das Datum des Anrufs ist das Antragsdatum — Leistungen werden rückwirkend gewährt. Verschieben Sie das nicht. Auch bei nur leichter Pflegebedürftigkeit lohnt der Antrag (Wohnraum-Anpassung, Pflegehilfsmittel, Beratung).',
        bullets: [
          'Pflegekasse anrufen (Krankenkasse = Pflegekasse)',
          'Antragsnummer notieren',
          'Pflegetagebuch beginnen (Formular der DAK / AOK / TK kostenfrei)',
          'Termin mit dem Medizinischen Dienst (MD) abwarten — kommt in 5 Wochen',
        ],
      },
      {
        heading: '3. Versorgung organisieren — Pflegedienst, Tagespflege, Angehörigen-Pflege',
        body: 'Sie haben drei Hebel: ambulanter Pflegedienst (wir), Tagespflege­einrichtung, Pflege durch Sie selbst. Die Kombi ist meist die beste Lösung. Wir beraten ergebnis­offen — auch wenn am Ende eine Tagespflege oder ein Heim die richtige Wahl ist.',
      },
      {
        heading: '4. Entlastung für Sie als Angehörige*n — bevor Sie selbst krank werden',
        body: 'Pflegende Angehörige sind Deutschlands größter „Pflegedienst". 4,7 Millionen Menschen pflegen zuhause — und die Zahlen zur Erschöpfung sind alarmierend. Verhinderungspflege (1.612 €/Jahr), Pflegekurse (kostenfrei nach § 45 SGB XI) und stundenweise Betreuung sind keine Schwäche, sondern Voraussetzung für Durchhaltevermögen.',
      },
    ],
    faqs: [
      {
        question: 'Wie lange dauert es, bis Pflege­leistungen ankommen?',
        answer:
          'Pflegegrad: ca. 5 Wochen vom Antrag bis Bescheid. Häusliche Krankenpflege (Behandlungspflege) auf ärztliche Verordnung: in der Regel innerhalb 24–48 Stunden bei IMPULS. Sachleistung der Pflegekasse: ab Antragsmonat rückwirkend.',
      },
      {
        question: 'Mein Vater will keinen „Fremden" im Haus — wie umgehen?',
        answer:
          'Ein häufiges Hindernis. Hilfreich: Wir kommen zunächst zum Erstgespräch ohne Pflege­handlung — als Beratung. Eine feste Bezugs­pflegekraft kommt anschließend immer wieder, sodass kein „Fremder" mehr bleibt, sondern jemand Vertrautes wird.',
      },
      {
        question: 'Was, wenn ich weit weg wohne und meine Eltern hier?',
        answer:
          'Wir koordinieren digital mit Ihnen — Wochenrückblick, Foto­dokumentation, regelmäßige Telefon­ate. Sie wissen jederzeit, was los ist, ohne 4 Stunden Auto fahren zu müssen.',
      },
    ],
    links: [
      { href: '/pflegegrad/antrag/', label: 'Pflegegrad beantragen' },
      { href: '/leistungen/pflegeberatung/', label: 'Pflegeberatung' },
      { href: '/leistungen/verhinderungspflege/', label: 'Verhinderungspflege' },
      { href: '/leistungen/grundpflege/', label: 'Grundpflege' },
    ],
  },
  {
    slug: 'erste-schritte-pflegefall',
    title: 'Erste Schritte bei plötzlichem Pflegefall',
    metaTitle: 'Plötzlicher Pflegefall – erste Schritte für Angehörige',
    metaDescription:
      'Schlaganfall, Sturz, Krankenhaus: Diese 7 Schritte ordnen Chaos. Pflegegrad, Versorgung, Entlastung, Behörden — kompakt und ohne Fachsprache.',
    intro:
      'Ein plötzlicher Pflegefall — Sturz, Schlaganfall, Krankenhaus­aufenthalt — wirft Familien aus der Bahn. Diese Seite ist eine Checkliste für die ersten 7 Tage.',
    updatedAt: '2026-04-01',
    sections: [
      {
        heading: 'Tag 1–2: Akut sichern',
        body: 'Stabilisierung steht über allem. Hausarzt, Krankenhaus-Sozialdienst oder ambulanter Pflegedienst klären den ersten Schritt.',
        bullets: [
          'Hausarzt einbinden oder Klinik-Sozialdienst kontaktieren',
          'Vollmachten klären (Vorsorgevollmacht, Generalvollmacht)',
          'Notfallkontakte am Telefon hinterlegen',
        ],
      },
      {
        heading: 'Tag 3–5: Pflege­grad-Antrag, Versorgung anbahnen',
        body: 'Pflegekasse anrufen (Antragsdatum sichern). Wir kommen zum kostenfreien Erstgespräch und erstellen einen Versorgungs­plan für die nächsten Wochen.',
      },
      {
        heading: 'Tag 6–7: Entlastung und Hilfsmittel',
        body: 'Pflegehilfsmittel (Bett, Toiletten­stuhl, Greifhilfen) über den Hausarzt verordnen lassen. Wohnumfeld-Anpassung (bis 4.180 €) prüfen.',
      },
    ],
    faqs: [
      {
        question: 'Wer hilft, wenn am Wochenende der Pflegefall eintritt?',
        answer:
          'Ärztlicher Bereitschafts­dienst 116 117. Krankenhaus-Aufnahme bei akuter Gefahr: 112. Bei stabilem Zustand: Montag früh Pflegekasse anrufen, Pflegegrad-Antrag stellen, gleichzeitig uns kontaktieren — wir starten in der Regel ab Dienstag.',
      },
    ],
    links: [
      { href: '/leistungen/pflegeberatung/', label: 'Pflegeberatung kostenfrei' },
      { href: '/pflegegrad/antrag/', label: 'Pflegegrad beantragen' },
    ],
  },
  {
    slug: 'checkliste-angehoerige',
    title: 'Checkliste für pflegende Angehörige',
    metaTitle: 'Pflege-Checkliste Angehörige – Anträge, Leistungen, Entlastung',
    metaDescription:
      'Was Sie als Angehörige*r konkret tun können: Pflegegrad, Verhinderungspflege, Hilfsmittel, Pflegekurse, Entlastungsbetrag — alles Schritt für Schritt.',
    intro:
      'Diese Checkliste deckt alle Antrags- und Leistungs­ansprüche ab, die Sie als pflegende Angehörige haben — viele werden aus Unwissenheit nicht genutzt.',
    updatedAt: '2026-04-01',
    sections: [
      {
        heading: 'Anträge, die jetzt gestellt werden sollten',
        body: '',
        bullets: [
          'Pflegegrad­antrag (Pflegekasse)',
          'Schwerbehinderten­ausweis (Versorgungs­amt)',
          'Wohnraum­anpassung — bis 4.180 € pro Maßnahme',
          'Pflegehilfsmittel — Pauschale 42 €/Monat',
          'Hausnotruf (ggf. Pflegekasse)',
          'Beihilfe / Sozialamt prüfen',
        ],
      },
      {
        heading: 'Leistungen, die oft vergessen werden',
        body: '',
        bullets: [
          'Verhinderungspflege bis 1.612 €/Jahr (übertragbar mit Kurzzeitpflege)',
          'Entlastungsbetrag 131 €/Monat — addiert sich pro Quartal/Jahr',
          'Pflegekurse für Angehörige — kostenfrei (§ 45 SGB XI)',
          'Rentenversicherungs­beiträge für pflegende Angehörige',
          'Steuerermäßigungen § 33b EStG (Pflege-Pauschbetrag)',
        ],
      },
    ],
    faqs: [
      {
        question: 'Bekomme ich Geld, wenn ich meine Mutter selbst pflege?',
        answer:
          'Nicht direkt. Aber Sie erhalten via Ihre Mutter Pflegegeld (PG 2: 347 €, PG 5: 990 €/Monat), das sie an Sie weitergeben kann. Außerdem zahlt die Pflegekasse Renten­versicherungs­beiträge für Sie ein, sofern Sie mindestens 10 Stunden/Woche an mindestens 2 Tagen pflegen.',
      },
    ],
    links: [
      { href: '/leistungen/verhinderungspflege/', label: 'Verhinderungspflege' },
      { href: '/leistungen/pflegeberatung/', label: 'Pflegeberatung' },
    ],
  },
  {
    slug: 'pflegekosten',
    title: 'Pflegekosten 2025: Was zahlt die Kasse, was Sie selbst?',
    metaTitle: 'Pflegekosten 2025 – Pflegekasse, Eigenanteil, Selbstzahler',
    metaDescription:
      'Aktuelle Pflegekosten 2025: Pflegegeld, Sachleistung, Behandlungspflege. Was übernimmt die Kasse, was bleibt als Eigenanteil — verständlich erklärt.',
    intro:
      'Pflege ist kein Luxus, aber sie kostet. Diese Übersicht zeigt, was Pflegekasse und Krankenkasse 2025 übernehmen — und welche Eigenanteile realistisch zu erwarten sind.',
    updatedAt: '2026-04-01',
    sections: [
      {
        heading: 'Pflegegeld 2025',
        body: 'Pflegegeld erhält die pflegebedürftige Person, wenn sie selbst organisiert (z. B. Pflege durch Angehörige): PG 2 = 347 €, PG 3 = 599 €, PG 4 = 800 €, PG 5 = 990 € pro Monat.',
      },
      {
        heading: 'Pflegesachleistung 2025',
        body: 'Pflegesachleistung wird direkt mit dem Pflegedienst verrechnet: PG 2 = 796 €, PG 3 = 1.497 €, PG 4 = 1.859 €, PG 5 = 2.299 € pro Monat.',
      },
      {
        heading: 'Behandlungspflege (häusliche Krankenpflege)',
        body: 'Behandlungspflege läuft über die Kranken­versicherung, nicht die Pflegekasse. Eigenanteil: 10 % der Kosten + 10 € pro Verordnung, gedeckelt durch die persönliche Belastungs­grenze (§ 62 SGB V).',
      },
    ],
    faqs: [
      {
        question: 'Wie hoch ist der Eigenanteil im ambulanten Bereich?',
        answer:
          'Im ambulanten Bereich (zuhause) ist der Eigenanteil deutlich niedriger als im Heim. Realistisch sind je nach Pflegeumfang 0–600 €/Monat — abhängig davon, ob die Sach­leistung der Pflegekasse ausgeschöpft wird oder nicht.',
      },
      {
        question: 'Springt das Sozialamt ein, wenn die Mittel nicht reichen?',
        answer:
          'Ja, sogenannte „Hilfe zur Pflege" nach SGB XII. Voraussetzung ist Bedürftigkeit nach Sozial­hilferecht. Wir verweisen Sie an die örtliche Sozial­amt-Beratung.',
      },
    ],
    links: [
      { href: '/pflegegrad/2/', label: 'Pflegegrad 2' },
      { href: '/pflegegrad/3/', label: 'Pflegegrad 3' },
      { href: '/leistungen/pflegeberatung/', label: 'Pflegeberatung' },
    ],
  },
  {
    slug: 'pflege-zuhause-organisieren',
    title: 'Pflege zuhause organisieren — Schritt für Schritt',
    metaTitle: 'Pflege zuhause organisieren – Tagesablauf, Hilfsmittel, Wohnraum',
    metaDescription:
      'Wie Sie Pflege zuhause sinnvoll strukturieren: Tagesablauf, Hilfsmittel, Wohnraum­anpassung, Pflegedienst-Einsatz und Entlastung — praxisnah erklärt.',
    intro:
      'Pflege zuhause funktioniert, wenn Struktur, Hilfsmittel und ein verlässliches Netz aus Profis und Familie zusammen­spielen. So gehen Sie vor.',
    updatedAt: '2026-04-01',
    sections: [
      {
        heading: 'Tagesablauf strukturieren',
        body: 'Verlässliche Zeiten für Aufstehen, Mahlzeiten, Pflege und Mittagsruhe geben Sicherheit und reduzieren Verwirrtheit (besonders bei Demenz).',
      },
      {
        heading: 'Hilfsmittel beantragen',
        body: 'Pflegebett, Toilettenstuhl, Greifhilfen, Roll­stuhl — alles per ärztliche Verordnung über die Krankenkasse. Wir helfen bei der Auswahl.',
      },
      {
        heading: 'Wohnraum anpassen',
        body: 'Bis 4.180 € pro Maßnahme: barriere­arme Dusche, Treppenlift, Türverbreiterung. Mehrere Maßnahmen möglich, wenn Pflegegrad steigt.',
      },
    ],
    faqs: [
      {
        question: 'Was kostet ein Pflegebett?',
        answer:
          'Bei Verordnung übernimmt die Krankenkasse die Kosten — ein Eigenanteil von 10 % bis maximal 10 € pro Hilfsmittel ist üblich.',
      },
    ],
    links: [
      { href: '/leistungen/grundpflege/', label: 'Grundpflege' },
      { href: '/leistungen/hauswirtschaftliche-hilfe/', label: 'Hauswirtschaftliche Hilfe' },
    ],
  },
  {
    slug: 'pflege-nach-krankenhaus-angehoerige',
    title: 'Pflege nach Krankenhaus: Was Angehörige wissen müssen',
    metaTitle: 'Pflege nach Krankenhaus – Übergang nahtlos organisieren',
    metaDescription:
      'Übergang von Klinik nach Hause: Sozialdienst, Übergangs­pflege § 39c, häusliche Krankenpflege, Pflegegrad — die wichtigsten Schritte für Angehörige.',
    intro:
      'Die ersten 7 Tage nach Klinik­entlassung entscheiden über Genesung oder Drehtüre. So organisieren Sie den Übergang.',
    updatedAt: '2026-04-01',
    sections: [
      {
        heading: 'Klinik-Sozialdienst frühzeitig einbinden',
        body: 'Spätestens 3 Tage vor geplanter Entlassung: Termin beim Sozial­dienst der Klinik. Der koordiniert Pflegedienst, Hilfsmittel, Reha, Übergangspflege.',
      },
      {
        heading: 'Übergangspflege § 39c SGB V',
        body: 'Bei akutem Pflegebedarf ohne Pflegegrad bis zu 8 Wochen Krankenhaus-finanzierte Übergangs­pflege möglich. Wir können diese Versorgung übernehmen.',
      },
    ],
    faqs: [
      {
        question: 'Was, wenn am Entlasstag noch kein Pflegegrad da ist?',
        answer:
          'Dann übernimmt häusliche Krankenpflege (§ 37 SGB V, Verordnung Muster 12) oder Übergangs­pflege (§ 39c SGB V) die Versorgung. Pflegegrad-Antrag stellen wir parallel.',
      },
    ],
    links: [
      { href: '/leistungen/pflege-nach-krankenhaus/', label: 'Pflege nach Krankenhaus' },
      { href: '/leistungen/wundversorgung/', label: 'Wundversorgung' },
    ],
  },
]

export const RATGEBER_BY_SLUG = new Map(RATGEBER.map((r) => [r.slug, r]))
