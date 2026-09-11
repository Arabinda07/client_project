# goonjaa Project Constitution

> **Status:** ACTIVE  
> **Authority:** Supreme governing specification for `goonjaa` development.  
> **Target Audience:** Human contributors and AI Coding Agents.

---

## 1. Core Identity & Brand Invariants

1. **Brand Name:** Strictly lowercase `goonjaa` in all UI text, headings, buttons, notifications, and code strings, unless an external API specifically requires title casing.
2. **Artisan Truth:** `goonjaa` is a handcrafted terracotta jewellery storefront shaped and painted by a solo woman artisan. Every piece starts with earthen clay, sculpted, dried, baked, and painted by hand.
3. **No Molds, No Mass Production:** There are no molds; pieces are naturally unrepeatable. The site must celebrate handmade variation rather than hiding it.
4. **Tone & Register:** Brand-led commerce. Warm, grounded, artistic, and patient. Avoid factory language, generic luxury clichés, artificial scarcity, or aggressive sales hype. The founder's classical music background anchors the studio's rhythm.
5. **Imagery:** Authentic studio and piece photography is the primary medium. Avoid generic stock photos or ungrounded generative imagery that misrepresents the earthen craft.

---

## 2. Technical Stack & Architecture

* **Framework:** React 19 (`react`, `react-dom`) with Vite.
* **Language:** TypeScript in strict mode (`tsconfig.json`). No untyped `any` without documented architectural exceptions.
* **Styling:** Vanilla CSS & Tailwind CSS (`index.html`, `src/index.css`) adhering to warm earthen palette tokens (terracotta, clay, sand, deep charcoal).
* **State Management:** React hooks and contextual state (`src/context/`), keeping state local and deterministic.
* **Icons:** Lucide React (`lucide-react`).
* **Backend & Database:** Supabase (PostgreSQL, Row Level Security, Auth, Storage).
* **SEO & Static Generation:** Vite + custom static prerendering (`scripts/generate-static-seo.ts`) producing crawlable HTML for root, product, and story routes.

---

## 3. Database & Security Governance (Supabase)

1. **Row Level Security (RLS) is Mandatory:**
   * Every database table (`products`, `categories`, `orders`, `profiles`, `audit_logs`) MUST have RLS enabled.
   * Catalog read access (`products`, `categories`) is public ONLY when `is_active = true` and `VITE_SUPABASE_CATALOG_ENABLED=true`.
   * Mutations (INSERT, UPDATE, DELETE) on the catalog require authenticated admin privileges (`is_admin()`).
   * Orders and customer data are strictly private: buyers can only access their own submissions; admin can view all.
2. **Zero Hardcoded Secrets:**
   * Never commit Supabase service role keys or admin tokens.
   * Public client configuration uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. **Storage Security:**
   * Product media bucket (`product-images`) allows public read for assets, but writes are restricted to authenticated admin sessions.

---

## 4. UI/UX & Routing Invariants

1. **Route Preservation:** Existing routes (`/`, `/catalog`, `/story`, `/care`, `/contact`, `/bulk-orders`, `/admin`) must be preserved. Any routing changes require a dedicated feature spec and migration plan.
2. **Checkout & Cart Integrity:**
   * Cart state must be robust, persisting user selections without unexpected drops.
   * Clear, transparent communication regarding dispatch times (since handcrafted pieces take patience to sculpt and bake).
3. **Accessibility & Semantics:**
   * Use semantic HTML elements (`<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`).
   * Provide descriptive `alt` tags emphasizing piece details and colors.
   * Ensure accessible contrast on earthen backgrounds.

---

## 5. Spec-Driven Development (SDD) Workflow

All non-trivial changes to `goonjaa` must follow the Spec-Kit phased lifecycle:

1. **Specify (`specs/<feature-id>/spec.md`):** Define user intent, functional requirements, and constraints before writing code.
2. **Plan (`specs/<feature-id>/plan.md`):** Formulate technical design, component impacts, and data schema updates.
3. **Tasks (`specs/<feature-id>/tasks.md`):** Enumerate atomic, sequential, testable task items.
4. **Implement:** Execute strictly against the approved tasks.
5. **Converge:** Verify code against the spec, constitutional rules, and run `npm run build` to confirm zero regressions.

---

## 6. Open Knowledge Format (OKF) Context Management

1. **Single Source of Truth for Domain Knowledge:** All domain concepts, brand philosophy, design tokens, voice rules, and database schemas are maintained in `docs/` as an official **OKF v0.2 Knowledge Bundle**.
2. **Progressive Disclosure:** Contributors and AI coding agents MUST consult [`docs/index.md`](file:///e:/client_project/docs/index.md) to discover and load relevant domain context rather than guessing or bloating prompt context.
3. **Knowledge Integrity:** All documents in `docs/` must maintain valid OKF frontmatter (`type`, `title`, `description`, `lifecycle`, `verified`) and pass automated verification via `npm run validate:docs`.
