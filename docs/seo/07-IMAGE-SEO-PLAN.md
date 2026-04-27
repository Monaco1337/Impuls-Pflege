# Image-SEO-Plan

> Datenbank: `lib/seo/image-plan.ts` — `seedImageIdeas` + `expandImageIdeas()` ergeben **510+ unique Bildideen** (10 seeds + 10 Services × 17 Cities × 3 Archetypen). Soll ≥ 300 ist erfüllt.

---

## 1. Naming-Konvention

```
{keyword-slug}-{ort?}-{kontext?}.webp
```

**Regeln:**
- ausschließlich Kleinbuchstaben + Bindestrich
- max. 80 Zeichen
- KEIN Datum, KEINE Kameramarke (z. B. `IMG_4711.jpg` ist verboten)
- KEIN deutsches Sonderzeichen (ü → ue)
- AVIF-Fallback gleichnamig

**Beispiele:**
```
ambulanter-pflegedienst-unna-hausbesuch.webp
demenzbetreuung-luenen-erinnerungsarbeit.webp
wundversorgung-kamen-verbandswechsel.webp
pflegeberatung-bergkamen-kueche.webp
```

## 2. Alt-Text-Standard

| Anforderung | Beispiel |
|---|---|
| Beschreibt das Bild faktisch | „Pflegekraft wechselt einen Wundverband" |
| Nennt Pflege-Kontext | „bei einer Patientin in Unna" |
| 80–125 Zeichen | optimal für Screenreader & Bilder-SERP |
| KEIN Stuffing | nicht: „Pflege Pflegedienst Pflege Pflegekraft Unna Pflege" |
| Echt menschlich | nicht: Stockfoto-Beschreibungen |

## 3. Bildkategorien (10)

| Kategorie | Beispiel-Filename | Zielseite |
|---|---|---|
| `team` | `impuls-team-buero-unna.webp` | `/team/`, `/ueber-uns/` |
| `pflegealltag` | `pflegekraft-haendewaschen-grundpflege.webp` | `/leistungen/grundpflege/` |
| `hausbesuch` | `pflegekraft-hausbesuch-tueroeffnung-bergkamen.webp` | `/pflegedienst/bergkamen/` |
| `beratung` | `pflegeberatung-angehoerige-kueche-kamen.webp` | `/leistungen/pflegeberatung/kamen/` |
| `angehoerige` | `angehoerige-tochter-mutter-pflege-luenen.webp` | `/ratgeber/pflege-fuer-angehoerige/` |
| `fahrzeug` | `impuls-fahrzeug-flotte-unna.webp` | Alle Stadt-Hubs |
| `buero` | `buero-empfang-impuls-massener-strasse.webp` | `/kontakt/` |
| `lokal` | `lokales-pflegegebiet-werne.webp` | Stadt-Hubs |
| `leistung` | `wundversorgung-zuhause-unna.webp` | Service × Stadt |
| `stadtbezug` | `pflege-rathaus-schwerte-zentrum.webp` | Stadt-Hubs |

## 4. Komprimierung & Format

| Format | Wann | Tool |
|---|---|---|
| `.webp` | primary, alle modernen Browser | `sharp` / `cwebp` |
| `.avif` | fallback für moderne Browser, max. Komprimierung | `avifenc` |
| `.jpg` | safety net für ältere Mail-Clients & Social Sharing | `mozjpeg` |

**Settings:**
- WebP Quality: 80 für Hero / 72 für Inline
- AVIF Quality: 60 (kleiner als WebP)
- Max. Width: 1920 (Hero), 1280 (Content), 800 (Thumbnail)

## 5. Strukturierte Bildzuordnung

Jede Page-Component referenziert ein **Hero-Image** + **Content-Images** über die ImageObject-Schema:

```typescript
imageObjectSchema({
  url: SITE.url + '/img/wundversorgung-luenen.webp',
  alt: 'Wundversorgung in Lünen — Verbandswechsel',
  width: 1600, height: 900,
  caption: 'Verbandswechsel mit hydroaktivem Material in Lünen-Mitte.',
})
```

## 6. Upload-Strategie für Google Bilder

**Phase 1 — Eigene Domain (höchste Priorität):**
1. Alle Bilder unter `/public/img/{kategorie}/` hosten — KEIN externer CDN
2. `next/image` mit AVIF + WebP automatisch
3. Sitemap `image-sitemap.xml` (separat) referenziert alle Hero-Bilder

**Phase 2 — Google Business Profile:**
1. Wöchentlich neues Foto hochladen (Pflegealltag, Team, Fahrzeug)
2. Geo-Tag: Standort Massener Straße 100, Unna
3. Datei-Namen MIT Keyword (z. B. `wundversorgung-impuls-unna.webp`)

**Phase 3 — Lokale Portale (Citation-gestützt):**
- Therapievermittler.de, pflege.de — Bild + Beschreibung mit Stadt-Bezug
- Stadtportale Unna/Lünen/Kamen — Team-Bild + Kontakt
- Pflegelotse — Profilbild + 5 Leistungsbilder

**Phase 4 — Pinterest (Pflege-Content für Angehörige):**
- Infografik-Pins: „Pflegegrad 1 in 60 Sekunden erklärt"
- jeweils mit Backlink auf `/pflegegrad/1/`

## 7. Bildideen-Volumen

| Quelle | Anzahl |
|---|---|
| `seedImageIdeas` (manuell, premium) | 10 |
| `expandImageIdeas()` (10 Services × 17 Cities × 3 Archetypen) | 510 |
| **Gesamt** | **520** |

✅ Soll ≥ 300 deutlich übertroffen.
