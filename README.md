# Countdown

A static countdown page to **August 29, 2026, 7:00 AM**, styled with the Apple-inspired design system in [design.md](design.md).

Plain HTML/CSS/JS — no build step, no dependencies.

## Files

- `index.html` — page markup
- `style.css` — design tokens (colors, type, spacing) translated to CSS
- `script.js` — countdown logic, updates every second

## Run locally

Open `index.html` directly in a browser, or serve it:

```bash
npx serve .
```

## Deploy

**Vercel (recommended):**

```bash
npx vercel
```

No config needed — Vercel auto-detects a static site and deploys it as-is.

**GitHub Pages:**

Push to GitHub, then enable Pages in the repo's Settings → Pages, pointing at the `main` branch root.
