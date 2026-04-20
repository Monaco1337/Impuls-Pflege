import { writeFile, mkdir, unlink, readFile, stat } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import crypto from 'crypto'
import { del, get, head, put } from '@vercel/blob'

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads'
const MAX_FILE_SIZE = (parseInt(process.env.MAX_FILE_SIZE_MB || '10') * 1024 * 1024)

const blobToken = process.env.BLOB_READ_WRITE_TOKEN?.trim()
const useVercelBlob = Boolean(blobToken)

const ALLOWED_TYPES: Record<string, string[]> = {
  document: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  image: [
    'image/jpeg',
    'image/png',
    'image/webp',
  ],
}

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.webp']

function generateSecureFilename(originalName: string): string {
  const ext = path.extname(originalName).toLowerCase()
  const hash = crypto.randomBytes(16).toString('hex')
  const timestamp = Date.now()
  return `${timestamp}-${hash}${ext}`
}

function validateFileType(fileName: string, mimeType: string): boolean {
  const ext = path.extname(fileName).toLowerCase()
  if (!ALLOWED_EXTENSIONS.includes(ext)) return false
  const allAllowed = [...ALLOWED_TYPES.document, ...ALLOWED_TYPES.image]
  return allAllowed.includes(mimeType)
}

async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
  const reader = stream.getReader()
  const chunks: Buffer[] = []
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    if (value) chunks.push(Buffer.from(value))
  }
  return Buffer.concat(chunks)
}

export async function saveFile(
  file: File,
  subDir: string = 'general',
): Promise<{ fileName: string; filePath: string; fileType: string; fileSize: number }> {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`Datei zu groß. Maximum: ${process.env.MAX_FILE_SIZE_MB || 10} MB`)
  }

  if (!validateFileType(file.name, file.type)) {
    throw new Error('Dateityp nicht erlaubt. Erlaubt: PDF, DOC, DOCX, JPG, PNG, WebP')
  }

  const secureFileName = generateSecureFilename(file.name)
  const relativePath = path.join(subDir, secureFileName).replace(/\\/g, '/')

  if (useVercelBlob) {
    const blob = await put(relativePath, file, {
      access: 'private',
      token: blobToken,
      addRandomSuffix: false,
      contentType: file.type,
    })
    return {
      fileName: file.name,
      filePath: blob.pathname,
      fileType: file.type,
      fileSize: file.size,
    }
  }

  const uploadPath = path.join(UPLOAD_DIR, subDir)
  if (!existsSync(uploadPath)) {
    await mkdir(uploadPath, { recursive: true })
  }

  const filePath = path.join(uploadPath, secureFileName)

  const bytes = await file.arrayBuffer()
  await writeFile(filePath, Buffer.from(bytes))

  return {
    fileName: file.name,
    filePath: path.join(subDir, secureFileName),
    fileType: file.type,
    fileSize: file.size,
  }
}

export async function getFile(filePath: string): Promise<Buffer> {
  if (useVercelBlob) {
    const result = await get(filePath, {
      access: 'private',
      token: blobToken,
      useCache: false,
    })
    if (!result || result.statusCode !== 200 || !result.stream) {
      throw new Error('Blob nicht gefunden')
    }
    return streamToBuffer(result.stream)
  }

  const fullPath = path.join(UPLOAD_DIR, filePath)
  return readFile(fullPath)
}

export async function deleteFile(filePath: string): Promise<void> {
  if (useVercelBlob) {
    await del(filePath, { token: blobToken })
    return
  }

  const fullPath = path.join(UPLOAD_DIR, filePath)
  if (existsSync(fullPath)) {
    await unlink(fullPath)
  }
}

export async function getFileStats(filePath: string) {
  if (useVercelBlob) {
    return head(filePath, { token: blobToken })
  }

  const fullPath = path.join(UPLOAD_DIR, filePath)
  return stat(fullPath)
}

export { MAX_FILE_SIZE, ALLOWED_EXTENSIONS }
