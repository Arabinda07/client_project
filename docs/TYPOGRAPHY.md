# Typography and Interface Language

This document defines how Mitty & Co should use type, spacing, hierarchy, and interface language to support an artistic, high-end e-commerce experience.

## Typography Philosophy

Mitty & Co is wearable art. The typography should reflect an art gallery or an editorial magazine—bridging traditional elegance with modern minimalism.

## Typography Roles

### Display (Headings)
- **Purpose:** Editorial emphasis, section titles, hero text.
- **Behavior:** Use an elegant serif. Mix standard weights with italics to create a poetic rhythm (e.g., "Sculpted by *hand*").
- **Classes:** `font-serif`, `italic`, `tracking-tight`.

### Accents / Overlines
- **Purpose:** Labels, taxonomy, very small calls to action, section kickers.
- **Behavior:** Highly structured, uppercase, very wide tracking. Provides a "modern" anchor to the traditional serif headings.
- **Classes:** `uppercase text-[10px] tracking-widest` or `tracking-[0.2em] font-bold`.

### Body
- **Purpose:** Descriptions, brand story, product details.
- **Behavior:** legible sans-serif, high line-height, softer gray instead of pure black for reduced contrast strain.
- **Classes:** `text-gray-600 leading-relaxed`.

## Spacing and Rhythm

- Use generous whitespace. The UI should not feel cramped.
- Product grids should have ample gaps (`gap-8` or `gap-12`).
- Sections should be separated by large vertical padding (`py-24`).

## Image Treatment

- **Integration:** Avoid sterile white square cutouts. Images should have textured backgrounds or editorial settings.
- **Effects:** Use `mix-blend-multiply` on a `bg-warm-ivory` container to make images look like they are printed directly onto the page.

## Interface Elements

- **Borders:** Thin (`border`, `border-gray-200` or `border-terracotta/20`).
- **Cards:** Avoid heavy drop shadows. Rely on spacing and borders. If shadows are needed, use very soft, large-spread shadows (`shadow-xl` with low opacity).
