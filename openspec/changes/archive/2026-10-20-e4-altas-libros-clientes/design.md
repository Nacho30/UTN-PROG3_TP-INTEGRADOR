# Design

## Context

El frontend se abre directamente desde `index.html` y carga scripts clásicos
con `defer`. El Ejercicio 3 dejó los datos en memoria (`js/datos.js`), el
catálogo con filtro (`js/catalogo.js`) y la utilidad `buscarPorId`. El
Ejercicio 4 agrega dos secciones nuevas con sus formularios y tablas sobre esa
base, sin tocar `catalogo.js`. Véase `proposal.md` para la motivación y la
especificación delta para el contrato de comportamiento.

## Goals / Non-Goals

**Goals:**

- Formalizar el alta de libros y clientes con todas sus validaciones, unicidades
  e ids.
- Formalizar la actualización de la tabla y del catálogo sin recargar la página.
- Formalizar la accesibilidad y presentación mínima de los formularios,
  tablas y errores.
- Dejar una traza archivable que no modifique el comportamiento si la
  implementación actual cumple los escenarios.

**Non-Goals:**

- No incorporar API, backend, servidor, `fetch` ni llamadas de red.
- No implementar ni modificar persistencia (`localStorage`, `sessionStorage`,
  IndexedDB). Eso es del Ejercicio 6.
- No implementar ventas, renglones ni historial (Ejercicio 5).
- No implementar editar ni eliminar registros: sólo altas.
- No modificar `catalogo.js` ni `datos.js`: el refresco del catálogo reutiliza
  sus funciones públicas.

## Decisions

### Checkboxes en `fieldset` en vez de select multiple

Los autores se presentan como un grupo de checkboxes dentro de un
`fieldset` con `legend`, no como un `<select multiple>`. Son pocas opciones
que se ven todas a la vez: se alternan con un clic, no hace falta recordar
atajos de teclado, y el significado del grupo queda claro para lectores de
pantalla.

### Normalización de ISBN quitando espacios y guiones

Dos ISBN son iguales cuando coinciden tras quitar espacios y guiones y pasar a
minúsculas (`normalizarIsbn`). Así `978 950 000 001 1`, `9789500000011` y
`978-950-000-001-1` son la misma clave. Se descartó comparar el texto tal cual
porque la misma escritura con espacios o guiones crearía un duplicado.

### Unicidad de email con `trim()` + minúsculas

El email se compara con `normalizarEmail` (espacios de los extremos quitados y
minúsculas). `ANA.GOMEZ@EJEMPLO.COM` es el mismo email que
`ana.gomez@ejemplo.com`. El formato se valida con una expresión simple
`nombre@dominio.tld`.

### Ids por mayor sufijo numérico

`siguienteIdPrefijado` calcula el mayor sufijo numérico de los ids existentes
(`LI-6` → `LI-7`, `CL-3` → `CL-4`) y no la cantidad de elementos, para que la
numeración no se rompa si algún registro se quita en el futuro. Se descartó
usar `lista.length + 1` porque depende de que no falten ids en la serie.

### Reutilización del catálogo sin modificar `catalogo.js`

Tras un alta de libro, `refrescarCatalogo` llama a `renderizarCatalogo` con el
resultado de `filtrarPorTitulo(LIBROS, búsquedaActiva)`, de modo que el
catálogo se redibuja con el filtro del momento. No se llama `iniciarCatalogo()`
(se registraría un segundo listener de submit) ni se toca el archivo del
Ejercicio 3.

### `novalidate` y errores en `role="alert"`

Los formularios usan `novalidate`: las validaciones son del negocio y se
muestran todas juntas en un contenedor `role="alert"` (una lista `<ul>` con
`textContent`), con `aria-invalid="true"` en los campos involucrados. Se
descartó la validación nativa del navegador porque corta en el primer error y
no permite el mensaje en español unificado.

### `.table-wrap` para el desborde interno

Cada tabla va dentro de un `.table-wrap` con `overflow-x: auto`. En 320 px la
tabla (más ancha que la pantalla) se desplaza dentro de su contenedor y la
página no gana scroll horizontal.

### Renderizado seguro con el DOM

Toda opción, celda, fila, error y mensaje de éxito del usuario se construye
con `createElement` y `textContent`, nunca con `innerHTML`. Así cualquier texto
con etiquetas HTML se muestra literal.

## Risks / Trade-offs

- [Los altas se pierden al recargar] → Es el comportamiento esperado en este
  ejercicio y se documenta. La persistencia llega con el Ejercicio 6.
- [Las funciones de `libros.js` y `clientes.js` son globales] → Se alinean con
  el estilo de scripts clásicos del proyecto, sin módulos ES.

## Migration Plan

No hay migración de datos ni despliegue de servicios. La aplicación conserva
su apertura directa mediante `index.html`.
