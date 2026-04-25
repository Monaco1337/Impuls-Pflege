import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function AdminActivityRedirectPage() {
  redirect('/admin/settings/activity')
}
