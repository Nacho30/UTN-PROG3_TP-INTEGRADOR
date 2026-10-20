# Proposal

## Why

El Ejercicio 2 ya está materializado en el frontend local, pero todavía no
tiene un cambio OpenSpec ni un archivo histórico equivalente al del Ejercicio
1. Es necesario formalizar su contrato de presentación CSS para poder
conservarlo y archivarlo sin reintroducir las APIs retiradas.

## What Changes

- Registrar el comportamiento actual de presentación: identidad visual propia,
  CSS externo reutilizable, Grid/Flexbox, adaptación de 320/1280 px y
  accesibilidad básica.
- Confirmar que la interfaz se mantiene como página estática local, sin API,
  backend, peticiones de red, dependencias ni recursos externos.
- Mantener sin cambios funcionales el estado persistido existente de
  `localStorage` para libros, clientes y ventas.
- Preparar los artefactos necesarios para archivar formalmente el Ejercicio 2
  una vez verificado el estado actual.

## Capabilities

### New Capabilities

- `presentacion-css-accesible`: define la presentación visual reutilizable,
  adaptable y navegable por teclado del frontend local de la librería.

### Modified Capabilities

- Ninguna.

## Impact

- Código observado: `index.html`, `css/styles.css` y los scripts clásicos de
  `js/`.
- El cambio previsto no agrega API, backend, servidor, dependencias, módulos
  ES, CDNs ni recursos remotos.
- `localStorage` ya implementado se conserva como estado de datos; no forma
  parte del alcance de este ejercicio de presentación.
