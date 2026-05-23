# Design

Extracted from the live codebase (Tailwind config, `src/index.css`, `HomeHeroSection`, `HomeRecalesSection`, surrounding marketing components). Living document — re-run `/impeccable document` after major visual changes.

## Visual Theme

Editorial-leaning marketing surface anchored on one saturated indigo and a near-white slate. The aesthetic is closer to an independent shop's site than to a SaaS template: oversized display type, generous whitespace, real photography (the Peugeot 2008 bleeds off the hero), and small typographic flourishes (italic accents, ultra-thin uppercase eyebrows with wide letter-spacing). Decoration is restrained — no glass, no mesh gradients, no heavy shadows — and the brand commitment is carried by **type weight and one purple**, not by palette breadth.

Theme is **light**. Surface is a barely-tinted slate-50 (`#f8fafc`), not pure white, which softens the page on mobile under daylight and lets the indigo type read as the dominant ink. Dark mode is not currently shipped on the marketing site and is not on the roadmap.

## Color Palette

Color strategy: **Restrained**. One brand purple carries ~80% of the visual weight (headings, primary CTAs, eyebrows, the radial wash on hero); everything else is tinted neutral, with a single blue accent used sparingly.

Tokens currently in use:

| Role            | Value                        | Notes                                                |
|-----------------|------------------------------|------------------------------------------------------|
| Brand primary   | `#342563`                    | Tailwind `primary.DEFAULT`; used on `.active` links  |
| Brand primary 2 | `#2c2876`                    | Used directly in HomeHero (slightly cooler variant)  |
| Surface         | `#f8fafc` (Tailwind slate-50) | Page background under hero and below-the-fold sections |
| Ink             | Brand primary on surface      | Body text inherits Inter at near-black via primary   |
| Accent blue     | Tailwind `blue-500`           | Used in hero gradient text (to be replaced — see Anti-patterns) |
| Scrollbar       | `#6C61F6` thumb, `#E0E0E0` track | Custom CSS on `body`                                |
| Filter primary  | CSS filter recipe in `index.css` for tinting SVGs to brand purple | |

Shadcn HSL tokens (`--background`, `--foreground`, `--muted`, etc.) are wired through Tailwind but the marketing pages largely bypass them in favor of hex values. The product side (admin/monitor/learner apps) is where the HSL token system actually matters; treat marketing as a separate palette layer that happens to share the same primary.

**OKLCH note.** The codebase is currently in hex/HSL, not OKLCH. New brand tints should be authored in OKLCH (with chroma reduced near the extremes) and converted to hex at usage; do not introduce new HSL hues.

## Typography

Three families load on the marketing site. Pairing logic: Outfit for hero/display, Inter for everything else, Masque as a reserved-use display flourish for `.principal`-marked text.

| Family   | Source                                  | Use                                                       |
|----------|-----------------------------------------|-----------------------------------------------------------|
| Outfit   | (web font, used inline via `fontFamily: "'Outfit', sans-serif"`) | H1 / hero, weights up to 900, with negative tracking |
| Inter    | Global `*` rule in `index.css`          | Body, UI, secondary headings; fallback to Century Gothic  |
| Masque   | Local `MASQUE__.woff2`, font-display swap | Display-only via `.principal` class; used sparingly for editorial accents |

Scale on the homepage hero: `text-6xl → sm:text-7xl → md:text-6xl → lg:text-[64px] → 2xl:text-[140px]`. Ratio between body (1rem ≈ 14-16px depending on viewport) and hero is ~9× at the top breakpoint — high contrast, deliberate. Eyebrows use `text-[9px] 2xl:text-[10px] font-black uppercase tracking-[0.2em]` for the high-fashion micro-label feel.

Root `html` font-size is **14px below 1600px viewport width**, 16px above. Tailwind's `rem`-based scale therefore shrinks the entire UI on standard laptops; account for this when working in `px` versus `rem`.

