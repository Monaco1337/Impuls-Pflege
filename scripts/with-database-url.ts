/**
 * Lädt die Standard-PostgreSQL-URL aus dem Code, falls DATABASE_URL fehlt,
 * und führt danach das Prisma-CLI aus.
 */
import { applyDefaultDatabaseUrlIfMissing } from '../lib/database-url'
import { spawnSync } from 'child_process'

applyDefaultDatabaseUrlIfMissing()

const prismaArgs = process.argv.slice(2)
const result = spawnSync('npx', ['prisma', ...prismaArgs], {
  stdio: 'inherit',
  env: process.env,
  shell: process.platform === 'win32',
})

process.exit(result.status === null ? 1 : result.status)
