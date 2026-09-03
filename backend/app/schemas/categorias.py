from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CategoriaCreate(BaseModel):
    nombre: str
    descripcion: str | None = None
    activo: bool = True


class CategoriaUpdate(BaseModel):
    nombre: str | None = None
    descripcion: str | None = None
    activo: bool | None = None


class CategoriaResponse(CategoriaCreate):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
