# Design

## Context

El frontend se abre directamente desde `index.html` y carga scripts clásicos
con `defer`, en orden: `datos.js`, `utilidades.js`, `catalogo.js` y el resto.
`js/datos.js` declara las colecciones de la librería como variables globales y
`js/catalogo.js` las consume para dibujar el catálogo y filtrarlo. Véase
`proposal.md` para la motivación y la especificación delta para el contrato de
comportamiento.

## Goals / Non-Goals

**Goals:**

- Formalizar que los datos del Ejercicio 3 se guardan en variables de
  JavaScript en memoria, con ids estables y relaciones por id.
- Formalizar el catálogo generado desde `LIBROS` y las reglas del filtro.
- Dejar una traza archivable que no modifique el comportamiento si la
  implementación actual cumple los escenarios.

**Non-Goals:**

- No incorporar API, backend, servidor, `fetch` ni llamadas de red.
- No implementar ni modificar persistencia (`localStorage`, `sessionStorage`,
  IndexedDB). Eso es del Ejercicio 6.
- No cambiar altas, ventas ni historial (Ejercicios 4 y 5).

## Decisions

### Los datos son variables en memoria

Las colecciones se declaran como arrays en `js/datos.js` (`const` para
editoriales, géneros y autores; `let` para libros y clientes, que los
ejercicios siguientes amplían). Es la forma más simple de cumplir la consigna
con `file://`. Se descartó leer un JSON con `fetch` porque requiere servidor y
rompe la apertura directa desde disco. También se descartó guardar en
`localStorage` porque esa persistencia es del Ejercicio 6.

### Relaciones por id y validación al iniciar

Cada libro guarda `editorialId`, `generoId` (o `null`) y `autorIds`. Los
nombres se resuelven con `buscarPorId` al dibujar cada tarjeta.
`validarRelacionesLibros` se ejecuta al iniciar y avisa en la consola si
alguna relación no existe. Se descartó copiar los nombres dentro de cada libro
porque duplicaría datos y podría generar inconsistencias.

### Renderizado seguro con el DOM

Las tarjetas y los mensajes se construyen con `createElement` y
`textContent`, nunca con `innerHTML`. Así cualquier texto con etiquetas HTML
se muestra literal.

### Verificación sin persistencia

La implementación actual también incluye el código de persistencia del
Ejercicio 6. Para comprobar que el Ejercicio 3 no depende de él, la validación
abre la página con `__E6_NO_AUTOINICIALIZAR__ = true` y cuenta los accesos a
`Storage`. El catálogo tiene que funcionar sólo con las variables y registrar
cero accesos.

## Risks / Trade-offs

- [Los datos se pierden al recargar] → Es el comportamiento esperado en este
  ejercicio y se documenta. La persistencia llega con el Ejercicio 6.
- [Las variables globales pueden colisionar entre scripts] → Se usan nombres
  en mayúsculas y un único archivo de datos, cargado en primer lugar.

## Migration Plan

No hay migración de datos ni despliegue de servicios. La aplicación conserva
su apertura directa mediante `index.html`.
