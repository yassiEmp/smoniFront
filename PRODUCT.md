# Product

## Register

brand

## Users

Young learners in Vincennes and the eastern Paris suburbs (18-25y, mobile-first), comparing local auto-écoles online before booking. They arrive skeptical: every auto-école site looks the same, and they've heard horror stories about pricing surprises, instructor no-shows, and slow code/conduite booking. They decide in under a minute whether to trust the site enough to scroll or to click away to Stych, Ornikar, En Voiture Simone. Secondary audience: parents who pay, who scan for credibility (location, certifications, real pricing).

## Product Purpose

Smoni is a neighborhood auto-école in Vincennes (62 rue de la Jarry, 94300, since 2022) that runs its own booking, code, and progress tooling end-to-end. The marketing site has one job: convince a learner the school is real, modern, transparently priced, and worth the trip from the RER A. Success = first contact form filled or "réserver un essai" click, not vanity scroll.

The site also serves as the front door to three logged-in apps (apprenants / moniteurs / admin) that handle the actual driving-school operations. The brand has to read as the same company on both sides of the auth wall.

## Brand Personality

Three words: **modern, reassuring, fast**.

- **Modern** in the visual sense — confident typography, generous whitespace, real photography, considered motion. Not "tech-startup modern" with gradient meshes and 3D blobs; modern like a well-designed independent shop.
- **Reassuring** in the copy and the proof. Real address, real schedule, real prices, real cars (the hero is a Peugeot 2008 used in lessons, not a stock render). Tone is calm and direct; no scare tactics, no urgency manipulation.
- **Fast** in two senses — fast to scan (clear hierarchy, no walls of text) and fast to act (CTAs are visible everywhere, the path from landing to contact is one click).

Voice is French throughout, conversational but not slangy ("Le permis sans stress", "Ce qu'on mesure", "Recalés / deuxième chance"). The brand can be playful in small moments (italic display accents, the "recalés" bento) without losing credibility.

## Anti-references

Two explicit anti-references from the user:

1. **Generic French auto-école sites.** Stock car photos on a red/blue/white tricolore-coded background. Cluttered header with five menu items and a phone number. Dated typography (Arial, Open Sans, all the same weight). Carousel of "nos formations" cards that all look identical. The category default. Avoid completely.
2. **Corporate / insurance vibe.** Cold navy + light blue palette. Stock photos of smiling diverse people in suits. "Trust by numbers" blocks (98% reussite! 4.9 étoiles! 1234 élèves!) stacked in identical cards. This is what every fintech and assurance site looks like; the user explicitly does not want it.

Also avoid by extension:
- **Aggressive SaaS marketing clichés** — gradient mesh hero + 3-card features grid + testimonial carousel + pricing table + FAQ accordion. The template is dead.
- **The hero-metric template** — big number, small label, repeat. Avoid even when the metrics are real (use them inline, in context, not stacked).
- **Gradient text on headings** — the current hero uses `bg-clip-text` on "sans stress." That's banned by impeccable's shared laws; favor single-color emphasis via weight/italic instead. (Surface this when working on the hero.)

## Design Principles

1. **Show the school, not the category.** Every concrete proof — the real address, the real car, the real instructors, the real schedule — beats any abstract "qualité / sérénité / confiance" badge. When in doubt, replace an adjective with a fact.
2. **Earn the scroll in 5 seconds.** The first viewport must answer: what is this? where? for whom? what's the next step? If a section doesn't move the visitor closer to "réserver", question it.
3. **Mobile is the primary surface.** Learners are on phones. Hero, CTAs, navigation, and pricing must work touch-first; desktop is the secondary layout, not the primary one.
4. **Restrained color, committed type.** One brand purple (#2c2876 / #342563) carries the identity; everything else is tinted neutral. Personality comes from typographic decisions (Outfit black weights, occasional italics, scale contrast), not from rainbow palettes.
5. **No category reflexes.** When the answer to a design question is "what every other auto-école does", that's the wrong answer. Anti-references win over convention.

## Accessibility & Inclusion

- Target WCAG AA on the marketing site (contrast 4.5:1 for body, 3:1 for large text). Brand purple on white passes; brand purple on the slate-50 surface passes; verify any tinted backgrounds.
- French is the primary language; do not auto-translate UI to English. Diacritics must render correctly (é, è, à, ç).
- Honor `prefers-reduced-motion` for framer-motion sections — the cascade fade-ins on Home should drop to opacity-only or no-op under reduced motion.
- Touch targets 44x44px minimum on mobile; the bottom CTA cluster on Home and the sticky header must comply.
- Real photography of instructors/learners must be inclusive (gender, age, background) without being performative; the current avatar set is a starting point, not the final.
