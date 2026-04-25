/**
 * Standard-Daten für frische data/*.json (Passwort aller Demo-User: Admin123!)
 */
import type {
  AnamneseData,
  ApplicantsData,
  InquiriesData,
  JsonContentBlock,
  JsonJobPosting,
  JsonSetting,
  JsonTag,
  JsonUser,
} from '@/lib/data/schema'
import { RoleName } from '@/lib/types/enums'
import { EmploymentType } from '@/lib/types/enums'

const DEMO_PASSWORD_HASH =
  '$2a$12$EQXbpOklRSkPvnEHctH5UOlRTdNCUqwmuBMjv9y2XgL82f6UE8ToW'

const t0 = '2026-01-01T00:00:00.000Z'

export function defaultUsers(): JsonUser[] {
  return [
    {
      id: 'usr_admin',
      email: 'admin@impuls-pflege.de',
      passwordHash: DEMO_PASSWORD_HASH,
      firstName: 'System',
      lastName: 'Administrator',
      avatar: null,
      active: true,
      role: RoleName.SUPER_ADMIN,
      lastLoginAt: null,
      createdAt: t0,
      updatedAt: t0,
    },
    {
      id: 'usr_recruiting',
      email: 'recruiting@impuls-pflege.de',
      passwordHash: DEMO_PASSWORD_HASH,
      firstName: 'Lisa',
      lastName: 'Müller',
      avatar: null,
      active: true,
      role: RoleName.RECRUITING,
      lastLoginAt: null,
      createdAt: t0,
      updatedAt: t0,
    },
    {
      id: 'usr_office',
      email: 'buero@impuls-pflege.de',
      passwordHash: DEMO_PASSWORD_HASH,
      firstName: 'Thomas',
      lastName: 'Weber',
      avatar: null,
      active: true,
      role: RoleName.OFFICE_STAFF,
      lastLoginAt: null,
      createdAt: t0,
      updatedAt: t0,
    },
  ]
}

export function defaultTags(): JsonTag[] {
  const tags: { name: string; color: string }[] = [
    { name: 'Erfahren', color: '#0097A7' },
    { name: 'Berufseinsteiger', color: '#26B3C2' },
    { name: 'Quereinsteiger', color: '#4DC1CD' },
    { name: 'Sofort verfügbar', color: '#2E7D32' },
    { name: 'Empfehlung', color: '#C2185B' },
    { name: 'Top-Kandidat', color: '#F9A825' },
  ]
  return tags.map((t, i) => ({
    id: `tag_${i + 1}`,
    name: t.name,
    color: t.color,
    createdAt: t0,
  }))
}

