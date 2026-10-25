# VAURAL MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the current VAURAL prototype into a maintainable Next.js site with an editorial hero, a multi-select service catalog, a brief quote form, and personalized WhatsApp handoff.

**Architecture:** Use a Next.js App Router application with typed local service data, small presentational components, a client-side selection provider, and pure utilities for WhatsApp message generation. Keep the data contract independent from the UI so the local source can later be replaced by Supabase or a CMS.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Motion for React, optional GSAP for the hero only, Vitest, React Testing Library, Playwright, Vercel.

## Global Constraints

- Do not expose service or package prices in the public MVP.
- Use `NEXT_PUBLIC_WHATSAPP_NUMBER=595992396700` for the public WhatsApp destination.
- Let visitors select and combine multiple services before contacting VAURAL.
- The form must collect name, selected services, project objective, and optional business/email fields.
- The WhatsApp message must be generated from the current selection and form values; never invent price or availability data.
- Preserve the graphite, blue-gray, white, and silver visual identity.
- Use progressive, purposeful animation and support `prefers-reduced-motion`.
- Keep `index.html` as a reference until the Next.js migration is reviewed; do not delete it in the MVP scaffold task.
- Do not add payments, authentication, inventory, CRM, or an admin panel to this MVP.
- Use Node.js 20.9+ as the local development baseline.
- Run lint, typecheck, unit tests, production build, and the WhatsApp flow smoke test before declaring the MVP complete.

## File Map

The implementation will create the following focused units:

- `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts`, `eslint.config.mjs`: application and tooling configuration.
- `.env.example`: documented public runtime variable names without secrets.
- `src/app/layout.tsx`: global metadata, fonts, providers, and document shell.
- `src/app/page.tsx`: composition of the landing page sections.
- `src/app/servicios/[slug]/page.tsx`: statically generated service detail routes.
- `src/app/sitemap.ts`, `src/app/robots.ts`: crawl metadata.
- `src/app/globals.css`: design tokens, base styles, reduced-motion fallback, and only the CSS that cannot be expressed cleanly with utility classes.
- `src/types/service.ts`: domain types for services and selection items.
- `src/data/services.ts`: local MVP service catalog and lookup functions.
- `src/data/site.ts`: site copy, navigation, and business metadata.
- `src/lib/whatsapp.ts`: pure WhatsApp URL and message builders.
- `src/components/providers/SelectionProvider.tsx`: client-side multi-service selection state.
- `src/components/navigation/SiteHeader.tsx`: sticky navigation and mobile navigation behavior.
- `src/components/hero/Hero.tsx`: editorial hero, entrance sequence, and reduced-motion behavior.
- `src/components/catalog/ServiceCard.tsx`, `ServiceGrid.tsx`, `SelectionSummary.tsx`: catalog presentation and selected-service summary.
- `src/components/quote/QuoteForm.tsx`: brief validated contact form.
- `src/components/whatsapp/WhatsAppLink.tsx`: conversion CTA that uses the message builder.
- `src/components/sections/ProcessSection.tsx`, `AboutSection.tsx`, `ContactSection.tsx`: non-catalog landing sections.
- `src/lib/whatsapp.test.ts`, `src/data/services.test.ts`: deterministic unit tests.
- `tests/e2e/whatsapp-flow.spec.ts`: browser-level selection and WhatsApp URL smoke test.
- `playwright.config.ts`, `vitest.config.ts`: test configuration.

---

### Task 1: Scaffold the Next.js application without removing the prototype

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `.env.example`
- Create: `src/app/globals.css`
- Keep unchanged: `index.html`

**Interfaces:**
- Produces the Next.js runtime and test commands consumed by every later task.
- Provides `NEXT_PUBLIC_WHATSAPP_NUMBER` as the only required MVP environment variable.

- [ ] **Step 1: Create the package manifest and scripts**

```json
{
  "name": "vaural",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "motion": "latest"
  },
  "devDependencies": {
    "@playwright/test": "latest",
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@testing-library/user-event": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "autoprefixer": "latest",
    "eslint": "latest",
    "eslint-config-next": "latest",
    "jsdom": "latest",
    "postcss": "latest",
    "tailwindcss": "latest",
    "typescript": "latest",
    "vitest": "latest"
  }
}
```

- [ ] **Step 2: Add the TypeScript, Next.js, PostCSS, Tailwind, ESLint, Vitest, and Playwright configuration**

