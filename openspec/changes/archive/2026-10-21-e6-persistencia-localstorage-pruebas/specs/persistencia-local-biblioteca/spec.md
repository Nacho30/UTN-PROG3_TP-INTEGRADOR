# Spec Delta

## Purpose

Permite que la librería estática conserve sus datos mutables en el navegador y
mantenga consultable el historial de ventas entre aperturas de la misma página.

## ADDED Requirements

### Requirement: Inicialización local única
La aplicación SHALL cargar los ejemplos iniciales de libros, clientes y ventas
sólo cuando no exista un estado local válido; en aperturas posteriores MUST usar
el estado persistido sin duplicar los ejemplos ni reemplazar altas previas.

#### Scenario: Primera apertura sin estado local
- **WHEN** la aplicación se abre en un navegador/origen sin datos guardados
- **THEN** muestra los ejemplos iniciales de libros y clientes, un historial de ventas vacío y guarda ese estado para la siguiente apertura

#### Scenario: Apertura posterior con estado local
- **WHEN** la aplicación se vuelve a abrir con datos locales previamente guardados
- **THEN** restaura las colecciones guardadas y no agrega una segunda copia de los ejemplos

### Requirement: Persistencia de colecciones mutables
La aplicación SHALL conservar libros, clientes y ventas confirmadas cada vez que
una operación válida modifique esas colecciones. MUST seguir funcionando como
una página estática, sin backend, API, framework ni recursos externos.

#### Scenario: Alta persistida
- **WHEN** una persona registra correctamente un libro o un cliente y vuelve a abrir la página
- **THEN** el registro agregado permanece disponible junto a los ejemplos previos

#### Scenario: Venta confirmada persistida
- **WHEN** una persona confirma una venta válida y vuelve a abrir la página
- **THEN** el historial conserva esa venta con su cliente, renglones y total

### Requirement: Historial con precio histórico
Las ventas confirmadas SHALL conservar snapshots independientes de los datos y
precios de sus renglones. Un cambio posterior del catálogo persistido MUST NOT
modificar el precio unitario, subtotal ni total que muestra una venta histórica.

#### Scenario: Cambio posterior de precio de catálogo
- **WHEN** se modifica sólo el precio de un libro en el catálogo guardado y se recarga la página
- **THEN** una venta previa conserva sus precios unitarios, subtotales y total originales

### Requirement: Transparencia y evidencia de persistencia
La documentación SHALL indicar que los datos dependen del navegador, perfil y
origen local, que no se comparten entre usuarios, dónde reside la estructura de
catálogo persistida y los resultados reales de las validaciones manuales E6.

#### Scenario: Consulta de documentación
- **WHEN** una persona consulta el README del frontend
- **THEN** puede reproducir la recarga sin duplicados, la prueba de precio histórico y los demás casos manuales exigidos
