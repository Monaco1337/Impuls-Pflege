/**
 * Typen für die Vor-Ort-Anamnese-Ergänzung.
 *
 * Diese Felder wurden bewusst aus dem öffentlichen Anamnesebogen entfernt,
 * weil Pflegekräfte sie beim persönlichen Erstgespräch direkt mit Kund:innen
 * besprechen und im Admin-Panel erfassen.
 *
 * Der Block wird inline am `JsonAnamneseSubmission.payload.vorOrt` gespeichert
 * (siehe {@link AnamnesePayload}). Eine separate Tabelle ist bewusst nicht
 * vorgesehen — so ist die Verknüpfung zur Submission ohne Foreign Key garantiert
 * und die Admin-Detailseite zeigt automatisch den vereinten Datensatz.
 */

export type ErgaenzungSchmerzen =
  | 'keine'
  | 'leicht'
  | 'mittel'
  | 'stark'
  | 'sehr_stark'
  | ''

export type ErgaenzungMobilitaetInnen =
  | 'selbststaendig'
  | 'mit_hilfe'
  | 'mit_person'
  | 'immobil'
  | ''

export type ErgaenzungMobilitaetAussen =
  | 'selbststaendig'
  | 'mit_hilfe'
  | 'mit_person'
  | 'nicht_moeglich'
  | ''

export type ErgaenzungSturzrisiko = 'gering' | 'mittel' | 'hoch' | 'unbekannt' | ''

export type ErgaenzungAdlStufe = 'selbststaendig' | 'teilweise' | 'vollstaendig' | ''

export type ErgaenzungOrientierung =
  | 'voll'
  | 'zeitweise'
  | 'stark'
  | 'desorientiert'
  | ''

export type ErgaenzungDemenz = 'nein' | 'leicht' | 'mittel' | 'schwer' | 'unbekannt' | ''

export type ErgaenzungKommunikation =
  | 'uneingeschraenkt'
  | 'eingeschraenkt'
  | 'stark_eingeschraenkt'
  | 'nicht_moeglich'
  | ''

export type ErgaenzungZugang =
  | 'schluessel'
  | 'tresor'
  | 'anwesend'
  | 'sonstiges'
  | ''

/** Der gespeicherte Block. Alles optional — Pflegekraft kann inkrementell befüllen. */
export interface AnamneseErgaenzung {
  /** Konfession (frei). */
  konfession?: string

  /** Gewicht in kg (frei, als String wegen Komma vs. Punkt). */
  gewicht?: string

  /** Schmerzsituation. */
  schmerzen?: ErgaenzungSchmerzen
  schmerzen_ort?: string

  /** Mobilität. */
  mobilitaet_innen?: ErgaenzungMobilitaetInnen
  mobilitaet_aussen?: ErgaenzungMobilitaetAussen
  sturzrisiko?: ErgaenzungSturzrisiko
  mobilitaet_besonderheiten?: string

  /** Alltagsaktivitäten (ADL). */
  adl_koerperpflege?: ErgaenzungAdlStufe
  adl_ankleiden?: ErgaenzungAdlStufe
  adl_ernaehrung?: ErgaenzungAdlStufe
  adl_toilette?: ErgaenzungAdlStufe
  adl_transfers?: ErgaenzungAdlStufe

  /** Kognition & Psyche. */
  orientierung?: ErgaenzungOrientierung
  demenz?: ErgaenzungDemenz
  kommunikation?: ErgaenzungKommunikation
  muttersprache?: string

  psyche_angst?: boolean
  psyche_depression?: boolean
  psyche_unruhe?: boolean
  psyche_schlaf?: boolean
  psyche_antriebslos?: boolean
  psyche_aggression?: boolean
  psyche_sonstiges?: string

  /** Zugang zur Wohnung. */
  schluessel?: ErgaenzungZugang
  zugang_hinweise?: string

  /** Audit. */
  filledByUserId?: string | null
  filledAt?: string
  updatedAt?: string
  /** Frei wählbare interne Notizen der Pflegekraft. */
  notiz?: string
}

/** Schlüsselsatz aller im UI verwalteten Felder (für Iteration). */
export const ERGAENZUNG_KEYS: readonly (keyof AnamneseErgaenzung)[] = [
  'konfession',
  'gewicht',
  'schmerzen',
  'schmerzen_ort',
  'mobilitaet_innen',
  'mobilitaet_aussen',
  'sturzrisiko',
  'mobilitaet_besonderheiten',
  'adl_koerperpflege',
  'adl_ankleiden',
  'adl_ernaehrung',
  'adl_toilette',
  'adl_transfers',
  'orientierung',
  'demenz',
  'kommunikation',
  'muttersprache',
  'psyche_angst',
  'psyche_depression',
  'psyche_unruhe',
  'psyche_schlaf',
  'psyche_antriebslos',
  'psyche_aggression',
  'psyche_sonstiges',
  'schluessel',
  'zugang_hinweise',
  'notiz',
] as const

/** Liefert true, sobald irgendein Inhaltsfeld gesetzt ist. */
export function isErgaenzungFilled(e: AnamneseErgaenzung | null | undefined): boolean {
  if (!e) return false
  return ERGAENZUNG_KEYS.some((k) => {
    const v = e[k]
    if (typeof v === 'boolean') return v
    if (typeof v === 'string') return v.trim().length > 0
    return false
  })
}
