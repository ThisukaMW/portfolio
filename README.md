# Thisuka Warsavithana · Portfolio

Personal portfolio of **Thisuka Warsavithana**, full-stack developer (backend & systems) and IT undergraduate at the University of Moratuwa.

## Stack

- **Next.js 16** (App Router, fully static) + **React 19** + **TypeScript**
- **Tailwind CSS v4** for styling
- **Motion** for animations, **Lenis** for smooth scrolling
- Generated Open Graph image, sitemap and robots via Next.js metadata files
- Deployed on **Vercel**

## Highlights

- Cursor-reactive particle field and 3D-tilt portrait in the hero
- Sticky stacking project cards with per-project colour and headline metric
- Scroll-drawn experience timeline, bento skills grid, animated counters
- `Ctrl/⌘ + K` command palette

## Editing content

All text (projects, experience, skills, achievements, certifications) lives in
[`src/data/portfolio.ts`](src/data/portfolio.ts). Components read from it, so most
updates never touch the UI code.

- Photo: `public/profile.jpg`
- CV: `public/Thisuka_Warsavithana_CV.pdf`

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```
