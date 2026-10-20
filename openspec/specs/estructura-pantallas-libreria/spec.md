# estructura-pantallas-libreria Specification

## Purpose

Define las vistas del frontend de la librería, la navegación entre ellas y la
estructura semántica, de formularios, tablas y mensajes que usan los demás
ejercicios.

## Requirements

### Requirement: Proyecto local con entrada en la raíz
El proyecto SHALL tener `index.html`, `css/` y `js/` en la raíz del
repositorio y MUST funcionar abriendo `index.html` desde disco (`file://`), sin
API, backend, servidor, dependencias instaladas ni recursos externos.

#### Scenario: Apertura desde disco sin red
- **WHEN** se abre `index.html` de la raíz con doble clic en un navegador
- **THEN** la página carga sólo archivos locales del proyecto y todas las vistas funcionan sin realizar peticiones de red

### Requirement: Vistas y navegación
La aplicación SHALL tener `index.html` como entrada y ofrecer las vistas
Catálogo, Libros, Clientes, Ventas e Historial, accesibles desde una navegación
principal que MUST indicar cuál es la vista activa.

#### Scenario: Navegar entre las vistas
- **WHEN** una persona elige cualquiera de los cinco enlaces de la navegación principal
- **THEN** llega a la vista correspondiente y ese enlace queda marcado como actual

### Requirement: Catálogo con datos completos de cada libro
El catálogo SHALL mostrar el título de la librería, un buscador por título y el
listado de libros. Cada libro MUST mostrar título, ISBN, editorial, género,
autores y precio; un libro sin género MUST mostrarse como «Sin clasificar».

#### Scenario: Libro sin género asignado
- **WHEN** el catálogo incluye un libro sin género
- **THEN** su tarjeta muestra «Sin clasificar» en el lugar del género

### Requirement: Estructura semántica
La página SHALL usar encabezado, navegación, contenido principal y pie con
etiquetas semánticas, y cada vista MUST tener un título principal propio.

#### Scenario: Recorrido con tecnologías de asistencia
- **WHEN** se inspecciona la estructura de la página
- **THEN** existen `header`, `nav`, `main` y `footer`, y cada sección de vista tiene su `h1`

### Requirement: Formularios y tablas accesibles
Cada campo de formulario SHALL tener una etiqueta asociada, cada botón MUST
describir su acción con texto y cada tabla MUST tener encabezados de columna.

#### Scenario: Campos, botones y tablas
- **WHEN** se revisan los formularios y tablas de Libros, Clientes, Ventas e Historial
- **THEN** ningún campo carece de etiqueta, ningún botón carece de texto y todas las tablas tienen encabezados

### Requirement: Mensajes de estado
La interfaz SHALL mostrar mensajes para listas vacías, búsquedas sin resultados
y operaciones correctas o rechazadas.

#### Scenario: Búsqueda sin resultados
- **WHEN** se busca un título que no existe
- **THEN** el listado queda vacío y se muestra un mensaje claro de que no hubo resultados

#### Scenario: Operación rechazada y operación correcta
- **WHEN** se envía un formulario de alta incompleto y luego uno válido
- **THEN** primero se informan los errores con texto y después se confirma el alta con un mensaje
