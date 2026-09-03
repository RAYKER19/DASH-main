from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user
from app.database.connection import get_db
from app.database.models import AuditoriaDB
from app.schemas.auditoria import AuditoriaCreate, AuditoriaResponse

router = APIRouter(prefix="/auditoria", tags=["Auditoría"])


@router.post("/", response_model=AuditoriaResponse)
async def registrar_auditoria(
    registro: AuditoriaCreate,
    db: AsyncSession = Depends(get_db),
    _: dict = Depends(get_current_user),
):
    nuevo = AuditoriaDB(**registro.model_dump(exclude_none=True))
    db.add(nuevo)
    await db.commit()
    await db.refresh(nuevo)
    return nuevo


@router.get("/", response_model=list[AuditoriaResponse])
async def listar_auditoria(db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
    resultado = await db.execute(select(AuditoriaDB).order_by(AuditoriaDB.created_at.desc()))
    return resultado.scalars().all()


@router.get("/{registro_id}", response_model=AuditoriaResponse)
async def obtener_auditoria(registro_id: int, db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
    registro = await db.get(AuditoriaDB, registro_id)
    if registro is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Registro de auditoría no encontrado")
    return registro
