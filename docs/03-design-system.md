# UI Design System — "Quiet Confidence"

## Colour tokens
| Token        | Hex       | Usage |
|--------------|-----------|-------|
| `navy`       | `#0B1F4D` | Primary — headers, trust band, process, footer, text on light |
| `navy-deep`  | `#081738` | Footer/section depth variant |
| `gold`       | `#D4AF37` | Accent — CTAs, rules, eyebrows, icons. Never large fills |
| `gold-soft`  | `#E6C75C` | Hover state for gold |
| `mist`       | `#F5F7FA` | Alternating section background |
| `ink`        | `#111827` | Body text |
| `graphite`   | `#4B5563` | Secondary text |
| `success`    | `#16A34A` | Form success, checkmarks |
| `white`      | `#FFFFFF` | Canvas |

Contrast: gold on navy = decorative/large text only; CTA buttons use navy text on gold (≥7:1). Body is ink on white (≥15:1). All pairings pass WCAG AA.

## Typography
- **Single family:** Kumbh Sans (variable, `--font-sans`) used for both display and body — Apple-like geometric premium register. Hierarchy comes from weight (700 headings / 400–600 UI), scale, and tight tracking (-0.02 to -0.025em on titles).

| Style      | Size (desktop / mobile) | Notes |
|------------|--------------------------|-------|
| Display    | 64px / 40px              | Hero H1, -0.02em, lh 1.05 |
| H2         | 44px / 32px              | Section titles, lh 1.15 |
| H3         | 24px / 20px              | Card titles |
| Body large | 19px                     | Hero sub, intros, lh 1.7 |
| Body       | 16px                     | lh 1.7 |
| Eyebrow    | 13px caps                | +0.18em tracking, gold, w600 |
| Fine print | 13px                     | Meta, captions |

## Layout
- Container: `max-w-7xl` (1280px), 16/24px gutters
- Section rhythm: `py-20 md:py-28`; hero `min-h-[92svh]`
- Grid: 1 col mobile → 2 col ≥640px → 3 col ≥1024px
- Radius: cards `rounded-2xl`, buttons `rounded-full`, images `rounded-3xl`

## Components
- **Buttons:** `primary` (gold bg, navy text), `outline-light` (glass on dark), `outline-dark` (navy hairline on light), `whatsapp` (success green). All: rounded-full, 48px min height, focus ring, arrow-shift on hover.
- **Cards:** white surface, `border-black/5`, `shadow-soft`, hover `-translate-y-1 shadow-lift`.
- **Eyebrow + gold rule:** opens every section (brand motif).
- **Glass chip:** `bg-white/10 backdrop-blur border-white/20` — only over imagery.
- **Forms:** 48px inputs, visible labels, inline errors (red), success panel (green), honeypot field.
- **Accordion:** FAQ, single-open, chevron rotate, keyboard accessible.

## Motion tokens
| Token | Value |
|-------|-------|
| Reveal | opacity 0→1, y 24→0, 0.6s, cubic-bezier(0.21,0.6,0.35,1) |
| Stagger | 80ms between siblings |
| Hover lift | translateY(-4px), 200ms |
| Counter | ~1.6s ease-out count on first in-view |
| Nav solidify | 300ms background/blur/border |
Reduced motion: all reveals render static via `useReducedMotion`.

## Iconography
Lucide, 1.5px stroke, 20–28px, gold on navy / navy on light, in tinted rounded squares.
