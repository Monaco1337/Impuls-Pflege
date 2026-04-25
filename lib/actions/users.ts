'use server'

import { requireAccess } from '@/lib/rbac/check'
import { requireAuth } from '@/lib/auth/session'
import { logAudit } from '@/lib/audit/logger'
import { userSchema, passwordChangeSchema } from '@/lib/validation/schemas'
import { revalidatePath } from 'next/cache'
import { hash, compare } from 'bcryptjs'
import { logServerError } from '@/lib/error-handling'
import {
  newId,
  nowIso,
  repoLoadUsers,
  repoPickUser,
} from '@/lib/data/json-repository'
import { DATA_FILES } from '@/lib/data/schema'
import type { JsonUser } from '@/lib/data/schema'
import { writeJsonFile } from '@/lib/storage/json-data-layer'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

const SALT_ROUNDS = 12

function pick(u: JsonUser) {
  const p = repoPickUser(u)
  return {
    id: p.id,
    email: p.email,
    firstName: p.firstName,
    lastName: p.lastName,
    role: p.role,
    active: p.active,
    avatar: p.avatar,
    lastLoginAt: p.lastLoginAt,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }
}

export async function getUsers(): Promise<ActionResult> {
  try {
    await requireAccess('users', 'view')

    const users = await repoLoadUsers()
    const sorted = [...users].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return { success: true, data: sorted.map(pick) }
  } catch (error) {
    logServerError('getUsers error', error)
    return { success: false, error: 'Benutzer konnten nicht geladen werden' }
  }
}

export async function getUser(id: string): Promise<ActionResult> {
  try {
    await requireAccess('users', 'view')

    const users = await repoLoadUsers()
    const user = users.find((u) => u.id === id)
    if (!user) return { success: false, error: 'Benutzer nicht gefunden' }
    return { success: true, data: pick(user) }
  } catch (error) {
    logServerError('getUser error', error)
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

    const users = await repoLoadUsers()
    if (users.some((u) => u.email.toLowerCase() === parsed.data.email.toLowerCase())) {
      return { success: false, error: 'E-Mail-Adresse wird bereits verwendet' }
    }

    const passwordHash = await hash(parsed.data.password, SALT_ROUNDS)
    const t = nowIso()
    const user: JsonUser = {
      id: newId(),
      email: parsed.data.email,
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      role: parsed.data.role,
      active: parsed.data.active,
      passwordHash,
      avatar: null,
      lastLoginAt: null,
      createdAt: t,
      updatedAt: t,
    }
    users.push(user)

    await writeJsonFile(DATA_FILES.users, users, `Data update users create: ${t}`)

    await logAudit({
      userId: currentUser.id,
      action: 'create',
      entityType: 'user',
      entityId: user.id,
      metadata: { email: user.email, role: user.role },
    })

    revalidatePath('/admin/users')
    revalidatePath('/admin/settings/users')
    return { success: true, data: pick(user) }
  } catch (error) {
    logServerError('createUser error', error)
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

    const users = await repoLoadUsers()
    const idx = users.findIndex((u) => u.id === id)
    if (idx === -1) return { success: false, error: 'Benutzer nicht gefunden' }

    if (
      users.some(
        (u) => u.email.toLowerCase() === parsed.data.email.toLowerCase() && u.id !== id,
      )
    ) {
      return { success: false, error: 'E-Mail-Adresse wird bereits verwendet' }
    }

    const u = users[idx]
    u.email = parsed.data.email
    u.firstName = parsed.data.firstName
    u.lastName = parsed.data.lastName
    u.role = parsed.data.role
    u.active = parsed.data.active
    if (parsed.data.password) {
      u.passwordHash = await hash(parsed.data.password, SALT_ROUNDS)
    }
    u.updatedAt = nowIso()

    await writeJsonFile(DATA_FILES.users, users, `Data update users ${id}: ${u.updatedAt}`)

    await logAudit({
      userId: currentUser.id,
      action: 'update',
      entityType: 'user',
      entityId: id,
      metadata: {
        email: u.email,
        role: u.role,
        passwordChanged: !!parsed.data.password,
      },
    })

    revalidatePath('/admin/users')
    revalidatePath('/admin/settings/users')
    return { success: true, data: pick(u) }
  } catch (error) {
    logServerError('updateUser error', error)
    return { success: false, error: 'Benutzer konnte nicht aktualisiert werden' }
  }
}

export async function toggleUserActive(id: string): Promise<ActionResult> {
  try {
    const currentUser = await requireAccess('users', 'edit')

    const users = await repoLoadUsers()
    const idx = users.findIndex((u) => u.id === id)
    if (idx === -1) return { success: false, error: 'Benutzer nicht gefunden' }

    if (id === currentUser.id) {
      return { success: false, error: 'Sie können sich nicht selbst deaktivieren' }
    }

    const target = users[idx]
    target.active = !target.active
    target.updatedAt = nowIso()

    await writeJsonFile(DATA_FILES.users, users, `Data update users toggle ${id}: ${target.updatedAt}`)

    await logAudit({
      userId: currentUser.id,
      action: 'update',
      entityType: 'user',
      entityId: id,
      metadata: { email: target.email, active: target.active },
    })

    revalidatePath('/admin/users')
    revalidatePath('/admin/settings/users')
    return { success: true, data: pick(target) }
  } catch (error) {
    logServerError('toggleUserActive error', error)
    return { success: false, error: 'Status konnte nicht geändert werden' }
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
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

    const users = await repoLoadUsers()
    const idx = users.findIndex((u) => u.id === sessionUser.id)
    if (idx === -1) return { success: false, error: 'Benutzer nicht gefunden' }

    const u = users[idx]
    const valid = await compare(currentPassword, u.passwordHash)
    if (!valid) return { success: false, error: 'Aktuelles Passwort ist falsch' }

    u.passwordHash = await hash(newPassword, SALT_ROUNDS)
    u.updatedAt = nowIso()

    await writeJsonFile(DATA_FILES.users, users, `Data update users password ${sessionUser.id}: ${u.updatedAt}`)

    await logAudit({
      userId: sessionUser.id,
      action: 'password_change',
      entityType: 'user',
      entityId: sessionUser.id,
    })

    return { success: true }
  } catch (error) {
    logServerError('changePassword error', error)
    return { success: false, error: 'Passwort konnte nicht geändert werden' }
  }
}
