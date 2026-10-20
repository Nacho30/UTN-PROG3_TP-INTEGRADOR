# Design

## Context

El frontend se abre directamente desde `frontend-libreria/index.html` y carga
scripts clásicos que hoy comparten arrays globales en memoria. Las altas E4 y
las ventas/snapshots E5 modifican esas colecciones durante la sesión; al
recargar, `datos.js` vuelve a crear los ejemplos. Véanse `proposal.md` y la
especificación de persistencia para la motivación y el contrato.

## Goals / Non-Goals

**Goals:**
- Restaurar una única fuente de datos mutable antes de que los módulos de UI se
  inicialicen.
- Persistir libros, clientes y ventas sin alterar las relaciones de catálogo ni
  los snapshots históricos E5.
- Hacer comprobable el comportamiento mediante pruebas CJS y validación manual
  en navegador.

**Non-Goals:**
- Sincronizar datos entre navegadores, perfiles, dispositivos u orígenes.
- Persistir el borrador de una venta, añadir autenticación/servidor o cambiar
  reglas de validación y cálculo ya existentes.
- Agregar dependencias, módulos ES, frameworks, CDNs o backend.

## Decisions

### Un único sobre de estado versionado en `localStorage`

Se guardará una clave con un objeto versionado que agrupe `libros`, `clientes` y
`ventas`. Esto permite detectar una ausencia de estado como primera apertura y
mantiene las tres colecciones consistentes en una misma lectura/escritura. Un
conjunto de claves independientes fue descartado porque puede restaurar una
mezcla parcial de versiones tras una escritura interrumpida.

### Semillas inmutables y arrays de trabajo restaurables

Los ejemplos de `datos.js` serán el respaldo de primera carga, pero los arrays
que consumen catálogo, altas y ventas se hidratarán desde una copia profunda del
estado local antes de iniciar la interfaz. Así se evita mutar accidentalmente
las semillas y se mantiene la compatibilidad con scripts clásicos y apertura
por `file://`. Se descartó migrar a módulos ES porque exigiría un servidor en
algunos navegadores y excede el alcance.

### Guardado en los límites de mutación

Las altas válidas y la confirmación satisfactoria de una venta dispararán el
guardado, no cada evento de teclado. La inicialización también guardará las
semillas una sola vez. Esta decisión evita persistir formularios inválidos y
no añade el borrador de venta al contrato E6.

### Ventas como snapshots ya calculados

El formato histórico existente se conservará y se persistirá como copia
profunda. El detalle de historial seguirá leyéndose de sus renglones guardados,
no del catálogo actual; por ello una edición manual de precio en el catálogo
local no puede recalcular una venta anterior.

### Pruebas por capas

Las funciones puras de hidratación/serialización se probarán con `node:test`
y almacenamiento simulado. La evidencia manual cubrirá los flujos de navegador
que el VM no representa: recarga real, `localStorage`, teclado y anchos.

## Risks / Trade-offs

- [Estado local corrupto o de una versión incompatible] → validar la forma
  mínima y restablecer las semillas, sin ejecutar contenido almacenado.
- [Cuota o acceso denegado a `localStorage`] → informar un error de texto y no
  presentar un guardado exitoso inexistente; el flujo de sesión permanece
  utilizable en memoria.
- [Manipulación manual del catálogo] → se limita a la prueba pedagógica del
  precio histórico; el README documentará la clave y estructura esperadas.
- [Contaminación entre pruebas] → cada prueba CJS usará almacenamiento aislado
  y no tocará el perfil del navegador.

## Migration Plan

1. En la primera apertura, crear el sobre de estado desde los ejemplos actuales.
2. En instalaciones que no tengan el sobre, no hay datos previos que migrar.
3. Si se necesita revertir, eliminar la clave local documentada restaura los
   ejemplos al recargar; el cambio no afecta archivos de servidor ni APIs.
