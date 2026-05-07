# Executive SEO Blueprint — IMPULS Ambulanter Pflegedienst

**Ziel:** Lokale Suchmaschinen-Dominanz im Kreis Unna — über organische Suche, Google Maps, Google Bilder, Featured Snippets und AI Overviews. Strikt White-Hat, medizinisch seriös, langfristig.

**Domain:** `https://www.impuls-unna.de`
**Sitz:** Massener Straße 147, 59423 Unna · `02303 2920589`
**Versorgungsvertrag:** § 72 SGB XI

---

## 1. Lage 04/2026 — Was wir mitgebracht haben

Vor diesem Roll-out:
- Keine `sitemap.xml`, keine `robots.txt`, kein Schema-Markup
- `metadataBase` zeigte auf `impuls-pflege.de` statt der live gerankten Domain
- 10 öffentliche Seiten — keine Stadt-Seiten, keine Service-Detail-Seiten, keine Pflegegrad-Seiten, keine Ratgeber
- Globale Metadaten generisch („Pflege in Unna" — kein Mehrwert für Long-Tail)

Was nach diesem Roll-out steht:
- ~210 indexierbare Seiten (vorher 10)
- Vollständiger Schema-Graph (LocalBusiness + MedicalBusiness + Organization + WebSite + Service + FAQPage + BreadcrumbList + Article + WebPage) mit `@id`-Verknüpfung
- Programmatic Long-Tail: 170 Service × Stadt-Seiten + 17 Stadt-Hubs + 10 Service-Hubs + 9 Pflegegrad-Seiten + 6 Ratgeber + 1 Kreis-Hub
- Sitemap mit ~210 URLs, robots.txt mit AI-Bot-Profilen
- Sticky-CTA, NAP-Block, FAQ-Akkordeon mit Schema, Breadcrumb-Spur (visuell + LD)

---

## 2. Säulen der Dominanz

| Säule | Hebel | Status |
|---|---|---|
| **A. Programmatic Local SEO** | 170 Service × Stadt-Seiten mit echten lokalen Signalen | live |
| **B. Schema-Tiefe** | LocalBusiness + MedicalBusiness Dual-Type, FAQ-Schema je Page, Service-Schema mit GeoCircle | live |
| **C. Content-Hubs** | Pflegegrad, Angehörigen-Ratgeber, Kreis-Hub | live |
| **D. Google Business Profile** | 30 Posts, 40 Q&A, 20 Service-Beschreibungen — siehe `05-GOOGLE-BUSINESS.md` | Vorlage |
| **E. Review Engine** | rechtssicheres Bewertungssystem mit Eskalationsprozess | Vorlage |
| **F. Citation Network** | 60+ DACH-Pflege-Citations konsistent NAP-gepflegt | Plan |
| **G. Backlink/PR** | lokale Presse, Apotheken, Ärzte, Vereine — keine PBNs | Plan |
| **H. Conversion-System** | Sticky-CTA, Click-to-Call, Rückruf, Erstgespräch kostenfrei | live |
| **I. SERP-Feature-Takeover** | Featured Snippets via präzise FAQs, AI Overviews via Schema-Tiefe, Local Pack via GBP | live + GBP |
| **J. Technical SEO** | force-static, ISR 24h, Canonicals, robots.ts, Sitemap, Image-Optimization | live |

---

## 3. Erwartbare Ranking-Trajektorie (realistisch, nicht versprechend)

Die folgenden Werte sind **Erfahrungs­annahmen**, keine Garantie:

| Zeitraum | Was kommt rein | Was rankt erstmals |
|---|---|---|
| Woche 1–2 | Indexierung Sitemap, GBP-Optimierung | Brand-Suchen („Impuls Unna"), Stadt-Hub-Seiten in Top 50 |
| Monat 1 | Erste Service × Stadt-Seiten in Top 30 | Pflegedienst Unna, Pflegedienst Lünen — Top 20 |
| Monat 2 | Long-Tail (Wundversorgung Lünen, Demenzpflege Schwerte) | erste Top-10-Platzierungen für Long-Tail |
| Monat 3 | Local Pack-Rankings über GBP, Featured Snippets via FAQ-Schema | „bester Pflegedienst Unna" Top 10, AI-Overview-Zitate |
| Monat 4–6 | Backlinks, Citations, Reviews | Map-Pack-Stabilisierung in 5+ Städten |

**Worauf wir nicht vertrauen:**
- Rankings für Generika wie „Pflegedienst" (ohne Stadt) — die gehören Aggregatoren.
- Positionen ohne lokale Suchintention — die holt Wikipedia und Pflege.de.

**Worauf wir bauen:**
- Stadt × Leistung Long-Tail (~80 % der konversions­relevanten Suchanfragen).
- Map Pack über GBP + Local Citations + echte Reviews.
- Featured Snippets über präzise FAQ-Antworten mit Schema.

---

## 4. Risikoabschnitt

| Risiko | Mitigation |
|---|---|
| **Doorway-Page-Verdacht** durch Stadt × Service-Seiten | Jede Seite hat einzigartigen Stadt-Kontext (Krankenhäuser, Stadtteile, FAQs), eindeutige H1, eindeutigen Intro-Absatz. |
| **Medical Misinformation Penalty** | Texte sind fachlich korrekt, mit SGB-Bezug, Stand 2025, ohne medizinische Versprechen. Keine Heilungs­behauptungen. |
| **NAP-Inkonsistenz** | Single Source of Truth in `lib/seo/site.ts` und `data/content-blocks.json`. Citation-Liste folgt diesem Stand. |
| **Domain-Verwirrung impuls-unna.de vs impuls-pflege.de** | Live-Domain `impuls-unna.de` ist canonical. Öffentliche Kontakt-E-Mail: `info@impuls-unna.de`. Falls die andere Domain noch Traffic erhält, dort 301 → `impuls-unna.de`. **TODO Phase 3.** |
| **Reviews durch Incentive** | Strikt verboten. Bewertungs­engine arbeitet mit QR-Code beim Pflege­abschluss + Soft-Mail nach 14 Tagen, ohne Vorgaben für Inhalt. |

---

## 5. Output-Inventar — was geliefert wurde

| Output | Datei |
|---|---|
| A. Executive Blueprint | `docs/seo/00-EXECUTIVE-BLUEPRINT.md` (diese Datei) |
| B. Keyword-Matrix | `docs/seo/01-KEYWORD-MATRIX.md` + `lib/seo/keywords.ts` |
| C. Site Architektur | `docs/seo/02-SITE-ARCHITECTURE.md` |
| D. URL-Liste | `docs/seo/03-URL-LIST.md` (auto-generiert via `app/sitemap.ts`) |
| E. Meta-Daten | `docs/seo/04-META-DATA.md` |
| F. Hub-Definitionen | `docs/seo/05-CONTENT-HUBS.md` |
| G. Top-Page-Texte | `docs/seo/18-CORE-PAGE-CONTENT.md` + live in `app/(public)/...` |
| H. Interne Linkmatrix | `docs/seo/06-INTERNAL-LINKS.md` |
| I. Image-SEO-Plan | `docs/seo/07-IMAGE-SEO-PLAN.md` + `lib/seo/image-plan.ts` |
| J. Google Business Plan | `docs/seo/08-GOOGLE-BUSINESS.md` |
| K. Review-Engine | `docs/seo/09-REVIEW-ENGINE.md` |
| L. Citations | `docs/seo/10-CITATIONS.md` |
| M. Backlinks/PR | `docs/seo/11-BACKLINK-PR.md` |
| N. Schema-Markup | `docs/seo/12-SCHEMA-MARKUP.md` + live in `lib/seo/jsonld.ts` |
| O. Tech-Checkliste | `docs/seo/13-TECHNICAL-CHECKLIST.md` |
| P. Conversion-System | `docs/seo/14-CONVERSION-SYSTEM.md` |
| Q. KPI-Tracking | `docs/seo/15-KPIs.md` |
| R. 90-Tage-Roadmap | `docs/seo/16-90-DAY-ROADMAP.md` |
| S. SERP-Feature-Takeover | `docs/seo/17-SERP-FEATURES.md` |

---

## 6. Definition of Done — Phase 1

- [x] Schema-Graph ausgespielt (LocalBusiness, MedicalBusiness, Organization, WebSite)
- [x] `sitemap.xml`, `robots.txt` (Conventions API)
- [x] Stadt-Hubs (17), Service-Hubs (10), Service × Stadt (170), Pflegegrad-Hub (9), Angehörigen-Hub (6)
- [x] FAQ-Schema je relevanter Seite mit echtem Pflege-Inhalt
- [x] Sticky CTA + Click-to-Call + NAP-Block auf jeder SEO-Seite
- [x] Canonical-Tags und Title-Templates korrigiert
- [x] TypeScript 0 Fehler, Lint 0 Fehler
- [x] Keyword-Matrix mit >2.500 Begriffen (Seeds + Long-Tail-Generator)
- [x] 19 Strategie-Dokumente in `docs/seo/`
- [ ] GBP-Optimierung umsetzen (Vorlage in `08-GOOGLE-BUSINESS.md` → Geschäftsführung pflegt ein)
- [ ] Citation-Aufbau (extern, Reihenfolge in `10-CITATIONS.md`)
- [ ] Review-Engine operativ aktivieren (siehe `09-REVIEW-ENGINE.md`)
- [ ] Foto-Shooting & Image-SEO Upload (siehe `07-IMAGE-SEO-PLAN.md`)
- [ ] Search-Console + Bing Webmaster verifizieren

---

> Dieses Dokument ist die Steuerzentrale. Alle anderen `docs/seo/*.md`-Dateien sind Detailtiefe.
