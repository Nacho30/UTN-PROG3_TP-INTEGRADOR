# TPI · Frontend de una librería

Frontend de la librería «Páginas del Sol», hecho únicamente con HTML, CSS y
JavaScript nativos. No usa librerías, frameworks, CDNs, API ni servidor: los
datos son ficticios y viven en el navegador.

## Cómo abrirlo

1. Descargar o clonar el repositorio.
2. Abrir `frontend-libreria/index.html` con doble clic en cualquier navegador
   actual. No hace falta npm ni levantar un servidor.

## Estructura

```
frontend-libreria/
├── index.html         Catálogo, altas de libros y altas de clientes
├── css/styles.css     Estilos propios
└── js/
    ├── datos.js       Datos iniciales: editoriales, géneros, autores, libros y clientes
    ├── utilidades.js  Utilidades compartidas (ids siguientes, errores, celdas de tabla)
    ├── catalogo.js    Renderizado del catálogo, filtro por título y eventos
    ├── navegacion.js  aria-current de la navegación según la sección activa
    ├── libros.js      Alta de libros: opciones, validaciones y tabla
    └── clientes.js    Alta de clientes: validaciones y tabla
```

## Estado de los ejercicios

| Ejercicio | Estado |
|-----------|--------|
| 3 · Datos locales, catálogo y filtro | Implementado |
| 1 · Pantallas Libros, Clientes, Ventas e Historial | Parcial: funcionan Catálogo (E3), Libros (E4) y Clientes (E4); faltan Ventas e Historial |
| 2 · Presentación CSS | Parcial: catálogo, formularios y tablas, adaptables a 320 y 1280 px |
| 4 · Altas de libros y clientes | Implementado (en memoria, sin persistencia) |
| 5 · Ventas e Historial | Pendiente |
| 6 · `localStorage` | Pendiente |

### Pantallas que funcionan hoy

- **Catálogo** (Ejercicio 3): buscador por título y tarjetas de los libros.
- **Libros** (Ejercicio 4): alta de libros con validaciones y tabla de listado.
- **Clientes** (Ejercicio 4): alta de clientes con validaciones y tabla de listado.

### Qué queda pendiente

- Ventas e Historial (Ejercicio 5).
- Persistencia con `localStorage` (Ejercicio 6): hoy los altas se pierden al
  recargar la página.
- Editar y eliminar registros.

## Ejercicio 3 · Datos locales, catálogo y filtro

### Datos iniciales (`js/datos.js`)

Cada entidad es un array de objetos con un `id` estable (`ED-1`, `GE-1`,
`AU-1`, `LI-1`, `CL-1`…). Los libros se relacionan por id:

| Campo del libro | Relación | Obligatoria |
|-----------------|----------|-------------|
| `editorialId` | `EDITORIALES[].id` | Sí |
| `generoId` | `GENEROS[].id` (o `null`) | No: sin género se muestra «Sin clasificar» |
| `autorIds` | `AUTORES[].id` | Sí, uno o más |

Conjunto inicial: 6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes.
El libro «Cuaderno de viaje» no tiene género, para mostrar «Sin clasificar».
Al iniciar, `validarRelacionesLibros` comprueba que todas las relaciones
existan y avisa en la consola si alguna falla.

### Catálogo y filtro (`js/catalogo.js`)

- El catálogo se genera desde el array `LIBROS`: cada tarjeta muestra título,
  ISBN, editorial, género, autores y precio (con dos decimales).
- El filtro por título quita los espacios de los extremos, no distingue
  mayúsculas de minúsculas y busca coincidencias parciales. Filtra mientras se
  escribe; Enter no recarga la página.
- Búsqueda vacía → catálogo completo. Sin coincidencias → mensaje
  «Sin resultados…» con el texto buscado. Catálogo vacío → mensaje propio.
- Todo el contenido se inserta con `textContent`, por lo que lo que escribe el
  usuario se muestra como texto y nunca se interpreta como HTML.

### Verificación realizada (Ejercicio 3)

Probado en Chromium (sin servidor, abriendo el archivo directamente):

| Caso | Resultado observado |
|------|---------------------|
| Búsqueda `"  VIEN  "` (mayúsculas y espacios) | Muestra solo «El viento del Aconcagua» |
| Búsqueda `"DE"` | 5 coincidencias parciales |
| Búsqueda vacía o solo espacios | Catálogo completo (6 libros) |
| Búsqueda `"zzz inexistente"` | 0 libros y mensaje «Sin resultados…» |
| Búsqueda `<img src=x onerror=alert(1)>` | Se muestra como texto literal |
| Libro sin género | Etiqueta y dato «Sin clasificar» |
| Anchos de 320 px y 1280 px | Sin desplazamiento horizontal de la página |
| Recorrido con Tab | Llega a buscador y botones con foco visible |
| Consola del navegador | Sin errores ni advertencias |

