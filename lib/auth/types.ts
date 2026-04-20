import type { RoleName } from '@/lib/types/enums'
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      firstName: string
      lastName: string
    }
  }

  interface User {
    role?: string
    firstName?: string
    lastName?: string
  }
}

export type SessionUser = {
  id: string
  email: string
  name: string
  role: RoleName
  firstName: string
  lastName: string
}
