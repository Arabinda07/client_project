-- Monleaf catalog + light commerce backend.
-- Customers remain guest records in v1. Admin/staff use Supabase Auth.

create extension if not exists pgcrypto;

create schema if not exists app_private;
revoke all on schema app_private from public;

do $$
begin
  create type public.profile_role as enum ('owner', 'admin', 'staff');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.stock_status as enum ('in_stock', 'out_of_stock', 'made_to_order');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.order_status as enum ('draft', 'placed', 'confirmed', 'cancelled', 'completed');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.payment_method as enum ('prepaid', 'cod', 'advance_booking', 'pickup_payment', 'manual');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.payment_status as enum ('pending', 'paid', 'partial', 'failed', 'cod_pending', 'refunded');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.fulfilment_method as enum ('shipping', 'pickup');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.fulfilment_status as enum ('unfulfilled', 'processing', 'packed', 'shipped', 'delivered', 'pickup_ready', 'picked_up', 'returned');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.inventory_movement_type as enum ('restock', 'sale', 'reserve', 'release', 'adjustment', 'return');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.payment_provider as enum ('razorpay', 'cod', 'manual');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.enquiry_type as enum ('contact', 'product_whatsapp', 'bulk_order');
exception when duplicate_object then null;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.profile_role not null default 'staff',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_full_name_length check (full_name is null or length(full_name) <= 160)
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_storage_path text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint categories_name_length check (length(name) between 1 and 120),
  constraint categories_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_storage_path text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint collections_name_length check (length(name) between 1 and 120),
  constraint collections_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  sku text not null unique,
  slug text not null unique,
  name text not null,
  short_description text not null,
  long_description text,
  price_inr_paise integer not null,
  compare_at_price_inr_paise integer,
  category_id uuid references public.categories(id) on delete set null,
  subcategory text,
  materials text[] not null default '{}',
  dimensions text,
  weight text,
  care_instructions text,
  stock_status public.stock_status not null default 'in_stock',
  stock_quantity integer not null default 0,
  low_stock_threshold integer not null default 2,
  is_active boolean not null default true,
  is_new boolean not null default false,
  is_bestseller boolean not null default false,
  is_sale boolean not null default false,
  is_featured boolean not null default false,
  tags text[] not null default '{}',
  occasion text[] not null default '{}',
  color_family text[] not null default '{}',
  allow_prepaid boolean not null default true,
  allow_cod boolean not null default true,
  allow_advance_booking boolean not null default false,
  allow_pickup boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_sku_length check (length(sku) between 1 and 80),
  constraint products_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint products_price_positive check (price_inr_paise >= 0),
  constraint products_compare_price_positive check (compare_at_price_inr_paise is null or compare_at_price_inr_paise >= 0),
  constraint products_stock_non_negative check (stock_quantity >= 0),
  constraint products_low_stock_non_negative check (low_stock_threshold >= 0)
);

