/** Wandelt eine deutsch formatierte Rufnummer in einen tel:-Link (E.164 +49). */
export function telHrefFromDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (!digits) return '#'
  if (digits.startsWith('49')) return `tel:+${digits}`
  if (digits.startsWith('0')) return `tel:+49${digits.slice(1)}`
  return `tel:+${digits}`
}
