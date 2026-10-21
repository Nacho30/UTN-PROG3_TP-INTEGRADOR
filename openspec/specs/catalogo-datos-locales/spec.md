# catalogo-datos-locales Specification

## Purpose

Define los datos iniciales de la librería guardados en variables de
JavaScript en memoria y el catálogo con filtro por título que los muestra, sin
API, backend, red ni persistencia.

## Requirements

### Requirement: Datos iniciales en variables locales
El proyecto SHALL declarar `EDITORIALES`, `GENEROS`, `AUTORES`, `LIBROS` y
`CLIENTES` como variables de JavaScript en `js/datos.js`, con datos ficticios
e ids estables con prefijo (`ED-`, `GE-`, `AU-`, `LI-`, `CL-`). Los datos MUST
vivir sólo en memoria durante este ejercicio: no se obtienen de una API,
backend ni `fetch`, ni se guardan en `localStorage` u otro almacenamiento.

#### Scenario: Carga de datos sin red ni almacenamiento
- **WHEN** se abre `index.html` con `file://`
- **THEN** las cinco colecciones están disponibles como variables y el catálogo se dibuja sin solicitudes de red ni accesos a `localStorage`

#### Scenario: Recarga de la página
- **WHEN** se recarga la página
- **THEN** se vuelven a usar los datos iniciales declarados en las variables

### Requirement: Relaciones por id
Cada libro SHALL referenciar su editorial con `editorialId` (obligatorio), su
género con `generoId` (opcional, `null` cuando no tiene) y sus autores con
`autorIds` (uno o más). Al iniciar, el sistema MUST verificar que todas las
relaciones existan y SHALL informar en la consola cualquier inconsistencia.

#### Scenario: Relaciones válidas
- **WHEN** se inicia el catálogo con los datos iniciales
- **THEN** la validación de relaciones no informa problemas

#### Scenario: Libro sin género
- **WHEN** un libro tiene `generoId` igual a `null`
- **THEN** su tarjeta muestra «Sin clasificar»

### Requirement: Catálogo generado desde los datos
El catálogo SHALL generarse desde la variable `LIBROS`, con una tarjeta por
libro que muestre título, ISBN, editorial, género, autores y precio en ARS con
dos decimales. Los datos MUST insertarse con `textContent` o
`createElement`, nunca con `innerHTML`.

#### Scenario: Tarjeta de libro
- **WHEN** se muestra el catálogo completo
- **THEN** cada libro de `LIBROS` aparece con sus datos y los nombres resueltos a partir de sus ids

### Requirement: Filtro por título
El filtro SHALL buscar coincidencias parciales en el título sin distinguir
mayúsculas de minúsculas e ignorando los espacios de los extremos. MUST
filtrar mientras se escribe y MUST NOT recargar la página al presionar Enter.

#### Scenario: Búsqueda normalizada
- **WHEN** se escribe «  VIEN  »
- **THEN** sólo se muestra «El viento del Aconcagua»

#### Scenario: Búsqueda vacía
- **WHEN** la búsqueda está vacía o tiene sólo espacios
- **THEN** se muestra el catálogo completo

#### Scenario: Sin coincidencias
- **WHEN** ningún título contiene el texto buscado
- **THEN** no se muestran tarjetas y aparece un mensaje de texto «Sin resultados…»

#### Scenario: Texto con etiquetas HTML
- **WHEN** se busca un texto con etiquetas HTML
- **THEN** el texto se muestra literal y no se crean elementos nuevos en la página
