import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'IMPULS Ambulanter Pflegedienst | Pflege in Unna',
    template: '%s | IMPULS Ambulanter Pflegedienst',
  },
  description:
    'Ihr vertrauensvoller Partner für ambulante Pflege, Betreuung und Unterstützung in den eigenen vier Wänden in Unna und Umgebung.',
  metadataBase: new URL('https://impuls-pflege.de'),
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'IMPULS Ambulanter Pflegedienst',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
