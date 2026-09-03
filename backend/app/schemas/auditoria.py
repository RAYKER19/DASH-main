from datetime import datetime

from pydantic import BaseModel, ConfigDict


class AuditoriaCreate(BaseModel):
    usuario_id: int | None = None
    accion: str
    tabla: str | None = None
    registro_id: int | None = None
    detalles: dict | None = None
    ip: str | None = None


class AuditoriaResponse(AuditoriaCreate):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
