from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user
from app.database.connection import get_db
from app.database.models import CategoriaDB
from app.schemas.categorias import CategoriaCreate, CategoriaResponse, CategoriaUpdate

router = APIRouter(prefix="/categorias", tags=["Categorías"])


@router.post("/", response_model=CategoriaResponse)
async def crear_categoria(
    categoria: CategoriaCreate,
    db: AsyncSession = Depends(get_db),
    _: dict = Depends(get_current_user),
):
    existente = await db.scalar(select(CategoriaDB).where(CategoriaDB.nombre == categoria.nombre))
    if existente:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="La categoría ya existe")
    nueva = CategoriaDB(**categoria.model_dump(exclude_none=True))
    db.add(nueva)
    await db.commit()
    await db.refresh(nueva)
    return nueva


@router.get("/", response_model=list[CategoriaResponse])
async def listar_categorias(db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
    resultado = await db.execute(select(CategoriaDB).order_by(CategoriaDB.id))
    return resultado.scalars().all()


@router.get("/{categoria_id}", response_model=CategoriaResponse)
async def obtener_categoria(categoria_id: int, db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
    categoria = await db.get(CategoriaDB, categoria_id)
    if categoria is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Categoría no encontrada")
    return categoria


@router.put("/{categoria_id}", response_model=CategoriaResponse)
async def actualizar_categoria(
    categoria_id: int,
    datos: CategoriaUpdate,
    db: AsyncSession = Depends(get_db),
    _: dict = Depends(get_current_user),
):
    categoria = await db.get(CategoriaDB, categoria_id)
    if categoria is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Categoría no encontrada")
    for campo, valor in datos.model_dump(exclude_unset=True).items():
        setattr(categoria, campo, valor)
    await db.commit()
    await db.refresh(categoria)
    return categoria


@router.delete("/{categoria_id}", status_code=status.HTTP_204_NO_CONTENT)
async def eliminar_categoria(categoria_id: int, db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
    categoria = await db.get(CategoriaDB, categoria_id)
    if categoria is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Categoría no encontrada")
    await db.delete(categoria)
    await db.commit()
