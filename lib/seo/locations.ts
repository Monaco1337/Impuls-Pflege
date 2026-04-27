/**
 * Lokales Entity-Modell für Local-SEO-Dominanz im Kreis Unna.
 *
 * Jeder Ort liefert echte lokale Signale: Stadtteile (Districts), Postleitzahl-
 * Bereiche, dominante Pflege-Bezugspunkte (Krankenhäuser, Reha, Apotheken-
 * Cluster), Verkehrsanbindung und – wichtig – textuelle Bausteine, die in
 * Stadtseiten, Schema und FAQs einfließen, ohne als Doorway-Page zu wirken.
 *
 * Hinzufügen einer neuen Stadt = einmal hier pflegen → Sitemap, Schema,
 * Stadtseiten, interne Linkmatrix, Servicegebiete-Schema werden automatisch
 * mitgezogen.
 */

export type LocationTier = 'primary' | 'secondary'

export interface LocationData {
  /** URL-Slug (entspricht /pflegedienst-[slug]/). */
  slug: string
  /** Anzeigename. */
  name: string
  /** Genitiv-Form für SEO-Texte ("der Pflege in Unna"). */
  genitive: string
  /** Tier — primary = Kerngebiet, secondary = Randgebiet. */
  tier: LocationTier
  /** Postleitzahlen, abgedeckte Bereiche. */
  postalCodes: string[]
  /** Geo-Koordinaten für Schema (Stadtkern). */
  geo: { latitude: number; longitude: number }
  /** Einwohner gerundet — für Trust/Kontext, nicht hartkodiert in Texten. */
  population: number
  /** Einzugsgebiet-Radius in km für GBP / GeoCircle. */
  radiusKm: number
  /** Stadtteile / Ortsteile (wird in Texten und FAQ ausgespielt). */
  districts: string[]
  /** Echte Pflege-/Gesundheits-Bezugspunkte für lokale Texttiefe. */
  landmarks: {
    hospitals?: string[]
    rehab?: string[]
    seniorHomes?: string[]
    notable?: string[]
  }
  /** Verkehr / ÖPNV-Bezug (für Wegbeschreibung-Bausteine). */
  transport: string[]
  /** Welcher Nachbar-Slug ist für Cross-Links sinnvoll? */
  neighbors: string[]
  /**
   * Kurzer, lokal verankerter Intro-Absatz (1–3 Sätze, einzigartig pro Ort).
   * Wird auf Stadtseite + im Hub angezeigt — nie identisch zu anderen Orten.
   */
  intro: string
  /**
   * Längerer, ortsspezifischer Mehrwert-Absatz (2–4 Sätze).
   * Erklärt, warum Pflege gerade in diesem Ort eine besondere Rolle spielt.
   */
  context: string
  /**
   * Stadt-spezifische FAQ-Frage + Antwort (über die generischen FAQs hinaus).
   * Sorgt dafür, dass keine zwei Stadtseiten identische FAQ-Inhalte haben.
   */
  localFaq: { question: string; answer: string }[]
}

