# Tasks

## 1. Almacenamiento e inicialización local

- [x] 1.1 Escribir primero pruebas CJS aisladas para ausencia de estado, hidratación válida, estado inválido y aperturas repetidas sin duplicar semillas; verificar que fallen antes de la implementación.
- [x] 1.2 Implementar el sobre versionado de `localStorage`, copias profundas y restauración de libros, clientes y ventas antes de inicializar la UI; verificar que las pruebas 1.1 pasen y que el suite previo no regrese.
- [ ] 1.3 Integrar la inicialización con los arrays globales y el arranque de catálogo/altas/ventas sin introducir módulos, dependencias ni llamadas de red; verificar con una apertura limpia y una recarga real desde `file://`.

## 2. Guardado de operaciones y preservación histórica

- [x] 2.1 Escribir primero pruebas CJS para persistir un alta válida de libro, un alta válida de cliente y una venta confirmada, incluyendo el fixture 1500 × 2 + 2000 × 1 = 5000; verificar RED sin los hooks de guardado.
- [x] 2.2 Guardar el estado sólo tras altas válidas y confirmaciones exitosas, preservando el comportamiento de error y el borrador no persistido; verificar GREEN con las pruebas nuevas y las pruebas E3-E5 existentes.
- [x] 2.3 Escribir y aprobar una prueba de regresión donde se modifica exclusivamente el precio del catálogo persistido, se recarga y una venta previa conserva precio unitario, subtotales y total originales.

## 3. Documentación y validación manual E6

- [ ] 3.1 Actualizar `frontend-libreria/README.md` con la clave/estructura de persistencia, aislamiento por navegador/perfil/origen, procedimiento de reinicio y resultados reales de búsqueda, validaciones de ISBN/email, ventas, recarga y precio histórico; verificar que cada resultado pueda reproducirse desde el documento.
- [x] 3.2 Añadir el prompt orquestado del Ejercicio 6 a `docs/prompts.md`, incluyendo coordinación, agente de implementación, restricciones nativas y criterios de entrega; verificar coherencia con la consigna y con la solución aplicada.
- [ ] 3.3 Ejecutar la suite CJS completa y validar en navegador la primera carga, recarga sin duplicados, venta de 5000, precio histórico, teclado y anchos de 320/1280 px; registrar resultados reales y confirmar consola sin errores.
