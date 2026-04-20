export const POSTGRES_LOCAL_DEFAULT_URL =
  'postgresql://user:password@127.0.0.1:5432/impuls?schema=public'

/**
 * Vercel Storage (Neon Postgres) und Legacy-Templates setzen oft andere Variablennamen.
 * Prisma liest nur `DATABASE_URL` — wir spiegeln die erste gefundene URL dorthin.
 */
function mirrorIntegrationDatabaseUrl(): void {
  if (process.env.DATABASE_URL?.trim()) return

  const candidates = [
    'POSTGRES_PRISMA_URL',
    'POSTGRES_URL',
    'PRISMA_DATABASE_URL',
    'VERCEL_POSTGRES_URL',
  ] as const

  for (const key of candidates) {
    const value = process.env[key]?.trim()
    if (!value) continue
    if (
      value.startsWith('postgresql:') ||
      value.startsWith('postgres:') ||
      value.startsWith('prisma+postgres:')
    ) {
      process.env.DATABASE_URL = value
      return
    }
  }
}

export function applyDefaultDatabaseUrlIfMissing(): void {
  mirrorIntegrationDatabaseUrl()
  if (process.env.DATABASE_URL?.trim()) return

  // During Vercel build phase there is no database access needed;
  // provide a dummy so Prisma client can initialise its module without errors.
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    process.env.DATABASE_URL = 'postgresql://placeholder:placeholder@localhost:5432/placeholder'
    return
  }

  const requireExplicit =
    process.env.NODE_ENV === 'production' ||
    process.env.VERCEL === '1' ||
    process.env.CI === 'true'

  if (requireExplicit) {
    throw new Error(
      'DATABASE_URL fehlt. In Vercel: Storage → Postgres verbinden (setzt DATABASE_URL), oder manuell setzen.',
    )
  }

  process.env.DATABASE_URL = POSTGRES_LOCAL_DEFAULT_URL
}
