# FlightDelayBoard — PRD

## Overview

FlightDelayBoard is an airport delay status board with real-time delay information, historical on-time performance stats, and best travel time recommendations. It targets travelers searching for "airport delays today", "LAX on-time performance", "best time to fly JFK", and "American Airlines delay history". Data comes from the FAA ASDI public feed (via aviationstack free tier: 1000 req/month), BTS on-time performance static datasets, and precomputed historical stats.

## Target Users & Pain Points

- **Frequent travelers** who want to know delay risk before leaving for the airport
- **Budget travelers** choosing flights based on historical on-time performance
- **Travel hackers** identifying the best time of day/week to book flights
- **Business travelers** routing around known delay-prone airports/airlines

Pain points:
- FlightAware requires a paid subscription for historical data
- FAA airport status page is one-airport-at-a-time and unstyled
- No free tool shows route-level delay history (JFK→LAX historical on-time %)
- Hard to compare airlines on the same route

## Core Features

### F01 — Airport Status Board (Homepage)
- Status grid of top 30 US airports (color-coded: green/amber/red by delay severity)
- Each card: airport code, name, current ground stop/delay advisory, average current delay minutes
- Live status from aviationstack `/flights` endpoint (with 1000 req/month budget management)
- "Last updated: X minutes ago" timestamp
- Click → `/airports/[iata]`

### F02 — Airport Detail Page `/airports/[iata]`
- Current delay advisory (from aviationstack or FAA NASSTATUS XML)
- Historical on-time percentage by month (last 12 months) — bar chart
- Best time to fly: hour-of-day heatmap (avg delay by hour, from BTS data)
- Best day of week heatmap
- Top routes from this airport with on-time rates
- Airlines operating this airport with on-time rates
- Schema.org `Airport` markup

### F03 — Route Page `/routes/[origin]-to-[dest]`
- Historical on-time % for this specific route (BTS static data)
- Airline comparison table: on-time %, avg delay, cancellation rate
- Best departure time recommendations (morning vs afternoon vs evening)
- Seasonal delay pattern chart
- Schema.org `Trip` markup

### F04 — Airline Page `/airlines/[code]`
- Airline overall on-time % (last 12 months)
- Month-by-month trend chart
- Top 10 most delayed routes for this airline
- Top 10 most on-time routes
- Delay cause breakdown: carrier, weather, NAS, security, late aircraft (pie chart)

### F05 — Search & Autocomplete
- Airport IATA code or name search (client-side over loaded JSON)
- Route search: "JFK to LAX" → navigates to `/routes/jfk-to-lax`
- Airline search → navigates to `/airlines/[code]`

### F06 — Best Travel Time Tool
- Interactive widget on homepage and airport pages
- Select airport + month → shows heatmap of best hours/days
- Data computed from BTS historical datasets (precomputed, stored as JSON)
- No API call needed at runtime

### F07 — Data Pipeline
- **aviationstack free tier**: 1000 req/month → budget to ~32 req/day for live delay status
- Cache aviationstack responses for 10 minutes in Vercel KV / Upstash
- BTS on-time performance data: downloaded quarterly as CSV, processed to JSON via GitHub Actions
- FAA NASSTATUS: public XML endpoint, poll via GitHub Actions every 30 min, store as JSON
- Static fallback: `public/data/airports.json`, `public/data/routes.json`, `public/data/airlines.json`

### F08 — API Budget Management
- Upstash Redis counter: `aviationstack:req:YYYY-MM` — increment on each call
- If count ≥ 950, stop calling aviationstack → show cached/static data with banner "Live data temporarily unavailable"
- GitHub Actions: daily stats of API usage logged to `research_history/api-usage.md`

### F09 — Visitor Counter
- Upstash Redis: `flightdelayboard:visits:total`, `flightdelayboard:visits:YYYY-MM-DD`
- `/api/visits` route
- Footer display: "Today: X | Total: Y"

