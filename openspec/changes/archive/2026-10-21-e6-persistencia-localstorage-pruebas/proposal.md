# Proposal

## Why

El frontend de la librería ya permite altas y ventas simuladas, pero todos los
datos se reinician al recargar la página. El Ejercicio 6 exige conservar libros,
clientes y ventas de forma local, sin abandonar el funcionamiento estático ni el
historial basado en snapshots.

## What Changes

- Persistir las colecciones mutables de libros, clientes y ventas en
  `localStorage` bajo una estructura/versionado documentado.
- Inicializar las colecciones con los ejemplos actuales sólo cuando no exista un
  estado local válido y restaurar el estado guardado en las aperturas siguientes
  sin volver a duplicar ejemplos.
- Guardar los cambios producidos por altas y confirmaciones de venta, sin
  incorporar backend, APIs, librerías ni CDNs.
- Mantener el precio histórico de las ventas confirmadas como snapshot aun si
  luego cambia el precio del catálogo persistido.
- Ampliar pruebas automatizadas y evidencia manual real; documentar alcance,
  ubicación del catálogo local y aislamiento de datos por navegador, perfil y
  origen.

## Capabilities

### New Capabilities
- `persistencia-local-biblioteca`: conserva y restaura localmente las
  colecciones de la librería y protege la independencia histórica de las ventas.

### Modified Capabilities
- Ninguna.

## Impact

- Código afectado: `frontend-libreria/js/datos.js`, módulos de altas y ventas,
  pruebas CJS y `frontend-libreria/README.md`.
- Se mantiene el uso de HTML, CSS y JavaScript nativos al abrir `index.html`
  directamente desde disco.
- No hay cambios de backend, API, dependencias, frameworks ni recursos externos.
