export type TeamMemberCms = {
  name: string
  position: string
  description: string
  image: string | null
}

export type TeamFeaturedCms = {
  name: string
  role: string
  quote: string
  bio: string
  image: string
  tags: string[]
}

export const DEFAULT_TEAM_FEATURED: TeamFeaturedCms = {
  name: 'Elena Tschupina',
  role: 'Geschäftsführerin',
  quote:
    '„Pflege bedeutet für mich, Menschen in ihrer schwersten Zeit mit Würde und echter Fürsorge zu begleiten."',
  bio: `Als Gründerin und Geschäftsführerin von IMPULS trägt Elena die Verantwortung für die Qualität jedes einzelnen Pflegeeinsatzes. Ihre Überzeugung: Gute Pflege beginnt mit Zuhören und wird getragen von Menschen, die ihren Beruf wirklich lieben.`,
  image: '/images/team-elena-tschupina.jpg',
  tags: ['Examinierte Pflegefachkraft', 'Langjährige Führungserfahrung', 'Regionaler Pflegedienst'],
}

export const DEFAULT_TEAM_MEMBERS: TeamMemberCms[] = [
  {
    name: 'Natalia Tschupina',
    position: 'Pflegedienstleiterin',
    description:
      'Mit Herz, Fachwissen und einem offenen Ohr koordiniert Natalia den täglichen Pflegeeinsatz und sorgt dafür, dass jeder Klient die Betreuung bekommt, die er verdient.',
    image: '/images/care-smile.jpg',
  },
  {
    name: 'Teammitglied',
    position: 'Pflegefachkraft',
    description: 'Bald stellen wir Ihnen hier ein weiteres Mitglied unseres engagierten Teams vor.',
    image: null,
  },
  {
    name: 'Teammitglied',
    position: 'Pflegehilfskraft',
    description: 'Bald stellen wir Ihnen hier ein weiteres Mitglied unseres engagierten Teams vor.',
    image: null,
  },
  {
    name: 'Teammitglied',
    position: 'Betreuungsassistenz',
    description: 'Bald stellen wir Ihnen hier ein weiteres Mitglied unseres engagierten Teams vor.',
    image: null,
  },
  {
    name: 'Teammitglied',
    position: 'Pflegefachkraft',
    description: 'Bald stellen wir Ihnen hier ein weiteres Mitglied unseres engagierten Teams vor.',
    image: null,
  },
]

function isMember(x: unknown): x is TeamMemberCms {
  if (!x || typeof x !== 'object') return false
  const o = x as Record<string, unknown>
  return typeof o.name === 'string' && typeof o.position === 'string' && typeof o.description === 'string'
}

export function parseTeamBlock(content: unknown): {
  featured: TeamFeaturedCms
  members: TeamMemberCms[]
} {
  const featured = { ...DEFAULT_TEAM_FEATURED }
  const members = DEFAULT_TEAM_MEMBERS.map((m) => ({ ...m }))

  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    return { featured, members }
  }
  const c = content as Record<string, unknown>

  if (c.featured && typeof c.featured === 'object' && !Array.isArray(c.featured)) {
    const f = c.featured as Record<string, unknown>
    if (typeof f.name === 'string') featured.name = f.name
    if (typeof f.role === 'string') featured.role = f.role
    if (typeof f.quote === 'string') featured.quote = f.quote
    if (typeof f.bio === 'string') featured.bio = f.bio
    if (typeof f.image === 'string' && f.image.trim()) featured.image = f.image.trim()
    if (Array.isArray(f.tags) && f.tags.every((t) => typeof t === 'string')) {
      featured.tags = f.tags as string[]
    }
  }

  if (Array.isArray(c.members)) {
    const parsed = c.members.filter(isMember).map((m) => ({
      name: m.name,
      position: m.position,
      description: m.description,
      image:
        m.image === null || m.image === undefined
          ? null
          : typeof m.image === 'string' && m.image.trim()
            ? m.image.trim()
            : null,
    }))
    if (parsed.length > 0) return { featured, members: parsed }
  }

  return { featured, members }
}
