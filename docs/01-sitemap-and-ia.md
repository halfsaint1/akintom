# Sitemap & Information Architecture

## Sitemap

```
/                      Home — full persuasion path, all conversion entry points
/about                 About — story, mission/vision/values, leadership, partnerships, achievements
/services              Services — 6 detailed service sections + FAQ (FAQ schema)
/testimonials          Testimonials — filterable written + video stories, placements
/news                  Events & News — categorised articles (SEO blog structure)
/contact               Contact — form, WhatsApp, map, address, hours (LocalBusiness schema)
/sitemap.xml           Generated (app/sitemap.ts)
/robots.txt            Generated (app/robots.ts)
/api/contact           Lead capture endpoint (POST)
```

## Navigation
Sticky header. Transparent over the home hero, solid white + blur + hairline border after 24px scroll (and always solid on inner pages). Desktop: logo / links / "Book Free Consultation" gold button. Mobile: hamburger → full-screen navy panel.

## User journey mapping

| Stage         | Page/Section                          | Job                                   |
|---------------|---------------------------------------|---------------------------------------|
| Awareness     | Hero, SEO/blog articles               | "These people specialise in exactly my situation" |
| Trust         | Trust bar, universities, why-us, testimonials | Verifiable numbers + named proof |
| Interest      | Services preview, process timeline    | "I understand exactly what happens and when" |
| Consultation  | Hero CTA, final CTA, contact form, WhatsApp | Low-risk free consultation booking |
| Application   | Advisor-led (offline) + Apply Now / contact form | Submission with documents ready |

## Conversion map (CRO placements)
- Hero → **Book Free Consultation** (primary) + **WhatsApp Advisor**
- Universities section → **View All Universities / Explore Universities**
- Services section → **Speak with an Advisor**
- Testimonials section → **Start Your UK Journey**
- Final CTA band → **Book Consultation** + **WhatsApp Us**
- Footer → **Apply Now**
- Desktop sticky → WhatsApp consultation pill (bottom-right)
- Mobile floating bar → **WhatsApp** + **Call** (always visible)

## Page roles (no message duplication)
- **Home** sells the promise and proof.
- **About** sells the people and legitimacy (parents' page).
- **Services** sells the mechanism in depth and handles objections (FAQ).
- **Testimonials** sells outcomes.
- **News** earns search traffic and demonstrates currency (deadlines, visa updates).
- **Contact** removes friction: three ways to start, today.
