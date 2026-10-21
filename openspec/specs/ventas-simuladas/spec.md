# ventas-simuladas Specification

## Purpose

Permitir ventas académicas locales con un borrador validado y un historial de solo consulta que preserve los datos de cada operación confirmada.

## Requirements

### Requirement: Navegación y estados de venta
El frontend SHALL ofrecer Ventas e Historial en la navegación por hash, con encabezados, etiquetas asociadas y mensajes de estado vacío en español.

#### Scenario: Sesión recién abierta
- **WHEN** se abre el archivo local sin ventas
- **THEN** Ventas muestra un borrador vacío e Historial informa que no hay ventas; los enlaces marcan la sección activa.

#### Scenario: Acceso directo
- **WHEN** se abre el archivo con hash de Ventas o Historial
- **THEN** se puede recorrer la sección correspondiente con teclado y el enlace activo tiene aria-current.

### Requirement: Renglones válidos y únicos
La venta SHALL aceptar únicamente un cliente existente y renglones de libros existentes con cantidades enteras positivas finitas. Agregar un libro repetido SHALL informar el duplicado sin duplicar ni modificar el renglón existente.

#### Scenario: Agregado correcto
- **WHEN** se elige un libro existente con cantidad 2
- **THEN** se agrega un renglón con su título, cantidad, precio unitario y subtotal.

#### Scenario: Duplicado informado
- **WHEN** se agrega nuevamente un libro presente en el borrador
- **THEN** aparece un error textual y permanece un solo renglón con su cantidad anterior.

#### Scenario: Cantidades rechazadas
- **WHEN** la cantidad es vacía, 0, negativa, decimal, NaN o infinita
- **THEN** no se agrega el renglón ni se registra una venta y se informa el error.

#### Scenario: Identificadores inexistentes
- **WHEN** se manipula la selección con un id de cliente o libro inexistente
- **THEN** se rechaza la operación correspondiente y no se registra ninguna venta.

### Requirement: Corrección del borrador e importes
La venta SHALL permitir modificar cantidades y quitar renglones antes de confirmar. Los importes SHALL mantenerse finitos y coherentes, con subtotal igual a cantidad por precio y total igual a la suma de subtotales, presentados en ARS con dos decimales.

#### Scenario: Total requerido por la consigna
- **WHEN** se agregan libros de precios 1500 y 2000 con cantidades 2 y 1
- **THEN** los subtotales son 3000,00 y 2000,00 y el total es 5000,00.

#### Scenario: Modificación y eliminación
- **WHEN** se cambia una cantidad válida y después se quita un renglón
- **THEN** se recalculan sus subtotales y total sin crear renglones duplicados; quitar el último devuelve el estado vacío.

#### Scenario: Edición inválida pendiente
- **WHEN** un campo de cantidad de un renglón tiene un valor inválido aunque el último valor aceptado fuera válido
- **THEN** se muestra el error y se impide confirmar hasta corregir o quitar ese renglón.

#### Scenario: Decimales y límites numéricos
- **WHEN** se usan precios decimales como 0,10 y 0,20 o valores que desbordan una suma o multiplicación segura
- **THEN** el caso decimal muestra 0,30 y los desbordamientos se rechazan con texto sin mostrar importes infinitos o imprecisos.

### Requirement: Confirmación validada y atómica
La confirmación SHALL revalidar cliente, existencia y unicidad de libros, cantidades, precios e importes usados. Una falla SHALL conservar íntegro el borrador y no agregar registros. Una confirmación válida SHALL agregar una sola venta y limpiar cliente y renglones con mensaje de resultado.

#### Scenario: Falta de datos
- **WHEN** se intenta confirmar sin cliente, sin renglones o con cantidades inválidas
- **THEN** se muestran errores textuales y el historial y borrador permanecen sin cambios.

#### Scenario: Datos alterados después de agregar
- **WHEN** desaparece el cliente/libro o el precio se vuelve no finito, no positivo o inseguro antes de confirmar
- **THEN** la confirmación falla, no agrega ventas y conserva el borrador para su corrección.

