from datetime import datetime

from pydantic import BaseModel, ConfigDict


class OptimizacionCreate(BaseModel):
    nombre: str
    descripcion: str | None = None
    parametros_entrada: dict
    resultado: dict | None = None
    costo_inicial: float | None = None
    costo_optimizado: float | None = None
    estado: str = "pendiente"


class OptimizacionUpdate(BaseModel):
    nombre: str | None = None
    descripcion: str | None = None
    parametros_entrada: dict | None = None
    resultado: dict | None = None
    costo_inicial: float | None = None
    costo_optimizado: float | None = None
    estado: str | None = None


class OptimizacionResponse(OptimizacionCreate):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
