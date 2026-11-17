# Sumit weds Kanishka — Digital Wedding Invitation

A premium, scroll-driven, animated digital wedding invitation website built with React + TypeScript + Vite + GSAP.

## Quick Start

```bash
npm install
npm run dev       # Development server at localhost:5173
npm run build     # Static output → dist/
npm run preview   # Preview the production build
```

## Editing the Invitation

All content is in **`src/invite.config.json`** — edit this file to update:

- **Couple names, date, weekday, time**
- **Family names** (`families.groomSide/brideSide.lines[]`) — add family lines and they appear on the scroll
- **Events** (`events[]`) — add up to 6 events with venue, address, and map link
- **Photos** (`photos[]`) — add photo URLs and they appear in the gallery frames
- **Quotes** (`quotes[]`) — appear in the gallery between photos
- **Compliments** (`compliments[]`) — family compliments section
- **Things to Note** (`thingsToNote[]`) — valet parking, dress code, etc.
- **Instagram** (`instagram`) — set to show "Follow the Couple" popup
- **WhatsApp RSVP** (`whatsappRsvp`) — set to show RSVP button in the finale

Empty fields automatically hide their sections — no code changes needed!

## Replacing Assets

See `ASSETS_TODO.md` for the full list of placeholder assets that can be replaced with real artwork. Drop files into `/public/assets/` with the exact filename.

## Deploy to Cloudflare Pages

```bash
npm run build
# Upload the dist/ folder to Cloudflare Pages
# Or connect your repo and set:
#   Build command: npm run build
#   Output directory: dist
```

## Deploy to Netlify

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

## Deploy to GitHub Pages

```bash
npm run build
# Push dist/ to gh-pages branch, or use gh-pages npm package
npx gh-pages -d dist
```

## Tech Stack

- **Vite** + **React 18** + **TypeScript**
- **GSAP** + **ScrollTrigger** — scroll-driven animations
- **Lenis** — smooth inertial scrolling
- **Howler.js** — background music playback
- **Google Fonts** — Cormorant Garamond, Great Vibes, Jost

## Features

- 📱 Mobile-first (390×844), responsive to desktop
- 🎵 Background music with mute toggle
- 📜 Scroll-driven animations (scroll unrolling, parallax, card flips)
- 🗺️ Google Maps integration for venue directions
- 📅 Add to Calendar (.ics download)
- 📤 Share invite (Web Share API + clipboard fallback)
- 🎨 Premium Indian wedding aesthetic (maroon, gold, ivory)
- ♿ Respects `prefers-reduced-motion`
- 📊 Open Graph meta tags for WhatsApp/social link previews
