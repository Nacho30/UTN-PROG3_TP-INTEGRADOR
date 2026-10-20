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
- Verificar cada punto en navegador y con la suite CJS existente. No se
  modifica código de producción.

## Capabilities

### New Capabilities
- `estructura-pantallas-libreria`: vistas, navegación y estructura semántica
  del frontend de la librería.

### Modified Capabilities
- Ninguna.

## Impact

- Sin cambios en `frontend-libreria/`: el código ya cumplía el contrato.
- Se agregan los artefactos de OpenSpec y la evidencia de validación.
