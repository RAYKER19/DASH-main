from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user
from app.database.connection import get_db
from app.database.models import UsuarioDB
from app.schemas.usuarios import UsuarioCreate, UsuarioResponse, UsuarioUpdate

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


@router.post("/", response_model=UsuarioResponse)
async def crear_usuario(
    usuario: UsuarioCreate,
    db: AsyncSession = Depends(get_db),
    _: dict = Depends(get_current_user),
):
    existing = await db.scalar(select(UsuarioDB).where(UsuarioDB.email == usuario.email))
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="El email ya existe")
    nuevo = UsuarioDB(**usuario.model_dump(exclude_none=True))
    db.add(nuevo)
    await db.commit()
    await db.refresh(nuevo)
    return nuevo


@router.get("/", response_model=list[UsuarioResponse])
async def listar_usuarios(db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
    resultado = await db.execute(select(UsuarioDB).order_by(UsuarioDB.id))
    return resultado.scalars().all()


@router.get("/{usuario_id}", response_model=UsuarioResponse)
async def obtener_usuario(usuario_id: int, db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
    usuario = await db.get(UsuarioDB, usuario_id)
    if usuario is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    return usuario


@router.put("/{usuario_id}", response_model=UsuarioResponse)
async def actualizar_usuario(
    usuario_id: int,
    datos: UsuarioUpdate,
    db: AsyncSession = Depends(get_db),
    _: dict = Depends(get_current_user),
):
    usuario = await db.get(UsuarioDB, usuario_id)
    if usuario is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    for campo, valor in datos.model_dump(exclude_unset=True).items():
        setattr(usuario, campo, valor)
    await db.commit()
    await db.refresh(usuario)
    return usuario


@router.delete("/{usuario_id}", status_code=status.HTTP_204_NO_CONTENT)
async def eliminar_usuario(usuario_id: int, db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
    usuario = await db.get(UsuarioDB, usuario_id)
    if usuario is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    await db.delete(usuario)
    await db.commit()