export const LOCATIONS: LocationData[] = [
  // ── PRIMÄR: Kreis Unna ───────────────────────────────────────────────
  {
    slug: 'unna',
    name: 'Unna',
    genitive: 'Unnas',
    tier: 'primary',
    postalCodes: ['59423', '59425', '59427'],
    geo: { latitude: 51.5378, longitude: 7.6886 },
    population: 58000,
    radiusKm: 12,
    districts: ['Innenstadt', 'Königsborn', 'Massen', 'Afferde', 'Mühlhausen', 'Hemmerde', 'Lünern', 'Stockum', 'Siddinghausen', 'Billmerich'],
    landmarks: {
      hospitals: ['Christliches Klinikum Unna (Katharinen-Hospital)', 'Evangelisches Krankenhaus Unna'],
      seniorHomes: ['Seniorenzentrum Königsborn', 'AWO-Seniorenzentrum Unna'],
      notable: ['Altstadt Unna', 'Lindenbrauerei', 'Kurpark Königsborn'],
    },
    transport: ['Bahnhof Unna (RB 59, RE 7)', 'A1 / A44 Anschluss Unna-Ost', 'Buslinien VKU im Stadtgebiet'],
    neighbors: ['kamen', 'holzwickede', 'froendenberg', 'boenen'],
    intro:
      'Unna ist unsere Heimat: Hier hat IMPULS seinen Sitz in der Massener Straße, und hier kennen wir Stadtteile wie Königsborn, Massen oder Afferde nicht von der Karte, sondern von der Türklinke.',
    context:
      'Mit dem Christlichen Klinikum und dem Evangelischen Krankenhaus liegen zwei der wichtigsten Versorgungsanker des Kreises direkt vor Ort. Wir übernehmen reibungslos nach Krankenhaus­entlassung, organisieren Behandlungspflege in enger Abstimmung mit Hausärzten in der Innenstadt und Königsborn und sind in Massen, Hemmerde oder Lünern in wenigen Minuten beim Patienten.',
    localFaq: [
      {
        question: 'Versorgt IMPULS auch Stadtteile außerhalb der Innenstadt von Unna?',
        answer:
          'Ja. Unsere Touren decken regelmäßig Königsborn, Massen, Afferde, Mühlhausen, Hemmerde, Lünern, Stockum, Siddinghausen und Billmerich ab. Auch dünner besiedelte Lagen wie Hemmerde-Westhemmerde sind Teil unseres Versorgungs­gebiets.',
      },
      {
        question: 'Wie schnell könnt ihr nach einer Krankenhausentlassung aus dem Christlichen Klinikum Unna starten?',
        answer:
          'In der Regel innerhalb von 24–72 Stunden, oft noch am Entlasstag. Wir stimmen direkt mit dem Sozialdienst der Klinik ab, übernehmen Verbandswechsel, Medikamenten­gabe und Mobilisation und sorgen für eine bruchfreie Versorgung von der Klinik in Ihr Zuhause.',
      },
    ],
  },
  {
    slug: 'luenen',
    name: 'Lünen',
    genitive: 'Lünens',
    tier: 'primary',
    postalCodes: ['44532', '44534', '44536'],
    geo: { latitude: 51.6157, longitude: 7.5283 },
    population: 86000,
    radiusKm: 12,
    districts: ['Lünen-Süd', 'Lünen-Mitte', 'Brambauer', 'Horstmar', 'Niederaden', 'Wethmar', 'Beckinghausen', 'Gahmen', 'Altlünen', 'Nordlünen'],
    landmarks: {
      hospitals: ['St.-Marien-Hospital Lünen', 'Klinikum Westfalen Knappschafts­krankenhaus'],
      seniorHomes: ['DRK-Seniorenzentrum Lünen', 'Altenheim St. Marien'],
      notable: ['Lippepark Brambauer (ehem. Zeche Minister Achenbach)', 'Hafen Lünen', 'Schwimmpark Cabrioli'],
    },
    transport: ['Bahnhof Lünen Hbf (RE 3, RB 51)', 'Bahnhof Lünen-Preußen', 'A2 Anschluss Lünen-Nord'],
    neighbors: ['selm', 'werne', 'bergkamen', 'kamen'],
    intro:
      'Lünen ist die größte Stadt im Kreis Unna — und entsprechend vielfältig: vom Lippepark über die Innenstadt bis Brambauer kümmern wir uns um Menschen, die zuhause bleiben möchten.',
    context:
      'Rund um das St.-Marien-Hospital und das Knappschafts­krankenhaus betreuen wir nach Operationen, Stürzen oder onkologischen Behandlungen. In Brambauer und Horstmar sind wir oft in Mehrfamilien­häusern und ehemaligen Bergmanns­siedlungen tätig — Erreichbarkeit, kurze Wege und das Gespräch mit Angehörigen sind hier zentral.',
    localFaq: [
      {
        question: 'Pflegt IMPULS auch in Brambauer und Lünen-Süd?',
        answer:
          'Ja. Brambauer, Lünen-Süd, Horstmar und Niederaden sind feste Bestandteile unserer Lüner Tourenplanung. Auch Beckinghausen und Gahmen werden regelmäßig versorgt.',
      },
      {
        question: 'Versorgt ihr auch nach OP im St.-Marien-Hospital Lünen?',
        answer:
          'Ja. Wir nehmen Patient*innen aus dem St.-Marien-Hospital sowie dem Knappschafts­krankenhaus auf und übernehmen Wundversorgung, Verbandswechsel, Medikamenten­gabe und Mobilisation direkt nach der Entlassung.',
      },
    ],
  },
  {
    slug: 'kamen',
    name: 'Kamen',
    genitive: 'Kamens',
    tier: 'primary',
    postalCodes: ['59174'],
    geo: { latitude: 51.5928, longitude: 7.6622 },
    population: 43000,
    radiusKm: 9,
    districts: ['Kamen-Mitte', 'Methler', 'Heeren-Werve', 'Südkamen', 'Rottum', 'Westick', 'Derne'],
    landmarks: {
      hospitals: ['Hellmig-Krankenhaus Kamen (Klinikum Westfalen)'],
      seniorHomes: ['Seniorenzentrum Kamen-Methler', 'AWO-Wohnzentrum Heeren-Werve'],
      notable: ['Kamener Kreuz', 'Pauluskirche Kamen', 'Schloss Heeren'],
    },
    transport: ['Bahnhof Kamen', 'Kamener Kreuz (A1/A2)', 'VKU-Buslinien'],
    neighbors: ['unna', 'bergkamen', 'luenen', 'boenen'],
    intro:
      'Kamen liegt im geographischen Herzen des Kreises Unna — Methler, Heeren-Werve und die Innenstadt sind feste Bestandteile unserer Tagestouren.',
    context:
      'Das Hellmig-Krankenhaus ist ein wichtiger medizinischer Knotenpunkt. Wir übernehmen anschließende Behandlungs­pflege, koordinieren mit Hausärzten in Methler und Heeren und unterstützen bei Pflegegrad­anträgen für Familien, in denen der Pflegefall plötzlich eintritt.',
    localFaq: [
      {
        question: 'Sind Methler und Heeren-Werve in eurer Tour?',
        answer:
          'Ja. Methler und Heeren-Werve gehören zum Standard­einzugsgebiet von IMPULS in Kamen. Auch Südkamen, Rottum und Westick versorgen wir regelmäßig.',
      },
      {
        question: 'Übernehmt ihr Verbandswechsel nach Entlassung aus dem Hellmig-Krankenhaus?',
        answer:
          'Ja. Wir koordinieren direkt mit dem Sozial­dienst und beginnen die häusliche Wundversorgung in der Regel am Entlass­tag oder am Folgetag.',
      },
    ],
  },
  {
    slug: 'bergkamen',
    name: 'Bergkamen',
    genitive: 'Bergkamens',
    tier: 'primary',
    postalCodes: ['59192'],
    geo: { latitude: 51.6147, longitude: 7.6444 },
    population: 49000,
    radiusKm: 9,
    districts: ['Mitte', 'Oberaden', 'Rünthe', 'Weddinghofen', 'Overberge', 'Heil'],
    landmarks: {
      hospitals: ['Hellmig-Krankenhaus Kamen (kurzer Anfahrtsweg)', 'Klinikum Westfalen Werne'],
      seniorHomes: ['Seniorenzentrum Bergkamen-Mitte', 'AWO-Haus Oberaden'],
      notable: ['Marina Rünthe (Datteln-Hamm-Kanal)', 'Bergehalde „Großes Holz"', 'Römerlager Oberaden'],
    },
    transport: ['Bahnhof Bergkamen-Rünthe (RB 51)', 'A2 Anschluss Bergkamen', 'VKU-Buslinien'],
    neighbors: ['kamen', 'luenen', 'werne'],
    intro:
      'Bergkamen ist geprägt von ehemaliger Bergbau­geschichte und vielen Mehrgenerationen­häusern — Pflege findet hier oft mitten in der Familie statt, mit der wir eng zusammenarbeiten.',
    context:
      'In Oberaden, Rünthe und Weddinghofen pflegen wir vielfach Senior*innen, die ihr Leben lang in derselben Straße gewohnt haben. Wir kennen die Wege rund um die Marina Rünthe und sorgen dafür, dass auch in Heil und Overberge die Versorgung verlässlich ankommt.',
    localFaq: [
      {
        question: 'Versorgt IMPULS auch Oberaden und Rünthe?',
        answer:
          'Ja. Oberaden, Rünthe, Weddinghofen, Overberge und Heil sind in unsere Tourenplanung für Bergkamen integriert.',
      },
      {
        question: 'Wie funktioniert die Abstimmung mit Hausärzten in Bergkamen?',
        answer:
          'Wir arbeiten mit den ortsansässigen Allgemein­medizinerinnen und Fachärzten direkt zusammen — Verordnungen für Behandlungs­pflege werden unkompliziert ausgetauscht, bei Bedarf holen wir Folge­verordnungen mit ab.',
      },
    ],
  },
  {
    slug: 'schwerte',
    name: 'Schwerte',
    genitive: 'Schwertes',
    tier: 'primary',
    postalCodes: ['58239'],
    geo: { latitude: 51.4445, longitude: 7.5664 },
    population: 47000,
    radiusKm: 10,
    districts: ['Innenstadt', 'Westhofen', 'Ergste', 'Geisecke', 'Villigst', 'Lichtendorf', 'Holzen', 'Wandhofen'],
    landmarks: {
      hospitals: ['Marien Krankenhaus Schwerte', 'Klinik am Ruhrbogen (Reha)'],
      seniorHomes: ['Seniorenzentrum Schwerte', 'Friedrich-Naumann-Haus'],
      notable: ['Ruhrtal', 'Schwerter Wald', 'Historische Altstadt'],
    },
    transport: ['Bahnhof Schwerte (RE 13, S 5)', 'A1/A45 Anschluss Schwerte', 'BVR-Buslinien'],
    neighbors: ['froendenberg', 'holzwickede', 'unna'],
    intro:
      'Schwerte am Ruhrtal verbindet städtisches Leben mit dörflichen Stadtteilen wie Ergste und Villigst — wir pflegen in beiden Welten.',
    context:
      'Über die Anbindung ans Ruhrtal sind viele Patient*innen sportlich aktiv geblieben — entsprechend wichtig ist eine aktivierende Pflege, die Mobilität und Selbstständig­keit erhält. In Westhofen und Geisecke arbeiten wir eng mit den Hausarzt­praxen zusammen.',
    localFaq: [
      {
        question: 'Pflegt ihr auch in Schwerte-Ergste?',
        answer:
          'Ja. Ergste, Villigst, Geisecke und Lichtendorf gehören zu unserem regelmäßigen Versorgungs­gebiet in Schwerte.',
      },
      {
        question: 'Wie schnell ist Pflege nach Entlassung aus dem Marien Krankenhaus Schwerte möglich?',
        answer:
          'Bei rechtzeitiger Anmeldung über den Sozialdienst innerhalb von 24 Stunden — wir kommen mit allem nötigen Material zur ersten Versorgung.',
      },
    ],
  },
  {
    slug: 'froendenberg',
    name: 'Fröndenberg/Ruhr',
    genitive: 'Fröndenbergs',
    tier: 'primary',
    postalCodes: ['58730'],
    geo: { latitude: 51.4756, longitude: 7.7714 },
    population: 21000,
    radiusKm: 10,
    districts: ['Mitte', 'Bausenhagen', 'Frömern', 'Strickherdicke', 'Langschede', 'Dellwig', 'Ostbüren', 'Westick'],
    landmarks: {
      hospitals: ['Schmallenbach-Haus (geriatrische Reha)', 'Reha-Zentrum Fröndenberg'],
      seniorHomes: ['Seniorenheim Fröndenberg-Mitte', 'AWO-Wohnzentrum Langschede'],
      notable: ['Ruhrtalradweg', 'Schloss Strickherdicke', 'Himmelmannpark'],
    },
    transport: ['Bahnhof Fröndenberg (RB 53)', 'B233 Richtung Iserlohn / Unna'],
    neighbors: ['unna', 'schwerte', 'menden'],
    intro:
      'Fröndenberg liegt am Südrand des Kreises Unna direkt an der Ruhr — von Bausenhagen über die Stadtmitte bis Langschede sind die Wege übersichtlich, und genau das hilft Angehörigen.',
    context:
      'Mit dem Schmallenbach-Haus liegt eine bedeutende geriatrische Reha-Einrichtung im Ort. Patient*innen, die nach Reha nach Hause zurückkehren, übernehmen wir nahtlos und stimmen mit den Therapeut*innen ab, welche Mobilisation sinnvoll fortgeführt werden soll.',
    localFaq: [
      {
        question: 'Sind Bausenhagen und Frömern Teil eures Pflegegebiets?',
        answer:
          'Ja. Bausenhagen, Frömern, Strickherdicke, Langschede und Dellwig werden über unsere Fröndenberg-Tour mitversorgt.',
      },
      {
        question: 'Pflegt IMPULS direkt nach Reha im Schmallenbach-Haus?',
        answer:
          'Ja. Wir koordinieren die Übernahme aus geriatrischen Rehas und führen Mobilisations­pläne fort, um den Reha-Erfolg zuhause zu sichern.',
      },
    ],
  },
  {
    slug: 'holzwickede',
    name: 'Holzwickede',
    genitive: 'Holzwickedes',
    tier: 'primary',
    postalCodes: ['59439'],
    geo: { latitude: 51.4994, longitude: 7.6256 },
    population: 17000,
    radiusKm: 7,
    districts: ['Mitte', 'Hengsen', 'Opherdicke', 'Natorp'],
    landmarks: {
      hospitals: ['Anbindung Christliches Klinikum Unna', 'Marien Hospital Schwerte'],
      seniorHomes: ['Seniorenzentrum Holzwickede'],
      notable: ['Flughafen Dortmund (an der Stadtgrenze)', 'Haus Opherdicke', 'Emscherquellpark'],
    },
    transport: ['Bahnhof Holzwickede (RB 53, RE 57)', 'A44 Anschluss Holzwickede'],
    neighbors: ['unna', 'schwerte', 'kamen'],
    intro:
      'Holzwickede ist die kleinste, aber strategisch wichtigste Tür zwischen Dortmund und Unna — kurze Wege, persönliche Strukturen, schnelle Erreichbarkeit.',
    context:
      'Wir pflegen in Hengsen, Opherdicke und der Mitte — oft Patient*innen, die zwischen den Versorgungs­strukturen Dortmund und Unna „wechseln". Wir sorgen für Kontinuität, egal welche Klinik entlassen hat.',
    localFaq: [
      {
        question: 'Pflegt ihr auch in Opherdicke und Hengsen?',
        answer:
          'Ja. Opherdicke und Hengsen sind feste Bestandteile unserer Holzwickede-Tour.',
      },
      {
        question: 'Übernehmt ihr Patienten aus Dortmunder Kliniken nach Holzwickede?',
        answer:
          'Ja. Über die Nähe zum Flughafen-Korridor übernehmen wir Patient*innen aus dem Klinikum Dortmund und der Knappschaft genauso reibungslos wie aus dem Christlichen Klinikum Unna.',
      },
    ],
  },
  {
    slug: 'boenen',
    name: 'Bönen',
    genitive: 'Bönens',
    tier: 'primary',
    postalCodes: ['59199'],
    geo: { latitude: 51.6019, longitude: 7.7561 },
    population: 18000,
    radiusKm: 8,
    districts: ['Mitte', 'Altenbögge-Bramey', 'Flierich', 'Lenningsen', 'Bramey-Lafferde', 'Nordbögge'],
    landmarks: {
      hospitals: ['Hellmig-Krankenhaus Kamen (Anbindung)', 'St. Barbara-Klinik Hamm-Heessen'],
      seniorHomes: ['DRK-Seniorenzentrum Bönen', 'Haus Mariengarten'],
      notable: ['Zeche Königsborn', 'Bönen Industriepark'],
    },
    transport: ['Bahnhof Bönen-Nordbögge (RB 50)', 'A2 Anschluss Bönen', 'VKU-Bus'],
    neighbors: ['kamen', 'unna'],
    intro:
      'Bönen mit Altenbögge, Flierich und Nordbögge ist klein gewachsen — wir kennen jede Straße und sind genau deshalb verlässlich da, wenn es schnell gehen muss.',
    context:
      'Viele Patient*innen leben hier seit Generationen im selben Haus. Wir respektieren gewachsene Tagesabläufe, arbeiten eng mit der ortsansässigen Hausarzt­praxis und gewährleisten medizinische Behandlungs­pflege auch außerhalb der Kernzeiten.',
    localFaq: [
      {
        question: 'Sind Altenbögge und Flierich in eurer Bönen-Tour?',
        answer:
          'Ja. Wir versorgen Mitte, Altenbögge-Bramey, Flierich, Lenningsen, Bramey-Lafferde und Nordbögge.',
      },
      {
        question: 'Wie schnell könnt ihr in Bönen reagieren, wenn der Pflegefall plötzlich auftritt?',
        answer:
          'In der Regel binnen 24 Stunden für ein Erstgespräch und Aufnahme der Versorgung. Bei akuten Situationen organisieren wir auch kurzfristige Soforthilfe.',
      },
    ],
  },
  {
    slug: 'selm',
    name: 'Selm',
    genitive: 'Selms',
    tier: 'primary',
    postalCodes: ['59379'],
    geo: { latitude: 51.6961, longitude: 7.4664 },
    population: 27000,
    radiusKm: 9,
    districts: ['Selm-Mitte', 'Bork', 'Cappenberg', 'Beifang', 'Botzlar'],
    landmarks: {
      hospitals: ['Klinikum Westfalen Lünen (Anbindung)', 'Christophorus Kliniken Coesfeld'],
      seniorHomes: ['Seniorenzentrum Selm-Bork', 'Haus Cappenberg'],
      notable: ['Schloss Cappenberg', 'Kanal-/Lippeauen', 'Industriepark Selm'],
    },
    transport: ['Bahnhof Selm', 'B 236', 'Anschluss A 1 / A 2 in 15 Minuten'],
    neighbors: ['luenen', 'werne'],
    intro:
      'Selm mit Bork und Cappenberg ist ländlicher geprägt — und genau hier ist eine zuverlässige ambulante Pflege Gold wert.',
    context:
      'Cappenberg und Bork bedeuten für Pflege oft längere Wege — wir planen unsere Touren so, dass wir trotz Distanz in fest zugesicherten Zeit­fenstern beim Patienten sind. Familien, die ihre Eltern nicht ins Heim geben wollen, finden hier eine echte Alternative.',
    localFaq: [
      {
        question: 'Pflegt IMPULS auch in Cappenberg und Bork?',
        answer:
          'Ja. Cappenberg, Bork, Beifang und Botzlar sind feste Tour-Bestandteile, auch wenn die Anfahrt länger ist.',
      },
      {
        question: 'Wie verlässlich sind die Einsatz­zeiten in Selm?',
        answer:
          'Wir arbeiten mit festen Zeit­fenstern und festen Bezugs­pflege­kräften, um genau die Verlässlichkeit zu schaffen, die in einem ländlich geprägten Ort entscheidend ist.',
      },
    ],
  },
  {
    slug: 'werne',
    name: 'Werne',
    genitive: 'Wernes',
    tier: 'primary',
    postalCodes: ['59368'],
    geo: { latitude: 51.6622, longitude: 7.6353 },
    population: 30000,
    radiusKm: 9,
    districts: ['Werne-Mitte', 'Stockum', 'Langern', 'Holthausen', 'Horst', 'Lenklar'],
    landmarks: {
      hospitals: ['St.-Christophorus-Krankenhaus Werne (Klinikum Westfalen)'],
      seniorHomes: ['Seniorenzentrum St. Christophorus', 'AWO-Haus Werne'],
      notable: ['Solebad Werne', 'Sim-Jü-Markt', 'Lippe-Aue'],
    },
    transport: ['Bahnhof Werne (RB 51)', 'A 1 Anschluss Werne / Hamm'],
    neighbors: ['luenen', 'selm', 'bergkamen'],
    intro:
      'Werne liegt zwischen Lippe und Solebad, mit einer historischen Altstadt und einem wachsenden Anteil älterer Menschen, die zuhause bleiben möchten — wir sind dafür da.',
    context:
      'Mit dem St.-Christophorus-Krankenhaus liegt ein zentrales Versorgungs­haus direkt im Ort. Wir übernehmen Patient*innen direkt nach Entlassung, sind in Stockum und Langern oft täglich unterwegs und unterstützen Familien, deren Pflegesituation sich akut verändert hat.',
    localFaq: [
      {
        question: 'Versorgt ihr auch Werne-Stockum und Langern?',
        answer:
          'Ja. Stockum, Langern, Holthausen, Horst und Lenklar sind in unsere Werne-Tour eingebunden.',
      },
      {
        question: 'Wie schnell ist Pflege nach Entlassung aus dem St.-Christophorus-Krankenhaus möglich?',
        answer:
          'Wir nehmen über den Sozialdienst direkt Kontakt auf und können in der Regel ab dem Entlass­tag oder dem Folgetag versorgen.',
      },
    ],
  },

  // ── SEKUNDÄR: Randregion ─────────────────────────────────────────────
  {
    slug: 'dortmund-ost',
    name: 'Dortmund-Ost',
    genitive: 'Dortmund-Osts',
    tier: 'secondary',
    postalCodes: ['44141', '44143', '44287', '44289'],
    geo: { latitude: 51.5036, longitude: 7.5428 },
    population: 90000,
    radiusKm: 8,
    districts: ['Aplerbeck', 'Sölde', 'Sölderholz', 'Lichtendorf', 'Asseln', 'Wickede', 'Brackel', 'Husen-Kurl'],
    landmarks: {
      hospitals: ['Knappschafts­krankenhaus Dortmund', 'St.-Josefs-Hospital Dortmund'],
      seniorHomes: ['DRK-Seniorenzentrum Aplerbeck'],
      notable: ['Aplerbecker Markt', 'PHOENIX See (Hörde)', 'Wischlinger Bachtal'],
    },
    transport: ['U-Bahn U 47 / U 41', 'Bahnhof Aplerbeck', 'B 1 Hellweg'],
    neighbors: ['unna', 'schwerte', 'holzwickede'],
    intro:
      'Dortmund-Ost liegt direkt an unserer Heimat-Grenze — Aplerbeck, Sölde und Lichtendorf erreichen wir mit denselben festen Touren wie Unna-West.',
    context:
      'Wir pflegen ergänzend in Dortmund-Ost dort, wo die Lage Sinn ergibt: an der Stadtgrenze zu Holzwickede und Unna. Versorgungs­kontinuität für Familien, die zwischen Dortmund und dem Kreis Unna leben, ist unser Mehrwert.',
    localFaq: [
      {
        question: 'Pflegt IMPULS auch in Dortmund-Aplerbeck?',
        answer:
          'Ja, in den östlichen Stadtteilen Aplerbeck, Sölde, Lichtendorf, Asseln und Wickede ergänzend zu unserem Kerngebiet im Kreis Unna.',
      },
      {
        question: 'Bin ich als Dortmunder bei euch falsch?',
        answer:
          'Im Dortmunder Westen oder Norden empfehlen wir Kolleg*innen vor Ort — im Osten an der Grenze zum Kreis Unna sind wir hingegen oft die schnellste Option.',
      },
    ],
  },
  {
    slug: 'hamm-west',
    name: 'Hamm-West',
    genitive: 'Hamm-Wests',
    tier: 'secondary',
    postalCodes: ['59065', '59071', '59077'],
    geo: { latitude: 51.6739, longitude: 7.7833 },
    population: 50000,
    radiusKm: 8,
    districts: ['Bockum-Hövel', 'Pelkum', 'Herringen', 'Heessen-West'],
    landmarks: {
      hospitals: ['St. Barbara-Klinik Hamm-Heessen', 'Evangelisches Krankenhaus Hamm'],
      seniorHomes: ['Seniorenheim Bockum-Hövel'],
      notable: ['Maximilianpark', 'Lippepark', 'Datteln-Hamm-Kanal'],
    },
    transport: ['Hbf Hamm', 'A 1 / A 2', 'BLG-Buslinien'],
    neighbors: ['werne', 'boenen', 'bergkamen'],
    intro:
      'Im Hamm-West (Bockum-Hövel, Pelkum, Herringen) sind wir die natürliche Verlängerung unserer Werne- und Bönen-Touren.',
    context:
      'Familien an der Stadt­grenze zwischen Hamm und dem Kreis Unna profitieren von unserer Tourenstruktur: kurze Wege, schnelle Erreichbarkeit, vertraute Gesichter.',
    localFaq: [
      {
        question: 'Versorgt IMPULS auch Bockum-Hövel und Pelkum?',
        answer:
          'Ja, im Hamm-Westen pflegen wir ergänzend zu unserem Kreis-Unna-Gebiet.',
      },
      {
        question: 'Wie funktioniert die Abrechnung mit Pflegekassen, wenn ich in Hamm wohne?',
        answer:
          'Identisch wie im Kreis Unna: Wir rechnen direkt mit Ihrer gesetzlichen oder privaten Pflegeversicherung ab — Wohnort spielt keine Rolle für die Leistungs­ansprüche.',
      },
    ],
  },
  {
    slug: 'soest-rand',
    name: 'Soest-Randgebiet',
    genitive: 'Soests',
    tier: 'secondary',
    postalCodes: ['59494', '59519'],
    geo: { latitude: 51.5722, longitude: 8.1064 },
    population: 25000,
    radiusKm: 10,
    districts: ['Welver', 'Bad Sassendorf', 'Lippetal-Lippborg'],
    landmarks: {
      hospitals: ['Klinikum Stadt Soest', 'Kliniken Bad Sassendorf'],
      seniorHomes: ['Senioren­zentrum Welver'],
      notable: ['Soester Börde', 'Bad Sassendorfer Salzwiesen'],
    },
    transport: ['Bahnhof Soest', 'A 44 Anschluss Soest'],
    neighbors: ['boenen', 'unna', 'werne'],
    intro:
      'Im Soester Randgebiet — Welver, Bad Sassendorf, Lippetal-Lippborg — sind wir vor allem für Familien mit Anker im Kreis Unna eine sinnvolle Option.',
    context:
      'Wir pflegen hier dort, wo Wege überschaubar sind. Für komplexe Versorgungen mit großem Personalbedarf vermitteln wir transparent an lokale Pflege­dienste in Soest.',
    localFaq: [
      {
        question: 'Übernehmt ihr auch in Welver und Bad Sassendorf?',
        answer:
          'Im Randgebiet ja — bei guter Tour-Anbindung an Bönen, Unna oder Werne.',
      },
      {
        question: 'Wann empfehlt ihr einen lokalen Pflegedienst in Soest?',
        answer:
          'Wenn die Anfahrt unsere Tour­logik sprengt oder mehrere tägliche Einsätze geplant sind. Wir empfehlen dann offen und unverbindlich.',
      },
    ],
  },
  {
    slug: 'menden',
    name: 'Menden (Sauerland)',
    genitive: 'Mendens',
    tier: 'secondary',
    postalCodes: ['58706', '58708', '58710'],
    geo: { latitude: 51.4419, longitude: 7.7989 },
    population: 53000,
    radiusKm: 8,
    districts: ['Menden-Mitte', 'Lendringsen', 'Bösperde', 'Halingen', 'Platte Heide'],
    landmarks: {
      hospitals: ['St.-Vincenz-Krankenhaus Menden', 'Klinik am Rosenberg'],
      seniorHomes: ['Senioren­zentrum Menden-Mitte'],
      notable: ['Rodelberg', 'Hexenturm Menden', 'Hönnetal'],
    },
    transport: ['Bahnhof Menden', 'B 7 / B 515'],
    neighbors: ['froendenberg', 'unna', 'iserlohn'],
    intro:
      'Menden grenzt direkt an Fröndenberg — für Patient*innen am Stadtrand sind wir oft schneller dran als ein klassischer Mendener Pflege­dienst.',
    context:
      'Wir versorgen ergänzend in Menden-Lendringsen, Halingen und am Mendener Rand zur Ruhr. Für Patient*innen mit familiärem Bezug zum Kreis Unna ist die Doppel­anbindung ein echter Vorteil.',
    localFaq: [
      {
        question: 'Pflegt IMPULS in Menden-Lendringsen?',
        answer:
          'Lendringsen, Halingen und der Stadtrand zu Fröndenberg sind Teil unseres ergänzenden Versorgungs­gebiets.',
      },
      {
        question: 'Wie funktioniert das organisatorisch über Kreis­grenzen hinweg?',
        answer:
          'Pflegekassen kennen keine Kreisgrenzen — wir rechnen direkt mit Ihrer Pflege­versicherung ab und stimmen mit Hausärzten in Menden ab.',
      },
    ],
  },
  {
    slug: 'iserlohn',
    name: 'Iserlohn',
    genitive: 'Iserlohns',
    tier: 'secondary',
    postalCodes: ['58636', '58638', '58642'],
    geo: { latitude: 51.3742, longitude: 7.7011 },
    population: 92000,
    radiusKm: 7,
    districts: ['Letmathe', 'Hennen', 'Iserlohnerheide'],
    landmarks: {
      hospitals: ['Märkische Kliniken Iserlohn'],
      seniorHomes: ['DRK-Seniorenheim Iserlohn'],
      notable: ['Dechen­höhle', 'Fritz-Kühn-Platz'],
    },
    transport: ['Bahnhof Iserlohn', 'A 46 Anschluss Letmathe'],
    neighbors: ['menden', 'froendenberg'],
    intro:
      'In Iserlohn versorgen wir gezielt im nördlichen Stadtrand (Hennen) und am Übergang Richtung Letmathe — dort, wo unsere Tour ohnehin verläuft.',
    context:
      'Iserlohn ist groß — wir konzentrieren uns auf den Norden und arbeiten dort dort wo es operativ Sinn ergibt.',
    localFaq: [
      {
        question: 'Übernehmt ihr Pflege in Iserlohn-Hennen?',
        answer:
          'Hennen und der nördliche Stadtrand sind im Rahmen unserer Touren­logik machbar.',
      },
      {
        question: 'Bietet ihr Pflege in der Iserlohner Innenstadt?',
        answer:
          'Für die innere Stadt­mitte empfehlen wir Iserlohner Pflegedienste — die kennen Ihre Strukturen vor Ort am besten.',
      },
    ],
  },
  {
    slug: 'nordkirchen',
    name: 'Nordkirchen',
    genitive: 'Nordkirchens',
    tier: 'secondary',
    postalCodes: ['59394'],
    geo: { latitude: 51.7344, longitude: 7.5311 },
    population: 11000,
    radiusKm: 8,
    districts: ['Nordkirchen-Mitte', 'Capelle', 'Südkirchen'],
    landmarks: {
      hospitals: ['St.-Marien-Hospital Lünen (kurze Anbindung)'],
      seniorHomes: ['Seniorenzentrum Capelle'],
      notable: ['Schloss Nordkirchen („Westfälisches Versailles")'],
    },
    transport: ['B 235', 'Anschluss A 1 in 10 Minuten'],
    neighbors: ['selm', 'luenen'],
    intro:
      'Nordkirchen ist klein, aber für Familien mit Anker in Lünen oder Selm gut von uns mitversorgbar.',
    context:
      'Wir versorgen Nordkirchen-Mitte, Capelle und Südkirchen über unsere Selm-/Lünen-Tour — ohne Mehraufwand für die Familie.',
    localFaq: [
      {
        question: 'Pflegt IMPULS in Nordkirchen?',
        answer:
          'Ja, im Verbund mit unseren Lünen- und Selm-Touren.',
      },
      {
        question: 'Werden meine Pflegekosten anerkannt, obwohl ihr nicht in Nordkirchen sitzt?',
        answer:
          'Ja. Sitz und Versorgungs­ort werden von der Pflegekasse unabhängig betrachtet — Anerkennung erfolgt über unseren Versorgungs­vertrag nach § 72 SGB XI.',
      },
    ],
  },
  {
    slug: 'ascheberg',
    name: 'Ascheberg',
    genitive: 'Aschebergs',
    tier: 'secondary',
    postalCodes: ['59387'],
    geo: { latitude: 51.7842, longitude: 7.6275 },
    population: 15000,
    radiusKm: 8,
    districts: ['Ascheberg-Mitte', 'Herbern', 'Davensberg'],
    landmarks: {
      hospitals: ['St. Christophorus-Krankenhaus Werne'],
      seniorHomes: ['Seniorenzentrum Ascheberg'],
      notable: ['Burg Davensberg'],
    },
    transport: ['B 58', 'A 1 Anschluss Ascheberg'],
    neighbors: ['werne', 'selm'],
    intro:
      'Ascheberg mit Herbern und Davensberg ist ländlich geprägt — wir versorgen ergänzend zu unserer Werne-Tour.',
    context:
      'Familien in Herbern und Davensberg, die einen verlässlichen Pflege­partner mit Bezug zum Kreis Unna suchen, sind bei uns richtig.',
    localFaq: [
      {
        question: 'Pflegt IMPULS in Herbern?',
        answer:
          'Ja, im Rahmen unserer Werne-/Selm-Tour.',
      },
      {
        question: 'Was, wenn ich noch unsicher bin?',
        answer:
          'Wir kommen kostenlos und unverbindlich zum Erstgespräch und beraten ergebnis­offen — auch wenn am Ende ein lokaler Pflege­dienst die bessere Wahl ist.',
      },
    ],
  },
]

export const PRIMARY_LOCATIONS = LOCATIONS.filter((l) => l.tier === 'primary')
export const SECONDARY_LOCATIONS = LOCATIONS.filter((l) => l.tier === 'secondary')

export const LOCATION_BY_SLUG = new Map(LOCATIONS.map((l) => [l.slug, l]))

export function getLocation(slug: string): LocationData | undefined {
  return LOCATION_BY_SLUG.get(slug)
}