export function defaultJobs(): JsonJobPosting[] {
  const jobs = [
    {
      title: 'Pflegefachkraft (m/w/d)',
      slug: 'pflegefachkraft',
      department: 'Pflege',
      location: 'Unna',
      employmentType: EmploymentType.VOLLZEIT,
      workload: 'Vollzeit / Teilzeit',
      shortIntro:
        'Werden Sie Teil unseres engagierten Pflegeteams und begleiten Sie Menschen mit Herz und Fachkompetenz in ihrem Zuhause.',
      description:
        'Als Pflegefachkraft bei IMPULS übernehmen Sie die eigenverantwortliche Durchführung der Grund- und Behandlungspflege bei unseren Klientinnen und Klienten.',
      requirements:
        '- Abgeschlossene Ausbildung als Pflegefachkraft\n- Führerschein Klasse B\n- Teamfähigkeit',
      benefits: '- Faire Vergütung\n- Fortbildungen\n- Dienstfahrzeug',
      active: true,
      sortOrder: 1,
    },
    {
      title: 'Pflegehilfskraft (m/w/d)',
      slug: 'pflegehilfskraft',
      department: 'Pflege',
      location: 'Unna',
      employmentType: EmploymentType.TEILZEIT,
      workload: 'Teilzeit / Minijob',
      shortIntro: 'Unterstützen Sie unser Team in der täglichen Pflege und Betreuung.',
      description: 'Als Pflegehilfskraft unterstützen Sie unser Pflegeteam bei der täglichen Versorgung.',
      requirements: '- Pflegebasiskurs oder Bereitschaft zur Qualifizierung\n- Führerschein Klasse B',
      benefits: '- Faire Vergütung\n- Einarbeitung',
      active: true,
      sortOrder: 2,
    },
    {
      title: 'Betreuungskraft (m/w/d)',
      slug: 'betreuungskraft',
      department: 'Betreuung',
      location: 'Unna',
      employmentType: EmploymentType.TEILZEIT,
      workload: 'Teilzeit',
      shortIntro: 'Schenken Sie Menschen wertvolle Zeit – durch aktivierende Betreuung.',
      description: 'Als Betreuungskraft gestalten Sie den Alltag unserer Klientinnen und Klienten aktiv mit.',
      requirements: '- Qualifikation nach §43b/§53b SGB XI wünschenswert',
      benefits: '- Sinnstiftende Tätigkeit\n- Teamkultur',
      active: true,
      sortOrder: 3,
    },
    {
      title: 'Hauswirtschaftskraft (m/w/d)',
      slug: 'hauswirtschaftskraft',
      department: 'Hauswirtschaft',
      location: 'Unna',
      employmentType: EmploymentType.MINIJOB,
      workload: 'Minijob / Teilzeit',
      shortIntro: 'Sorgen Sie für ein gepflegtes Zuhause unserer Klienten.',
      description: 'Als Hauswirtschaftskraft unterstützen Sie bei Reinigung, Wäsche und Einkäufen.',
      requirements: '- Erfahrung im hauswirtschaftlichen Bereich wünschenswert',
      benefits: '- Flexible Einsatzzeiten',
      active: true,
      sortOrder: 4,
    },
  ]
  return jobs.map((j, i) => ({
    id: `job_${j.slug}`,
    ...j,
    contactPersonId: null,
    publishDate: t0,
    createdAt: t0,
    updatedAt: t0,
  }))
}

export function defaultContentBlocks(): JsonContentBlock[] {
  const blocks = [
    {
      id: 'blk_hero',
      key: 'hero',
      title: 'Hero Section',
      content: {
        headline: 'Herzlich willkommen beim Impuls Ambulanten Pflegedienst in Unna',
        subheadline:
          'Ihr vertrauensvoller Partner für Betreuung, Pflege und Unterstützung in den eigenen vier Wänden.',
        body: 'Unser erfahrenes und einfühlsames Team begleitet Menschen im vertrauten Zuhause – mit fachlicher Kompetenz, Respekt und echter Menschlichkeit.',
      },
      imageUrl: null,
      sortOrder: 1,
      updatedById: null,
    },
    {
      id: 'blk_intro',
      key: 'intro',
      title: 'Intro Section',
      content: {
        headline: 'Pflege, die Vertrauen schafft',
        body: 'Wir bei IMPULS verstehen, dass die Entscheidung für einen ambulanten Pflegedienst ein Schritt ist, der Vertrauen erfordert.',
      },
      imageUrl: null,
      sortOrder: 2,
      updatedById: null,
    },
    {
      id: 'blk_contact',
      key: 'contact-info',
      title: 'Kontaktdaten',
      content: {
        phone: '02303 2920589',
        email: 'info@impuls-pflege.de',
        address: 'Massener Str. 147, 59423 Unna',
        hours: 'Mo–Fr: 08:00–16:00 Uhr\nTelefonische Erreichbarkeit: Rund um die Uhr',
      },
      imageUrl: null,
      sortOrder: 10,
      updatedById: null,
    },
  ]
  return blocks.map((b) => ({ ...b, updatedAt: t0 }))
}

export function defaultSettings(): JsonSetting[] {
  return [
    { id: 'set_org_name', key: 'org_name', value: 'IMPULS Ambulanter Pflegedienst' },
    { id: 'set_org_address', key: 'org_address', value: 'Massener Str. 147, 59423 Unna' },
    { id: 'set_org_phone', key: 'org_phone', value: '02303 2920589' },
    { id: 'set_org_email', key: 'org_email', value: 'info@impuls-pflege.de' },
  ]
}

export function emptyInquiries(): InquiriesData {
  return { inquiries: [], notes: [] }
}

export function emptyApplicants(): ApplicantsData {
  return { applicants: [], notes: [], statusHistory: [], documents: [] }
}

export function emptyAnamnese(): AnamneseData {
  return { submissions: [] }
}
