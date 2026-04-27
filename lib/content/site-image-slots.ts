/** Feste Schlüssel für steuerbare Website-Fotos (Pfade relativ zu /public oder https-URLs). */

export type SiteImageSlot = {
  key: string
  /** Kurzes UI-Label (Admin). */
  label: string
  defaultSrc: string
}

/**
 * Persistiertes Bild eines Slots. Speichert zusätzlich zum Pfad einen
 * Fokuspunkt (0–100 in %), damit das Bild bei `object-fit: cover`
 * an verschiedenen Aspect-Ratios immer den vom Kunden gewünschten
 * Bildmittelpunkt zeigt.
 */
export type SiteImageEntry = {
  src: string
  /** Horizontaler Fokus in %, 0 = links, 100 = rechts. Default 50. */
  focusX: number
  /** Vertikaler Fokus in %, 0 = oben, 100 = unten. Default 50. */
  focusY: number
}

export const SITE_IMAGE_SLOTS: SiteImageSlot[] = [
  { key: 'heroDesktop', label: 'Start · Hero Desktop', defaultSrc: '/images/hero-care.jpg' },
  { key: 'heroMobile', label: 'Start · Hero Mobil', defaultSrc: '/images/hero-care-mobile.jpg' },
  { key: 'introEditorial', label: 'Start · Intro', defaultSrc: '/images/care-editorial.jpg' },
  { key: 'trustFeature', label: 'Start · Vertrauen', defaultSrc: '/images/care-hands.jpg' },
  { key: 'servicesHero', label: 'Start · Leistungen', defaultSrc: '/images/care-services-hero.jpg' },
  { key: 'processNurse', label: 'Start · Ablauf', defaultSrc: '/images/care-process-nurse.jpg' },
  { key: 'qualitySupport', label: 'Start · Qualität', defaultSrc: '/images/care-support.jpg' },
  { key: 'careerTeam', label: 'Start · Karriere', defaultSrc: '/images/care-team.jpg' },
  { key: 'aboutHero', label: 'Über uns · Hero', defaultSrc: '/images/about-hero.jpg' },
  { key: 'ueberTogether', label: 'Über uns · Gemeinsam', defaultSrc: '/images/care-together.jpg' },
  { key: 'ueberValues', label: 'Über uns · Werte', defaultSrc: '/images/care-values.jpg' },
  { key: 'ueberPortrait', label: 'Über uns · Porträt', defaultSrc: '/images/team-elena-tschupina.jpg' },
  { key: 'ueberTeamGroup', label: 'Über uns · Team', defaultSrc: '/images/care-team-group.jpg' },
  { key: 'ueberRegional', label: 'Über uns · Region', defaultSrc: '/images/care-regional.jpg' },
  { key: 'leistungenPageHero', label: 'Leistungen · Hero', defaultSrc: '/images/care-leistungen-hero.jpg' },
  { key: 'leistungGrundpflege', label: 'Leistung · Grundpflege', defaultSrc: '/images/care-grundpflege.jpg' },
  { key: 'leistungBehandlungspflege', label: 'Leistung · Behandlung', defaultSrc: '/images/care-behandlungspflege.jpg' },
  { key: 'leistungBetreuung', label: 'Leistung · Betreuung', defaultSrc: '/images/care-betreuung.jpg' },
  { key: 'leistungHauswirtschaft', label: 'Leistung · Hauswirtschaft', defaultSrc: '/images/care-hauswirtschaft.jpg' },
  { key: 'leistungBeratung', label: 'Leistung · Beratung', defaultSrc: '/images/care-beratung.jpg' },
  { key: 'leistungZuhause', label: 'Leistung · Zuhause', defaultSrc: '/images/care-zuhause.jpg' },
  { key: 'karriereHero', label: 'Karriere · Hero', defaultSrc: '/images/care-karriere-hero.jpg' },
  { key: 'karriereSmile', label: 'Karriere · Motiv', defaultSrc: '/images/care-smile.jpg' },
]

const DEFAULT_FOCUS_X = 50
const DEFAULT_FOCUS_Y = 50

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

function normalizeFocus(value: unknown, fallback: number): number {
  if (typeof value !== 'number' || Number.isNaN(value)) return fallback
  return clamp(Math.round(value * 10) / 10, 0, 100)
}

/**
 * Liest einen rohen Slot-Wert (String oder Objekt) als normalisierten Eintrag.
 * Akzeptiert die historische String-Form für Rückwärtskompatibilität.
 */
function readEntry(raw: unknown, fallbackSrc: string): SiteImageEntry {
  if (typeof raw === 'string' && raw.trim()) {
    return { src: raw.trim(), focusX: DEFAULT_FOCUS_X, focusY: DEFAULT_FOCUS_Y }
  }
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    const obj = raw as Record<string, unknown>
    const src =
      typeof obj.src === 'string' && obj.src.trim() ? obj.src.trim() : fallbackSrc
    return {
      src,
      focusX: normalizeFocus(obj.focusX, DEFAULT_FOCUS_X),
      focusY: normalizeFocus(obj.focusY, DEFAULT_FOCUS_Y),
    }
  }
  return { src: fallbackSrc, focusX: DEFAULT_FOCUS_X, focusY: DEFAULT_FOCUS_Y }
}

