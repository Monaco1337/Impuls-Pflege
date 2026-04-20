export const POSTGRES_LOCAL_DEFAULT_URL =
  'postgresql://user:password@127.0.0.1:5432/impuls?schema=public'

export function applyDefaultDatabaseUrlIfMissing(): void {
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
      'DATABASE_URL fehlt. Setzen Sie eine PostgreSQL-URL in der Umgebung.',
    )
  }

  process.env.DATABASE_URL = POSTGRES_LOCAL_DEFAULT_URL
}
