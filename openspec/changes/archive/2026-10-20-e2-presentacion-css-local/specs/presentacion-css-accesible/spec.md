# Spec Delta

## Purpose

Define una presentación CSS local y accesible que permita utilizar las vistas
de la librería de forma legible y adaptable, sin incorporar recursos externos
ni servicios remotos.

## ADDED Requirements

### Requirement: Identidad visual y estilos reutilizables
La interfaz SHALL usar un archivo CSS local con una identidad visual coherente
y clases reutilizables para contenedores, tarjetas, controles, mensajes y
tablas.

#### Scenario: Controles equivalentes
- **WHEN** se muestran tarjetas, campos, botones, mensajes o tablas de cualquier vista
- **THEN** comparten los estilos locales definidos para ese tipo de elemento

### Requirement: Adaptación de ancho y tablas
La interfaz SHALL organizar el contenido con Flexbox o Grid y MUST conservar
un diseño utilizable a 320 px y 1280 px sin desplazamiento horizontal de toda
la página; las tablas que excedan el ancho disponible MUST desplazarse dentro
de su propio contenedor.

#### Scenario: Pantalla angosta
- **WHEN** el viewport tiene 320 px de ancho
- **THEN** los controles siguen siendo legibles y la página no agrega desplazamiento horizontal, mientras las tablas anchas se desplazan dentro de su contenedor

#### Scenario: Pantalla ancha
- **WHEN** el viewport tiene 1280 px de ancho
- **THEN** los formularios y el contenido aprovechan la disposición amplia sin perder legibilidad

### Requirement: Accesibilidad de presentación
La interfaz SHALL mostrar un foco visible en enlaces y controles navegables y
MUST expresar los mensajes de estado o error con texto, no sólo con color.

#### Scenario: Recorrido por teclado
- **WHEN** una persona navega mediante Tab
- **THEN** el control activo tiene un indicador de foco visible y el contenido sigue siendo operable

#### Scenario: Mensaje de estado
- **WHEN** una operación se informa como correcta, vacía o rechazada
- **THEN** el mensaje incluye texto que comunica el resultado independientemente de sus colores

### Requirement: Ejecución local sin red
La presentación SHALL cargar sus estilos y scripts desde archivos del proyecto
y MUST funcionar al abrir `index.html` desde disco sin API, backend,
solicitudes de red, dependencias instaladas ni recursos externos.

#### Scenario: Apertura local
- **WHEN** se abre el archivo de entrada con `file://`
- **THEN** las vistas usan sus recursos locales y no requieren un servicio remoto
