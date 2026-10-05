# Image Asset Strategy

## Principles
- Cinematic, golden-hour, editorial photography. Nigerian students as confident protagonists at recognisable UK campus architecture.
- No flags, no Big Ben collages, no stock handshakes.
- Navy/gold grade harmonises with the design system; every image gets a navy scrim when text sits over it.

## Asset manifest (`public/images/`)
| File | Surface | Composition |
|------|---------|-------------|
| `hero-uk-campus.png` | Home hero (LCP, `priority`) | Nigerian students before gothic UK university architecture, golden hour, 16:9 |
| `about-consultants.png` | About story | African consultants advising students, luxury office |
| `services-guidance.png` | Services hero band | Admission guidance scene, premium office |
| `testimonials-graduation.png` | Testimonials hero / cards | Graduation celebration at UK campus |
| `contact-support.png` | Contact page | Warm consultant + student, office |
| `og-image.png` | Open Graph (1200×630) | Brand lockup over campus image, navy + gold |

## Generation prompts
Exactly as specified in the project brief (Images 1–5), rendered ultra-realistic, magazine quality, professional advertising photography. OG image derived from the hero with brand overlay.

## Delivery rules
- `next/image` everywhere; explicit `fill`/`sizes` or width/height (zero CLS)
- Hero: `priority` + `fetchPriority=high`; all others lazy-load by default
- `sizes` tuned per grid (e.g. `(min-width:1024px) 33vw, 100vw` for cards)
- Alt text written for screen readers (subject + context, no "image of")
