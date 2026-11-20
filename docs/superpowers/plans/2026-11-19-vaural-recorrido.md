# VAURAL Recorrido — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar la landing de VAURAL por el diseño "Recorrido" blanco y negro con color por pilar e interacciones, conservando selección, formulario, WhatsApp y SEO.

**Architecture:** Composición en Server Components; islas cliente para barra, hero/recorrido, planes, formulario y tema. Acento global por variable CSS escrita desde `lib/accent.ts` (sin estado React). Motion reducido (`LazyMotion` + `m`) y Swiper cargado de forma diferida solo en el recorrido.

**Tech Stack:** Next.js 16.4.3 (App Router), React 19.3, TypeScript estricto, Tailwind CSS 4, motion 14.6, swiper ^14.4, Vitest + Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-19-vaural-redesign-design.md`

## Global Constraints

- Tema claro `#FAFAFA` / `#0A0A0A` / `#EFEFEF` / `#6B6B6B`; invertido `#0A0A0A` / `#FAFAFA` / `#161616` / `#9A9A9A`.
- Pilares y color: `asesoria #4D6BFF`, `web #C8F542`, `contenido #FF5FA2`, `marketing #FF8A2A`; texto sobre color siempre `#0A0A0A`.
- Curva `cubic-bezier(0.16, 1, 0.3, 1)`; autoplay del recorrido 3200 ms; umbral de barra compacta 24 px.
- Sin precios, sin cifras inventadas, sin correos inventados. Copys en español rioplatense (voseo), como el sitio actual.
- Sin `any`; sin dependencias nuevas salvo `swiper`.
- `prefers-reduced-motion`: sin autoplay, lente, marquesina, inercia ni entradas.
- No `git commit`/`push` sin orden del usuario (los pasos "Commit" quedan como puntos de control: se informa, no se ejecuta).

## Review Focus

1. Usuario con teclado: el foco en una fila de planes debe producir lo mismo que el hover (relleno, acento, contador) y el diálogo debe devolver el foco al cerrar.
2. Sin JavaScript o antes de que cargue Swiper: el hero muestra la primera pantalla y los enlaces de planes navegan a `/servicios/[slug]`.
3. `localStorage` bloqueado (modo privado): el tema no rompe la página.
4. Navegador sin `startViewTransition` (Firefox antiguo, jsdom): invertir tema cambia al instante.
5. Enlaces viejos `/servicios/web-informativa` y similares: redirección 308 al pilar correspondiente.

---

### Task 1: Base visual (dependencias, Tailwind 4, tokens, fuentes, tema)

**Files:**
- Modify: `package.json` (añadir `swiper`), `src/app/globals.css` (reescritura), `src/app/layout.tsx`
- Delete: `tailwind.config.ts`
- Create: `src/lib/theme.ts`, `src/lib/theme.test.ts`

**Interfaces:**
- Produces: tokens Tailwind `bg-bg text-fg bg-surface text-muted border-line bg-accent text-on-accent`, fuentes `font-serif font-sans font-mono`; `type Theme = "light" | "dark"`; `readStoredTheme(): Theme`; `applyTheme(theme: Theme): void` (pone `data-theme` en `<html>` y guarda); `toggleTheme(origin?: { x: number; y: number }): Theme`; `THEME_INIT_SCRIPT: string` (inline en `<head>`).

- [ ] Medir línea base: `npm run build` y anotar "First Load JS" de `/`.
- [ ] Test `theme.test.ts`: `applyTheme("dark")` pone `data-theme="dark"`; `toggleTheme()` sin `startViewTransition` alterna al instante; con `localStorage` que lanza excepción, `readStoredTheme()` devuelve `"light"`.
- [ ] Implementar `lib/theme.ts` (View Transition con `clip-path` circular desde `origin`; fallback directo).
- [ ] `globals.css`: `@import "tailwindcss"`, variables por `:root` y `[data-theme="dark"]`, `@theme inline` con colores y fuentes, base (selección, foco visible, scroll suave), keyframes (`marquee`, `spin`, `rise`), regla `prefers-reduced-motion`, reglas `::view-transition-*`.
- [ ] `layout.tsx`: Instrument Serif (400, normal+italic), Geist, Geist Mono con `variable`; `THEME_INIT_SCRIPT` en `<head>`; `suppressHydrationWarning` en `<html>`; metadata nueva ("Agencia digital").
- [ ] Verificar: `npm test -- theme`, `npm run typecheck`.

### Task 2: Datos de pilares, acento y redirecciones

**Files:**
- Modify: `src/types/service.ts`, `src/data/services.ts`, `src/data/site.ts`, `next.config.ts`, `src/data/services.test.ts`, `src/app/servicios/route.test.ts`
- Create: `src/lib/accent.ts`, `src/lib/accent.test.ts`, `src/components/services/pillar-theme.ts`

