/**
 * Server-Komponente, die JSON-LD-Objekte als <script type="application/ld+json">
 * inline rendert. Bewusst KEIN useEffect / Client-JS — Schema muss im
 * initialen HTML stehen, sonst sieht der Crawler es u. U. nicht.
 */

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data, null, 0)
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- valider JSON-LD-Inline
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
