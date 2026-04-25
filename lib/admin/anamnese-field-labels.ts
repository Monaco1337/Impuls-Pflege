/**
 * Anzeigenamen und Wert-Labels für gespeicherte Anamnese-Payloads (Feldname → UI).
 */

const FIELD_LABELS: Record<string, string> = {
  anrede: 'Anrede',
  vorname: 'Vorname',
  nachname: 'Nachname',
  geburtsdatum: 'Geburtsdatum',
  geburtsort: 'Geburtsort',
  strasse: 'Straße & Hausnummer',
  etage: 'Etage / Wohnung',
  plz: 'PLZ',
  ort: 'Ort',
  telefon: 'Telefon',
  email: 'E-Mail',
  staatsangehoerigkeit: 'Staatsangehörigkeit',
  konfession: 'Konfession',
  familienstand: 'Familienstand',
  gewicht: 'Gewicht (kg)',
  groesse: 'Größe (cm)',
  kontakt_vorname: 'Kontaktperson Vorname',
  kontakt_nachname: 'Kontaktperson Nachname',
  kontakt_verhaeltnis: 'Verhältnis',
  kontakt_telefon: 'Kontaktperson Telefon',
  kontakt_email: 'Kontaktperson E-Mail',
  kontakt_adresse: 'Kontaktperson Adresse',
  kontakt_vollmacht: 'Vorsorgevollmacht vorhanden',
  patientenverfuegung: 'Patientenverfügung vorhanden',
  arzt_name: 'Arzt / Praxis',
  arzt_telefon: 'Telefon Praxis',
  arzt_adresse: 'Adresse der Praxis',
  versicherungsart: 'Art der Versicherung',
  krankenkasse: 'Krankenkasse / Versicherung',
  versichertennummer: 'Versichertennummer',
  pflegegrad_vorhanden: 'Pflegegrad vorhanden',
  pflegegrad: 'Aktueller Pflegegrad',
  zuzahlungsbefreiung: 'Befreiung von Zuzahlungen',
  hauptdiagnose: 'Hauptdiagnose(n)',
  vorerkrankungen: 'Weitere Vorerkrankungen',
  krankenhausaufenthalte: 'Letzte Krankenhausaufenthalte',
  schmerzen: 'Schmerzen',
  schmerzen_ort: 'Schmerzlokalisation',
  medikamente: 'Medikamentenplan',
  allergien: 'Bekannte Allergien',
  hm_rollator: 'Hilfsmittel: Rollator',
  hm_rollstuhl: 'Hilfsmittel: Rollstuhl',
  hm_gehstock: 'Hilfsmittel: Gehstock / Gehhilfe',
  hm_pflegebett: 'Hilfsmittel: Pflegebett',
  hm_toilettenstuhl: 'Hilfsmittel: Toilettenstuhl',
  hm_duschstuhl: 'Hilfsmittel: Duschstuhl / Badewannenlift',
  hm_inkontinenz: 'Hilfsmittel: Inkontinenzmaterial',
  hm_sauerstoff: 'Hilfsmittel: Sauerstoffgerät',
  hm_kompression: 'Hilfsmittel: Kompressionsstrümpfe',
  hm_brille: 'Hilfsmittel: Brille / Sehhilfe',
  hm_hoergeraet: 'Hilfsmittel: Hörgerät',
  hm_prothese: 'Hilfsmittel: Prothese',
  hm_sonstige: 'Weitere Hilfsmittel',
  mobilitaet_innen: 'Mobilität (in der Wohnung)',
  mobilitaet_aussen: 'Mobilität (außerhalb)',
  sturzrisiko: 'Sturzgefahr',
  mobilitaet_besonderheiten: 'Mobilität: Besonderheiten',
  adl_koerperpflege: 'ADL: Körperpflege',
  adl_ankleiden: 'ADL: An- und Auskleiden',
  adl_ernaehrung: 'ADL: Essen und Trinken',
  adl_toilette: 'ADL: Toilettengang',
  adl_transfers: 'ADL: Transfers',
  orientierung: 'Orientierung',
  demenz: 'Demenzerkrankung',
  kommunikation: 'Sprachliche Verständigung',
  muttersprache: 'Muttersprache',
  psyche_angst: 'Symptom: Ängste',
  psyche_depression: 'Symptom: Depressive Verstimmung',
  psyche_unruhe: 'Symptom: Unruhe / Agitiertheit',
  psyche_schlaf: 'Symptom: Schlafstörungen',
  psyche_antriebslos: 'Symptom: Antriebslosigkeit',
  psyche_aggression: 'Symptom: Aggressives Verhalten',
  psyche_sonstiges: 'Psychische Hinweise (Sonstiges)',
  wohnform: 'Wie leben Sie?',
  wohnungstyp: 'Wohnungstyp',
  wohnung_schwellen: 'Barrierefreiheit: Schwellen / Stufen',
  wohnung_badumbau: 'Barrierefreiheit: Barrierefreies Bad',
  wohnung_tueren: 'Barrierefreiheit: Rollstuhlbreite Türen',
  wohnung_haltegriffe: 'Barrierefreiheit: Haltegriffe',
  schluessel: 'Wohnungszugang',
  wohnung_sonstiges: 'Sonstiges (Wohnsituation)',
  leistung_grundpflege: 'Leistung: Grundpflege',
  leistung_behandlungspflege: 'Leistung: Behandlungspflege',
  leistung_betreuung: 'Leistung: Betreuung & Aktivierung',
  leistung_hauswirtschaft: 'Leistung: Hauswirtschaft',
  leistung_verhinderung: 'Leistung: Verhinderungspflege',
  leistung_beratung: 'Leistung: Pflegeberatung',
  beginn: 'Gewünschter Versorgungsbeginn',
  einsatzzeiten: 'Bevorzugte Einsatzzeiten',
  bisherige_versorgung: 'Bisherige Versorgung',
  wuensche: 'Persönliche Wünsche & Besonderheiten',
  datenschutz: 'Einwilligung Datenschutz',
  richtigkeit: 'Richtigkeitsbestätigung',
  kontakt_erlaubnis: 'Kontaktaufnahme erlauben',
}

