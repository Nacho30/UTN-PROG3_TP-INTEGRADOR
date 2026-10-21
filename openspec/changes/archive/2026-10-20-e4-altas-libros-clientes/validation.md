# Evidencia de validación E4

Verificación real del **16/10/2026** con **Chrome headless 155.0.8059.84**
(abierto con `file://`, sin servidor ni npm) controlado por **CDP**: los
formularios se completaron con `Runtime.evaluate` y el envío se disparó con
`form.requestSubmit()` (equivale al clic en el botón); el teclado se probó
con `Input.dispatchKeyEvent` y los anchos con
`Emulation.setDeviceMetricsOverride`. Estado inicial observado: 6 libros,
3 clientes, 6 tarjetas de catálogo y consola sin errores.

## Navegador

| Caso | Qué se espera observar | Resultado |
|------|------------------------|-----------|
| ISBN duplicado (igual al de un libro existente) | No se agrega; el `role="alert"` lista «El ISBN ya está registrado…» y no aparece fila nueva | Aprobado: se rechazó con «El ISBN ya está registrado: al comparar se ignoran espacios, guiones y mayúsculas.», `aria-invalid` en `libro-isbn` y listado sin cambios (6 → 6 filas) |
| ISBN nuevo con espacios o guiones distinto pero igual normalizado (`978 950 000 001 1`) | Se rechaza: la comparación ignora espacios, guiones y mayúsculas | Aprobado: mostró el mismo mensaje exacto y el listado quedó en 6 filas |
| ISBN nuevo con espacios o guiones distinto pero igual normalizado (`9789500000011`) | Se rechaza: la comparación ignora espacios, guiones y mayúsculas | Aprobado: mostró el mismo mensaje exacto y el listado quedó en 6 filas |
| ISBN nuevo con escritura distinta (aceptado) | Se da de alta como LI-7 y aparece en el listado y en el catálogo | Aprobado: ` 978 950 000 007 0 ` (con bordes) entró como LI-7 con «Libro «El secreto del valle» dado de alta con el id LI-7.»; 7.ª fila con ISBN «978 950 000 007 0» y 7 tarjetas en el catálogo |
| Email inválido (sin `@` o sin dominio) | No se agrega; error «El email no tiene un formato válido…» | Aprobado: `ana@sin-dominio` y `no-es-un-email` mostraron «El email no tiene un formato válido (ejemplo: nombre@dominio.com).»; 3 filas sin cambios |
| Email existente escrito en mayúsculas o con espacios | Se rechaza: la comparación usa `trim()` + minúsculas | Aprobado: `ANA.GOMEZ@EJEMPLO.COM` mostró «El email ya está registrado: al comparar se ignoran espacios y mayúsculas.»; sigue en 3 clientes |
| Email nuevo con formato válido | Se agrega como `CL-n` con mensaje de éxito y fila en la tabla | Aprobado: «Cliente «Diego Rivas» dado de alta con el id CL-4.», 4.ª fila `CL-4 · Diego Rivas · diego.rivas@ejemplo.com` y formulario limpio tras el alta |
| Libro sin autores | No se agrega; error «Debe seleccionar al menos un autor» y `aria-invalid` en las casillas | Aprobado: «Debe seleccionar al menos un autor.», `aria-invalid` en `libro-autor-AU-1/2/3` y sin fila nueva (7 → 7) |
| Precio 0 | No se agrega; error «El precio debe ser un número mayor que cero» | Aprobado: se mostró «El precio debe ser un número mayor que cero (ejemplo: 1200 o 1200.5).»; sin fila nueva |
| Precio −5 | No se agrega; error «El precio debe ser un número mayor que cero» | Aprobado: se mostró «El precio debe ser un número mayor que cero (ejemplo: 1200 o 1200.5).»; sin fila nueva |
| Editorial vacía (sin seleccionar) | No se agrega; error «Debe seleccionar una editorial» | Aprobado: «Debe seleccionar una editorial.»; sin fila nueva |
| Título vacío | No se agrega; error «El título es obligatorio» | Aprobado: «El título es obligatorio.» y `aria-invalid` en `libro-titulo` |
| ISBN vacío | No se agrega; error «El ISBN es obligatorio» | Aprobado: «El ISBN es obligatorio.» y `aria-invalid` en `libro-isbn` |
| Nombre de cliente vacío | No se agrega; error «El nombre completo es obligatorio» | Aprobado: «El nombre completo es obligatorio.» y `aria-invalid` en `cliente-nombre` |
| Envíos sin recarga (`preventDefault`) | Ningún envío recarga la página | Aprobado: `window.__marca = 1` siguió existiendo tras los 16 envíos (15 con `requestSubmit()` y 1 con Enter) y `location.href` no cambió (el único evento de navegación tipo «reload» del registro fue el `Page.reload` inicial de la herramienta de verificación, no un envío del formulario) |
| Foco y teclado (Tab) | Tab recorre formulario y botones con foco visible; Enter en un campo envía sin recargar | Aprobado: desde la carga limpia, Tab llevó skip-link → marca → nav (Catálogo, Libros, Clientes) → buscador → sus botones → campos y casillas del formulario de libros → sus botones → formulario de clientes; todos con `:focus-visible` y `outline: 3px solid rgb(31, 95, 191)`. Enter en `#libro-titulo` disparó el envío (apareció el error de ISBN duplicado) sin recargar |
| 320 px | Sin scroll horizontal de la página; la tabla se desplaza dentro de su contenedor | Aprobado: `innerWidth=320` y `scrollWidth` de `html` y `body`=305 px (igual al `clientWidth`, por la barra vertical de 15 px) en Catálogo, Libros y Clientes; la tabla de Libros mide 589 px dentro de un `.table-wrap` de 273 px con `overflow-x: auto` (Clientes: 313 px > 273 px, también absorbido) |
| 1280 px | Sin desborde de tablas | Aprobado: `scrollWidth`=1265 px y ambas tablas 1168 px = 1168 px (sin desborde) |
| Consola del navegador | Sin errores ni advertencias | Aprobado: 0 errores y 0 advertencias, incluida la carga inicial capturada con los dominios `Runtime` y `Log` de CDP |

## Límites

- No se modificó código funcional: el cambio formaliza y verifica el
  comportamiento existente de la sesión del Ejercicio 4 (commit `1a36683`).
- Fuera de alcance: ventas, historial y renglones (Ejercicio 5) y
  persistencia con `localStorage` (Ejercicio 6). Las altas de este ejercicio
  viven sólo en memoria: se pierden al recargar. Tampoco se cubren editar ni
  eliminar registros, API ni backend.
