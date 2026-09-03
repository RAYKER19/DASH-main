from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ComentarioCreate(BaseModel):
    contenido: str
    canal: str = "web"
    cliente_id: int | None = None


class ComentarioResponse(ComentarioCreate):
    id: int
    estado: str
    categoria: str | None = None
    procesado: bool
    fecha: datetime
    model_config = ConfigDict(from_attributes=True)