/** Reihenfolge der Felder in der Admin-Ansicht (alles weitere alphabetisch). */
const PREFERRED_KEY_ORDER: string[] = [
  'anrede',
  'vorname',
  'nachname',
  'geburtsdatum',
  'geburtsort',
  'strasse',
  'etage',
  'plz',
  'ort',
  'telefon',
  'email',
  'staatsangehoerigkeit',
  'konfession',
  'familienstand',
  'gewicht',
  'groesse',
  'kontakt_vorname',
  'kontakt_nachname',
  'kontakt_verhaeltnis',
  'kontakt_telefon',
  'kontakt_email',
  'kontakt_adresse',
  'kontakt_vollmacht',
  'patientenverfuegung',
  'arzt_name',
  'arzt_telefon',
  'arzt_adresse',
  'versicherungsart',
  'krankenkasse',
  'versichertennummer',
  'pflegegrad_vorhanden',
  'pflegegrad',
  'zuzahlungsbefreiung',
  'hauptdiagnose',
  'vorerkrankungen',
  'krankenhausaufenthalte',
  'schmerzen',
  'schmerzen_ort',
  'medikamente',
  'allergien',
  'hm_rollator',
  'hm_rollstuhl',
  'hm_gehstock',
  'hm_pflegebett',
  'hm_toilettenstuhl',
  'hm_duschstuhl',
  'hm_inkontinenz',
  'hm_sauerstoff',
  'hm_kompression',
  'hm_brille',
  'hm_hoergeraet',
  'hm_prothese',
  'hm_sonstige',
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
  'wohnform',
  'wohnungstyp',
  'wohnung_schwellen',
  'wohnung_badumbau',
  'wohnung_tueren',
  'wohnung_haltegriffe',
  'schluessel',
  'wohnung_sonstiges',
  'leistung_grundpflege',
  'leistung_behandlungspflege',
  'leistung_betreuung',
  'leistung_hauswirtschaft',
  'leistung_verhinderung',
  'leistung_beratung',
  'beginn',
  'einsatzzeiten',
  'bisherige_versorgung',
  'wuensche',
  'datenschutz',
  'richtigkeit',
  'kontakt_erlaubnis',
]

