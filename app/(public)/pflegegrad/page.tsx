import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PFLEGEGRADE } from '@/lib/seo/pflegegrade'
import { SITE, ABSOLUTE_URL } from '@/lib/seo/site'
import { ldGraph, webPageJsonLd, breadcrumbJsonLd } from '@/lib/seo/jsonld'
import { JsonLd } from '@/components/seo/json-ld'
import { BreadcrumbTrail } from '@/components/seo/breadcrumb-trail'
import { SeoHero } from '@/components/seo/seo-hero'
import { NapBlock } from '@/components/seo/seo-content-blocks'
import { StickyContact } from '@/components/seo/sticky-contact'

export const dynamic = 'force-static'
export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Pflegegrad: Beträge, Antrag, Widerspruch (Stand 2025)',
  description:
    'Alle Pflegegrade 1–5 mit aktuellen Beträgen 2025: Pflegegeld, Pflegesachleistung, Entlastungsbetrag, Verhinderungspflege. Antrag und Widerspruch verständlich erklärt.',
  alternates: { canonical: '/pflegegrad/' },
}

export default function PflegegradHubPage() {
  const pageUrl = ABSOLUTE_URL('/pflegegrad/')
  const breadcrumb = [{ label: 'Pflegegrad', href: '/pflegegrad/', current: true }]

  const ld = ldGraph(
    webPageJsonLd({
      url: pageUrl,
      name: 'Pflegegrade 1–5: Beträge & Antrag (Stand 2025)',
      description: 'Übersicht der Pflegegrade, Beträge und Antragswege.',
      breadcrumb: breadcrumbJsonLd([
        { name: 'Startseite', url: SITE.url },
        { name: 'Pflegegrad', url: pageUrl },
      ]),
    }),
  )

  return (
    <>
      <JsonLd data={ld} />
      <BreadcrumbTrail items={breadcrumb} />

      <SeoHero
        eyebrow="Pflegegrad-Hub"
        h1="Pflegegrade 1–5 verständlich erklärt"
        intro="Welcher Pflegegrad welche Leistungen bringt, wie Sie ihn beantragen und was zu tun ist, wenn die Einstufung zu niedrig ausfällt — fachlich präzise, ohne PR-Sprache."
        phoneE164={SITE.phoneE164}
        phoneDisplay={SITE.phoneDisplay}
        trustChips={['Stand 2025 (PSG-Reform)', 'Beratung kostenfrei', 'Hilfe bei Antrag & Widerspruch']}
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10 xl:px-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PFLEGEGRADE.map((pg) => (
              <Link
                key={pg.slug}
                href={`/pflegegrad/${pg.slug}/`}
                className="group flex flex-col rounded-2xl border border-warm-150 bg-white p-6 transition-all hover:-translate-y-[2px] hover:shadow-[0_22px_44px_-22px_rgba(0,0,0,0.16)]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-[700] uppercase tracking-[0.2em] text-warm-500">
                      {pg.slug.match(/^[0-9]/) ? `Pflegegrad ${pg.slug}` : 'Antrag & Verfahren'}
                    </p>
                    <p className="mt-2 text-[18px] font-[800] leading-tight tracking-[-0.02em] text-warm-900">
                      {pg.title}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-warm-400 transition-colors group-hover:text-warm-700" />
                </div>
                <p className="mt-3 text-[13.5px] leading-[1.65] text-warm-500 line-clamp-3">
                  {pg.subtitle}
                </p>
                {pg.benefits?.pflegegeld && (
                  <p className="mt-4 inline-flex w-fit rounded-full bg-warm-50 px-3 py-1 text-[11.5px] font-[600] text-warm-700">
                    Pflegegeld {pg.benefits.pflegegeld}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NapBlock />
      <StickyContact phoneE164={SITE.phoneE164} phoneDisplay={SITE.phoneDisplay} />
    </>
  )
}
