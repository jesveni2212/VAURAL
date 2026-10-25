# VAURAL: contacto flotante, planes destacados y base SEO

## Objetivo

Mejorar la conversión y la presentación del MVP sin cambiar su identidad graphite/silver: agregar un acceso flotante a WhatsApp con mensaje precargado, dar más aire y jerarquía a “Nuestros planes web” y completar la base técnica para buscadores, redes sociales, accesibilidad y rastreadores de IA.

## Decisiones visuales

- El CTA flotante será un enlace fijo con ícono SVG inline, verde WhatsApp y etiqueta visible en escritorio. En pantallas pequeñas se reducirá a un botón circular.
- La sección de planes tendrá un panel atmosférico propio, más separación entre encabezado, tarjetas y resumen, y conservará las cinco tarjetas compactas.
- Se respetarán los colores graphite/silver existentes; el verde se reservará para la acción de WhatsApp.

## Decisiones técnicas

- Se mantiene Next.js App Router; no se agrega Vite ni una librería de íconos.
- El mensaje del CTA será: `Hola, quiero consultar por los servicios de VAURAL`.
- Se agregará `not-found.tsx`, favicon SVG, Open Graph image generada por `next/og`, canonical, Twitter card, `llms.txt`, datos estructurados y metadatos por servicio.
- `robots.txt` seguirá permitiendo el rastreo general y expondrá el sitemap; no se agregará un bloqueo de crawlers de IA.
- `lang="es"` se mantiene en el documento. El contenido visual no usa imágenes rasterizadas; los fondos CSS son decorativos y no requieren alt text.
- `productionBrowserSourceMaps: false` quedará explícito en Next y se revisará el tamaño de los chunks de producción.

## Criterios de aceptación

1. El botón flotante abre WhatsApp con el número público de VAURAL y el mensaje acordado, con nombre accesible y sin dependencia adicional.
2. “Nuestros planes web” se percibe como un bloque separado, con respiración suficiente y responsive estable.
3. La home y las páginas de servicio tienen description, canonical, Open Graph y jerarquía de headings válida.
4. Existe una 404 personalizada, favicon, OG image, sitemap, robots y `llms.txt` funcionales.
5. Hay JSON-LD de negocio y servicio sin exponer secretos.
6. El HTML inicial contiene contenido visible en el source; no se publican source maps de navegador; el bundle principal se mide y no se agregan dependencias innecesarias.
