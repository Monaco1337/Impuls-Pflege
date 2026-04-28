/** Deutsche Labels & Editor-Hinweise für einfache Text-Inhaltsblöcke (Admin). */

export type CmsFieldMeta = {
  label: string
  hint?: string
  rows?: number
  wide?: boolean
}

const HERO: Record<string, CmsFieldMeta> = {
  headline: { label: 'Headline (erste Zeile)', rows: 2, wide: true },
  subheadline: {
    label: 'Subline (zweite Zeile, mint)',
    hint: 'Zeilenumbruch mit Enter (optional).',
    rows: 3,
    wide: true,
  },
  body: {
    label: 'Fließtext unter den Zeilen',
    hint: 'Zeilenumbrüche werden angezeigt.',
    rows: 5,
    wide: true,
  },
}

const INTRO: Record<string, CmsFieldMeta> = {
  eyebrow: { label: 'Kleine Überschrift (Eyebrow)' },
  headline: {
    label: 'Headline',
    hint: 'Erste Zeile normal, ab erster Zeilenschaltung zweiter Teil in Mint.',
    rows: 3,
    wide: true,
  },
  body: {
    label: 'Text (ein oder zwei Absätze)',
    hint: 'Zwei Absätze: mit Leerzeile (doppelter Enter) trennen.',
    rows: 8,
    wide: true,
  },
  quote: { label: 'Zitat (Kasten)', rows: 4, wide: true },
  quoteBy: { label: 'Zitat-Quelle / Label' },
}

const CONTACT: Record<string, CmsFieldMeta> = {
  phone: { label: 'Telefon (Anzeige)', hint: 'Wird im Header, Footer und auf Kontakt verwendet.' },
  fax: {
    label: 'Fax',
    hint: 'Wird im Footer, auf Kontakt und im Impressum/Datenschutz angezeigt. Leer lassen, um die Faxzeile auszublenden.',
  },
  email: { label: 'E-Mail' },
  address: { label: 'Adresse (eine Zeile)', rows: 2, wide: true },
  hours: {
    label: 'Erreichbarkeit / Bürozeiten',
    hint: 'Mehrzeilig möglich (z. B. erste Zeile Büro, zweite Zeile Telefon).',
    rows: 4,
    wide: true,
  },
}

const BY_BLOCK: Record<string, Record<string, CmsFieldMeta>> = {
  hero: HERO,
  intro: INTRO,
  'contact-info': CONTACT,
}

export function cmsFieldMeta(blockKey: string, fieldKey: string): CmsFieldMeta | undefined {
  return BY_BLOCK[blockKey]?.[fieldKey]
}
