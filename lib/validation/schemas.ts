import { z } from 'zod'

// ─── Contact / Inquiry ──────────────────────────────

export const inquirySchema = z.object({
  fullName: z.string().min(2, 'Bitte geben Sie Ihren Namen ein').max(100),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  phone: z.string().max(30).optional(),
  inquiryType: z.string().min(1, 'Bitte wählen Sie eine Anfrageart'),
  message: z.string().min(10, 'Bitte beschreiben Sie Ihr Anliegen').max(5000),
  preferredCallback: z.string().max(200).optional(),
})

export type InquiryFormData = z.infer<typeof inquirySchema>

// ─── Application ────────────────────────────────────

export const applicationSchema = z.object({
  firstName: z.string().min(1, 'Vorname ist erforderlich').max(50),
  lastName: z.string().min(1, 'Nachname ist erforderlich').max(50),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  phone: z.string().min(1, 'Telefonnummer ist erforderlich').max(30),
  address: z.string().max(200).optional(),
  positionApplied: z.string().min(1, 'Bitte wählen Sie eine Stelle'),
  availability: z.string().max(200).optional(),
  qualification: z.string().max(500).optional(),
  experience: z.string().max(500).optional(),
  motivation: z.string().max(5000).optional(),
  privacy: z.literal(true, {
    errorMap: () => ({ message: 'Bitte stimmen Sie der Datenschutzerklärung zu' }),
  }),
})

export type ApplicationFormData = z.infer<typeof applicationSchema>

// ─── Job Posting ────────────────────────────────────

export const jobPostingSchema = z.object({
  title: z.string().min(2, 'Titel ist erforderlich').max(200),
  slug: z.string().min(2).max(200).regex(/^[a-z0-9-]+$/, 'Slug darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten'),
  department: z.string().max(100).optional(),
  location: z.string().max(100).default('Unna'),
  employmentType: z.enum(['VOLLZEIT', 'TEILZEIT', 'MINIJOB', 'WERKSTUDENT', 'PRAKTIKUM', 'FREIBERUFLICH']),
  workload: z.string().max(100).optional(),
  shortIntro: z.string().min(10, 'Kurztext ist erforderlich').max(500),
  description: z.string().min(10, 'Beschreibung ist erforderlich').max(10000),
  requirements: z.string().max(5000).optional(),
  benefits: z.string().max(5000).optional(),
  contactPersonId: z.string().optional(),
  active: z.boolean().default(true),
  publishDate: z.string().optional(),
  sortOrder: z.number().int().default(0),
})

export type JobPostingFormData = z.infer<typeof jobPostingSchema>

// ─── User Management ────────────────────────────────

const usernameField = z
  .string()
  .min(2, 'Benutzername mindestens 2 Zeichen')
  .max(64)
  .regex(
    /^[a-zA-Z0-9._-]+$/,
    'Nur Buchstaben, Zahlen, Punkt, Unterstrich und Bindestrich (keine Leerzeichen)',
  )

export const userSchema = z.object({
  username: usernameField,
  email: z.string().email('Ungültige E-Mail-Adresse'),
  firstName: z.string().min(1, 'Vorname ist erforderlich').max(50),
  lastName: z.string().min(1, 'Nachname ist erforderlich').max(50),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'RECRUITING', 'OFFICE_STAFF', 'CONTENT_MANAGER', 'READ_ONLY']),
  active: z.boolean().default(true),
  password: z.string().min(8, 'Passwort muss mindestens 8 Zeichen lang sein').optional(),
})

export type UserFormData = z.infer<typeof userSchema>

// ─── Login ──────────────────────────────────────────

export const loginSchema = z.object({
  username: z.string().min(1, 'Benutzername ist erforderlich').max(64),
  password: z.string().min(1, 'Passwort ist erforderlich'),
})

export type LoginFormData = z.infer<typeof loginSchema>

// ─── Content Block ──────────────────────────────────

export const contentBlockSchema = z.object({
  key: z.string().min(1).max(100).optional(),
  title: z.string().max(200).optional(),
  content: z.any(),
  imageUrl: z.string().max(500).optional(),
  sortOrder: z.number().int().optional(),
})

export type ContentBlockFormData = z.infer<typeof contentBlockSchema>

// ─── Notes ──────────────────────────────────────────

export const noteSchema = z.object({
  content: z.string().min(1, 'Notiz darf nicht leer sein').max(5000),
})

export type NoteFormData = z.infer<typeof noteSchema>

// ─── Password Change ────────────────────────────────

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Aktuelles Passwort ist erforderlich'),
  newPassword: z.string().min(8, 'Neues Passwort muss mindestens 8 Zeichen lang sein'),
  confirmPassword: z.string().min(1, 'Passwort-Bestätigung ist erforderlich'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwörter stimmen nicht überein',
  path: ['confirmPassword'],
})

export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>

// ─── Settings ───────────────────────────────────────

export const settingsSchema = z.object({
  org_name: z.string().min(1).max(200),
  org_address: z.string().min(1).max(300),
  org_phone: z.string().min(1).max(30),
  org_email: z.string().email(),
})

export type SettingsFormData = z.infer<typeof settingsSchema>
