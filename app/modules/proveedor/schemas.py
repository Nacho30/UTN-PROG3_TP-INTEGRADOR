from pydantic import BaseModel, Field


class ProveedorBase(BaseModel):
    # RN-01: código obligatorio, no puede quedar vacío
    codigo: str = Field(..., min_length=1, examples=["PROV-001"])
    # RN-03: razón social obligatoria, mínimo 3 caracteres
    razon_social: str = Field(..., min_length=3, examples=["Distribuidora del Sur S.A."])
    cuit: str = Field(..., min_length=11, max_length=15, examples=["30-71234567-8"])
    email: str = Field("", examples=["ventas@delsur.com"])
    telefono: str = Field("", examples=["261-4123456"])
    activo: bool = True


class ProveedorCreate(ProveedorBase):
    pass  # Exige todos los campos obligatorios de Base


class ProveedorRead(ProveedorBase):
    id: int  # Contrato de salida: siempre incluye el ID generado por el backend