create table public.product_collections (
  product_id uuid not null references public.products(id) on delete cascade,
  collection_id uuid not null references public.collections(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (product_id, collection_id)
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null,
  public_url text,
  alt_text text,
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint product_images_storage_path_format check (storage_path ~ '^products/[0-9a-f-]+/.+')
);

create unique index product_images_one_primary_per_product
  on public.product_images(product_id)
  where is_primary;

create table public.product_colour_options (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  slug text not null,
  name text not null,
  swatch text,
  is_available boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, slug),
  constraint product_colour_options_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  phone text not null,
  whatsapp_phone text,
  email text,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  pincode text,
  country text not null default 'India',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint customers_full_name_length check (length(full_name) between 1 and 160)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_id uuid references public.customers(id) on delete set null,
  order_status public.order_status not null default 'placed',
  payment_method public.payment_method not null,
  payment_status public.payment_status not null default 'pending',
  fulfilment_method public.fulfilment_method not null default 'shipping',
  fulfilment_status public.fulfilment_status not null default 'unfulfilled',
  subtotal_inr_paise integer not null default 0,
  shipping_fee_inr_paise integer not null default 0,
  discount_amount_inr_paise integer not null default 0,
  total_amount_inr_paise integer not null default 0,
  amount_paid_inr_paise integer not null default 0,
  amount_due_inr_paise integer not null default 0,
  customer_notes text,
  admin_notes text,
  placed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint orders_amounts_non_negative check (
    subtotal_inr_paise >= 0
    and shipping_fee_inr_paise >= 0
    and discount_amount_inr_paise >= 0
    and total_amount_inr_paise >= 0
    and amount_paid_inr_paise >= 0
    and amount_due_inr_paise >= 0
  )
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_sku text,
  product_slug text,
  product_name text not null,
  selected_colour_id uuid references public.product_colour_options(id) on delete set null,
  selected_colour_name text,
  selected_colour_swatch text,
  quantity integer not null,
  unit_price_inr_paise integer not null,
  line_total_inr_paise integer not null,
  created_at timestamptz not null default now(),
  constraint order_items_quantity_positive check (quantity > 0),
  constraint order_items_amounts_non_negative check (unit_price_inr_paise >= 0 and line_total_inr_paise >= 0)
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider public.payment_provider not null default 'razorpay',
  payment_method public.payment_method not null,
  amount_inr_paise integer not null,
  status public.payment_status not null default 'pending',
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_signature_verified boolean not null default false,
  provider_reference text,
  raw_event jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint payments_amount_non_negative check (amount_inr_paise >= 0)
);

create table public.fulfilment_details (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  fulfilment_method public.fulfilment_method not null,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  pincode text,
  country text not null default 'India',
  courier_name text,
  tracking_number text,
  tracking_url text,
  shipped_at timestamptz,
  delivered_at timestamptz,
  pickup_location text,
  preferred_pickup_at timestamptz,
  pickup_ready_at timestamptz,
  picked_up_at timestamptz,
  pickup_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  order_item_id uuid references public.order_items(id) on delete set null,
  movement_type public.inventory_movement_type not null,
  quantity_delta integer not null,
  stock_before integer,
  stock_after integer,
  actor_id uuid references auth.users(id) on delete set null,
  notes text,
  created_at timestamptz not null default now()
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  enquiry_type public.enquiry_type not null,
  source text not null default 'website',
  status text not null default 'new',
  full_name text,
  email text,
  phone text,
  whatsapp_phone text,
  product_id uuid references public.products(id) on delete set null,
  product_slug text,
  product_name text,
  colour_id uuid references public.product_colour_options(id) on delete set null,
  colour_name text,
  quantity integer,
  quantity_range text,
  required_delivery_date date,
  message text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint enquiries_quantity_positive check (quantity is null or quantity > 0)
);

create table public.store_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null,
  is_public boolean not null default false,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint store_settings_key_format check (key ~ '^[a-z0-9_]+$')
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  table_name text not null,
  record_id uuid,
  old_record jsonb,
  new_record jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index categories_active_sort_idx on public.categories (is_active, sort_order, name);
create index collections_active_sort_idx on public.collections (is_active, sort_order, name);
create index products_active_category_sort_idx on public.products (is_active, category_id, sort_order, created_at desc);
create index products_slug_idx on public.products (slug);
create index products_stock_status_idx on public.products (stock_status);
create index product_images_product_sort_idx on public.product_images (product_id, sort_order);
create index product_colour_options_product_sort_idx on public.product_colour_options (product_id, sort_order);
create index customers_phone_idx on public.customers (phone);
create index customers_email_idx on public.customers (email);
create index orders_customer_created_idx on public.orders (customer_id, created_at desc);
create index orders_status_created_idx on public.orders (order_status, created_at desc);
create index order_items_order_idx on public.order_items (order_id);
create index payments_order_idx on public.payments (order_id);
create index fulfilment_details_method_idx on public.fulfilment_details (fulfilment_method);
create index inventory_movements_product_created_idx on public.inventory_movements (product_id, created_at desc);
create index enquiries_type_created_idx on public.enquiries (enquiry_type, created_at desc);
create index audit_logs_actor_created_idx on public.audit_logs (actor_id, created_at desc);

create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger categories_set_updated_at before update on public.categories
  for each row execute function public.set_updated_at();