## Spacing & Layout

Container strategy: no global `.container` wrapper. Each section sets its own horizontal padding (`px-6 lg:px-16 xl:px-32`) and its own vertical rhythm. This is intentional — varying section paddings produce rhythm rather than monotony — but it does mean alignment between adjacent sections requires care.

The hero uses an asymmetric split: left column constrained to `md:max-w-[55%] lg:max-w-[52%] xl:max-w-[50%]` for copy, right ~58-65% reserved for the car visual which bleeds off the right edge under a `WebkitMaskImage` linear gradient. Several below-the-fold sections (Groupe, Features, Impact, Step, NewStudent, Location) are lazy-loaded with tuned `min-h-[Npx]` placeholder heights to avoid CLS.

Cards are used in the recales bento (`HomeRecalesSection`) but not as the default — most sections lay out content directly on the surface with type and spacing carrying the hierarchy.

## Motion

Framer Motion is the motion library. Two patterns dominate:

- **Page-level fade-in-up on scroll** via `FadeInSection` in `Home.tsx`: `{ opacity: 0, y: 20 } → { opacity: 1, y: 0 }` with `duration: 0.6, ease: [0.22, 1, 0.36, 1]` (ease-out-quart), `viewport: { once: true, margin: "-100px" }`.
- **Hero stagger** in `HomeHeroSection`: container with `staggerChildren: 0.06, delayChildren: 0`, children animate `{ opacity: 0, y: 40 } → { opacity: 1, y: 0 }` with `duration: 0.45, ease: [0.16, 1, 0.3, 1]` (ease-out-expo).

Tailwind has three keyframes (`slideUp`, `accordion-down`, `accordion-up`) registered for Radix-based components. Custom CSS animations on hero/below-the-fold are minimal.

Motion philosophy: smooth ease-out curves, no bounce, no elastic, no spring. `prefers-reduced-motion` is not yet wired through framer-motion configs — open todo (see PRODUCT.md Accessibility).

## Components

UI is a mix of three systems (deliberately tolerated, see CLAUDE.md):

- **shadcn/ui** in `src/components/ui/*` — Radix primitives + Tailwind. The base for buttons (`Button` used in the hero), accordions (FAQ), dialogs.
- **MUI v7** — used in admin/monitor/learner app screens, less so on marketing.
- **Headless UI** — selective use for menus and disclosures.

When adding marketing components, **match shadcn**. The marketing site is consistent enough that introducing MUI here would break the visual.

## Iconography & Imagery

- **Icons**: `lucide-react` (e.g. `ArrowRight`, `Star` in the hero).
- **Images**: Real photography of the school's car (Peugeot 2008) and place. Served as responsive `<picture>` with AVIF / WebP / PNG sources and explicit `srcSet` widths (800w / 1200w / 1600w) for LCP optimization. Hero image has `fetchPriority="high"` and `loading="eager"`.
- **Avatars**: `/avatars/apprenant-{1..4}.jpg` — real student avatars used in the hero social-proof cluster.

## Anti-patterns currently in the code

Tracked here so future passes can resolve them, not as a goal in themselves:

1. **Gradient text on the hero H1** — `bg-gradient-to-r from-[#2c2876] via-[#2c2876] to-blue-500 bg-clip-text text-transparent italic` on "sans stress." Banned by impeccable's shared laws; the gradient is also nearly invisible (two stops on the same purple). Replace with single-color italic emphasis.
2. **Two near-duplicate purples** (`#342563` and `#2c2876`) used interchangeably across components. Consolidate to one OKLCH token referenced everywhere.
3. **Custom scrollbar in violet** (`#6C61F6`) doesn't match either of the two brand purples. Either align to the brand token or drop the override and let the browser default render.
4. **Root font-size shrinking to 14px below 1600px** — a global rem-scale shrink on standard laptops. Surprising and propagates everywhere; document intent or back out.