### F10 — Google Sheets Webhook
- Events: `airport_view`, `route_view`, `airline_view`, `search`, `heatmap_interaction`
- Payload: `{ event, iata?, route?, airline?, timestamp, lang }`
- Fire-and-forget

### F11 — i18n (8 Languages)
- next-intl, locale prefix
- All UI text translated
- Languages: en, ko, ja, zh, es, fr, de, pt
- hreflang on all pages

### F12 — Adsterra Ad Slots
- Social Bar in `<head>` (TODO placeholder)
- Native Banner below hero status grid
- Display Banner on airport/route/airline detail pages (mid-page)

### F13 — Research History Logging
- `research_history/` folder, milestone logs

## Tech Stack

- **Framework**: Next.js 14 (App Router, ISR with `revalidate: 600` for live pages, `revalidate: 86400` for historical)
- **Styling**: Tailwind CSS v3
- **Charts**: Chart.js v4 via `react-chartjs-2`
- **i18n**: next-intl
- **Live data**: aviationstack free tier (cached), FAA NASSTATUS XML
- **Historical data**: BTS on-time CSV (pre-processed static JSON)
- **Caching**: Upstash Redis free tier
- **Hosting**: Vercel free tier
- **Repo**: GitHub → `taeshin11/flight-delay-board`
- **CI**: GitHub Actions (BTS quarterly refresh, FAA status every 30 min)

## Data Sources (Free Only)

| Source | Endpoint | Rate Limit | Notes |
|--------|---------|------------|-------|
| aviationstack | `api.aviationstack.com/v1/flights` | 1000 req/month | Free API key required |
| FAA NASSTATUS | `nasstatus.faa.gov/api/airport/status/{IATA}` | Unlimited (public XML) | Airport delay advisories |
| BTS On-Time Performance | `transtats.bts.gov/DL_SelectFields.asp` | Unlimited (CSV download) | Monthly CSV, public domain |
| BTS Airport Lookup | `transtats.bts.gov` | Unlimited | Airport codes, routes |
| OpenFlights | `raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat` | Unlimited | Airport coordinates, names |

### BLS → BTS Data Processing
1. Download `On_Time_Reporting_Carrier_On_Time_Performance_1987_present_{year}_{month}.zip`
2. Parse CSV: `FL_DATE, OP_CARRIER, ORIGIN, DEST, DEP_DELAY, ARR_DELAY, CANCELLED, DIVERTED, DELAY_CARRIER, DELAY_WEATHER`
3. Aggregate to `public/data/routes.json` (by route pair), `public/data/airports.json` (by IATA), `public/data/airlines.json` (by carrier)
4. Run in GitHub Actions quarterly (Jan, Apr, Jul, Oct)

## Page Structure & SEO

```
/                                → Homepage status board (ISR, revalidate 600)
/airports/[iata]                 → Airport detail (ISR, revalidate 600)
/routes/[origin]-to-[dest]       → Route detail (SSG, revalidate 86400)
/airlines/[code]                 → Airline detail (SSG, revalidate 86400)
/sitemap.xml                     → Auto-generated
/robots.txt                      → Static
```

### Meta Tag Templates

**Homepage:**
```
title: "Airport Delays Today — Live Status Board | FlightDelayBoard"
description: "Live airport delay status for all major US airports. Updated every 10 minutes. Check delays at LAX, JFK, ORD, ATL, and more."
```

**Airport:**
```
title: "{IATA} Airport Delays — {Name} On-Time Performance & Best Travel Times"
description: "{Name} current delay status: {status}. Historical on-time rate: {pct}%. See best times to fly and delay patterns by hour and day."
```

**Route:**
```
title: "{Origin} to {Dest} On-Time Performance — Airline Comparison | FlightDelayBoard"
description: "The {Origin}→{Dest} route has a {pct}% on-time rate. Compare airlines, see best departure times, and avoid peak delay windows."
```

**Airline:**
```
title: "{Airline} On-Time Performance — Delay Statistics & Route Rankings"
description: "{Airline} has a {pct}% on-time rate over the last 12 months. See delay causes, most delayed routes, and monthly trends."
```

