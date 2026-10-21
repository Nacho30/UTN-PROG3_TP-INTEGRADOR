# Validación del Ejercicio 6

## Evidencia ejecutada

Fecha: 21/10/2026.

Desde la raíz del repositorio se ejecutó:

```powershell
node --test tests/*.test.cjs
```

Resultado observado: **22/22 pruebas aprobadas**, 0 fallos y sin dependencias
externas. La suite cubre la inicialización con semillas, restauración válida,
recuperación ante JSON inválido, reaperturas sin duplicación, persistencia de
altas, venta de $ 5.000 y conservación del precio histórico.

## Evidencia de navegador (21/10/2026)

La validación de navegador se ejecutó el **21/10/2026** con **Chrome headless
156.0.8078.47** controlado por **CDP** sobre `file://` (sin servidor ni npm),
con un **perfil aislado**; `localStorage` resultó disponible en `file://` y
persistente tras `Page.reload` (JSON idéntico de 1180 caracteres). El baseline
`node --test tests/*.test.cjs` previo al harness fue **22/22**. La evidencia
completa quedó registrada en `browser-persistencia-e6.json` de este cambio.

| Caso | Resultado observado |
|------|---------------------|
| 1 · Búsqueda | `"  VIEN "` → 1 coincidencia («1 libro coincide con «VIEN».»); vacía → 6 tarjetas («Mostrando los 6 libros del catálogo.»); «zzz inexistente» → 0 tarjetas y «Sin resultados: ningún título contiene «zzz inexistente». Probá con otra palabra o borrá la búsqueda.». Tras recarga, mismo comportamiento |
| 2 · ISBN | Duplicado `978-950-000-001-1` rechazado («El ISBN ya está registrado: al comparar se ignoran espacios, guiones y mayúsculas.», sigue en 6 filas); altas válidas «Prueba E6» (` 978 950 000 009 7 `, precio 1500) → **LI-7** y «Prueba E6 B» (2000) → **LI-8**; tras recarga: 8 filas LI-1…LI-8 en DOM y en storage |
| 3 · Email | `ana@sin-dominio` rechazado («El email no tiene un formato válido (ejemplo: nombre@dominio.com).»); `ANA.GOMEZ@EJEMPLO.COM` rechazado («El email ya está registrado: al comparar se ignoran espacios y mayúsculas.»); «Prueba E6 Cliente» (`prueba.e6@ejemplo.com`) → **CL-4**, persistido tras recarga (4 filas) |
| 4 · Venta inválida | Sin cliente / sin renglones → «Debe seleccionar un cliente existente.» / «Agregá al menos un libro a la venta.»; cantidades 0 / −2 / 1.5 → «Renglón 1: la cantidad debe ser un entero mayor que cero y seguro.» con `aria-invalid`; libro repetido → «Renglón 2: el libro ya está en la venta; modificá su cantidad.»; tras recarga: 0 ventas y historial vacío |
| 5 · Venta válida | LI-7×2 ($ 1.500,00 → $ 3.000,00) + LI-8×1 ($ 2.000,00 → $ 2.000,00), total **$ 5.000,00**; «Venta **VE-1** confirmada por $ 5.000,00. Podés consultar su detalle en Historial o iniciar otra venta.»; fila «VE-1 \| 21/10/2026, 10:45:33 \| Ana Gómez \| $ 5.000,00 \| Ver detalle»; persiste tras recarga (`totalCentavos` 500000) |
| 6 · Recarga general | 8 libros LI-1…LI-8 únicos y 4 clientes CL-1…CL-4 únicos (semillas sin duplicar y altas presentes); VE-1 en historial; el borrador **no** se persiste (claves del sobre: `version`, `libros`, `clientes`, `ventas`) |
| 7 · Precio histórico | Modificando **sólo** `libros[].precio` del storage (LI-7→9999, LI-8→8888), el catálogo tras recarga muestra **$ 9.999,00** y **$ 8.888,00**, y el detalle de VE-1 conserva LI-7 c=2 **$ 1.500,00 / $ 3.000,00**, LI-8 c=1 **$ 2.000,00 / $ 2.000,00** y **Total: $ 5.000,00** (storage de la venta intacto) |
| 8 · Accesibilidad y anchos | Tab: 16/16 paradas focales visibles (`:focus-visible`, `outline: 3px solid`); **320 px**: `scrollWidth 305 = clientWidth 305` en las 5 vistas (#catalogo, #libros, #clientes, #ventas, #historial), con los `.table-wrap` absorbiendo el desborde (wrap 273 vs tabla 588 px); **1280 px**: `scrollWidth 1265 = clientWidth 1265` en las 5 vistas |
| Extra · Inicialización y reinicio | Primera apertura en perfil nuevo crea la clave `paginas-del-sol.estado.v1` con las semillas (6 libros, 3 clientes, 0 ventas); `removeItem` + recarga restaura las semillas |
| Extra · Consola y red | **0 errores / 0 advertencias** de consola; 130 solicitudes, todas `file://`, **0 externas** |

El caso 7 se replicó siguiendo el procedimiento de la consigna (modificar sólo
el precio del catálogo persistido y recargar). La comprobación guiada por el
docente en una copia del proyecto sigue siendo parte de la entrega; el
comportamiento observado coincide con lo pedido.

## Estado

Las tareas 1.3, 3.1 y 3.3 quedaron completas con esta evidencia (9/9 tareas en
`openspec list`) y el cambio se archiva.
