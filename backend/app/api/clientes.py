from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user
from app.database.connection import get_db
from app.database.models import ClienteDB
from app.schemas.clientes import ClienteCreate, ClienteResponse, ClienteUpdate

router = APIRouter(prefix="/clientes", tags=["Clientes"])


@router.post("/", response_model=ClienteResponse)
async def crear_cliente(cliente: ClienteCreate, db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
	nuevo = ClienteDB(**cliente.model_dump())
	db.add(nuevo)
	await db.commit()
	await db.refresh(nuevo)
	return nuevo


@router.get("/", response_model=list[ClienteResponse])
async def listar_clientes(db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
	resultado = await db.execute(select(ClienteDB).order_by(ClienteDB.id))
	return resultado.scalars().all()


@router.get("/{cliente_id}", response_model=ClienteResponse)
async def obtener_cliente(cliente_id: int, db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
	cliente = await db.get(ClienteDB, cliente_id)
	if cliente is None:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cliente no encontrado")
	return cliente


@router.put("/{cliente_id}", response_model=ClienteResponse)
async def actualizar_cliente(cliente_id: int, datos: ClienteUpdate, db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
	cliente = await db.get(ClienteDB, cliente_id)
	if cliente is None:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cliente no encontrado")
	for campo, valor in datos.model_dump(exclude_unset=True).items():
		setattr(cliente, campo, valor)
	await db.commit()
	await db.refresh(cliente)
	return cliente


@router.delete("/{cliente_id}", status_code=status.HTTP_204_NO_CONTENT)
async def eliminar_cliente(cliente_id: int, db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
	cliente = await db.get(ClienteDB, cliente_id)
	if cliente is None:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cliente no encontrado")
	await db.delete(cliente)
	await db.commit()