### Schema.org

**Airport page:**
```json
{
  "@type": "Airport",
  "name": "Los Angeles International Airport",
  "iataCode": "LAX",
  "address": { "@type": "PostalAddress", "addressLocality": "Los Angeles", "addressRegion": "CA" }
}
```

**Route page:**
```json
{
  "@type": "Trip",
  "name": "JFK to LAX Route",
  "tripOrigin": { "@type": "Airport", "iataCode": "JFK" },
  "tripDestination": { "@type": "Airport", "iataCode": "LAX" }
}
```

## UI/UX Guidelines

- **Color palette**: Soft sky blue background `#F0F9FF`, white cards, sky accents `#0EA5E9`
- **Status colors**:
  - No delay: `bg-emerald-100 text-emerald-800`
  - Moderate (15–45 min): `bg-amber-100 text-amber-800`
  - Severe (45+ min / ground stop): `bg-rose-100 text-rose-800`
- **Font**: Inter (Google Fonts, self-hosted)
- **Airport grid**: 3 columns on desktop, 2 on tablet, 1 on mobile; each card has colored left border
- **Heatmap**: CSS grid (7×24 or 12×7), colored cells from cool (green) to hot (red)
- **Delay bar charts**: Horizontal bars, color-coded by delay severity
- **Loading**: Skeleton shimmer on status cards; "Live" badge pulses
- **Mobile**: Tap to expand card details; route search auto-focuses keyboard
- **Accessibility**: ARIA labels on all colored status indicators, `role="status"` on live update region

## i18n Requirements

### Translation Keys (minimum required)
- `nav.home`, `nav.airports`, `nav.routes`, `nav.airlines`, `nav.search`
- `hero.title`, `hero.subtitle`, `hero.lastUpdated`
- `status.noDelay`, `status.moderate`, `status.severe`, `status.groundStop`, `status.unknown`
- `airport.onTimeRate`, `airport.bestTimeToFly`, `airport.topRoutes`, `airport.delayByHour`
- `route.onTimeRate`, `route.airlineComparison`, `route.bestDeparture`, `route.seasonal`
- `airline.overallOTP`, `airline.delayCauses`, `airline.mostDelayed`, `airline.mostOnTime`
- `heatmap.hour`, `heatmap.day`, `heatmap.avgDelay`, `heatmap.bestTime`
- `footer.todayVisits`, `footer.totalVisits`, `footer.copyright`
- `common.loading`, `common.noData`, `common.liveData`, `common.cachedData`

### Language Notes
- Airport IATA codes are always displayed in Latin script regardless of locale
- Delay minutes displayed as locale-formatted numbers
- hreflang on all pages including `/airports/`, `/routes/`, `/airlines/`

## Ad Integration (Adsterra)

### Social Bar (`<head>`)
```html
<!-- TODO: Adsterra Social Bar — insert when key is ready -->
<!-- <script async src="//ADSTERRA_SOCIAL_BAR_URL"></script> -->
```

### Native Banner (below status grid header)
```html
<!-- TODO: Adsterra Native Banner -->
<div id="adsterra-native-banner" class="w-full my-4 min-h-[90px] rounded-xl bg-gray-50">
  <!-- Native Banner Ad Placeholder -->
</div>
```

### Display Banner (mid-page on detail pages)
```html
<!-- TODO: Adsterra Display Banner (728x90 / 320x50 mobile) -->
<div id="adsterra-display-banner" class="flex justify-center my-8">
  <!-- Display Banner Ad Placeholder -->
</div>
```

## Google Sheets Webhook

### Sheet: "FlightDelayBoard Analytics"
Columns: `timestamp | event | iata | route | airline | lang | path`

### Implementation
```typescript
// lib/webhook.ts
export function trackEvent(event: string, data?: Record<string, string>) {
  const url = process.env.NEXT_PUBLIC_WEBHOOK_URL;
  if (!url) return;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, timestamp: new Date().toISOString(), ...data }),
  }).catch(() => {});
}
```

## Visitor Counter

