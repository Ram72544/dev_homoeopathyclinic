# Dr. Sheetal's Homoeopathy Clinic Website

A modern, responsive, single-page website for Dr. Sheetal's Homoeopathy Clinic, built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## All content lives in one file

Edit `lib/site-config.ts` to change:

- Clinic name, tagline, and intro
- Dr. Sheetal's credentials and bio
- Phone, WhatsApp, email, address, and timings
- Services, benefits, and testimonials
- Google Maps embed URL and social links

## Logo

The logo mark is stored in `public/logo-mark-3d.svg` and used by the navbar, hero, and footer. A full lockup version (icon + text) is exported in `../logo/final-exports/`.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npx tsc --noEmit` — type check

## Deploy

The site builds to static HTML. You can deploy it to Vercel by importing this repository, or export it to any static host that supports Next.js.
