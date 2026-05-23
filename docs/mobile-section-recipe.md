# Mobile section recipe

Pattern extracted from `HomeFeaturesSection.tsx` and `HomeCertificationSection.tsx`.
Apply to any "header + grid of cards" section that needs to read well on phones.

## When to use

The target section has:
- A section header (eyebrow + h2 + optional supporting paragraph)
- A grid of N cards (5–9 range)
- One card flagged `featured: true` for Von Restorff anchoring

## Step 1 — Mobile-first header typography

Replace desktop-anchored type scales with mobile-first ramps.

| Element | Before (desktop-anchored) | After (mobile-first) |
|---|---|---|
| Section padding | `py-24 md:py-32` | `py-16 sm:py-24 md:py-32` |
| Container | `container mx-auto px-6 md:px-10 xl:px-32` | `max-w-7xl mx-auto px-4 sm:px-6` |
| Header bottom margin | `mb-20` | `mb-12 sm:mb-14 lg:mb-20` |
| Header inner gap | `space-y-4` | `space-y-3 sm:space-y-4` |
| h2 size | `text-4xl md:text-5xl lg:text-6xl` | `text-[26px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl` |
| h2 leading | `leading-[1.1]` | `leading-tight lg:leading-[1.1]` |
| h2 wrapping | (none) | add `text-balance` |
| Supporting `<p>` | `text-lg md:text-xl` | `text-[15px] sm:text-base md:text-lg lg:text-xl` |

Eyebrow `<p>` already uses a mobile-friendly ramp (`text-[11px] sm:text-[10px] ... tracking-[0.18em] sm:tracking-[0.3em]`) — leave it.

## Step 2 — Center the featured card on mobile (CSS only)

In a single-column stack the Von Restorff anchor must sit near the eye's
rest point, not at the top where it competes with the section header.
Use Tailwind `order-*` utilities; reset with `md:order-none` so the
multi-column grid at md+ falls back to DOM order.

Add this block near the data array (replace `items` and `Item` with the
local names — e.g. `features` / `engagements`):

```ts
// Class strings must appear literally so the Tailwind JIT picks them up.
const MOBILE_ORDER_CLASS = ["order-1", "order-2", "order-3", "order-4", "order-5", "order-6"] as const;
const featuredIdx = items.findIndex((it) => it.featured);
const middleSlot = Math.ceil(items.length / 2);
const slotFor = (i: number) => {
  if (i === featuredIdx) return middleSlot;
  const rank = i < featuredIdx ? i + 1 : i;
  return rank < middleSlot ? rank : rank + 1;
};
```

If the list has more than 6 items, extend `MOBILE_ORDER_CLASS` with
`order-7`, `order-8`, … Each class must be present literally — never
build the name with a template string, the JIT will not see it.

Then in the `.map((item, i) => …)` apply the class to the grid child:

```tsx
className={`${MOBILE_ORDER_CLASS[slotFor(i) - 1]} md:order-none ${existingPlacement ?? ""} w-full max-w-md mx-auto md:max-w-none md:mx-0`}
```

Two requirements:
1. The map callback must expose the index (`(item, i) =>` not `(item) =>`).
2. The grid container must use `display: grid` or `display: flex` —
   `order` is ignored on block layouts.

## Step 3 — Verify

- Resize the browser to ~375px (iPhone SE) and confirm: header reads in
  one or two lines without orphan words, the featured card lands in the
  middle of the stack with the same number of cards above and below
  (±1 for odd counts).
- Resize to ≥768px and confirm the grid restores DOM order — featured
  card is back in the top-left slot.
- No console warnings about unknown utility classes (catches the JIT
  trap above).

## Step 4 — Commit per step

One commit for the header pass, one for the centering pass. Don't bundle
unrelated changes; the per-step rollback discipline matters more than
the line count.