create trigger collections_set_updated_at before update on public.collections
  for each row execute function public.set_updated_at();
create trigger products_set_updated_at before update on public.products
  for each row execute function public.set_updated_at();
create trigger product_images_set_updated_at before update on public.product_images
  for each row execute function public.set_updated_at();
create trigger product_colour_options_set_updated_at before update on public.product_colour_options
  for each row execute function public.set_updated_at();
create trigger customers_set_updated_at before update on public.customers
  for each row execute function public.set_updated_at();
create trigger orders_set_updated_at before update on public.orders
  for each row execute function public.set_updated_at();
create trigger payments_set_updated_at before update on public.payments
  for each row execute function public.set_updated_at();
create trigger fulfilment_details_set_updated_at before update on public.fulfilment_details
  for each row execute function public.set_updated_at();
create trigger enquiries_set_updated_at before update on public.enquiries
  for each row execute function public.set_updated_at();
create trigger store_settings_set_updated_at before update on public.store_settings
  for each row execute function public.set_updated_at();

create or replace function app_private.has_role(required_roles public.profile_role[])
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and is_active = true
      and role = any(required_roles)
  );
$$;

create or replace function app_private.is_admin_or_staff()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select app_private.has_role(array['owner', 'admin', 'staff']::public.profile_role[]);
$$;

create or replace function public.generate_order_number()
returns text
language plpgsql
as $$
declare
  candidate text;
begin
  loop
    candidate := 'MON-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(encode(gen_random_bytes(4), 'hex'), 1, 8));
    exit when not exists (select 1 from public.orders where order_number = candidate);
  end loop;

  return candidate;
end;
$$;

create or replace function public.set_order_number()
returns trigger
language plpgsql
as $$
begin
  if new.order_number is null or length(trim(new.order_number)) = 0 then
    new.order_number := public.generate_order_number();
  end if;

  return new;
end;
$$;

create trigger orders_set_order_number before insert on public.orders
  for each row execute function public.set_order_number();

create or replace function public.record_stock_adjustment()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'UPDATE' and old.stock_quantity is distinct from new.stock_quantity then
    insert into public.inventory_movements (
      product_id,
      movement_type,
      quantity_delta,
      stock_before,
      stock_after,
      actor_id,
      notes
    ) values (
      new.id,
      'adjustment',
      new.stock_quantity - old.stock_quantity,
      old.stock_quantity,
      new.stock_quantity,
      auth.uid(),
      'Automatic movement from product stock_quantity update'
    );
  end if;

  return new;
end;
$$;

create trigger products_record_stock_adjustment after update of stock_quantity on public.products
  for each row execute function public.record_stock_adjustment();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.collections enable row level security;
alter table public.products enable row level security;
alter table public.product_collections enable row level security;
alter table public.product_images enable row level security;
alter table public.product_colour_options enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.fulfilment_details enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.enquiries enable row level security;
alter table public.store_settings enable row level security;
alter table public.audit_logs enable row level security;

create policy "Profiles are visible to self and admins"
  on public.profiles for select
  to authenticated
  using (id = auth.uid() or app_private.has_role(array['owner', 'admin']::public.profile_role[]));

create policy "Owners and admins manage profiles"
  on public.profiles for all
  to authenticated
  using (app_private.has_role(array['owner', 'admin']::public.profile_role[]))
  with check (app_private.has_role(array['owner', 'admin']::public.profile_role[]));

create policy "Public can read active categories"
  on public.categories for select
  to anon, authenticated
  using (is_active = true or app_private.is_admin_or_staff());

create policy "Staff manage categories"
  on public.categories for all
  to authenticated
  using (app_private.is_admin_or_staff())
  with check (app_private.is_admin_or_staff());

create policy "Public can read active collections"
  on public.collections for select
  to anon, authenticated
  using (is_active = true or app_private.is_admin_or_staff());

create policy "Staff manage collections"
  on public.collections for all
  to authenticated
  using (app_private.is_admin_or_staff())
  with check (app_private.is_admin_or_staff());

create policy "Public can read active products"
  on public.products for select
  to anon, authenticated
  using (is_active = true or app_private.is_admin_or_staff());

