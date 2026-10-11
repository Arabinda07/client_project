-- Bespoke / Custom Orders State Machine & Studio Margin Economics
-- Designed for goonjaa artisan studio operations.

-- 1. ENUMS FOR BESPOKE LIFECYCLE
do $$
begin
  create type public.custom_order_status as enum (
    'inquiry',
    'quote_sent',
    'advance_pending',
    'advance_paid',
    'in_crafting',
    'photo_proof_ready',
    'customer_approved',
    'balance_pending',
    'balance_paid',
    'dispatched',
    'completed',
    'cancelled'
  );
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.custom_order_payment_type as enum (
    'advance_deposit',
    'balance_final',
    'full_payment',
    'additional_customization',
    'refund'
  );
exception when duplicate_object then null;
end $$;

-- 2. BESPOKE CUSTOM ORDERS TABLE
create table if not exists public.custom_orders (
  id uuid primary key default gen_random_uuid(),
  custom_order_number text not null unique,
  customer_id uuid references public.customers(id) on delete set null,
  customer_name text not null,
  phone text not null,
  whatsapp_phone text,
  email text,
  title text not null,
  description text not null,
  reference_image_urls text[] not null default array[]::text[],
  occasion text,
  target_delivery_date date,
  status public.custom_order_status not null default 'inquiry',
  
  -- Milestone Financials in integer paise
  quote_amount_inr_paise integer not null default 0,
  advance_required_inr_paise integer not null default 0,
  advance_paid_inr_paise integer not null default 0,
  balance_due_inr_paise integer not null default 0,
  shipping_fee_inr_paise integer not null default 0,
  
  -- Studio Cost Baseline (Paise)
  estimated_crafting_cost_inr_paise integer not null default 0,
  estimated_packaging_cost_inr_paise integer not null default 0,

  -- Crafting & Proofing Lifecycle
  proof_image_urls text[] not null default array[]::text[],
  proof_shared_at timestamptz,
  customer_feedback_notes text,
  customer_approved_at timestamptz,

  -- Fulfilment & Shipping
  shipping_address_line1 text,
  shipping_address_line2 text,
  shipping_city text,
  shipping_state text,
  shipping_pincode text,
  courier_name text,
  tracking_number text,
  tracking_url text,
  actual_shipping_cost_inr_paise integer not null default 0,
  dispatched_at timestamptz,
  delivered_at timestamptz,

  -- Studio Internal Notes
  artisan_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint custom_orders_customer_name_length check (length(customer_name) between 1 and 160),
  constraint custom_orders_phone_format check (phone ~ '^\+?[0-9\s-]{7,20}$'),
  constraint custom_orders_amounts_non_negative check (
    quote_amount_inr_paise >= 0
    and advance_required_inr_paise >= 0
    and advance_paid_inr_paise >= 0
    and balance_due_inr_paise >= 0
    and shipping_fee_inr_paise >= 0
    and estimated_crafting_cost_inr_paise >= 0
    and estimated_packaging_cost_inr_paise >= 0
    and actual_shipping_cost_inr_paise >= 0
  )
);

create index if not exists idx_custom_orders_status on public.custom_orders(status);
create index if not exists idx_custom_orders_created_at on public.custom_orders(created_at desc);
create index if not exists idx_custom_orders_phone on public.custom_orders(phone);

-- 3. CUSTOM ORDER PAYMENTS MILESTONE LEDGER
create table if not exists public.custom_order_payments (
  id uuid primary key default gen_random_uuid(),
  custom_order_id uuid not null references public.custom_orders(id) on delete cascade,
  payment_type public.custom_order_payment_type not null default 'advance_deposit',
  provider public.payment_provider not null default 'razorpay',
  amount_inr_paise integer not null,
  status public.payment_status not null default 'pending',
  gateway_fee_inr_paise integer not null default 0,
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_signature_verified boolean not null default false,
  payment_reference text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint custom_order_payments_amount_positive check (amount_inr_paise > 0),
  constraint custom_order_payments_gateway_fee_non_negative check (gateway_fee_inr_paise >= 0)
);

create index if not exists idx_custom_order_payments_order_id on public.custom_order_payments(custom_order_id);

-- 4. ORDER NUMBER GENERATOR TRIGGER FOR CUSTOM ORDERS
create or replace function public.generate_custom_order_number()
returns text
language plpgsql
as $$
declare
  candidate text;
begin
  loop
    candidate := 'GNJ-CUST-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(encode(gen_random_bytes(4), 'hex'), 1, 6));
    exit when not exists (select 1 from public.custom_orders where custom_order_number = candidate);
  end loop;

  return candidate;
end;
$$;

