# Typography And Interface Language

This document defines how **goonjaa** uses type, spacing, hierarchy, and interface language for a handmade, high-end e-commerce experience.

## Typography Philosophy

goonjaa is wearable art. Type should feel like a studio note or gallery label: warm, precise, and unhurried.

## Typography Roles

### Display

- **Purpose:** Hero text, section titles, logo, and poetic emphasis.
- **Family:** Boska.
- **Behavior:** Use Boska only for brand/display roles. Keep full headings at normal display weight, reserve the airy weight for the hero's main line, use logo/category weight for compact display moments, and use the stronger accent weight only for short warm-color phrases.
- **Classes:** `type-display`, `type-h1`, `font-serif`, `display-airy`, `display-logo`, `display-accent`, `display-italic`.

### Body And Functional UI

- **Purpose:** Product descriptions, cart, checkout, forms, filters, prices, labels, and navigation.
- **Family:** Pilcrow Rounded.
- **Behavior:** Clear, warm, and readable. Use softer ink instead of pure black.
- **Classes:** `type-body`, `type-body-large`, `text-gray-600`.

### Accents / Overlines

- **Purpose:** Labels, taxonomy, small calls to action, and section kickers.
- **Behavior:** Uppercase with controlled tracking. Keep these labels brief.
- **Classes:** `type-overline`, `uppercase`, `tracking-[0.12em]`.

## Display Weight Roles

- **Airy display (`300`):** Hero main phrase where Boska needs height and delicacy without feeling brittle.
- **Normal display (`400`):** Page titles and section headings.
- **Logo/category (`500`):** Brand mark, category cards, and clay-paper placeholder captions.
- **Accent (`600`):** Short terracotta or antique-gold emphasis only.

Boska has local upright and italic variable files. Use `display-italic` only for the logo, hero accent phrase, and short poetic placeholders. Do not use italic for product names, forms, buttons, filters, cart, checkout body text, or full headings.

## Spacing And Rhythm

- Use generous whitespace, but avoid identical padding everywhere.
- Keep product grids open enough for the pieces to breathe.
- Use larger section spacing for story beats and tighter spacing inside forms and commerce controls.

## Image Treatment

- Real product and studio photography should eventually carry the brand.
- Until real images are ready, placeholder surfaces should look intentional: warm paper, clay color, thin borders, and quiet studio language.
- Avoid sterile white cutouts.

## Interface Elements

- **Borders:** Thin (`border`, `border-border-soft`, or `border-terracotta/20`).
- **Cards:** Use cards only for repeated products, forms, summaries, and framed tool-like surfaces.
- **Buttons:** Use terracotta or deep maroon for committed actions. Use outline buttons for secondary paths.
