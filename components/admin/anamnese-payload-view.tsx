import {
  formatAnamneseValue,
  labelForAnamneseField,
  sortAnamnesePayloadKeys,
} from '@/lib/admin/anamnese-field-labels'

type Props = {
  payload: Record<string, unknown>
}

export function AnamnesePayloadView({ payload }: Props) {
  const keys = sortAnamnesePayloadKeys(Object.keys(payload))
  return (
    <div>
      {keys.map((k) => (
        <div
          key={k}
          className="border-b border-warm-100 py-3.5 last:border-0 sm:grid sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] sm:gap-6"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-warm-500">
            {labelForAnamneseField(k)}
          </p>
          <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-warm-800 sm:mt-0">
            {formatAnamneseValue(k, payload[k])}
          </p>
        </div>
      ))}
    </div>
  )
}
