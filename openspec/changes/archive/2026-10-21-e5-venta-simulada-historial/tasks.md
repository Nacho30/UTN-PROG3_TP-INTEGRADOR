# Tasks

En cada tarea funcional: baseline de lo afectado antes de producción, test RED ejecutado antes del código, GREEN ejecutado, triangulación con otro caso y refactor verificado. Registrar archivo/capa/conteos/comandos reales en `validation.md` de este cambio; no cerrar por inspección cuando se exige ejecución. Las pruebas de Node son opcionales para desarrollar, nunca necesarias para abrir el frontend. El baseline Chromium delegado de 15/15 anterior a producción está registrado en design; los tests API no cuentan como evidencia frontend.

## 1. Baseline y reglas numéricas

- [x] 1.1 Establecer pruebas nativas sin dependencias para funciones reales E3/E4 afectadas (ids, filtro, normalización ISBN/email y validaciones) y ejecutar baseline; si falla algo previo, reportarlo sin corregir fuera de E5. Conservar datos iniciales y fixtures aisladas; verificar conteos y registrar comando/resultados en validation.md.
- [x] 1.2 Añadir con RED/GREEN/triangulación el modelo de cantidades, precios en centavos seguros y cálculo de subtotales/total; verificar 1500×2 + 2000×1 = 5000, 0.10 + 0.20, vacío/0/negativo/decimal/NaN/Infinity y desbordamientos. Documentar en README la política de redondeo y límites numéricos.

## 2. Borrador y confirmación histórica

- [x] 2.1 Implementar con TDD agregar/modificar/quitar renglones y duplicado informado; verificar libro desconocido, duplicado sin cambios, modificación válida/inválida y eliminación del último renglón con importes coherentes. Documentar política de duplicados en README.
- [x] 2.2 Implementar con TDD confirmación atómica revalidando cliente/libros/precios/cantidades/duplicados y creando id/fecha/snapshot independiente; verificar fallos conservan borrador/historial, éxito limpia, envío repetido no duplica, ids distintos, cambios posteriores de catálogo/cliente/borrador no alteran históricos. Registrar evidencia RED/GREEN/triangulación y esquema mínimo en README.

## 3. Interfaz y coordinación E4

- [x] 3.1 Añadir pruebas de contrato relevantes antes de implementar navegación Ventas/Historial, formularios y tablas con labels, estados vacíos, mensajes alert/status, cantidades editables, quitar y detalle histórico sólo lectura. Mantener scripts clásicos y createElement/textContent; verificar en navegador file:// agregar, error pendiente de edición que impide confirmar, éxito/limpieza y detalle; registrar teclado, foco y tamaños de forma observada.
- [x] 3.2 Con test RED de coordinación, agregar avisos puntuales tras altas válidas de libros/clientes y refrescar opciones sin perder cliente/libro seleccionado/renglones del borrador. Verificar LI-7/CL-4 en navegador real y regresión de filtro activo, tablas, normalizaciones, duplicados y altas inválidas; documentar funcionamiento en README.

## 4. Integración y evidencia final

- [x] 4.1 Delegar validación independiente de todos los escenarios de la spec: fixtures 1500/2000, ids inexistentes, todas cantidades inválidas, duplicados/cambios/quitar, snapshots mutados, varias ventas/detalles e historial vacío. Ejecutar suite completa nativa y registrar resultados/fallos/límites en validation.md y README sin inventar aprobación.
- [x] 4.2 Validar en navegador real file:// texto HTML literal en opciones/borrador/historial, navegación Tab/Enter y foco visible, errores accesibles, anchos 320/1280 sin desborde de página y consola sin errores. Verificar recarga elimina altas y ventas; conservar explícito E6 pendiente e instrucciones de doble clic en README.
- [x] 4.3 Revisar diff/estado y validar cambio por CLI: sólo frontend-libreria y artifacts E5 además de inicialización SDD autorizada; app, requirements, tests API y docs/prompts sin nuevas modificaciones. Comprobar ninguna operación stage/commit/push/PR/publicación y presentar tabla TDD por tarea con evidencia y límites reales.
