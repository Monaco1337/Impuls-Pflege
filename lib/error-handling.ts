export function isDatabaseUnavailableError(error: unknown): boolean {
  if (!error) return false
  const text = String(error)
  return (
    text.includes('PrismaClientInitializationError') ||
    text.includes("Can't reach database server") ||
    text.includes('ECONNREFUSED') ||
    text.includes('127.0.0.1:5432') ||
    text.includes('localhost:5432')
  )
}

export function logServerError(context: string, error: unknown): void {
  if (isDatabaseUnavailableError(error)) {
    if (process.env.NODE_ENV !== 'production') {
      console.info(`[${context}] Datenbank nicht erreichbar; Fallback aktiviert.`)
    }
    return
  }
  console.error(`${context}:`, error)
}