Use strict TypeScript, the `@/*` alias mapped to `src/*`, jsdom for component/unit tests, and a Playwright web server that runs `npm run dev` on port `3000`. Use the flat ESLint configuration so the lint command works with current Next.js versions:

```js
import nextVitals from "eslint-config-next/core-web-vitals";

export default [
  ...nextVitals,
  {
    ignores: [".next/**", "node_modules/**", "playwright-report/**", "test-results/**"],
  },
];
```

- [ ] **Step 3: Add the environment example**

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=595992396700
```

- [ ] **Step 4: Add the initial global stylesheet**

Define the graphite/silver tokens, base background, focus-visible outline, selection color, and this reduced-motion fallback:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 5: Install dependencies and verify the scaffold**

Run:

```bash
npm install
npm run typecheck
npm run lint
```

Expected: dependency installation completes; typecheck and lint report no source errors. The app may still have no route until Task 3.

- [ ] **Step 6: Commit the scaffold**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs tailwind.config.ts eslint.config.mjs vitest.config.ts playwright.config.ts .env.example src/app/globals.css
git commit -m "chore: scaffold VAURAL Next.js app"
```

---

### Task 2: Define typed service data and WhatsApp message utilities

**Files:**
- Create: `src/types/service.ts`
- Create: `src/data/services.ts`
- Create: `src/data/site.ts`
- Create: `src/lib/whatsapp.ts`
- Test: `src/data/services.test.ts`
- Test: `src/lib/whatsapp.test.ts`

**Interfaces:**
- `Service` contains `id`, `slug`, `title`, `category`, `shortDescription`, `description`, `includes`, `deliverables`, optional `featured`, and `order`.
- `getServices(): Service[]` returns the ordered local catalog.
- `getServiceBySlug(slug: string): Service | undefined` resolves a detail route.
- `buildWhatsAppMessage(input: WhatsAppMessageInput): string` returns plain text.
- `buildWhatsAppUrl(input: WhatsAppMessageInput): string` returns an encoded `https://wa.me/...` URL.

- [ ] **Step 1: Write failing tests for service lookup**

```ts
import { describe, expect, it } from "vitest";
import { getServiceBySlug, getServices } from "./services";

describe("service catalog", () => {
  it("returns services in presentation order", () => {
    const services = getServices();
    expect(services.length).toBeGreaterThan(0);
    expect(services.map((service) => service.order)).toEqual(
      [...services].map((service) => service.order).sort((a, b) => a - b),
    );
  });

  it("resolves a service by slug", () => {
    expect(getServiceBySlug("web-informativa")?.title).toBe("Web informativa");
    expect(getServiceBySlug("no-existe")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Write failing tests for WhatsApp message generation**

```ts
import { describe, expect, it } from "vitest";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "./whatsapp";

const input = {
  phoneNumber: "595992396700",
  name: "Ana",
  business: "Estudio Norte",
  email: "ana@example.com",
  objective: "Necesito presentar mis servicios.",
  services: ["Web informativa", "Catálogo digital"],
};

