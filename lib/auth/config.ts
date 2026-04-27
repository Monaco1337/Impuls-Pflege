import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authEdgeConfig } from '@/lib/auth/auth.config'
import { credentialsAuthorize } from '@/lib/auth/credentials-authorize'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authEdgeConfig,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'Benutzername', type: 'text' },
        password: { label: 'Passwort', type: 'password' },
      },
      authorize: credentialsAuthorize,
    }),
  ],
})
