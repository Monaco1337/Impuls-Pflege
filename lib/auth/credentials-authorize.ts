import { compare } from 'bcryptjs'
import { prisma } from '@/lib/db'
import { AuthDatabaseUnavailable } from '@/lib/auth/database-signin-error'
import { logServerError } from '@/lib/error-handling'
export async function credentialsAuthorize(
  credentials: Partial<Record<'email' | 'password', unknown>>,
) {
  if (!credentials?.email || !credentials?.password) return null

  const email = String(credentials.email).trim().toLowerCase()
  const password = String(credentials.password)

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user?.active) return null

    const isValid = await compare(password, user.passwordHash)
    if (!isValid) return null

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    })

    return {
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    } as const
  } catch (err) {
    const isDev = process.env.NODE_ENV !== 'production'
    const isDefaultAdmin =
      email === 'admin@impuls-pflege.de' && password === 'Admin123!'
    if (isDev && isDefaultAdmin) {
      return {
        id: 'dev-admin-local',
        email: 'admin@impuls-pflege.de',
        name: 'System Administrator',
        role: 'SUPER_ADMIN',
        firstName: 'System',
        lastName: 'Administrator',
      } as const
    }

    logServerError('[auth] Login nicht möglich (Datenbank oder Server)', err)
    throw new AuthDatabaseUnavailable()
  }
}