create policy "Staff manage products"
  on public.products for all
  to authenticated
  using (app_private.is_admin_or_staff())
  with check (app_private.is_admin_or_staff());

create policy "Public can read active product collection links"
  on public.product_collections for select
  to anon, authenticated
  using (
    app_private.is_admin_or_staff()
    or exists (
      select 1
      from public.products p
      join public.collections c on c.id = product_collections.collection_id
      where p.id = product_collections.product_id
        and p.is_active = true
        and c.is_active = true
    )
  );

create policy "Staff manage product collection links"
  on public.product_collections for all
  to authenticated
  using (app_private.is_admin_or_staff())
  with check (app_private.is_admin_or_staff());

create policy "Public can read images for active products"
  on public.product_images for select
  to anon, authenticated
  using (
    app_private.is_admin_or_staff()
    or exists (
      select 1
      from public.products p
      where p.id = product_images.product_id
        and p.is_active = true
    )
  );

create policy "Staff manage product images"
  on public.product_images for all
  to authenticated
  using (app_private.is_admin_or_staff())
  with check (app_private.is_admin_or_staff());

create policy "Public can read active product colours"
  on public.product_colour_options for select
  to anon, authenticated
  using (
    app_private.is_admin_or_staff()
    or exists (
      select 1
      from public.products p
      where p.id = product_colour_options.product_id
        and p.is_active = true
    )
  );

create policy "Staff manage product colours"
  on public.product_colour_options for all
  to authenticated
  using (app_private.is_admin_or_staff())
  with check (app_private.is_admin_or_staff());

create policy "Staff manage customers"
  on public.customers for all
  to authenticated
  using (app_private.is_admin_or_staff())
  with check (app_private.is_admin_or_staff());

create policy "Staff manage orders"
  on public.orders for all
  to authenticated
  using (app_private.is_admin_or_staff())
  with check (app_private.is_admin_or_staff());

create policy "Staff manage order items"
  on public.order_items for all
  to authenticated
  using (app_private.is_admin_or_staff())
  with check (app_private.is_admin_or_staff());

create policy "Staff manage payments"
  on public.payments for all
  to authenticated
  using (app_private.is_admin_or_staff())
  with check (app_private.is_admin_or_staff());

create policy "Staff manage fulfilment details"
  on public.fulfilment_details for all
  to authenticated
  using (app_private.is_admin_or_staff())
  with check (app_private.is_admin_or_staff());

create policy "Staff read inventory movements"
  on public.inventory_movements for select
  to authenticated
  using (app_private.is_admin_or_staff());

create policy "Staff create inventory movements"
  on public.inventory_movements for insert
  to authenticated
  with check (app_private.is_admin_or_staff());

create policy "Public can create enquiries"
  on public.enquiries for insert
  to anon, authenticated
  with check (
    enquiry_type in ('contact', 'product_whatsapp', 'bulk_order')
    and coalesce(length(full_name), 0) <= 160
    and coalesce(length(email), 0) <= 320
    and coalesce(length(phone), 0) <= 40
    and coalesce(length(message), 0) <= 4000
  );

create policy "Staff manage enquiries"
  on public.enquiries for all
  to authenticated
  using (app_private.is_admin_or_staff())
  with check (app_private.is_admin_or_staff());

create policy "Public can read public store settings"
  on public.store_settings for select
  to anon, authenticated
  using (is_public = true or app_private.is_admin_or_staff());

create policy "Staff manage store settings"
  on public.store_settings for all
  to authenticated
  using (app_private.is_admin_or_staff())
  with check (app_private.is_admin_or_staff());

create policy "Staff read audit logs"
  on public.audit_logs for select
  to authenticated
  using (app_private.is_admin_or_staff());

create policy "Staff create audit logs"
  on public.audit_logs for insert
  to authenticated
  with check (app_private.is_admin_or_staff());

