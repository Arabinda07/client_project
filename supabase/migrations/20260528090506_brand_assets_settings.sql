insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'brand-assets',
  'brand-assets',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy "Public can read brand asset objects"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'brand-assets');

create policy "Staff can upload brand asset objects"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'brand-assets'
    and name ~ '^(logos|owners|social|brand)/.+'
    and app_private.is_admin_or_staff()
  );

create policy "Staff can update brand asset objects"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'brand-assets' and app_private.is_admin_or_staff())
  with check (
    bucket_id = 'brand-assets'
    and name ~ '^(logos|owners|social|brand)/.+'
    and app_private.is_admin_or_staff()
  );

create policy "Staff can delete brand asset objects"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'brand-assets' and app_private.is_admin_or_staff());

insert into public.store_settings (key, value, is_public, description)
values
  (
    'brand',
    '{
      "name": "goonjaa",
      "currency": "INR",
      "country": "India",
      "site_url": "https://goonjaa.in",
      "description": "Handcrafted terracotta jewellery shaped and painted by a woman-led studio in India.",
      "primary_logo_storage_path": "",
      "alternate_logo_storage_path": "",
      "use_uploaded_logo": false,
      "owner_photo_storage_path": "",
      "owner_photo_alt": "The goonjaa artist working in her home studio",
      "studio_photo_storage_path": "",
      "studio_photo_alt": "The goonjaa studio where terracotta jewellery is shaped and painted by hand"
    }',
    true,
    'Public brand identity, logo, and owner media settings.'
  ),
  (
    'contact',
    '{
      "email": "hello@goonjaa.in",
      "owner_email": "hello@goonjaa.in",
      "whatsapp_phone": "+918910214167",
      "instagram_url": "https://instagram.com/goonjaa.srijita",
      "facebook_url": "",
      "youtube_url": ""
    }',
    true,
    'Public customer contact channels and social links.'
  )
on conflict (key) do update
set value = excluded.value || public.store_settings.value,
    is_public = true,
    description = excluded.description,
    updated_at = now();
