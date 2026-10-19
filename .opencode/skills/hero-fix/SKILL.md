---
name: hero-fix
description: Revise and tidy a hero section for alignment, hierarchy, spacing rhythm, mobile fluidity and performance. Use when a hero looks disorganized, cramped, loose or misaligned.
---

# Hero Section — layout, alignment & rhythm

Focus only on **layout, alignment and visual rhythm**. Do not change navigation
structure or copy unless explicitly asked.

## 1. Determine the layout pattern first
- Product visual (screenshot/demo) present → **split layout** (text left, visual right).
- Purely textual value proposition → **centered layout**.
- Immersive background media (video/ambient) → **single text column over scrim**,
  aligned to the same container/grid as the rest of the page.
- No carousel. One static message.

## 2. Reorganize hierarchy
- H1 at ~2–3× body size; subheadline uses regular weight (never bold).
- H1 ≤ 10 words; subheadline ≤ 20 words.
- Single primary CTA; secondary CTA uses outline or ghost.

## 3. Alignment & grid
- Unified, centered container (project token: `max-w-content`).
- Split: `grid-template-columns: 1fr 1fr`, `gap: 64px`, `align-items: center`.
- Centered: single column, `text-align: center`, `justify-items: center`.
- Hero vertical padding: 80–120px desktop, ~56px mobile. No transform hacks.

## 4. Spacing & rhythm
- Use the spacing scale (multiples of 4/8). No arbitrary values.
- H1 → subheadline: 16–24px. Subheadline → CTA: 24–32px.
- Whitespace creates hierarchy: the more important the element, the more room around it.

## 5. Mobile fluidity
- Test at 375px; primary CTA visible without scroll.
- Reserve space to avoid CLS; eager-load the hero media (`loading="eager"`,
  `fetchpriority="high"` for images).

## 6. Deliver
- Before/after diagnosis (misaligned / cramped / loose).
- Corrected code.
- Checklist: alignment, hierarchy, spacing, mobile, performance.
