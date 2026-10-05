# Creative Direction — Akintom Global Resources

## Concept
**"The Quiet Confidence of an Offer Letter."**
Luxury education consultancy: Oxford prestige × Apple restraint. Deep royal navy as the institutional anchor, luxury gold as the achievement accent, generous whitespace, editorial serif display type. Every section earns trust before it asks for action.

## Visual system
- **Type:** Playfair Display (display/headings — collegiate, editorial) + Inter (UI/body — modern, legible).
- **Colour:** Navy `#0B1F4D` (authority), Gold `#D4AF37` (achievement, used sparingly as rules/eyebrows/accents), Mist `#F5F7FA` (section alternation), Ink `#111827` (text), White (canvas), Success `#16A34A` (form states).
- **Motif:** a thin gold rule + uppercase letter-spaced "eyebrow" label opens every section. Gold is never used as large fill — only as a precision accent (the gilt edge of a certificate).
- **Surfaces:** soft-radius (1rem–1.5rem) cards, hairline borders, very soft shadows, occasional glassmorphism only over imagery (hero chips, navbar).
- **Imagery:** cinematic golden-hour photography of Nigerian students at UK campuses; consultancy office scenes. No flags, no clip-art.

## Signature moments
1. **Hero:** full-bleed cinematic image, navy scrim, transparent navbar that solidifies on scroll, glass trust-chips, dual CTA (gold primary / glass secondary).
2. **Trust band:** navy section with animated counters (students placed, partner universities, visa success, years).
3. **Process timeline:** 6 numbered steps with a continuous gold line — the published-process trust unlock.
4. **Editorial testimonial slider:** one large serif quote at a time, star rating, name + course + university, restrained auto-advance.

## Motion language (Framer Motion)
- Fade-up reveals (24px, 0.6s, easeOut), staggered children (80ms)
- Counter animations on in-view
- Hover lift on cards (-4px translate + shadow)
- Navbar background/blur transition on scroll
- `prefers-reduced-motion` respected globally — motion clarifies hierarchy, never decorates

## Conversion architecture
- Primary: **Book Free Consultation** (hero, process, final CTA, navbar)
- Secondary: **WhatsApp Advisor** (hero, sticky desktop pill, mobile floating bar with Call)
- Tertiary: Explore Universities, Speak to an Advisor, Start Your UK Journey, Apply Now (footer)
- Mobile: persistent floating WhatsApp + Call bar
