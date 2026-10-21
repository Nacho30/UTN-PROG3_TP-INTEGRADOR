# Evidencia de implementación E5

Sesión 19/10/2026. Runtime opcional Node v24.19.0, sin instalar dependencias. `NODE` representa `C:/Users/Oficina/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe`. Comandos desde la raíz.

## Baseline

- Antes de producción: `NODE --test frontend-libreria/tests/baseline.test.cjs`: **5/5 PASS**. VM aisladas ejercitan funciones reales E3/E4: datos 6/3, relaciones, ids, filtro, ISBN/email y validaciones.
- Baseline Chromium file:// delegado por coordinador antes de producción: **15/15 PASS**; sin fallas previas observadas. Informe temporal `C:/Users/Oficina/AppData/Local/Temp/utn-e5-baseline.json`.

## TDD ejecutado

| Tarea | Archivo / capa | Baseline | RED ejecutado | GREEN | Triangulación / refactor |
|---|---|---|---|---|---|
| 1.1 | tests/baseline.test.cjs / unidad VM | 5/5 | No aplica: caracteriza código existente | 5/5 | ISBN/email, ids, filtro y validaciones |
| 1.2 | tests/ventas.test.cjs / unidad VM | 5/5 | 0/1: ReferenceError cantidadVenta antes del modelo | 1/1 | 3/3 E5; suite 8/8; cantidades, límites, 0.1+0.2 y redondeo; sin refactor necesario |
| 2.1 | tests/ventas.test.cjs / unidad VM | 8/8 | 3/4 E5: ReferenceError agregarRenglonVenta | 4/4 E5 | 5/5 E5, suite 10/10; duplicado, desconocido, modificación inválida y quitar último; sin refactor necesario |
| 2.2 | tests/ventas.test.cjs / unidad VM | 10/10 | 5/6 E5: ReferenceError confirmarVenta | 6/6 E5 | 8/8 E5, suite 13/13; 8 variantes fallidas sin mutación, snapshot y segunda venta; sin refactor necesario |
| 3.1 | tests/interfaz.test.cjs / contrato HTML | 13/13 | 0/2: faltaban enlaces/secciones y scripts E5 | 2/2; suite 15/15 | Dos contratos: controles/labels/mensajes y scripts locales sin inyección; browser separado; sin refactor necesario |
| 3.2 | tests/coordinacion.test.cjs / integración submit VM | 15/15 | 0/2: altas exitosas sin emitir eventos | 2/2; suite 17/17 | Libro/cliente y duplicados sin eventos adicionales; browser RED también observado |

### Refinamiento numérico y límites de la evidencia

- Luego de la suite 17/17, se agregó una aserción de redondeo `10.075`: se ejecutó `NODE --test frontend-libreria/tests/ventas.test.cjs`, **7/8 PASS, 1 FAIL** (`1007` frente a `1008`). Cambiar EPSILON por desplazamiento del exponente decimal dejó nuevamente la suite completa **17/17 PASS**.
- En ese mismo test se agregó formato exacto cerca del máximo seguro. La ejecución RED se detuvo en la aserción anterior: **no se atribuye RED previo independiente al formato extremo**. Como triangulación GREEN se ejecutó `0.01 × Number.MAX_SAFE_INTEGER` y se comprobó el sufijo literal `90.071.992.547.409,91`, además de 0.1+0.2 y 1.005.
- En 3.2 la primera ejecución tras agregar eventos alcanzó el segundo submit y reveló un doble de DOM incompleto del test (`createElement` ausente). Se completó ese doble; no se cambió producción por ese error del arnés. Resultado posterior: **17/17 PASS**.
- RED browser 3.2 delegado antes de eventos: altas 7 libros/4 clientes correctas, pero opciones `LI-7=0`/`CL-4=0`; se preservaron cliente CL-1, libro LI-3 y borrador. Reporte temporal: `C:/Users/Oficina/AppData/Local/Temp/utn-e5-coordinacion-red.json`.

Comandos ciclos modelo: `NODE --test frontend-libreria/tests/ventas.test.cjs` (RED/GREEN); `NODE --test frontend-libreria/tests/*.test.cjs` (triangulación). Contratos UI: `NODE --test frontend-libreria/tests/interfaz.test.cjs` (RED); coordinación: `NODE --test frontend-libreria/tests/coordinacion.test.cjs` (RED). La suite completa incluye ambos y confirmó GREEN.

VM no acredita DOM, presentación ni teclado. La validación de navegador se registra separadamente.

## Entrega de implementación 1.1–3.2

Se completaron las tareas 1.1–3.2 (CLI apply confirma 6/9). Antes de cerrar
3.1/3.2 el validador independiente comunicó **43/43 escenarios de aceptación
Chromium file:// PASS** y **15/15 regresiones E3/E4 PASS**, incluyendo UI de
edición pendiente, detalle histórico, cantidades manipuladas, eventos LI-7/CL-4,
teclado, consola y tamaños 320/1280. También comprobó literalmente el extremo
terminado en `,91` y redondeo 10.075 → 10,08. El detalle y evidencia durable se
añaden en la validación independiente de tareas 4.1/4.2.

