# VAURAL — Rediseño "Recorrido" (diseño)

Fecha: 2026-11-19 · Estado: **aprobado por el usuario** (mockup interactivo "Recorrido blanco y negro", conversación del 2026-11-19).
Reemplaza la dirección visual de `CLAUDE.md` (grafito/plata), el catálogo de 5 servicios y el alcance de secciones del MVP (`2026-10-25-vaural-mvp-design.md`). Sigue vigente: sin precios públicos, consulta por WhatsApp, SEO.

## 1. Intención

VAURAL pasa a presentarse como **agencia digital** con cuatro pilares: asesoría digital, páginas web, contenido para redes y marketing digital. La página debe atrapar desde el primer segundo, invitar a recorrerla entera y responder a cada gesto del usuario con un detalle, sin dejar de ser **ligera, práctica y muy rápida**.

Referencias de inspiración (sin copiar textos, imágenes ni código): Coca-Cola Company (titular grande, minimalismo), Clear Street (barra flotante en píldora), Immersive Garden (índice editorial con atenuado de filas).

## 2. Objetivos, no objetivos, antiobjetivos

**Objetivos**
- Página única: **Barra → Hero "Recorrido" → Cinta de pilares → Planes → Contacto → Pie**.
- Base **blanco y negro**; el color aparece por interacción, un color por pilar.
- Micro-interacciones en cada bloque (ver §4).
- SOLID, KISS, DRY: componentes pequeños, lógica en hooks/utilidades, datos separados de la presentación.
- Conservar sin regresiones: selección múltiple, formulario, mensaje de WhatsApp, botón flotante de WhatsApp, SEO, rutas `/servicios/[slug]`.

**No objetivos**: precios, pagos, autenticación, panel, newsletter, sonido, portfolio de clientes (se agregará luego), vista grilla/lista y vista previa flotante del mockup anterior (reemplazadas por el relleno de color).

**Antiobjetivos**: que la página sea más lenta que la actual; que una interacción sea la única forma de acceder a un contenido (todo funciona con teclado, táctil y sin JS); inventar clientes, cifras o correos.

## 3. Dirección visual

- **Tema claro (por defecto):** fondo `#FAFAFA`, tinta `#0A0A0A`, superficie `#EFEFEF`, texto secundario `#6B6B6B`, líneas `rgba(10,10,10,.12)`.
- **Tema invertido:** fondo `#0A0A0A`, tinta `#FAFAFA`, superficie `#161616`, secundario `#9A9A9A`, líneas `rgba(250,250,250,.14)`.
- **Color por pilar** (siempre con texto `#0A0A0A` encima): asesoría `#4D6BFF`, web `#C8F542`, contenido `#FF5FA2`, marketing `#FF8A2A`. Variable global `--accent`, transición 600 ms.
- **Tipografía:** Instrument Serif (titulares, 400 e itálica), Geist (texto), Geist Mono (etiquetas, contadores). Vía `next/font/google`.
- **Curva de movimiento:** `cubic-bezier(0.16, 1, 0.3, 1)`.

## 4. Comportamiento por bloque

**Barra.** Arriba: transparente a lo ancho. Al bajar más de 24 px: píldora flotante translúcida con borde fino. Incluye punto de color que late con `--accent`, logo, enlaces (Servicios, Planes, Contacto), botón de invertir tema (◐) y CTA "Hablemos" magnético. En móvil: botón Menú que abre un panel animado.

**Hero "Recorrido".** Titular "De la idea / al **cliente.**" con entrada palabra por palabra; "cliente." resaltada con fondo `--accent`. Debajo: número de etapa, título y descripción del pilar activo, barra de 4 etapas que se llena con el tiempo de autoplay, y CTAs magnéticos ("Empezar mi proyecto" → `#contacto`, "Ver planes" → `#planes`). A la derecha: un dispositivo con 4 pantallas (asesoría: checklist; web: mini sitio; contenido: perfil con grilla; marketing: gráfico que se dibuja), controladas por **Swiper** (autoplay 3,2 s, deslizamiento táctil/mouse, teclado, pausa al pasar el mouse o con foco, a11y). El marco del dispositivo tiene un contorno `--accent`. Fondo: dos órbitas finas giratorias con un punto `--accent`. **Lente**: un círculo blanco con `mix-blend-mode: difference` sigue al cursor con resorte e invierte lo que tiene debajo (solo con puntero fino y sin `prefers-reduced-motion`). Cada cambio de etapa fija el `--accent` base.

**Cinta de pilares.** Marquesina monoespaciada con los 4 pilares y su punto de color; se pausa al pasar el mouse.

**Planes.** Sección en tinta invertida (fondo `--fg`). Cabecera con contador `01 / 04`, leyenda "Planes a medida · sin precios publicados" y contador de seleccionados. 4 filas: número, título serif grande, disciplinas y botón "Seleccionar". Al hover o foco: la fila se rellena de izquierda a derecha con su color, el título se desplaza, las demás bajan a 35 % de opacidad y **toda la página adopta ese color** (`--accent` temporal; al salir vuelve al de la etapa del hero). Clic en el título abre un panel de detalle (`<dialog>` nativo, animado) con descripción, incluye, entregables, Seleccionar y "Siguiente plan"; el título es un enlace real a `/servicios/[slug]` (sin JS, o con clic central, navega). Debajo, el resumen de selección.

