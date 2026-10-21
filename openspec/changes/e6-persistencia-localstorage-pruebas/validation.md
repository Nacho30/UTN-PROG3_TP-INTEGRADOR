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

## Límite de validación manual

La herramienta de navegador de este entorno bloqueó la apertura de URL con
esquema `file://`. Por ello no se ejecutaron ni se marcan como aprobadas las
pruebas manuales de recarga visual, historial en navegador, teclado y anchos
de 320/1280 px. Deben realizarse localmente abriendo `index.html` con doble
clic y registrando los resultados en el README antes de archivar el cambio.

## Estado

Las tareas 1.3, 3.1 y 3.3 permanecen abiertas porque requieren evidencia real
en navegador y resultados manuales, conforme a la consigna. No se archivó el
cambio OpenSpec para no presentar una entrega incompleta como cerrada.
