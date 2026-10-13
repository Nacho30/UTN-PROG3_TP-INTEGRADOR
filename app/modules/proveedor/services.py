from typing import List
from fastapi import HTTPException, status
from .schemas import ProveedorCreate, ProveedorRead

# Almacenamiento en memoria con algunos registros iniciales
db_proveedores: List[ProveedorRead] = [
    ProveedorRead(
        id=1,
        codigo="PROV-001",
        razon_social="Distribuidora del Sur S.A.",
        cuit="30-71234567-8",
        email="ventas@delsur.com",
        telefono="261-4123456",
        activo=True,
    ),
    ProveedorRead(
        id=2,
        codigo="PROV-002",
        razon_social="Mayorista Andina S.R.L.",
        cuit="30-70987654-3",
        email="contacto@andina.com",
        telefono="",
        activo=True,
    ),
]
id_counter = 3


def _codigo_en_uso(codigo: str) -> bool:
    """RN-02: verifica si el código ya lo usa otro proveedor."""
    return any(p.codigo == codigo for p in db_proveedores)


def crear(data: ProveedorCreate) -> ProveedorRead:
    global id_counter
    # RN-02: el código debe ser único
    if _codigo_en_uso(data.codigo):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Ya existe un proveedor con el código '{data.codigo}'",
        )
    nuevo = ProveedorRead(id=id_counter, **data.model_dump())
    db_proveedores.append(nuevo)
    id_counter += 1
    return nuevo
