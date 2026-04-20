import NextAuth from 'next-auth'
import { authEdgeConfig } from '@/lib/auth/auth.config'

export const { auth: edgeAuth } = NextAuth(authEdgeConfig)
