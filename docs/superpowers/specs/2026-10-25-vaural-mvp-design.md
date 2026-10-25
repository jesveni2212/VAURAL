# VAURAL — Diseño del MVP

**Fecha:** 2026-10-25  
**Estado:** Aprobado para planificación  
**Producto:** Sitio web creativo y catálogo de servicios digitales

## 1. Resumen

VAURAL necesita una web de alto impacto visual, inspirada en el ritmo editorial y las animaciones de un template de agencia de marketing, pero adaptada a su identidad y oferta. El objetivo no es vender online ni publicar precios, sino presentar servicios, permitir combinar opciones y transformar esa selección en una consulta orientada por WhatsApp.

El primer MVP prioriza velocidad de lanzamiento, calidad visual, buen rendimiento y una arquitectura que permita incorporar un catálogo editable en el futuro.

## 2. Objetivos

- Presentar VAURAL como una empresa digital creativa, elegante y confiable.
- Crear una experiencia de navegación inmersiva, con animaciones cuidadas.
- Mostrar servicios y planes de forma clara.
- Permitir seleccionar uno o varios servicios.
- Recopilar información básica del potencial cliente.
- Generar una consulta personalizada en WhatsApp.
- Mantener el contenido listo para migrar a una fuente editable.
- Publicar en Vercel con una configuración simple.

## 3. Fuera de alcance del MVP

- Precios públicos.
- Carrito de compra con pagos.
- Pasarela de pagos.
- Autenticación de usuarios.
- Panel de administración.
- Inventario.
- Gestión automática de disponibilidad.
- CRM o seguimiento comercial integrado.

## 4. Stack tecnológico aprobado

- **Framework:** Next.js con App Router.
- **Lenguaje:** TypeScript.
- **Estilos:** Tailwind CSS, complementado con CSS puntual cuando una escena visual lo necesite.
- **Animación:** Motion para React; GSAP solo para secuencias complejas del hero o escenas específicas.
- **Hosting:** Vercel.
- **Datos MVP:** archivos locales tipados en el repositorio.
- **Canal de conversión:** enlace dinámico a WhatsApp.
- **Evolución posible:** Supabase o CMS cuando el negocio necesite editar contenido sin tocar código.

## 5. Arquitectura de la aplicación

La página principal será una landing editorial con secciones ancladas. Cada servicio podrá tener una ruta de detalle estática para mejorar la claridad y el SEO, sin convertir la primera versión en una aplicación compleja.

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

La fuente local de datos debe consumirse mediante funciones o interfaces que permitan sustituirla luego por Supabase sin modificar los componentes de presentación.

## 6. Experiencia y navegación

La página seguirá este recorrido:

1. **Hero:** identidad de VAURAL, propuesta de valor y CTA.
2. **Presentación:** qué hace VAURAL y para quién trabaja.
3. **Servicios y planes:** tarjetas con información clara.
4. **Detalle:** información ampliada de cada servicio.
5. **Selección:** el visitante puede combinar servicios.
6. **Resumen:** se muestran las opciones elegidas.
7. **Formulario:** nombre, empresa, objetivo y correo opcional.
8. **WhatsApp:** se abre una conversación con el mensaje armado.
9. **Cierre:** proceso de trabajo y contacto.

La selección se mantiene en el estado del frontend durante la sesión. No requiere base de datos en el MVP.

## 7. Servicios iniciales

- Web informativa.
- Web interactiva.
- Tienda online con pedidos por WhatsApp, sin pagos integrados.
- Contenido para redes sociales.
- Catálogos digitales.
- Paquetes combinados.

Los servicios no publican precios. El mensaje de WhatsApp debe orientar al usuario a solicitar disponibilidad y cotización.

## 8. Modelo de datos

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

El modelo no contiene precios públicos. Los combos pueden definirse como una combinación de IDs de servicios o como una configuración editorial separada, sin duplicar la información base.

## 9. Formulario y WhatsApp

El formulario breve tendrá:

- Nombre obligatorio.
- Empresa o negocio opcional.
- Servicios seleccionados, generados desde el estado de selección.
- Objetivo del proyecto obligatorio.
- Correo electrónico opcional.

El número se configurará mediante:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=595992396700
```

El constructor de mensajes debe centralizarse en `src/lib/whatsapp.ts`. El mensaje debe incluir el saludo, los servicios elegidos, los datos del contacto y el objetivo. No debe incluir precios inventados ni afirmar disponibilidad automática.

## 10. Dirección visual y animaciones

La identidad mantiene grafito, azul grisáceo, blanco y plata. El hero debe tener una presencia editorial y cinematográfica sin depender de una copia literal del template de referencia.

Animaciones previstas:

- Entrada escalonada de navegación, fondo, marca, textos y CTA.
- Líneas guía y capas de profundidad.
- Parallax sutil en desktop.
- Revelado de secciones al hacer scroll.
- Hover refinado en tarjetas y botones.
- Estados de foco accesibles.
- Fallback completo para `prefers-reduced-motion`.

No se utilizarán movimientos bruscos, loops constantes que distraigan ni video pesado en el primer MVP.

## 11. Rendimiento, accesibilidad y SEO

- `next/image` para imágenes.
- `next/font` para tipografías.
- WebP o AVIF cuando corresponda.
- Carga progresiva de escenas complejas.
- Navegación por teclado.
- Textos alternativos.
- Contenido esencial disponible sin depender de una animación.
- Metadata, Open Graph, sitemap y robots.
- Datos estructurados de empresa y servicios.
- Rutas limpias para los detalles.

## 12. Despliegue

Vercel detectará Next.js automáticamente. No se configurará un output directory personalizado. La primera variable necesaria será:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=595992396700
```

La construcción deberá validarse con lint y build antes de publicar.

## 13. Criterios de aceptación

El MVP se considerará listo cuando:

- La landing comunique claramente qué hace VAURAL.
- Los servicios se puedan explorar y combinar.
- El formulario valide los campos esenciales.
- WhatsApp reciba un mensaje correcto y legible.
- No haya precios visibles.
- La experiencia sea usable en mobile y desktop.
- Las animaciones funcionen con una alternativa accesible.
- El build de producción pase sin errores.
- La publicación en Vercel funcione con la variable de WhatsApp configurada.

## 14. Evolución posterior

Después de validar el MVP se podrá incorporar:

- Catálogo editable.
- Supabase o CMS.
- Panel de administración.
- Casos de estudio.
- Analytics y eventos de conversión.
- Automatización de seguimiento comercial.
- Integraciones adicionales para formularios y CRM.
