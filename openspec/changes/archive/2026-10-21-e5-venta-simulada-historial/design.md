# Design

## Context

Ver motivación en `proposal.md` y requisitos en `specs/ventas-simuladas/spec.md`. Relevamiento del checkout: API FastAPI independiente en `app/` y frontend sin dependencias en `frontend-libreria/`. `index.html` carga `datos`, `utilidades`, `catalogo`, `navegacion`, `libros`, `clientes` con defer y DOMContentLoaded; no hay package.json ni runner frontend configurado. Node v24.19.0 está disponible en el runtime del entorno y permite pruebas opcionales con `node:test`, sin instalar nada ni alterar cómo abre el frontend.

`datos.js` expone seis libros y tres clientes con ids; las altas hacen push a esos arrays. `catalogo.js` comparte buscarPorId y formatoPrecio ARS. `utilidades.js` comparte ids, celdas, errores y aria-invalid. Las altas de libro refrescan el catálogo con el filtro activo; ninguna notifica todavía a selectores de venta. Navegación genérica marca enlaces `.nav-link` por hash. CSS existente aporta formularios, tarjetas, mensajes, foco y contenedores de tabla.

No hay AGENTS.md físico ni registro `.agents/SKILLS.md`/`.atl/skill-registry.md`; aplican las instrucciones suministradas por el usuario. Las skills OPSX reales están en `.agents/skills/`, generadas por inicialización CLI local. La página 5 del PDF fue leída como requisitos. `docs/prompts.md` tiene un cambio previo y no se toca. Dominio MEDIUM: lógica académica de negocio, sin cobros ni facturación reales, implementación por etapas con evidencia.

Baseline externo delegado antes de producción: Chromium real con file://, 15/15 verificaciones E3/E4 aprobadas, consola sin errores, anchos 320/1280 sin desborde, foco visible, LI-7/CL-4, normalizaciones, duplicados, filtro y reinicio por recarga. Informe temporal del coordinador: `C:/Users/Oficina/AppData/Local/Temp/utn-e5-baseline.json`. No existían tests frontend previos; el aplicador debe establecer además baseline reproducible nativo antes de modificar archivos afectados.

## Goals / Non-Goals

**Goals:** Separar validación/cálculo comprobable de la interacción DOM, mantener scripts clásicos y cambios puntuales a E4. El modelo tendrá estado efímero de borrador e historial; el DOM siempre se revalida al confirmar para impedir que una edición inválida pendiente pase por usar el último dato válido.

**Non-Goals:** Persistencia o E6, backend/API, red, frameworks, toolchain obligatoria, stock, pagos, facturación, autenticación, edición/borrado de ventas y operaciones de publicación/Git.

## Decisions

1. **Modelo pequeño y UI clásica.** Añadir un script de reglas de venta y uno de interacción, cargados después de utilidades/catálogo y antes o después de altas respetando inicialización. Funciones pequeñas para validar cantidades, transformar precio, calcular y construir la venta. Pruebas usan VM de Node para leer scripts clásicos; no agregar exports/imports de producción ni duplicar reglas en tests. Alternativa descartada: un gestor de estado o módulos ES, innecesarios y poco compatibles con file://.
2. **Duplicado informado.** Agregar un libro ya presente muestra error y conserva su cantidad. Cambiar cantidad se hace en su propio renglón. Es una política admitida por la consigna que evita sumas implícitas.
3. **Centavos seguros.** Convertir precio positivo finito a centavos redondeados a dos decimales mediante desplazamiento del exponente decimal (evita el caso 10.075); validar `Number.isSafeInteger` en centavos, cantidad, producto y suma, y rechazar precio cuyo redondeo no sea positivo. Mostrar importes construyendo la cadena decimal exacta desde centavos y reutilizando formatoPrecio: dividir por 100 como float podría perder un centavo cerca del límite seguro. No cambiar validación E4: una anomalía o valor demasiado grande se rechaza sólo al vender. Alternativa descartada: operar y sumar floats directamente por artefactos como 0.1 + 0.2.
4. **Confirmación atómica.** Leer valores actuales del formulario/renglones, resolver cliente/libros por id con buscarPorId, revisar duplicados y todos los importes actuales antes de tocar historial. Fallar conserva el borrador. Éxito construye datos nuevos, agrega una vez, limpia cliente/renglones y muestra resultado. La segunda acción sobre el formulario vacío vuelve a fallar y no duplica.
5. **Snapshot mínimo completo.** Venta con id `VE-n` vía siguienteIdPrefijado, fecha ISO, cliente copiado (id/nombre/email), renglones copiados (libroId/título/ISBN/cantidad/precio unitario/subtotal) y total. Centavos son fuente numérica de cálculo; se puede exponer precio en ARS para presentación, sin recalcular desde catálogo en historial. No almacenar objetos ni autorIds del catálogo por referencia. Se copia sólo información necesaria, no todo el modelo.
6. **Eventos puntuales de alta.** Tras push exitoso E4 emitir un evento local de datos actualizados; Ventas reconstruye opciones conservando valores seleccionados y sin tocar sus renglones. No publicar eventos ante errores/reset. Alternativa descartada: reestructurar altas o observar mutaciones globales.
7. **Presentación accesible mínima.** Reusar clases existentes, nuevas secciones con formularios, tabla de borrador e historial; botones de cambiar/quitar por renglón con nombre accesible. Detalle histórico sólo lectura, mensajes alert/status, foco visible y retorno de foco coherente tras quitar. Renderizar mediante createElement/textContent/replaceChildren. Controlar min-width y overflow local para 320 px.
8. **TDD con runner disponible, browser independiente.** Node `--test` opcional con módulos incorporados (fs/vm/assert/test) establece baseline de funciones E3/E4 reales y prueba reglas de E5 antes de producción. Cada tarea funcional registra RED ejecutado, GREEN, segundo caso/borde y refactor; la validación real por navegador cubre integración DOM, file://, teclado, consola y tamaños que VM no acredita. Guardar evidencia reproducible en frontend o artifacts del cambio, nunca declarar ejecutado un caso por inferencia.

## Risks / Trade-offs

- [DOM manipulado o valores inválidos retenidos] → Confirmar vuelve a leer controles y reglas; no confiar en atributos HTML ni último modelo válido.
- [Catálogo alterado entre agregado y confirmación] → Revalidar precios/ids al confirmar, recalcular el borrador cuando corresponda y conservar snapshot sólo después del éxito.
- [Cantidad extrema o redondeo de precio menor a centavo] → Rechazar resultados fuera de enteros seguros o centavos no positivos con mensaje en español.
- [Altas recrean selects y pierden selección] → Guardar/restaurar valores existentes y probar borrador activo durante LI-7/CL-4.
- [Tests sin DOM dan falsa cobertura visual] → Evidencia separada Node/browser; validación delegada real antes de cerrar tareas.
- [Recarga elimina operaciones] → Mensaje/documentación explícita; es el comportamiento exigido antes de E6.

## Migration Plan

Abrir el mismo index.html por doble clic; no hay instalación ni migración de datos. Revertir únicamente archivos E5 revierte la funcionalidad, conservando cambios previos ajenos. No ejecutar git add/commit/push ni archivar este cambio sin pedido; dejar artifacts y tareas locales revisables.
