import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SERVICES, getService } from '@/lib/seo/services'
import { LOCATIONS, getLocation } from '@/lib/seo/locations'
import { SITE, ABSOLUTE_URL } from '@/lib/seo/site'
import {
  ldGraph,
  webPageJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  serviceJsonLd,
} from '@/lib/seo/jsonld'
import { JsonLd } from '@/components/seo/json-ld'
import { BreadcrumbTrail } from '@/components/seo/breadcrumb-trail'
import { SeoHero } from '@/components/seo/seo-hero'
import {
  ServiceMethodBlock,
  LocalTrustBlock,
  NapBlock,
} from '@/components/seo/seo-content-blocks'
import {
  ServiceLinkGrid,
  buildServiceLinksForCity,
  buildCityLinksForService,
} from '@/components/seo/service-link-grid'
import { LocalFaq } from '@/components/seo/local-faq'
import { StickyContact } from '@/components/seo/sticky-contact'

/**
 * /leistungen/[leistung]/[stadt]/ — programmatic Long-Tail.
 *
 * Das ist die eigentliche Local-SEO-Macht: 10 Leistungen × 17 Orte
 * = 170 Seiten, jede mit:
 *   - eindeutigem H1 ("Wundversorgung in Lünen")
 *   - lokal verwurzelten Inhalten (Stadtteile, Krankenhäuser, FAQs)
 *   - vollständigem Service-Schema mit Stadt-Bezug
 *   - lokal+thematisch deduplizierten FAQs (Service-FAQ + Stadt-FAQ
 *     mit De-Doublierung über Question-Hash)
 *   - Cross-Links auf alle anderen Leistungen in der Stadt + dieselbe
 *     Leistung in Nachbarstädten
 *
 * Wir vermeiden Doorway-Charakter, indem die Texte echte Pflege-Substanz
 * (SGB, Pflegegrade, Kostenträger) und echte Lokalbezüge (Krankenhaus,
 * Stadtteile, Verkehr) kombinieren — kein „Pflege Stadt-X gut" Spam.
 */

export const dynamic = 'force-static'
export const revalidate = 86400

export async function generateStaticParams() {
  const params: { leistung: string; stadt: string }[] = []
  for (const svc of SERVICES) {
    for (const loc of LOCATIONS) {
      params.push({ leistung: svc.slug, stadt: loc.slug })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ leistung: string; stadt: string }>
}): Promise<Metadata> {
  const { leistung, stadt } = await params
  const svc = getService(leistung)
  const loc = getLocation(stadt)
  if (!svc || !loc) return {}
  const url = ABSOLUTE_URL(`/leistungen/${svc.slug}/${loc.slug}/`)
  const title = `${svc.metaTitleBase} ${loc.name} | ${SITE.shortName}`.slice(0, 60)
  const description = `${svc.metaDescBase} in ${loc.name} und Umgebung — durch IMPULS Ambulanter Pflegedienst.`.slice(0, 160)
  return {
    title,
    description,
    alternates: { canonical: `/leistungen/${svc.slug}/${loc.slug}/` },
    openGraph: {
      url,
      title: `${svc.title} in ${loc.name}`,
      description,
      type: 'website',
      locale: 'de_DE',
      siteName: SITE.name,
    },
  }
}

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ leistung: string; stadt: string }>
}) {
  const { leistung, stadt } = await params
  const svc = getService(leistung)
  const loc = getLocation(stadt)
  if (!svc || !loc) notFound()

  const pageUrl = ABSOLUTE_URL(`/leistungen/${svc.slug}/${loc.slug}/`)

  // De-duplizierte FAQs: erst Service-FAQs, dann Stadt-FAQs (Q-Hash)
  const seen = new Set<string>()
  const mergedFaqs = [...svc.faqs, ...loc.localFaq].filter((f) => {
    const key = f.question.toLowerCase().trim()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  const breadcrumb = [
    { label: 'Leistungen', href: '/leistungen/' },
    { label: svc.title, href: `/leistungen/${svc.slug}/` },
    { label: loc.name, href: `/leistungen/${svc.slug}/${loc.slug}/`, current: true },
  ]

  const ld = ldGraph(
    webPageJsonLd({
      url: pageUrl,
      name: `${svc.title} in ${loc.name}`,
      description: `${svc.short} – angeboten in ${loc.name}.`,
      breadcrumb: breadcrumbJsonLd([
        { name: 'Startseite', url: SITE.url },
        ...breadcrumb.map((b) => ({ name: b.label, url: ABSOLUTE_URL(b.href) })),
      ]),
      about: [{ name: loc.name }, { name: svc.title }],
    }),
    serviceJsonLd(svc, loc),
    faqJsonLd(pageUrl, mergedFaqs),
  )

  // Eindeutiger Intro-Absatz: Service kontextualisiert in der konkreten Stadt
  const intro = `Wenn Sie in ${loc.name} ${svc.name.toLowerCase()} brauchen — sei es in der Innenstadt, in ${loc.districts[0]}${loc.districts.length > 1 ? ` oder ${loc.districts[1]}` : ''} —, sind wir die ortsnahe Wahl. ${svc.short}`

  const otherServiceLinks = buildServiceLinksForCity(
    SERVICES.filter((s) => s.slug !== svc.slug),
    loc.slug,
  )

  // Selbe Leistung in Nachbarstädten — schließt direkte Stadt aus
  const sameServiceNeighborLinks = buildCityLinksForService(
    svc.slug,
    LOCATIONS.filter((l) => loc.neighbors.includes(l.slug)),
  )

  return (
    <>
      <JsonLd data={ld} />
      <BreadcrumbTrail items={breadcrumb} />

      <SeoHero
        eyebrow={`${svc.name} · ${loc.name}`}
        h1={`${svc.title} in ${loc.name}`}
        intro={intro}
        phoneE164={SITE.phoneE164}
        phoneDisplay={SITE.phoneDisplay}
        trustChips={[
          `Versorgung im Kreis Unna seit Jahren`,
          'Erstgespräch kostenfrei',
          `Stadtteile: ${loc.districts.slice(0, 3).join(', ')}`,
        ]}
      />

      <ServiceMethodBlock service={svc} />

      <LocalTrustBlock location={loc} />

      <ServiceLinkGrid
        title={`Weitere Pflege­leistungen in ${loc.name}`}
        intro={`Pflege ist selten nur eine Einzel­leistung. Häufig kombinieren Familien ${svc.name.toLowerCase()} mit weiteren Bausteinen — wir koordinieren das aus einer Hand.`}
        links={otherServiceLinks}
      />

      {sameServiceNeighborLinks.length > 0 && (
        <ServiceLinkGrid
          title={`${svc.title} in Nachbarstädten`}
          intro={`Wir bieten ${svc.name.toLowerCase()} auch in den Nachbarstädten von ${loc.name}.`}
          links={sameServiceNeighborLinks}
          columns={3}
        />
      )}

      <LocalFaq items={mergedFaqs} title={`Häufige Fragen zu ${svc.title} in ${loc.name}`} />

      <NapBlock />

      <StickyContact phoneE164={SITE.phoneE164} phoneDisplay={SITE.phoneDisplay} />
    </>
  )
}
