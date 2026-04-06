# Stefania Article

Static academic paper website. No auth, no database.

@AGENTS.md

## Stack
Next.js 16, React 19, TypeScript, Tailwind CSS v4, Vercel

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## Content
Paper text lives in `src/content/paper.ts` as structured TypeScript.
Images go in `public/images/figures/`.
Audio files in `public/audio/`.

## Deploy
Push to main → Vercel auto-deploys.
