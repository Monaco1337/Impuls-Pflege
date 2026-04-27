import { compare } from 'bcryptjs'
import { AuthDatabaseUnavailable } from '@/lib/auth/database-signin-error'
import { logServerError } from '@/lib/error-handling'
import { normalizeSignInLogin } from '@/lib/data/user-login'
import { repoFindUserBySignInName, repoUpdateUserLastLogin } from '@/lib/data/json-repository'

export async function credentialsAuthorize(
  credentials: Partial<Record<'username' | 'password', unknown>>,
) {
  if (!credentials?.username || !credentials?.password) return null

  const login = normalizeSignInLogin(String(credentials.username))
  const password = String(credentials.password)

  try {
    const user = await repoFindUserBySignInName(login)

    if (!user?.active) return null

    const isValid = await compare(password, user.passwordHash)
    if (!isValid) return null

    await repoUpdateUserLastLogin(user.id)

    return {
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    } as const
  } catch (err) {
    logServerError('[auth] Login nicht möglich (Daten-Layer)', err)
    throw new AuthDatabaseUnavailable()
  }
}
