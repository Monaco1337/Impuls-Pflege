# Site-Architektur — IMPULS Ambulanter Pflegedienst

> Maximale Crawl-Tiefe: **3 Klicks ab Startseite**. Skalierbar via SEO-Datenbank.

```
/                                    [Home — Brand & lokaler Hauptanker]
├── /pflege-kreis-unna/              [Kreis-Hub — Mutter aller Stadt-Hubs]
│
├── /pflegedienst/unna/              [Stadt-Hub — Primary]
├── /pflegedienst/luenen/
├── /pflegedienst/kamen/
├── /pflegedienst/bergkamen/
├── /pflegedienst/schwerte/
├── /pflegedienst/froendenberg/
├── /pflegedienst/holzwickede/
├── /pflegedienst/boenen/
├── /pflegedienst/selm/
├── /pflegedienst/werne/
├── /pflegedienst/dortmund-ost/      [Stadt-Hub — Secondary]
├── /pflegedienst/hamm-west/
├── /pflegedienst/soest-rand/
├── /pflegedienst/menden/
├── /pflegedienst/iserlohn/
├── /pflegedienst/nordkirchen/
├── /pflegedienst/ascheberg/
│
├── /leistungen/                     [Service-Übersicht — vorhandene Long-Form]
│   ├── /leistungen/grundpflege/             [Service-Hub]
│   │   ├── /leistungen/grundpflege/unna/    [Service × Stadt — programmatic]
│   │   ├── /leistungen/grundpflege/luenen/
│   │   ├── /leistungen/grundpflege/kamen/
│   │   ├── … (17 Städte je Service)
│   ├── /leistungen/behandlungspflege/
│   │   ├── … (17 Städte)
│   ├── /leistungen/demenzpflege/
│   ├── /leistungen/verhinderungspflege/
│   ├── /leistungen/seniorenbetreuung/
│   ├── /leistungen/pflegeberatung/
│   ├── /leistungen/wundversorgung/
│   ├── /leistungen/medikamentengabe/
│   ├── /leistungen/pflege-nach-krankenhaus/
│   └── /leistungen/hauswirtschaftliche-hilfe/
│
├── /pflegegrad/                     [Pflegegrad-Hub]
│   ├── /pflegegrad/1/
│   ├── /pflegegrad/2/
│   ├── /pflegegrad/3/
│   ├── /pflegegrad/4/
│   ├── /pflegegrad/5/
│   ├── /pflegegrad/antrag/
│   ├── /pflegegrad/md-begutachtung/
│   └── /pflegegrad/widerspruch/
│
├── /ratgeber/                       [Angehörigen-Hub]
│   ├── /ratgeber/pflege-fuer-angehoerige/
│   ├── /ratgeber/erste-schritte-pflegefall/
│   ├── /ratgeber/checkliste-angehoerige/
│   ├── /ratgeber/pflegekosten/
│   ├── /ratgeber/pflege-zuhause-organisieren/
│   └── /ratgeber/pflege-nach-krankenhaus-angehoerige/
│
├── /ueber-uns/                      [Brand]
├── /team/                           [E-A-T Verstärker]
├── /karriere/                       [Recruiting]
├── /kontakt/                        [Conversion]
├── /anamnesebogen/                  [Conversion / Onboarding]
├── /impressum/
└── /datenschutz/
```

---

## Click-Depth-Audit

Jede Money Page ist in 3 Klicks erreichbar:

```
Home (1)
 └── Pflege Kreis Unna (2)
      └── Pflegedienst Unna (3)         ← Stadt-Hub, depth 2
           └── Wundversorgung Unna (3)  ← Service-City, depth 3
```

Zusätzlich quer:
```
Home (1)
 └── Leistungen (2)
      └── Wundversorgung (3)            ← Service-Hub, depth 2
           └── Wundversorgung Lünen (3) ← Service-City, depth 3
```

---

## URL-Pattern

| Pattern | Anzahl | Beispiel |
|---|---|---|
| `/pflegedienst/[stadt]/` | 17 | `/pflegedienst/luenen/` |
| `/leistungen/[leistung]/` | 10 | `/leistungen/wundversorgung/` |
| `/leistungen/[leistung]/[stadt]/` | 170 | `/leistungen/wundversorgung/luenen/` |
| `/pflegegrad/[slug]/` | 8 | `/pflegegrad/2/`, `/pflegegrad/antrag/` |
| `/ratgeber/[slug]/` | 6 | `/ratgeber/pflegekosten/` |
| Statisch / Brand | 9 | `/`, `/leistungen/`, `/kontakt/` … |
| **Gesamt** | **~220** |  |

Alle URLs:
- Klein­geschrieben
- Bindestrich-getrennt
- Trailing-Slash konsistent
- Kein Stop-Word-Spam, keine Datums-Slugs, keine `?id=…`-Query-URLs
- Umlaute via Slug entkodiert (`luenen`, `boenen`, `froendenberg`)

---

## Internationalisierung

**`hreflang`: bewusst nicht gesetzt.** Single-Locale (de-DE) — kein Bedarf, kein Risiko, dass Google ausländische Versionen erfindet.
