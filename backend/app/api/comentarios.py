from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user
from app.database.connection import get_db
from app.database.models import AnalisisNLPDB, ComentarioDB
from app.schemas.comentarios import ComentarioCreate, ComentarioResponse
from app.services.nltk_service import NLTKService

router = APIRouter(prefix="/comentarios", tags=["Comentarios"])


@router.post("/", response_model=ComentarioResponse)
async def crear_comentario(comentario: ComentarioCreate, db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
	analisis = NLTKService.procesar_texto(comentario.contenido)
	nuevo = ComentarioDB(
		**comentario.model_dump(),
		categoria=analisis["categoria"],
		procesado=True,
	)
	db.add(nuevo)
	await db.commit()
	await db.refresh(nuevo)
	db.add(AnalisisNLPDB(
		comentario_id=nuevo.id,
		idioma=analisis["idioma"],
		cantidad_palabras=analisis["cantidad_palabras"],
		palabras_limpias=analisis["tokens"],
		palabras_frecuentes=analisis["palabras_frecuentes"],
		categoria_detectada=analisis["categoria"],
	))
	await db.commit()
	return nuevo


@router.get("/", response_model=list[ComentarioResponse])
async def listar_comentarios(db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
	resultado = await db.execute(select(ComentarioDB).order_by(ComentarioDB.fecha.desc()))
	return resultado.scalars().all()


@router.get("/{comentario_id}", response_model=ComentarioResponse)
async def obtener_comentario(comentario_id: int, db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
	comentario = await db.get(ComentarioDB, comentario_id)
	if comentario is None:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comentario no encontrado")
	return comentario


@router.delete("/{comentario_id}", status_code=status.HTTP_204_NO_CONTENT)
async def eliminar_comentario(comentario_id: int, db: AsyncSession = Depends(get_db), _: dict = Depends(get_current_user)):
	comentario = await db.get(ComentarioDB, comentario_id)
	if comentario is None:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comentario no encontrado")
	await db.delete(comentario)
	await db.commit()
