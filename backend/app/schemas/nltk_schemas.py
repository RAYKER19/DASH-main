from typing import Any

from pydantic import BaseModel, Field


class AnalizarTextoRequest(BaseModel):
    texto: str


class NLTKAnalisisResponse(BaseModel):
    idioma: str
    cantidad_palabras: int
    tokens: list[str]
    palabras_frecuentes: list[dict[str, Any]]
    categoria: str


class PalabrasFrecuentesRequest(BaseModel):
    textos: list[str]
    top_n: int = Field(default=10, ge=1, le=100)


class ClasificarTextoRequest(BaseModel):
    texto: str
