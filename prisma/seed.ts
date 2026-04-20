import '../lib/apply-database-url'
import { PrismaClient } from '@prisma/client'
import { runFullSeed } from '../lib/prisma-seed'

const prisma = new PrismaClient()

async function main() {
  await runFullSeed(prisma)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
