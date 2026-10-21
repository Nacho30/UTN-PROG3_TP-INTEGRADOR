# Tasks

## 1. Verificación de formularios y validaciones

- [x] 1.1 Contrastar `index.html` y `js/navegacion.js` con los escenarios de secciones y navegación: secciones `#libros` y `#clientes` con formulario, tabla con `thead` y mensaje de lista vacía; `aria-current` según el hash.
- [x] 1.2 Contrastar `js/libros.js` con los escenarios del alta de libro: opciones generadas desde los datos con `createElement` + `textContent`; validaciones de título, ISBN normalizado único, precio > 0, editorial y autores existentes, género opcional; id `LI-n` por mayor sufijo; refresco del catálogo con `renderizarCatalogo` + `filtrarPorTitulo` sin modificar `catalogo.js`.
- [x] 1.3 Contrastar `js/clientes.js` con los escenarios del alta de cliente: nombre y email no vacíos, formato válido, email único con `trim()` + minúsculas, id `CL-n`; verificar los 19 casos de la tabla de verificación en el navegador (Chrome headless + CDP, `file://`).

## 2. Preservación y cierre del ejercicio

- [x] 2.1 Confirmar que no se agregan API, backend, `fetch`, dependencias ni persistencia, que no se modifica `catalogo.js` ni `datos.js`, y que los envíos no recargan la página (`preventDefault` en 16 envíos verificados).
- [x] 2.2 Verificar foco visible con Tab (`outline: 3px solid rgb(31, 95, 191)`), anchos de 320 px (tabla absorbida por `.table-wrap`) y 1280 px sin desborde, y consola sin errores ni advertencias.
- [x] 2.3 Registrar la evidencia en `validation.md`, sincronizar la spec principal `altas-libros-clientes` y archivar el cambio.
