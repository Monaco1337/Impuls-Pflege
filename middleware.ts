export { edgeAuth as middleware } from '@/lib/auth/middleware-auth'

export const config = {
  matcher: ['/admin/:path*'],
}
