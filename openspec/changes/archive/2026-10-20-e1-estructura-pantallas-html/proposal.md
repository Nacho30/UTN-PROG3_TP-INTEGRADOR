# Proposal

## Why

El Ejercicio 1 del TPI (estructura y pantallas HTML) se implementó junto con los
ejercicios 3, 4 y 5, sin un cambio de OpenSpec propio: el flujo SDD se adoptó
recién en el Ejercicio 5. Este cambio registra de forma retroactiva el contrato
de estructura y navegación que ya cumple `frontend-libreria/index.html`, para
que quede como especificación principal y pueda archivarse igual que el resto.

## What Changes

- Documentar las cinco vistas exigidas (Catálogo, Libros, Clientes, Ventas e
  Historial) y la navegación entre ellas.
- Documentar la estructura semántica: encabezado, navegación, contenido
  principal y pie; un `h1` por vista.
- Documentar el contrato de formularios y tablas: cada campo con su etiqueta,
  botones con textos de acción y tablas con encabezados.
- Documentar los mensajes de lista vacía, búsqueda sin resultados y
  operaciones correctas o rechazadas.
- Reorganizar el repositorio para que el TPI sea un proyecto 100 % local:
  `index.html`, `css/`, `js/` y `tests/` pasan de `frontend-libreria/` a la
  raíz, y se elimina la API de FastAPI (`app/`, `requirements.txt` y sus
  pruebas `.http`), que no forma parte de esta consigna.
- Verificar cada punto en navegador y con la suite CJS existente. El código de
  las vistas no cambia: sólo su ubicación.

## Capabilities

### New Capabilities
- `estructura-pantallas-libreria`: vistas, navegación y estructura semántica
  del frontend de la librería.

### Modified Capabilities
- Ninguna.

## Impact

- Archivos movidos sin cambios de contenido: `frontend-libreria/{index.html,
  css, js, tests, README.md}` → raíz. Las rutas relativas (`css/`, `js/`,
  `tests/` → `../js`) siguen siendo válidas.
- Eliminados: `app/` (API FastAPI y su interfaz de proveedores),
  `requirements.txt`, `tests/test_api.http`, `tests/test_proveedores.http`.
- `README.md` de la raíz pasa a ser el del frontend, con rutas e integrantes
  actualizados. `docs/prompts.md` se conserva como registro.
- Los artefactos de cambios anteriores (E5, E6) mencionan `frontend-libreria/`:
  se dejan como registro histórico.
