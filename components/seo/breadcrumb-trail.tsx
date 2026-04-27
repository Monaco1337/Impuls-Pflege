import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href: string
  /** Letztes Element ist immer „aktuelle Seite" und wird nicht verlinkt. */
  current?: boolean
}

/**
 * Sichtbare Breadcrumb-Spur — semantisch via <nav aria-label="breadcrumb">
 * und <ol>. JSON-LD-Breadcrumb wird separat über `breadcrumbJsonLd()`
 * eingespielt, damit Crawler beides sehen: Markup + sichtbare UI.
 */
export function BreadcrumbTrail({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-warm-100 bg-white/60 backdrop-blur-sm">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 xl:px-14">
        <ol className="flex flex-wrap items-center gap-1.5 py-3 text-[13px] text-warm-500">
          <li className="flex items-center gap-1.5">
            <Link href="/" className="flex items-center gap-1 text-warm-500 transition-colors hover:text-warm-800">
              <Home className="h-3.5 w-3.5" />
              <span className="sr-only">Startseite</span>
            </Link>
          </li>
          {items.map((it, idx) => (
            <li key={`${it.href}-${idx}`} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-warm-300" />
              {it.current ? (
                <span aria-current="page" className="font-medium text-warm-800">
                  {it.label}
                </span>
              ) : (
                <Link href={it.href} className="text-warm-500 transition-colors hover:text-warm-800">
                  {it.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
