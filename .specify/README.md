# Spec-Kit Harness for goonjaa

This directory contains the system configuration, governing principles, and standardized templates for **Spec-Driven Development (SDD)** in the `goonjaa` repository.

## Directory Layout

```
.specify/
├── memory/
│   └── constitution.md     # The supreme governing rulebook and invariants
├── templates/
│   ├── spec.template.md    # Template for feature requirements
│   ├── plan.template.md    # Template for technical design
│   └── tasks.template.md   # Template for ordered execution tasks
└── README.md               # This guide
```

## How to Work with Spec-Kit

Whenever you build a new feature, fix a complex bug, or execute an architectural change:

1. **Check the Constitution First:**
   Read [.specify/memory/constitution.md](./memory/constitution.md) to understand non-negotiable brand truths, styling rules, Supabase RLS policies, and code standards.

2. **Create a Feature Directory in `specs/`:**
   ```bash
   mkdir -p specs/NNN-feature-name
   ```

3. **Fill Out the 3 Core Documents:**
   * Copy `spec.template.md` to `specs/NNN-feature-name/spec.md` and define what and why.
   * Copy `plan.template.md` to `specs/NNN-feature-name/plan.md` and design the technical solution.
   * Copy `tasks.template.md` to `specs/NNN-feature-name/tasks.md` and list executable steps.

4. **Implement & Converge:**
   * Work through tasks sequentially.
   * Check off tasks as they pass verification.
   * Run `npm run build` to ensure typecheck and bundling pass cleanly.
