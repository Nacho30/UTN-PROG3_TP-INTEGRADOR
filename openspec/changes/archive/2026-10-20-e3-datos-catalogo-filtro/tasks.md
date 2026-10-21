# Tasks

## 1. Verificación de datos y catálogo

- [x] 1.1 Contrastar `js/datos.js` con los escenarios de datos locales: cinco colecciones declaradas como variables, ids estables y relaciones por id; verificar que la validación de relaciones no informa problemas.
- [x] 1.2 Contrastar `js/catalogo.js` con los escenarios del catálogo y del filtro (normalizado, parcial, vacío, sin coincidencias, Enter y texto con etiquetas HTML); verificarlos en el navegador.
- [x] 1.3 Abrir la página con `file://` y la persistencia del Ejercicio 6 desactivada (`__E6_NO_AUTOINICIALIZAR__`); confirmar que el catálogo funciona sólo con las variables, con 0 accesos a `Storage` y 0 solicitudes externas.

## 2. Preservación y cierre del ejercicio

- [x] 2.1 Confirmar que no se agregan API, backend, `fetch`, dependencias ni persistencia, y que no se modifica código funcional; ejecutar la suite CJS existente.
- [x] 2.2 Verificar foco visible con Tab, anchos de 320 px y 1280 px sin desplazamiento horizontal de la página y consola sin errores.
- [x] 2.3 Registrar la evidencia en `validation.md`, sincronizar la spec principal `catalogo-datos-locales` y archivar el cambio.
