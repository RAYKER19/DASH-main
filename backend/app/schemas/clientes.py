from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class ClienteCreate(BaseModel):
    nombre: str
    email: EmailStr | None = None
    telefono: str | None = None
    empresa: str | None = None


class ClienteUpdate(BaseModel):
    nombre: str | None = None
    email: EmailStr | None = None
    telefono: str | None = None
    empresa: str | None = None
    activo: bool | None = None


class ClienteResponse(ClienteCreate):
    id: int
    activo: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
