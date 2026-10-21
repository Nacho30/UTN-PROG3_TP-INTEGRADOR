# Proposal

## Why

El Ejercicio 4 ya está implementado y verificado en la sesión del Ejercicio 4
del TPI (commit `1a36683`), pero no tiene un cambio OpenSpec ni un archivo
histórico como los de los Ejercicios 1, 2 y 3. Hay que formalizar su contrato
de altas de libros y clientes para conservarlo y archivarlo. Ese contrato no
depende de API, backend ni persistencia.

## What Changes

- Registrar las secciones `#libros` y `#clientes` de `index.html` con
  navegación del encabezado (`aria-current` por hash), formularios de alta y
  listados en tabla con `thead` y mensaje de lista vacía.
- Registrar el alta de libros en `js/libros.js`: opciones de editorial, género
  y autores generadas desde los datos con `createElement` + `textContent`;
  validaciones (título e ISBN no vacíos; ISBN único normalizado quitando
  espacios/guiones y sin distinguir mayúsculas; precio numérico mayor que cero;
  editorial existente; al menos un autor existente; género opcional pero si se
  asigna debe existir); id `LI-n` por mayor sufijo numérico; refresco del
  catálogo reutilizando `renderizarCatalogo` + `filtrarPorTitulo` sin recargar
  y sin modificar `catalogo.js`.
- Registrar el alta de clientes en `js/clientes.js`: nombre completo y email;
  no vacíos; formato de email válido; email único comparando con `trim()` +
  minúsculas; id `CL-n`.
- Registrar las utilidades compartidas en `js/utilidades.js`
  (`siguienteIdPrefijado`, `crearCeldaTabla`, `mostrarErrores`,
  `marcarAriaInvalid`) y la navegación en `js/navegacion.js` (`aria-current`
  según el hash).
- Registrar la presentación mínima en `css/styles.css`: `.table`,
  `.table-wrap` con `overflow-x: auto`, grilla de formulario, checkboxes y
  foco visible `:focus-visible` de 3 px.
- Preparar los artefactos necesarios para archivar formalmente el Ejercicio 4.

## Capabilities

### New Capabilities

- `altas-libros-clientes`: define el contrato de los formularios de alta de
  libros y clientes del frontend de la librería, sus validaciones, unicidades,
  ids y actualización de listados y catálogo sin recargar, sin API ni
  persistencia.

### Modified Capabilities

- Ninguna.

## Impact

- Código observado: `index.html` (secciones `#libros` y `#clientes`),
  `js/libros.js`, `js/clientes.js`, `js/utilidades.js`, `js/navegacion.js` y
  `css/styles.css`.
- El cambio no agrega API, backend, servidor, dependencias, módulos ES, CDNs
  ni recursos remotos. Los datos siguen en memoria (capacidad
  `catalogo-datos-locales`); recargar la página pierde los altas.
- Fuera de alcance: la simulación de ventas y el historial (Ejercicio 5) y la
  persistencia con `localStorage` (Ejercicio 6) se registran en sus propios
  cambios. Este ejercicio no los requiere ni los modifica.
