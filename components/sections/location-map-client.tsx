'use client'

import dynamic from 'next/dynamic'

const LocationMap = dynamic(
  () => import('./location-map').then((m) => m.LocationMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-full w-full animate-pulse"
        style={{ background: 'rgba(24,193,163,0.06)', minHeight: '460px' }}
      />
    ),
  }
)

export function LocationMapClient() {
  return <LocationMap />
}