No se necesitaron refactors estructurales. La conversión final y el formateador
de centavos fueron verificados juntos por la suite **17/17** después del cambio.
No se ejecutaron stage, commit, push, PR ni publicación.

## Validación independiente de aceptación (4.1 y 4.2)

Ejecución real del 19/10/2026 (Argentina; timestamps de los JSON en UTC),
Chromium **151.0.7922.34** headless mediante Playwright ya disponible en el
entorno. Se abrió `file:///F:/TPS/UTN-PROG3_TP-INTEGRADOR/frontend-libreria/index.html`;
no hubo servidor, instalación de dependencias ni conexión con la API.

| Ejecución | Resultado observado | Evidencia |
|---|---|---|
| Suite independiente de aceptación | **43/43 PASS**, 0 fallas | `browser-aceptacion.json` |
| Regresión E3/E4 sobre la UI integrada | **15/15 PASS**, 0 fallas | `browser-regresion.json` |
| Suite nativa final tras el refinamiento numérico | **17/17 PASS**, 0 fallas, 0 omitidas | `NODE --test frontend-libreria/tests/*.test.cjs`; log temporal `utn-e5-node-final.txt` |
| Coordinación E4 antes de los avisos | **RED observado**: altas 7/4, opciones LI-7/CL-4 ausentes | `browser-coordinacion-red.json` |

Las pruebas de aceptación utilizaron altas temporales E4 y, en casos de
manipulación deliberada, mutaciones en memoria aisladas mediante recarga.
Los datos iniciales de producción permanecen en seis libros y tres clientes.

### Resultados funcionales observados

- Dos libros de 1500 y 2000 con cantidades 2 y 1: subtotales **3000,00** y
  **2000,00**, total **5000,00**, también en el detalle histórico.
- Rechazo sin cliente, sin renglones, ids de cliente/libro inexistentes y
  cantidades vacías, 0, negativas, decimales, NaN e Infinity. Se forzó
  `type=text` al probar no finitos para acreditar validación JavaScript,
  independientemente del saneamiento nativo de `input type=number`.
- Ediciones inválidas pendientes bloquearon confirmar y conservaron cliente,
  renglón y valor inválido para corregirlo; errores textuales y aria-invalid.
- Duplicado informado sin cambiar cantidad; modificación válida y eliminación
  del último renglón recalcularon importes y devolvieron estado vacío/foco al
  selector. Clonar una fila DOM o alterar su id bloqueó la confirmación.
- Se revalidaron libro/cliente eliminados y precios Infinity, NaN, 0, negativos
  o fuera del límite seguro después de agregar: ninguna venta nueva.
- 0.10 + 0.20 se mostró como **0,30**; se rechazaron desbordamientos de cantidad,
  multiplicación y suma. `10.075` se mostró como **10,08**. Con precio 0.01 y
  cantidad `9007199254740991`, borrador, historial y detalle mostraron el valor
  literal **90.071.992.547.409,91**. El antiguo camino `Number/100` observado
  devolvió `,90`; la UI ya tenía la corrección al ejecutar este caso, por lo
  que este extremo acredita GREEN, no un RED browser anterior al arreglo.
- LI-7 y CL-4 aparecieron tras altas E4 sin recarga y preservaron cliente,
  libro seleccionado, cantidades, filas y filtro activo del catálogo.
- Éxito limpió cliente/renglones, agregó una vez y mostró resultado; otro envío
  limpio no duplicó. Ventas posteriores recibieron ids distintos VE-1/VE-2.
- Se mutaron título, ISBN, precio, nombre y email originales; el detalle y JSON
  de la primera venta permanecieron idénticos después de editar un borrador
  y confirmar otra venta. Se verificaron objetos/arrays independientes.
- Historial vacío, lista y consulta de detalle funcionaron. No hay controles
  de edición/eliminación ni inputs/selects de edición en el detalle.
- Regresión E3/E4: seis libros/tres clientes iniciales; filtro con espacios,
  mayúsculas y sin resultados; altas válidas, vacías, duplicadas e inválidas;
  normalización ISBN/email, tablas, mensajes, ids LI-7/CL-4 y limpieza.

### Accesibilidad, presentación y sesión efímera observadas

- Texto con etiquetas HTML se mostró literalmente en catálogo, opciones,
  borrador, lista histórica y detalle; no aparecieron elementos b/i/em/script
  derivados de esos datos.
- Navegación por hash y acceso directo a Ventas/Historial con aria-current.
  Tab pasó de cliente a libro; Enter activó enlace/agregado; labels asociados,
  errores role=alert y foco visible con outline de 3px comprobados.
- A **320 px** y **1280 px**, scrollWidth de la página coincidió con clientWidth.
  Las tablas anchas quedaron dentro de contenedores overflow-x:auto.
  Además de las medidas automáticas, el validador abrió e inspeccionó capturas
  de Ventas e Historial con borrador activo y detalle a ambos anchos: controles
  visibles, foco marcado, importes correctos y tablas con desplazamiento local.
  A 320 px algunas celdas se ajustan en varias líneas; se requiere desplazar
  cada tabla para consultar todas las columnas, como permite la consigna.
