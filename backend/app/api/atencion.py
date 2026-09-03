from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user
from app.database.connection import get_db
from app.database.models import TiempoAtencionDB
from app.schemas.atencion import TiempoAtencionCreate, TiempoAtencionResponse

router = APIRouter(prefix="/tiempos-atencion", tags=["Atención"])


@router.post("/", response_model=TiempoAtencionResponse)
async def crear_tiempo_atencion(
        tiempo: TiempoAtencionCreate,
        db: AsyncSession = Depends(get_db),
        _: dict = Depends(get_current_user),
):
        nuevo = TiempoAtencionDB(**tiempo.model_dump(exclude_none=True))
        db.add(nuevo)
        await db.commit()
        await db.refresh(nuevo)
        return nuevo


@router.get("/", response_model=list[TiempoAtencionResponse])
async def listar_tiempos_atencion(
        db: AsyncSession = Depends(get_db),
        _: dict = Depends(get_current_user),
):
        resultado = await db.execute(
                select(TiempoAtencionDB).order_by(TiempoAtencionDB.fecha.desc(), TiempoAtencionDB.id.desc())
        )
        return resultado.scalars().all()