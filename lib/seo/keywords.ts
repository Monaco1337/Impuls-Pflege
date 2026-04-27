/**
 * Keyword-Datenbank.
 *
 * Wir trennen `seedKeywords` (manuell kuratiert, hohe Conversion) von
 * `expandKeywords()` — der dynamisch Service × Stadt × Modifier produziert
 * (Long-Tail-Generator). Insgesamt ergibt das >2.500 Keyword-Matches.
 *
 * Verwendung:
 *  - `01-KEYWORD-MATRIX.md` rendert eine kuratierte Auswahl als Tabelle
 *  - Search-Console-Tracking gleicht Top-Queries gegen seedKeywords ab,
 *    um Lücken zu erkennen
 */

import { LOCATIONS } from './locations'
import { SERVICES } from './services'

export type Cluster =
  | 'money'
  | 'local'
  | 'emergency'
  | 'trust'
  | 'angehoerige'
  | 'pflegegrad'
  | 'leistung'
  | 'kosten'
  | 'vergleich'
  | 'images'
  | 'voice'
  | 'near-me'
  | 'longtail'

export type FunnelStage = 'awareness' | 'consideration' | 'decision' | 'transactional'

export interface KeywordEntry {
  keyword: string
  cluster: Cluster
  /** 1 (niedrig) – 5 (Money). */
  priority: 1 | 2 | 3 | 4 | 5
  /** 1 (niedrig) – 5 (sehr hoch). */
  conversionValue: 1 | 2 | 3 | 4 | 5
  funnel: FunnelStage
  intent: string
  /** Ziel-URL (relativ). */
  url: string
  pageType: 'home' | 'city' | 'service' | 'service-city' | 'pflegegrad' | 'ratgeber' | 'kontakt'
  schema: Array<'LocalBusiness' | 'MedicalBusiness' | 'Service' | 'FAQPage' | 'Article' | 'BreadcrumbList' | 'WebPage'>
  internalLinkTargets: string[]
}