describe("WhatsApp utilities", () => {
  it("includes the selected services and form data", () => {
    const message = buildWhatsAppMessage(input);
    expect(message).toContain("Ana");
    expect(message).toContain("Estudio Norte");
    expect(message).toContain("Web informativa");
    expect(message).toContain("Catálogo digital");
    expect(message).toContain("Necesito presentar mis servicios.");
    expect(message).not.toContain("$0");
  });

  it("returns an encoded WhatsApp URL", () => {
    const url = buildWhatsAppUrl(input);
    expect(url.startsWith("https://wa.me/595992396700?text=")).toBe(true);
    expect(url).toContain(encodeURIComponent("Web informativa"));
  });
});
```

- [ ] **Step 3: Run the focused tests and verify they fail for missing modules**

Run:

```bash
npm test -- src/data/services.test.ts src/lib/whatsapp.test.ts
```

Expected: FAIL because the domain modules do not exist yet.

- [ ] **Step 4: Implement the types and local catalog**

Create the approved services and plans with no public price fields. Keep all Spanish copy in the data layer, not inside reusable cards.

- [ ] **Step 5: Implement the pure WhatsApp utilities**

Normalize the phone number to digits, trim optional values, list selected services with one item per line, and encode the final message using `encodeURIComponent`.

- [ ] **Step 6: Run the focused tests**

Run:

```bash
npm test -- src/data/services.test.ts src/lib/whatsapp.test.ts
```

Expected: PASS for all catalog and WhatsApp tests.

- [ ] **Step 7: Commit the domain layer**

```bash
git add src/types/service.ts src/data/services.ts src/data/site.ts src/lib/whatsapp.ts src/data/services.test.ts src/lib/whatsapp.test.ts
git commit -m "feat: add VAURAL service catalog and WhatsApp builder"
```

---

### Task 3: Build the application shell and shared visual system

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/components/providers/SelectionProvider.tsx`
- Create: `src/components/navigation/SiteHeader.tsx`
- Create: `src/components/sections/AboutSection.tsx`
- Create: `src/components/sections/ProcessSection.tsx`
- Create: `src/components/sections/ContactSection.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- `SelectionProvider` exposes `selectedIds`, `toggleService(id)`, `clearSelection()`, and `selectedServices`.
- `SiteHeader` consumes navigation data from `src/data/site.ts`.
- `page.tsx` composes the hero, catalog, selection summary, quote form, process, and contact sections without embedding catalog copy.

- [ ] **Step 1: Write the selection provider test**

Test that toggling a service adds it once, toggling it again removes it, and clearing removes all selections. Use a small test consumer component rather than testing implementation details.

- [ ] **Step 2: Run the provider test and verify it fails**

Run:

```bash
npm test -- src/components/providers/SelectionProvider.test.tsx
```

Expected: FAIL because the provider and test consumer do not exist.

- [ ] **Step 3: Implement the provider and shared layout**

Use a client provider only around interactive catalog/form content. Keep `layout.tsx` server-rendered, load the selected brand font through `next/font`, and add `lang="es"` plus default metadata.

- [ ] **Step 4: Implement the static landing sections**

Create semantic sections with stable IDs: `inicio`, `servicios`, `planes-web`, `nosotros`, `proceso`, and `contacto`. Preserve the approved VAURAL Spanish content and do not include prices.

- [ ] **Step 5: Implement the graphite/silver design tokens and responsive primitives**

Add container widths, type scale, section spacing, silver borders, focus states, and mobile breakpoints in `globals.css`. Keep custom CSS limited to visual patterns that are reused or not practical as utilities.

- [ ] **Step 6: Run checks and view the shell**

Run:

```bash
npm test -- src/components/providers/SelectionProvider.test.tsx
npm run typecheck
npm run lint
npm run dev
```

Expected: provider test, typecheck, and lint pass; the browser shows a navigable shell with placeholder hero/catalog slots.

- [ ] **Step 7: Commit the application shell**

```bash
git add src/app/layout.tsx src/app/page.tsx src/app/globals.css src/components/providers src/components/navigation src/components/sections
git commit -m "feat: add VAURAL application shell"
```

---

### Task 4: Implement the editorial hero and navigation motion

**Files:**
- Create: `src/components/hero/Hero.tsx`
- Modify: `src/components/navigation/SiteHeader.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- `Hero` renders the VAURAL value proposition and accepts no catalog state.
- `SiteHeader` provides anchor navigation and a primary CTA to `#contacto`.

- [ ] **Step 1: Add the hero acceptance checklist as a browser test fixture**

The test must assert that `VAURAL`, the Spanish value proposition, the `Hablemos de tu proyecto` CTA, and the navigation anchors are present in the rendered page.

- [ ] **Step 2: Implement the static hero markup**

Use layered elements for the editorial background, guide lines, metadata, central brand, tagline, description, and CTAs. Keep decorative layers `aria-hidden="true"`.

- [ ] **Step 3: Add Motion entrance variants**

Use a parent stagger with these order: media/atmosphere, header, side metadata, kicker, brand, tagline, description, actions. Every animated group must have a reduced-motion path that renders immediately.

- [ ] **Step 4: Add optional GSAP only if the Motion implementation cannot reproduce the hero timeline**

If GSAP is needed, load it only in the client hero component and use one scoped timeline. Do not add a perpetual animation loop.

- [ ] **Step 5: Test desktop and mobile hero behavior**

Verify the nav collapses, the decorative layers do not overlap text, the CTA remains reachable, and the page remains usable at 320px width.

- [ ] **Step 6: Commit the hero**

