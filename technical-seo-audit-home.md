# Technical SEO Audit — Home Page

**URL audited:** `https://smoni.fr/`
**Audit date:** 2026-05-20
**Stack:** React 19 + Vite SPA (client-side rendered), React Router v7, no SSR/prerender
**Scope:** `/` only — `index.html`, `src/pages/generales/Home.tsx`, `public/robots.txt`, all `src/components/generales/Home*.tsx` sections

---

## TL;DR — Severity ranking

| # | Issue | Severity | Effort |
|---|---|---|---|
| 1 | **No SSR / no prerender — SPA serves an empty `<div id="root">` to crawlers** | 🔴 Critical | M |
| 2 | **`sitemap.xml` referenced in robots.txt but does not exist** | 🔴 Critical | S |
| 3 | **H1 only exists inside JS-rendered component (not in initial HTML)** | 🔴 Critical | M (solved by #1) |
| 4 | **Render-blocking Sketchfab script + Google Fonts in `<head>`** — hurts LCP | 🟠 High | S |
| 5 | **OG image `/6.png` likely wrong dimensions** (needs 1200×630) | 🟠 High | S |
| 6 | **Meta description = 225 chars** (truncated at ~160) | 🟠 High | S |
| 7 | **Heavy iframes loaded eagerly** (Sketchfab car + 3× Google Maps) | 🟠 High | S |
| 8 | **Images served as PNG/JPG, no `<picture>`, no `srcset`, no width/height** | 🟠 High | M |
| 9 | **Unsplash avatar hotlinks** — external dependency, no dimensions, LCP risk | 🟡 Medium | S |
| 10 | **No per-route `<title>` / `<meta>` management** (react-helmet missing) | 🟡 Medium | M |
| 11 | **Favicon = `/SPOILER_illustra.png`** — non-standard filename, no `.ico` fallback | 🟡 Medium | S |
| 12 | **No `theme-color`, no `apple-touch-icon`, no Web App Manifest** | 🟡 Medium | S |
| 13 | **No `Service`/`Course` schema for individual formations** (only `OfferCatalog`) | 🟡 Medium | S |
| 14 | **Breadcrumb in JSON-LD but no visible breadcrumb UI on page** | 🟢 Low | S |
| 15 | **`<meta name="keywords">` present** — ignored by Google, no harm but noisy | 🟢 Low | S |

---

## 1. Crawlability & Indexation

### 1.1 SPA rendering — 🔴 critical
`index.html` ships an empty `<div id="root"></div>` (line 204). All visible content (H1, copy, internal links, FAQ text) is injected by React on the client. Googlebot can render JS, but:
- **Bing, DuckDuckGo, social previewers, AI crawlers** see only the static head — no body content.
- **Google's two-pass indexing** delays JS-rendered content by days-to-weeks; rankings suffer until then.
- **JSON-LD FAQ is in `<head>`**, so it's parsed — but it's disconnected from the rendered FAQ in `HomeFaqSection.tsx`. If the two diverge, this becomes structured-data spam (manual penalty risk).

**Fix options (pick one):**
- **A. `vite-plugin-prerender` / `vite-plugin-ssg`** — prerender `/` (and ideally each route) to static HTML at build time. Lowest infra cost, perfect fit for a marketing site.
- **B. Migrate to a meta-framework** (Next.js, Remix, TanStack Start) — heavier lift; only if SSR is needed for auth-gated pages.
- **C. Dynamic rendering** (Rendertron / Prerender.io) — last resort; Google deprecated guidance in 2019.

**Recommended:** A. Add `vite-plugin-prerender-spa` or `vite-react-ssg`. Pre-render at least `/`, `/tarifs`, `/contact`, `/a-propos`, `/services` and all service sub-pages.

### 1.2 `robots.txt` — 🟢 mostly fine
```
User-agent: *
Allow: /
Sitemap: https://smoni.fr/sitemap.xml
```
- ✅ Allows all crawlers.
- ❌ Points to a sitemap that **does not exist** in `public/`. This logs as a crawl error in Search Console.

**Fix:** generate a `sitemap.xml`. Suggested tool: `vite-plugin-sitemap` or hand-author it (the site has <30 routes). Include `<lastmod>`, `<priority>`, `<changefreq>`. Submit to GSC + Bing Webmaster.

### 1.3 Canonical — ✅ correct
`<link rel="canonical" href="https://smoni.fr/">` is set. No trailing-slash mismatch, no protocol drift.

### 1.4 `robots` meta — ✅ correct
`index, follow, max-image-preview:large, max-snippet:-1` — exactly right for a marketing home.

### 1.5 `hreflang` — N/A
Single-language site (`fr-FR`). Not needed unless you add `/en/`.

---

## 2. On-page metadata

### 2.1 `<title>` — 🟡 borderline
**Current:** `Auto-École à Vincennes (94300) — Smoni | Permis B, Boîte Auto, Moto` — **73 characters**.

Google truncates around 580px (~60 chars). The pipe + "Permis B…" likely gets cut.

**Suggested:** `Auto-École Smoni Vincennes (94300) — Permis B, Auto, Moto` (~58 chars). Keep the brand close to the front for click-through.

### 2.2 Meta description — 🟠 too long
**Current:** 225 characters. Google truncates at ~160 chars (mobile) / ~155 (desktop).

**Suggested (~155 chars):**
> Auto-école à Vincennes (94300), 62 rue de la Jarry — 4 min du RER A. Permis B, boîte auto, moto. Prix affichés. ☎ 07 71 26 51 19

### 2.3 `<meta name="keywords">` — 🟢 harmless but noisy
Ignored by Google since 2009. Bing has used it as a spam signal historically. Remove to clean up the head.

### 2.4 Geo meta tags — 🟢 included
`geo.region`, `geo.placename`, `geo.position`, `ICBM` are set. Google ignores these but Bing/Yandex/legacy local engines still parse them. Keep.

### 2.5 Open Graph — 🟠 image risk
- `og:image` → `https://smoni.fr/6.png`. Needs verification: OG image must be **≥1200×630** (1.91:1) and ≤8 MB; otherwise LinkedIn/Twitter/Facebook crop weirdly.
- Missing: `og:image:width`, `og:image:height`, `og:image:type` (these speed up scraper resolution and prevent crop fallbacks).

**Fix:** create `/og-home.jpg` at 1200×630 with the Smoni brand + "Auto-école Vincennes" overlay. Add width/height/type tags.

### 2.6 Twitter Card — 🟡 minor
Missing `twitter:site` (your @handle if you have one) and `twitter:image:alt`.

### 2.7 No per-route metadata — 🟡
There is no `react-helmet-async` / `@unhead/react` / `react-router` document-head integration. Every route currently shows the home page title because `index.html` is the only HTML file. Even after prerendering you'll want a head-management library so internal pages can declare their own `<title>` and OG tags.

---

## 3. Structured data (JSON-LD)

### 3.1 `DrivingSchool` — ✅ strong
Comprehensive: `@id`, `foundingDate`, `address`, `geo`, `telephone`, `openingHoursSpecification`, `areaServed`, `hasOfferCatalog`. Validated mentally against schema.org — no missing required fields.

**Improvements:**
- Add `aggregateRating` only if you have real Google review numbers to back it (rich-result eligibility requires real reviews; faking = manual action).
- Add `review` array (up to 5 latest, with author names + ratings).
- Add `image` array (currently just `/6.png`) with 3–5 actual photos at 1200×900 min for rich-result eligibility.
- `priceRange` is `"€€"` — fine, but consider explicit numeric: `"990 - 1590 EUR"`.
- `sameAs` lists only Instagram. Add Google Business Profile URL, Facebook, LinkedIn, TripAdvisor if any.

### 3.2 `WebSite` with `SearchAction` — 🟡
`SearchAction` points to `https://smoni.fr/?q={search_term_string}` but **the site has no `/?q=` handler**. Google may surface a sitelinks search box that returns nothing. Either build the search or remove `potentialAction`.

### 3.3 `FAQPage` — 🟠 desync risk
The `<head>` declares 5 FAQ Q/A. `HomeFaqSection.tsx` renders **15** different Q/A. **Mismatched FAQ schema is against Google's structured-data guidelines** — the schema must match visible content.

**Fix:** either (a) trim the rendered FAQ to those 5, or (b) expand the JSON-LD to mirror all 15 rendered questions. Recommend (b). After prerendering, you can generate this from the same source array.

Also note: as of August 2023, **Google only shows FAQ rich results for government and health authority sites**. The schema is still useful for AI Overviews and Bing, but don't expect SERP FAQ accordions.

### 3.4 `BreadcrumbList` — 🟡 thin
Single item (`Accueil`). For the home, this is fine but trivial. More valuable when added per-page.

### 3.5 Missing entity types
- **`Service`** (or `Course` for the formations) — one per formation, linked via `provider` → `@id` of the DrivingSchool.
- **`Person`** for moniteurs (with `jobTitle`, `worksFor`).
- **`Organization`** parent if `SAS Arike Bello` is a separate legal entity.

---

## 4. Performance / Core Web Vitals

### 4.1 Render-blocking head — 🟠 high
`index.html` head loads:
- **Sketchfab viewer JS** (`<script src="...sketchfab-viewer-1.12.1.js">`) — **synchronous, blocking**. ~80 KB gzipped. Only needed by the hero 3D car.
- **Google Fonts CSS** — `<link rel="stylesheet">` blocks paint until fetched.

**Fix:**
- Add `defer` (or move to body) on the Sketchfab script: `<script defer src="...">`. Better: load it dynamically inside `HomeHeroSection.tsx` only on viewport intersection.
- Replace Google Fonts `<link>` with self-hosted `@font-face` + `font-display: swap` (you already preconnect, but the CSS still blocks paint). Or use `<link rel="preload" as="style" onload="this.rel='stylesheet'">`.

### 4.2 LCP element — 🟠
The hero is dominated by a 3D Sketchfab iframe that starts with `src=""` and loads on JS execution. LCP candidate is likely the H1 text — but on slow connections, the empty iframe area + the fonts-blocked text combine to push LCP past 2.5s.

**Fix:**
- Preload the Outfit 900 font weight only (the H1 weight): `<link rel="preload" href="..." as="font" type="font/woff2" crossorigin>`.
- Replace the 3D car with a static WebP poster image during the first paint, then swap to the iframe on `requestIdleCallback`.

### 4.3 Iframes — 🟠
`HomeLocationSection.tsx` renders a **Google Maps iframe** (line 116). Three location entries share the same map URL but the component re-mounts the iframe on click — each is a fresh ~1 MB request. Already `loading="lazy"` ✅, but consider a static map image (Google Static Maps API or a screenshot) for first paint, swap to interactive iframe on click.

### 4.4 Images — 🟠
- All hero/service images are `.jpg` or `.png`. No WebP variants except `vollant.webp`.
- No `width` / `height` attributes on `<img>` → CLS risk.
- No `<picture>` element with WebP/AVIF + JPG fallback.
- No `srcset` for responsive sizes.

**Fix script:** convert all `src/assets/images/home/*.{jpg,png}` to WebP+AVIF (use `vite-imagetools` or `sharp`). Add explicit `width`/`height` to every `<img>`.

### 4.5 External hotlinking — 🟡
`HomeHeroSection.tsx` lines 16–20: four Unsplash avatar URLs.
- Adds 4 extra DNS lookups + TLS handshakes.
- No control over Unsplash's CDN headers.
- These photos depict **specific people** — using stock photos to imply "real apprenants" is misleading (and weakens E-E-A-T).

**Fix:** download, optimize, self-host, OR replace with abstract initials/avatars.

### 4.6 Animations — 🟢 mostly fine
`framer-motion` `whileInView` + lazy-loaded sections is the right pattern. But: `whileInView` triggers render only when visible — Googlebot scrolls a synthetic viewport, may not trigger animations, content still renders because `initial` is `opacity: 0` (visible to crawlers, just invisible visually before animation). ✅ safe.

### 4.7 Bundle size — not measured here
Recommend running `vite build --report` and checking the resulting `stats.html` (rollup-plugin-visualizer). MUI v7 + shadcn + framer-motion + Headless UI in the same bundle is heavy — code-splitting per route is critical.

---

## 5. Heading hierarchy & semantic HTML

### 5.1 H1 — 🔴 (consequence of SPA issue)
- `HomeHeroSection.tsx` line 147: `<motion.h1>Le permis sans crier dessus.</motion.h1>` ✅ — correct, one H1.
- But: **only visible after JS executes**. To non-rendering crawlers there is no H1.

### 5.2 H2 cascade — 🟡 mixed
Multiple `<h2>` elements across sections (good), but:
- `HomeStarSection.tsx` line 75 has `<h2 className="sr-only">` AND lines 103–108 has another `<h2 className="text-6xl…">` for the stat values (e.g., "2022", "1", "6/6", "3"). **Numeric stats should be `<p>` or `<div>` styled large, not `<h2>`** — they're not section headings.
- `HomeHeroSection.tsx` is fine (h1 + p).
- `HomeCertificationSection.tsx`: card titles are `<h3>` ✅.

**Fix:** in `HomeStarSection.tsx`, change the stat-value `<h2>` (line 103) to `<p>` or `<div>`. Keep the sr-only `<h2>` as the section title, or promote it to visible.

### 5.3 Semantic landmarks — 🟡
`Home.tsx` wraps content in `<main>` ✅. But:
- `<Header>` should be `<header role="banner">` (currently `<header>` ✅).
- `<Footer>` — verify it uses `<footer>`.
- Sections use `<section>` ✅ across `Home*Section.tsx`.

### 5.4 ARIA — 🟢
- Iframe `title` + `aria-label` are present (HomeHeroSection line 236-237, HomeLocationSection line 118-119). ✅
- Mobile menu has `<span className="sr-only">Menu</span>` ✅.

---

## 6. Internal linking & navigation

### 6.1 Header nav — 🟡
8 top-level links + 2 dropdowns × 4-8 sub-links = ~24 internal links. Reasonable, but:
- Some dropdown items point to routes that may not be prerendered/built (`/fabrication-permis`, `/actualisation`, `/post-permis`). Verify they all return 200 — broken internal links waste crawl budget.

### 6.2 Anchor text — 🟡
Mostly generic ("Voir Détails", "Voir tout", "Contacter"). Replace with keyword-rich anchors where natural:
- "Voir Détails" → "Voir détails du Permis B" (per service card).
- "Voir tout" → "Toutes nos formations".

### 6.3 Footer links — not audited here
Open `src/components/generales/Footer.tsx` and verify presence of: address, phone, opening hours, legal links (Mentions légales, CGV, Politique de confidentialité), social links, sitemap link.

### 6.4 Breadcrumb UI — 🟢
Not required on home (top of hierarchy). Required on all child pages.

---

## 7. Mobile & accessibility (SEO-adjacent)

### 7.1 Viewport — ✅
`<meta name="viewport" content="width=device-width, initial-scale=1.0">` correct.

### 7.2 Tap targets — verify in DevTools
Some `Button h-8` (32px height) elements may be below the 44×44px minimum (WCAG 2.5.5). Check the mobile menu trigger (line 230: `h-9 w-9` = 36×36, **below threshold**).

### 7.3 Contrast — verify
`text-slate-400 font-bold` on white (line 91-92 of HomeStarSection): contrast ratio ≈ 2.6:1 — **fails WCAG AA** (needs 4.5:1). Same for `text-white/60` overlays.

### 7.4 Lang attribute — ✅
`<html lang="fr">` correct.

---

## 8. Security / trust signals

### 8.1 HTTPS — assumed (host-side)
### 8.2 `referrerPolicy` — ✅ on Google Maps iframe (`no-referrer-when-downgrade`)
### 8.3 Mixed-content — none observed in source
### 8.4 No CSP header visible — server concern (out of scope for this audit but worth adding)
### 8.5 Sketchfab + Unsplash hotlinks expose 3rd-party tracking — see 4.5

---

## 9. Phone / NAP consistency check

- Visible on page: `07 71 26 51 19` (Hero CTA, Location cards, Footer assumed)
- JSON-LD: `+33771265119` ✅
- `index.html` description: `07 71 26 51 19` ✅

NAP (Name, Address, Phone) is consistent across the home page. Now verify it matches:
- Google Business Profile listing
- Facebook page
- Yellow pages / Pages Jaunes
- Any directory citations

Inconsistent NAP across the web is the #1 local-SEO ranking killer.

---

## 10. Quick wins (≤ 1 hour each)

1. **Create `/public/sitemap.xml`** — hand-author the ~30 known routes with `<lastmod>2026-05-20</lastmod>`.
2. **Shorten meta description** to 155 chars.
3. **Shorten `<title>`** to ~58 chars.
4. **Add `defer`** to the Sketchfab `<script>` in `index.html`.
5. **Remove `<meta name="keywords">`** — 0 SEO value.
6. **Add `og:image:width` / `og:image:height`** (1200, 630) and create a proper 1200×630 OG image.
7. **Fix FAQ schema mismatch** — regenerate JSON-LD from the same array used in `HomeFaqSection.tsx`.
8. **Rename favicon** `/SPOILER_illustra.png` → `/favicon.ico` + `/favicon.svg` + `/apple-touch-icon.png` (180×180).
9. **Add `theme-color`** meta: `<meta name="theme-color" content="#2c2876">`.
10. **Add `manifest.webmanifest`** for installable PWA + Android theme color.
11. **In `HomeStarSection.tsx`** — change stat-value `<h2>` (line 103) to `<p>`.
12. **Add explicit `width`/`height`** to all `<img>` tags on the home page.
13. **Remove Unsplash hotlinks** — replace with self-hosted avatars or initials.
14. **Add `loading="eager"` + `fetchpriority="high"`** to the LCP image once you replace the Sketchfab iframe with a static hero.

---

## 11. Strategic priorities (1-2 weeks)

1. **Implement prerendering** (`vite-react-ssg` or `vite-plugin-prerender-spa`) — unlocks every other SEO gain by serving real HTML to crawlers.
2. **Generate sitemap from route table** — single source of truth, regenerated at build.
3. **Add `react-helmet-async`** (or `@unhead/react`) for per-route metadata.
4. **Image pipeline**: `vite-imagetools` → WebP + AVIF + responsive `srcset`, explicit dimensions everywhere.
5. **Defer/lazy-load 3rd-party iframes** (Sketchfab, Google Maps): static placeholder → real iframe on interaction or `requestIdleCallback`.
6. **Service-level schema** — one `Service` JSON-LD per formation page (Permis B, BVA, Moto, Stage, Recalés), each with `provider` linked to the DrivingSchool `@id`.
7. **Build out per-service landing pages** (`/permis-b-vincennes`, `/boite-automatique-vincennes`, `/permis-moto-vincennes`, `/stage-accelere-vincennes`, `/recales-vincennes`) — each prerendered, each with its own title/meta/Service schema. This is where the local-SEO long-tail traffic lives.
8. **Google Business Profile** — claim + verify, mirror the JSON-LD NAP, add the same photos used on the home, request reviews.

---

## 12. Files referenced

- `C:\projects\smoniFront\index.html`
- `C:\projects\smoniFront\public\robots.txt`
- `C:\projects\smoniFront\src\pages\generales\Home.tsx`
- `C:\projects\smoniFront\src\components\generales\HomeHeroSection.tsx`
- `C:\projects\smoniFront\src\components\generales\HomeCertificationSection.tsx`
- `C:\projects\smoniFront\src\components\generales\HomeStarSection.tsx`
- `C:\projects\smoniFront\src\components\generales\HomeGroupeSection.tsx`
- `C:\projects\smoniFront\src\components\generales\HomeLocationSection.tsx`
- `C:\projects\smoniFront\src\components\generales\HomeFaqSection.tsx`
- `C:\projects\smoniFront\src\components\generales\Header.tsx`
- `C:\projects\smoniFront\vite.config.ts`

---

*End of audit.*
