'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        username: username.trim(),
        password,
        redirect: false,
      })

      if (result?.error) {
        if (
          result.error === 'CredentialsSignin' &&
          result.code === 'database_unavailable'
        ) {
          setError(
            'Daten-Backend nicht erreichbar. Prüfen Sie lokal die Dateien unter data/ und auf Vercel GIT_TOKEN sowie GITHUB_REPO_OWNER / GITHUB_REPO_NAME.',
          )
        } else if (result.error === 'CredentialsSignin') {
          setError('Ungültige Anmeldedaten')
        } else {
          setError(
            `Anmeldung fehlgeschlagen (${result.error}). Prüfen Sie AUTH_URL (leer lassen für lokalen Dev mit beliebigem Port) und AUTH_SECRET.`,
          )
        }
        setLoading(false)
        return
      }

      if (result?.ok !== true) {
        setError('Anmeldung fehlgeschlagen. Bitte Seite neu laden und erneut versuchen.')
        setLoading(false)
        return
      }

      setPassword('')
      router.refresh()
      router.push('/admin/dashboard')
    } catch {
      setError('Ein Fehler ist aufgetreten')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-warm-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <Logo size="lg" className="inline-flex" />
        </div>

        <div className="rounded-xl border border-warm-200 bg-white p-8 shadow-sm">
          <h1 className="mb-1 text-xl font-semibold text-warm-900">Anmeldung</h1>
          <p className="mb-6 text-sm text-warm-500">
            Melden Sie sich mit Benutzername und Passwort an
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
            <div>
              <label
                htmlFor="admin-username"
                className="mb-1.5 block text-sm font-medium text-warm-700"
              >
                Benutzername
              </label>
              <input
                id="admin-username"
                name="username"
                type="text"
                inputMode="text"
                autoComplete="username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-lg border border-warm-300 bg-white px-3.5 py-2.5 text-sm text-warm-900 placeholder:text-warm-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
                placeholder="Benutzername"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-sm font-medium text-warm-700"
              >
                Passwort
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-warm-300 bg-white px-3.5 py-2.5 text-sm text-warm-900 placeholder:text-warm-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-error-50 px-3.5 py-2.5 text-sm font-medium text-error-700">
                {error}
              </div>
            )}

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              Anmelden
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-warm-400">
          &copy; {new Date().getFullYear()} IMPULS Ambulanter Pflegedienst
        </p>
      </div>
    </div>
  )
}
