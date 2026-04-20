import type { RoleName } from '@/lib/types/enums'

export type Resource =
  | 'dashboard'
  | 'inquiries'
  | 'applicants'
  | 'jobs'
  | 'content'
  | 'users'
  | 'files'
  | 'activity'
  | 'settings'

export type Action = 'view' | 'create' | 'edit' | 'delete' | 'manage'

type PermissionMap = Record<RoleName, Partial<Record<Resource, Action[]>>>

const permissions: PermissionMap = {
  SUPER_ADMIN: {
    dashboard: ['view', 'manage'],
    inquiries: ['view', 'create', 'edit', 'delete', 'manage'],
    applicants: ['view', 'create', 'edit', 'delete', 'manage'],
    jobs: ['view', 'create', 'edit', 'delete', 'manage'],
    content: ['view', 'create', 'edit', 'delete', 'manage'],
    users: ['view', 'create', 'edit', 'delete', 'manage'],
    files: ['view', 'create', 'edit', 'delete', 'manage'],
    activity: ['view', 'manage'],
    settings: ['view', 'edit', 'manage'],
  },
  ADMIN: {
    dashboard: ['view', 'manage'],
    inquiries: ['view', 'create', 'edit', 'delete', 'manage'],
    applicants: ['view', 'create', 'edit', 'delete', 'manage'],
    jobs: ['view', 'create', 'edit', 'delete', 'manage'],
    content: ['view', 'create', 'edit', 'delete', 'manage'],
    users: ['view', 'create', 'edit'],
    files: ['view', 'create', 'edit', 'delete'],
    activity: ['view'],
    settings: ['view', 'edit'],
  },
  RECRUITING: {
    dashboard: ['view'],
    inquiries: ['view'],
    applicants: ['view', 'create', 'edit', 'manage'],
    jobs: ['view', 'create', 'edit'],
    content: [],
    users: [],
    files: ['view', 'create'],
    activity: ['view'],
    settings: [],
  },
  OFFICE_STAFF: {
    dashboard: ['view'],
    inquiries: ['view', 'create', 'edit', 'manage'],
    applicants: ['view'],
    jobs: ['view'],
    content: [],
    users: [],
    files: ['view'],
    activity: ['view'],
    settings: [],
  },
  CONTENT_MANAGER: {
    dashboard: ['view'],
    inquiries: [],
    applicants: [],
    jobs: ['view', 'create', 'edit'],
    content: ['view', 'create', 'edit', 'delete', 'manage'],
    users: [],
    files: ['view', 'create'],
    activity: ['view'],
    settings: [],
  },
  READ_ONLY: {
    dashboard: ['view'],
    inquiries: ['view'],
    applicants: ['view'],
    jobs: ['view'],
    content: ['view'],
    users: [],
    files: ['view'],
    activity: ['view'],
    settings: [],
  },
}

export function hasPermission(
  role: RoleName,
  resource: Resource,
  action: Action
): boolean {
  const rolePerms = permissions[role]
  if (!rolePerms) return false
  const resourcePerms = rolePerms[resource]
  if (!resourcePerms) return false
  return resourcePerms.includes(action)
}

export function getAccessibleResources(role: RoleName): Resource[] {
  const rolePerms = permissions[role]
  if (!rolePerms) return []
  return Object.entries(rolePerms)
    .filter(([, actions]) => actions && actions.length > 0)
    .map(([resource]) => resource as Resource)
}

export function getRoleLabel(role: RoleName): string {
  const labels: Record<RoleName, string> = {
    SUPER_ADMIN: 'Super Admin',
    ADMIN: 'Administrator',
    RECRUITING: 'Recruiting',
    OFFICE_STAFF: 'Büropersonal',
    CONTENT_MANAGER: 'Content Manager',
    READ_ONLY: 'Nur Lesen',
  }
  return labels[role]
}
