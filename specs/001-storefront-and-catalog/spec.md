# Baseline Spec: 001 Storefront and Handcrafted Catalog

> **Feature ID:** `specs/001-storefront-and-catalog`  
> **Status:** Implemented (Baseline)  
> **Scope:** Core customer-facing shopping experience, storytelling, cart, and checkout flow.

---

## 1. Intent & Context

`goonjaa` is a direct-to-wearer storefront celebrating one-of-a-kind, handmade terracotta jewellery. The primary goal of the storefront is to convey the patience, musical rhythm, and tactile beauty of earthen clay while providing an effortless browsing, filtering, and ordering flow.

---

## 2. Core Functional Requirements

1. **Brand Hero & Storytelling:**
   * High-impact hero introducing `goonjaa` with earthen aesthetic and musical rhythm cues.
   * Story section explaining the craft steps: sculpting, sun-drying, kiln baking, and hand-painting.
2. **Catalog Browsing & Category Filtering:**
   * Filter jewellery pieces by categories (e.g., Necklaces, Earrings, Sets).
   * Search filter by piece name or tags.
   * Direct view of piece status: In Stock, Handcrafted to Order, or Archive.
3. **Product Detail View:**
   * Imagery highlighting natural terracotta textures and unrepeatable color patterns.
   * Details on dimensions, care instructions, and estimated handcrafting time.
4. **Cart Drawer & Checkout:**
   * Persistent slide-over cart drawer showing selected pieces, quantities, and subtotal.
   * Smooth checkout modal collecting shipping address, custom craft notes, and payment mode.
5. **Brand Integrity:**
   * All customer-facing references strictly use lowercase `goonjaa`.

---

## 3. Architecture & Components

* **Views:**
  * `src/views/CatalogView.tsx`
  * `src/views/ProductDetailView.tsx`
  * `src/views/StoryView.tsx`
  * `src/views/CareView.tsx`
* **Components:**
  * `src/components/catalog/` (ProductCard, CategoryFilter, ProductGrid)
  * `src/components/cart/` (CartDrawer, CartItem)
  * `src/components/checkout/` (CheckoutModal)
  * `src/components/layout/` (Header, Footer, Navigation)

---

## 4. Verification

* `npm run build` generates static chunks without TypeScript warnings.
* All routes load and hydrate properly.