## Ejercicio 4 · Altas de libros y clientes

Las secciones `#libros` y `#clientes` se agregan a la misma página que el
catálogo; la navegación del encabezado marca con `aria-current="page"` la
sección activa según el hash (`js/navegacion.js`).

### Formulario de libros (`#form-libro`)

- Campos: título, ISBN, precio, editorial (select), género (select, con
  «Sin clasificar» como valor vacío) y autores.
- Los autores se muestran con **checkboxes** (no con select multiple) porque
  son pocas opciones que se ven todas a la vez: se alternan con un clic y el
  grupo va dentro de un `fieldset`.
- Las opciones de editorial, género y autores se generan desde `EDITORIALES`,
  `GENEROS` y `AUTORES` con `createElement` + `textContent`.
- Validaciones (se muestran **todos** los errores juntos, en un contenedor
  con `role="alert"`, y no se agrega el registro si falla alguna):
  título e ISBN no vacíos; ISBN único comparando sin espacios, guiones ni
  mayúsculas; precio numérico mayor que cero; editorial existente; al menos
  un autor existente; género opcional, pero si se asigna debe existir.
- El id nuevo es `LI-7`, `LI-8`… calculado con el **mayor sufijo numérico**
  existente (no con la cantidad de libros).

### Formulario de clientes (`#form-cliente`)

- Campos: nombre completo y email (sin apellido).
- Validaciones: nombre y email no vacíos; email con formato válido
  (`nombre@dominio.com`); email único comparando con `trim()` + minúsculas.
- El id nuevo es `CL-4`, `CL-5`… con el mismo criterio de mayor sufijo.

### Comportamiento común

- Ambos envíos usan `preventDefault()`: la página nunca se recarga.
- Tras un alta correcta: se limpia el formulario, se muestra un mensaje de
  éxito (`.message--info`, `role="status"`), se actualiza la tabla y, en el
  caso de los libros, también se refresca el catálogo con la búsqueda activa
  del momento (se reutiliza `renderizarCatalogo` + `filtrarPorTitulo`).
- Botón «Limpiar formulario» en ambos formularios: vacía campos, errores y
  mensaje, y devuelve el foco al primer campo.
- Todos los datos del usuario se insertan con `textContent`.

## Cómo probar las altas (Ejercicio 4)

### Alta de un libro

1. Abrir `frontend-libreria/index.html` y hacer clic en «Libros» (o abrir
   `index.html#libros` directamente).
2. Completar: Título (ej.: «El secreto del valle»), ISBN (ej.:
   `978-950-000-007-3`), Precio (ej.: `12500`), Editorial (ej.: «Editorial
   Cordillera»), Género (ej.: «Novela» o «Sin clasificar») y marcar al menos
   un autor.
3. Hacer clic en «Agregar libro».
4. Verificar: mensaje «Libro … dado de alta con el id LI-7», la fila nueva en
   la tabla «Libros cargados» y el catálogo actualizado sin recargar (si hay
   una búsqueda activa que no coincide con el título nuevo, el catálogo
   respeta el filtro).
5. Para probar validaciones: vaciar campos o repetir un ISBN existente y
   reenviar; deben listarse todos los errores juntos arriba de la tabla.

### Alta de un cliente

1. Ir a la sección «Clientes» (`index.html#clientes`).
2. Completar Nombre completo (ej.: «Diego Molina») y Email (ej.:
   `diego.molina@ejemplo.com`).
3. Hacer clic en «Agregar cliente».
4. Verificar: mensaje «Cliente … dado de alta con el id CL-4» y la fila nueva
   en la tabla «Clientes cargados».
5. Para probar validaciones: usar un email existente en mayúsculas (ej.:
   `ANA.GOMEZ@EJEMPLO.COM`) o con formato inválido (ej.: `ana@sin-dominio`);
   deben listarse los errores y no agregar el cliente.

## Verificación de los casos del Ejercicio 4

Verificación real del **16/10/2026** con **Chrome headless 155.0.8059.84**
(abierto con `file://`, sin servidor ni npm) controlado por **CDP**: los
formularios se completaron con `Runtime.evaluate` y el envío se disparó con
`form.requestSubmit()` (equivale al clic en el botón); el teclado se probó con
`Input.dispatchKeyEvent` y los anchos con `Emulation.setDeviceMetricsOverride`.
Estado inicial observado: 6 libros, 3 clientes, 6 tarjetas de catálogo y
consola sin errores.

