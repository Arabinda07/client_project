# Feature Specification: [Feature Name]

> **Feature ID:** `specs/[NNN]-[feature-slug]`  
> **Status:** Draft | In Review | Approved | Implemented  
> **Owner:** [Author Name / Agent]  
> **Last Updated:** [YYYY-MM-DD]

---

## 1. Executive Summary & Intent

*Briefly describe what this feature is, why it is needed, and the value it delivers to goonjaa customers or studio operations.*

---

## 2. User Stories & Scenarios

### User Story 1: [Title]
* **As a:** [Customer / Studio Artisan / Site Admin]
* **I want to:** [perform specific action]
* **So that:** [achieve desired outcome]
* **Scenario / Flow:**
  1. User navigates to...
  2. System presents...
  3. User triggers...

---

## 3. Requirements & Invariants

### 3.1 Functional Requirements
- [ ] **FR-1:** [Requirement description]
- [ ] **FR-2:** [Requirement description]

### 3.2 Non-Functional Requirements (Performance, Security, A11y)
- [ ] **NFR-1:** Response times / render performance within standard limits.
- [ ] **NFR-2:** Respects Row Level Security (RLS) policies.
- [ ] **NFR-3:** Screen reader accessibility and keyboard navigation supported.

### 3.3 Constitution Alignment Checklist
- [ ] Uses strictly lowercase `goonjaa` in all copy.
- [ ] Preserves existing routing structure and checkout flow.
- [ ] Aligns with slow-craft earthen brand values (no generic hype/factory jargon).

---

## 4. Edge Cases & Error Handling

* **Edge Case 1:** [e.g., Network failure during Supabase query] -> [Expected behavior / UI fallback]
* **Edge Case 2:** [e.g., Empty catalog state] -> [Expected behavior / UI message]

---

## 5. Acceptance Criteria

- [ ] Given [precondition], when [action], then [outcome].
- [ ] `npm run build` succeeds without type errors.
