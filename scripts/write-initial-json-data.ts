/**
 * Einmalig ausführen, um data/*.json anzulegen (oder bei Bedarf überschreiben).
 * npx tsx scripts/write-initial-json-data.ts
 */
import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import {
  defaultContentBlocks,
  defaultJobs,
  defaultSettings,
  defaultTags,
  defaultUsers,
  emptyApplicants,
  emptyInquiries,
} from '../lib/data/defaults'
import { DATA_FILES } from '../lib/data/schema'

const dir = join(process.cwd(), 'data')
mkdirSync(dir, { recursive: true })

const write = (name: string, data: unknown) => {
  writeFileSync(join(dir, name), JSON.stringify(data, null, 2), 'utf8')
  console.log('wrote', name)
}

write(DATA_FILES.users, defaultUsers())
write(DATA_FILES.inquiries, emptyInquiries())
write(DATA_FILES.applicants, emptyApplicants())
write(DATA_FILES.applicantTags, [])
write(DATA_FILES.tags, defaultTags())
write(DATA_FILES.jobs, defaultJobs())
write(DATA_FILES.content, defaultContentBlocks())
write(DATA_FILES.settings, defaultSettings())
write(DATA_FILES.audit, [])
