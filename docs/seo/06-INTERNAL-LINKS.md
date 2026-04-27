# Interne Linkmatrix

> Programmatic generiert über `components/seo/service-link-grid.tsx`. Diese Datei beschreibt die **Logik** und **Zählung**.

## Zählung der Linkbeziehungen

| Beziehung | Pro Page | Anzahl Pages | Total Edges |
|---|---|---|---|
| Stadt-Hub → 10 Service-City-Pages | 10 | 17 | **170** |
| Stadt-Hub → 3–4 Nachbarstädte | ø 3,5 | 17 | **60** |
| Stadt-Hub → Kreis-Hub | 1 | 17 | **17** |
| Stadt-Hub → Pflegegrad-Hub | 1 | 17 | **17** |
| Stadt-Hub → Kontakt | 1 | 17 | **17** |
| Service-Hub → 17 Service-City-Pages | 17 | 10 | **170** |
| Service-Hub → verwandte Services (3–4) | ø 3,5 | 10 | **35** |
| Service-City → andere 9 Services in derselben Stadt | 9 | 170 | **1.530** |
| Service-City → Service-Hub (canonical service) | 1 | 170 | **170** |
| Service-City → Stadt-Hub (canonical city) | 1 | 170 | **170** |
| Service-City → 2–4 Nachbarstadt-Service-Pages | ø 3 | 170 | **510** |
| Pflegegrad-Hub → Service-Hubs | 3 | 9 | **27** |
| Ratgeber → Money Pages | ≥ 3 | 6 | **18** |
| Footer/Header → Top 10 (global) | 10 | ~220 | **2.200** |
| Breadcrumb (Top-down) | 2–3 | ~220 | **660** |
| **Gesamt (gerundet)** |  |  | **≈ 5.700 Edges** |

✅ Erfüllt das Soll von **>5.000 internen Linkbeziehungen**.

## Anchor-Text-Strategie

**Regel: Variieren, nicht repetieren.** Jede Page bietet ihren Linkbeschreibungstext über `subtitle`-Felder unique an.

**Variante A — Service-orientiert:**
- „Wundversorgung in Lünen" (Stadt-Hub → Service-City)
- „Behandlungspflege im Kreis Unna" (Service-Hub-Anker)
- „Demenzbetreuung in Schwerte" (Service-City)

**Variante B — Stadt-orientiert:**
- „Pflege in Werne" (Stadt-Hub-Anker)
- „Pflegedienst in Bergkamen" (Stadt-Hub-Anker)

**Variante C — Intent-orientiert (Ratgeber → Money):**
- „Pflegegrad beantragen" (Ratgeber → /pflegegrad/antrag/)
- „Erstgespräch vereinbaren" (Ratgeber → /kontakt/)
- „Verhinderungspflege" (Ratgeber → Service)

**Variante D — Nachbarstadt-Cross-Link:**
- „Auch in Kamen verfügbar" (Stadt → Stadt)
- „Pflege in der Nachbarstadt Bergkamen" (Stadt → Stadt)

**Anti-Pattern (vermieden):**
- Identische Anker-Texte mehrfach pro Page
- „Hier klicken" / „mehr erfahren" als alleiniger Anchor
- Money-Keyword-Stuffing (10× exakt „Pflegedienst Unna" auf einer Seite)

## Cross-Linking-Regeln (Code)

```typescript
// Stadt-Hub linkt 10 Services in dieser Stadt
buildServiceLinksForCity(SERVICES, citySlug)
// → 10 Edges

// Service-Hub linkt 17 Cities
buildCityLinksForService(svcSlug, LOCATIONS)
// → 17 Edges

// Stadt-Hub linkt Nachbarstädte
location.neighbors.map(n => `/pflegedienst-${n}/`)
// → 3–4 Edges
```

Implementiert in `components/seo/service-link-grid.tsx`.

## Validierung

Nach Build: `next build` → Sitemap-XML generieren → mit Screaming Frog crawlen → Linkmatrix exportieren. Soll: 0 dangling Links, max. Click-Depth ≤ 3 von `/`.