**Contacto.** Titular "Contanos qué querés lograr.", formulario actual restilizado (campos con subrayado que se pinta con `--accent` al enfocar), CTA magnético "Continuar por WhatsApp".

**Pie.** Logo, número de WhatsApp con botón "Copiar", "Volver arriba", ©.

**Invertir tema.** El botón ◐ alterna el tema con un revelado circular desde el clic (`document.startViewTransition` + `clip-path`); sin soporte, cambio instantáneo. Se recuerda en `localStorage` (con try/catch) y se aplica antes del primer pintado.

## 5. Arquitectura

```
src/
  app/            layout.tsx (fuentes, tema, providers), page.tsx (composición, Server Component),
                  servicios/[slug]/page.tsx, globals.css (Tailwind 4 + tokens + pocas clases)
  components/
    layout/       SiteHeader, MobileMenu, ThemeToggle, SiteFooter
    hero/         HeroJourney, JourneySlider (Swiper, carga diferida), JourneyScreens, CursorLens
    services/     PillarBand, PlansIndex, PlanRow, PlanDialog, SelectionSummary
    contact/      ContactSection, CopyButton  (quote/QuoteForm y QuoteSection se reutilizan)
    motion/       MotionProvider (LazyMotion + MotionConfig), Reveal, SplitWords, Magnetic
    providers/    SelectionProvider (sin cambios de API)
  data/           services.ts (4 pilares), site.ts
  lib/            accent.ts, theme.ts, whatsapp.ts (sin cambios)
  types/          service.ts
```

- **Color de pilar**: presentación, no dato → `components/services/pillar-theme.ts` (`pillarAccent: Record<PillarId, string>`).
- **Acento global sin re-renderizar**: `lib/accent.ts` escribe `--accent` en `document.documentElement`; base (etapa del hero) + vista previa (hover de planes).
- **Motion**: `LazyMotion` con `domAnimation` y componentes `m` (`motion/react-m`); `MotionConfig reducedMotion="user"`.
- **Swiper**: solo en `JourneySlider`, cargado con `next/dynamic` (`ssr: false`) y un fallback que pinta la pantalla activa sin JS de Swiper. Módulos: Autoplay, Keyboard, A11y. Solo `swiper/css` base.
- **Server first**: `page.tsx`, datos, cinta, contacto y pie en servidor; en cliente solo lo interactivo.
- **Tailwind 4**: `@import "tailwindcss"`, tokens en `@theme` sobre variables CSS por tema; se elimina `tailwind.config.ts` (v3). Las ~1.400 líneas de CSS actuales se reemplazan.
- **Redirecciones permanentes** de los slugs anteriores: `web-informativa`, `web-interactiva`, `tienda-pedidos-whatsapp`, `catalogo-digital` → `/servicios/paginas-web`; `contenido-redes` → `/servicios/contenido-para-redes`.
- **Iconos**: SVG en línea propios (pocos); sin librería de iconos.

## 6. Rendimiento y accesibilidad

- Línea base: JS de primera carga de `/` medido con `next build` antes de empezar; el rediseño no debe superarla en más de lo que aportan Motion reducido y Swiper diferido. Meta Lighthouse móvil ≥ 95.
- Sin imágenes pesadas ni video; animaciones con `transform`/`opacity`.
- Paridad teclado (foco = hover), `prefers-reduced-motion` apaga inercia, lente, marquesina, autoplay y entradas.
- Contraste AA: el color de pilar nunca lleva texto claro encima.
- Contenido esencial visible sin JS (títulos, planes con enlaces, formulario).

## 7. Enfoques considerados

1. **Reescritura de la presentación sobre la lógica existente (elegido).** Se conservan selección, formulario, WhatsApp y SEO.
2. Retocar el CSS actual: arrastra 1.400 líneas y rompe DRY. Descartado.
3. HTML estático + GSAP: pierde selección, formulario y rutas. Descartado.

## 8. Proceso

- Fases según el plan `docs/superpowers/plans/2026-11-19-vaural-recorrido.md`.
- Consulta a Codex (`gpt-6-luna`, `max`, solo lectura) tras la base y antes de entregar; se resuelven o informan sus hallazgos.
- Validación: `lint`, `typecheck`, `test`, `build`, `test:e2e`, revisión visual móvil/tablet/escritorio.
- Sin `commit`, `push` ni deploy sin orden explícita del usuario. Se trabaja en la rama `redesign/recorrido`; los cambios locales previos del logo se conservan.

## 9. Decisiones del constructor (revisables)

- Copys nuevos de asesoría y marketing (descripción, incluye, entregables).
- Los catálogos y tiendas quedan dentro de "Páginas web".
- Número de WhatsApp como dato copiable del pie en lugar de un correo inexistente.
- El tema invertido se recuerda por visitante.
