'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Phone, MessageSquare } from 'lucide-react'

/**
 * Sticky Conversion-Bar für SEO-Landingpages (Stadt-/Service-Seiten).
 *
 * Erscheint nach 320 px Scroll, mobil unten als Bar, Desktop unten links.
 * Wichtig: Telefonnummer per `tel:` (mobil-Click-to-Call), Sekundärziel
 * Kontaktformular. Kein WhatsApp-Default — Pflege-Kontext erfordert
 * Datenschutz-/Konsent-Sensibilität, das gehört nicht in eine globale
 * Sticky-Bar.
 */

export function StickyContact({ phoneE164, phoneDisplay }: { phoneE164: string; phoneDisplay: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 320)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 sm:bottom-6 sm:right-6 sm:left-auto">
      <div
        className="pointer-events-auto mx-auto flex w-full max-w-[920px] items-stretch justify-between gap-0 border-t border-warm-150 bg-white shadow-[0_-12px_36px_-12px_rgba(0,0,0,0.18)] sm:max-w-[420px] sm:rounded-2xl sm:border sm:shadow-[0_18px_44px_-18px_rgba(0,0,0,0.22)]"
        role="region"
        aria-label="Kontakt"
      >
        <a
          href={`tel:${phoneE164}`}
          className="flex flex-1 items-center justify-center gap-2 px-5 py-4 text-[14px] font-[700] text-white transition-colors sm:rounded-l-2xl"
          style={{ background: '#18C1A3' }}
        >
          <Phone className="h-4 w-4" strokeWidth={2.4} />
          <span className="hidden sm:inline">{phoneDisplay}</span>
          <span className="sm:hidden">Anrufen</span>
        </a>
        <Link
          href="/kontakt/"
          className="flex flex-1 items-center justify-center gap-2 border-l border-warm-150 px-5 py-4 text-[14px] font-[600] text-warm-800 transition-colors hover:bg-warm-50 sm:rounded-r-2xl"
        >
          <MessageSquare className="h-4 w-4" strokeWidth={2} />
          <span>Rückruf</span>
        </Link>
      </div>
    </div>
  )
}
