# Spec Delta

## Purpose

Define el contrato de los formularios de alta de libros y clientes del
frontend de la librería: validaciones, unicidades, asignación de ids y
actualización de los listados y del catálogo sin recargar la página, sin API,
backend ni persistencia.

## ADDED Requirements

### Requirement: Secciones de altas en la página única
El proyecto SHALL agregar las secciones `#libros` y `#clientes` a
`index.html`, cada una con un formulario de alta y un listado en tabla con
`thead`, filas en el cuerpo y un mensaje visible cuando la lista está vacía.
La navegación del encabezado SHALL marcar con `aria-current="page"` el enlace
de la sección activa según el hash (`js/navegacion.js`).

#### Scenario: Navegación por hash
- **WHEN** se abre `index.html#libros` o se hace clic en «Libros»
- **THEN** se muestra la sección de libros y su enlace lleva `aria-current="page"`

#### Scenario: Lista vacía
- **WHEN** no hay registros en la colección correspondiente
- **THEN** la tabla queda sin filas y se muestra el mensaje de lista vacía

### Requirement: Opciones del formulario de libros desde los datos
El formulario de libros SHALL generar las opciones de editorial y género desde
`EDITORIALES` y `GENEROS`, y las casillas de autores desde `AUTORES`, con
`createElement` y `textContent`, nunca con `innerHTML`. El género SHALL ser
opcional, con «Sin clasificar» como valor vacío. Los autores SHALL
presentarse como checkboxes dentro de un `fieldset`, no como select múltiple.

#### Scenario: Opciones generadas
- **WHEN** se carga la página
- **THEN** los selects y las casillas muestran los nombres de las colecciones de datos

### Requirement: Validaciones del alta de libro
El sistema SHALL validar antes de agregar un libro: título no vacío; ISBN no
vacío y único comparando la forma normalizada (sin espacios, sin guiones, sin
distinguir mayúsculas); precio numérico mayor que cero; editorial existente;
al menos un autor existente; género opcional, pero si se asigna debe existir.
Si hay errores, SHALL mostrar todos juntos en español y MUST NOT agregar el
registro.

#### Scenario: ISBN duplicado normalizado
- **WHEN** se envía un ISBN cuya forma normalizada coincide con la de un libro existente (por ejemplo `978 950 000 001 1` o `9789500000011` frente a `978-950-000-001-1`)
- **THEN** no se agrega el libro, se lista el error de ISBN duplicado y el listado no cambia

#### Scenario: Precio inválido
- **WHEN** el precio es cero, negativo o no numérico
- **THEN** no se agrega el libro y se muestra el error de precio

#### Scenario: Sin autores o editorial vacía
- **WHEN** no se marca ningún autor o no se elige editorial
- **THEN** no se agrega el libro y se muestran los errores correspondientes

### Requirement: Alta de cliente
El sistema SHALL validar antes de agregar un cliente: nombre completo no
vacío; email no vacío, con formato válido (`nombre@dominio`) y único
comparando con `trim()` + minúsculas. Si hay errores, SHALL mostrar todos
juntos en español y MUST NOT agregar el registro.

#### Scenario: Email inválido
- **WHEN** el email no tiene `@` ni dominio (por ejemplo `ana@sin-dominio`)
- **THEN** no se agrega el cliente y se muestra el error de formato

#### Scenario: Email duplicado con otra escritura
- **WHEN** el email coincide tras `trim()` + minúsculas con uno existente (por ejemplo `ANA.GOMEZ@EJEMPLO.COM`)
- **THEN** no se agrega el cliente y se lista el error de email duplicado

#### Scenario: Cliente válido
- **WHEN** nombre y email son válidos y el email no está registrado
- **THEN** el cliente se agrega, se muestra el mensaje de éxito con su id y aparece como fila nueva en la tabla

### Requirement: Asignación de id siguiente
Los ids nuevos SHALL seguir el patrón prefijado por colección (`LI-n` para
libros, `CL-n` para clientes) y SHALL calcularse por el mayor sufijo numérico
existente, no por la cantidad de elementos.

#### Scenario: Primer libro agregado
- **WHEN** se da de alta un libro con la lista inicial (`LI-1` … `LI-6`)
- **THEN** el id asignado es `LI-7`

#### Scenario: Primer cliente agregado
- **WHEN** se da de alta un cliente con la lista inicial (`CL-1` … `CL-3`)
- **THEN** el id asignado es `CL-4`

### Requirement: Actualización sin recargar
El envío de ambos formularios SHALL usar `preventDefault()`: la página MUST
NOT recargar. Tras un alta correcta, el sistema SHALL limpiar el formulario,
mostrar el mensaje de éxito, actualizar la tabla y, en el caso de los libros,
refrescar el catálogo reutilizando `renderizarCatalogo` y `filtrarPorTitulo`
con la búsqueda activa, sin modificar `catalogo.js` ni llamar
`iniciarCatalogo()`.

#### Scenario: Libro agregado actualiza el catálogo
- **WHEN** se da de alta un libro válido
- **THEN** aparece la fila nueva en la tabla, el catálogo muestra una tarjeta más y la página no se recarga

#### Scenario: Filtro activo durante el refresco
- **WHEN** hay una búsqueda activa en el catálogo que no coincide con el título del libro agregado
- **THEN** el catálogo respeta el filtro después del refresco

### Requirement: Accesibilidad y presentación mínima
Los errores SHALL mostrarse en un contenedor con `role="alert"` y los campos
inválidos SHALL recibir `aria-invalid="true"`. Los mensajes de éxito SHALL
usar `role="status"`. Todo dato del usuario SHALL insertarse con `textContent`
o `createElement`, nunca con `innerHTML`. Las tablas SHALL vivir dentro de un
`.table-wrap` con `overflow-x: auto` para que el desborde se absorba
internamente. El foco visible SHALL aplicarse con `:focus-visible` de 3 px.

#### Scenario: Errores anunciados
- **WHEN** un envío falla
- **THEN** el contenedor lista los errores en español y los campos inválidos quedan con `aria-invalid="true"`

#### Scenario: Desborde en 320 px
- **WHEN** la página se muestra a 320 px de ancho
- **THEN** la tabla se desplaza dentro de su `.table-wrap` y la página no tiene scroll horizontal

#### Scenario: Sin recarga en ningún envío
- **WHEN** se envían formularios válidos e inválidos
- **THEN** la URL no cambia y la página no se recarga