**Interfaces:**
- Produces: `type PillarId = "asesoria" | "web" | "contenido" | "marketing"`; `Service = { id: PillarId; slug: string; title: string; shortDescription: string; description: string; disciplines: string[]; includes: string[]; deliverables: string[]; order: number }`; `getServices()`, `getServiceBySlug()` (misma firma); `pillarAccent: Record<PillarId, string>`; `setBaseAccent(color: string)`, `previewAccent(color: string)`, `clearAccentPreview()`.

- [ ] Tests: `getServices().map(s => s.slug)` = `["asesoria-digital","paginas-web","contenido-para-redes","marketing-digital"]`; rutas estáticas = 4; metadata de `paginas-web` con canonical `/servicios/paginas-web`; sin "precio".
- [ ] Test `accent.test.ts`: `setBaseAccent("#4D6BFF")` → `--accent` = `#4D6BFF`; `previewAccent("#FF5FA2")` lo reemplaza; `clearAccentPreview()` vuelve a `#4D6BFF`.
- [ ] Implementar tipos, datos (copys nuevos de asesoría y marketing; web incluye catálogos/tiendas con pedidos por WhatsApp), `accent.ts`, `pillar-theme.ts`.
- [ ] `site.ts`: descripción de agencia (mantener "negocios en Paraguay"), navegación `Servicios #recorrido`, `Planes #planes`, `Contacto #contacto`.
- [ ] `next.config.ts`: `redirects()` permanentes de los 5 slugs viejos.
- [ ] Verificar: `npm test`, `npm run typecheck`.

### Task 3: Primitivas de movimiento

**Files:**
- Create: `src/components/motion/MotionProvider.tsx`, `Reveal.tsx`, `SplitWords.tsx`, `Magnetic.tsx`, `src/hooks/useFinePointer.ts`

**Interfaces:**
- Produces: `<MotionProvider>` (LazyMotion `domAnimation` strict + MotionConfig `reducedMotion="user"`); `<Reveal as? delay?>`; `<SplitWords text className? delay?>` (cada palabra `m.span`, texto accesible completo); `<Magnetic strength?>` (envuelve un hijo; resorte; inactivo con puntero grueso o movimiento reducido); `useFinePointer(): boolean`.

- [ ] Test: `SplitWords` renderiza el texto completo accesible (`getByText` del heading padre).
- [ ] Implementar; `MotionProvider` en `layout.tsx` envolviendo `SelectionProvider`.
- [ ] Verificar: `npm test`, `npm run typecheck`.

### Task 4: Barra, menú móvil y tema

**Files:**
- Create: `src/components/layout/SiteHeader.tsx`, `MobileMenu.tsx`, `ThemeToggle.tsx`, `src/components/ui/icons.tsx`
- Delete: `src/components/navigation/SiteHeader.tsx`

**Interfaces:**
- Consumes: `siteConfig.navigation`, `toggleTheme`, `Magnetic`, `VauralLogo`.
- Produces: `<SiteHeader />`; iconos `IconContrast`, `IconMenu`, `IconClose`, `IconArrow`, `IconCheck`, `IconCopy`.

- [ ] Test: el botón "Invertir colores" alterna `data-theme`; el botón "Menú" abre la navegación móvil con `aria-expanded="true"`.
- [ ] Implementar: `useScroll` + `useMotionValueEvent` → estado compacto a > 24 px; punto `bg-accent` animado; menú con `AnimatePresence` que se cierra al elegir enlace o con Escape.
- [ ] Verificar: `npm test`, `npm run typecheck`.

### Task 5: Hero "Recorrido" con Swiper y lente

**Files:**
- Modify: `package.json` (dep `swiper`)
- Create: `src/components/hero/HeroJourney.tsx`, `JourneySlider.tsx`, `JourneyScreens.tsx`, `CursorLens.tsx`, `src/components/hero/HeroJourney.test.tsx`
- Delete: `src/components/hero/Hero.tsx`, `Hero.test.tsx`

**Interfaces:**
- Consumes: `getServices()`, `pillarAccent`, `setBaseAccent`, `SplitWords`, `Magnetic`.
- Produces: `<HeroJourney services={Service[]} />` (id de sección `recorrido`); `JourneySlider` props `{ active: number; onChange(i: number): void; onProgress(p: number): void; registerGoTo(fn: (i: number) => void): void }`; `JourneyScreen({ id: PillarId })`.

