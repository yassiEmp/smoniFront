# SEO Fix Plan — smoni.fr

Source: SEO audit (Ahrefs / Aleyda Solis / Backlinko / Art of SEO / E-E-A-T / BrightLocal frameworks).
Status: queued. Tick items as they land.

---

## P0 — This week (1–2 commits)

### 1. Structured data cleanup (CRITICAL)
- [ ] Strip `index.html` JSON-LD down to **WebSite schema only** (truly sitewide)
- [ ] Move `DrivingSchool`, `FAQPage`, all `Service` blocks, and `BreadcrumbList` out of `index.html`
- [ ] Reconcile `@id` mismatch: pick one canonical (`#organization` OR `#drivingschool`) and use it in every schema across `schemas.ts` + Helmet layers
- [ ] FAQPage schema must only fire on pages that actually display those questions (home only for now)
- [ ] Service schema must only fire on the matching service page
- [ ] Remove static `BreadcrumbList: [Accueil]` from `index.html` — let runtime Helmet own it
- [ ] Replace `logo` URL `https://smoni.fr/6.png` with a properly named `/logo-smoni.png`

### 2. Indexing hygiene
- [ ] Extend `PageHead` with optional `noindex?: boolean` prop emitting `<meta name="robots" content="noindex">`
- [ ] Apply `noindex` to: `/quiz/results/*`, `/payment-success`, `/connexion`, `/inscription`, `/reset-password`, `/maintenance`
- [ ] Update `robots.txt` with `Disallow:` for `/learners/`, `/monitor/`, `/admin/`, `/payment-success`, `/connexion`, `/inscription`, `/reset-password`

### 3. Orphan / dead code
- [ ] Delete `public/SPOILER_illustra.png` (9KB, unused)
- [ ] Delete orphan `src/pages/.../Aide.tsx` and `Faq.tsx` (not routed, not linked)

### 4. Heading hierarchy
- [ ] Demote section `<h1>` → `<h2>` in: `HomeStarSection`, `HomeLocationSection`, `HomeCertificationSection`, `HomeStepSection` (keep one h1 per page — hero)

### 5. 404 handling
- [ ] Replace `<div>404 Page Not Found</div>` in `App.tsx` with the existing `NotFound.tsx`
- [ ] Ensure SSG returns real 404 status code

---

## P1 — Next 2 weeks

### 6. Performance / Core Web Vitals
- [x] Self-host Outfit + Inter via `@fontsource/outfit` + `@fontsource/inter` (drop Google Fonts request)
- [x] Preload LCP hero image in `index.html`: `<link rel="preload" as="image" imagesrcset="..." imagesizes="...">`
- [x] Move `HomeFaqSection` + `HomeTarifSection` out of `ClientOnly` so SSG renders them (SEO-critical content)
- [x] Reserve actual section heights for lazy sections to prevent CLS (current `h-96` fallback too short)
- [x] Produce WebP variant for `og-home.jpg` for Twitter cards

### 7. Per-page Open Graph
- [x] Pass per-service `ogImage` through `PageHead` for all 8 service Details pages
- [x] Verify each blog post title ≤ 60 chars in SERPs (peur-mecanique = 61 — flag for client)
- [x] Tighten meta descriptions to 140–155 chars (several currently 180+)

### 8. E-E-A-T signals
- [x] Create `/equipe/arike` author page (bio, BEPECASER / Titre Pro ECSR diplomas, photo, `Person` schema)
- [x] Link each blog post's `post.author.name` to the author page
- [x] Add SIREN (915 387 013), Garantie financière (art. L.213-2 cite), Qualiopi cert link to footer
- [ ] Link Qualiopi badge to the actual certificate PDF (TODO in Footer — needs cert URL from client)

### 9. Local SEO foundations
- [x] Embed Google Maps iframe on `/contact` + add structured `Place` schema (iframe pre-existed, schema added)
- [x] Add to schema `sameAs`: GBP profile URL, Facebook page, Pages Jaunes profile (Facebook done; GBP + PJ TODO — real URLs needed)

### 10. URL consistency
- [x] Rename `/privacypolicy` → `/politique-confidentialite` (301 at host — nginx rule documented in routes.tsx)

### 11. Internal linking
- [ ] Add at least one contextual in-paragraph link per blog post → `/conduite` or `/tarifs` or `/contact`
- [ ] Verify Footer links to every service route (not just `/services`)

### 12. Image alt diversity
- [ ] Vary `HomeGroupeSection` alt suffixes — currently every card has the same `"— Auto-école Smoni à Vincennes (94300)"` tail

### 13. Sitemap
- [ ] Stamp per-page `lastmod` at build time (currently all `2026-05-20`)
- [ ] Generate image sitemap for blog images

---

## P2 — Month-out

### 14. Location pages (local content depth)
- [ ] `/auto-ecole/saint-mande` (200–400 words, landmarks, internal link to `/contact`)
- [ ] `/auto-ecole/fontenay-sous-bois`
- [ ] `/auto-ecole/montreuil`
- [ ] `/auto-ecole/paris-12e`

### 15. Comparison content (commercial intent)
- [ ] `/smoni-vs-ornikar`
- [ ] `/smoni-vs-stych`
- [ ] `/smoni-vs-evs`

### 16. Examination center pages
- [ ] `/centre-examen/rungis`
- [ ] `/centre-examen/creteil`

### 17. Off-codebase / Local SEO
- [ ] GBP review acquisition flow (SMS/email after every pass)
- [ ] GBP weekly posts cadence
- [ ] 15+ GBP photos (exterior, interior, team, cars)
- [ ] Seed GBP Q&A with top FAQs
- [ ] NAP consistency audit: GBP, Facebook, Pages Jaunes, Yelp FR, FrenchDirectory, automoto.fr, lesannuaires.com

### 18. Backlinks
- [ ] Pitch guest posts / mentions on: Caradisiac, Auto-Plus, Vroom Vroom, OuiCar, + 6 niche FR auto-école sites

### 19. Performance regression guard
- [ ] Lighthouse pass on key routes
- [ ] INP / CLS regression test in CI

---

## P3 — Ongoing

### 20. Content cadence
- [ ] 1 in-depth blog article every 2 weeks, ≥1500 words, with internal links to `/conduite` or `/tarifs`
- [ ] Convert each of the 15 home-FAQ questions into its own short post over time

### 21. Maintenance
- [ ] Quarterly NAP consistency audit across French directories
- [ ] Once GBP has 10+ reviews, mirror them via `Review` / `AggregateRating` schema (do NOT fabricate)

---

## Accessibility (correlates with SEO)
- [ ] Add skip-to-content link
- [ ] Add `aria-label` to icon-only buttons (Share2, Link2 in `BlogArticle`)
- [ ] Raise contrast: replace `text-slate-500` on white (4.5:1, borderline AA) with `text-slate-600`+ in marketing copy
- [ ] Audit font-size <12px: `text-[10px]`, `text-[12px]` in `AllService.tsx`, `FaqComponent`
- [ ] Tap-target audit: icon-only nav buttons ≥ 48×48px

---

## Verification checklist (before claiming "done")
- [ ] `view-source:` on `/`, `/tarifs`, `/conduite`, `/blog/<slug>` shows H1, meta, JSON-LD in SSR HTML
- [ ] Google Rich Results Test passes on home, a service page, a blog post
- [ ] Schema Markup Validator shows no duplicate `@id` warnings
- [ ] PageSpeed Insights mobile score ≥ 90 on home + one service page
- [ ] No console errors on any public route
