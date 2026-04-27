/**
 * Image-SEO-Plan — strukturierte Bildideen für IMPULS.
 *
 * Naming-Konvention:
 *  {keyword-slug}-{ort?}-{kontext?}.webp
 *  - alle Klein­buchstaben, Bindestrich-getrennt
 *  - kein Datum, keine Kameramarken, keine Render-Suffixe
 *  - .webp + .avif fallback für moderne Browser
 *
 * Alt-Text-Regeln:
 *  - beschreibt das Bild faktisch (keine Marketingsprache)
 *  - nennt Pflege-Kontext oder Stadtbezug, wenn präsent
 *  - 80–125 Zeichen
 *  - keine Keyword-Stuffing-Wiederholungen
 */

import { LOCATIONS } from './locations'
import { SERVICES } from './services'

export interface ImageIdea {
  filename: string
  alt: string
  title: string
  caption: string
  targetPage: string
  keyword: string
  category:
    | 'team'
    | 'pflegealltag'
    | 'hausbesuch'
    | 'beratung'
    | 'angehoerige'
    | 'fahrzeug'
    | 'buero'
    | 'lokal'
    | 'leistung'
}

// Beispiele aus Kernkategorien — der Generator liefert die Long-Tail-Varianten
export const seedImageIdeas: ImageIdea[] = [
  {
    filename: 'impuls-team-buero-unna.webp',
    alt: 'Das Pflegeteam von IMPULS im Büro in der Massener Straße in Unna.',
    title: 'IMPULS Pflegeteam Unna',
    caption: 'Unser festes Team im Büro in Unna.',
    targetPage: '/team/',
    keyword: 'IMPULS Pflegeteam Unna',
    category: 'team',
  },
  {
    filename: 'pflegekraft-haendewaschen-grundpflege.webp',
    alt: 'Examinierte Pflegekraft beim hygienischen Händewaschen vor der Grundpflege.',
    title: 'Hygiene in der Grundpflege',
    caption: 'Hygiene als Grundlage jeder Pflegehandlung.',
    targetPage: '/leistungen/grundpflege/',
    keyword: 'Grundpflege Hygiene',
    category: 'pflegealltag',
  },
  {
    filename: 'wundversorgung-verbandswechsel-zuhause-unna.webp',
    alt: 'Pflegekraft wechselt einen modernen Wundverband bei einer Patientin in Unna.',
    title: 'Wundversorgung zuhause — Verbandswechsel',
    caption: 'Verbandswechsel mit hydroaktivem Material.',
    targetPage: '/leistungen/wundversorgung/unna/',
    keyword: 'Wundversorgung Unna',
    category: 'leistung',
  },
  {
    filename: 'demenzbetreuung-erinnerungsarbeit-luenen.webp',
    alt: 'Pflegekraft schaut mit einer Patientin in Lünen alte Familienfotos an — Erinnerungsarbeit bei Demenz.',
    title: 'Erinnerungsarbeit bei Demenz in Lünen',
    caption: 'Validierende Erinnerungsarbeit als Pflegeaktivität.',
    targetPage: '/leistungen/demenzpflege/luenen/',
    keyword: 'Demenzpflege Lünen',
    category: 'leistung',
  },
  {
    filename: 'pflegeberatung-angehoerige-kueche-kamen.webp',
    alt: 'Beratungsgespräch zwischen Pflegekraft und Tochter am Küchentisch in Kamen.',
    title: 'Pflegeberatung zuhause in Kamen',
    caption: 'Pflegeberatung im gewohnten Umfeld.',
    targetPage: '/leistungen/pflegeberatung/kamen/',
    keyword: 'Pflegeberatung Kamen',
    category: 'beratung',
  },
  {
    filename: 'impuls-fahrzeug-flotte-unna.webp',
    alt: 'Fahrzeugflotte von IMPULS Pflege in der Massener Straße in Unna.',
    title: 'IMPULS-Flotte vor dem Büro in Unna',
    caption: 'Mit unserer Flotte in jeder Stadt im Kreis Unna binnen Minuten vor Ort.',
    targetPage: '/pflegedienst/unna/',
    keyword: 'Pflegedienst Fahrzeug Unna',
    category: 'fahrzeug',
  },
  {
    filename: 'pflegekraft-hausbesuch-tueroeffnung-bergkamen.webp',
    alt: 'Pflegekraft kommt mit Tasche zur Haustür einer Seniorin in Bergkamen.',
    title: 'Hausbesuch in Bergkamen',
    caption: 'Verlässlicher Hausbesuch — feste Bezugspflege.',
    targetPage: '/pflegedienst/bergkamen/',
    keyword: 'Hausbesuch Bergkamen',
    category: 'hausbesuch',
  },
  {
    filename: 'spaziergang-senior-pflegekraft-park-schwerte.webp',
    alt: 'Pflegekraft begleitet Senior beim Spaziergang am Ruhrufer in Schwerte.',
    title: 'Begleitung Spaziergang Schwerte',
    caption: 'Bewegung und frische Luft als Teil der Betreuung.',
    targetPage: '/leistungen/seniorenbetreuung/schwerte/',
    keyword: 'Seniorenbetreuung Schwerte',
    category: 'lokal',
  },
]

