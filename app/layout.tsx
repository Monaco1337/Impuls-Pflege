import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { AuthSessionProvider } from '@/components/providers/session-provider'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
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
    <html lang="de" className={plusJakartaSans.variable}>
      <body className="min-h-screen">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  )
}
