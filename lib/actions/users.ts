'use server'

import { prisma } from '@/lib/db'
import { requireAccess } from '@/lib/rbac/check'
import { requireAuth } from '@/lib/auth/session'
import { logAudit } from '@/lib/audit/logger'
import { userSchema, passwordChangeSchema } from '@/lib/validation/schemas'
import { revalidatePath } from 'next/cache'
import { hash, compare } from 'bcryptjs'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

const SALT_ROUNDS = 12

const userSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
  active: true,
  avatar: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
} as const

export async function getUsers(): Promise<ActionResult> {
  try {
    await requireAccess('users', 'view')

    const users = await prisma.user.findMany({
      select: userSelect,
      orderBy: { createdAt: 'desc' },
    })

    return { success: true, data: users }
  } catch (error) {
    console.error('getUsers error:', error)
    return { success: false, error: 'Benutzer konnten nicht geladen werden' }
  }
}

export async function getUser(id: string): Promise<ActionResult> {
  try {
    await requireAccess('users', 'view')

    const user = await prisma.user.findUnique({
      where: { id },
      select: userSelect,
    })

    if (!user) return { success: false, error: 'Benutzer nicht gefunden' }
    return { success: true, data: user }
  } catch (error) {
    console.error('getUser error:', error)
    return { success: false, error: 'Benutzer konnte nicht geladen werden' }
  }
}

export async function createUser(data: unknown): Promise<ActionResult> {
  try {
    const currentUser = await requireAccess('users', 'create')

    const parsed = userSchema.safeParse(data)
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message ?? 'Ungültige Eingabe' }
    }

    if (!parsed.data.password) {
      return { success: false, error: 'Passwort ist erforderlich' }
    }

    const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } })
    if (existing) return { success: false, error: 'E-Mail-Adresse wird bereits verwendet' }

    const passwordHash = await hash(parsed.data.password, SALT_ROUNDS)

    const user = await prisma.user.create({
      data: {
        email: parsed.data.email,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        role: parsed.data.role,
        active: parsed.data.active,
        passwordHash,
      },
      select: userSelect,
    })

    await logAudit({
      userId: currentUser.id,
      action: 'create',
      entityType: 'user',
      entityId: user.id,
      metadata: { email: user.email, role: user.role },
    })

    revalidatePath('/admin/users')
    return { success: true, data: user }
  } catch (error) {
    console.error('createUser error:', error)
    return { success: false, error: 'Benutzer konnte nicht erstellt werden' }
  }
}

export async function updateUser(id: string, data: unknown): Promise<ActionResult> {
  try {
    const currentUser = await requireAccess('users', 'edit')

    const parsed = userSchema.safeParse(data)
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message ?? 'Ungültige Eingabe' }
    }

    const existing = await prisma.user.findFirst({
      where: { email: parsed.data.email, NOT: { id } },
    })
    if (existing) return { success: false, error: 'E-Mail-Adresse wird bereits verwendet' }

    const updateData: Record<string, unknown> = {
      email: parsed.data.email,
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      role: parsed.data.role,
      active: parsed.data.active,
    }

    if (parsed.data.password) {
      updateData.passwordHash = await hash(parsed.data.password, SALT_ROUNDS)
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: userSelect,
    })

    await logAudit({
      userId: currentUser.id,
      action: 'update',
      entityType: 'user',
      entityId: id,
      metadata: {
        email: user.email,
        role: user.role,
        passwordChanged: !!parsed.data.password,
      },
    })

    revalidatePath('/admin/users')
    return { success: true, data: user }
  } catch (error) {
    console.error('updateUser error:', error)
    return { success: false, error: 'Benutzer konnte nicht aktualisiert werden' }
  }
}

export async function toggleUserActive(id: string): Promise<ActionResult> {
  try {
    const currentUser = await requireAccess('users', 'edit')

    const target = await prisma.user.findUnique({ where: { id }, select: { active: true, email: true } })
    if (!target) return { success: false, error: 'Benutzer nicht gefunden' }

    if (id === currentUser.id) {
      return { success: false, error: 'Sie können sich nicht selbst deaktivieren' }
    }

    const user = await prisma.user.update({
      where: { id },
      data: { active: !target.active },
      select: userSelect,
    })

    await logAudit({
      userId: currentUser.id,
      action: 'update',
      entityType: 'user',
      entityId: id,
      metadata: { email: target.email, active: user.active },
    })

    revalidatePath('/admin/users')
    return { success: true, data: user }
  } catch (error) {
    console.error('toggleUserActive error:', error)
    return { success: false, error: 'Status konnte nicht geändert werden' }
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<ActionResult> {
  try {
    const sessionUser = await requireAuth()

    const parsed = passwordChangeSchema.safeParse({
      currentPassword,
      newPassword,
      confirmPassword: newPassword,
    })
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message ?? 'Ungültige Eingabe' }
    }

    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      select: { passwordHash: true },
    })
    if (!user) return { success: false, error: 'Benutzer nicht gefunden' }

    const valid = await compare(currentPassword, user.passwordHash)
    if (!valid) return { success: false, error: 'Aktuelles Passwort ist falsch' }

    const passwordHash = await hash(newPassword, SALT_ROUNDS)
    await prisma.user.update({
      where: { id: sessionUser.id },
      data: { passwordHash },
    })

    await logAudit({
      userId: sessionUser.id,
      action: 'password_change',
      entityType: 'user',
      entityId: sessionUser.id,
    })

    return { success: true }
  } catch (error) {
    console.error('changePassword error:', error)
    return { success: false, error: 'Passwort konnte nicht geändert werden' }
  }
}
