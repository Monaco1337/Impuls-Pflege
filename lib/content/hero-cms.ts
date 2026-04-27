export type HeroCmsCopy = {
  headline: string
  subheadline: string
  body: string
}

const DEFAULT: HeroCmsCopy = {
  headline: 'Pflege, die Menschen bewegt.',
  subheadline: 'Ein Arbeitsplatz,\nder Sinn schafft.',
  body: 'Wir begleiten Menschen im Alltag – mit Respekt,\nFachwissen und echter Menschlichkeit. Und wir suchen\nPflegekräfte, die genauso denken.',
}

export function mergeHeroContent(content: unknown): HeroCmsCopy {
  const out = { ...DEFAULT }
  if (!content || typeof content !== 'object' || Array.isArray(content)) return out
  const o = content as Record<string, unknown>
  if (typeof o.headline === 'string' && o.headline.trim()) out.headline = o.headline.trim()
  if (typeof o.subheadline === 'string' && o.subheadline.trim()) out.subheadline = o.subheadline.trim()
  if (typeof o.body === 'string' && o.body.trim()) out.body = o.body.trim()
  return out
}
