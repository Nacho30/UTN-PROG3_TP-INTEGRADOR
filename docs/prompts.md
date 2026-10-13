# Prompts utilizados

Registro de los prompts usados con IA durante el trabajo práctico.

---

## Ejercicio 1 · HU-01: Registrar un proveedor

```text
Rol: Sos un desarrollador backend con experiencia en Python y FastAPI.

Contexto:
Adjunto el proyecto "API Integradora - Unidad 1" (FastAPI, datos en memoria).
Ya tiene los módulos Categoría y Producto, organizados en
app/modules/<modulo>/ con schemas.py, services.py y routers.py.
Tengo que agregar el módulo Proveedores siguiendo exactamente ese mismo patrón.

Tarea:
Implementá SOLO el Ejercicio 1, HU-01 "Registrar un proveedor":
- Endpoint: POST /proveedores/ -> 201 Created, devuelve el proveedor con su id.
- Campos: codigo, razon_social, cuit (11 a 15 caracteres),
  email y telefono (opcionales, por defecto ""), activo (por defecto true).
- Reglas de negocio:
  - RN-01: código obligatorio, no vacío -> 422 (validación de Pydantic).
  - RN-02: código único -> 409 Conflict (validado en services.py).
  - RN-03: razón social obligatoria, mínimo 3 caracteres -> 422.
- Schemas: ProveedorBase, ProveedorCreate y ProveedorRead.
- Dejá 2 proveedores precargados en memoria (PROV-001 y PROV-002).
- Registrá el router en app/main.py.

Restricciones:
- No implementes las otras historias (listar, detalle, actualizar, desactivar).
- No modifiques los módulos Categoría y Producto.
- Comentarios y mensajes de error en español.

Entregables:
1. El código del módulo en app/modules/proveedor/.
2. tests/test_proveedores.http con casos de 201, 409 y 422.
3. El README.md actualizado con el endpoint y las reglas de negocio.

Entrega:
Subí todo a la rama main de https://github.com/Nacho30/UTN-PROG3_TP-INTEGRADOR
en un único commit con un mensaje descriptivo en español.
Antes de subirlo, verificá que todos los casos de prueba devuelvan el código esperado.
```

**Estructura del prompt:** Rol → Contexto → Tarea → Restricciones → Entregables → Entrega.

---

## Ejercicio 2 · Presentación con CSS y uso adaptable

```text
Rol: Actuá como orquestador técnico de un equipo de desarrollo.

Contexto:
El proyecto "API Integradora - Unidad 1" está desarrollado con FastAPI y
cuenta con un módulo de Proveedores. El Ejercicio 2 requiere incorporar una
interfaz de presentación para ese módulo utilizando únicamente HTML, CSS y
JavaScript nativos, sin frameworks, librerías ni recursos externos.

Modo de trabajo:
- Como orquestador, revisá la consigna y el estado actual del repositorio.
- Delegá a un agente de implementación la creación de la interfaz y sus
  verificaciones.
- Integrá el resultado, comprobá que no se alteren los endpoints existentes
  ni la documentación automática de FastAPI y registrá las decisiones tomadas.

Tarea:
Crear una interfaz local para gestionar proveedores, disponible desde `/ui/`,
que consuma los endpoints del proyecto. Debe permitir cargar proveedores y
mostrar el listado disponible.

Requisitos de presentación y accesibilidad:
- Definí una identidad visual propia, coherente y profesional mediante colores,
  tipografía, espaciados, tarjetas, formularios y botones.
- Organizá los estilos en archivos CSS externos y reutilizá clases para los
  elementos equivalentes.
- Usá Flexbox o CSS Grid para estructurar el contenido.
- Adaptá la interfaz a 320 px y 1280 px sin desplazamiento horizontal de toda
  la página. Si la tabla requiere más espacio, su contenedor debe desplazarse
  de forma independiente.
- Garantizá foco visible y navegación completa mediante teclado.
- Mostrá los errores también como texto, nunca solo mediante color.
- Si se agregan imágenes, usá texto alternativo útil para las informativas y
  evitá información redundante en las decorativas.

Restricciones:
- Usá exclusivamente HTML, CSS y JavaScript nativos incluidos localmente.
- No uses CDN, Bootstrap, Tailwind, React ni otra librería o framework.
- Conservá el comportamiento de `POST /proveedores/` y de `/docs`.
- Mantené el código y los mensajes de la interfaz en español.

Entregables:
1. Interfaz en archivos locales dentro de `app/static/`.
2. Configuración necesaria para servirla desde `/ui/`.
3. Actualización del README con las instrucciones de uso.
4. Verificación de recursos, sintaxis, comportamiento de API, foco, mensajes
   de error y vistas de 320 px y 1280 px.

Entrega:
Realizá un único commit descriptivo en español y publicalo en la rama `main`
del repositorio. Informá los archivos modificados, las verificaciones realizadas
y cualquier requisito pendiente de permisos de GitHub.
```

**Metodología aplicada:** el trabajo se coordinó con un orquestador, encargado
de interpretar la consigna, revisar el repositorio e integrar el resultado, y
un agente de implementación, responsable de construir y validar la interfaz.
Esta división permitió mantener el alcance del ejercicio y verificar la entrega
antes de publicarla.

**Estructura del prompt:** Rol → Contexto → Modo de trabajo → Tarea → Requisitos
→ Restricciones → Entregables → Entrega.