- **Keys**: `flightdelayboard:visits:total`, `flightdelayboard:visits:YYYY-MM-DD`
- **Route**: `GET /api/visits` → `{ today, total }`
- **Footer**: Bottom-right, `text-xs text-gray-400`, "Today: 891 | Total: 42,300"
- **No SSR blocking** — client-side fetch on hydration

## Milestones

### M1 — Scaffold & Data Pipeline
**Tasks:**
1. `init.sh`: scaffold Next.js 14, install deps
2. Download last 3 months BTS on-time CSV, write `scripts/build-bts-data.js` → `public/data/airports.json`, `routes.json`, `airlines.json`
3. Write `scripts/fetch-faa-status.js` (FAA NASSTATUS XML parser)
4. Create `feature_list.json`, `claude-progress.txt`
5. `gh repo create taeshin11/flight-delay-board --public`
6. Initial commit + push
7. Log `research_history/milestone-M1.md`

**Commit:** `M1: scaffold, BTS data pipeline, FAA status parser`

### M2 — Homepage Status Board & UI
**Tasks:**
1. Tailwind sky blue theme, status color tokens
2. Airport status grid (30 airports): live status cards with delay severity color
3. Aviationstack API client with budget manager (Upstash counter)
4. "Last updated" timestamp
5. Search bar autocomplete
6. Sticky header, footer with visitor counter placeholder, Adsterra divs
7. Commit + push

**Commit:** `M2: homepage status board, aviationstack client, API budget manager`

### M3 — Airport Detail Pages
**Tasks:**
1. `/airports/[iata]`: current advisory, monthly on-time chart, hour/day heatmaps, top routes table
2. `generateStaticParams` for all 30+ airports
3. Schema.org Airport markup
4. Open Graph meta
5. Best travel time widget
6. Commit + push

**Commit:** `M3: airport pages, heatmaps, schema.org, OG meta`

### M4 — Route & Airline Pages
**Tasks:**
1. `/routes/[origin]-to-[dest]`: airline comparison table, seasonal chart, best departure recommendations
2. `/airlines/[code]`: OTP trend chart, delay cause pie, most delayed / most on-time routes
3. `generateStaticParams` for top 200 routes and all airlines
4. Schema.org Trip markup
5. hreflang alternate links
6. i18n scaffold (next-intl + 8 locale stubs)
7. Commit + push

**Commit:** `M4: route pages, airline pages, hreflang, i18n scaffold`

### M5 — Visitor Counter, Webhook, Sitemap
**Tasks:**
1. Upstash Redis `/api/visits`
2. Google Sheets analytics webhook
3. `app/sitemap.ts` auto-generation
4. `/robots.txt`
5. Commit + push

**Commit:** `M5: visitor counter, analytics webhook, sitemap`

### M6 — i18n & SEO Polish
**Tasks:**
1. Complete translations all 8 languages
2. Language switcher
3. Lighthouse ≥ 90 audit
4. Canonical tags audit
5. Commit + push

**Commit:** `M6: full i18n, SEO polish`

### M7 — Deploy & GitHub Actions
**Tasks:**
1. `npx vercel --prod`
2. GitHub Actions: quarterly BTS data refresh, FAA status cache refresh (every 30 min)
3. Set Vercel env vars: `AVIATIONSTACK_API_KEY`, `UPSTASH_REDIS_REST_URL`, `NEXT_PUBLIC_WEBHOOK_URL`
4. Verify production renders
5. Final commit + push
6. Log `research_history/milestone-M7.md`

**Commit:** `M7: production deploy, GitHub Actions, env vars`

## File Structure

