from typing import Any

from pydantic import BaseModel, Field


class EstadisticasRequest(BaseModel):
    valores: list[float] = Field(min_length=1)


class EstadisticasResponse(BaseModel):
    cantidad: int
    media: float
    mediana: float
    desviacion_estandar: float
    minimo: float
    maximo: float
    percentil_25: float
    percentil_75: float


class OptimizacionRequest(BaseModel):
    nombre: str
    recursos: dict[str, float]


class InterpolacionRequest(BaseModel):
    x_puntos: list[float]
    y_puntos: list[float]
    x_nuevo: list[float]


class InterpolacionResponse(BaseModel):
    x_nuevo: list[float]
    y_interpolado: list[float]
