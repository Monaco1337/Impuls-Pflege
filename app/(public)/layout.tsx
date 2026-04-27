import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { loadContactInfo } from '@/lib/content/load-site-bundle'

export const dynamic = 'force-dynamic'

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const contact = await loadContactInfo()
  return (
    <div className="public-layout flex min-h-screen flex-col">
      <Header contact={contact} />
      <main className="flex-1">{children}</main>
      <Footer contact={contact} />
    </div>
  )
}
