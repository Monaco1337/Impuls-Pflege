'use client'

import { useState, useTransition, type ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  Activity,
  AlertTriangle,
  Brain,
  CheckCircle2,
  Heart,
  Home,
  Save,
  ScanHeart,
  Trash2,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  saveAnamneseErgaenzung,
  deleteAnamneseErgaenzung,
} from '@/lib/actions/anamnese-ergaenzung'
import type { AnamneseErgaenzung } from '@/lib/types/anamnese-ergaenzung'
import { cn } from '@/lib/utils'

const SCHMERZ_OPTIONS = [
  { value: 'keine', label: 'Keine' },
  { value: 'leicht', label: 'Leicht' },
  { value: 'mittel', label: 'Mittel' },
  { value: 'stark', label: 'Stark' },
  { value: 'sehr_stark', label: 'Sehr stark' },
]

const MOB_INNEN_OPTIONS = [
  { value: 'selbststaendig', label: 'Selbstständig' },
  { value: 'mit_hilfe', label: 'Mit Hilfsmittel' },
  { value: 'mit_person', label: 'Mit Personenhilfe' },
  { value: 'immobil', label: 'Bettlägerig' },
]

const MOB_AUSSEN_OPTIONS = [
  { value: 'selbststaendig', label: 'Selbstständig' },
  { value: 'mit_hilfe', label: 'Mit Hilfsmittel' },
  { value: 'mit_person', label: 'Mit Begleitung' },
  { value: 'nicht_moeglich', label: 'Nicht möglich' },
]

const STURZ_OPTIONS = [
  { value: 'gering', label: 'Gering' },
  { value: 'mittel', label: 'Mittel' },
  { value: 'hoch', label: 'Hoch' },
  { value: 'unbekannt', label: 'Unbekannt' },
]

const ADL_OPTIONS = [
  { value: 'selbststaendig', label: 'Selbstständig' },
  { value: 'teilweise', label: 'Teilweise Hilfe' },
  { value: 'vollstaendig', label: 'Vollständige Hilfe' },
]

const ORIENTIERUNG_OPTIONS = [
  { value: 'voll', label: 'Voll orientiert' },
  { value: 'zeitweise', label: 'Zeitweise eingeschränkt' },
  { value: 'stark', label: 'Stark eingeschränkt' },
  { value: 'desorientiert', label: 'Desorientiert' },
]

const DEMENZ_OPTIONS = [
  { value: 'nein', label: 'Nein' },
  { value: 'leicht', label: 'Leicht' },
  { value: 'mittel', label: 'Mittel' },
  { value: 'schwer', label: 'Schwer' },
  { value: 'unbekannt', label: 'Unklar' },
]

const KOMM_OPTIONS = [
  { value: 'uneingeschraenkt', label: 'Uneingeschränkt' },
  { value: 'eingeschraenkt', label: 'Eingeschränkt' },
  { value: 'stark_eingeschraenkt', label: 'Stark eingeschränkt' },
  { value: 'nicht_moeglich', label: 'Nicht möglich' },
]

const ZUGANG_OPTIONS = [
  { value: 'schluessel', label: 'Schlüssel hinterlegt' },
  { value: 'tresor', label: 'Schlüsseltresor' },
  { value: 'anwesend', label: 'Person öffnet' },
  { value: 'sonstiges', label: 'Sonstiges' },
]

const PSYCHE_FIELDS: { name: keyof AnamneseErgaenzung; label: string }[] = [
  { name: 'psyche_angst', label: 'Ängste (z. B. Sturzangst, Alleinsein)' },
  { name: 'psyche_depression', label: 'Depressive Verstimmung' },
  { name: 'psyche_unruhe', label: 'Unruhe / Agitiertheit' },
  { name: 'psyche_schlaf', label: 'Schlafstörungen' },
  { name: 'psyche_antriebslos', label: 'Antriebslosigkeit' },
  { name: 'psyche_aggression', label: 'Aggressives Verhalten' },
]

interface AnamneseErgaenzungFormProps {
  submissionId: string
  patientName: string
  initial: AnamneseErgaenzung
  hasErgaenzung: boolean
  canEdit: boolean
}

