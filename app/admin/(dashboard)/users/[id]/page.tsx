import { redirect, notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminUserIdRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!id) notFound()
  redirect(`/admin/settings/users/${id}`)
}
