# Supabase Backend Setup

This project is currently a Vite React storefront with mock catalog data. The Supabase backend is introduced incrementally so the public pages keep working while catalog, order, admin, and image workflows move to the database.

## What Was Found

- Routes: home, shop, category, product detail, cart, checkout, bulk orders, contact, policy pages, testimonials, and about.
- No admin dashboard, Supabase client, Razorpay code, API routes, or existing migrations were present.
- Products are currently sourced from `src/lib/data/mockProducts.ts`.
- Product fields already implied by the UI: slug, SKU/public id, fixed INR price, compare-at price, category, subcategory, collections, descriptions, images, materials, dimensions, weight, care instructions, stock status, stock quantity, badges, tags, occasions, colour families, and colour options.
- Checkout currently collects full name, phone, email, street address, city, state, and PIN code, then simulates success.
- WhatsApp enquiry links include product, selected colour, and quantity but do not persist anything or reduce stock.
- Bulk order form collects customer contact, catalogue piece, colour, quantity range, required delivery date, and notes.

## Backend Shape

The migration in `supabase/migrations/20260524152658_monleaf_backend_schema.sql` creates:

- Admin auth support: `profiles` linked to `auth.users`, with `owner`, `admin`, and `staff` roles.
- Catalog: `categories`, `collections`, `products`, `product_collections`, `product_images`, and `product_colour_options`.
- Commerce: guest `customers`, `orders`, `order_items`, `payments`, and `fulfilment_details`.
- Operations: `inventory_movements`, `enquiries`, `store_settings`, and `audit_logs`.
- Storage: public-read `product-images` bucket with admin/staff-only upload, update, and delete policies.

Money is stored as INR paise integers, for example `185000` for ₹1,850. Product image database rows store Storage paths such as `products/{product_id}/{timestamp}-{safe_filename}`; public URLs should be derived through Supabase Storage.

## Environment Variables

Vercel and Supabase Auth URL setup is documented in [DEPLOYMENT.md](DEPLOYMENT.md).

Frontend-safe:

```bash
VITE_SUPABASE_URL="https://your-project-ref.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-supabase-publishable-or-anon-key"
```

Server-only:

```bash
SUPABASE_SECRET_KEY="sb_secret_your-server-only-secret-key"
RAZORPAY_KEY_ID="rzp_test_or_live_key_id"
RAZORPAY_KEY_SECRET="your-server-only-razorpay-secret"
RAZORPAY_WEBHOOK_SECRET="your-server-only-razorpay-webhook-secret"
APP_URL="https://your-site.example"
```

Never put `SUPABASE_SECRET_KEY`, Razorpay secrets, or webhook secrets in `VITE_` variables. Older Supabase projects may still expose a legacy JWT-based `SUPABASE_SERVICE_ROLE_KEY`; use it only as a server-only fallback if `SUPABASE_SECRET_KEY` is not available.

## Apply The Migration

1. Create or choose a Supabase project.
2. Copy `.env.example` to `.env.local` and fill in public Supabase values.
3. Link the project if using the CLI:

```bash
npx supabase link --project-ref your-project-ref
```

4. Push migrations:

```bash
npx supabase db push
```

5. In Supabase Dashboard, confirm:

- All public tables have RLS enabled.
- The `product-images` bucket exists and is public.
- Storage policies exist on `storage.objects` for product image reads and admin/staff writes.

If bucket creation fails in a hosted/dashboard context, create it manually:

- Bucket name: `product-images`
- Public bucket: yes
- File size limit: 5 MB
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`, `image/avif`

Then apply or re-run the storage policies from the migration.

## First Admin User

The admin shell is not owner-only. It is available to authenticated users whose `public.profiles` row is active and whose role is `owner`, `admin`, or `staff`. Users sign in at `/admin/login` with Supabase Auth email/password, then RLS policies authorize the actual catalog, storage, settings, and order operations.

Use this bootstrap only for the first owner, before any other trusted admin can manage profile roles:

1. Create the first owner user in Supabase Auth with email/password.
2. Copy that auth user id.
3. Run this SQL in the Supabase SQL editor:

```sql
insert into public.profiles (id, full_name, role, is_active)
values ('AUTH_USER_ID_HERE', 'Store Owner', 'owner', true)
on conflict (id) do update
set role = 'owner',
    is_active = true,
    updated_at = now();
