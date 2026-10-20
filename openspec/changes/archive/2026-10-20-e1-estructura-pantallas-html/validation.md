# Evidencia de validación E1

Sesión 20/10/2026. Chromium (Playwright) sobre `frontend-libreria/index.html`
abierto con `file://`, en un perfil limpio (sin `localStorage` previo).
Node v22.22.0 para la suite CJS. La primera tanda se ejecutó con el frontend
en `frontend-libreria/`; la reorganización (tarea 3) se verificó después.

## Navegador

| Tarea | Verificación | Resultado observado |
|---|---|---|
| 1.1 | Enlaces de la navegación y destinos | Catálogo, Libros, Clientes, Ventas, Historial → `#catalogo`, `#libros`, `#clientes`, `#ventas`, `#historial`; los 5 destinos existen. **PASS** |
| 1.1 | `aria-current` tras cada clic | Siempre marca el enlace elegido (5/5). **PASS** |
| 1.2 | Datos de cada tarjeta | 6 libros. Ejemplo: «El viento del Aconcagua · ISBN 978-950-000-001-1 · Editorial Cordillera · Género Novela · Autores Lucía Benavídez · $ 18.500,00». **PASS** |
| 1.2 | Libro sin género | Al menos una tarjeta muestra «Sin clasificar». **PASS** |
| 2.1 | Estructura semántica | `header` 1, `nav` 1, `main` 1, `footer` 1, 5 secciones, cada una con su `h1` (Catálogo, Libros, Clientes, Ventas, Historial). **PASS** |
| 2.2 | Etiquetas de campos | 0 campos sin `label[for]` ni `aria-label`. **PASS** |
| 2.2 | Botones | 0 botones sin texto; textos: «Buscar libros», «Mostrar todo el catálogo», «Agregar libro», «Limpiar formulario», «Agregar cliente», «Agregar renglón», «Confirmar venta simulada». **PASS** |
| 2.2 | Tablas | 4 tablas con encabezados: libros (7 columnas), clientes (3), borrador de venta (5), historial (5). **PASS** |
| 2.3 | Búsqueda sin resultados | 0 tarjetas y «Sin resultados: ningún título contiene «zzzz-no-existe». Probá con otra palabra o borrá la búsqueda.» **PASS** |
| 2.3 | Búsqueda vacía (sólo espacios) | Vuelven las 6 tarjetas. **PASS** |
| 2.3 | Listas vacías | Existen los mensajes de libros, clientes e historial («Todavía no hay ventas confirmadas guardadas localmente.»). **PASS** |
| 2.3 | Alta rechazada | Cliente vacío: «El nombre completo es obligatorio. El email es obligatorio.» **PASS** |
| 2.3 | Alta correcta | «Cliente «Prueba Ejercicio Uno» dado de alta con el id CL-4.» **PASS** |
| 2.3 | Venta rechazada | Sin cliente ni renglones: «Debe seleccionar un cliente existente. Agregá al menos un libro a la venta.» **PASS** |
| 4.1 | Anchos | Sin desplazamiento horizontal de la página en 320 px ni en 1280 px. Capturas en `evidencia/`. **PASS** |
| 4.1 | Consola | 0 errores. **PASS** |

## Reorganización: proyecto local en la raíz (tarea 3)

| Verificación | Resultado observado |
|---|---|
| Archivos en la raíz | `index.html`, `css/`, `js/`, `tests/`, `README.md`, `docs/`, `openspec/`; sin `app/` ni `requirements.txt`. **PASS** |
| Repetición de la verificación de navegador desde `/index.html` de la raíz | Mismos resultados que la tabla anterior: 5 destinos, `aria-current`, 0 campos sin etiqueta, 0 botones sin texto, 6 libros, «Sin clasificar», búsqueda vacía, alta correcta CL-4, sin scroll horizontal en 320/1280 px y 0 errores de consola. **PASS** |
| Peticiones de red al abrir la página | 10 recursos cargados, todos `file://`; **0 externos**. **PASS** |
| Referencias a red en HTML/CSS/JS | Sin `http(s)://`, `fetch`, `XMLHttpRequest` ni CDN. **PASS** |
| Suite CJS desde `tests/` (`node --test tests/*.test.cjs`) | **22/22 PASS** |

## Suite CJS

`node --test frontend-libreria/tests/*.test.cjs` → **22/22 PASS**, 0 fallas
(baseline, interfaz, coordinación, ventas y persistencia).

## Límites

- La validación con teclado completa y los estilos corresponden al Ejercicio 2
  y no se repiten acá.
- El cambio se archivó sin la CLI de OpenSpec (no disponible en el entorno): la
  sincronización y el archivo se hicieron siguiendo a mano los pasos de las
  skills `openspec-sync-specs` y `openspec-archive-change`, por lo que no se
  ejecutó `openspec validate`.
