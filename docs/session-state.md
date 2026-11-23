# VAURAL — Estado de la sesión

Actualizado: 2026-11-23

## Qué quedó hecho
- Rediseño completo "Recorrido": blanco y negro con color por pilar, hero con recorrido de 4 etapas (Swiper diferido), lente que invierte colores, cinta de pilares, planes interactivos con panel de detalle, contacto restilizado, pie con WhatsApp copiable, tema invertible con revelado circular.
- Servicios pasados a 4 pilares (asesoría, páginas web, contenido para redes, marketing digital) con redirecciones 308 de los slugs viejos.
- Tailwind 4 nativo (sin `tailwind.config.ts`), fuentes con `next/font`, Motion reducido (`LazyMotion` + `m`).
- Next.js 16.4.6 (cerró 7 avisos moderados) y menores de Codex corregidos (foco del menú móvil, `--danger` por tema, JSON-LD escapado, respaldo del recorrido).
- Versiones fijadas: todo `latest` pasó a `^` + la versión instalada y probada. `typescript-eslint` 8.73.0 trae minimatch 11.0.9: `npm audit` = 0 vulnerabilidades (también en desarrollo).
- Spec: `docs/superpowers/specs/2026-11-19-vaural-redesign-design.md` · Plan: `docs/superpowers/plans/2026-11-19-vaural-recorrido.md`.

## Rama y build
- `main` = `origin/main` en `79ab2c3` (en producción). El fijado de versiones está en el área de trabajo, **sin commitear**.
- Verificado (2026-11-23, tras fijar versiones): `lint` ✓, `typecheck` ✓, `vitest` 47/47 ✓, `build` ✓, e2e 8/8 ✓ contra `next start`.
- JS inicial de `/`: 228,4 KB gzip (línea base anterior 227,9 KB). Swiper va aparte: 27,4 KB, diferido. Fijar versiones no cambia paquetes del sitio.

## Próximos pasos
1. Commitear y subir el fijado de versiones (pide orden explícita).
2. Reemplazar las vistas previas abstractas por trabajos reales cuando haya clientes.
3. Actualizaciones mayores disponibles, a evaluar una por una: ESLint 10, TypeScript 7 (y menores: motion 14.14, Tailwind 4.3.5, Playwright 1.65).
4. `npm` avisa que `unrs-resolver` tiene un script de instalación sin aprobar; el lint funciona igual.

## Riesgos
- Reveals por scroll solo en navegadores con `animation-timeline` (en Firefox se muestra sin animación).
- Con "Efectos de animación" desactivado en Windows la página se ve casi quieta (intencional, accesibilidad).
