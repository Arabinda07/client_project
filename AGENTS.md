# AGENTS.md

Instructions and architectural boundaries for coding agents working in `goonjaa`.

---

## 1. System Overview & Core Invariants

`goonjaa` is a brand-led e-commerce web application for handcrafted terracotta jewellery sculpted and painted by a solo woman artisan.

- **Brand Invariant:** Strictly lowercase `goonjaa` in all UI text, headings, and code, unless an external API enforces title case.
- **Tone & Register:** Warm, grounded, artistic, patient. Avoid generic luxury clichés, factory jargon, or aggressive sales hype.
- **Tech Stack:** React 19, TypeScript (strict mode), Vite, Tailwind CSS / Vanilla CSS tokens, Lucide React, Supabase (PostgreSQL, RLS).

---

## 2. Context On-Demand (Read When Applicable)

Do not read all project documentation upfront. Consult relevant specifications and knowledge bundles contextually:

- **Brand identity, design tokens, or copy tone:** Consult [`docs/DESIGN.md`](file:///e:/client_project/docs/DESIGN.md), [`docs/VOICE.md`](file:///e:/client_project/docs/VOICE.md), and [`docs/TONE.md`](file:///e:/client_project/docs/TONE.md).
- **Database schema, RLS policies, or Supabase backend:** Consult [`docs/SUPABASE_BACKEND.md`](file:///e:/client_project/docs/SUPABASE_BACKEND.md) and [`supabase/`](file:///e:/client_project/supabase/).
- **Feature requirements & acceptance criteria:** Check active specifications under [`specs/`](file:///e:/client_project/specs/).
- **Core architectural invariants & SDD rules:** Consult [`.specify/memory/constitution.md`](file:///e:/client_project/.specify/memory/constitution.md).

---

## 3. Autonomy, Permissions & Definition of Done

You are fully authorized to run safe local checks and self-heal issues without asking for approval at each step:

- Run `npm run lint` (`tsc --noEmit && oxlint`) to verify TypeScript types and `@shadcn/lint` rules.
- Run `npm run build` to verify Vite compilation and static SEO generation.
- Run `npm run validate:docs` to verify Open Knowledge Format (OKF) integrity.

**Definition of Done:** A task is only complete when:
1. The requested code changes are cleanly implemented.
2. Linting and type checking (`npm run lint`) passes with zero errors.
3. Production build (`npm run build`) succeeds.
4. Any regressions or build errors introduced by the change have been diagnosed and fixed autonomously before returning for review.

---

## 4. Coding & Architecture Guardrails

- **Row Level Security (RLS):** Every Supabase table must enforce RLS. Never commit service role keys or bypass security policies.
- **Design Tokens:** Reuse existing CSS variables from `src/index.css` (earthen terracotta, clay, warm sand, charcoal). Do not introduce arbitrary un-tokenized hex colors.
- **TypeScript:** Strict typing. Avoid `any` unless interacting with untyped third-party browser APIs.
