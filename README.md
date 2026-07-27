# UEC Campus & Chofu International Student Guide

A comprehensive student-friendly guide for new international students at the **University of Electro-Communications (UEC)**, Chofu, Tokyo. Covers day-one essentials, food, local living tips, interactive map, and emergency guidance.

## Live Demo

| Platform | URL |
|----------|-----|
| **GitLab Pages** | https://buzzard.fedu.uec.ac.jp/Ayano/Project_group1 (check CI pipeline status) |
| GitHub Pages (mirror) | https://tarequejosh.github.io/UEC_campus_guideline/ |

## Pages

- **Home** (`index.html`) — Before arrival checklist, first week guide, quick links
- **Living in Chofu** (`living.html`) — Transport, supermarkets, interactive Leaflet map, garbage rules, internet
- **Campus Life** (`campus-life.html`) — Food & dining, facilities, health center, clubs, career
- **Emergency** (`emergency.html`) — Emergency numbers, earthquake/typhoon safety, clinics, embassy contacts, Japanese phrases

## Tech Stack

- **Build:** Vite 8 (multi-page setup)
- **CSS:** Custom design tokens (cool-neutral palette, UEC blue accent, WCAG AA/AAA)
- **JS:** Vanilla ES modules with dynamic imports
- **Map:** Leaflet via CDN with 15 POI markers
- **Fonts:** Inter (Google Fonts)
- **Runtime:** No frameworks — pure HTML/CSS/JS

## Performance

- All images compressed and resized (WebP, max 1600px)
- Dynamic code splitting (`map.js` loaded only on living.html)
- RAF-backed scroll handlers, idle-time initialization
- `content-visibility: auto` for offscreen sections

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build    # outputs to dist/
```

## Deployment

### GitLab Pages

The project includes a `.gitlab-ci.yml` for automated GitLab Pages deployment:

1. Push to the `redesign-overhaul` branch (or merge to `main`)
2. The CI pipeline runs automatically
3. Site is served at the Pages URL above

### Manual

Upload the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Branch Strategy

- **`main`** — production branch
- **`redesign-overhaul`** — current active development (UI redesign, performance optimization)
