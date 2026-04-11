import { PrismaClient, RoleName } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create Super Admin
  const passwordHash = await hash('Admin123!', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@impuls-pflege.de' },
    update: {},
    create: {
      email: 'admin@impuls-pflege.de',
      passwordHash,
      firstName: 'System',
      lastName: 'Administrator',
      role: RoleName.SUPER_ADMIN,
      active: true,
    },
  })
  console.log(`Created admin user: ${admin.email}`)

  // Create sample staff users
  const recruiter = await prisma.user.upsert({
    where: { email: 'recruiting@impuls-pflege.de' },
    update: {},
    create: {
      email: 'recruiting@impuls-pflege.de',
      passwordHash,
      firstName: 'Lisa',
      lastName: 'Müller',
      role: RoleName.RECRUITING,
      active: true,
    },
  })

  const officeStaff = await prisma.user.upsert({
    where: { email: 'buero@impuls-pflege.de' },
    update: {},
    create: {
      email: 'buero@impuls-pflege.de',
      passwordHash,
      firstName: 'Thomas',
      lastName: 'Weber',
      role: RoleName.OFFICE_STAFF,
      active: true,
    },
  })

  // Create job postings
  const jobs = [
    {
      title: 'Pflegefachkraft (m/w/d)',
      slug: 'pflegefachkraft',
      department: 'Pflege',
      location: 'Unna',
      employmentType: 'VOLLZEIT' as const,
      workload: 'Vollzeit / Teilzeit',
      shortIntro: 'Werden Sie Teil unseres engagierten Pflegeteams und begleiten Sie Menschen mit Herz und Fachkompetenz in ihrem Zuhause.',
      description: 'Als Pflegefachkraft bei IMPULS übernehmen Sie die eigenverantwortliche Durchführung der Grund- und Behandlungspflege bei unseren Klientinnen und Klienten. Sie arbeiten in einem wertschätzenden Team, das Menschlichkeit und professionelle Pflege vereint.\n\nIhre Aufgaben:\n- Durchführung der Grund- und Behandlungspflege\n- Pflegedokumentation und -planung\n- Beratung von Klienten und Angehörigen\n- Zusammenarbeit mit Ärzten und Therapeuten\n- Medikamentenmanagement',
      requirements: '- Abgeschlossene Ausbildung als Pflegefachkraft, Gesundheits- und Krankenpfleger/in oder Altenpfleger/in\n- Führerschein Klasse B\n- Einfühlungsvermögen und Teamfähigkeit\n- Eigenverantwortliches Arbeiten\n- Berufserfahrung in der ambulanten Pflege von Vorteil',
      benefits: '- Überdurchschnittliche Vergütung\n- Flexible Arbeitszeitmodelle\n- Fort- und Weiterbildungsmöglichkeiten\n- Betriebliche Altersvorsorge\n- Wertschätzendes Arbeitsumfeld\n- Moderne Arbeitsmittel\n- Dienstfahrzeug',
      active: true,
      sortOrder: 1,
    },
    {
      title: 'Pflegehilfskraft (m/w/d)',
      slug: 'pflegehilfskraft',
      department: 'Pflege',
      location: 'Unna',
      employmentType: 'TEILZEIT' as const,
      workload: 'Teilzeit / Minijob',
      shortIntro: 'Unterstützen Sie unser Team in der täglichen Pflege und Betreuung – auch als Quereinsteiger mit Herz willkommen.',
      description: 'Als Pflegehilfskraft unterstützen Sie unser Pflegeteam bei der täglichen Versorgung unserer Klientinnen und Klienten. Sie helfen bei der Grundpflege und tragen zu einem würdevollen Alltag bei.\n\nIhre Aufgaben:\n- Unterstützung bei der Grundpflege\n- Hilfe bei der Mobilisation\n- Begleitung im Alltag\n- Dokumentation der durchgeführten Maßnahmen',
      requirements: '- Pflegebasiskurs oder Bereitschaft zur Qualifizierung\n- Führerschein Klasse B\n- Zuverlässigkeit und Einfühlungsvermögen\n- Freude am Umgang mit Menschen',
      benefits: '- Faire Vergütung\n- Einarbeitung und Schulungen\n- Flexible Einsatzzeiten\n- Familiäres Arbeitsklima\n- Entwicklungsmöglichkeiten',
      active: true,
      sortOrder: 2,
    },
    {
      title: 'Betreuungskraft (m/w/d)',
      slug: 'betreuungskraft',
      department: 'Betreuung',
      location: 'Unna',
      employmentType: 'TEILZEIT' as const,
      workload: 'Teilzeit',
      shortIntro: 'Schenken Sie Menschen wertvolle Zeit – durch aktivierende Betreuung und einfühlsame Begleitung im Alltag.',
      description: 'Als Betreuungskraft gestalten Sie den Alltag unserer Klientinnen und Klienten aktiv und liebevoll mit. Sie bieten Beschäftigung, Gesellschaft und Unterstützung.\n\nIhre Aufgaben:\n- Aktivierende Betreuung und Beschäftigung\n- Begleitung bei Spaziergängen und Terminen\n- Gesellschaft und Gesprächsangebote\n- Unterstützung im häuslichen Umfeld',
      requirements: '- Qualifikation nach §43b/§53b SGB XI wünschenswert\n- Einfühlungsvermögen und Geduld\n- Freude an der Arbeit mit Menschen\n- Zuverlässigkeit',
      benefits: '- Sinnstiftende Tätigkeit\n- Wertschätzende Teamkultur\n- Fort- und Weiterbildungen\n- Flexible Arbeitszeiten',
      active: true,
      sortOrder: 3,
    },
    {
      title: 'Hauswirtschaftskraft (m/w/d)',
      slug: 'hauswirtschaftskraft',
      department: 'Hauswirtschaft',
      location: 'Unna',
      employmentType: 'MINIJOB' as const,
      workload: 'Minijob / Teilzeit',
      shortIntro: 'Sorgen Sie für ein gepflegtes Zuhause unserer Klienten – mit Sorgfalt, Zuverlässigkeit und einem freundlichen Wesen.',
      description: 'Als Hauswirtschaftskraft unterstützen Sie unsere Klientinnen und Klienten bei der Bewältigung des Haushalts und tragen so zu einem würdevollen Leben im eigenen Zuhause bei.\n\nIhre Aufgaben:\n- Reinigung und Pflege der Wohnung\n- Wäschepflege\n- Einkäufe und Besorgungen\n- Zubereitung einfacher Mahlzeiten',
      requirements: '- Erfahrung im hauswirtschaftlichen Bereich wünschenswert\n- Führerschein Klasse B von Vorteil\n- Zuverlässigkeit und Sorgfalt\n- Freundliches Auftreten',
      benefits: '- Flexible Einsatzzeiten\n- Familiäres Arbeitsumfeld\n- Faire Vergütung\n- Kurze Kommunikationswege',
      active: true,
      sortOrder: 4,
    },
  ]

  for (const job of jobs) {
    await prisma.jobPosting.upsert({
      where: { slug: job.slug },
      update: job,
      create: job,
    })
  }
  console.log(`Created ${jobs.length} job postings`)

  // Create tags
  const tagNames = [
    { name: 'Erfahren', color: '#0097A7' },
    { name: 'Berufseinsteiger', color: '#26B3C2' },
    { name: 'Quereinsteiger', color: '#4DC1CD' },
    { name: 'Sofort verfügbar', color: '#2E7D32' },
    { name: 'Empfehlung', color: '#C2185B' },
    { name: 'Top-Kandidat', color: '#F9A825' },
  ]

  for (const tag of tagNames) {
    await prisma.tag.upsert({
      where: { name: tag.name },
      update: tag,
      create: tag,
    })
  }
  console.log(`Created ${tagNames.length} tags`)

  // Create content blocks
  const contentBlocks = [
    {
      key: 'hero',
      title: 'Hero Section',
      content: {
        headline: 'Herzlich willkommen beim Impuls Ambulanten Pflegedienst in Unna',
        subheadline: 'Ihr vertrauensvoller Partner für Betreuung, Pflege und Unterstützung in den eigenen vier Wänden.',
        body: 'Unser erfahrenes und einfühlsames Team begleitet Menschen im vertrauten Zuhause – mit fachlicher Kompetenz, Respekt und echter Menschlichkeit.',
      },
      sortOrder: 1,
    },
    {
      key: 'intro',
      title: 'Intro Section',
      content: {
        headline: 'Pflege, die Vertrauen schafft',
        body: 'Wir bei IMPULS verstehen, dass die Entscheidung für einen ambulanten Pflegedienst ein Schritt ist, der Vertrauen erfordert. Deshalb begleiten wir Menschen in ihrem vertrauten Zuhause mit einem Team aus erfahrenen Pflegefachkräften, die nicht nur fachlich exzellent arbeiten, sondern vor allem eines mitbringen: echte Menschlichkeit.\n\nUnsere Leistungen passen wir individuell an Ihre Bedürfnisse an – von der professionellen Grund- und Behandlungspflege über wertvolle Betreuungsangebote bis hin zur Unterstützung im Haushalt. Unser Ziel ist es, Ihnen und Ihren Liebsten Lebensqualität, Sicherheit und Würde zu schenken.\n\nBei IMPULS erleben Sie Pflege auf Augenhöhe: respektvoll, kompetent und stets an Ihren individuellen Wünschen orientiert. Denn Ihre Bedürfnisse stehen für uns an erster Stelle.',
      },
      sortOrder: 2,
    },
    {
      key: 'contact-info',
      title: 'Kontaktdaten',
      content: {
        phone: '02303 / 123 456',
        email: 'info@impuls-pflege.de',
        address: 'Musterstraße 1, 59423 Unna',
        hours: 'Mo–Fr: 08:00–16:30 Uhr\nTelefonische Erreichbarkeit: Rund um die Uhr',
      },
      sortOrder: 10,
    },
  ]

  for (const block of contentBlocks) {
    await prisma.contentBlock.upsert({
      where: { key: block.key },
      update: block,
      create: block,
    })
  }
  console.log(`Created ${contentBlocks.length} content blocks`)

  // Create default settings
  const settings = [
    { key: 'org_name', value: JSON.stringify('IMPULS Ambulanter Pflegedienst') },
    { key: 'org_address', value: JSON.stringify('Musterstraße 1, 59423 Unna') },
    { key: 'org_phone', value: JSON.stringify('02303 / 123 456') },
    { key: 'org_email', value: JSON.stringify('info@impuls-pflege.de') },
  ]

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
  }
  console.log('Created default settings')

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
