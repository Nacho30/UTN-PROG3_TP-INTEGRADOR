# API Integradora - Unidad 1 · Trabajo Práctico 1

API REST de gestión de catálogo (Categorías, Productos y **Proveedores**) hecha con FastAPI.
Los datos se guardan en memoria mientras el servidor está en ejecución.

## Cómo ejecutar

```bash
pip install -r requirements.txt
fastapi dev app/main.py
```

Documentación interactiva: http://localhost:8000/docs

## Ejercicio 1 · HU-01: Registrar un proveedor

`app/modules/proveedor/` sigue el mismo patrón que Categoría y Producto:

| Archivo       | Responsabilidad                                         |
|---------------|---------------------------------------------------------|
| `schemas.py`  | ProveedorBase, ProveedorCreate y ProveedorRead          |
| `services.py` | Lista en memoria y regla de código único (RN-02)        |
| `routers.py`  | Endpoint de alta                                        |

### Endpoint

| Método | Endpoint        | Código | Descripción     |
|--------|-----------------|--------|-----------------|
| POST   | `/proveedores/` | 201    | Crear proveedor |

### Reglas de negocio

| Regla | Descripción                               | Respuesta |
|-------|-------------------------------------------|-----------|
| RN-01 | Código obligatorio (`min_length=1`)       | 422       |
| RN-02 | Código único                              | 409       |
| RN-03 | Razón social obligatoria (`min_length=3`) | 422       |

## Pruebas

`tests/test_proveedores.http` (extensión REST Client de VS Code) cubre los
escenarios 201, 409 y 422 del alta. Conviene ejecutarlos en orden con el
servidor recién iniciado.
