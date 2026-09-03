from fastapi import APIRouter, HTTPException

from app.schemas.scipy_schemas import (
	EstadisticasRequest,
	EstadisticasResponse,
	InterpolacionRequest,
	InterpolacionResponse,
	OptimizacionRequest,
)
from app.services.scipy_service import SciPyService

router = APIRouter(prefix="/scipy", tags=["SciPy Computación Científica"])


@router.post("/estadisticas", response_model=EstadisticasResponse)
async def procesar_estadisticas(payload: EstadisticasRequest):
	return SciPyService.calcular_estadisticas(payload.valores)


@router.post("/optimizacion")
async def optimizar(payload: OptimizacionRequest):
	resultado = SciPyService.optimizar_costos(payload.recursos)
	return {"nombre": payload.nombre, "parametros_entrada": payload.recursos, "resultado": resultado, "costo_optimizado": resultado["costo"]}


@router.post("/interpolacion", response_model=InterpolacionResponse)
async def interpolar(payload: InterpolacionRequest):
	if len(payload.x_puntos) != len(payload.y_puntos) or len(payload.x_puntos) < 2:
		raise HTTPException(status_code=400, detail="Las listas x e y deben tener la misma longitud (mínimo 2)")
	return {"x_nuevo": payload.x_nuevo, "y_interpolado": SciPyService.interpolar_datos(payload.x_puntos, payload.y_puntos, payload.x_nuevo)}
