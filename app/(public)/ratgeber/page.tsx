import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { RATGEBER } from '@/lib/seo/ratgeber'
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
  title: 'Ratgeber für pflegende Angehörige',
  description:
    'Verständliche Antworten auf die wichtigsten Fragen pflegender Angehöriger: erste Schritte, Pflegegrad, Kosten, Krankenhaus-Übergang, Entlastung.',
  alternates: { canonical: '/ratgeber/' },
}

export default function RatgeberHubPage() {
  const pageUrl = ABSOLUTE_URL('/ratgeber/')
  const breadcrumb = [{ label: 'Ratgeber', href: '/ratgeber/', current: true }]

  const ld = ldGraph(
    webPageJsonLd({
      url: pageUrl,
      name: 'Ratgeber für pflegende Angehörige',
      description: 'Verständliche Antworten auf die wichtigsten Pflegefragen.',
      breadcrumb: breadcrumbJsonLd([
        { name: 'Startseite', url: SITE.url },
        { name: 'Ratgeber', url: pageUrl },
      ]),
    }),
  )

  return (
    <>
      <JsonLd data={ld} />
      <BreadcrumbTrail items={breadcrumb} />

      <SeoHero
        eyebrow="Ratgeber"
        h1="Ratgeber für pflegende Angehörige"
        intro="Wenn Pflege plötzlich Familienthema wird, hilft Klarheit mehr als Mitleid. Diese Ratgeber sind so geschrieben, wie wir auch im Erstgespräch reden — fachlich, ruhig, ohne Floskeln."
        phoneE164={SITE.phoneE164}
        phoneDisplay={SITE.phoneDisplay}
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10 xl:px-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RATGEBER.map((r) => (
              <Link
                key={r.slug}
                href={`/ratgeber/${r.slug}/`}
                className="group flex h-full flex-col rounded-2xl border border-warm-150 bg-white p-6 transition-all hover:-translate-y-[2px] hover:shadow-[0_22px_44px_-22px_rgba(0,0,0,0.16)]"
              >
                <p className="text-[11px] font-[700] uppercase tracking-[0.2em] text-warm-500">Ratgeber</p>
                <h3 className="mt-2 text-[16.5px] font-[800] leading-[1.25] tracking-[-0.02em] text-warm-900">
                  {r.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.65] text-warm-500 line-clamp-3">{r.intro}</p>
                <div className="mt-auto flex items-center gap-1.5 pt-5 text-[13px] font-[600] text-warm-700">
                  Weiterlesen <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
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
