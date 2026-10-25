# VAURAL Contact and SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a high-conversion WhatsApp entry point, give the plans section more hierarchy, and complete the MVP’s SEO, metadata, accessibility, crawler, and bundle safeguards.

**Architecture:** Keep the existing App Router and typed service data. Add a server-rendered global WhatsApp anchor, file-based Next metadata assets, a small JSON-LD server component, and a custom 404. Use existing CSS variables and no new client library; measure the compiled chunks after the production build.

**Tech Stack:** Next.js App Router, TypeScript, `next/og`, React server components, CSS, Vitest, Testing Library, Playwright.

## Global Constraints

- Preserve the graphite/silver visual language; green is reserved for WhatsApp actions.
- Do not add Vite or an icon package.
- Use the exact WhatsApp message `Hola, quiero consultar por los servicios de VAURAL`.
- Keep public prices out of the site and preserve the existing quote flow.
- Use `https://jesusvenialgo.com` only as the existing portfolio reference; no private data belongs in metadata.
- Keep `index.html` unmodified and uncommitted.

### Task 1: Add the floating WhatsApp conversion link

**Files:**
- Modify: `src/data/site.ts`
- Modify: `src/lib/whatsapp.ts`
- Create: `src/components/whatsapp/FloatingWhatsApp.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Test: `src/lib/whatsapp.test.ts`
- Test: `tests/e2e/whatsapp-flow.spec.ts`

**Interfaces:**
- `buildWhatsAppQuickUrl(phoneNumber: string, message: string): string` returns a normalized `https://wa.me/<digits>?text=<encoded>` URL.
- `FloatingWhatsApp` renders an anchor with an accessible label, an inline SVG icon, and the configured public number.

- [ ] **Step 1: Test the quick URL helper**

Assert that the helper normalizes `+595 992 396 700` and encodes the exact approved message.

- [ ] **Step 2: Implement the helper and component**

Use the existing `NEXT_PUBLIC_WHATSAPP_NUMBER` with the known VAURAL number as the local fallback. Render the anchor globally inside `layout.tsx` so it also appears on service detail pages.

- [ ] **Step 3: Style desktop and mobile states**

Use a fixed pill on wide screens and a circular icon button below 540px. Include visible focus styles, `aria-label`, `title`, and no external image or dependency.

- [ ] **Step 4: Verify the browser URL**

Extend the Playwright flow to assert the exact WhatsApp link and encoded message.

### Task 2: Give Plans stronger hierarchy and spacing

**Files:**
- Modify: `src/app/globals.css`
- Test: `tests/e2e/whatsapp-flow.spec.ts`

**Interfaces:**
- Existing `#planes-web`, `ServiceGrid`, and `SelectionSummary` remain the section contract.

- [ ] **Step 1: Add the visual panel treatment**

Add a restrained radial/linear background, top and bottom borders, more heading separation, larger grid gap, and extra space before the selection summary.

- [ ] **Step 2: Preserve responsive behavior**

Keep five columns on wide desktop, two columns with a centered final card on tablet, and one column on mobile. Reduce panel padding at the 540px breakpoint.

- [ ] **Step 3: Verify layout behavior**

Assert the five cards remain present at mobile width and the document has no horizontal overflow.

### Task 3: Complete page metadata, structured data, and crawl assets

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/servicios/[slug]/page.tsx`
- Modify: `src/app/robots.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/globals.css`
- Modify: `next.config.ts`
- Create: `src/components/seo/StructuredData.tsx`
- Create: `src/app/icon.svg`
- Create: `src/app/opengraph-image.tsx`
- Create: `src/app/not-found.tsx`
- Create: `public/llms.txt`
- Test: `src/app/seo.test.ts`

**Interfaces:**
- `StructuredData` emits a `ProfessionalService`/`OfferCatalog` JSON-LD block from `siteConfig` and typed services.
- Service pages continue to expose exactly one visible `h1` and add `Service` JSON-LD.
- File-based assets resolve at `/icon.svg`, `/opengraph-image`, `/404`, and `/llms.txt`.

- [ ] **Step 1: Add root metadata**

Set canonical `/`, explicit Open Graph/Twitter image, locale, favicon reference, and the existing Spanish description. Keep `lang="es"`.

- [ ] **Step 2: Add OG image and favicon**

Generate a 1200×630 VAURAL image using `next/og` and create a small graphite/silver SVG icon.

- [ ] **Step 3: Add structured data**

Render business/service catalog JSON-LD on the root and service JSON-LD on detail pages, using only public service data.

- [ ] **Step 4: Add crawl and error assets**

Keep robots open, include sitemap URL, create a custom 404 with one `h1`, and publish a concise Spanish `llms.txt` with canonical project links.

- [ ] **Step 5: Make source-map behavior explicit**

Set `productionBrowserSourceMaps: false` and verify the production output has no browser `.map` files.

- [ ] **Step 6: Test metadata outputs**

Render the metadata/structured-data components and assert canonical, image, language, one `h1` contract, and JSON-LD contents.

### Task 4: Audit output and verify the release

**Files:**
- No source changes expected beyond test adjustments.

- [ ] **Step 1: Run quality checks**

Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, and `npm run test:e2e`.

- [ ] **Step 2: Check source, routes, and chunks**

Request the rendered home page and confirm the response contains visible VAURAL text. Request `/404`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/opengraph-image`. List `.next/static/chunks` sizes and report the largest JavaScript chunks; do not add an analyzer dependency for this MVP.

- [ ] **Step 3: Commit the implementation**

```bash
git add src public next.config.ts tests/e2e/whatsapp-flow.spec.ts docs/superpowers/specs/2026-10-25-vaural-contact-seo-design.md docs/superpowers/plans/2026-10-25-vaural-contact-seo.md
git commit -m "feat: add WhatsApp CTA and SEO foundation"
```
