update public.products
set short_description = ''
where short_description is null;

alter table public.products
  alter column short_description set default '',
  alter column short_description set not null,
  alter column allow_pickup set default true;
