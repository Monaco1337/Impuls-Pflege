# Review- & Reputation-Engine

> Ziel: 10–20 echte Bewertungen pro Quartal, ohne Manipulation, in voller DSGVO- und UWG-Konformität.

## 1. Rechtsrahmen

| Regel | Konsequenz |
|---|---|
| **Keine Incentives** (Geschenk, Rabatt, Punkte) | Verstoss gegen UWG § 5a, Google ToS — Konto-Löschung möglich |
| **Keine Vorlage / Wording-Vorgabe** | Verstoss gegen UWG, irreführende Werbung |
| **Keine Bewertungs-Filter** (nur happy customers fragen) | „Review-Gating" ist Google-Verstoss |
| **Datenschutz** | Bewertungs-Anfrage nur, wenn Kunde aktive Geschäftsbeziehung hat (berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO) |
| **Schriftform-Anfrage** | E-Mail/SMS nur mit Doppel-Opt-in |

## 2. Touchpoints für Bewertungs-Anfrage

| Touchpoint | Wann | Wer | Wie |
|---|---|---|---|
| **Persönlich beim Hausbesuch** | nach 4–8 Wochen Pflege | Bezugspflegekraft | Mündlich, mit QR-Karte |
| **Beratungs-Abschluss** | nach Pflegegrad-Antrag-Erfolg | PDL | E-Mail mit Link |
| **Pflegeabschluss** | nach Beendigung der Pflege (Versterben, Heimumzug, Genesung) | PDL | Trauer-/Abschiedsbrief mit Bewertungs-Hinweis (zurückhaltend!) |
| **Angehörigen-Feedback** | 6 Monate Pflege | PDL | Persönliches Gespräch mit QR-Karte |

## 3. SMS-Vorlage (kurz, neutral)

```
Hallo [Vorname], hier ist [Pflegekraft] von IMPULS. 
Wenn Sie mit unserer Pflege zufrieden sind, freuen wir uns 
über eine Bewertung bei Google. Hier der Link: g.page/r/xxx 
Vielen Dank — und ein gutes Wochenende.
```

## 4. E-Mail-Vorlage (formeller)

**Betreff:** Wie haben Sie unsere Pflege erlebt?

```
Liebe Familie [Nachname],

seit [Monat] dürfen wir Sie und [Patient*in] zuhause pflegen. 
Wir möchten Sie heute bitten, kurz zu reflektieren, wie Sie 
unsere Arbeit erleben — sowohl, wenn etwas gut läuft, als auch, 
wenn etwas Sie stört.

Wenn Sie zufrieden sind und es Ihnen kein Aufwand ist:
Eine Google-Bewertung hilft anderen Familien, die einen 
Pflegedienst suchen, sich zu orientieren.

Hier der Link:
https://g.page/r/xxx-review

Wenn etwas nicht stimmt: rufen Sie mich direkt an — 
02303 25055-0. Ich höre zu und wir lösen es.

Mit herzlichen Grüßen
[Pflegedienstleitung]
IMPULS Pflege
```

## 5. QR-Karte (gedruckt, für Hausbesuch)

**Vorderseite:**
- Logo + „IMPULS Pflege"
- „Ihre Meinung zählt"
- QR-Code → g.page/r/...review

**Rückseite:**
- Telefon 02303 25055-0
- E-Mail info@impuls-unna.de
- Hinweis: „Anregungen, Beschwerden, Lob — wir hören zu."

## 6. Eskalations-Prozess bei Kritik

```
                ┌─ Negative Bewertung
                │
                ▼
        Pflegedienstleitung erhält Notification (Google API + E-Mail)
                │
       ┌────────┴────────┐
       │                 │
       ▼                 ▼
   echtkunde?         Verwechslung/Fake?
       │                 │
       ▼                 ▼
  Direkt-Anruf      Höflich klären, dann
  innerhalb 24h     Google-Meldung
  + Lösungsangebot     │
       │                 ▼
       ▼              Falls keine Reaktion:
   Bewertung optional  Anwalt (bei Rufschädigung)
   ändern lassen
```

## 7. Internes Feedback-System (off-Google)

Pflegekraft führt nach **jedem 6-Wochen-Zyklus** ein Mini-Interview mit Angehörigen:
- 3 Fragen: 
  1. Was läuft gut?
  2. Was stört oder fehlt?
  3. Würden Sie etwas an der Pflegekraft / am Ablauf ändern?
- Antworten in `data/feedback.json` (intern, NIE öffentlich)
- Auswertung: PDL + Geschäftsführung monatlich

Vorteil: 80% der Verbesserungen passieren BEVOR sie zur 1-Stern-Bewertung werden.

## 8. KPI-Ziele

| Quartal | Reviews neu | ø Stars | Antwort-Rate |
|---|---|---|---|
| Q1 | 10 | 4,7 | 100% in 24h |
| Q2 | 15 | 4,7 | 100% in 24h |
| Q3 | 20 | 4,8 | 100% in 24h |
| Q4 | 20 | 4,8 | 100% in 24h |

In 12 Monaten: **65+ echte Bewertungen** ⇒ stärkstes Trust-Signal im Local Pack Kreis Unna.
