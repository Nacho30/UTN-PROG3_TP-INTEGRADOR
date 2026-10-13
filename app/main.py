from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.modules.producto.routers import router as producto_router
from app.modules.categoria.routers import router as categoria_router
from app.modules.proveedor.routers import router as proveedor_router

def create_app() -> FastAPI:
    app = FastAPI(
        title="API Integradora - Unidad 1",
        description="Conceptos: Path, Query, Body, Pydantic, Errores.",
        version="1.0.0"
    )
    
    app.include_router(producto_router)
    app.include_router(categoria_router)
    app.include_router(proveedor_router)
    # La interfaz estática comparte origen con la API para que se pueda abrir
    # desde /ui/ sin configuración de CORS ni dependencias de frontend.
    app.mount("/ui", StaticFiles(directory=Path(__file__).parent / "static", html=True), name="ui")
    
    return app

app = create_app()