| Caso | Qué se espera observar | Resultado |
|------|------------------------|-----------|
| ISBN duplicado (igual al de un libro existente) | No se agrega; el `role="alert"` lista «El ISBN ya está registrado…» y no aparece fila nueva | Aprobado: se rechazó con «El ISBN ya está registrado: al comparar se ignoran espacios, guiones y mayúsculas.», `aria-invalid` en `libro-isbn` y listado sin cambios (6 → 6 filas) |
| ISBN nuevo con espacios o guiones distinto pero igual normalizado | Se rechaza: la comparación ignora espacios, guiones y mayúsculas | Aprobado: `978 950 000 001 1` y `9789500000011` (mismos dígitos que LI-1) mostraron el mismo mensaje exacto y el listado quedó en 6 filas |
| Email inválido (sin `@` o sin dominio) | No se agrega; error «El email no tiene un formato válido…» | Aprobado: `ana@sin-dominio` y `no-es-un-email` mostraron «El email no tiene un formato válido (ejemplo: nombre@dominio.com).»; 3 filas sin cambios |
| Email existente escrito en mayúsculas o con espacios | Se rechaza: la comparación usa `trim()` + minúsculas | Aprobado: `ANA.GOMEZ@EJEMPLO.COM` mostró «El email ya está registrado: al comparar se ignoran espacios y mayúsculas.»; sigue en 3 clientes |
| Email nuevo con formato válido | Se agrega como `CL-n` con mensaje de éxito y fila en la tabla | Aprobado: «Cliente «Diego Rivas» dado de alta con el id CL-4.», 4.ª fila `CL-4 · Diego Rivas · diego.rivas@ejemplo.com` y formulario limpio tras el alta |
| Libro sin autores | No se agrega; error «Debe seleccionar al menos un autor» y `aria-invalid` en las casillas | Aprobado: «Debe seleccionar al menos un autor.», `aria-invalid` en `libro-autor-AU-1/2/3` y sin fila nueva (7 → 7) |
| Precio 0 o negativo | No se agrega; error «El precio debe ser un número mayor que cero» | Aprobado: con `0` y con `-5` se mostró «El precio debe ser un número mayor que cero (ejemplo: 1200 o 1200.5).»; sin fila nueva |
| Editorial vacía (sin seleccionar) | No se agrega; error «Debe seleccionar una editorial» | Aprobado: «Debe seleccionar una editorial.»; sin fila nueva |
| Foco y teclado | Tab recorre formulario y botones con foco visible; Enter en un campo envía sin recargar | Aprobado: desde la carga limpia, Tab llevó skip-link → marca → nav (Catálogo, Libros, Clientes) → buscador → sus botones → campos y casillas del formulario de libros → sus botones → formulario de clientes; todos con `:focus-visible` y `outline: 3px solid rgb(31, 95, 191)`. Enter en `#libro-titulo` disparó el envío (apareció el error de ISBN duplicado) sin recargar |
| 320 px y 1280 px | Sin scroll horizontal de la página; la tabla se desplaza dentro de su contenedor | Aprobado: a 320 px, `innerWidth=320` y `scrollWidth` de `html` y `body`=305 px (igual al `clientWidth`, por la barra vertical de 15 px) en Catálogo, Libros y Clientes; la tabla de Libros mide 589 px dentro de un `.table-wrap` de 273 px con `overflow-x: auto` (Clientes: 313 px > 273 px, también absorbido). A 1280 px, `scrollWidth`=1265 px y ambas tablas 1168 px = 1168 px (sin desborde) |
| ISBN nuevo con escritura distinta (aceptado) | Se da de alta como LI-7 y aparece en el listado y en el catálogo | Aprobado: ` 978 950 000 007 0 ` (con bordes) entró como LI-7 con «Libro «El secreto del valle» dado de alta con el id LI-7.»; 7.ª fila con ISBN «978 950 000 007 0» y 7 tarjetas en el catálogo |
| Título vacío | No se agrega; error «El título es obligatorio» | Aprobado: «El título es obligatorio.» y `aria-invalid` en `libro-titulo` |
| ISBN vacío | No se agrega; error «El ISBN es obligatorio» | Aprobado: «El ISBN es obligatorio.» y `aria-invalid` en `libro-isbn` |
| Nombre de cliente vacío | No se agrega; error «El nombre completo es obligatorio» | Aprobado: «El nombre completo es obligatorio.» y `aria-invalid` en `cliente-nombre` |
| Envíos sin recarga (`preventDefault`) | Ningún envío recarga la página | Aprobado: `window.__marca = 1` siguió existiendo tras los 16 envíos (15 con `requestSubmit()` y 1 con Enter) y `location.href` no cambió (el único evento de navegación tipo «reload» del registro fue el `Page.reload` inicial de la herramienta de verificación, no un envío del formulario) |
| Consola del navegador | Sin errores ni advertencias | Aprobado: 0 errores y 0 advertencias, incluida la carga inicial capturada con los dominios `Runtime` y `Log` de CDP |
