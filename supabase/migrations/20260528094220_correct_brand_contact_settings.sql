-- Correct brand/contact settings after earlier bootstrap defaults.
-- The JSONB patch is on the right-hand side so these current values win,
-- while uploaded asset paths and other admin-edited keys are preserved.

insert into public.store_settings (key, value, is_public, description)
values
  (
    'brand',
    '{
      "name": "goonjaa",
      "currency": "INR",
      "country": "India",
      "site_url": "https://goonjaa.vercel.app",
      "description": "Handcrafted terracotta jewellery shaped and painted by a woman-led studio in India."
    }'::jsonb,
    true,
    'Public brand identity, logo, and owner media settings.'
  ),
  (
    'contact',
    '{
      "email": "goonjaa.srijita@gmail.com",
      "owner_email": "goonjaa.srijita@gmail.com",
      "whatsapp_phone": "+918697452473",
      "instagram_url": "https://instagram.com/goonjaa.srijita",
      "facebook_url": "https://www.facebook.com/profile.php?id=61554180150901",
      "youtube_url": "https://www.youtube.com/@goonjaa.srijita"
    }'::jsonb,
    true,
    'Public customer contact channels and social links.'
  )
on conflict (key) do update
set value = public.store_settings.value || excluded.value,
    is_public = true,
    description = excluded.description,
    updated_at = now();
