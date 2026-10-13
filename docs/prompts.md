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
