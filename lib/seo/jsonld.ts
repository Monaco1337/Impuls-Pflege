/**
 * JSON-LD-Builder für Schema.org-konforme strukturierte Daten.
 *
 * Wir nutzen `@id`-Anker, damit Google die Entitäten verknüpfen kann
 * (Organization → LocalBusiness → Service → FAQPage → WebPage).
 * Das ist der Unterschied zwischen "Schema da" und "Schema verstanden".
 */

import { SITE, ABSOLUTE_URL } from './site'
import { PRIMARY_LOCATIONS, SECONDARY_LOCATIONS, type LocationData } from './locations'
import type { PflegeService } from './services'

const ORG_ID = `${SITE.url}#organization`
const PLACE_ID = `${SITE.url}#place`
const LB_ID = `${SITE.url}#localbusiness`

/** Organization (für Knowledge Panel + Brand-Anbindung). */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: ABSOLUTE_URL('/images/impuls-logo.png'),
    image: ABSOLUTE_URL(SITE.defaultOgImage),
    email: SITE.email,
    telephone: SITE.phoneE164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.street,
      postalCode: SITE.postalCode,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    sameAs: Object.values(SITE.social).filter(Boolean),
  } as const
}

/**
 * MedicalBusiness + LocalBusiness (Dual-Type) für maximale Local-Pack-
 * und Health-Knowledge-Signal-Kompatibilität. Schema.org erlaubt beides.
 */
export function localBusinessJsonLd() {
  const allLocations = [...PRIMARY_LOCATIONS, ...SECONDARY_LOCATIONS]
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'MedicalBusiness', 'HomeAndConstructionBusiness'],
    '@id': LB_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    image: [ABSOLUTE_URL(SITE.defaultOgImage)],
    logo: ABSOLUTE_URL('/images/impuls-logo.png'),
    description:
      'Ambulanter Pflegedienst im Kreis Unna mit Sitz in Unna. Grundpflege, Behandlungspflege, Demenzbetreuung, Pflegeberatung und Verhinderungspflege — durch festes, examiniertes Pflegeteam. Versorgungs­vertrag § 72 SGB XI.',
    email: SITE.email,
    telephone: SITE.phoneE164,
    priceRange: '€€',
    medicalSpecialty: ['Geriatrics', 'PrimaryCare'],
    address: {
      '@id': PLACE_ID + '#address',
      '@type': 'PostalAddress',
      streetAddress: SITE.street,
      postalCode: SITE.postalCode,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: allLocations.map((l) => ({
      '@type': 'City',
      name: l.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Kreis Unna',
      },
    })),
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: SITE.geo.latitude,
        longitude: SITE.geo.longitude,
      },
      geoRadius: 25000,
    },
    openingHoursSpecification: SITE.openingHoursSpec.map((o) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: o.dayOfWeek,
      opens: o.opens,
      closes: o.closes,
    })),
    sameAs: Object.values(SITE.social).filter(Boolean),
    parentOrganization: { '@id': ORG_ID },
    hasCredential: SITE.insuranceContracts.map((label) => ({
      '@type': 'EducationalOccupationalCredential',
      name: label,
    })),
  } as const
}

/** Service (LocalBusiness offering — eine bestimmte Leistung). */
export function serviceJsonLd(service: PflegeService, location?: LocationData) {
  const url = location
    ? ABSOLUTE_URL(`/leistungen/${service.slug}/${location.slug}/`)
    : ABSOLUTE_URL(`/leistungen/${service.slug}/`)
  const name = location ? `${service.title} in ${location.name}` : service.title
  const description = location
    ? `${service.short} — angeboten in ${location.name} und Umgebung durch IMPULS Ambulanter Pflegedienst.`
    : service.short
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    serviceType: service.title,
    name,
    description,
    provider: { '@id': LB_ID },
    areaServed: location
      ? {
          '@type': 'City',
          name: location.name,
          containedInPlace: { '@type': 'AdministrativeArea', name: 'Kreis Unna' },
        }
      : { '@type': 'AdministrativeArea', name: 'Kreis Unna' },
    url,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      url,
      eligibleRegion: {
        '@type': 'Country',
        name: 'Deutschland',
      },
    },
  } as const
}

/** FAQPage Schema (mit @id für WebPage-Verknüpfung). */
export function faqJsonLd(pageUrl: string, faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  } as const
}

/** BreadcrumbList. */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : ABSOLUTE_URL(it.url),
    })),
  } as const
}

/** WebPage (mit BreadcrumbList und potenziellen FAQ-Verknüpfungen). */
export function webPageJsonLd(args: {
  url: string
  name: string
  description: string
  breadcrumb?: ReturnType<typeof breadcrumbJsonLd>
  primaryImage?: string
  isPartOf?: string
  about?: { name: string; sameAs?: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${args.url}#webpage`,
    url: args.url,
    name: args.name,
    description: args.description,
    inLanguage: 'de-DE',
    isPartOf: { '@id': `${SITE.url}#website` },
    primaryImageOfPage: args.primaryImage
      ? {
          '@type': 'ImageObject',
          url: args.primaryImage.startsWith('http') ? args.primaryImage : ABSOLUTE_URL(args.primaryImage),
        }
      : undefined,
    breadcrumb: args.breadcrumb,
    about: args.about,
    publisher: { '@id': ORG_ID },
  } as const
}

/** WebSite (Site-Search optional). */
export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: 'de-DE',
    publisher: { '@id': ORG_ID },
  } as const
}

/** Article (für Ratgeber-Hub-Beiträge). */
export function articleJsonLd(args: {
  url: string
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${args.url}#article`,
    headline: args.headline,
    description: args.description,
    image: args.image.startsWith('http') ? args.image : ABSOLUTE_URL(args.image),
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    author: { '@type': 'Organization', name: SITE.name, '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@id': `${args.url}#webpage` },
  } as const
}

/** Helper: Mehrere LD-Objekte zu einem Graph zusammenfassen. */
export function ldGraph(...nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.map((n) => {
      const copy = { ...n } as Record<string, unknown>
      delete copy['@context']
      return copy
    }),
  }
}
