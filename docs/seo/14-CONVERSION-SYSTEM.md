# Conversion-System

> Ziel: Aus Rankings werden Anfragen. Jede SEO-Page hat eine klare Aktion.

## 1. Conversion-Komponenten (Live)

| Komponente | Datei | Funktion |
|---|---|---|
| `StickyContact` | `components/seo/sticky-contact.tsx` | Sticky-Bar nach Scroll: Click-to-Call + Kontakt-Link |
| `SeoHero` | `components/seo/seo-hero.tsx` | H1 + Tel-CTA + Trust-Chips above-the-fold |
| `NapBlock` | `components/seo/seo-content-blocks.tsx` | Adresse + Telefon + Bürozeit |
| `LocalFaq` | `components/seo/local-faq.tsx` | FAQ-Akkordeon — beantwortet vor dem CTA |
| `LocalTrustBlock` | `components/seo/seo-content-blocks.tsx` | echte lokale Signale (Districts, Kliniken) |

## 2. Conversion-Pfad

```
Hero (H1 + Tel)  ── 1. Klick: Anruf
        ↓
Trust (Chips: § 72, ICW, examiniert)
        ↓
Service-Block (was wir konkret tun)
        ↓
Local-Trust (Districts, Kliniken — Beweis lokal)
        ↓
FAQ (Bedenken aufgreifen)
        ↓
Cross-Links (anderer Bedarf? → Service)
        ↓
NapBlock (Adresse als finaler Trust)
        ↓
StickyContact (immer am Bildschirmrand)
```

## 3. Pflicht-Elemente pro SEO-Page

- [x] **Sticky Kontaktbutton** mit Tel und „/kontakt/" — `components/seo/sticky-contact.tsx`
- [x] **Telefonnummer sichtbar above-the-fold** — `SeoHero`
- [ ] **WhatsApp Click-to-Chat** — *optional, ggf. später*
- [x] **Rückruf-Formular** — Kontakt-Page
- [x] **Pflegeberatung CTA** — über Service-Hub
- [ ] **Echte Bilder** — Foto-Shooting noch offen, momentan keine Stock-Fotos
- [x] **Bewertungsblock** — wenn Reviews verfügbar (siehe `09-REVIEW-ENGINE.md`)
- [x] **Leistungsübersicht** — `ServiceLinkGrid`
- [x] **Einzugsgebiet** — `LocalTrustBlock` mit Districts
- [x] **Soforthilfe-CTA bei Pflegefall** — `SeoHero` Trust-Chips
- [x] **Kontaktformular minimal** — Name, Tel, E-Mail, kurzer Text — auf `/kontakt/`

## 4. CTAs nach Funnel-Stufe

| Funnel | Page-Beispiel | Primär-CTA | Sekundär-CTA |
|---|---|---|---|
| **TOFU** (Information) | `/ratgeber/pflege-fuer-angehoerige/` | „Pflegeberatung kostenfrei" | „Pflegegrad prüfen lassen" |
| **MOFU** (Vergleich) | `/leistungen/wundversorgung/` | „Termin vereinbaren" | „Verordnung prüfen lassen" |
| **BOFU** (Akut) | `/pflegedienst/unna/`, `/leistungen/grundpflege/unna/` | „Anrufen 02303 25055-0" | „Erstgespräch anfragen" |
| **Re-Engage** | Pflegegrad-Hub | „Beratung vereinbaren" | „Antrag-Hilfe" |

## 5. Friction-Reduzierer

- **Keine Pop-Ups** — nervt YMYL-Zielgruppe (Senioren)
- **Keine Cookie-Banner-Manie** — kurz, klar, nur das Nötige
- **Kein Login-Wall** — alle Public-Pages frei zugänglich
- **Kein Auto-Play-Video** — A11y und Datenvolumen
- **Mobile-Tel-Link funktioniert** — `tel:+492303250550` auf jedem CTA

## 6. Tracking (siehe `15-KPIs.md`)

- Goal A: **Telefon-Klick** (Mobile + Desktop) — Plausible Events
- Goal B: **Kontakt-Formular abgeschickt**
- Goal C: **Pflegeberatung-CTA geklickt**
- Goal D: **Scroll-Tiefe ≥ 75%** (für Rangliste-Optimierung)

## 7. A/B-Test-Backlog (Phase 4)

| Test | Hypothese | Metrik |
|---|---|---|
| Hero-CTA Wording: „Anrufen" vs. „Erstgespräch vereinbaren" | „Erstgespräch" konvertiert besser auf TOFU | Tel-Klick % |
| Telefon-Größe: groß vs. extra-groß | Größer ⇒ mehr Mobile-Calls | Mobile-Klick % |
| Trust-Chips Reihenfolge | „examiniert" zuerst ⇒ besser | Scroll-Tiefe + Klicks |
| FAQ-Position: vor vs. nach Cross-Links | FAQ vor Cross-Links ⇒ längere Verweildauer | Verweildauer |
