# Design

## Context

El frontend actual está compuesto por `index.html`, `css/styles.css` y scripts
clásicos en `js/`, todos cargados desde el proyecto. La hoja de estilos ya
contiene tokens visuales, componentes reutilizables, reglas Flexbox/Grid,
breakpoints y foco visible. El estado de libros, clientes y ventas ya se
persiste con `localStorage` desde el módulo de datos. Véase `proposal.md` para
la motivación y la especificación delta para el contrato de comportamiento.

## Goals / Non-Goals

**Goals:**

- Formalizar el estado existente como una capacidad de presentación local,
  adaptable y accesible.
- Verificar que los recursos usados en ejecución permanecen dentro del
  repositorio y que no se reintroducen comunicaciones remotas.
- Dejar una traza aplicable y archivabile sin cambios de comportamiento si la
  implementación actual satisface los escenarios.

**Non-Goals:**

- No rediseñar las vistas ni sustituir las reglas CSS existentes.
- No crear, modificar ni migrar la estructura persistida en `localStorage`.
- No recuperar APIs, backend, servidor, dependencias, CDNs o recursos remotos.

## Decisions

### La fuente de verdad visual es la hoja CSS raíz

La comprobación se centrará en `css/styles.css` y en las referencias locales
desde `index.html`. Así se evita duplicar estilos o crear una segunda capa de
presentación sólo para cumplir el registro retrospectivo. Se descartó añadir
un framework CSS porque agregaría dependencias y rompería la premisa de abrir
la aplicación directamente desde disco.

### El alcance es de validación, no de cambio de datos

La persistencia ya existente se conserva sin modificaciones funcionales. Las
revisiones de Ejercicio 2 sólo confirmarán que la presentación no necesita
servicios remotos y no alterarán las claves ni las operaciones de
`localStorage`. Se descartó mover o reescribir la persistencia, ya que
corresponde a su capacidad específica y no a la presentación.

### La evidencia combina revisión estática y pruebas existentes

La aplicación no requiere infraestructura para ejecutarse, por lo que la
validación incluirá referencias de recursos locales, ausencia de llamadas de
red y ejecución de las pruebas CJS existentes. Se descartó incorporar pruebas
end-to-end con un servidor porque sería incompatible con la restricción de
funcionamiento mediante `file://`.

## Risks / Trade-offs

- [La revisión estática no captura todas las diferencias visuales entre
  navegadores] → Se complementará con comprobaciones manuales en los anchos
  requeridos y con los escenarios de la especificación.
- [Documentación histórica podría mencionar componentes remotos ya retirados]
  → La implementación sólo actualizará documentación que sea necesaria para
  describir el frontend local actual; no reintroducirá esos componentes.
- [Cambiar el módulo de datos durante esta aplicación podría afectar ventas,
  clientes o libros] → Las tareas excluyen cambios funcionales en
  `localStorage`.

## Migration Plan

No hay migración de datos ni despliegue de servicios. La aplicación conserva
su apertura directa mediante `index.html`; si una verificación detecta que no
se cumple un escenario, se revertirá únicamente el ajuste de presentación que
lo haya causado, sin tocar el estado almacenado.