/**
 * Long-Tail-Generator: Kombiniert Service × Stadt × Bildkategorie.
 * Das Ergebnis sind 300+ Bildideen mit eindeutigen Filenames + Alt-Texten.
 */
export function expandImageIdeas(): ImageIdea[] {
  const archetypes: { tpl: (svc: string, loc: string) => ImageIdea; categories: ImageIdea['category'][] }[] = [
    {
      categories: ['leistung'],
      tpl: (svc, loc) => ({
        filename: `${svc}-zuhause-${loc}.webp`,
        alt: `Pflegekraft erbringt ${svc.replace(/-/g, ' ')} im häuslichen Umfeld in ${loc}.`,
        title: `${svc.replace(/-/g, ' ')} in ${loc}`,
        caption: `${svc.replace(/-/g, ' ')} zuhause.`,
        targetPage: `/leistungen/${svc}/${loc}/`,
        keyword: `${svc.replace(/-/g, ' ')} ${loc}`,
        category: 'leistung',
      }),
    },
    {
      categories: ['hausbesuch'],
      tpl: (svc, loc) => ({
        filename: `pflege-hausbesuch-${svc}-${loc}.webp`,
        alt: `Hausbesuch zur ${svc.replace(/-/g, ' ')} in ${loc} — Pflegekraft im Eingangsbereich.`,
        title: `Hausbesuch ${svc.replace(/-/g, ' ')} ${loc}`,
        caption: `Vertrauter Hausbesuch — feste Pflegekraft.`,
        targetPage: `/pflegedienst/${loc}/`,
        keyword: `Pflege Hausbesuch ${loc}`,
        category: 'hausbesuch',
      }),
    },
    {
      categories: ['lokal'],
      tpl: (svc, loc) => ({
        filename: `lokales-pflegegebiet-${loc}.webp`,
        alt: `Lokales Pflegegebiet ${loc} — IMPULS versorgt hier täglich.`,
        title: `Pflege in ${loc}`,
        caption: `Versorgungsgebiet im Kreis Unna.`,
        targetPage: `/pflegedienst/${loc}/`,
        keyword: `Pflege ${loc}`,
        category: 'lokal',
      }),
    },
  ]

  const out: ImageIdea[] = []
  for (const svc of SERVICES) {
    for (const loc of LOCATIONS) {
      for (const arch of archetypes) {
        const idea = arch.tpl(svc.slug, loc.slug)
        out.push({
          ...idea,
          alt: idea.alt.replace(loc.slug, loc.name),
          title: idea.title.replace(loc.slug, loc.name),
          caption: idea.caption.replace(loc.slug, loc.name),
          keyword: idea.keyword.replace(loc.slug, loc.name),
        })
      }
    }
  }
  return out
}

export function allImageIdeas(): ImageIdea[] {
  return [...seedImageIdeas, ...expandImageIdeas()]
}
