# VAURAL — Instrucciones para Codex

Este archivo acompaña a `CLAUDE.md`, que es la guía principal del proyecto. Antes de trabajar en VAURAL, leer ambos documentos y la especificación:

- `CLAUDE.md`
- `docs/superpowers/specs/2026-10-25-vaural-mvp-design.md`

## Resumen operativo

- Producto: agencia digital VAURAL con cuatro pilares (asesoría, páginas web, contenido para redes, marketing digital).
- Stack: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Motion (LazyMotion + `m`), Swiper (solo hero, diferido) y Vercel.
- Diseño vigente: `docs/superpowers/specs/2026-11-19-vaural-redesign-design.md` ("Recorrido", blanco y negro con color por pilar).
- Planes sin precios públicos.
- Selección múltiple de servicios.
- Formulario breve y derivación personalizada a WhatsApp.
- Número de WhatsApp: `595992396700` mediante `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- No incorporar pagos, autenticación ni panel administrativo en el MVP.

## Comandos verificados

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Usar `.env.local` para el número de WhatsApp durante desarrollo; no subirlo al repositorio.

## Criterios de implementación

- Base blanco y negro; el color de cada pilar llega solo por interacción vía `--accent` (`src/lib/accent.ts`).
- Priorizar rendimiento, responsive, accesibilidad y SEO; todo debe respetar `prefers-reduced-motion`.
- Animaciones con propósito: CSS para entradas y reveals, Motion solo para resortes y presencia.
- Mantener los datos de servicios separados de los componentes.
