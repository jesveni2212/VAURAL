# VAURAL — Guía del proyecto

## Propósito

VAURAL es una empresa de servicios digitales que ofrece páginas web, contenido para redes sociales y catálogos digitales. El sitio debe comunicar una imagen creativa, elegante, formal y tecnológica, y convertir consultas en conversaciones por WhatsApp.

La referencia visual principal es el template de agencia de marketing de Wix compartido por el usuario. Se puede tomar como inspiración de ritmo, composición y movimiento, pero no se deben copiar textos, imágenes, código ni recursos propietarios.

## Estado actual

- La especificación del MVP está aprobada.
- `index.html` es el prototipo visual existente y funciona como referencia de contenido y dirección estética.
- La migración a una aplicación componentizada todavía no comenzó.
- No borrar ni sobrescribir el prototipo actual sin revisar antes los cambios locales.
- La especificación formal está en `docs/superpowers/specs/2026-10-25-vaural-mvp-design.md`.

## Stack aprobado para el MVP

- Next.js con App Router.
- TypeScript.
- Tailwind CSS.
- Motion para animaciones de interfaz.
- GSAP únicamente para secuencias complejas del hero o escenas puntuales.
- Vercel como hosting.
- Datos locales tipados para servicios y planes.
- WhatsApp mediante enlace dinámico.
- Sin precios públicos, pagos, autenticación ni panel administrativo en la primera versión.

## Arquitectura prevista

```text
src/
  app/
    layout.tsx
    page.tsx
    servicios/[slug]/page.tsx
  components/
    hero/
    navigation/
    catalog/
    quote-form/
    whatsapp/
    ui/
  data/
    services.ts
    site.ts
  lib/
    whatsapp.ts
  types/
    service.ts
public/
  images/
  icons/
```

Los datos de servicios deben estar desacoplados de la presentación. La interfaz debe consumir una colección tipada, de modo que en una etapa futura pueda reemplazarse la fuente local por Supabase o un CMS sin rehacer los componentes.

## Alcance del MVP

La experiencia principal será una landing editorial con catálogo de servicios:

1. Hero inmersivo de VAURAL.
2. Presentación de la propuesta.
3. Servicios y planes.
4. Selección múltiple de servicios.
5. Resumen de la consulta.
6. Formulario breve.
7. Generación de mensaje personalizado para WhatsApp.
8. Proceso de trabajo.
9. Contacto y cierre.

Los servicios iniciales son:

- Web informativa.
- Web interactiva.
- Tienda online con pedidos por WhatsApp, sin pagos integrados.
- Contenido para redes sociales.
- Catálogos digitales.
- Paquetes combinados.

No mostrar precios públicos durante el MVP. La disponibilidad, orientación y cotización se gestionan por WhatsApp.

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
type Service = {
  id: string
  slug: string
  title: string
  category: "web" | "contenido" | "catalogo"
  shortDescription: string
  description: string
  includes: string[]
  deliverables: string[]
  featured?: boolean
  order: number
}
```

No agregar campos de precio al modelo público del MVP. Si en el futuro se necesitan cotizaciones internas, deben tratarse como información privada o de administración.

## Dirección visual

- Mantener la paleta actual de grafito, azul grisáceo, blanco y plata.
- Usar un hero de alto impacto con fondo editorial oscuro, overlay, líneas guía y profundidad.
- Priorizar animaciones de entrada por capas, revelado al hacer scroll y parallax muy sutil.
- Evitar efectos estridentes, exceso de blur, desplazamientos bruscos o animaciones que compitan con el mensaje.
- Mantener una jerarquía tipográfica fuerte y una navegación clara.
- Las animaciones deben respetar `prefers-reduced-motion`.

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

## Reglas de colaboración

- Leer la especificación antes de modificar la arquitectura.
- Mantener componentes pequeños y con una responsabilidad clara.
- No añadir dependencias para resolver problemas que puedan resolverse con la plataforma o CSS.
- No convertir la primera versión en un e-commerce completo.
- No mostrar precios si el usuario no cambia explícitamente esta decisión.
- Ejecutar lint y build antes de considerar terminada una etapa.
- Explicar cualquier cambio de alcance antes de implementarlo.
