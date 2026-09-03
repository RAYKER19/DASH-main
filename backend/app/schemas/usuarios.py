from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class UsuarioCreate(BaseModel):
    nombre: str
    email: EmailStr
    password_hash: str
    rol: str = "USUARIO"
    activo: bool = True


class UsuarioUpdate(BaseModel):
    nombre: str | None = None
    email: EmailStr | None = None
    password_hash: str | None = None
    rol: str | None = None
    activo: bool | None = None


class UsuarioResponse(UsuarioCreate):
    id: int
    created_at: datetime
    updated_at: datetime | None = None
    model_config = ConfigDict(from_attributes=True)
