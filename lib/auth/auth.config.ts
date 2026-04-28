import type { NextAuthConfig } from 'next-auth'

/**
 * Ohne AUTH_SECRET schlägt /api/auth/session mit 500 fehl → ClientFetchError im SessionProvider.
 * In Produktion muss AUTH_SECRET gesetzt sein (z. B. Vercel).
 */
function resolveAuthSecret(): string | undefined {
  if (process.env.AUTH_SECRET) return process.env.AUTH_SECRET
  if (process.env.NODE_ENV === 'development') {
    return 'impuls-pflege-dev-only-secret-min-32-chars!!'
  }
  return undefined
}

/**
 * Nur für Middleware / Edge: keine Provider, kein Prisma — gleiche Session-/JWT-Logik wie in lib/auth/config.ts.
 */
export const authEdgeConfig = {
  secret: resolveAuthSecret(),
  trustHost: true,
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role?: string }).role
        token.firstName = (user as { firstName?: string }).firstName
        token.lastName = (user as { lastName?: string }).lastName
        token.email = (user as { email?: string }).email ?? token.email
        token.name =
          (user as { name?: string }).name ??
          `${(user as { firstName?: string }).firstName ?? ''} ${(user as { lastName?: string }).lastName ?? ''}`.trim()
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.firstName = token.firstName as string
        session.user.lastName = token.lastName as string
        if (token.email) session.user.email = token.email as string
        if (token.name) session.user.name = token.name as string
      }
      return session
    },
    async authorized({ auth, request }) {
      // Trailing-Slash-tolerant: `next.config.ts` setzt `trailingSlash: true`,
      // d.h. `/admin/login` und `/admin/login/` sind beides legitime Eingangs-URLs.
      // Strikter `===`-Vergleich würde sonst eine Redirect-Schleife auslösen
      // (Login-Page würde nicht erkannt → Auth-Redirect → Slash-Normalisierung → loop).
      const rawPath = request.nextUrl.pathname
      const path = rawPath.length > 1 && rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath

      const isAdmin = path === '/admin' || path.startsWith('/admin/')
      const isLoginPage = path === '/admin/login'

      if (isLoginPage) {
        if (auth) {
          const dest = new URL('/admin/dashboard', request.nextUrl)
          return Response.redirect(dest)
        }
        return true
      }

      if (isAdmin && !auth) {
        const dest = new URL('/admin/login', request.nextUrl)
        // CallbackUrl mitgeben, damit Login zurückspringt. Ohne lokale URL,
        // damit kein Open-Redirect entstehen kann.
        dest.searchParams.set('callbackUrl', rawPath + request.nextUrl.search)
        return Response.redirect(dest)
      }

      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig
