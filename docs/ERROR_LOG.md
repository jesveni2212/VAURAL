# VAURAL — Registro de errores y lecciones

Formato: **qué pasó** — causa raíz — cómo evitarlo.

## 2026-11-19 · Rediseño "Recorrido"

- **El recorrido del hero avanzaba pero el texto y el color no cambiaban.** — `swiper/react` (v14) reemplaza la opción `on` por sus propios manejadores, así que `on={{ slideChange }}` nunca se ejecutaba. — Pasar los eventos como props (`onSlideChange`, `onAutoplayTimeLeft`); los tipos están en `swiper/swiper-react.d.ts`. Cubierto por el e2e "el recorrido avanza solo".
- **La barra superior se desbordaba en celulares.** — `Magnetic` agregaba `inline-block` siempre y anulaba el `hidden` responsive que le pasaba la barra. — Un envoltorio no debe imponer `display`: el llamador lo decide (`className` por defecto `inline-block`). Cubierto en `SiteHeader.test.tsx`.
- **La grilla de "Contenido" se cortaba en dispositivos anchos.** — Celdas `aspect-square` en un contenedor de alto fijo. — En contenedores de alto fijo, repartir filas (`grid-rows-3 flex-1 min-h-0`) en lugar de fijar la proporción.
- **El e2e con `next dev` fallaba con "Unexpected end of JSON input".** — Un `next start` en paralelo compartía `.next`. — Probar contra producción con `E2E_BASE_URL`, o no correr dev y start a la vez.
- **En el navegador de prueba no había animaciones.** — Windows tenía "Efectos de animación" desactivado → `prefers-reduced-motion: reduce`. — No es un bug; los e2e fuerzan `reducedMotion: "no-preference"`.
- **Las capturas de página completa mostraban secciones vacías.** — `.reveal` usa `animation-timeline: view()`; sin scroll real los bloques quedan en opacidad 0. — Verificar con scroll real; no usar capturas `fullPage` para juzgar reveals.
- **`next build` y `next dev` se detienen una vez con un aviso de vulnerabilidad de Next.js.** — Next 16.4.3 consulta avisos de seguridad y corta la primera ejecución. — Reintentar continúa; la actualización (`next upgrade --agent=security`) queda a decisión del usuario.
