# SEO Strategy

## Target keyword map
| Page          | Primary keyword                         | Supporting |
|---------------|------------------------------------------|------------|
| Home          | study in UK from Nigeria                 | UK admission consultants Nigeria, UK university agents Nigeria |
| About         | UK education consultants in Nigeria      | trusted study abroad agency Lagos |
| Services      | UK student visa support Nigeria          | UK university application help, scholarship guidance Nigeria |
| Testimonials  | Nigerian students in UK universities     | UK admission success stories |
| News          | study abroad consultants Nigeria (topics)| UK admission deadlines, UK scholarships for Nigerian students, UK student visa updates |
| Contact       | book UK education consultation Nigeria   | UK admission agency Lagos contact |

## Meta titles & descriptions (implemented in `lib/seo.ts` + page metadata)
- **Home:** "Study in the UK from Nigeria | Akintom Global Resources" — "Expert UK admission consultants in Nigeria. Free consultation for university placement, scholarships, and student visa support. Start your UK journey today."
- **About:** "About Us | Trusted UK Education Consultants in Nigeria" — "Meet the team guiding Nigerian students into UK universities. 10+ years of admissions, scholarship and visa expertise. Learn why families trust Akintom."
- **Services:** "UK Admission, Scholarship & Visa Services | Akintom" — "End-to-end UK study services for Nigerian students: university placement, scholarship support, visa assistance, accommodation and pre-departure guidance."
- **Testimonials:** "Student Success Stories | Nigerian Students in UK Universities" — "Real Nigerian students placed in Manchester, Birmingham, Leeds and more. Read and watch their UK admission success stories."
- **News:** "UK Study News, Scholarships & Visa Updates | Akintom" — "Admission deadlines, scholarship alerts, UK university news and visa updates for Nigerian students — curated by Akintom's counsellors."
- **Contact:** "Contact Us | Book a Free UK Study Consultation" — "Book a free consultation with a UK admissions advisor in Nigeria. Visit our office, call, or message us on WhatsApp today."

## Structured data (JSON-LD, implemented in `lib/seo.ts`)
- **Organization + EducationalOrganization** — site-wide (root layout)
- **LocalBusiness** (`ProfessionalService`) — Contact page: address, geo, hours, phone
- **FAQPage** — Services page (mirrors visible FAQ accordion)
- **WebSite** with SearchAction-ready structure — root
- **BreadcrumbList** — inner pages

## Open Graph / Twitter
Per-page `title`, `description`, `og:image` (1200×630 branded image), `og:locale: en_NG`, `twitter:card: summary_large_image`. Canonical URLs via `metadataBase` = `https://akintomglobalresources.com`.

## Technical
- `app/sitemap.ts` + `app/robots.ts` generated routes
- Semantic heading hierarchy: one `h1` per page
- Descriptive alt text on all imagery
- Next/Image with explicit sizes (CLS-safe), priority on hero LCP
- Blog architecture: category-filtered listing now; per-article routes (`/news/[slug]`) wired in the data model for the CMS phase

## Content engine (editorial calendar seeds)
1. "January vs September intake: which is right for Nigerian applicants?"
2. "Proof of funds for UK student visas: 2026 requirements explained"
3. "Chevening, GREAT and university scholarships Nigerian students actually win"
4. "From HND to UK Master's: the conversion route explained"
5. Monthly: admission deadline roundups + visa policy updates
