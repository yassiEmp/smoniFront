# Smoni — Process: Designing Section Illustrations

A repeatable workflow for producing on-brand illustrations for any Smoni homepage section. Followed in full it should land in 5–8 iterations.

---

## 0. Brand lock (do this once, reuse everywhere)

Before touching pixels, internalize the constants. These are non-negotiable.

| Token | Value | Use |
|---|---|---|
| `INDIGO` | `#2c2876` | Primary subject fill, headings |
| `INDIGO_DEEP` | `#1e1b4b` | Shadow color, secondary panel |
| `INDIGO_60` | `#7472b0` | Mono captions, meta text |
| `INDIGO_20` | `#cfceea` | Dividers, structure |
| `BLUE_ACCENT` | `#3b82f6` | ONE accent only — the highlighted detail |
| `PAPER` | `#ffffff` | Document fills |
| `PAPER_RULE` | `#e6e3f5` | Body rule lines |
| `SECTION_BG` | `#f3f1ff` → `#f8fafc` | Light-mode illustration bg (radial) |
| `DOTS` | `#2c2876 @ 6% alpha`, 6px grid | Halftone texture |

Typography:
- Display headings — `Outfit 900` (font-black), letter-spacing `-0.02em` to `-0.04em` on large
- Body — `Inter 500/600`
- Mono captions / tags — `JetBrains Mono 600/700`, letter-spacing `0.18em–0.22em`, uppercase

Card chrome:
- Section bg `#f8fafc`, white card `border-radius: 20px`, `border: 1px solid #eef2f7`
- Shadow: `0 24px 50px -28px rgba(15,23,42,0.22), 0 2px 6px -2px rgba(15,23,42,0.06)`

---

## 1. Read the section first