export function AnamneseErgaenzungForm({
  submissionId,
  patientName,
  initial,
  hasErgaenzung,
  canEdit,
}: AnamneseErgaenzungFormProps) {
  const router = useRouter()
  const [data, setData] = useState<AnamneseErgaenzung>(initial)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const set = <K extends keyof AnamneseErgaenzung>(key: K, value: AnamneseErgaenzung[K]) => {
    setData((p) => ({ ...p, [key]: value }))
  }
  const handleString = (key: keyof AnamneseErgaenzung) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    set(key, e.target.value as AnamneseErgaenzung[typeof key])
  }
  const handleBool = (key: keyof AnamneseErgaenzung) => (e: ChangeEvent<HTMLInputElement>) => {
    set(key, e.target.checked as AnamneseErgaenzung[typeof key])
  }

  const submit = () => {
    setError(null)
    startTransition(async () => {
      const result = await saveAnamneseErgaenzung(submissionId, data)
      if (result.success) {
        setSavedAt(new Date().toLocaleTimeString('de-DE'))
        router.refresh()
      } else {
        setError(result.error ?? 'Speichern fehlgeschlagen')
      }
    })
  }

  const remove = () => {
    setError(null)
    startTransition(async () => {
      const result = await deleteAnamneseErgaenzung(submissionId)
      if (result.success) {
        setData({})
        setConfirmDelete(false)
        router.refresh()
      } else {
        setError(result.error ?? 'Entfernen fehlgeschlagen')
      }
    })
  }

  return (
    <div className="space-y-8">
      {/* Sticky save bar */}
      <div className="sticky top-4 z-10 flex flex-col gap-3 rounded-2xl border border-warm-200 bg-white/95 p-4 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-warm-900">
            Vor-Ort-Erfassung für {patientName}
          </h2>
          <p className="mt-0.5 text-xs text-warm-500">
            Beim Erstgespräch direkt am Tablet ausfüllen — Auto-Save erfolgt nicht,
            bitte am Ende speichern.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {savedAt && (
            <span className="inline-flex items-center gap-1 rounded-full border border-success-200 bg-success-50 px-2.5 py-1 text-xs font-medium text-success-700">
              <CheckCircle2 className="h-3.5 w-3.5" /> Gespeichert {savedAt}
            </span>
          )}
          {hasErgaenzung && canEdit && (
            <Button
              variant="ghost"
              size="sm"
              icon={<Trash2 className="h-4 w-4" />}
              onClick={() => setConfirmDelete(true)}
              disabled={isPending}
              className="text-error-500 hover:bg-error-50 hover:text-error-600"
            >
              Entfernen
            </Button>
          )}
          {canEdit && (
            <Button
              onClick={submit}
              loading={isPending}
              icon={<Save className="h-4 w-4" />}
            >
              Speichern
            </Button>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700">
          <span className="inline-flex items-center gap-2 font-medium">
            <AlertTriangle className="h-4 w-4" /> {error}
          </span>
        </div>
      )}

      {/* Stammdaten-Ergänzungen */}
      <Section icon={User} title="Stammdaten-Ergänzungen">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Konfession"
            value={(data.konfession as string) ?? ''}
            onChange={handleString('konfession')}
            placeholder="z. B. evangelisch, katholisch, ohne"
            disabled={!canEdit}
          />
          <Input
            label="Gewicht (kg)"
            value={(data.gewicht as string) ?? ''}
            onChange={handleString('gewicht')}
            placeholder="75"
            inputMode="decimal"
            disabled={!canEdit}
          />
        </div>
      </Section>

      {/* Schmerzsituation */}
      <Section icon={ScanHeart} title="Schmerzsituation">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Bestehen aktuell Schmerzen?"
            value={(data.schmerzen as string) ?? ''}
            onChange={handleString('schmerzen')}
            options={SCHMERZ_OPTIONS}
            placeholder="Bitte wählen"
            disabled={!canEdit}
          />
          {data.schmerzen && data.schmerzen !== 'keine' && (
            <Input
              label="Schmerzlokalisation"
              value={(data.schmerzen_ort as string) ?? ''}
              onChange={handleString('schmerzen_ort')}
              placeholder="Rücken, Knie, Kopf …"
              disabled={!canEdit}
            />
          )}
        </div>
      </Section>

      {/* Mobilität & Alltag */}
      <Section icon={Activity} title="Mobilität & Alltag">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Mobilität in der Wohnung"
            value={(data.mobilitaet_innen as string) ?? ''}
            onChange={handleString('mobilitaet_innen')}
            options={MOB_INNEN_OPTIONS}
            placeholder="Bitte wählen"
            disabled={!canEdit}
          />
          <Select
            label="Mobilität außerhalb"
            value={(data.mobilitaet_aussen as string) ?? ''}
            onChange={handleString('mobilitaet_aussen')}
            options={MOB_AUSSEN_OPTIONS}
            placeholder="Bitte wählen"
            disabled={!canEdit}
          />
        </div>

        <div className="mt-4">
          <Select
            label="Sturzrisiko"
            value={(data.sturzrisiko as string) ?? ''}
            onChange={handleString('sturzrisiko')}
            options={STURZ_OPTIONS}
            placeholder="Bitte wählen"
            disabled={!canEdit}
          />
        </div>

        <div className="mt-4">
          <Textarea
            label="Besonderheiten Mobilität"
            value={(data.mobilitaet_besonderheiten as string) ?? ''}
            onChange={handleString('mobilitaet_besonderheiten')}
            placeholder="Sturzneigung, Schwindel, Nachtunruhe …"
            rows={2}
            disabled={!canEdit}
          />
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm font-medium text-warm-700">
            Alltagsaktivitäten (ADL)
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {([
              ['adl_koerperpflege', 'Körperpflege'],
              ['adl_ankleiden', 'An-/Auskleiden'],
              ['adl_ernaehrung', 'Essen & Trinken'],
              ['adl_toilette', 'Toilettengang'],
              ['adl_transfers', 'Transfers'],
            ] as const).map(([name, label]) => (
              <Select
                key={name}
                label={label}
                value={(data[name] as string) ?? ''}
                onChange={handleString(name)}
                options={ADL_OPTIONS}
                placeholder="—"
                disabled={!canEdit}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Kognition & Psyche */}
      <Section icon={Brain} title="Kognition & Psyche">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Orientierung"
            value={(data.orientierung as string) ?? ''}
            onChange={handleString('orientierung')}
            options={ORIENTIERUNG_OPTIONS}
            placeholder="Bitte wählen"
            disabled={!canEdit}
          />
          <Select
            label="Demenzerkrankung"
            value={(data.demenz as string) ?? ''}
            onChange={handleString('demenz')}
            options={DEMENZ_OPTIONS}
            placeholder="Bitte wählen"
            disabled={!canEdit}
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Select
            label="Sprachliche Verständigung"
            value={(data.kommunikation as string) ?? ''}
            onChange={handleString('kommunikation')}
            options={KOMM_OPTIONS}
            placeholder="Bitte wählen"
            disabled={!canEdit}
          />
          <Input
            label="Muttersprache"
            value={(data.muttersprache as string) ?? ''}
            onChange={handleString('muttersprache')}
            placeholder="Deutsch"
            disabled={!canEdit}
          />
        </div>

        <div className="mt-6">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-warm-700">
            <Heart className="h-4 w-4 text-rose-500" />
            Psychisches Wohlbefinden
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {PSYCHE_FIELDS.map(({ name, label }) => (
              <CheckboxRow
                key={name as string}
                label={label}
                checked={Boolean(data[name])}
                onChange={handleBool(name)}
                disabled={!canEdit}
              />
            ))}
          </div>
          <div className="mt-4">
            <Textarea
              label="Sonstige Hinweise zur Psyche"
              value={(data.psyche_sonstiges as string) ?? ''}
              onChange={handleString('psyche_sonstiges')}
              placeholder="Laufende Therapien, besondere Verhaltensweisen …"
              rows={3}
              disabled={!canEdit}
            />
          </div>
        </div>
      </Section>

      {/* Wohnungszugang */}
      <Section icon={Home} title="Zugang zur Wohnung">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Wie kommen wir hinein?"
            value={(data.schluessel as string) ?? ''}
            onChange={handleString('schluessel')}
            options={ZUGANG_OPTIONS}
            placeholder="Bitte wählen"
            disabled={!canEdit}
          />
        </div>
        <div className="mt-4">
          <Textarea
            label="Hinweise zum Zugang"
            value={(data.zugang_hinweise as string) ?? ''}
            onChange={handleString('zugang_hinweise')}
            placeholder="Tresor-Code separat, Hund im Flur, Hintereingang …"
            rows={2}
            disabled={!canEdit}
          />
        </div>
      </Section>

      {/* Notiz */}
      <Section icon={CheckCircle2} title="Interne Notiz">
        <Textarea
          label="Notiz für das Team"
          value={(data.notiz as string) ?? ''}
          onChange={handleString('notiz')}
          placeholder="Zusätzliche Beobachtungen aus dem Erstgespräch …"
          rows={3}
          disabled={!canEdit}
        />
      </Section>

      {/* Footer save */}
      {canEdit && (
        <div className="flex justify-end pt-2">
          <Button
            onClick={submit}
            loading={isPending}
            icon={<Save className="h-4 w-4" />}
          >
            Erfassung speichern
          </Button>
        </div>
      )}

      {/* Delete confirmation */}
      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogClose onClose={() => setConfirmDelete(false)} />
        <DialogHeader>
          <DialogTitle>Vor-Ort-Erfassung entfernen</DialogTitle>
          <DialogDescription>
            Alle vor Ort erfassten Angaben für {patientName} werden unwiderruflich
            gelöscht. Der ursprüngliche Anamnesebogen bleibt erhalten.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <p className="text-sm text-warm-600">Möchten Sie wirklich fortfahren?</p>
        </DialogContent>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setConfirmDelete(false)}
            disabled={isPending}
          >
            Abbrechen
          </Button>
          <Button
            variant="destructive"
            onClick={remove}
            loading={isPending}
            icon={<Trash2 className="h-4 w-4" />}
          >
            Endgültig entfernen
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

/* ─────────────────────── Helpers ─────────────────────── */

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-warm-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-primary-600">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-base font-semibold text-warm-900">{title}</h3>
      </div>
      {children}
    </section>
  )
}

function CheckboxRow({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-3 transition-colors',
        checked
          ? 'border-primary-300 bg-primary-50/40'
          : 'border-warm-200 hover:border-warm-300',
        disabled && 'cursor-not-allowed opacity-60',
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="h-4 w-4 cursor-pointer rounded border-warm-300 text-primary-600 focus:ring-primary-500"
      />
      <span className="text-sm text-warm-800">{label}</span>
    </label>
  )
}
