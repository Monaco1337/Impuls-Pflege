import { Metadata } from 'next'
import { getCurrentUser } from '@/lib/auth/session'
import { redirect } from 'next/navigation'
import {
  getDashboardStats,
  getRecentInquiries,
  getRecentApplicants,
  getRecentActivity,
  getPipelineSummary,
  getInquiryPipelineSummary,
} from '@/lib/actions/dashboard'
import { CommandCenter } from '@/components/admin/command-center'

export const metadata: Metadata = {
  title: 'Übersicht',
}

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/admin/login')

  const [statsResult, inquiriesResult, applicantsResult, activityResult, pipelineResult, inqPipelineResult] =
    await Promise.all([
      getDashboardStats(),
      getRecentInquiries(),
      getRecentApplicants(),
      getRecentActivity(),
      getPipelineSummary(),
      getInquiryPipelineSummary(),
    ])

  const stats = statsResult.data as Record<string, number> | undefined
  const inquiries = (inquiriesResult.data ?? []) as Array<{
    id: string
    fullName: string
    inquiryType: string
    status: string
    createdAt: string | Date
  }>
  const applicants = (applicantsResult.data ?? []) as Array<{
    id: string
    firstName: string
    lastName: string
    positionApplied: string
    status: string
    createdAt: string | Date
  }>
  const activity = (activityResult.data ?? []) as Array<{
    id: string
    action: string
    entityType: string
    entityId: string
    metadata: unknown
    createdAt: string | Date
    user: { firstName: string; lastName: string } | null
  }>
  const applicantPipeline = (pipelineResult.data ?? {}) as Record<string, number>
  const inquiryPipeline = (inqPipelineResult.data ?? {}) as Record<string, number>

  return (
    <CommandCenter
      firstName={user.firstName}
      stats={stats}
      inquiryPipeline={inquiryPipeline}
      applicantPipeline={applicantPipeline}
      inquiries={inquiries}
      applicants={applicants}
      activity={activity}
    />
  )
}
