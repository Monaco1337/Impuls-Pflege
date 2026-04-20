const rateLimitMap = new Map<string, { count: number; lastReset: number }>()

const WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS = 10

export function rateLimit(identifier: string): { success: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record || now - record.lastReset > WINDOW_MS) {
    rateLimitMap.set(identifier, { count: 1, lastReset: now })
    return { success: true, remaining: MAX_REQUESTS - 1 }
  }

  if (record.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0 }
  }

  record.count++
  return { success: true, remaining: MAX_REQUESTS - record.count }
}

// Clean up old entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, value] of rateLimitMap.entries()) {
      if (now - value.lastReset > WINDOW_MS * 2) {
        rateLimitMap.delete(key)
      }
    }
  }, WINDOW_MS * 2)
}
