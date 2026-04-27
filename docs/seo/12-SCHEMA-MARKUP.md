# Schema-Markup-Referenz

> Live-Generation via `lib/seo/jsonld.ts`. Diese Datei ist die **menschen­lesbare Referenz** für Audit, QA und Erweiterungen.

## Globaler Graph (auf jeder Page)

```typescript
ldGraph(
  organizationJsonLd(),     // @id: SITE.url + '#organization'
  localBusinessJsonLd(),    // @id: SITE.url + '#localbusiness' — MedicalBusiness Sub-Type
  webSiteJsonLd(),          // @id: SITE.url + '#website'
)
```

→ injiziert in `<head>` von `app/layout.tsx`. Beinhaltet NAP, Geo, Opening Hours, Service-Area, founder, sameAs.

## Pro-Page-Erweiterungen

### Stadt-Hub (`/pflegedienst-{slug}/`)

| Schema | Zweck |
|---|---|
| `WebPage` | self-reference + isPartOf -> WebSite |
| `BreadcrumbList` | „Start › Kreis Unna › Stadt" |
| `Service` | Leistungs-Bündel mit `areaServed = City` + `provider = LocalBusiness` |
| `FAQPage` | 4–6 lokale FAQs |

### Service-Hub (`/leistungen/{slug}/`)

| Schema | Zweck |
|---|---|
| `WebPage` | |
| `BreadcrumbList` | „Start › Leistungen › Service" |
| `Service` | mit `provider = LocalBusiness` und `areaServed = AdministrativeArea Kreis Unna` |
| `FAQPage` | service-spezifische FAQs |

### Service × Stadt (`/leistungen/{svc}/{stadt}/`)

| Schema | Zweck |
|---|---|
| `WebPage` | |
| `BreadcrumbList` | 4 Levels |
| `Service` | engste Spezifizierung — `serviceType` = service.title, `areaServed` = City |
| `FAQPage` | dedup. service- + stadt-spezifische FAQs |

### Pflegegrad (`/pflegegrad/{slug}/`)

| Schema | Zweck |
|---|---|
| `WebPage` | |
| `BreadcrumbList` | |
| `FAQPage` | grad-spezifisch |
| `Article` | optional — wenn Inhalt als Ratgeber-Beitrag publiziert wird |

### Ratgeber (`/ratgeber/{slug}/`)

| Schema | Zweck |
|---|---|
| `Article` | mit `author = Organization`, `publisher = Organization`, `datePublished/dateModified` |
| `BreadcrumbList` | |
| `FAQPage` | wenn Artikel Q&A enthält |

## @id-Anchor-Strategie

```
SITE.url + '#organization'            → Organization
SITE.url + '#localbusiness'           → LocalBusiness/MedicalBusiness
SITE.url + '#website'                 → WebSite
SITE.url + path + '#webpage'          → WebPage (per Page)
SITE.url + path + '#breadcrumb'       → BreadcrumbList (per Page)
SITE.url + path + '#service'          → Service (per Page)
SITE.url + path + '#faq'              → FAQPage (per Page)
SITE.url + path + '#article'          → Article (per Ratgeber)
```

→ Cross-Referencing über `provider`, `isPartOf`, `mainEntityOfPage` linkt alle Entitäten zu einem Knowledge-Graph, der für Google, Bing und AI-Overviews verständlich ist.

## QA-Checkliste (Pre-Deploy)

- [ ] `https://search.google.com/test/rich-results` für 5 Beispiel-URLs
- [ ] `https://validator.schema.org/` Syntax-Check
- [ ] Bing URL Inspection
- [ ] Yandex Webmaster Structured-Data Validator (für AI-Overviews-Fallback)
- [ ] Search Console „Verbesserungen" → 0 schwerwiegende Fehler

## Wann KEIN Review-Schema?

⚠️ **Kein `Review`-Schema bei Pflegediensten generisch.** Google verlangt für Health-/Medical-Reviews E-A-T und reale Personen mit Bezug. Wenn doch eingesetzt:
- nur echte, namentlich erwähnte Reviews
- mit Datum, Patient*innen-Initialen, kein Foto
- aggregateRating immer auf Basis tatsächlicher Bewertungen — niemals fingiert

→ siehe `08-GOOGLE-BUSINESS.md` für reguläre Review-Sammlung im GBP, NICHT im Page-Schema.
