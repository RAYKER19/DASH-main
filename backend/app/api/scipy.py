from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.scipy_schemas import (
	EstadisticasRequest,
	EstadisticasResponse,
	InterpolacionRequest,
	InterpolacionResponse,
	OptimizacionRequest,
)
from app.services.scipy_service import SciPyService
from app.database.connection import get_db
from app.database.models import MetricasEstadisticaDB, OptimizacionDB, TiempoAtencionDB

router = APIRouter(prefix="/scipy", tags=["SciPy Computación Científica"])


@router.post("/estadisticas", response_model=EstadisticasResponse)
async def procesar_estadisticas(payload: EstadisticasRequest, db: AsyncSession = Depends(get_db)):
	resultado = SciPyService.calcular_estadisticas(payload.valores)
	db.add(MetricasEstadisticaDB(
		fecha_inicio=date.today(), fecha_fin=date.today(), cantidad_registros=resultado["cantidad"],
		media=resultado["media"], mediana=resultado["mediana"], desviacion_estandar=resultado["desviacion_estandar"],
		minimo=resultado["minimo"], maximo=resultado["maximo"], percentil_25=resultado["percentil_25"], percentil_75=resultado["percentil_75"],
	))
	await db.commit()
	return resultado


@router.get("/estadisticas", response_model=EstadisticasResponse)
async def obtener_estadisticas(db: AsyncSession = Depends(get_db)):
	valores = [float(item) for item in (await db.scalars(select(TiempoAtencionDB.tiempo_minutos))).all()]
	if not valores:
		raise HTTPException(status_code=404, detail="No existen tiempos de atención para calcular estadísticas")
	return SciPyService.calcular_estadisticas(valores)


@router.post("/optimizacion")
async def optimizar(payload: OptimizacionRequest, db: AsyncSession = Depends(get_db)):
	resultado = SciPyService.optimizar_costos(payload.recursos)
	nuevo = OptimizacionDB(nombre=payload.nombre, parametros_entrada=payload.recursos, resultado=resultado, costo_optimizado=resultado["costo"], estado="disponible")
	db.add(nuevo)
	await db.commit()
	await db.refresh(nuevo)
	return {"nombre": payload.nombre, "parametros_entrada": payload.recursos, "resultado": resultado, "costo_optimizado": resultado["costo"]}


@router.post("/interpolacion", response_model=InterpolacionResponse)
async def interpolar(payload: InterpolacionRequest):
	if len(payload.x_puntos) != len(payload.y_puntos) or len(payload.x_puntos) < 2:
		raise HTTPException(status_code=400, detail="Las listas x e y deben tener la misma longitud (mínimo 2)")
	return {"x_nuevo": payload.x_nuevo, "y_interpolado": SciPyService.interpolar_datos(payload.x_puntos, payload.y_puntos, payload.x_nuevo)}