create or replace function public.set_custom_order_number()
returns trigger
language plpgsql
as $$
begin
  if new.custom_order_number is null or length(trim(new.custom_order_number)) = 0 then
    new.custom_order_number := public.generate_custom_order_number();
  end if;

  return new;
end;
$$;

drop trigger if exists custom_orders_set_number on public.custom_orders;
create trigger custom_orders_set_number
  before insert on public.custom_orders
  for each row execute function public.set_custom_order_number();

drop trigger if exists custom_orders_set_updated_at on public.custom_orders;
create trigger custom_orders_set_updated_at
  before update on public.custom_orders
  for each row execute function public.set_updated_at();

drop trigger if exists custom_order_payments_set_updated_at on public.custom_order_payments;
create trigger custom_order_payments_set_updated_at
  before update on public.custom_order_payments
  for each row execute function public.set_updated_at();

-- 5. STUDIO STORAGE BUCKET FOR PROOFS & CUSTOM ASSETS
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'custom-orders',
  'custom-orders',
  true,
  8388608, -- 8 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/heic']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

-- 6. STUDIO MARGIN ECONOMICS COLUMNS ON CORE CATALOG & COMMERCE TABLES
alter table public.products
  add column if not exists estimated_crafting_cost_inr_paise integer not null default 0,
  add column if not exists estimated_packaging_cost_inr_paise integer not null default 0;

alter table public.order_items
  add column if not exists unit_crafting_cost_inr_paise integer not null default 0,
  add column if not exists unit_packaging_cost_inr_paise integer not null default 0;

alter table public.fulfilment_details
  add column if not exists actual_shipping_cost_inr_paise integer not null default 0;

alter table public.payments
  add column if not exists gateway_fee_inr_paise integer not null default 0;

-- Snapshot product unit costs onto order_items upon insertion if not already provided
create or replace function public.snapshot_order_item_costs()
returns trigger
language plpgsql
as $$
declare
  prod_record record;
begin
  if new.product_id is not null then
    select estimated_crafting_cost_inr_paise, estimated_packaging_cost_inr_paise
    into prod_record
    from public.products
    where id = new.product_id;

    if found then
      if new.unit_crafting_cost_inr_paise = 0 then
        new.unit_crafting_cost_inr_paise := coalesce(prod_record.estimated_crafting_cost_inr_paise, 0);
      end if;
      if new.unit_packaging_cost_inr_paise = 0 then
        new.unit_packaging_cost_inr_paise := coalesce(prod_record.estimated_packaging_cost_inr_paise, 0);
      end if;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists order_items_snapshot_costs on public.order_items;
create trigger order_items_snapshot_costs
  before insert on public.order_items
  for each row execute function public.snapshot_order_item_costs();

-- 7. STUDIO MARGINS VIEWS
create or replace view public.v_order_net_margins with (security_invoker = true) as
select
  o.id as order_id,
  o.order_number,
  o.order_status,
  o.payment_status,
  o.placed_at,
  o.amount_paid_inr_paise as revenue_collected_paise,
  coalesce(items_summary.total_crafting_cost_paise, 0) as crafting_cost_paise,
  coalesce(items_summary.total_packaging_cost_paise, 0) as packaging_cost_paise,
  coalesce(f.actual_shipping_cost_inr_paise, 0) as courier_spent_paise,
  coalesce(pay_summary.total_gateway_fees_paise, 0) as gateway_fees_paise,
  (
    coalesce(items_summary.total_crafting_cost_paise, 0)
    + coalesce(items_summary.total_packaging_cost_paise, 0)
    + coalesce(f.actual_shipping_cost_inr_paise, 0)
    + coalesce(pay_summary.total_gateway_fees_paise, 0)
  ) as total_expenses_paise,
  (
    o.amount_paid_inr_paise
    - (
      coalesce(items_summary.total_crafting_cost_paise, 0)
      + coalesce(items_summary.total_packaging_cost_paise, 0)
      + coalesce(f.actual_shipping_cost_inr_paise, 0)
      + coalesce(pay_summary.total_gateway_fees_paise, 0)
    )
  ) as net_profit_paise,
  case
    when o.amount_paid_inr_paise > 0 then
      round(
        (
          (
            o.amount_paid_inr_paise
            - (
              coalesce(items_summary.total_crafting_cost_paise, 0)
              + coalesce(items_summary.total_packaging_cost_paise, 0)
              + coalesce(f.actual_shipping_cost_inr_paise, 0)
              + coalesce(pay_summary.total_gateway_fees_paise, 0)
            )
          )::numeric / o.amount_paid_inr_paise::numeric
        ) * 100,
        2
      )
    else 0
  end as net_margin_percentage
