/**
 * High-Level-Speicherlogik für vom Kunden hochgeladene Website-Fotos.
 *
 * Lädt das Bild aus dem Upload, normalisiert und komprimiert es mit `sharp`
 * (deterministische Ziel-Eigenschaften, keine versteckten Originale) und
 * persistiert es als Blob im Blob-Store. Die zurückgelieferte URL zeigt auf
 * unseren Streaming-Endpoint, der das Bild mit korrekten Cache-Headern
 * ausliefert.
 *
 * Funktioniert auf Vercel (kein fs-Schreibzugriff nötig), im Docker-Image
 * mit beschreibbarem Volume und in der lokalen Entwicklung gleichermaßen.
 */

import crypto from 'crypto'
import sharp from 'sharp'
import {
  writeSiteImageBlob,
  type SiteImageMime,
} from '@/lib/storage/cms-site-image-blob'

/** Max. zulässige Größe der hochgeladenen Originaldatei (vor Recompress). */
export const MAX_CMS_SITE_IMAGE_BYTES = 12 * 1024 * 1024

/** Maximalbreite des serverseitig komprimierten Endbildes. */
const MAX_OUTPUT_WIDTH = 2400

/** Zielwerte für die jeweilige Ausgabe-Codec-Familie. */
const JPEG_QUALITY = 82
const WEBP_QUALITY = 82
const PNG_COMPRESSION = 9

const ALLOWED_INPUT_MIME = new Set<SiteImageMime>([
  'image/jpeg',
  'image/png',
  'image/webp',
])

export type SaveCmsSiteImageInput = {
  /**
   * Stabiler Slot-Schlüssel (z. B. `heroDesktop`, `team-featured`).
   * Wenn weggelassen, generiert der Server automatisch eine neue ID
   * (`auto-<random>`). Damit funktioniert das System sowohl für feste
   * Slots aus `SITE_IMAGE_SLOTS` als auch für dynamische Upload-Stellen
   * (z. B. Team-Mitgliederfotos), bei denen es keine semantische
   * Konstante gibt.
   */
  slotKey?: string
  file: File
}

export type SaveCmsSiteImageResult = {
  /** Sofort gültige, public URL des neu gespeicherten Bildes. */
  publicPath: string
  /** Effektiver MIME-Typ nach Re-Encoding. */
  mime: SiteImageMime
  /** Größe in Bytes nach Re-Encoding. */
  size: number
}

function ensureSlotKey(slotKey: string | undefined): string {
  const trimmed = (slotKey ?? '').trim()
  if (!trimmed) {
    // Dynamische Uploads (Team-Member-Foto, Galerien, …) haben keinen
    // semantisch festen Slot. Wir generieren eine kollisionsfreie ID,
    // sodass jede Datei einen eigenen Blob bekommt und nicht versehentlich
    // ein anderes Bild überschreibt.
    return `auto-${Date.now().toString(36)}-${crypto.randomBytes(6).toString('hex')}`
  }
  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(trimmed)) {
    throw new Error('Ungültiger Bild-Slot')
  }
  return trimmed
}

function detectInputMime(file: File): SiteImageMime {
  const mime = (file.type || '').toLowerCase()
  if (mime === 'image/jpg') return 'image/jpeg'
  if (ALLOWED_INPUT_MIME.has(mime as SiteImageMime)) {
    return mime as SiteImageMime
  }
  throw new Error('Nur JPEG, PNG oder WebP erlaubt')
}

/**
 * Re-encodiert das Bild mit `sharp`:
 *  - rotiert nach EXIF, entfernt Metadaten
 *  - skaliert auf max. {@link MAX_OUTPUT_WIDTH} Breite (nur „withinside")
 *  - schreibt JPEG-Input als progressives JPEG, PNG als komprimiertes PNG,
 *    WebP als WebP – also stets im gleichen Codec wie der Input
 *
 * Dadurch sind die persistierten Blobs deterministisch klein, EXIF-bereinigt
 * und bilden eine vorhersehbare Quelle für `next/image`.
 */
async function recompress(
  buffer: Buffer,
  mime: SiteImageMime,
): Promise<{ buffer: Buffer; mime: SiteImageMime }> {
  const pipeline = sharp(buffer, { failOn: 'truncated' })
    .rotate()
    .resize({
      width: MAX_OUTPUT_WIDTH,
      withoutEnlargement: true,
      fit: 'inside',
    })

  if (mime === 'image/png') {
    return {
      buffer: await pipeline
        .png({ compressionLevel: PNG_COMPRESSION, palette: true })
        .toBuffer(),
      mime: 'image/png',
    }
  }
  if (mime === 'image/webp') {
    return {
      buffer: await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer(),
      mime: 'image/webp',
    }
  }
  return {
    buffer: await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
      .toBuffer(),
    mime: 'image/jpeg',
  }
}

/**
 * Speichert ein vom Admin hochgeladenes Website-Foto und liefert eine
 * sofort gültige, dauerhaft persistierte URL zurück.
 */
export async function saveCmsSiteImageFile(
  input: SaveCmsSiteImageInput,
): Promise<SaveCmsSiteImageResult> {
  const slotKey = ensureSlotKey(input.slotKey)
  const file = input.file

  if (!(file instanceof File)) {
    throw new Error('Keine Datei übergeben')
  }
  if (file.size <= 0) {
    throw new Error('Leere Datei')
  }
  if (file.size > MAX_CMS_SITE_IMAGE_BYTES) {
    throw new Error(
      `Bild zu groß (max. ${Math.round(MAX_CMS_SITE_IMAGE_BYTES / 1024 / 1024)} MB)`,
    )
  }

  const inputMime = detectInputMime(file)
  const inputBuffer = Buffer.from(await file.arrayBuffer())

  const { buffer: outputBuffer, mime: outputMime } = await recompress(
    inputBuffer,
    inputMime,
  )

  await writeSiteImageBlob(slotKey, {
    mime: outputMime,
    data: outputBuffer.toString('base64'),
    size: outputBuffer.byteLength,
    updatedAt: new Date().toISOString(),
  })

  // Cache-Buster: erzwingt sofortige Aktualisierung im `next/image`-Cache und
  // im Browser, ohne dass der gespeicherte Pfad raten muss.
  const version = Date.now().toString(36)
  return {
    publicPath: `/api/site-image/${encodeURIComponent(slotKey)}?v=${version}`,
    mime: outputMime,
    size: outputBuffer.byteLength,
  }
}
