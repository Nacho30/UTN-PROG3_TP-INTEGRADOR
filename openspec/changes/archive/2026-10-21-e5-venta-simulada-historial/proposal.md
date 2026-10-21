# Proposal

## Why

El frontend local ya permite consultar libros y dar de alta libros/clientes, pero no permite simular ventas ni consultar operaciones anteriores. El Ejercicio 5 de la página 5 de la consigna requiere completar ese recorrido conservando E3/E4 y el uso por doble clic.

## What Changes

- Incorporar secciones Ventas e Historial, enlaces por hash, estados vacíos, etiquetas y mensajes accesibles con el CSS propio existente.
- Preparar un borrador con cliente existente, libros existentes y cantidades enteras positivas; informar libros duplicados sin agregarlos, permitir cambiar cantidades y quitar renglones.
- Calcular importes mediante centavos enteros seguros y presentar dos decimales con `formatoPrecio`.
- Revalidar completamente antes de confirmar y registrar una sola vez id de sesión, fecha y copias históricas independientes de cliente/renglones/importes; una falla conserva el borrador.
- Refrescar opciones tras altas E4 sin recargar ni perder el borrador; limpiar la venta únicamente tras una confirmación correcta.
- Documentar pruebas reales y conservar explícitamente E6 pendiente, con ventas y altas sólo en memoria.

## Capabilities

### New Capabilities

- `ventas-simuladas`: preparación, validación y confirmación local de ventas con consulta histórica independiente del catálogo actual.

### Modified Capabilities

Ninguna: no existen specs principales previas. E3/E4 mantienen sus contratos actuales.

## Impact

Cambios mínimos dentro de `frontend-libreria/`: HTML, CSS, nuevos scripts clásicos para modelo/interfaz de ventas, avisos de altas en `libros.js`/`clientes.js`, pruebas opcionales con el runner nativo de Node y README. Los artifacts de este cambio viven en `openspec/changes/e5-venta-simulada-historial/`.

No se incorporan dependencias, módulos ES, servidor, API, red, almacenamiento, stock, cobros, facturación, seguridad ni otros ejercicios. `app/`, dependencias Python, tests de API y `docs/prompts.md` quedan fuera. No se ejecuta stage, commit, push, PR ni publicación.