/** Map mit Default-Quellen (ohne Fokus). Wird vom Seed verwendet. */
export function defaultSiteImageMap(): Record<string, string> {
  return Object.fromEntries(SITE_IMAGE_SLOTS.map((s) => [s.key, s.defaultSrc]))
}

/** Default-Map mit voll ausgeprägten Einträgen inkl. Fokus 50/50. */
export function defaultSiteImageEntries(): Record<string, SiteImageEntry> {
  return Object.fromEntries(
    SITE_IMAGE_SLOTS.map((s) => [
      s.key,
      { src: s.defaultSrc, focusX: DEFAULT_FOCUS_X, focusY: DEFAULT_FOCUS_Y },
    ]),
  )
}

/**
 * Merged gespeicherten Content (alt: Record<string, string>, neu:
 * Record<string, SiteImageEntry>) zu reinen Pfaden.
 *
 * Bleibt erhalten als kleiner Komfort-Helper für Konsumenten,
 * die nur die URL brauchen.
 */
export function mergeSiteImageContent(content: unknown): Record<string, string> {
  const entries = mergeSiteImageEntries(content)
  return Object.fromEntries(
    Object.entries(entries).map(([k, v]) => [k, v.src]),
  )
}

/**
 * Liefert je Slot einen vollständigen Eintrag inkl. Fokus.
 * Akzeptiert sowohl das alte String-Format als auch das neue Objekt-Format.
 */
export function mergeSiteImageEntries(
  content: unknown,
): Record<string, SiteImageEntry> {
  const base = defaultSiteImageEntries()
  if (!content || typeof content !== 'object' || Array.isArray(content)) return base
  const raw = content as Record<string, unknown>
  for (const slot of SITE_IMAGE_SLOTS) {
    base[slot.key] = readEntry(raw[slot.key], slot.defaultSrc)
  }
  return base
}

/** CSS `object-position`-Wert für `object-fit: cover`. */
export function focusToObjectPosition(
  focusX: number | undefined,
  focusY: number | undefined,
): string {
  const x = clamp(focusX ?? DEFAULT_FOCUS_X, 0, 100)
  const y = clamp(focusY ?? DEFAULT_FOCUS_Y, 0, 100)
  return `${x}% ${y}%`
}

/**
 * Kodiert einen Fokuspunkt als URL-Fragment, sodass alle bestehenden
 * String-Schnittstellen (props vom Typ `string`) ihn transparent
 * weiterreichen können. Wird in `CmsImage` automatisch dekodiert.
 *
 * Beispiel: `/images/care.jpg` mit Fokus 60/30 → `/images/care.jpg#focus=60,30`
 *
 * Hinweis: Das Fragment ist Teil der URL nur clientseitig – Browser und
 * Next.js Image-Loader ignorieren Hash-Anteile beim Netzwerk-Request,
 * wodurch CDN-Caches konstant bleiben.
 */
export function withFocusHash(entry: SiteImageEntry): string {
  if (!entry.src) return ''
  // Defaultfall ohne Hash, damit URLs schlank bleiben.
  if (entry.focusX === DEFAULT_FOCUS_X && entry.focusY === DEFAULT_FOCUS_Y) {
    return entry.src
  }
  // Bestehenden Hash entfernen, neuen anhängen (idempotent).
  const hashIdx = entry.src.indexOf('#')
  const base = hashIdx >= 0 ? entry.src.slice(0, hashIdx) : entry.src
  return `${base}#focus=${entry.focusX},${entry.focusY}`
}

/**
 * Trennt einen evtl. enthaltenen `#focus=x,y`-Hash von der eigentlichen
 * Bildquelle. Liefert immer einen sauberen `src` und (wenn vorhanden) den
 * Fokus.
 */
export function readFocusHash(src: string | undefined | null): {
  src: string
  focusX?: number
  focusY?: number
} {
  if (!src) return { src: '' }
  const hashIdx = src.indexOf('#')
  if (hashIdx < 0) return { src }
  const base = src.slice(0, hashIdx)
  const hash = src.slice(hashIdx + 1)
  const match = /^focus=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)$/.exec(hash)
  if (!match) return { src: base }
  const fx = clamp(parseFloat(match[1]), 0, 100)
  const fy = clamp(parseFloat(match[2]), 0, 100)
  return { src: base, focusX: fx, focusY: fy }
}

/**
 * Wandelt eine Map mit Einträgen in eine Map mit Hash-kodierten Strings um.
 * Verwendet auf den öffentlichen Seiten als Drop-in-Ersatz für
 * `loadSiteImageMap`, ohne dass Sektions-Props geändert werden müssen.
 */
export function entriesToHashMap(
  entries: Record<string, SiteImageEntry>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(entries).map(([k, v]) => [k, withFocusHash(v)]),
  )
}