const VALUE_ALIASES: Record<string, Record<string, string>> = {
  versicherungsart: {
    gesetzlich: 'Gesetzlich versichert',
    privat: 'Privat versichert',
    beihilfe: 'Beihilfe',
  },
  pflegegrad_vorhanden: {
    ja: 'Ja',
    nein: 'Nein',
    beantragt: 'Beantragt',
  },
  schmerzen: {
    keine: 'Keine',
    leicht: 'Leicht',
    mittel: 'Mittel',
    stark: 'Stark',
    sehr_stark: 'Sehr stark',
  },
  mobilitaet_innen: {
    selbststaendig: 'Selbstständig',
    mit_hilfe: 'Mit Hilfsmittel',
    mit_person: 'Mit Personenhilfe',
    immobil: 'Bettlägerig',
  },
  mobilitaet_aussen: {
    selbststaendig: 'Selbstständig',
    mit_hilfe: 'Mit Hilfsmittel',
    mit_person: 'Mit Begleitung',
    nicht_moeglich: 'Nicht möglich',
  },
  sturzrisiko: {
    gering: 'Gering',
    mittel: 'Mittel',
    hoch: 'Hoch',
    unbekannt: 'Unbekannt',
  },
  orientierung: {
    voll: 'Voll orientiert',
    zeitweise: 'Zeitweise eingeschränkt',
    stark: 'Stark eingeschränkt',
    desorientiert: 'Desorientiert',
  },
  demenz: {
    nein: 'Nein',
    leicht: 'Leicht',
    mittel: 'Mittel',
    schwer: 'Schwer',
    unbekannt: 'Unklar',
  },
  kommunikation: {
    uneingeschraenkt: 'Uneingeschränkt',
    eingeschraenkt: 'Eingeschränkt',
    stark_eingeschraenkt: 'Stark eingeschränkt',
    nicht_moeglich: 'Nicht möglich',
  },
  adl_koerperpflege: {
    selbststaendig: 'Selbstständig',
    teilweise: 'Teilweise Hilfe',
    vollstaendig: 'Vollständig',
  },
  adl_ankleiden: {
    selbststaendig: 'Selbstständig',
    teilweise: 'Teilweise Hilfe',
    vollstaendig: 'Vollständig',
  },
  adl_ernaehrung: {
    selbststaendig: 'Selbstständig',
    teilweise: 'Teilweise Hilfe',
    vollstaendig: 'Vollständig',
  },
  adl_toilette: {
    selbststaendig: 'Selbstständig',
    teilweise: 'Teilweise Hilfe',
    vollstaendig: 'Vollständig',
  },
  adl_transfers: {
    selbststaendig: 'Selbstständig',
    teilweise: 'Teilweise Hilfe',
    vollstaendig: 'Vollständig',
  },
  wohnform: {
    allein: 'Allein',
    partner: 'Mit Partner/in',
    familie: 'Mit Familie',
    wg: 'Wohngemeinschaft',
    betreut: 'Betreutes Wohnen',
  },
  wohnungstyp: {
    eg: 'Erdgeschoss',
    og_aufzug: 'OG mit Aufzug',
    og_ohne: 'OG ohne Aufzug',
    haus: 'Einfamilienhaus',
  },
  schluessel: {
    schluessel: 'Schlüssel hinterlegen',
    tresor: 'Schlüsseltresor',
    anwesend: 'Person öffnet',
    sonstiges: 'Sonstiges',
  },
  beginn: {
    sofort: 'So schnell wie möglich',
    '1woche': 'Innerhalb 1 Woche',
    '2wochen': 'Innerhalb 2 Wochen',
    spaeter: 'Später',
  },
  einsatzzeiten: {
    morgens: 'Morgens',
    mittags: 'Mittags',
    abends: 'Abends',
    flexibel: 'Flexibel',
    mehrmals: 'Mehrmals täglich',
  },
}

export function labelForAnamneseField(key: string): string {
  return (
    FIELD_LABELS[key] ??
    key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
  )
}

function aliasValue(field: string, raw: string): string | null {
  const m = VALUE_ALIASES[field]
  if (!m) return null
  return m[raw] ?? null
}

export function formatAnamneseValue(field: string, value: unknown): string {
  if (value === true) return 'Ja'
  if (value === false) return 'Nein'
  if (value === null || value === undefined) return '—'
  if (typeof value === 'string') {
    const t = value.trim()
    if (!t) return '—'
    const a = aliasValue(field, t)
    return a ?? t
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  try {
    return JSON.stringify(value)
  } catch {
    return '—'
  }
}

export function sortAnamnesePayloadKeys(keys: string[]): string[] {
  const pref = PREFERRED_KEY_ORDER.filter((k) => keys.includes(k))
  const rest = keys
    .filter((k) => !PREFERRED_KEY_ORDER.includes(k))
    .sort((a, b) => a.localeCompare(b, 'de'))
  return [...pref, ...rest]
}
