# Design

## Context

`frontend-libreria/index.html` es una sola página con cinco secciones
(`#catalogo`, `#libros`, `#clientes`, `#ventas`, `#historial`) a las que se
llega desde la navegación principal. `js/navegacion.js` mantiene
`aria-current="page"` en el enlace de la sección activa. El ejercicio se
construyó de forma incremental dentro de los cambios E3, E4 y E5.

## Goals / Non-Goals

**Goals:**
- Dejar especificado, con escenarios verificables, lo que el Ejercicio 1 exige.
- Comprobar cada escenario contra la implementación actual.

**Non-Goals:**
- Cambiar la maquetación, los estilos (Ejercicio 2) o el comportamiento de
  datos, altas, ventas y persistencia (Ejercicios 3 a 6).

## Decisions

### Una sola página con secciones ancladas

La consigna permite varias páginas o secciones de una misma página. Se mantiene
la página única con anclas: no requiere servidor, conserva el estado en memoria
entre vistas y la navegación funciona con teclado y desde `file://`.

### Especificación retroactiva sin cambios de código

El cambio documenta un comportamiento existente. Las tareas son de
verificación, no de implementación. Si una verificación hubiese fallado, se
habría registrado el fallo en lugar de corregir el código desde este cambio.

### Repositorio sólo con el frontend, entrada en la raíz

La consigna pide entregar `index.html`, carpetas de CSS, JavaScript y recursos
locales y un README, sin API, base de datos ni servidor. Se eliminan la API y
su interfaz de proveedores y el frontend sube a la raíz con `git mv`, así se
conserva el historial de cada archivo. No hace falta reescribir rutas: el HTML
usa `css/…` y `js/…`, y las pruebas resuelven `../js` desde `tests/`.

## Risks / Trade-offs

- Riesgo: perder la API del TP backend. Mitigación: queda en el historial de
  Git (commit anterior a esta reorganización) y en el TP propio de la Unidad 2.

- Riesgo: que la especificación describa más de lo implementado. Mitigación:
  cada requisito se verificó en navegador (`validation.md`).
