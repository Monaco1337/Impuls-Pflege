# SERP-Feature-Takeover

Ziel: für Money-Keywords nicht nur ranken, sondern **multiple Slots in der SERP belegen** (Local Pack + Organic + FAQ + Image + Knowledge).

## 1. Featured Snippets

**Hebel:** Direkt-Antwort am Anfang der Page, danach erst Kontext.

**Page-Pattern:**
```
H1: „Was ist Verhinderungspflege?"
  ↓
1-Satz-Definition (gut für Snippet)
  ↓ 
H2: „Wer hat Anspruch?"
  ↓
3-Punkt-Aufzählung
  ↓
H2: „Wie viel zahlt die Pflegekasse 2025?"
  ↓
Konkreter Betrag mit Formel
```

Implementierung: in `lib/seo/services.ts` und `lib/seo/pflegegrade.ts` ist `intro` immer eine 1-Satz-Definition gefolgt von Kontext.

## 2. People Also Ask (PAA)

**Hebel:** FAQ-Schema auf jeder Money Page → Google injiziert PAA-Items als „Inhalt von www.impuls-unna.de".

**Pattern in unseren Daten:**
- 4–6 FAQs pro Service (`SERVICES[*].faqs`)
- 4–6 FAQs pro Stadt (`LOCATIONS[*].faqs`)
- 3–5 FAQs pro Pflegegrad (`PFLEGEGRADE[*].faqs`)
- → Total ~600 FAQ-Pairs in Strukturdaten

**Optimierungsregeln:**
- Frage in Kundensprache, nicht in Fachsprache
- Antwort: 1–3 Sätze, max 50 Wörter
- Antwort enthält Stadt/Service-Bezug
- KEIN „natürlich, gerne, klar" — direkt die Information

## 3. Local Pack (Map-Pack)

**Hebel:** GBP + NAP-Konsistenz + lokale Reviews + lokaler Content.

| Signal | Stand |
|---|---|
| GBP-Kategorien korrekt | ✅ siehe `08-GOOGLE-BUSINESS.md` |
| Service-Area definiert | ✅ |
| Reviews aktiv & echt | ⏳ siehe `09-REVIEW-ENGINE.md` |
| NAP-Konsistenz Tier-1 | ⏳ Phase 1 |
| Lokaler Content (17 Stadt-Hubs) | ✅ |
| Lokale Backlinks | ⏳ Phase 2–3 |

## 4. Knowledge Panel

**Hebel:** Wikipedia? Wikidata? Klassische E-A-T-Signale.

**Schritte:**
- Wikidata-Eintrag „IMPULS Pflege Unna" anlegen (Q-Identifier)
- `sameAs` in Organization-Schema verlinkt:
  - Wikidata
  - Facebook
  - Instagram
  - LinkedIn
  - GBP-Profile
- Konsistente Brand-Mentionen über Citations

## 5. Sitelinks

**Hebel:** klare Hauptnavigation + interne Linkstruktur.

**Erwartete Sitelinks (nach 6–12 Monaten):**
- /leistungen/
- /pflegedienst-unna/
- /pflegegrad/
- /kontakt/
- /ratgeber/

→ generiert von Google automatisch, sobald die Brand „IMPULS Pflege Unna" einen klaren Sitelink-Bedarf zeigt.

## 6. Image-Pack

**Hebel:** alt-Text, file-name, ImageObject-Schema, Image-Sitemap.

→ siehe `07-IMAGE-SEO-PLAN.md`. Nach Foto-Shooting + Upload mit korrekter Naming-Konvention rankt der Image-Pack für „pflegedienst unna foto", „grundpflege bilder" etc.

## 7. AI Overviews (Google SGE / Bing Copilot)

**Hebel:**
- Strukturierte Daten (Service, FAQ, BreadcrumbList, MedicalBusiness)
- Klare Definitionen + Quellen
- Konkrete Beträge + aktuelle Daten (z. B. „Pflegegrad 2 — 347 € Pflegegeld 2025")
- E-A-T-Signale (examiniert, ICW, § 72 SGB XI)

→ AI-Overviews zitieren bevorzugt:
- Quelle mit klarer Definition (Wikipedia-Style)
- Quelle mit lokalem Kontext (Stadt-Hub)
- Quelle mit verifizierbaren Daten

Unsere Service-Pages und Pflegegrad-Pages erfüllen alle drei Kriterien.

## 8. Video / YouTube (optional, Phase 5+)

Empfehlung: Kurze 60-Sekunden-Videos auf YouTube zu:
- „Was ist Pflegegrad 2?"
- „Wie läuft eine Wundversorgung zuhause ab?"
- „MD-Begutachtung: 5 Tipps"

→ als Embed in passende Money-Pages → schemamäßig `VideoObject` ergänzbar.

## Sichtbarkeits-Ziel pro Money-Keyword

| Keyword | Org Top 3 | Local Pack Top 3 | FAQ-Slot | Image-Pack |
|---|---|---|---|---|
| pflegedienst unna | ✅ | ✅ | ✅ | ✅ |
| ambulante pflege kreis unna | ✅ | ✅ | ✅ | – |
| pflegegrad beantragen unna | ✅ | – | ✅ | – |
| wundversorgung lünen | ✅ | ✅ | ✅ | ✅ |

→ Bei vollem Erfolg belegt IMPULS für den Suchterm 4 SERP-Slots = `Above-the-Fold-Dominanz`.