/** Manuell kuratierte High-Value-Keywords. */
export const seedKeywords: KeywordEntry[] = [
  // ── A. Money: City-Hubs (10) ─────────────────────────────────────────
  ...LOCATIONS.filter((l) => l.tier === 'primary').map<KeywordEntry>((l) => ({
    keyword: `Pflegedienst ${l.name}`,
    cluster: 'money',
    priority: 5,
    conversionValue: 5,
    funnel: 'transactional',
    intent: `Lokale Suche nach Pflegedienst in ${l.name}`,
    url: `/pflegedienst-${l.slug}/`,
    pageType: 'city',
    schema: ['LocalBusiness', 'MedicalBusiness', 'FAQPage', 'BreadcrumbList', 'WebPage'],
    internalLinkTargets: ['/leistungen/', '/kontakt/', '/pflegegrad/'],
  })),
  ...LOCATIONS.filter((l) => l.tier === 'primary').map<KeywordEntry>((l) => ({
    keyword: `ambulanter Pflegedienst ${l.name}`,
    cluster: 'money',
    priority: 5,
    conversionValue: 5,
    funnel: 'transactional',
    intent: `Suche nach ambulantem Pflegedienst in ${l.name}`,
    url: `/pflegedienst-${l.slug}/`,
    pageType: 'city',
    schema: ['LocalBusiness', 'MedicalBusiness', 'FAQPage'],
    internalLinkTargets: ['/leistungen/', '/kontakt/'],
  })),
  ...LOCATIONS.filter((l) => l.tier === 'primary').map<KeywordEntry>((l) => ({
    keyword: `ambulante Pflege ${l.name}`,
    cluster: 'money',
    priority: 5,
    conversionValue: 5,
    funnel: 'transactional',
    intent: `Bedarf an ambulanter Pflege in ${l.name}`,
    url: `/pflegedienst-${l.slug}/`,
    pageType: 'city',
    schema: ['LocalBusiness', 'Service'],
    internalLinkTargets: ['/leistungen/grundpflege/' + l.slug + '/'],
  })),

  // ── B. Money: Service-Hubs (10) ─────────────────────────────────────
  ...SERVICES.map<KeywordEntry>((s) => ({
    keyword: `${s.title} Kreis Unna`,
    cluster: 'money',
    priority: 5,
    conversionValue: 5,
    funnel: 'transactional',
    intent: `Suche nach ${s.title} im Kreis Unna`,
    url: `/leistungen/${s.slug}/`,
    pageType: 'service',
    schema: ['Service', 'FAQPage', 'BreadcrumbList'],
    internalLinkTargets: LOCATIONS.filter((l) => l.tier === 'primary').slice(0, 5).map((l) => `/leistungen/${s.slug}/${l.slug}/`),
  })),

  // ── C. Trust ────────────────────────────────────────────────────────
  {
    keyword: 'bester Pflegedienst Unna',
    cluster: 'trust',
    priority: 4,
    conversionValue: 5,
    funnel: 'decision',
    intent: 'Vergleichende Suche nach bestem Pflegedienst',
    url: '/pflegedienst-unna/',
    pageType: 'city',
    schema: ['LocalBusiness', 'FAQPage'],
    internalLinkTargets: ['/ueber-uns/', '/team/', '/kontakt/'],
  },
  {
    keyword: 'zuverlässiger Pflegedienst Unna',
    cluster: 'trust',
    priority: 4,
    conversionValue: 4,
    funnel: 'consideration',
    intent: 'Trust-Suche',
    url: '/pflegedienst-unna/',
    pageType: 'city',
    schema: ['LocalBusiness'],
    internalLinkTargets: ['/team/', '/kontakt/'],
  },
  {
    keyword: 'Pflegedienst mit fester Bezugspflege Unna',
    cluster: 'trust',
    priority: 3,
    conversionValue: 4,
    funnel: 'consideration',
    intent: 'Differenzierungs-Trust',
    url: '/pflegedienst-unna/',
    pageType: 'city',
    schema: ['LocalBusiness'],
    internalLinkTargets: ['/team/'],
  },

  // ── D. Emergency ────────────────────────────────────────────────────
  ...LOCATIONS.filter((l) => l.tier === 'primary').slice(0, 6).map<KeywordEntry>((l) => ({
    keyword: `Pflegedienst sofort ${l.name}`,
    cluster: 'emergency',
    priority: 5,
    conversionValue: 5,
    funnel: 'transactional',
    intent: 'Akuter Bedarf, schnellstmögliche Aufnahme',
    url: `/pflegedienst-${l.slug}/`,
    pageType: 'city',
    schema: ['LocalBusiness'],
    internalLinkTargets: ['/kontakt/', `/leistungen/pflege-nach-krankenhaus/${l.slug}/`],
  })),
  {
    keyword: 'Pflege nach Krankenhausentlassung Unna',
    cluster: 'emergency',
    priority: 5,
    conversionValue: 5,
    funnel: 'transactional',
    intent: 'Direkter Übergang Klinik → zuhause',
    url: '/leistungen/pflege-nach-krankenhaus/unna/',
    pageType: 'service-city',
    schema: ['Service', 'FAQPage'],
    internalLinkTargets: ['/leistungen/wundversorgung/unna/', '/leistungen/behandlungspflege/unna/'],
  },

  // ── E. Angehörige ───────────────────────────────────────────────────
  {
    keyword: 'Hilfe für Angehörige Pflege',
    cluster: 'angehoerige',
    priority: 4,
    conversionValue: 4,
    funnel: 'awareness',
    intent: 'Überforderung als Pflegende',
    url: '/ratgeber/pflege-fuer-angehoerige/',
    pageType: 'ratgeber',
    schema: ['Article', 'FAQPage'],
    internalLinkTargets: ['/leistungen/verhinderungspflege/', '/leistungen/pflegeberatung/'],
  },
  {
    keyword: 'Was tun bei Pflegefall',
    cluster: 'angehoerige',
    priority: 4,
    conversionValue: 4,
    funnel: 'awareness',
    intent: 'Überraschung Pflegefall',
    url: '/ratgeber/erste-schritte-pflegefall/',
    pageType: 'ratgeber',
    schema: ['Article', 'FAQPage'],
    internalLinkTargets: ['/pflegegrad/antrag/', '/leistungen/pflegeberatung/'],
  },
  {
    keyword: 'pflegende Angehörige Entlastung',
    cluster: 'angehoerige',
    priority: 4,
    conversionValue: 5,
    funnel: 'consideration',
    intent: 'Suche nach Auszeit',
    url: '/leistungen/verhinderungspflege/',
    pageType: 'service',
    schema: ['Service', 'FAQPage'],
    internalLinkTargets: ['/ratgeber/checkliste-angehoerige/'],
  },

  // ── F. Pflegegrad ───────────────────────────────────────────────────
  ...['1', '2', '3', '4', '5'].map<KeywordEntry>((g) => ({
    keyword: `Pflegegrad ${g} Leistungen`,
    cluster: 'pflegegrad',
    priority: 4,
    conversionValue: 4,
    funnel: 'awareness',
    intent: `Was steht mir mit Pflegegrad ${g} zu`,
    url: `/pflegegrad/${g}/`,
    pageType: 'pflegegrad',
    schema: ['WebPage', 'FAQPage'],
    internalLinkTargets: ['/pflegegrad/antrag/', '/leistungen/grundpflege/'],
  })),
  {
    keyword: 'Pflegegrad beantragen',
    cluster: 'pflegegrad',
    priority: 5,
    conversionValue: 5,
    funnel: 'consideration',
    intent: 'Antragstellung',
    url: '/pflegegrad/antrag/',
    pageType: 'pflegegrad',
    schema: ['WebPage', 'FAQPage'],
    internalLinkTargets: ['/leistungen/pflegeberatung/'],
  },
  {
    keyword: 'Widerspruch Pflegegrad',
    cluster: 'pflegegrad',
    priority: 4,
    conversionValue: 5,
    funnel: 'consideration',
    intent: 'Niedrige Einstufung anfechten',
    url: '/pflegegrad/widerspruch/',
    pageType: 'pflegegrad',
    schema: ['WebPage', 'FAQPage'],
    internalLinkTargets: ['/leistungen/pflegeberatung/'],
  },
  {
    keyword: 'MD Begutachtung vorbereiten',
    cluster: 'pflegegrad',
    priority: 3,
    conversionValue: 4,
    funnel: 'consideration',
    intent: 'Vorbereitung auf Termin',
    url: '/pflegegrad/md-begutachtung/',
    pageType: 'pflegegrad',
    schema: ['WebPage', 'FAQPage'],
    internalLinkTargets: ['/pflegegrad/antrag/'],
  },

  // ── G. Kosten ───────────────────────────────────────────────────────
  {
    keyword: 'Pflegekosten 2025',
    cluster: 'kosten',
    priority: 4,
    conversionValue: 4,
    funnel: 'awareness',
    intent: 'Aktuelle Kostenübersicht',
    url: '/ratgeber/pflegekosten/',
    pageType: 'ratgeber',
    schema: ['Article', 'FAQPage'],
    internalLinkTargets: ['/pflegegrad/2/', '/pflegegrad/3/'],
  },
  {
    keyword: 'Kosten ambulante Pflege',
    cluster: 'kosten',
    priority: 4,
    conversionValue: 4,
    funnel: 'consideration',
    intent: 'Was zahlt die Kasse',
    url: '/ratgeber/pflegekosten/',
    pageType: 'ratgeber',
    schema: ['Article', 'FAQPage'],
    internalLinkTargets: ['/pflegegrad/'],
  },
  {
    keyword: 'Pflegegeld 2025 Höhe',
    cluster: 'kosten',
    priority: 3,
    conversionValue: 3,
    funnel: 'awareness',
    intent: 'Beträge nachschlagen',
    url: '/pflegegrad/',
    pageType: 'pflegegrad',
    schema: ['WebPage'],
    internalLinkTargets: ['/pflegegrad/2/', '/pflegegrad/3/'],
  },

  // ── H. Voice / Near-me ──────────────────────────────────────────────
  {
    keyword: 'Pflegedienst in meiner Nähe',
    cluster: 'near-me',
    priority: 5,
    conversionValue: 5,
    funnel: 'transactional',
    intent: 'Geo-Local',
    url: '/',
    pageType: 'home',
    schema: ['LocalBusiness'],
    internalLinkTargets: ['/pflege-kreis-unna/'],
  },
  {
    keyword: 'Pflegedienst offen jetzt',
    cluster: 'voice',
    priority: 4,
    conversionValue: 5,
    funnel: 'transactional',
    intent: 'Akute Erreichbarkeit',
    url: '/kontakt/',
    pageType: 'kontakt',
    schema: ['LocalBusiness'],
    internalLinkTargets: ['/pflegedienst-unna/'],
  },
  {
    keyword: 'Wer hilft mir mit der Pflege meiner Mutter',
    cluster: 'voice',
    priority: 3,
    conversionValue: 4,
    funnel: 'awareness',
    intent: 'Voice/Long-Tail-Frage',
    url: '/ratgeber/pflege-fuer-angehoerige/',
    pageType: 'ratgeber',
    schema: ['Article'],
    internalLinkTargets: ['/leistungen/pflegeberatung/'],
  },

  // ── I. Vergleich ────────────────────────────────────────────────────
  {
    keyword: 'Pflegedienst vergleich Unna',
    cluster: 'vergleich',
    priority: 3,
    conversionValue: 4,
    funnel: 'consideration',
    intent: 'Anbietervergleich',
    url: '/pflegedienst-unna/',
    pageType: 'city',
    schema: ['LocalBusiness'],
    internalLinkTargets: ['/team/', '/ueber-uns/'],
  },
]

