'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

export interface FaqItem {
  question: string
  answer: string
}

/**
 * Sichtbares FAQ-Akkordeon — semantisch sauber, Single-Open-Pattern.
 * Schema.org FAQPage wird parallel über JsonLd eingespielt, damit
 * Google die Antworten sowohl visuell als auch strukturiert versteht.
 */
export function LocalFaq({ items, title = 'Häufige Fragen' }: { items: FaqItem[]; title?: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[920px] px-6 sm:px-10">
        <h2 className="text-center text-[clamp(1.6rem,3vw,2.4rem)] font-[800] leading-tight tracking-[-0.04em] text-warm-900">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-[640px] text-center text-[15px] leading-[1.7] text-warm-500">
          Antworten auf die wichtigsten Fragen — fachlich präzise, ohne Floskeln.
        </p>

        <div className="mt-10 divide-y divide-warm-150 rounded-2xl border border-warm-150 bg-white">
          {items.map((it, idx) => {
            const isOpen = openIdx === idx
            return (
              <div key={idx} className="px-5 sm:px-7">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left"
                >
                  <span className="text-[15px] font-[600] leading-[1.5] text-warm-900">{it.question}</span>
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-warm-200 bg-warm-50 text-warm-500 transition-colors"
                    aria-hidden="true"
                  >
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                {isOpen && (
                  <div id={`faq-panel-${idx}`} className="pb-6 text-[14.5px] leading-[1.75] text-warm-600">
                    {it.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
