import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'site')

const ALLOWED_IMAGE_MIME = new Set(['image/jpeg', 'image/png', 'image/webp'])
const EXT_BY_MIME: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
}

/** Max. Größe pro CMS-Website-Bild (Upload). */
export const MAX_CMS_SITE_IMAGE_BYTES = 6 * 1024 * 1024

/**
 * Speichert ein Bild unter public/uploads/site/ und liefert die öffentliche URL (/uploads/site/…).
 * Funktioniert auf Umgebungen mit beschreibbarem Dateisystem (lokal, Docker mit Volume).
 */
export async function saveCmsSiteImageFile(file: File): Promise<{ publicPath: string }> {
  if (file.size > MAX_CMS_SITE_IMAGE_BYTES) {
    throw new Error(`Bild zu groß (max. ${Math.round(MAX_CMS_SITE_IMAGE_BYTES / 1024 / 1024)} MB)`)
  }
  if (!ALLOWED_IMAGE_MIME.has(file.type)) {
    throw new Error('Nur JPEG, PNG oder WebP erlaubt')
  }

  const ext = EXT_BY_MIME[file.type] ?? path.extname(file.name).toLowerCase()
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    throw new Error('Ungültige Dateiendung')
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const name = `${Date.now()}-${crypto.randomBytes(10).toString('hex')}${ext === '.jpeg' ? '.jpg' : ext}`
  await mkdir(UPLOAD_DIR, { recursive: true })
  const filePath = path.join(UPLOAD_DIR, name)
  await writeFile(filePath, buffer)

  return { publicPath: `/uploads/site/${name}` }
}