from public.orders o
left join public.fulfilment_details f on f.order_id = o.id
left join (
  select
    oi.order_id,
    sum(oi.quantity * oi.unit_crafting_cost_inr_paise) as total_crafting_cost_paise,
    sum(oi.quantity * oi.unit_packaging_cost_inr_paise) as total_packaging_cost_paise
  from public.order_items oi
  group by oi.order_id
) items_summary on items_summary.order_id = o.id
left join (
  select
    p.order_id,
    sum(p.gateway_fee_inr_paise) as total_gateway_fees_paise
  from public.payments p
  where p.status = 'paid'
  group by p.order_id
) pay_summary on pay_summary.order_id = o.id;

create or replace view public.v_custom_order_net_margins with (security_invoker = true) as
select
  co.id as custom_order_id,
  co.custom_order_number,
  co.customer_name,
  co.status,
  co.created_at,
  co.advance_paid_inr_paise,
  (co.quote_amount_inr_paise - co.balance_due_inr_paise) as revenue_collected_paise,
  co.estimated_crafting_cost_inr_paise as crafting_cost_paise,
  co.estimated_packaging_cost_inr_paise as packaging_cost_paise,
  co.actual_shipping_cost_inr_paise as courier_spent_paise,
  coalesce(pay_summary.total_gateway_fees_paise, 0) as gateway_fees_paise,
  (
    co.estimated_crafting_cost_inr_paise
    + co.estimated_packaging_cost_inr_paise
    + co.actual_shipping_cost_inr_paise
    + coalesce(pay_summary.total_gateway_fees_paise, 0)
  ) as total_expenses_paise,
  (
    (co.quote_amount_inr_paise - co.balance_due_inr_paise)
    - (
      co.estimated_crafting_cost_inr_paise
      + co.estimated_packaging_cost_inr_paise
      + co.actual_shipping_cost_inr_paise
      + coalesce(pay_summary.total_gateway_fees_paise, 0)
    )
  ) as net_profit_paise,
  case
    when (co.quote_amount_inr_paise - co.balance_due_inr_paise) > 0 then
      round(
        (
          (
            (co.quote_amount_inr_paise - co.balance_due_inr_paise)
            - (
              co.estimated_crafting_cost_inr_paise
              + co.estimated_packaging_cost_inr_paise
              + co.actual_shipping_cost_inr_paise
              + coalesce(pay_summary.total_gateway_fees_paise, 0)
            )
          )::numeric / (co.quote_amount_inr_paise - co.balance_due_inr_paise)::numeric
        ) * 100,
        2
      )
    else 0
  end as net_margin_percentage
from public.custom_orders co
left join (
  select
    cop.custom_order_id,
    sum(cop.gateway_fee_inr_paise) as total_gateway_fees_paise
  from public.custom_order_payments cop
  where cop.status = 'paid'
  group by cop.custom_order_id
) pay_summary on pay_summary.custom_order_id = co.id;

-- 8. ROW LEVEL SECURITY POLICIES
alter table public.custom_orders enable row level security;
alter table public.custom_order_payments enable row level security;

-- Public can submit a custom order inquiry
create policy "Public can submit custom order inquiries"
  on public.custom_orders for insert
  to anon, authenticated
  with check (true);

-- Staff can view all custom orders
create policy "Staff can view all custom orders"
  on public.custom_orders for select
  to authenticated
  using (app_private.is_admin_or_staff());

-- Staff can update all custom orders
create policy "Staff can update custom orders"
  on public.custom_orders for update
  to authenticated
  using (app_private.is_admin_or_staff())
  with check (app_private.is_admin_or_staff());

-- Staff can delete custom orders (if needed)
create policy "Staff can delete custom orders"
  on public.custom_orders for delete
  to authenticated
  using (app_private.is_admin_or_staff());

-- Custom Order Payments: Staff only
create policy "Staff can view custom order payments"
  on public.custom_order_payments for select
  to authenticated
  using (app_private.is_admin_or_staff());

create policy "Staff can manage custom order payments"
  on public.custom_order_payments for all
  to authenticated
  using (app_private.is_admin_or_staff())
  with check (app_private.is_admin_or_staff());

-- Storage policies for custom-orders bucket
create policy "Public can view custom order proof objects"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'custom-orders');

create policy "Public and staff can upload custom order reference files"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'custom-orders');

create policy "Staff can update custom order assets"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'custom-orders' and app_private.is_admin_or_staff())
  with check (bucket_id = 'custom-orders' and app_private.is_admin_or_staff());

create policy "Staff can delete custom order assets"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'custom-orders' and app_private.is_admin_or_staff());
