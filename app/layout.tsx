import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { AuthSessionProvider } from '@/components/providers/session-provider'
import { JsonLd } from '@/components/seo/json-ld'
import { SITE } from '@/lib/seo/site'
import { ldGraph, organizationJsonLd, localBusinessJsonLd, webSiteJsonLd } from '@/lib/seo/jsonld'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Pflege im Kreis Unna`,
    template: `%s | ${SITE.shortName}`,
  },
  description:
    'Ambulanter Pflegedienst im Kreis Unna: Grundpflege, Behandlungspflege, Demenzbetreuung und Pflegeberatung — persönlich, examiniert, in Unna, Lünen, Kamen, Bergkamen, Schwerte, Fröndenberg, Holzwickede, Bönen, Selm, Werne.',
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: SITE.name,
    url: SITE.url,
    images: [{ url: SITE.defaultOgImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  manifest: '/manifest.webmanifest',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'health',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#18C1A3' },
    { media: '(prefers-color-scheme: dark)', color: '#0E8E76' },
  ],
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  /**
   * Globaler Schema-Graph — Organization + LocalBusiness/MedicalBusiness +
   * WebSite. Wird auf JEDER Seite ausgespielt, weil dies die Brand-Entität
   * ist. Stadt-/Service-spezifisches Schema kommt zusätzlich auf der jeweiligen
   * Seite über lokales <JsonLd /> rein und referenziert per @id.
   */
  const globalGraph = ldGraph(organizationJsonLd(), localBusinessJsonLd(), webSiteJsonLd())

  return (
    <html lang="de" className={plusJakartaSans.variable}>
      <head>
        <JsonLd data={globalGraph} />
      </head>
      <body className="min-h-screen">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  )
}
