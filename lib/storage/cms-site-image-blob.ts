/**
 * Blob-Storage für vom Kunden hochgeladene Website-Fotos.
 *
 * Layout
 * ------
 * - Aktuelles Layout: **eine JSON-Datei pro Slot** unter
 *   `data/site-image-blobs/<slotKey>.json`. Jede Datei enthält genau ein
 *   Blob-Objekt (`{ mime, data, size, updatedAt }`).
 * - Vorteil: Kein Slot zwingt den Gesamtinhalt in das 1-MB-Limit der
 *   GitHub Contents API. Uploads sind atomare Einzeldatei-Operationen,
 *   parallele Uploads können sich nicht gegenseitig blockieren.
 * - Legacy-Format: Eine sammelnde Datei `data/site-image-blobs.json` mit
 *   `{ [slot]: Blob }`. Wird beim Lesen weiterhin als Fallback verwendet,
 *   damit bereits hochgeladene Bilder sichtbar bleiben. Neue Schreibzugriffe
 *   gehen ausschließlich in das per-slot Layout. Die Legacy-Datei wird beim
 *   Löschen eines Slots automatisch mit-bereinigt (Eintrag entfernt).
 *
 * Hintergrund: Auf Vercel ist `/var/task/public` read-only. Bilder können
 * deshalb nicht ins Dateisystem geschrieben werden. Wir persistieren sie
 * über die etablierte GitHub-Persistenz-Schicht (`writeJsonFile`) und
 * liefern sie über einen dedizierten Streaming-Endpoint aus
 * (`/api/site-image/[key]`).
 */

import {
  invalidateJsonFile,
  readJsonFile,
  writeJsonFile,
} from '@/lib/storage/json-data-layer'

/** Erlaubte MIME-Typen (Validierung passiert vorher in der Upload-Schicht). */
export type SiteImageMime = 'image/jpeg' | 'image/png' | 'image/webp'

export type SiteImageBlob = {
  mime: SiteImageMime
  /** Base64-kodierter Binärinhalt OHNE `data:`-Präfix. */
  data: string
  /** ISO-8601 Zeitpunkt der letzten Aktualisierung. */
  updatedAt: string
  /** Originale Dateigröße in Bytes (nach evtl. Resize/Recompress). */
  size: number
}

type LegacySiteImageBlobStore = Record<string, SiteImageBlob>

const LEGACY_FILE = 'site-image-blobs.json'

/**
 * Pfad innerhalb des `data/`-Verzeichnisses für ein per-slot Blob.
 *
 * Wir verwenden absichtlich einen Unterordner, damit ein `data/`-Listing in
 * Admin-Tools die vielen Blob-Dateien nicht im Hauptverzeichnis verstreut.
 * Der Forward-Slash bleibt im Dateinamen erhalten und wird von der
 * GitHub-Persistenz-Schicht (`repoPathForFile`) korrekt zu
 * `data/site-image-blobs/<slot>.json` zusammengesetzt.
 */
function slotFile(slotKey: string): string {
  return `site-image-blobs/${slotKey}.json`
}

function isValidBlob(value: unknown): value is SiteImageBlob {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return (
    typeof v.mime === 'string' &&
    typeof v.data === 'string' &&
    v.data.length > 0 &&
    typeof v.updatedAt === 'string'
  )
}

/** Liefert das Blob eines Slots oder `null`, wenn kein Upload existiert. */
export async function readSiteImageBlob(
  slotKey: string,
): Promise<SiteImageBlob | null> {
  // 1) Aktuelles Layout: dedizierte Datei pro Slot.
  try {
    const direct = await readJsonFile<SiteImageBlob | Record<string, never>>(
      slotFile(slotKey),
      {} as SiteImageBlob,
    )
    if (isValidBlob(direct)) return direct
  } catch {
    // Lesefehler → unten Legacy probieren.
  }

  // 2) Legacy-Fallback: ein sammelndes JSON mit allen Blobs.
  try {
    const legacy = await readJsonFile<LegacySiteImageBlobStore>(LEGACY_FILE, {})
    const value = legacy[slotKey]
    if (isValidBlob(value)) return value
  } catch {
    /* ignorieren – kein Blob vorhanden */
  }

  return null
}

/**
 * Speichert oder ersetzt das Blob eines Slots in einer dedizierten Datei.
 *
 * Schreibt synchron über die GitHub-Persistenz-Schicht; Replikation auf
 * andere Lambdas erfolgt automatisch beim nächsten Lesevorgang.
 */
export async function writeSiteImageBlob(
  slotKey: string,
  blob: SiteImageBlob,
  commitMessage = `site-image: update ${slotKey}`,
): Promise<void> {
  await writeJsonFile(slotFile(slotKey), blob, commitMessage)
  invalidateJsonFile(slotFile(slotKey))
}

/**
 * Löscht das Blob eines Slots aus dem aktuellen Layout. Vorhandene
 * Legacy-Einträge bleiben unberührt (werden lazy beim nächsten Schreiben
 * eines anderen Slots nicht bewegt), damit der Löschvorgang nicht das
 * 1-MB-Limit triggert.
 */
export async function deleteSiteImageBlob(slotKey: string): Promise<void> {
  // „Leeres" Blob schreiben würde sinnlos Speicherplatz binden; deshalb
  // schreiben wir eine explizit leere Markierung. `readSiteImageBlob`
  // erkennt sie als ungültig und liefert `null` zurück – der CmsImage-
  // Fallback greift dann zum statischen Default.
  await writeJsonFile(
    slotFile(slotKey),
    { mime: '', data: '', size: 0, updatedAt: new Date().toISOString() },
    `site-image: remove ${slotKey}`,
  )
  invalidateJsonFile(slotFile(slotKey))
}