- [ ] Test: renderiza un `h1` con "De la idea al cliente."; muestra "Asesoría digital" al inicio; clic en la etapa "Web" muestra el título "Páginas web"; CTAs con `href` `#contacto` y `#planes`.
- [ ] Implementar `HeroJourney` (estado `active`, llama `setBaseAccent(pillarAccent[id])`, barra de etapas con `--progress` escrita por ref desde `onAutoplayTimeLeft`), `JourneySlider` vía `next/dynamic` `ssr:false` con fallback `JourneyScreen` activa, módulos Autoplay/Keyboard/A11y, `loop`, `pauseOnMouseEnter`; sin autoplay con movimiento reducido.
- [ ] `CursorLens`: `useMotionValue` + `useSpring`, `mix-blend-mode: difference`, solo si `useFinePointer()` y sin movimiento reducido.
- [ ] Órbitas decorativas `aria-hidden` con CSS.
- [ ] Verificar: `npm test`, `npm run typecheck`.

### Task 6: Cinta, planes interactivos y diálogo

**Files:**
- Create: `src/components/services/PillarBand.tsx`, `PlansIndex.tsx`, `PlanRow.tsx`, `PlanDialog.tsx`, `PlansIndex.test.tsx`
- Modify: `src/components/catalog/SelectionSummary.tsx` → mover a `src/components/services/SelectionSummary.tsx` (misma API)
- Delete: `src/components/catalog/*`, `src/components/sections/AboutSection*`, `ProcessSection.tsx`

**Interfaces:**
- Consumes: `useSelection()`, `pillarAccent`, `previewAccent`, `clearAccentPreview`.
- Produces: `<PlansIndex services={Service[]} />` (id `planes`); `<PlanDialog service open onClose onNext />`.

- [ ] Tests: botón "Seleccionar Páginas web" → `aria-pressed="true"` y resumen "Elegiste 1 servicio."; foco en una fila agrega la clase activa y actualiza el contador a `02`; clic en el título abre un `dialog` con "Incluye"; Escape lo cierra y el foco vuelve al título.
- [ ] Implementar filas (`--row-accent`, relleno `scaleX`, atenuado por `group`), contador, `PlanDialog` con `<dialog>` + `showModal`, "Siguiente plan".
- [ ] `PillarBand` servidor con marquesina CSS duplicada.
- [ ] Verificar: `npm test`, `npm run typecheck`.

### Task 7: Contacto, pie, página y rutas secundarias

**Files:**
- Create: `src/components/contact/ContactSection.tsx`, `CopyButton.tsx`, `src/components/layout/SiteFooter.tsx`
- Modify: `src/components/quote/QuoteForm.tsx` (solo clases), `src/components/whatsapp/FloatingWhatsApp.tsx` (clases), `src/app/page.tsx`, `src/app/servicios/[slug]/page.tsx`, `src/components/catalog/ServiceDetailActions.tsx` → `src/components/services/ServiceDetailActions.tsx`, `src/app/not-found.tsx`, `src/app/opengraph-image.tsx`, `src/app/llms.txt/route.ts`, `src/components/seo/StructuredData.tsx`, `src/app/seo.test.tsx`, `src/components/quote/QuoteForm.test.tsx`
- Delete: `src/components/sections/ContactSection.tsx`

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: `<CopyButton value label />` (usa `navigator.clipboard`, estado "Copiado" 2 s, fallback silencioso).

- [ ] Tests: SEO con sitemap = 5 entradas e `itemListElement` = 4; `CopyButton` llama `clipboard.writeText` con el número; `QuoteForm` mantiene sus validaciones (fixture con el nuevo `Service`).
- [ ] Implementar y componer `page.tsx`: `SiteHeader`, `main` (`HeroJourney`, `PillarBand`, `PlansIndex`, `ContactSection`), `SiteFooter`.
- [ ] Verificar: `npm test`, `npm run typecheck`, `npm run lint`.

### Task 8: Verificación final, e2e, Codex y documentación

**Files:**
- Modify: `tests/e2e/whatsapp-flow.spec.ts`, `CLAUDE.md`, `CODEX.md`
- Create: `docs/ERROR_LOG.md`, `docs/session-state.md`

- [ ] e2e: seleccionar "Páginas web" y "Marketing digital", completar formulario, el popup contiene ambos; en 390 px no hay desborde horizontal (`scrollWidth <= clientWidth`); `/servicios/web-informativa` redirige a `/servicios/paginas-web`.
- [ ] `npm run lint && npm run typecheck && npm test && npm run build && npm run test:e2e`; comparar First Load JS con la línea base.
- [ ] Revisión visual en el navegador (390, 768, 1280 px; tema claro e invertido; movimiento reducido).
- [ ] Codex solo lectura (`codex exec -m gpt-6-luna -c model_reasoning_effort=max -s read-only`); resolver o informar hallazgos.
- [ ] Actualizar `CLAUDE.md`/`CODEX.md` (stack, paleta, pilares), `ERROR_LOG.md` y `session-state.md`.
