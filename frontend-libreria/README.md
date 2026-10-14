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
├── index.html        Vista de catálogo (entrada del proyecto)
├── css/styles.css    Estilos propios
└── js/
    ├── datos.js      Datos iniciales: editoriales, géneros, autores, libros y clientes
    └── catalogo.js   Renderizado del catálogo, filtro por título y eventos
```

## Estado de los ejercicios

| Ejercicio | Estado |
|-----------|--------|
| 3 · Datos locales, catálogo y filtro | Implementado |
| 1 · Pantallas Libros, Clientes, Ventas e Historial | Pendiente (solo existe la vista Catálogo) |
| 2 · Presentación CSS | Parcial: estilos del catálogo, adaptable a 320 y 1280 px |
| 4, 5 y 6 · Altas, ventas y `localStorage` | Pendientes |

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

### Verificación realizada

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
