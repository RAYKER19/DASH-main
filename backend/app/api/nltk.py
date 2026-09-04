from fastapi import APIRouter, HTTPException
from fastapi import Depends

from app.schemas.nltk_schemas import (
	AnalizarTextoRequest,
	ClasificarTextoRequest,
	NLTKAnalisisResponse,
	PalabrasFrecuentesRequest,
)
from app.services.nltk_service import NLTKService
from app.core.security import get_current_user

router = APIRouter(prefix="/nltk", tags=["NLTK NLP"])


@router.post("/analizar", response_model=NLTKAnalisisResponse)
async def analizar_texto(payload: AnalizarTextoRequest, _: dict = Depends(get_current_user)):
	if not payload.texto.strip():
		raise HTTPException(status_code=400, detail="Texto vacío")
	return NLTKService.procesar_texto(payload.texto)


@router.post("/palabras-frecuentes")
async def palabras_frecuentes(payload: PalabrasFrecuentesRequest, _: dict = Depends(get_current_user)):
	return NLTKService.calcular_palabras_frecuentes(payload.textos, payload.top_n)


@router.post("/clasificar")
async def clasificar_comentario(payload: ClasificarTextoRequest, _: dict = Depends(get_current_user)):
	return {"texto": payload.texto, "categoria": NLTKService.clasificar_texto(payload.texto)}
