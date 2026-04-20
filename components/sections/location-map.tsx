'use client'

import { useEffect, useRef } from 'react'
import { MapPin, ArrowRight } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

const LAT  = 51.5353
const LNG  = 7.6898
const ZOOM = 15

// Mint SVG marker as data-URI
const MARKER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44">
  <defs>
    <filter id="shadow" x="-30%" y="-20%" width="160%" height="160%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="rgba(24,193,163,0.35)"/>
    </filter>
  </defs>
  <path d="M18 0C8.06 0 0 8.06 0 18c0 12.4 16.2 24.8 17.2 25.5a1.4 1.4 0 001.6 0C19.8 42.8 36 30.4 36 18 36 8.06 27.94 0 18 0z" fill="#18C1A3" filter="url(#shadow)"/>
  <circle cx="18" cy="18" r="7" fill="white"/>
  <circle cx="18" cy="18" r="4" fill="#18C1A3"/>
</svg>`

const MARKER_URL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(MARKER_SVG)}`

export function LocationMap() {
  const mapRef    = useRef<HTMLDivElement>(null)
  const mapInst   = useRef<import('leaflet').Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInst.current) return

    // Dynamic import — runs client-side only
    import('leaflet').then((L) => {
      // Prevent double-init during React strict mode
      if (mapInst.current) return

      // Fix default icon path issue in bundlers
      // @ts-expect-error
      delete L.Icon.Default.prototype._getIconUrl

      const map = L.map(mapRef.current!, {
        center: [LAT, LNG],
        zoom: ZOOM,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      })

      mapInst.current = map

      // Calm, desaturated tile layer
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        { subdomains: 'abcd', maxZoom: 19 }
      ).addTo(map)

      // Custom mint marker
      const icon = L.icon({
        iconUrl:     MARKER_URL,
        iconSize:    [36, 44],
        iconAnchor:  [18, 44],
        popupAnchor: [0, -46],
      })

      L.marker([LAT, LNG], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:inherit;font-size:13px;font-weight:600;color:#0F172A;line-height:1.4">
            IMPULS Ambulante Pflege<br>
            <span style="font-weight:400;color:#64748b">Massener Str. 147, 59423 Unna</span>
          </div>`,
          {
            offset: [0, -8],
            className: 'impuls-popup',
          }
        )

      // Subtle zoom control — bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map)
      L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map)
    })

    return () => {
      if (mapInst.current) {
        mapInst.current.remove()
        mapInst.current = null
      }
    }
  }, [])

  return (
    <>
      {/* Leaflet style overrides */}
      <style>{`
        .leaflet-container {
          font-family: inherit;
          background: #f0f4f4;
        }
        /* Hide default zoom border */
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 14px rgba(0,0,0,0.10) !important;
          border-radius: 12px !important;
          overflow: hidden;
        }
        .leaflet-control-zoom a {
          color: #334155 !important;
          font-size: 15px !important;
          line-height: 28px !important;
          width: 28px !important;
          height: 28px !important;
          background: #ffffff !important;
          border: none !important;
        }
        .leaflet-control-zoom a:hover {
          background: #f8fafc !important;
          color: #18C1A3 !important;
        }
        /* Attribution */
        .leaflet-control-attribution {
          background: rgba(255,255,255,0.70) !important;
          backdrop-filter: blur(8px);
          border-radius: 6px 0 0 0 !important;
          font-size: 9px !important;
          color: #94a3b8 !important;
          padding: 2px 5px !important;
        }
        .leaflet-control-attribution a {
          color: #18C1A3 !important;
        }
        /* Popup */
        .impuls-popup .leaflet-popup-content-wrapper {
          border-radius: 14px !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
          border: 1px solid rgba(0,0,0,0.07) !important;
          padding: 0 !important;
        }
        .impuls-popup .leaflet-popup-content {
          margin: 12px 16px !important;
        }
        .impuls-popup .leaflet-popup-tip {
          box-shadow: none !important;
        }
      `}</style>

      {/* Map container */}
      <div
        ref={mapRef}
        className="h-full w-full"
        style={{ minHeight: '460px' }}
        aria-label="Interaktive Karte – IMPULS Ambulante Pflege, Unna"
      />
    </>
  )
}