#### Scenario: Confirmación seguida de otro envío
- **WHEN** se confirma correctamente y se vuelve a enviar el formulario limpio
- **THEN** hay una sola venta nueva y el segundo envío no duplica el registro.

### Requirement: Registro histórico independiente
Cada venta SHALL guardar id único estable en la sesión, fecha, copia del cliente y copia de cada libro con cantidad, precio unitario, subtotal y total. Los objetos y arrays guardados SHALL ser independientes del catálogo y del borrador; el historial SHALL obtener los datos de ese registro.

#### Scenario: Catálogo y cliente cambian
- **WHEN** se confirma una venta y luego cambian en memoria título, ISBN, precio, nombre y email de los objetos originales
- **THEN** su consulta histórica conserva todos los datos anteriores, cantidades, subtotales y total.

#### Scenario: Venta posterior y borrador nuevo
- **WHEN** se prepara otra venta, se cambian cantidades y se confirma una segunda operación
- **THEN** los ids de ambas ventas son distintos y la primera conserva su fecha, contenido e importes sin referencias mutables compartidas.

### Requirement: Consulta de historial sin edición
Historial SHALL listar identificador, fecha, cliente y total y permitir consultar los renglones con sus cantidades, precios unitarios y subtotales históricos. La interfaz SHALL omitir controles de edición o eliminación de ventas confirmadas.

#### Scenario: Consulta de detalle
- **WHEN** se consulta el detalle de una venta del historial
- **THEN** aparecen únicamente sus datos históricos y sus renglones; se puede volver a consultar otra venta sin modificar ninguna.

#### Scenario: Historial vacío
- **WHEN** no hay ventas confirmadas
- **THEN** se informa el estado vacío y no se muestra un detalle ficticio.

### Requirement: Altas existentes integradas
Las altas E4 SHALL aparecer inmediatamente en las opciones de Ventas, preservando cliente, selección de libro y renglones de un borrador válido y conservando el filtro y las tablas E3/E4.

#### Scenario: LI-7 y CL-4
- **WHEN** se agrega un libro válido y un cliente válido desde los formularios E4 con un borrador activo
- **THEN** aparecen LI-7 y CL-4 en las opciones sin recargar y el borrador previo conserva sus datos e importes.

#### Scenario: Regresión de altas y búsqueda
- **WHEN** se realizan altas válidas, duplicadas e inválidas de libros/clientes con filtro activo
- **THEN** se conservan normalización de ISBN/email, mensajes, tablas, ids y catálogo filtrado de E3/E4.

### Requirement: Compatibilidad local y accesibilidad
El frontend SHALL funcionar mediante file:// con scripts clásicos y sin red ni dependencias nuevas. Los datos dinámicos SHALL mostrarse como texto literal, con errores accesibles, navegación por teclado y foco visible. A 320 y 1280 px la página SHALL carecer de desborde horizontal; las tablas pueden desplazarse en su contenedor.

#### Scenario: Datos con etiquetas
- **WHEN** títulos o nombres contienen etiquetas HTML
- **THEN** catálogo, opciones, borrador e historial muestran texto literal y no crean elementos ejecutables.

#### Scenario: Teclado y anchos
- **WHEN** se recorren los controles con Tab/Enter y se inspecciona a 320 y 1280 px
- **THEN** los controles tienen foco visible, etiquetas y mensajes legibles, no hay desborde de página ni errores de consola.

### Requirement: Sesión efímera antes de E6
Las ventas y altas SHALL mantenerse sólo en memoria y desaparecer al recargar. La documentación SHALL identificar E6 como pendiente y distinguir pruebas ejecutadas de limitaciones del entorno.

#### Scenario: Recarga de la sesión
- **WHEN** se recarga después de agregar libros, clientes y ventas
- **THEN** reaparecen los seis libros y tres clientes iniciales, sin ventas previas.
