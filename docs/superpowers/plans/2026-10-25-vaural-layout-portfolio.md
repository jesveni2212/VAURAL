# VAURAL Layout and Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebalance the VAURAL service catalog, make the Plans and Process anchors useful, and add a compact portfolio showcase.

**Architecture:** Keep the existing static data and component boundaries. The home page will use the existing `ServiceGrid` once inside the real `#planes-web` section; CSS will control the compact desktop/tablet/mobile layouts without adding a carousel or new dependency. `AboutSection` will own the external portfolio card.

**Tech Stack:** Next.js App Router, TypeScript, React, CSS in `src/app/globals.css`, Vitest, Testing Library, Playwright.

## Global Constraints

- Preserve the graphite/silver VAURAL visual language.
- Do not add public prices or new runtime dependencies.
- Keep multi-service selection and WhatsApp conversion behavior unchanged.
- Use `https://jesusvenialgo.com` as the portfolio URL and open it in a new tab with safe `rel` attributes.
- Keep the existing `index.html` prototype unmodified and uncommitted.

### Task 1: Make the home page anchors and plans section concrete

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/e2e/whatsapp-flow.spec.ts`

**Interfaces:**
- `ServiceGrid` and `SelectionSummary` remain the catalog UI consumed by the home page.
- `#servicios` remains the service introduction anchor; `#planes-web` becomes the service catalog anchor.
- `#proceso` remains the process section anchor and receives sticky-header scroll spacing.

- [ ] **Step 1: Update the home page structure**

Keep the introductory `#servicios` section, remove the empty plans section, and add the catalog to a compact `#planes-web` section with the heading “Nuestros planes web” and the existing `ServiceGrid` plus `SelectionSummary`.

- [ ] **Step 2: Add anchor spacing**

Add `scroll-margin-top` for page section IDs so sticky navigation does not cover the section heading.

- [ ] **Step 3: Extend the browser flow assertions**

Assert that the Plans and Process navigation links target `#planes-web` and `#proceso`, and that `#planes-web` contains the five service cards.

- [ ] **Step 4: Run the focused test**

Run: `npx playwright test tests/e2e/whatsapp-flow.spec.ts`

Expected: PASS with the selection and navigation assertions.

### Task 2: Compact the service catalog responsively

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/catalog/ServiceCard.tsx`

**Interfaces:**
- `ServiceCard` keeps the existing `ServiceCardProps` and selection button accessible names.
- The card keeps the detail link and selection button in the footer.

- [ ] **Step 1: Make desktop cards five equal columns**

Use five equal columns at the wide breakpoint, reduce card padding/icon spacing, and constrain type sizes so all five cards read as one compact set.

- [ ] **Step 2: Define tablet and mobile behavior**

Use two columns below the wide breakpoint, center the final card on tablet, and switch to one column below 540px. Keep action controls large enough for touch and preserve readable line lengths.

- [ ] **Step 3: Verify responsive styles**

Run: `npm run lint`

Expected: PASS with no CSS or JSX lint errors.

### Task 3: Add portfolio showcase to About

**Files:**
- Modify: `src/components/sections/AboutSection.tsx`
- Modify: `src/app/globals.css`
- Create: `src/components/sections/AboutSection.test.tsx`

**Interfaces:**
- `AboutSection` remains a server component and exposes a standard external anchor.
- The portfolio card uses `href="https://jesusvenialgo.com"`, `target="_blank"`, and `rel="noreferrer"`.

- [ ] **Step 1: Add the portfolio card**

Render a “Proyecto destacado” card after the values list with a short explanation that it is a portfolio example and a visible `jesusvenialgo.com ↗` link.

- [ ] **Step 2: Style the card**

Use the existing border, silver accent, graphite background, and hover lift. At mobile widths let the card remain full width without horizontal overflow.

- [ ] **Step 3: Test the external link**

Render `AboutSection` and assert the visible link has the exact URL, new-tab target, and safe `rel` value.

- [ ] **Step 4: Run the focused unit test**

Run: `npx vitest run src/components/sections/AboutSection.test.tsx`

Expected: PASS.

### Task 4: Verify the complete frontend

**Files:**
- No source changes expected.

- [ ] **Step 1: Run unit tests**

Run: `npm test`

Expected: all existing and new tests pass.

- [ ] **Step 2: Run typecheck and production build**

Run: `npm run typecheck`

Expected: PASS.

Run: `npm run build`

Expected: PASS with the home page and service detail routes generated.

- [ ] **Step 3: Review the local page**

Open `http://localhost:3000`, check desktop and mobile widths, activate the Plans and Process links, and confirm the portfolio card opens the requested domain in a new tab.

- [ ] **Step 4: Commit the implementation**

```bash
git add src/app/page.tsx src/app/globals.css src/components/catalog/ServiceCard.tsx src/components/sections/AboutSection.tsx src/components/sections/AboutSection.test.tsx tests/e2e/whatsapp-flow.spec.ts docs/superpowers/specs/2026-10-25-vaural-layout-portfolio-design.md docs/superpowers/plans/2026-10-25-vaural-layout-portfolio.md
git commit -m "feat: rebalance catalog and add portfolio showcase"
```
