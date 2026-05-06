/**
 * Generates the complete favicon and PWA-icon set from the master SVG.
 *
 * Sources:
 *   - app/icon.svg       (master, used directly by Next as <link rel="icon" type="image/svg+xml">)
 *
 * Outputs (all auto-discovered by Next.js App Router file-based metadata,
 * and explicitly referenced by app/manifest.ts):
 *
 *   app/favicon.ico              -> /favicon.ico  (16+32+48 multi-res, legacy + Google)
 *   app/icon.png                 -> /icon         (general PNG, 512x512)
 *   app/apple-icon.png           -> /apple-icon   (180x180, iOS Home Screen)
 *   public/icon-192.png          -> PWA Android Chrome
 *   public/icon-512.png          -> PWA splash + larger Android
 *   public/icon-maskable-512.png -> PWA maskable (safe-zone padded)
 *   public/og-favicon.png        -> 1024x1024 marketing/og fallback
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const ROOT = resolve(__dirname, '..')
const APP = resolve(ROOT, 'app')
const PUB = resolve(ROOT, 'public')

const MASTER_SVG = resolve(APP, 'icon.svg')

/**
 * Maskable icon needs all content inside the inner 80% safe-zone, because
 * Android Chrome crops the rest with arbitrary masks (circle, squircle, ...).
 * We render at 100% and let sharp pad/extend a solid mint background, so the
 * heart+pulse always survive masking on every Android launcher.
 */
const MINT_BG = '#18C1A3'

async function ensureDir(filePath: string) {
  await mkdir(dirname(filePath), { recursive: true })
}

async function renderSvg(svg: Buffer, size: number): Promise<Buffer> {
  return sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'cover' })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer()
}

async function writePng(svg: Buffer, size: number, outPath: string) {
  await ensureDir(outPath)
  const buf = await renderSvg(svg, size)
  await writeFile(outPath, buf)
  console.log(`  wrote ${outPath} (${size}x${size})`)
}

async function writeMaskable(svg: Buffer, size: number, outPath: string) {
  await ensureDir(outPath)
  const inner = Math.round(size * 0.78)
  const padding = Math.round((size - inner) / 2)

  const innerPng = await sharp(svg, { density: 384 })
    .resize(inner, inner, { fit: 'cover' })
    .png()
    .toBuffer()

  const buf = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: MINT_BG,
    },
  })
    .composite([{ input: innerPng, top: padding, left: padding }])
    .png({ compressionLevel: 9 })
    .toBuffer()

  await writeFile(outPath, buf)
  console.log(`  wrote ${outPath} (${size}x${size}, maskable safe-zone)`)
}

async function writeIco(svg: Buffer, sizes: number[], outPath: string) {
  await ensureDir(outPath)
  const pngs: Buffer[] = []
  for (const s of sizes) {
    pngs.push(await renderSvg(svg, s))
  }
  const ico = await pngToIco(pngs)
  await writeFile(outPath, ico)
  console.log(`  wrote ${outPath} (sizes: ${sizes.join(', ')})`)
}

async function main() {
  const svg = await readFile(MASTER_SVG)
  console.log(`Source: ${MASTER_SVG}`)

  // 1. Multi-resolution .ico for legacy browsers + Google Search
  await writeIco(svg, [16, 32, 48, 64], resolve(APP, 'favicon.ico'))

  // 2. Default modern PNG (Next maps this to <link rel="icon" sizes="any" type="image/png">)
  await writePng(svg, 512, resolve(APP, 'icon.png'))

  // 3. Apple Touch Icon (iOS Home Screen, Safari)
  await writePng(svg, 180, resolve(APP, 'apple-icon.png'))

  // 4. PWA / Android Chrome
  await writePng(svg, 192, resolve(PUB, 'icon-192.png'))
  await writePng(svg, 512, resolve(PUB, 'icon-512.png'))

  // 5. Maskable (Android adaptive icons)
  await writeMaskable(svg, 512, resolve(PUB, 'icon-maskable-512.png'))

  // 6. High-res marketing fallback (used in some social previews)
  await writePng(svg, 1024, resolve(PUB, 'og-favicon.png'))

  console.log('\nDone — favicon set generated.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
