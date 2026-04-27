# Tracking & KPIs

## Tools

| Zweck | Tool | Status |
|---|---|---|
| Web-Analytics (DSGVO-freundlich) | **Plausible** oder **Vercel Analytics** | aktivieren |
| Search-Performance | **Google Search Console** | verifizieren |
| Bing-Search | **Bing Webmaster Tools** | verifizieren |
| Local-Pack-Tracking | **Local Falcon** oder **BrightLocal** | später (Q2) |
| Schema-Audit | Google Rich Results Test | manuell |
| Page-Speed | Vercel Speed Insights + Pagespeed | aktivieren |
| Rank-Tracking | **AccuRanker** oder **SE Ranking** | Q1 einrichten |
| Citation-Audit | **Whitespark** | Q2 |

## Goal-Setup (Plausible / Vercel Analytics)

| Goal | Trigger | Wert |
|---|---|---|
| `tel_click` | Klick auf `<a href="tel:...">` | hoch — primärer Conversion |
| `contact_submit` | Form-Submit `/kontakt/` | hoch |
| `whatsapp_click` | (falls aktiv) | mittel |
| `scroll_75` | Scroll-Tiefe ≥ 75% | niedrig (Engagement) |
| `pflegegrad_calculator_used` | (falls Tool eingebaut) | mittel |

## Search Console KPIs (Monatlich)

| Metrik | Q1 (Tag 90) | Q2 | Q3 | Q4 |
|---|---|---|---|---|
| **Total Impressions** | 5k | 25k | 80k | 200k |
| **Total Clicks** | 200 | 1.200 | 4.000 | 10.000 |
| **Avg. Position** | 25 | 18 | 12 | 8 |
| **Indexierte URLs** | 220 | 230 | 250 | 300 |
| **Money-Pages auf Top-10** | 3 | 15 | 35 | 70 |
| **Money-Pages auf Top-3** | 0 | 5 | 15 | 35 |

## Lokale KPIs (Google Business Profile)

| Metrik | Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|---|
| **Profile-Aufrufe** | 800 | 2.500 | 6.000 | 12.000 |
| **Such-Anfragen direkt** (Brand) | 100 | 300 | 700 | 1.500 |
| **Such-Anfragen entdeckt** (Service) | 700 | 2.200 | 5.300 | 10.500 |
| **Anrufe** | 50 | 180 | 450 | 900 |
| **Wegbeschreibungen** | 30 | 90 | 200 | 400 |
| **Website-Klicks** | 100 | 350 | 800 | 1.700 |
| **Reviews neu** | 10 | 25 | 45 | 65 |
| **ø Star-Rating** | 4,7 | 4,7 | 4,8 | 4,8 |

## Lead-KPI (Business)

| Metrik | Monat 3 | Monat 6 | Monat 12 |
|---|---|---|---|
| **Anrufe organisch / Tag** | 3 | 8 | 18 |
| **Form-Anfragen organisch / Woche** | 4 | 10 | 25 |
| **Konversion Anruf → Erstgespräch** | 60% | 65% | 70% |
| **Konversion Erstgespräch → Patient*in** | 40% | 45% | 50% |
| **Neue Patient*innen aus SEO / Monat** | 4 | 12 | 30 |

## Reporting-Rhythmus

| Frequenz | Inhalt | Empfänger |
|---|---|---|
| **wöchentlich** | Indexierungsstatus, Search Console Hauptzahlen | PDL |
| **monatlich** | KPI-Dashboard mit Q-Trend | Geschäftsführung |
| **quartalsweise** | Technical Audit + Citation-Konsistenz + Konkurrenz-Check | Geschäftsführung + externer SEO-Berater |
| **jährlich** | Re-Audit Schema, Keywords, Konkurrenz, Strategie-Update | Strategie-Komitee |

## Konkurrenz-Monitoring (Beispiele)

Pflegedienste im Kreis Unna, die im Local Pack ranken — laufender Check ob sie:
- Pflegelotse-Profil haben
- Reviews aktiv sammeln
- in welchen Stadt-/Service-Kombis ranken
- welche Backlinks sie aufbauen (Ahrefs / Sistrix Pro)

Quartalweise gegenüberstellen, Lücken schließen.

## Frühwarn-System

| Signal | Reaktion |
|---|---|
| Rankings für Money-Keywords sinken > 5 Positionen in 7 Tagen | Manueller Check Crawling, Backlinks, Konkurrenz, Algorithmus-Update |
| Search-Console-Coverage zeigt > 5 Index-Errors neu | Bug-Triage innerhalb 24h |
| Negative Bewertung 1–2 Sterne | siehe Eskalations-Prozess `09-REVIEW-ENGINE.md` |
| Citation NAP-Inkonsistenz entdeckt | Korrektur binnen 1 Woche |
