# VAURAL: catálogo compacto, navegación y portfolio

## Objetivo

Mejorar la lectura del catálogo de VAURAL sin cambiar su estética editorial: los cinco servicios deben verse como una propuesta compacta y equilibrada en escritorio, con una adaptación clara para tablet y móvil. Además, los enlaces de navegación deben aterrizar en contenido real y la sección “Quiénes somos” debe mostrar una muestra del portfolio personal.

## Decisiones

- La grilla de servicios se mostrará dentro de `#planes-web`, que dejará de ser una sección vacía.
- En escritorio se usarán cinco columnas compactas para evitar la composición 3+2.
- En tablet se usarán dos columnas y la quinta tarjeta se centrará ocupando el ancho visual de una tarjeta; en móvil se usará una columna legible.
- El catálogo conservará selección múltiple, detalle individual y el resumen para WhatsApp.
- “Quiénes somos” incorporará una tarjeta de proyecto destacado enlazada a `https://jesusvenialgo.com`, abriendo en una pestaña nueva.
- Se agregará desplazamiento compensado para que los anchors no queden ocultos debajo del header sticky.
- No se mostrarán precios.

## Criterios de aceptación

1. Los cinco servicios aparecen dentro de la sección “Nuestros planes web” y no se muestran como una grilla 3+2 en escritorio.
2. La grilla mantiene títulos, descripciones y acciones utilizables en 1280px, tablet y móvil.
3. `#planes-web` contiene contenido real y `#proceso` aterriza visualmente debajo del header sticky.
4. “Quiénes somos” muestra `jesusvenialgo.com` como proyecto de portfolio y el enlace externo es seguro.
5. Los tests de catálogo, navegación/portfolio, lint, typecheck y build siguen pasando.
