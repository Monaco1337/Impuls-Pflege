/**
 * Blob-Storage für vom Kunden hochgeladene Website-Fotos.
 *
 * Hintergrund: Auf Vercel ist `/var/task/public` read-only – `mkdir`/`writeFile`
 * scheitert dort mit `ENOENT`. Wir können deshalb keine Uploads in
 * `public/uploads/site/` ablegen. Stattdessen persistieren wir die Bilder
 * base64-kodiert in einer JSON-Datei und liefern sie über einen dedizierten
 * Streaming-Endpoint (`/api/site-image/[key]`) aus.
 *
 * Vorteile:
 *  - sofortige Sichtbarkeit nach dem Upload (kein Vercel-Rebuild nötig)
 *  - persistente Speicherung über die bestehende GitHub-Persistenz-Schicht
 *  - korrekte HTTP-Header → Browser- und CDN-Caching funktioniert
 *  - `next/image` optimiert weiterhin (relative URL, gleicher Origin)
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

type SiteImageBlobStore = Record<string, SiteImageBlob>

const STORE_FILE = 'site-image-blobs.json'

/** Liefert das Blob eines Slots oder `null`, wenn kein Upload existiert. */
export async function readSiteImageBlob(
  slotKey: string,
): Promise<SiteImageBlob | null> {
  const store = await readJsonFile<SiteImageBlobStore>(STORE_FILE, {})
  const value = store[slotKey]
  if (!value || typeof value !== 'object') return null
  if (
    typeof value.data !== 'string' ||
    typeof value.mime !== 'string' ||
    !value.data ||
    !value.mime
  ) {
    return null
  }
  return value
}

/**
 * Speichert oder ersetzt das Blob eines Slots. Schreibt synchron über die
 * GitHub-Persistenz-Schicht; eine Replikation auf andere Lambdas erfolgt
 * automatisch beim nächsten Lesevorgang.
 */
export async function writeSiteImageBlob(
  slotKey: string,
  blob: SiteImageBlob,
  commitMessage = `site-image: update ${slotKey}`,
): Promise<void> {
  const store = await readJsonFile<SiteImageBlobStore>(STORE_FILE, {})
  store[slotKey] = blob
  await writeJsonFile(STORE_FILE, store, commitMessage)
  invalidateJsonFile(STORE_FILE)
}

/** Löscht das Blob eines Slots, falls vorhanden. */
export async function deleteSiteImageBlob(slotKey: string): Promise<void> {
  const store = await readJsonFile<SiteImageBlobStore>(STORE_FILE, {})
  if (!(slotKey in store)) return
  delete store[slotKey]
  await writeJsonFile(STORE_FILE, store, `site-image: remove ${slotKey}`)
  invalidateJsonFile(STORE_FILE)
}
