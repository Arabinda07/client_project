# goonjaa Knowledge Catalog

> **Open Knowledge Format (OKF v0.2) Bundle Index**  
> Unit of distribution: `docs/`  
> Governing Specification: [Google Cloud Platform OKF v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)  
> This directory serves as the progressive disclosure entrypoint for human contributors and AI coding agents.

---

## Concept Directory

### 1. Brand & Artisan Craft

| Concept | Type | Verified | Summary |
| :--- | :--- | :--- | :--- |
| [PRODUCT.md](./PRODUCT.md) | `Brand Vision` | `human:founder` | Handcrafted terracotta jewellery storefront guidelines, audience definition, and core artisan truths. |
| [NARRATIVE.md](./NARRATIVE.md) | `Brand Story` | `human:founder` | Core narrative, brand promise, slow-craft pillars, and classical vocal background grounding the studio. |
| [TONE.md](./TONE.md) | `Voice & Tone Guide` | `human:founder` | Contextual tone adaptations across landing, catalog, about, checkout, and empty states. |
| [VOICE.md](./VOICE.md) | `Voice Architecture` | `human:founder` | Stable personality traits, artistic accessibility, patience of craft, and practical voice guidelines. |
| [WRITING.md](./WRITING.md) | `Copywriting Rules` | `human:founder` | Practical rules for product descriptions, approved brand lines, category narratives, and copy blacklist. |
| [GLOSSARY.md](./GLOSSARY.md) | `Domain Glossary` | `human:founder` | Canonical terms, approved vocabulary, craft terminology, and words to avoid across UI, copy, and code. |

---

### 2. Design & Visual System

| Concept | Type | Verified | Summary |
| :--- | :--- | :--- | :--- |
| [DESIGN.md](./DESIGN.md) | `Design System` | `human:founder` | Warm handmade-luxury design language, clay and earthen palette tokens, typography, and layout aesthetics. |
| [TYPOGRAPHY.md](./TYPOGRAPHY.md) | `Typography Spec` | `human:founder` | Font pairings (Boska + Lora), display weights, role-based usage, spacing rhythm, and interface elements. |

---

### 3. Backend, DevOps & Growth

| Concept | Type | Verified | Summary |
| :--- | :--- | :--- | :--- |
| [SUPABASE_BACKEND.md](./SUPABASE_BACKEND.md) | `Database Architecture` | `human:lead-dev` | Supabase database schema, migration steps, Row Level Security policies, storage buckets, and auth bootstrap. |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | `Operations Playbook` | `human:lead-dev` | Production and preview deployment setup, environment variable configuration, and custom domain routing. |
| [SEO_AUDIT_AND_MARKETING.md](./SEO_AUDIT_AND_MARKETING.md) | `Growth Strategy` | `human:growth-lead` | Search engine optimization, structured JSON-LD schemas, static metadata generation, and local discovery plan. |

---

## Progressive Disclosure for AI Coding Agents

When working on features or bug fixes in this repository:
1. First read this index (`docs/index.md`) to identify the specific domain concepts relevant to your task.
2. Load **only** the necessary concept documents into your context window.
3. Consult the [update log](./log.md) for recent architectural or brand decisions.
