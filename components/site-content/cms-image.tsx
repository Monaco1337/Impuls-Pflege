import type { CSSProperties } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  focusToObjectPosition,
  readFocusHash,
} from '@/lib/content/site-image-slots'

type Base = {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
  sizes?: string
  priority?: boolean
  quality?: number
  /**
   * Optionaler Fokuspunkt 0–100 (%) für `object-fit: cover`.
   * Setzt `object-position` und überschreibt evtl. mitgegebene Tailwind-Klassen
   * wie `object-center` per Inline-Style (höhere Spezifität).
   */
  focusX?: number
  focusY?: number
}

/** Unterstützt lokale Pfade (/images/…) und externe https-URLs (ohne next/image-Remote-Config). */
export function CmsImage({
  src,
  alt,
  className,
  style,
  fill,
  width,
  height,
  sizes,
  priority,
  quality = 88,
  focusX,
  focusY,
}: Base & { fill?: boolean; width?: number; height?: number }) {
  if (!src) return null

  // Wenn die URL einen `#focus=x,y`-Hash mitführt, extrahieren wir ihn und
  // nutzen ihn als Fallback (explizite focusX/focusY-Props haben Vorrang).
  const parsed = readFocusHash(src)
  const finalSrc = parsed.src
  const effFocusX = typeof focusX === 'number' ? focusX : parsed.focusX
  const effFocusY = typeof focusY === 'number' ? focusY : parsed.focusY

  const remote = finalSrc.startsWith('http://') || finalSrc.startsWith('https://')

  // Fokus nur anwenden, wenn explizit gesetzt oder via Hash erkannt – sonst
  // bleiben historische Tailwind-Klassen (`object-center`, `object-[center_30%]`)
  // wirksam.
  const hasFocus = typeof effFocusX === 'number' || typeof effFocusY === 'number'
  const focusStyle: CSSProperties = hasFocus
    ? { objectPosition: focusToObjectPosition(effFocusX, effFocusY) }
    : {}
  const mergedStyle: CSSProperties = { ...focusStyle, ...style }

  if (remote) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element -- externe URLs
        <img
          src={finalSrc}
          alt={alt}
          className={cn('absolute inset-0 h-full w-full object-cover', className)}
          style={mergedStyle}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={finalSrc}
        alt={alt}
        className={className}
        style={mergedStyle}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer-when-downgrade"
      />
    )
  }

  if (fill) {
    return (
      <Image
        src={finalSrc}
        alt={alt}
        fill
        className={cn('object-cover', className)}
        style={mergedStyle}
        sizes={sizes}
        priority={priority}
        quality={quality}
      />
    )
  }

  return (
    <Image
      src={finalSrc}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 800}
      className={className}
      style={mergedStyle}
      sizes={sizes}
      priority={priority}
      quality={quality}
    />
  )
}