insert into public.categories (name, slug, sort_order)
values
  ('Terracotta Set', 'terracotta-set', 10),
  ('Earring', 'earring', 20),
  ('Finger Ring', 'finger-ring', 30),
  ('Bangles', 'bangles', 40),
  ('Back Clip', 'back-clip', 50),
  ('Brooch', 'brooch', 60),
  ('Hair Pin', 'hair-pin', 70),
  ('Hair Stick', 'hair-stick', 80)
on conflict (slug) do update
set name = excluded.name,
    sort_order = excluded.sort_order,
    updated_at = now();

insert into public.collections (name, slug, sort_order)
values
  ('New Arrivals', 'new-arrivals', 10),
  ('Festive Wear', 'festive-wear', 20),
  ('Everyday Lightweight', 'everyday-lightweight', 30),
  ('Statement Pieces', 'statement-pieces', 40),
  ('Return Gifts', 'return-gifts', 50),
  ('Bestsellers', 'bestsellers', 60),
  ('Sale', 'sale', 70)
on conflict (slug) do update
set name = excluded.name,
    sort_order = excluded.sort_order,
    updated_at = now();

insert into public.store_settings (key, value, is_public, description)
values
  ('brand', '{"name":"Monleaf","currency":"INR","country":"India"}', true, 'Public brand basics.'),
  ('contact', '{"email":"hello@example.com","whatsapp_phone":"+918910214167","instagram_url":"https://instagram.com/goonjaa.srijita"}', true, 'Public customer contact channels.'),
  ('checkout', '{"free_shipping_threshold_inr_paise":200000,"standard_shipping_fee_inr_paise":0,"allow_cod":true,"allow_prepaid":true,"allow_pickup":true,"allow_advance_booking":true}', true, 'Public checkout options and thresholds.'),
  ('razorpay', '{"enabled":false}', false, 'Private payment provider feature flags.')
on conflict (key) do update
set value = excluded.value,
    is_public = excluded.is_public,
    description = excluded.description,
    updated_at = now();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy "Public can read product image objects"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'product-images');

create policy "Staff can upload product image objects"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'product-images'
    and name ~ '^products/[0-9a-f-]+/.+'
    and app_private.is_admin_or_staff()
  );

create policy "Staff can update product image objects"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images' and app_private.is_admin_or_staff())
  with check (
    bucket_id = 'product-images'
    and name ~ '^products/[0-9a-f-]+/.+'
    and app_private.is_admin_or_staff()
  );

create policy "Staff can delete product image objects"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images' and app_private.is_admin_or_staff());

grant usage on schema public to anon, authenticated, service_role;
grant usage on schema app_private to anon, authenticated, service_role;

grant execute on function app_private.has_role(public.profile_role[]) to anon, authenticated, service_role;
grant execute on function app_private.is_admin_or_staff() to anon, authenticated, service_role;
grant execute on function public.generate_order_number() to authenticated, service_role;

revoke all on all tables in schema public from anon;
revoke all on all tables in schema public from authenticated;

grant select on public.categories, public.collections, public.product_collections, public.product_images, public.product_colour_options, public.store_settings to anon;
grant insert on public.enquiries to anon;
grant select (
  id,
  sku,
  slug,
  name,
  short_description,
  long_description,
  price_inr_paise,
  compare_at_price_inr_paise,
  category_id,
  subcategory,
  materials,
  dimensions,
  weight,
  care_instructions,
  stock_status,
  is_new,
  is_bestseller,
  is_sale,
  is_featured,
  tags,
  occasion,
  color_family,
  allow_prepaid,
  allow_cod,
  allow_advance_booking,
  allow_pickup,
  sort_order,
  created_at,
  updated_at
) on public.products to anon;

grant select, insert on public.enquiries to authenticated;
grant select on public.categories, public.collections, public.products, public.product_collections, public.product_images, public.product_colour_options, public.store_settings to authenticated;
grant select, insert, update, delete on all tables in schema public to service_role;
grant select, insert, update, delete on public.profiles, public.categories, public.collections, public.products, public.product_collections, public.product_images, public.product_colour_options, public.customers, public.orders, public.order_items, public.payments, public.fulfilment_details, public.inventory_movements, public.enquiries, public.store_settings, public.audit_logs to authenticated;
grant usage, select on all sequences in schema public to authenticated, service_role;