- Consola: **0 errores y 0 advertencias**. Solicitudes externas: **0**.
- Recargar tras altas y venta restauró seis libros/tres clientes y borró altas,
  borrador e historial. **E6 sigue pendiente**, sin persistencia incorporada.

### Reproducción y límites

Scripts de la sesión fuera del repositorio: `C:/Users/Oficina/AppData/Local/Temp/utn-e5-aceptacion.cjs`,
`utn-e5-regresion.cjs`, `utn-e5-coordinacion-red.cjs` y `utn-e5-visual.cjs`.
Se ejecutaron con el NODE indicado arriba. Capturas temporales inspeccionadas:
`utn-e5-visual-{ventas,historial}-{320,1280}.png` en esa misma carpeta.
Los JSON de aceptación, regresión y RED se conservaron junto a este documento;
los scripts/capturas temporales dependen de este entorno y no son requisitos
para abrir el frontend. Los pasos manuales para repetir el flujo están en README.

La validación browser fue automatizada en Chromium headless real; no se
verificaron Firefox, Safari, otros motores/versiones ni lector de pantalla.
El recorrido Tab/Enter y el foco se ejecutaron en navegador; no constituye una
auditoría completa de accesibilidad. No se ejecutaron pruebas de la API.
No hubo fallas actuales ni previas observadas en los escenarios ejecutados;
el RED de coordinación fue intencional y luego quedó GREEN. No se modificó
producción durante esta validación independiente.

## Cierre OpenSpec · 21/10/2026

- Se archivó únicamente E5 mediante el CLI en `2026-10-21-e5-venta-simulada-historial`, con sus 9/9 tareas completas. E6 permanece activo (6/9); no se archivó ni modificó.
- El checkout de referencia al cerrar es `0a16e24`: el frontend está ahora en la raíz y ya integra persistencia localStorage del Ejercicio 6. Los resultados del 19/10/2026 de este documento corresponden a la etapa E5 anterior a E6; sus afirmaciones históricas sobre reinicio y E6 pendiente no describen el estado actual.
- La especificación principal `openspec/specs/ventas-simuladas/spec.md` se sincronizó antes del archivo. Conserva el propósito, los 9 requisitos y todos los escenarios del delta original. «Sesión efímera antes de E6» mantiene su condición temporal; la actualización de ese contrato corresponde al cierre de E6, fuera de esta acción.
- Se verificaron 9/9 archivos originales idénticos por hash después de moverlos y antes de añadir esta nota. Se conservaron metadata, artifacts y JSON históricos. Se corrigieron únicamente las dos rutas de evidencia de E5 en el README actual.
- Validación CLI estricta: 5/5 especificaciones y 5/5 cambios archivados aprobados, sin incidencias. La comparación canónica entre la especificación principal y el delta archivado fue exacta. `openspec list --json` ya no lista E5.
- El comando de archivo mantuvo la validación activa; `--skip-specs` evitó volver a aplicar la sincronización ya terminada y verificada. No se modificó código funcional ni se repitieron pruebas funcionales por el mero archivado. La auditoría actual del flujo E5 se informa por separado.
### Auditoría actual de E5: ejecución local y almacenamiento

El validador independiente volvió a ejecutar el flujo de E5 el 21/10/2026 sobre `0a16e24`, en Chromium 151.0.7922.34 con contexto aislado y modo offline, abriendo `file:///F:/TPS/UTN-PROG3_TP-INTEGRADOR/index.html`. El informe durable está en [browser-local-audit-20261021.json](browser-local-audit-20261021.json).

- Estado inicial: ninguna venta. Se seleccionó CL-1, se agregó LI-1 con cantidad 2 y se confirmó VE-1 por $ 37.000,00. El borrador quedó limpio y el historial tuvo una fila.
- Se verificó una venta en `localStorage['paginas-del-sol.estado.v1'].ventas`. Al recargar se restauraron VENTAS y la fila de historial; el snapshot y el detalle permanecieron iguales (**PASS**).
- Se observaron 20 solicitudes, todas `file://`; solicitudes externas: **0**. Consola: **0 errores y 0 advertencias**. `sessionStorage` vacío y única clave localStorage esperada.
- La revisión estática delegada de los ocho scripts locales no encontró primitivas de red/API ni URLs HTTP(S). El punto de guardado de la venta es `js/ventas.js:213`, mediante `persistirEstadoBiblioteca(VENTAS)`; lectura, escritura e hidratación local viven en `js/datos.js` y `js/ventas-modelo.js` restaura las ventas guardadas.
- Alcance: comprobación del flujo E5 actual, sin modificación funcional, sin API y con la persistencia ya incorporada por E6. Esta auditoría acotada no acredita la aceptación completa de E6 ni reemplaza los resultados históricos del 19/10/2026.