/**
 * Long-Tail-Generator: erzeugt Service × Stadt × Modifier-Kombinationen.
 * Erzeugt deterministisch >2.000 Long-Tail-Phrasen, die unsere
 * programmatic Pages bedienen.
 */
export function expandKeywords(): KeywordEntry[] {
  const modifiers: { mod: string; cluster: Cluster; intent: string }[] = [
    { mod: '', cluster: 'money', intent: 'Direkte Suche' },
    { mod: 'Kosten', cluster: 'kosten', intent: 'Kostenseite' },
    { mod: 'beantragen', cluster: 'pflegegrad', intent: 'Antrag' },
    { mod: 'sofort', cluster: 'emergency', intent: 'Akut' },
    { mod: 'in meiner Nähe', cluster: 'near-me', intent: 'Geo' },
    { mod: 'für Angehörige', cluster: 'angehoerige', intent: 'Angehörigen-Suche' },
    { mod: 'erfahren', cluster: 'trust', intent: 'Erfahrung/Trust' },
    { mod: 'Pflegegrad 2', cluster: 'pflegegrad', intent: 'PG-2-Bezug' },
    { mod: 'Pflegegrad 3', cluster: 'pflegegrad', intent: 'PG-3-Bezug' },
    { mod: 'zuhause', cluster: 'longtail', intent: 'Setting' },
  ]

  const out: KeywordEntry[] = []
  for (const svc of SERVICES) {
    for (const loc of LOCATIONS) {
      for (const m of modifiers) {
        const kw = m.mod
          ? `${svc.title} ${loc.name} ${m.mod}`.trim()
          : `${svc.title} ${loc.name}`
        const url = `/leistungen/${svc.slug}/${loc.slug}/`
        out.push({
          keyword: kw,
          cluster: m.cluster,
          priority: loc.tier === 'primary' && !m.mod ? 5 : loc.tier === 'primary' ? 4 : 3,
          conversionValue: !m.mod ? 5 : m.cluster === 'kosten' || m.cluster === 'angehoerige' ? 3 : 4,
          funnel: m.cluster === 'emergency' ? 'transactional' : m.cluster === 'kosten' ? 'awareness' : 'consideration',
          intent: m.intent,
          url,
          pageType: 'service-city',
          schema: ['Service', 'FAQPage', 'WebPage'],
          internalLinkTargets: [`/pflegedienst-${loc.slug}/`, `/leistungen/${svc.slug}/`],
        })
      }
    }
  }
  return out
}

export function allKeywords(): KeywordEntry[] {
  return [...seedKeywords, ...expandKeywords()]
}

/** Helper für Reports: Anzahl + Cluster-Verteilung. */
export function keywordStats() {
  const all = allKeywords()
  const byCluster = new Map<Cluster, number>()
  for (const k of all) byCluster.set(k.cluster, (byCluster.get(k.cluster) ?? 0) + 1)
  return {
    total: all.length,
    byCluster: Object.fromEntries(byCluster),
  }
}
