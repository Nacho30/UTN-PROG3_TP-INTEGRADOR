# Tasks

Cambio retroactivo: el Ejercicio 1 ya estaba implementado dentro de E3–E5.
Las tareas 1, 2 y 4 son verificaciones sobre el código existente; la tarea 3
reorganiza el repositorio (sin cambiar el código de las vistas). Los resultados
reales están en `validation.md`.

## 1. Vistas y navegación

- [x] 1.1 Verificar en navegador (`file://`) que la navegación principal tiene los cinco enlaces, que cada destino existe y que `aria-current` sigue a la vista elegida.
- [x] 1.2 Verificar que el catálogo muestra título, ISBN, editorial, género, autores y precio de cada libro y «Sin clasificar» para el libro sin género.

## 2. Semántica, formularios y estados

- [x] 2.1 Verificar `header`, `nav`, `main`, `footer` y un `h1` por vista.
- [x] 2.2 Verificar que todos los campos tienen etiqueta asociada, que todos los botones tienen texto de acción y que todas las tablas tienen encabezados.
- [x] 2.3 Verificar los mensajes de lista vacía, búsqueda sin resultados, búsqueda vacía con catálogo completo, alta rechazada, alta correcta y venta rechazada.

## 3. Proyecto local en la raíz

- [x] 3.1 Mover `index.html`, `css/`, `js/`, `tests/` y el README del frontend a la raíz con `git mv` y eliminar la API (`app/`, `requirements.txt`, pruebas `.http`).
- [x] 3.2 Verificar desde `index.html` de la raíz, en `file://`, que todo funciona y que no se hace ninguna petición de red; volver a correr la suite CJS desde `tests/`.

## 4. Regresión y cierre

- [x] 4.1 Ejecutar la suite CJS completa y comprobar, en 320 px y 1280 px, que no hay desplazamiento horizontal de la página ni errores de consola.
- [x] 4.2 Sincronizar la especificación en `openspec/specs/estructura-pantallas-libreria/` y archivar el cambio.
