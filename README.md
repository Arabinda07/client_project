<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a44ae333-5b06-432e-b512-258725a85c09

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy [.env.example](.env.example) to `.env.local` and fill in the Supabase values when using the admin/catalog backend.
3. Run the app:
   `npm run dev`

## Supabase backend

The initial Supabase schema, RLS policies, storage bucket setup, and admin bootstrap notes are documented in [docs/SUPABASE_BACKEND.md](docs/SUPABASE_BACKEND.md).

## Deployment

Vercel and Supabase site URL/environment-variable setup is documented in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
