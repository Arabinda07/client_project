# Baseline Spec: 002 Supabase Backend Integration

> **Feature ID:** `specs/002-supabase-backend-integration`  
> **Status:** Implemented (Baseline)  
> **Scope:** Cloud database, Row Level Security, catalog sync, storage, and admin management.

---

## 1. Intent & Context

Enable dynamic catalog updates, inventory controls, order capture, and artisan administration using Supabase while preserving the speed and reliability of local fallback data when offline or in staging.

---

## 2. Core Functional Requirements

1. **Dual-Mode Catalog Support:**
   * Controlled by `VITE_SUPABASE_CATALOG_ENABLED`.
   * When `"true"`: Fetches real-time products and categories from Supabase.
   * When `"false"`: Gracefully falls back to local static catalog data (`src/data/products.ts`).
2. **Row Level Security (RLS) Policy Invariants:**
   * `products`: Public can SELECT where `is_active = true`. Full access for authenticated admins.
   * `categories`: Public can SELECT. Full access for authenticated admins.
   * `orders`: Authenticated buyers can view their own orders; admins can view all. Public can insert checkout orders.
3. **Storage Bucket (`product-images`):**
   * Public read for displaying jewellery images.
   * Authenticated admin upload/delete permissions.
4. **Data Synchronization & Seeding:**
   * Command-line script `scripts/seed-supabase-catalog.ts` for catalog seeding.
   * Static SEO prerender script `scripts/generate-static-seo.ts` generates metadata from catalog.

---

## 3. Related Documentation

* Detailed schema definitions, migration SQL, and setup guidelines are located in [docs/SUPABASE_BACKEND.md](../../docs/SUPABASE_BACKEND.md).
* Deployment environment variable notes are in [docs/DEPLOYMENT.md](../../docs/DEPLOYMENT.md).