Before generating anything, fetch the actual source component for the section being illustrated. Read:
- The headline + subhead
- Every card's title + body copy
- The current visual treatment (so you know what to replace and what to keep)
- The neighboring sections (so you don't break the surrounding rhythm)

Write a one-sentence story for the **whole section** and one for **each card**. The card story is the single thing the illustration must communicate. If you can't say it in one sentence, the brief is unclear — go ask.

---

## 2. Ask a focused question set

Use a structured form. Always ask:

1. **Asset role** — small per-card icon? big hero? per-card top-of-card banner? full-bleed background? Decide for me?
2. **Visual style** — start with "Explore a few options"; offer flat / editorial line / paper-document / pictogram / type-led / dark-glow as starter lanes
3. **Tone** — reassuring / matter-of-fact / cheeky / premium
4. **People** — abstract people OK? objects only?
5. **Output format** — inline SVG / standalone files / PNG / just designs
6. **Aspect ratio** — 1:1 / 16:9 / 3:4 / decide
7. **Color usage** — strict brand / brand + warm accent / each card its own hue / decide
8. **Variation count** — slider 1–5
9. **Specific metaphors** — open freeform
10. **Anything to avoid** — open freeform

Skip the form for trivial follow-ups. Always ask it on a fresh section.

---

## 3. Generate breadth first, depth second

**Phase A — Breadth (5 styles × N illustrations).**

Set up a `design_canvas.jsx` with one section per style and N artboards per section (one per card you need to illustrate). Pick five distinct lanes — don't iterate on one style, generate five different ones in parallel. Sensible starter set:

- **A · Flat Geometric** — Bauhaus shapes, no strokes, brand-only
- **B · Editorial Line** — thin single-weight strokes on white
- **C · Document / Paper** — literal "written promise" metaphor, stamps, signatures
- **D · Bold Pictogram** — solid silhouettes, near-monochrome, app-icon energy
- **E · Swiss Type-led** — big number/glyph as the illustration

Each style covers ALL N illustrations so the user can compare like-for-like across lanes.

End every style's row with **one "in-context preview"** — the actual card mock with the illustration injected. This is what catches "looks good in isolation but doesn't fit" failures early.

Call `done` and stop. Wait for the user to pick lanes.

**Phase B — Narrow.** When the user says "keep X, Y, Z", filter the canvas via a `KEEP = [...]` array. Don't delete code; just hide other lanes. You may need to revisit them.

**Phase C — Generate a new direction** when asked. If the user references a vibe (chrome / glow / Notion / Apple), spawn a NEW set of styles (F, G, H...) alongside the surviving ones. Never modify in place — always duplicate so comparison stays possible.

---

## 4. Illustration craft principles

These are the rules of thumb to apply to every individual illustration:

1. **One story per card.** Not "icon + document side by side". A single message told via a primary subject + a supporting element that reinforces it.
2. **Visual hierarchy.** One thing is the largest and most saturated. Everything else is supporting. No two elements should fight for attention.
3. **Asymmetric composition.** Rule of thirds. Centered = boring and read as "icon", off-center = read as "scene".
4. **Z-order with intent.** Overlap creates depth. Whatever's in front matters more. Use this to direct the eye.
5. **Connecting visual language.** When pairing an icon with a document, use ONE dotted leader line + a terminator dot pointing from the icon to the EXACT detail being emphasized on the document. The eye should follow icon → highlighted line → done.
6. **Restricted palette.** ~60% bg, ~30% indigo, ~10% blue accent. Blue ONLY on the highlighted element. If blue appears in two places, it loses meaning.
7. **Negative space is content.** Resist filling corners. Empty space frames the subject.
8. **System cohesion.** Same bg gradient, same dot texture, same icon treatment (solid indigo + white outline + soft diffuse brand shadow), same connector style across all N cards. The row should read as ONE system.
9. **Type as art.** A typographic mark (€, 60, §, 2ᵉ) often beats an illustrated icon — it's the most compressed visual form of the message.
10. **No AI tropes.** Skip gradient soup, generic shield/check icons, decorative SVG humans, emoji. Skip fake stats. Skip border-left accent rounded cards.

---

## 5. Treatment recipe (the locked Smoni look)

Once the lane is picked, apply this exact treatment to every illustration:

**Background** — `<radialGradient>` from `#e6e3ff` (off-center hot spot) → `#f3f1ff` → `#f8fafc`. Overlay a 6px halftone dot pattern at 6% indigo alpha.

**Subject** — solid `#2c2876` fill, white stroke `2.5px`, `paint-order: stroke` so the outline sits behind the fill. Soft diffuse brand-color shadow underneath: same path filled `#2c2876 @ 32% opacity` blurred via `feGaussianBlur stdDeviation="10"`, offset down 2-6px.

**Inner detail on the subject** — white at varying opacity (0.45–0.9) for icon contents, 0.28 opacity stroke for inner rings.

**Type inside subjects** — `Outfit 900` white, big.

**Supporting document** — white paper with `#e6e3f5` border, `#2c2876` header bar OR `#1e1b4b @ 18%` blurred shadow behind. Tilt 3–5° one direction for "tossed on desk" feel.

**Highlight on the focal line** — `#3b82f6 @ 10%` fill rectangle behind the row, optional 2px `#3b82f6` underline on the key value. Used at most ONCE per illustration.

**Connector** — `<line stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.75">` from icon → terminator dot `<circle r="2.5" fill="#3b82f6">` on the highlighted detail.

**Mono caption / tag** — `JetBrains Mono 700 fontSize="7-9"` `letterSpacing="0.18em-0.22em"` in `#ffffff @ 0.7` if on indigo, `#7472b0` if on white.

---

## 6. The in-context preview card

The preview card is its own deliverable. It validates the illustration AT REAL SIZE on a card that matches the real site. Spec:

- Width 380px, light theme (`#f8fafc` artboard bg, white card)
- 16:9 illustration area at top, **no fade-out**, **no clipping** (use `overflow: hidden` only when explicitly safe)
- Optional `bleed: true` per item: set `overflow: visible` so the illustration's SVG can spill below into the card body (use sparingly — one element per row)
- Body content lifted: `marginTop: -16` to overlap slightly into the illustration's bottom
- Editorial micro-chrome: mono "Engagement · N°XX" tag → bold `Outfit 800` title → 32×2 indigo accent rule → `Inter 500` body copy
- Top-right counter `02 / 05` in mono, brand-tinted at low alpha
- If the illustration is dark (only when you intentionally went dark), keep card light but overlay a soft `radial-gradient(rgba(90,78,184,0.22) → 0)` halo at the top of the body so the dark image's energy continues onto the white surface

Show the preview right after each illustration on the canvas — so the user can compare illustration AND in-context placement at once.

---

## 7. Iteration loop

Expect 5–8 rounds. Common patterns:

1. **"Remove style X"** → filter via `KEEP` array. Don't delete files.
2. **"Match this reference vibe"** → spawn a new style block (F/G/H...) alongside surviving styles. Don't modify in place.
3. **"Make the preview blend better"** → upgrade the ContextCard (fade gradient, glow bleed, theme-adaptive). Never touch individual illustrations.
4. **"Light mode, not dark"** → understand the actual site bg (`#f8fafc`) and stop using dark stages. The chrome trick doesn't work on light bg; switch to solid indigo + white outline + diffuse brand shadow.
5. **"Combine A from style X with B from style Y"** → create explicit Hybrid components. Register them as a new section. Don't try to share code across lanes — readability beats DRY here.
6. **"Effects are weird / too much"** → strip layers one at a time. Often the answer is: solid fill + white stroke + soft diffuse shadow. Nothing else.
7. **"Mix A + B but with shared emphasis"** → that's a blend, not a juxtaposition. Use overlap + a connector pointing to the specific detail. Add ONE highlight on the document side.
8. **"Make all the X's better"** → spawn a new "Y · polished" section, don't mutate the existing X's. The user wants to compare.

---

## 8. Filesystem conventions

- `<section-name>.html` — entry point, includes script tags in this order:
  1. React + ReactDOM + Babel (pinned versions, with integrity hashes — copy-paste from the standard block)
  2. `<section-name>-illustrations.jsx` — first set of styles
  3. `<section-name>-glow.jsx` — second set (dark/glow if user asks)
  4. `<section-name>-polished.jsx` — final polished set
  5. `design-canvas.jsx` — the starter
  6. `<section-name>-canvas.jsx` — wiring + KEEP filter + ContextCard
- Each style file: defines components, then `window.STYLES = [...(window.STYLES || []), STYLES_FROM_THIS_FILE]`
- Each component: `const styleAName = { ... }` — never `const styles = { ... }` (collision across files)
- Unique gradient IDs per render via a `uid()` helper — SVG `<defs>` collide across instances otherwise

---

## 9. Verification

After every significant change:
1. Call `done` with the HTML path
2. Read console output — fix errors before continuing
3. Call `fork_verifier_agent` only after `done` reports clean
4. For directed checks ("verify the new style F renders"), use `fork_verifier_agent({task: "..."})` and continue

Never proactively screenshot to check work — that wastes context. Trust `done` + the verifier.

---

## 10. Handoff

When the user locks a row, the deliverable is:
1. The final 5 React/SVG components in a single file with stable names
2. Reference colors, fonts, treatment recipe (section 5) in a comment header
3. The ContextCard treatment (section 6) so the developer wraps each illustration correctly when integrating into the real component

Don't export PNGs unless asked — inline SVG is the right format for the site (sharp at any DPI, themeable, tiny).

---

## TL;DR for a new section

1. Read source code of the section. Write 1 story per illustration.
2. Ask the standard question form.
3. Generate 5 distinct style lanes × N illustrations on a design canvas. Add in-context previews.
4. Wait. Narrow via `KEEP`.
5. Generate new lanes ON DEMAND when user references a new vibe — never mutate, always duplicate.
6. When user picks, apply the locked treatment recipe (solid indigo + white stroke + diffuse brand shadow + ONE blue highlight + dotted connector + halftone bg).
7. Apply the 10 craft principles to refine each illustration.
8. Spawn a "polished" lane (Y) when the user asks to elevate the existing picks — don't modify the X's.
9. Verify with `done` + `fork_verifier_agent`. Don't screenshot proactively.
10. Hand off as inline SVG with treatment comments.
