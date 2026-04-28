/**
 * Single source of truth für SEO-relevante Stamm- und NAP-Daten.
 *
 * Wird ausgewertet von:
 *  - app/layout.tsx (metadataBase, Default-Metadata)
 *  - app/sitemap.ts, app/robots.ts
 *  - lib/seo/jsonld.ts (LocalBusiness, Organization, MedicalBusiness)
 *  - allen Seiten, die canonical / OG / Schema injizieren
 *
 * NAP (Name / Adresse / Telefon) MUSS hier zentral gepflegt werden,
 * weil jede Inkonsistenz im Web (GBP, Citations, Schema, Footer) Local-SEO
 * direkt beschädigt. Niemals an mehreren Stellen hardcoden.
 */

export const SITE = {
  /** Brand-Name wie in Schema, OG, Title-Template. */
  name: 'IMPULS Ambulanter Pflegedienst',
  shortName: 'IMPULS Pflege',
  legalName: 'IMPULS Ambulanter Pflegedienst',

  /** Kanonische Domain. Live: impuls-unna.de. */
  domain: 'www.impuls-unna.de',
  url: 'https://www.impuls-unna.de',

  /** Brand-/Legal-Email (technisch noch impuls-pflege.de — bewusst beibehalten). */
  email: 'info@impuls-pflege.de',

  /** Haupt-Telefon, einheitlich formatiert (E.164 für tel:, lokal für Anzeige). */
  phoneE164: '+4923032920589',
  phoneDisplay: '02303 2920589',

  /**
   * Faxnummer für formelle Kommunikation mit Krankenkassen, Ärzt:innen,
   * Krankenhäusern und Behörden. Schema.org-tauglich (faxNumber).
   */
  faxE164: '+4923032920587',
  faxDisplay: '02303 2920587',

  /** Hauptstandort-Adresse (Sitz / Pflegestation). */
  street: 'Massener Straße 147',
  postalCode: '59423',
  city: 'Unna',
  region: 'Nordrhein-Westfalen',
  regionCode: 'DE-NW',
  country: 'DE',

  /** Geo-Koordinaten (für Schema / Maps). Massener Str. 147, Unna. */
  geo: {
    latitude: 51.5278,
    longitude: 7.6884,
  },

  openingHoursDisplay:
    'Mo–Fr: 08:00–16:00 Uhr · Telefonische Erreichbarkeit: rund um die Uhr',

  /**
   * Schema.org-konforme Öffnungszeiten. Pflegestation Mo–Fr;
   * 24/7-Erreichbarkeit wird separat über `availableService` ausgedrückt,
   * damit Google nicht „immer offen" als Geschäftsöffnung interpretiert.
   */
  openingHoursSpec: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '16:00' },
  ],

  social: {
    facebook: '',
    instagram: '',
    youtube: '',
    linkedin: '',
  },

  /** Default-OG-Bild (1200×630). */
  defaultOgImage: '/images/og-impuls-default.jpg',

  /** Pflege-Kassen / Versorgungsverträge (für Trust-Signale & FAQ). */
  insuranceContracts: [
    'Versorgungsvertrag nach § 72 SGB XI',
    'Abrechnung mit allen gesetzlichen Pflegekassen',
    'Abrechnung mit privaten Pflegeversicherungen',
    'Abrechnung mit Beihilfestellen',
  ],
} as const

export type SiteConfig = typeof SITE

export const ABSOLUTE_URL = (path = '/') => {
  const trimmed = path.startsWith('/') ? path : `/${path}`
  return `${SITE.url}${trimmed}`
}