```bash
git add src/components/hero/Hero.tsx src/components/navigation/SiteHeader.tsx src/app/page.tsx src/app/globals.css
git commit -m "feat: add VAURAL editorial hero"
```

---

### Task 5: Build the multi-service catalog and selection summary

**Files:**
- Create: `src/components/catalog/ServiceCard.tsx`
- Create: `src/components/catalog/ServiceGrid.tsx`
- Create: `src/components/catalog/SelectionSummary.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- `ServiceCard` accepts `service: Service`, `selected: boolean`, and `onToggle: (id: string) => void`.
- `ServiceGrid` consumes `services: Service[]` and renders ordered cards.
- `SelectionSummary` consumes `selectedServices: Service[]`, exposes clear/remove actions, and renders the next CTA.

- [ ] **Step 1: Write component tests for selection behavior**

Cover: unselected card shows a selection action; clicking it adds the card to the summary; clicking a second card keeps both; removing one leaves the other; an empty summary explains how to begin.

- [ ] **Step 2: Run the component tests and verify they fail**

Run:

```bash
npm test -- src/components/catalog
```

Expected: FAIL because the catalog components do not exist.

- [ ] **Step 3: Implement accessible service cards**

Use a real button for selection, `aria-pressed` for state, visible focus, service title, short description, included items, and a detail link. Never show price placeholders.

- [ ] **Step 4: Implement the responsive grid and selection summary**

Use one column on small screens, two on medium screens, and three on wide screens. Keep the selected summary visible near the catalog CTA on desktop and naturally stacked on mobile.

- [ ] **Step 5: Run component tests and typecheck**

Run:

```bash
npm test -- src/components/catalog
npm run typecheck
```

Expected: all catalog tests pass and TypeScript reports no errors.

- [ ] **Step 6: Commit the catalog**

```bash
git add src/components/catalog src/app/page.tsx src/app/globals.css
git commit -m "feat: add multi-service VAURAL catalog"
```

---

### Task 6: Implement the brief quote form and WhatsApp handoff

**Files:**
- Create: `src/components/quote/QuoteForm.tsx`
- Create: `src/components/whatsapp/WhatsAppLink.tsx`
- Modify: `src/components/catalog/SelectionSummary.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/lib/whatsapp.ts`
- Modify: `src/app/globals.css`

**Interfaces:**
- `QuoteForm` accepts `selectedServices: Service[]` and calls `onSuccess()` after opening the WhatsApp URL.
- `WhatsAppLink` accepts `messageInput: WhatsAppMessageInput` and renders an anchor with `target="_blank"`, `rel="noreferrer"`, and an accessible label.
- The form must use the public runtime value `process.env.NEXT_PUBLIC_WHATSAPP_NUMBER` and show a clear configuration message if it is missing.

- [ ] **Step 1: Write form validation tests**

Cover: empty name fails; no selected service fails; empty objective fails; optional business and email do not block submission; valid data produces a WhatsApp URL containing all selected services.

- [ ] **Step 2: Run the form tests and verify they fail**

Run:

```bash
npm test -- src/components/quote src/components/whatsapp
```

Expected: FAIL because the form and conversion components do not exist.

- [ ] **Step 3: Implement the form with native accessible controls**

Use labels, `aria-describedby` for validation messages, a visible selected-services list, and a concise project objective textarea. Do not require an account or payment information.

- [ ] **Step 4: Connect the submit handler to the pure message builder**

Trim input values, pass selected service titles, build the message, and open the URL. Preserve the user’s entered values if the URL cannot be opened.

- [ ] **Step 5: Run focused tests and manual interaction checks**

Run:

```bash
npm test -- src/lib/whatsapp.test.ts src/components/quote src/components/whatsapp
npm run typecheck
```

Manual check: select two services, submit the form, and verify that the WhatsApp URL contains both names, the user’s objective, and no price text.

- [ ] **Step 6: Commit the quote flow**

```bash
git add src/components/quote src/components/whatsapp src/components/catalog/SelectionSummary.tsx src/app/page.tsx src/lib/whatsapp.ts src/app/globals.css
git commit -m "feat: add quote form and WhatsApp conversion flow"
```

---

### Task 7: Add service detail routes and SEO metadata

**Files:**
- Create: `src/app/servicios/[slug]/page.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/data/site.ts`
- Modify: `src/app/globals.css`

**Interfaces:**
- `generateStaticParams()` returns every service slug from `getServices()`.
- Detail pages call `getServiceBySlug(slug)` and return `notFound()` for unknown slugs.
- `generateMetadata()` returns Spanish title, description, canonical path, and Open Graph values.

- [ ] **Step 1: Write route behavior tests**

Cover: every known slug is included in generated params; a known slug renders title and included items; an unknown slug returns the Next.js not-found response.

- [ ] **Step 2: Implement static service pages**

Render the same service data used by cards, include a selection CTA, and link back to the main catalog. Do not duplicate service copy in the route component.

- [ ] **Step 3: Add metadata and crawl files**

Use the VAURAL site name, Spanish descriptions, `/servicios/[slug]` URLs, and a production site URL from `NEXT_PUBLIC_SITE_URL` when available. Keep the local fallback valid for development.

- [ ] **Step 4: Run build and route tests**

Run:

```bash
npm test -- src/app
npm run typecheck
npm run build
```

Expected: all static service routes compile and the production build exits successfully.

- [ ] **Step 5: Commit service routes and SEO**

```bash
git add src/app/servicios src/app/sitemap.ts src/app/robots.ts src/app/layout.tsx src/data/site.ts src/app/globals.css
git commit -m "feat: add service detail routes and SEO metadata"
```

---

### Task 8: Add end-to-end conversion coverage and deployment readiness

**Files:**
- Create: `tests/e2e/whatsapp-flow.spec.ts`
- Modify: `playwright.config.ts`
- Modify: `package.json`
- Modify: `.env.example`
- Modify: `CLAUDE.md`
- Modify: `CODEX.md`

**Interfaces:**
- The browser test starts at `/`, selects at least two services, fills the brief form, and verifies the generated WhatsApp destination without sending a real message.

- [ ] **Step 1: Write the failing browser test**

```ts
import { expect, test } from "@playwright/test";

