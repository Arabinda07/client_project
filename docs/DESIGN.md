# DESIGN.md

## Overview

**goonjaa** uses a warm handmade-luxury design language. The site should feel like a quiet terracotta studio: earth, soft sunlight, hand-painted detail, and enough restraint for the jewellery to feel precious.

## Core Visual Traits

- **Warmth:** Clay, paper, and soft sunlit surfaces.
- **Texture:** Gentle handmade surfaces, never glossy showroom polish.
- **Elegance:** Display type should make the craft feel like wearable art.
- **Artisanal:** Placeholder surfaces should read as intentional studio notes until real photography is available.

## Colors

The palette is rooted in fired clay and traditional Indian artistry.

- **Warm Ivory (`#FDFBF5` / `bg-warm-ivory`):** Primary background. Soft paper, not pure white.
- **Studio Wash (`#F7F0E7` / `bg-studio-wash`):** Secondary background for quieter bands and placeholders.
- **Surface (`#FBF7EF` / `bg-surface`):** Product and form surfaces.
- **Terracotta (`#B35C38` / `text-terracotta`):** Main accent. Use for action, warmth, and craft emphasis.
- **Deep Maroon (`#7D2E24` / `text-deep-maroon`):** Small high-contrast text, badges, and rich anchors.
- **Antique Gold (`#B8892E` / `text-antique-gold`):** Sparse highlight for elevated details.
- **Ink (`#1D1815` / `text-gray-900`):** Primary text. Avoid pure black.

## Typography

The current pairing is **Boska + Pilcrow Rounded**. It should feel like handmade jewellery with a fashion-label edge: expressive enough for a boutique, but still warm and clay-led rather than cold showroom luxury.

- **Display:** Boska for logo, hero lines, section titles, poetic placeholders, and category moments. Use the local variable files with role-based weights: airy display for the hero, normal weight for full headings, logo/category weight for compact display text, and a stronger accent weight for short terracotta or antique-gold phrases.
- **Body and UI:** Pilcrow Rounded for body copy, navigation, filters, prices, forms, cart, and checkout.
- **Accents:** Uppercase labels with moderate tracking. Keep them short; don't turn body copy into all-caps. Boska has a real italic file, so use italic only for short brand moments such as the logo, hero accent, and poetic placeholders. Never use it for full headings or functional commerce text.

## Layout & Shapes

- **Photography:** Real product and studio photography is the highest-impact future upgrade. Until then, placeholders should feel like calm clay-paper compositions, not generic image boxes.
- **Borders:** Thin `1px` borders. Use structure without weight.
- **Spacing:** Generous, but varied. Let sections breathe, and keep related controls close together.
- **Corners:** Keep corners restrained (`rounded-[2px]`) unless a component has a clear reason to be round.

## Components

- **Buttons:** Terracotta or deep maroon fills for primary actions; thin outlines for secondary actions. Keep touch targets comfortable.
- **Product Cards:** Product image first. Names may wrap to two lines. Badges should be compact and readable.
- **Forms:** Quiet surfaces, clear labels, and strong focus states.

## Atmosphere

The site should feel like walking into a sunlit home studio where clay is drying on a table and color is mixed by hand.
