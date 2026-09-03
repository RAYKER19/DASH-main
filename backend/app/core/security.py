from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

from app.core.config import settings

security_scheme = HTTPBearer(auto_error=False)


async def get_current_user(
	credentials: HTTPAuthorizationCredentials | None = Depends(security_scheme),
):
	if credentials is None:
		return {"user_id": None, "role": "anonymous"}
	if not settings.SUPABASE_JWT_SECRET:
		raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="JWT no configurado")
	try:
		payload = jwt.decode(
			credentials.credentials,
			settings.SUPABASE_JWT_SECRET,
			algorithms=["HS256"],
			audience="authenticated",
		)
		user_id = payload.get("sub")
		if not user_id:
			raise JWTError
		return {"user_id": user_id, "email": payload.get("email"), "role": payload.get("role")}
	except JWTError as exc:
		raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Error al validar credenciales") from exc
