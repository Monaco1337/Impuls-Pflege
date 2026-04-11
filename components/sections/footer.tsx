import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { Container } from '@/components/ui/container'

const footerNav = [
  {
    title: 'Pflege',
    links: [
      { label: 'Leistungen', href: '/leistungen' },
      { label: 'Grundpflege', href: '/leistungen#grundpflege' },
      { label: 'Behandlungspflege', href: '/leistungen#behandlungspflege' },
      { label: 'Betreuung', href: '/leistungen#betreuung' },
    ],
  },
  {
    title: 'Unternehmen',
    links: [
      { label: 'Über uns', href: '/ueber-uns' },
      { label: 'Karriere', href: '/karriere' },
      { label: 'Kontakt', href: '/kontakt' },
    ],
  },
  {
    title: 'Rechtliches',
    links: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-warm-200 bg-warm-50" role="contentinfo">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand & contact */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" aria-label="Zur Startseite">
              <Logo size="md" />
            </Link>
            <address className="not-italic space-y-3 text-sm leading-relaxed text-warm-500">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                <span>Musterstraße 1<br />59423 Unna</span>
              </div>
              <a
                href="tel:+492303123456"
                className="flex items-center gap-3 text-warm-600 transition-colors hover:text-primary-600"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                02303 / 123 456
              </a>
              <a
                href="mailto:info@impuls-pflege.de"
                className="flex items-center gap-3 text-warm-600 transition-colors hover:text-primary-600"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                info@impuls-pflege.de
              </a>
            </address>
          </div>

          {/* Navigation columns */}
          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold tracking-wide text-warm-900">
                {group.title}
              </h3>
              <ul className="space-y-2.5" role="list">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-warm-500 transition-colors duration-150 hover:text-primary-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-warm-200 pt-8">
          <p className="text-center text-xs text-warm-400">
            &copy; {new Date().getFullYear()} IMPULS Ambulanter Pflegedienst. Alle Rechte vorbehalten.
          </p>
        </div>
      </Container>
    </footer>
  )
}
