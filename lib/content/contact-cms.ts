export type PublicContactInfo = {
  phone: string
  /**
   * Faxnummer für Krankenkassen-/Ärzte-Kommunikation. Optional im CMS,
   * Defaultwert wird hier hinterlegt und im Frontend immer mitgerendert,
   * solange er gepflegt ist (leerer String → wird in der Anzeige
   * weggelassen).
   */
  fax: string
  email: string
  address: string
  hours: string
}

const DEFAULT: PublicContactInfo = {
  phone: '02303 2920589',
  fax: '02303 2920587',
  email: 'info@impuls-unna.de',
  address: 'Massener Str. 147, 59423 Unna',
  hours: 'Mo–Fr: 08:00–16:00 Uhr\nTelefonische Erreichbarkeit: Rund um die Uhr',
}

export function mapsHrefFromAddress(address: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(address.trim())}`
}

export function mergeContactContent(content: unknown): PublicContactInfo {
  const out = { ...DEFAULT }
  if (!content || typeof content !== 'object' || Array.isArray(content)) return out
  const o = content as Record<string, unknown>
  if (typeof o.phone === 'string' && o.phone.trim()) out.phone = o.phone.trim()
  // CMS darf `fax` leer setzen, dann blendet der Footer die Zeile aus.
  // Nur explizit gesetzte Strings (auch Leerstring) überschreiben den Default.
  if (typeof o.fax === 'string') out.fax = o.fax.trim()
  if (typeof o.email === 'string' && o.email.trim()) out.email = o.email.trim()
  if (typeof o.address === 'string' && o.address.trim()) out.address = o.address.trim()
  if (typeof o.hours === 'string' && o.hours.trim()) out.hours = o.hours.trim()
  return out
}
