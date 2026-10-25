# VAURAL — Instrucciones para Codex

Este archivo acompaña a `CLAUDE.md`, que es la guía principal del proyecto. Antes de trabajar en VAURAL, leer ambos documentos y la especificación:

- `CLAUDE.md`
- `docs/superpowers/specs/2026-10-25-vaural-mvp-design.md`

## Resumen operativo

- Producto: web creativa y catálogo de servicios digitales de VAURAL.
- Stack aprobado: Next.js, TypeScript, Tailwind CSS, Motion y Vercel.
- MVP: servicios y planes sin precios públicos.
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

- Conservar la identidad visual grafito/plata.
- Priorizar rendimiento, responsive, accesibilidad y SEO.
- Usar animaciones elegantes y progresivas, no efectos decorativos sin propósito.
- Mantener los datos de servicios separados de los componentes.
- Revisar los cambios locales existentes en `index.html` antes de migrar contenido.
