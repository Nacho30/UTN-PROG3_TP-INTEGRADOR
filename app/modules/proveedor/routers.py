from fastapi import APIRouter, status
from . import schemas, services

router = APIRouter(prefix="/proveedores", tags=["Proveedores"])


# ---------------------------------------------------------
# ALTA DE PROVEEDOR  (HU-01)
# Método: POST | Endpoint: /proveedores | Estado: 201 Created
# ---------------------------------------------------------
@router.post(
    "/", response_model=schemas.ProveedorRead, status_code=status.HTTP_201_CREATED
)
def alta_proveedor(proveedor: schemas.ProveedorCreate):
    # 422 automático si falla RN-01 / RN-03 (Pydantic)
    # 409 si el código ya existe (RN-02, validado en services)
    return services.crear(proveedor)
