/** Wandelt eine deutsch formatierte Rufnummer in einen tel:-Link (E.164 +49). */
export function telHrefFromDisplay(phone: string): string {
  return phoneHrefFromDisplay(phone, 'tel')
}

/** Wandelt eine deutsch formatierte Faxnummer in einen fax:-Link (E.164 +49). */
export function faxHrefFromDisplay(fax: string): string {
  return phoneHrefFromDisplay(fax, 'fax')
}

function phoneHrefFromDisplay(value: string, scheme: 'tel' | 'fax'): string {
  const digits = value.replace(/\D/g, '')
  if (!digits) return '#'
  if (digits.startsWith('49')) return `${scheme}:+${digits}`
  if (digits.startsWith('0')) return `${scheme}:+49${digits.slice(1)}`
  return `${scheme}:+${digits}`
}
