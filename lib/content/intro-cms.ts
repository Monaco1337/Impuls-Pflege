export type IntroCmsCopy = {
  eyebrow: string
  headline: string
  body: string
  quote: string
  quoteBy: string
}

const DEFAULT: IntroCmsCopy = {
  eyebrow: 'Über IMPULS',
  headline: 'Menschlichkeit ist\nkeine Zusatzleistung.',
  body:
    'IMPULS ist mehr als ein Pflegedienst. Wir sind der verlässliche\nBegleiter, der morgens da ist – und der am Abend ans Telefon geht.\n\nJede Beziehung bei uns beginnt mit Zuhören. Wir lernen zuerst den\nMenschen kennen – erst dann entsteht der Pflegeplan. Weil echte\nFürsorge nur wächst, wenn Vertrauen an erster Stelle steht.',
  quote:
    '„Pflege ist dann wirklich gut, wenn man vergisst, dass man gepflegt wird – und nur noch spürt, dass jemand wirklich für einen da ist."',
  quoteBy: 'Das IMPULS-Versprechen',
}

export function mergeIntroContent(content: unknown): IntroCmsCopy {
  const out = { ...DEFAULT }
  if (!content || typeof content !== 'object' || Array.isArray(content)) return out
  const o = content as Record<string, unknown>
  if (typeof o.eyebrow === 'string' && o.eyebrow.trim()) out.eyebrow = o.eyebrow.trim()
  if (typeof o.headline === 'string' && o.headline.trim()) out.headline = o.headline.trim()
  if (typeof o.body === 'string' && o.body.trim()) out.body = o.body.trim()
  if (typeof o.quote === 'string' && o.quote.trim()) out.quote = o.quote.trim()
  if (typeof o.quoteBy === 'string' && o.quoteBy.trim()) out.quoteBy = o.quoteBy.trim()
  return out
}
