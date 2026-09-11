# goonjaa

> **One-of-a-kind handcrafted terracotta jewellery storefront.**  
> Every piece begins with earthen clay — sculpted, dried, baked, and painted by hand by a solo woman artisan. No molds. Pure slow craft.

---

## Overview

**goonjaa** is a brand-led e-commerce web application designed to connect wearers with authentic Indian terracotta craftsmanship. The experience pairs thoughtful visual storytelling with a seamless digital shopping experience (category browsing, product detail exploration, cart management, checkout, and bulk-order requests).

This project strictly adheres to **Spec-Driven Development (SDD)** inspired by [GitHub Spec-Kit](https://github.com/github/spec-kit).

---

## Tech Stack

* **Frontend:** React 19, TypeScript (strict mode), Vite
* **Styling:** Tailwind CSS & Vanilla CSS design tokens (earthen terracotta palette)
* **Icons:** Lucide React
* **Backend / Database:** Supabase (PostgreSQL, Row Level Security, Auth, Storage)
* **Deployment & CI:** Vercel, GitHub Actions CI

---

## Spec-Driven Development (SDD)

Development in this repository is governed by specifications acting as the single source of truth:

```
├── .specify/                  # System harness & governance
│   ├── memory/
│   │   └── constitution.md    # Supreme project rules & architectural invariants
│   ├── templates/             # Templates for spec, plan, and tasks
│   └── README.md
├── specs/                     # Living feature specifications
│   ├── 001-storefront-and-catalog/
│   └── 002-supabase-backend-integration/
└── docs/                      # Open Knowledge Format (OKF v0.2) Knowledge Bundle
    ├── index.md               # Progressive disclosure catalog
    ├── log.md                 # Chronological update history
    └── [concept].md           # Domain knowledge concepts (brand, schemas, design)
```

### Development Cycle
1. **Domain Context First:** Review the [OKF Knowledge Catalog](docs/index.md) for brand truths, design tokens, and database schemas.
2. **Constitution Rules:** All contributors and AI coding agents adhere to [.specify/memory/constitution.md](.specify/memory/constitution.md) (strictly lowercase `goonjaa`, mandatory RLS, no mass-market hype).
3. **Specify (`spec.md`):** Capture requirements and user stories before writing code.
4. **Plan (`plan.md`):** Architect changes and review impacts.
5. **Tasks (`tasks.md`):** Break down changes into atomic, verifiable steps.
6. **Implement & Converge:** Build against the spec and verify with automated builds.

---

## Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (version 20+ recommended)
* npm (bundled with Node.js)

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Arabinda07/client_project.git
   cd client_project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Configure Supabase connection variables. Keep `VITE_SUPABASE_CATALOG_ENABLED="false"` to use local static products while staging, or set to `"true"` when connected to a live Supabase instance with RLS policies configured.

4. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server with hot module reloading. |
| `npm run build` | Compiles TypeScript (`tsc -b`) and bundles production assets with Vite. |
| `npm run preview` | Previews the production build locally. |
| `npm run validate:docs` | Validates OKF v0.2 frontmatter, link integrity, and catalog registration in `docs/`. |
| `npx tsx scripts/generate-static-seo.ts` | Prerenders static SEO metadata and HTML snapshots for search engines. |
| `npx tsx scripts/seed-supabase-catalog.ts` | Seeds initial product catalog and categories into Supabase. |

---

## Project Structure

```
client_project/
├── .github/                   # CI workflows, issue & pull request templates
├── .specify/                  # Spec-Kit system harness, constitution & templates
├── docs/                      # Brand narrative, design tokens, voice, SEO, and backend docs
├── public/                    # Static public assets, favicon, brand images
├── scripts/                   # SEO generation and Supabase database seeding scripts
├── specs/                     # Living feature specifications
├── src/
│   ├── components/            # Reusable UI components (catalog, cart, layout, common)
│   ├── context/               # Application context & state providers (CartContext)
│   ├── data/                  # Static baseline product catalog
│   ├── lib/                   # Utility libraries and Supabase client
│   ├── types/                 # TypeScript interfaces and type definitions
│   ├── views/                 # Top-level page views (Catalog, Story, Care, Admin)
│   ├── App.tsx                # App entrypoint with routing & layout
│   └── main.tsx               # DOM bootstrap
├── supabase/                  # Supabase schema and migration SQL files
├── index.html                 # Main HTML template
├── package.json               # Dependencies and npm scripts
├── tsconfig.json              # TypeScript strict configuration
├── vercel.json                # Vercel deployment and routing rules
└── vite.config.ts             # Vite configuration
```

---

## Backend & Deployment Documentation

* **Supabase Setup & RLS Policies:** [docs/SUPABASE_BACKEND.md](docs/SUPABASE_BACKEND.md)
* **Vercel & Environment Deployment:** [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
* **Brand Story & Narrative:** [docs/NARRATIVE.md](docs/NARRATIVE.md)
* **Design & Typography Guidelines:** [docs/DESIGN.md](docs/DESIGN.md) & [docs/TYPOGRAPHY.md](docs/TYPOGRAPHY.md)
* **Writing & Voice Standards:** [docs/WRITING.md](docs/WRITING.md) & [docs/VOICE.md](docs/VOICE.md)
