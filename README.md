# Akintom Global Resources — Website

Premium, conversion-focused website for **Akintom Global Resources**, a UK universities recruitment & admissions agency in Nigeria.
Creative concept: *"The Quiet Confidence of an Offer Letter"* — Oxford prestige × Apple restraint.

## Tech stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** (custom luxury design system — navy `#0B1F4D` / gold `#D4AF37`)
- **Framer Motion** (reveals, counters, slider, reduced-motion aware)
- **React Hook Form + Zod** (validated lead-capture form with honeypot)
- **Lucide Icons**, shadcn-style component primitives (`Button`, `Accordion`, …)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Project structure

```
app/                Pages (/, /about, /services, /testimonials, /news, /contact)
  api/contact/      Lead-capture endpoint (POST, zod-validated)
  sitemap.ts        Generated sitemap.xml
  robots.ts         Generated robots.txt
components/
  layout/           Navbar (transparent→solid), Footer, floating WhatsApp/Call CTAs
  home/             Hero, TrustBar, universities, services, process, testimonials…
  motion/           Reveal/Stagger/CountUp primitives (prefers-reduced-motion safe)
  ui/               Button, SectionHeading, Accordion
lib/
  site.ts           Single source of truth: contact info, stats, nav
  data/             Universities, services, testimonials, news, FAQs
  seo.ts            Metadata builder + JSON-LD (Organization, LocalBusiness, FAQ…)
docs/               Agency deliverables: IA, wireframes, design system,
                    database schema (PostgreSQL), SEO strategy, image strategy
research/           Brand snapshot, competitor notes, creative direction
public/images/      AI-generated campaign imagery (see docs/06-image-strategy.md)
```

## Before going live

1. **Contact details** — replace placeholder phone/WhatsApp/address in `lib/site.ts`.
2. **Lead handling** — wire `app/api/contact/route.ts` to your CRM/database
   (schema provided in `docs/04-database-schema.sql`) and email/WhatsApp alerts.
3. **Imagery** — confirm/replace campaign images in `public/images/` (manifest in
   `docs/06-image-strategy.md`); add real student photos with consent.
4. **Stats** — verify counters in `lib/site.ts` (students placed, visa rate, etc.).
5. **Map** — point the Google Maps embed on `/contact` at the exact office plus code.
6. **Analytics** — add GA4/Meta Pixel and track CTA clicks (consultation, WhatsApp, call).