```
flight-delay-board/
├── init.sh
├── feature_list.json
├── claude-progress.txt
├── research_history/
│   ├── milestone-M1.md
│   └── api-usage.md
├── scripts/
│   ├── build-bts-data.js          # BTS CSV → airports.json, routes.json, airlines.json
│   ├── fetch-faa-status.js        # FAA NASSTATUS XML → JSON
│   └── validate-data.js
├── public/
│   └── data/
│       ├── airports.json          # ~150 airports with on-time stats + heatmap data
│       ├── routes.json            # Top routes with airline breakdowns
│       ├── airlines.json          # All carriers with OTP stats
│       └── iata-index.json        # IATA code → name lookup
├── messages/
│   ├── en.json
│   ├── ko.json
│   ├── ja.json
│   ├── zh.json
│   ├── es.json
│   ├── fr.json
│   ├── de.json
│   └── pt.json
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Homepage status board
│   │   ├── airports/[iata]/page.tsx
│   │   ├── routes/[pair]/page.tsx
│   │   └── airlines/[code]/page.tsx
│   ├── api/
│   │   ├── visits/route.ts
│   │   └── status/route.ts        # Proxies aviationstack with budget check
│   └── sitemap.ts
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── AirportGrid.tsx
│   ├── AirportCard.tsx
│   ├── StatusBadge.tsx
│   ├── DelayHeatmap.tsx
│   ├── OnTimeChart.tsx
│   ├── DelayCausePieChart.tsx
│   ├── RouteTable.tsx
│   ├── AirlineTable.tsx
│   ├── SearchBar.tsx
│   ├── AdSlot.tsx
│   └── VisitorCounter.tsx
├── lib/
│   ├── data.ts
│   ├── redis.ts
│   ├── aviationstack.ts           # API client with budget manager
│   ├── webhook.ts
│   └── i18n.ts
├── tailwind.config.ts
├── next.config.ts
└── .github/
    └── workflows/
        ├── refresh-bts-data.yml   # Quarterly BTS refresh
        └── refresh-faa-status.yml # Every 30 min FAA status
```

## Harness Files Spec

### `feature_list.json`
```json
{
  "project": "flight-delay-board",
  "version": "1.0.0",
  "features": [
    { "id": "F01", "name": "Airport Status Board", "status": "pending" },
    { "id": "F02", "name": "Airport Detail Page", "status": "pending" },
    { "id": "F03", "name": "Route Page", "status": "pending" },
    { "id": "F04", "name": "Airline Page", "status": "pending" },
    { "id": "F05", "name": "Search & Autocomplete", "status": "pending" },
    { "id": "F06", "name": "Best Travel Time Tool", "status": "pending" },
    { "id": "F07", "name": "Data Pipeline", "status": "pending" },
    { "id": "F08", "name": "API Budget Management", "status": "pending" },
    { "id": "F09", "name": "Visitor Counter", "status": "pending" },
    { "id": "F10", "name": "Google Sheets Webhook", "status": "pending" },
    { "id": "F11", "name": "i18n 8 Languages", "status": "pending" },
    { "id": "F12", "name": "Adsterra Ad Slots", "status": "pending" },
    { "id": "F13", "name": "Research History Logging", "status": "pending" }
  ]
}
```

### `claude-progress.txt`
```
PROJECT: flight-delay-board
STARTED: [date]
CURRENT_MILESTONE: M1
STATUS: in_progress

COMPLETED:
- (none yet)

IN_PROGRESS:
- M1: Scaffold and data pipeline

BLOCKED:
- (none)
```

### `init.sh`
```bash
#!/usr/bin/env bash
set -e

PROJECT="flight-delay-board"
GITHUB_USER="taeshin11"

echo "=== Initializing $PROJECT ==="

npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --yes

npm install next-intl chart.js react-chartjs-2 @upstash/redis next-sitemap xml2js

mkdir -p scripts public/data messages research_history components lib app/api/visits app/api/status .github/workflows

echo "PROJECT: $PROJECT" > claude-progress.txt
echo "STARTED: $(date -u +%Y-%m-%dT%H:%M:%SZ)" >> claude-progress.txt
echo "CURRENT_MILESTONE: M1" >> claude-progress.txt
echo "STATUS: in_progress" >> claude-progress.txt

git init
gh repo create "$GITHUB_USER/$PROJECT" --public --source=. --remote=origin

echo "=== $PROJECT initialized ==="
```
