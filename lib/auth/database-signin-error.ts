import { CredentialsSignin } from 'next-auth'

/** Thrown from credentials authorize when Prisma/DB is unavailable (distinct code for UI). */
export class AuthDatabaseUnavailable extends CredentialsSignin {
  constructor() {
    super()
    this.code = 'database_unavailable'
  }
}