test("combines services and prepares a WhatsApp consultation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /seleccionar web informativa/i }).click();
  await page.getByRole("button", { name: /seleccionar catálogo digital/i }).click();
  await page.getByLabel("Nombre").fill("Ana");
  await page.getByLabel("Objetivo del proyecto").fill("Quiero mejorar la presencia digital de mi negocio.");

  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("button", { name: /continuar por whatsapp/i }).click();
  const popup = await popupPromise;

  await expect(popup).toHaveURL(/wa\.me\/595992396700/);
  await expect(popup).toHaveURL(/Web%20informativa/);
  await expect(popup).toHaveURL(/Cat%C3%A1logo/);
});
```

- [ ] **Step 2: Run the browser test and verify it fails before final wiring**

Run:

```bash
npm run test:e2e -- tests/e2e/whatsapp-flow.spec.ts
```

Expected: FAIL only if a preceding catalog/form task is incomplete; do not mark the task complete until the full flow passes.

- [ ] **Step 3: Make selectors stable and accessible**

Use visible Spanish labels and accessible names rather than CSS selectors tied to layout. Ensure the popup test can inspect the encoded URL without sending a real WhatsApp message.

- [ ] **Step 4: Run the full quality gate**

Run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Expected: all commands pass with no public price text and no missing environment configuration in the local `.env.local`.

- [ ] **Step 5: Update agent guidance with the implemented commands**

Add the actual setup, test, and deployment commands to `CLAUDE.md` and `CODEX.md` after verifying them locally. Keep the MVP constraints unchanged.

- [ ] **Step 6: Commit deployment readiness**

```bash
git add tests/e2e/whatsapp-flow.spec.ts playwright.config.ts package.json .env.example CLAUDE.md CODEX.md
git commit -m "test: verify VAURAL conversion flow"
```

## Self-review checklist

- [x] The plan covers the approved Next.js, TypeScript, Tailwind, Motion, Vercel, and local-data architecture.
- [x] The plan covers the multi-service selection requirement.
- [x] The plan covers a brief form and dynamic WhatsApp message generation.
- [x] The plan explicitly keeps prices private in the MVP.
- [x] The plan covers accessibility, reduced motion, responsive behavior, performance, SEO, and deployment.
- [x] The plan preserves the existing `index.html` as a reference instead of deleting it during scaffolding.
- [x] The plan has no `TODO`, `TBD`, or vague validation-only tasks.
