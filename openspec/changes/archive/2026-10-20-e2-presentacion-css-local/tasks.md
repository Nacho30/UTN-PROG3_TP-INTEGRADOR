# Tasks

## 1. Verificación de la presentación local

- [x] 1.1 Contrastar `index.html` y `css/styles.css` con los escenarios de identidad visual, reutilización, Flexbox/Grid, anchos de 320/1280 px, tablas y foco visible; registrar cualquier brecha y verificarla mediante revisión manual de las cinco vistas.
- [x] 1.2 Incorporar o ajustar pruebas sólo si la verificación descubre una brecha de presentación, empezando por una prueba que falle; verificar que las pruebas CJS relevantes pasan tras cada ajuste.
- [x] 1.3 Confirmar por revisión estática y apertura con `file://` que los recursos de ejecución son locales y no hay API, backend, solicitudes de red, dependencias ni recursos externos; verificar que el flujo no requiere un servidor.

## 2. Preservación y cierre del ejercicio

- [x] 2.1 Verificar que la aplicación conserva las operaciones y las claves de `localStorage` existentes para libros, clientes y ventas sin introducir cambios funcionales; ejecutar las pruebas de persistencia relevantes.
- [x] 2.2 Actualizar documentación sólo si la verificación identifica una referencia necesaria al estado local actual; verificar que no se documentan APIs, backend ni ejecución remota como requisito del Ejercicio 2.
- [x] 2.3 Ejecutar `openspec validate e2-presentacion-css-local --strict`, revisar todos los escenarios y completar esta lista antes de solicitar el archivado del cambio.
