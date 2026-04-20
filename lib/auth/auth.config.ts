import type { NextAuthConfig } from 'next-auth'

/**
 * Nur für Middleware / Edge: keine Provider, kein Prisma — gleiche Session-/JWT-Logik wie in lib/auth/config.ts.
 */
export const authEdgeConfig = {
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
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.firstName = token.firstName as string
        session.user.lastName = token.lastName as string
      }
      return session
    },
    async authorized({ auth, request }) {
      const isAdmin = request.nextUrl.pathname.startsWith('/admin')
      const isLoginPage = request.nextUrl.pathname === '/admin/login'

      if (isLoginPage) {
        if (auth) return Response.redirect(new URL('/admin/dashboard', request.nextUrl))
        return true
      }

      if (isAdmin && !auth) {
        return Response.redirect(new URL('/admin/login', request.nextUrl))
      }

      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig
