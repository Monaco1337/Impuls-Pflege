import { Metadata } from 'next'
import { getCurrentUser } from '@/lib/auth/session'
import { redirect } from 'next/navigation'
import {
  getDashboardStats,
  getRecentInquiries,
  getRecentApplicants,
  getRecentAnamnese,
  getPipelineSummary,
  getInquiryPipelineSummary,
  getAnamnesePipelineSummary,
} from '@/lib/actions/dashboard'
import { CommandCenter } from '@/components/admin/command-center'

export const metadata: Metadata = {
  title: 'Übersicht',
}

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/admin/login')

  const [statsResult, inquiriesResult, applicantsResult, anamneseResult, pipelineResult, inqPipelineResult, anamPipelineResult] =
    await Promise.all([
      getDashboardStats(),
      getRecentInquiries(),
      getRecentApplicants(),
      getRecentAnamnese(),
      getPipelineSummary(),
      getInquiryPipelineSummary(),
      getAnamnesePipelineSummary(),
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
  const anamnese = (anamneseResult.data ?? []) as Array<{
    id: string
    patientFirstName: string
    patientLastName: string
    status: string
    createdAt: string | Date
  }>
  const applicantPipeline = (pipelineResult.data ?? {}) as Record<string, number>
  const inquiryPipeline = (inqPipelineResult.data ?? {}) as Record<string, number>
  const anamnesePipeline = (anamPipelineResult.data ?? {}) as Record<string, number>

  return (
    <CommandCenter
      firstName={user.firstName}
      userRole={user.role}
      stats={stats}
      inquiryPipeline={inquiryPipeline}
      applicantPipeline={applicantPipeline}
      anamnesePipeline={anamnesePipeline}
      inquiries={inquiries}
      applicants={applicants}
      anamnese={anamnese}
    />
  )
}
