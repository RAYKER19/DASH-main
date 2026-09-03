from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user
from app.database.connection import get_db
from app.database.models import OptimizacionDB
from app.schemas.optimizaciones import OptimizacionCreate, OptimizacionResponse, OptimizacionUpdate

router = APIRouter(prefix="/optimizaciones", tags=["Optimizaciones"])


@router.post("/", response_model=OptimizacionResponse)
async def crear_optimizacion(
    optimizacion: OptimizacionCreate,
    db: AsyncSession = Depends(get_db),
    _: dict = Depends(get_current_user),
):
    nueva = OptimizacionDB(**optimizacion.model_dump(exclude_none=True))
    db.add(nueva)
    await db.commit()
    await db.refresh(nueva)
    return nueva


@router.get("/", response_model=list[OptimizacionResponse])
async def listar_optimizaciones(db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
    resultado = await db.execute(select(OptimizacionDB).order_by(OptimizacionDB.created_at.desc()))
    return resultado.scalars().all()


@router.get("/{optimizacion_id}", response_model=OptimizacionResponse)
async def obtener_optimizacion(
    optimizacion_id: int,
    db: AsyncSession = Depends(get_db),
    _: dict = Depends(get_current_user),
):
    item = await db.get(OptimizacionDB, optimizacion_id)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Optimización no encontrada")
    return item


@router.put("/{optimizacion_id}", response_model=OptimizacionResponse)
async def actualizar_optimizacion(
    optimizacion_id: int,
    datos: OptimizacionUpdate,
    db: AsyncSession = Depends(get_db),
    _: dict = Depends(get_current_user),
):
    item = await db.get(OptimizacionDB, optimizacion_id)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Optimización no encontrada")
    for campo, valor in datos.model_dump(exclude_unset=True).items():
        setattr(item, campo, valor)
    await db.commit()
    await db.refresh(item)
    return item


@router.delete("/{optimizacion_id}", status_code=status.HTTP_204_NO_CONTENT)
async def eliminar_optimizacion(
    optimizacion_id: int,
    db: AsyncSession = Depends(get_db),
    _: dict = Depends(get_current_user),
):
    item = await db.get(OptimizacionDB, optimizacion_id)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Optimización no encontrada")
    await db.delete(item)
    await db.commit()
