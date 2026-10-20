# API Integradora - Unidad 1 · Trabajo Práctico 1

API REST de gestión de catálogo (Categorías, Productos y **Proveedores**) hecha con FastAPI.
Los datos se guardan en memoria mientras el servidor está en ejecución.

## Cómo ejecutar

```bash
pip install -r requirements.txt
fastapi dev app/main.py
```

Documentación interactiva: http://localhost:8000/docs

## TPI · Frontend de la librería

El frontend de la librería (consigna de HTML, CSS y JavaScript) está en
[`frontend-libreria/`](frontend-libreria/README.md). Es independiente de la API:
se abre con doble clic en `frontend-libreria/index.html`, sin servidor.

### Ejercicios 3 a 6 · Frontend de la librería

| Ejercicio | Implementación |
|-----------|----------------|
| 3 · Datos locales, catálogo y filtro | Catálogo generado desde datos locales, búsqueda por título sin distinguir mayúsculas/minúsculas y mensajes para búsquedas vacías o sin resultados. |
| 4 · Altas de libros y clientes | Formularios accesibles con validación, prevención de duplicados, tablas actualizadas y nuevos identificadores. |
| 5 · Venta simulada e historial | Borrador de venta, cálculo seguro en centavos, confirmación, detalle e historial de snapshots sin modificar ventas anteriores. |
| 6 · Persistencia local | Libros, clientes y ventas se conservan en `localStorage` bajo la clave versionada `paginas-del-sol.estado.v1`, sin duplicar datos iniciales al recargar. |

El Ejercicio 6 mantiene los precios históricos de cada venta aunque cambie el
catálogo posterior. La persistencia depende del navegador, perfil y origen local:
no usa backend, cuentas ni sincronización entre usuarios. Para reiniciar los datos
de la librería, eliminar esa clave en el almacenamiento del navegador y recargar.

La documentación funcional, los casos manuales y las pruebas de cada ejercicio
están detallados en el [README del frontend](frontend-libreria/README.md). Para
ejecutar la suite automatizada disponible desde la raíz del repositorio:

```powershell
node --test frontend-libreria/tests
```

## Ejercicio 2 · Interfaz de proveedores

La pantalla estática se sirve desde la misma aplicación en
http://localhost:8000/ui/. Está construida únicamente con HTML, CSS y JavaScript
nativos, sin frameworks, CDNs ni imágenes. El CSS externo reutiliza clases para
tarjetas, botones, mensajes y campos, usa Grid/Flexbox y conserva el foco visible.
La tabla tiene desplazamiento propio cuando el ancho es reducido, por lo que la
página no requiere desplazamiento horizontal a 320 px.

La interfaz consulta `GET /proveedores/` al abrir y envía el formulario a
`POST /proveedores/`. Los mensajes de validación y de error se muestran en texto.
Para probarla, ejecutar `fastapi dev app/main.py` y abrir la URL de la interfaz.

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