```

Public users cannot self-assign roles. Only an existing owner/admin can manage profile roles after bootstrap. Recommended role intent:

- `owner`: full dashboard and role-management access.
- `admin`: catalog, orders, fulfilment, and settings access.
- `staff`: day-to-day catalog/order operations; tighten future owner-only settings in both UI and RLS if staff should not manage them.

## Frontend Integration Notes

- `src/lib/supabaseClient.ts` exports a typed browser client using only public Supabase variables.
- `src/types/database.ts` is a manual type map for the initial schema. Replace it later with generated Supabase types if desired.
- Public catalog pages load active products from Supabase and fall back to `src/lib/data/mockProducts.ts` when Supabase is unavailable or the products table is empty.
- Seed the current mock catalog with `npm run seed:catalog`. This requires `SUPABASE_SECRET_KEY` in your local environment because product writes are admin-only.
- Guest checkout should be implemented through a server-side endpoint/action that uses the server-only Supabase secret key, recalculates product totals from Supabase product rows, then creates `customers`, `orders`, `order_items`, `payments`, and fulfilment rows.
- Razorpay orders must be created server-side from recalculated totals. Do not trust frontend-submitted amounts.
- WhatsApp and bulk enquiries may be inserted directly by the public client into `enquiries`; these do not reduce stock.

## Stock Movement Behavior

`products.stock_quantity` is kept for fast catalog/admin display. Any direct update to that column creates an `inventory_movements` row through the `products_record_stock_adjustment` trigger, with `movement_type = adjustment`, before/after quantities, signed quantity delta, and the current authenticated admin actor when available.

Current behavior:

- Admin product edits that change stock create inventory movement history automatically.
- WhatsApp enquiries and bulk enquiries never reserve or reduce stock.
- Guest checkout is still simulated in the frontend and does not write orders or stock movements yet.
- Future server-side checkout/order APIs should create explicit `reserve`, `sale`, or `release` movements while recalculating totals from Supabase product rows.

## Admin Dashboard

The Catalog MVP admin dashboard is available at:

```text
/admin/login
/admin/products
/admin/products/new
/admin/products/:product_id
/admin/settings
```

Admin CRUD uses the browser Supabase client with the publishable key and the signed-in user's session. Product writes, image uploads, and settings edits are authorized by RLS through the `profiles` role, not by a frontend secret key.

Current admin scope:

- Sign in/out with Supabase email and password.
- Guard admin routes for active `owner`, `admin`, or `staff` profiles.
- List, search, hide/show, create, and edit products.
- Upload product images to `product-images`.
- Replace product colour options and collection links when saving.
- Edit public contact and checkout settings.

## Seed Current Products

Add the Supabase secret key locally only when you need to run the seed script:

```bash
SUPABASE_SECRET_KEY="sb_secret_your-server-only-secret-key"
```

If your project still uses legacy JWT keys, the seed script also accepts `SUPABASE_SERVICE_ROLE_KEY` as a fallback.

Then run:

```bash
npm run seed:catalog
```

The seed script maps `mockProducts` into `products`, `product_colour_options`, `product_images`, and `product_collections`. Existing product rows are matched by SKU. Because the current repo does not contain real product image files, external placeholder URLs are preserved as `product_images.public_url`; future admin uploads should store real files in the `product-images` bucket and use `storage_path`.

## RLS Summary

- Public can read active categories, collections, products, product images, colour options, and public store settings.
- Public can insert enquiries.
- Public cannot read customer/order/payment/fulfilment/inventory/audit/profile data.
- Authenticated active owner/admin/staff users can manage catalog, images, inventory, orders, fulfilment, enquiries, and settings.
- Owner/admin users can manage profile roles.
- Public product access uses column grants so admin-only fields such as raw stock quantity, low-stock threshold, and active flag are not granted to `anon`.

## Testing Checklist

- Public visitor can view active products.
- Public visitor cannot view inactive products.
- Public visitor cannot access admin dashboard.
- Admin can log in.
- Admin can create product.
- Admin can upload product image.
- Admin can edit product.
- Admin can update stock.
- Product image appears on public product page.
- Admin can hide product.
- Hidden product disappears from public site.
- Guest customer can place order without account through server-side checkout.
- COD order creates `payment_status = cod_pending`.
- Prepaid order can be created as pending payment.
- Advance booking can store `payment_status = partial`, `amount_paid_inr_paise`, and `amount_due_inr_paise`.
- WhatsApp enquiry does not reduce stock.
- RLS prevents unauthorized product edits.
- Supabase secret key is not exposed to frontend.
