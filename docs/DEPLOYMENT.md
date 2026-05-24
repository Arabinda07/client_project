# Vercel And Supabase Deployment Setup

This app is a Vite React single-page app. Vercel builds the static frontend, while Supabase provides Auth, database, RLS, and Storage.

## Vercel Project Settings

In Vercel, open the project and add these environment variables under **Settings -> Environment Variables** for **Production** and **Preview**:

```bash
VITE_SUPABASE_URL=https://rhlbdkeezbknkuuqnbrb.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_kGeljbczEcFrQl1cSx2FVA_ka7BD82T
```

Add this after the production URL is known:

```bash
APP_URL=https://your-production-domain.com
```

Add server-only values only when backend checkout, Razorpay, or trusted server scripts are deployed:

```bash
SUPABASE_SECRET_KEY=sb_secret_your-server-only-secret-key
RAZORPAY_KEY_ID=rzp_test_or_live_key_id
RAZORPAY_KEY_SECRET=your-server-only-razorpay-secret
RAZORPAY_WEBHOOK_SECRET=your-server-only-razorpay-webhook-secret
```

Do not include quotes in Vercel dashboard values.

Security rules:

- `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are browser-safe.
- `SUPABASE_SECRET_KEY`, Razorpay secrets, and webhook secrets are server-only.
- Never create a `VITE_SUPABASE_SECRET_KEY`.
- The admin catalog dashboard uses Supabase Auth plus RLS with the publishable key; it does not need the secret key.

## Vercel Build Settings

Use Vercel's Vite defaults:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

The repository includes `vercel.json` so direct visits to React Router routes such as `/shop`, `/product/:slug`, and `/admin/products` serve `index.html` instead of returning a 404. Static public assets under `/assets`, `/fonts`, `/images`, `robots.txt`, `sitemap.xml`, and `llms.txt` are excluded from that SPA rewrite.

After changing any Vercel environment variable, redeploy the Production deployment.

## Supabase Auth URL Configuration

In Supabase, open **Authentication -> URL Configuration**.

Set **Site URL** to the final production URL:

```text
https://your-production-domain.com
```

If the custom domain is not ready, temporarily use the production Vercel URL:

```text
https://your-vercel-project.vercel.app
```

Add these **Redirect URLs**:

```text
http://localhost:3000/**
http://localhost:5173/**
https://your-vercel-project.vercel.app/**
https://*-your-vercel-team-or-account-slug.vercel.app/**
https://your-production-domain.com/**
```

Replace the placeholders with the real Vercel project URL, Vercel account/team slug, and custom domain. Prefer exact production URLs; keep the wildcard preview URL only if preview deployments need admin login.

## Supabase Email Auth Settings

In Supabase, open **Authentication -> Providers -> Email**:

- Enable email/password login.
- Disable public signups if only store staff should log in.
- Create owner/admin/staff users manually in Supabase Auth.
- Add a matching active `public.profiles` row for every admin user.

First owner bootstrap SQL:

```sql
insert into public.profiles (id, full_name, role, is_active)
values ('AUTH_USER_ID_HERE', 'Store Owner', 'owner', true)
on conflict (id) do update
set role = 'owner',
    is_active = true,
    updated_at = now();
```

Admin access model:

- `/admin/login` is public.
- `/admin/*` requires a Supabase Auth session and an active `profiles.role` of `owner`, `admin`, or `staff`.
- Customers do not need accounts in v1.

## Verification Checklist

- Vercel deployment has `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Vercel deployment does not expose `SUPABASE_SECRET_KEY` through any `VITE_` variable.
- Supabase Site URL points to the deployed site.
- Supabase Redirect URLs include localhost, production, and preview URLs.
- `/shop` loads active Supabase products or falls back to mock data.
- `/admin/login` allows the owner to sign in.
- `/admin/products` redirects unauthenticated users to `/admin/login`.
- Direct browser refresh on `/admin/products` does not 404 on Vercel.
- Product image upload from admin stores files in the `product-images` bucket and displays publicly.
- Production Auth links do not redirect to localhost.

## References

- Vercel Vite framework docs: https://vercel.com/docs/frameworks/frontend/vite
- Vercel environment variables docs: https://vercel.com/docs/environment-variables
- Supabase redirect URL docs: https://supabase.com/docs/guides/auth/redirect-urls
- Supabase Auth general configuration: https://supabase.com/docs/guides/auth/general-configuration
