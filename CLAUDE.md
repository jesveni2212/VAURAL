# VAURAL — Guía del proyecto

## Propósito

VAURAL es una agencia digital con cuatro pilares: asesoría digital, páginas web, contenido para redes y marketing digital. El sitio debe atrapar desde el primer segundo, responder a cada interacción con un detalle y convertir consultas en conversaciones por WhatsApp, siendo ligero y muy rápido.

## Estado actual

- Rediseño "Recorrido" (2026-11-19) implementado en la rama `redesign/recorrido`, sin commitear.
- Especificación vigente: `docs/superpowers/specs/2026-11-19-vaural-redesign-design.md` (reemplaza la dirección visual y el alcance de secciones del MVP de 2026-10-25).
- Plan ejecutado: `docs/superpowers/plans/2026-11-19-vaural-recorrido.md`.

## Stack

- Next.js 16 (App Router), React 19, TypeScript estricto.
- Tailwind CSS 4 (`@import "tailwindcss"` + tokens en `@theme`, sin `tailwind.config.ts`).
- Motion con `LazyMotion` + componentes `m` (`motion/react-m`) solo para resortes y presencia (botones magnéticos, lente, barra, menú).
- Swiper solo en el recorrido del hero, cargado con `next/dynamic` (`ssr: false`).
- Entradas de texto y reveals al hacer scroll en CSS puro (`.word-rise`, `.reveal`).
- Vercel como hosting.
- Datos locales tipados para servicios y planes.
- WhatsApp mediante enlace dinámico.
- Sin precios públicos, pagos, autenticación ni panel administrativo en la primera versión.

## Arquitectura

```text
src/
  app/            layout (fuentes, tema), page (composición en servidor), servicios/[slug], globals.css
  components/
    layout/       SiteHeader, MobileMenu, ThemeToggle, SiteFooter
    hero/         HeroJourney, JourneySlider (Swiper diferido), JourneyScreens, CursorLens
    services/     PillarBand, PlansIndex, PlanRow, PlanDialog, SelectionSummary, ServiceDetailActions, pillar-theme
    contact/      ContactSection, CopyButton
    motion/       MotionProvider, Magnetic, SplitWords
    quote/        QuoteForm, QuoteSection
    providers/    SelectionProvider
    whatsapp/     FloatingWhatsApp, WhatsAppLink
    ui/           icons
  hooks/          useMediaQuery (useFinePointer)
  data/           services.ts (4 pilares), site.ts
  lib/            accent, theme, motion, format, json-ld, whatsapp
  types/          service.ts
```

Los datos de servicios están desacoplados de la presentación (el color de cada pilar vive en `components/services/pillar-theme.ts`). La interfaz consume una colección tipada, de modo que la fuente local pueda reemplazarse por Supabase o un CMS sin rehacer los componentes.

## Alcance

Página única: barra → hero "Recorrido" (4 etapas con Swiper) → cinta de pilares → planes interactivos (selección múltiple + panel de detalle) → contacto (formulario → WhatsApp) → pie.

Los pilares son: asesoría digital, páginas web (incluye catálogos y tiendas con pedidos por WhatsApp), contenido para redes y marketing digital. Los slugs anteriores (`web-informativa`, `catalogo-digital`, etc.) redirigen con 308 desde `next.config.ts`.

No mostrar precios públicos. La disponibilidad, orientación y cotización se gestionan por WhatsApp.

## Flujo de conversión

El usuario debe poder:

1. Explorar la propuesta visual.
2. Abrir el detalle de un servicio.
3. Seleccionar uno o varios servicios.
4. Revisar el conjunto elegido.
5. Completar nombre, empresa, objetivo y correo opcional.
6. Abrir WhatsApp con un mensaje preparado.

El número público de VAURAL se configura mediante:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=595992396700
```

El mensaje debe incluir los servicios seleccionados, los datos del contacto y la descripción del proyecto. No inventar precios ni prometer disponibilidad automática.

## Modelo de datos

La entidad base debe ser equivalente a:

```ts
type PillarId = "asesoria" | "web" | "contenido" | "marketing"

type Service = {
  id: PillarId
  slug: string
  title: string
  shortDescription: string
  description: string
  disciplines: string[]
  includes: string[]
  deliverables: string[]
  order: number
}
```

No agregar campos de precio al modelo público del MVP. Si en el futuro se necesitan cotizaciones internas, deben tratarse como información privada o de administración.

## Dirección visual

- Base blanco y negro (tema claro `#FAFAFA`/`#0A0A0A`; tema invertido con el botón ◐, recordado en `localStorage`).
- El color aparece por interacción: un color por pilar (`asesoria #4D6BFF`, `web #C8F542`, `contenido #FF5FA2`, `marketing #FF8A2A`) escrito en `--accent` desde `src/lib/accent.ts`; el texto sobre color siempre es `#0A0A0A`.
- Tipografía: Instrument Serif (titulares), Geist (texto), Geist Mono (etiquetas).
- Curva de movimiento `cubic-bezier(0.16, 1, 0.3, 1)`.
- Todas las animaciones respetan `prefers-reduced-motion` (Windows con "Efectos de animación" desactivado lo activa: la página se ve casi quieta a propósito).

## Rendimiento y accesibilidad

- Usar `next/image` para imágenes.
- Usar `next/font` para tipografías.
- Optimizar imágenes a WebP o AVIF cuando corresponda.
- No incorporar video de fondo pesado en el primer MVP.
- Mantener navegación por teclado y estados de foco visibles.
- Proporcionar textos alternativos útiles.
- No esconder contenido esencial si JavaScript falla.
- Probar mobile, tablet y desktop.

## SEO y publicación

- Metadata por página.
- Open Graph.
- `sitemap.xml` y `robots.txt`.
- Datos estructurados de empresa y servicios.
- URLs limpias para cada servicio.
- Vercel con configuración automática de Next.js.
- No definir un output directory personalizado salvo que una necesidad concreta lo justifique.

## Comandos de desarrollo

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Para desarrollo local, crear `.env.local` a partir de `.env.example`. El archivo local no se versiona.

`test:e2e` levanta `next dev` por defecto. Para probar contra producción: `npm run build`, `npm run start -- -p 3100` y `E2E_BASE_URL=http://localhost:3100 npm run test:e2e`. Los tests e2e fuerzan `reducedMotion: "no-preference"` para cubrir las animaciones.

## Reglas de colaboración

- Leer la especificación antes de modificar la arquitectura.
- Mantener componentes pequeños y con una responsabilidad clara.
- No añadir dependencias para resolver problemas que puedan resolverse con la plataforma o CSS.
- No convertir la primera versión en un e-commerce completo.
- No mostrar precios si el usuario no cambia explícitamente esta decisión.
- Ejecutar lint y build antes de considerar terminada una etapa.
- Explicar cualquier cambio de alcance antes de implementarlo.
