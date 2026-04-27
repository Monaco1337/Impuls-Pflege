import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { type PflegeService } from '@/lib/seo/services'
import { type LocationData } from '@/lib/seo/locations'

/**
 * Cross-Link-Grid: Auf einer Stadtseite zeigt es alle Leistungen in dieser
 * Stadt; auf einer Leistungsseite zeigt es dieselbe Leistung in allen Städten.
 *
 * Bewusst keine Doorway-Tag-Cloud, sondern beschreibende Links mit kurzem
 * Kontext-Snippet, damit Google die Cross-Links als Relevanz, nicht als Spam
 * versteht.
 */

interface ServiceLinkGridProps {
  title: string
  intro: string
  links: { href: string; title: string; subtitle: string }[]
  columns?: 2 | 3
}

export function ServiceLinkGrid({ title, intro, links, columns = 3 }: ServiceLinkGridProps) {
  const colClass = columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'
  return (
    <section className="bg-warm-50/40 py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10 xl:px-14">
        <div className="max-w-[720px]">
          <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-[800] leading-[1.1] tracking-[-0.04em] text-warm-900">
            {title}
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.8] text-warm-600">{intro}</p>
        </div>
        <ul className={`mt-10 grid grid-cols-1 gap-3 ${colClass}`}>
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-warm-150 bg-white p-5 transition-all hover:-translate-y-[2px] hover:border-warm-200 hover:shadow-[0_18px_38px_-22px_rgba(0,0,0,0.18)]"
              >
                <div className="min-w-0">
                  <p className="text-[14.5px] font-[700] text-warm-900">{l.title}</p>
                  <p className="mt-1 text-[13px] leading-[1.6] text-warm-500">{l.subtitle}</p>
                </div>
                <ArrowUpRight
                  className="mt-0.5 h-4 w-4 shrink-0 text-warm-400 transition-colors group-hover:text-warm-700"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Helper: alle Leistungen verlinken, optional an einen Stadt-Slug gebunden. */
export function buildServiceLinksForCity(services: PflegeService[], citySlug: string) {
  return services.map((s) => ({
    href: `/leistungen/${s.slug}/${citySlug}/`,
    title: s.title,
    subtitle: s.short,
  }))
}

/** Helper: Eine Leistung gegen alle Städte cross-linken. */
export function buildCityLinksForService(serviceSlug: string, locations: LocationData[]) {
  return locations.map((l) => ({
    href: `/leistungen/${serviceSlug}/${l.slug}/`,
    title: `In ${l.name}`,
    subtitle: l.intro.length > 110 ? `${l.intro.slice(0, 107)}…` : l.intro,
  }))
}

/** Helper: Stadtseite — Liste aller Städte (Stadt-Hub-Cross-Linking). */
export function buildCityHubLinks(locations: LocationData[]) {
  return locations.map((l) => ({
    href: `/pflegedienst/${l.slug}/`,
    title: `Pflegedienst ${l.name}`,
    subtitle: l.intro.length > 110 ? `${l.intro.slice(0, 107)}…` : l.intro,
  }))
}
