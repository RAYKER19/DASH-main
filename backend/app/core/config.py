from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
	PROJECT_NAME: str = "Empresa Inteligente API"
	API_V1_STR: str = "/api"
	DATABASE_URL: str
	SUPABASE_URL: str
	SUPABASE_KEY: str
	SUPABASE_JWT_SECRET: str
	CORS_ORIGINS: list[str] = [
		"http://localhost:5173",
		"http://127.0.0.1:5173",
		"http://localhost:4173",
		"http://127.0.0.1:4173",
	]

	model_config = SettingsConfigDict(
		env_file=(BACKEND_DIR / ".env", BACKEND_DIR / "app" / ".env"),
		extra="ignore",
	)

	def model_post_init(self, __context):
		if self.DATABASE_URL.startswith("postgresql://"):
			self.DATABASE_URL = self.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
		self.DATABASE_URL = self.DATABASE_URL.replace("sslmode=require", "ssl=require")
		self.DATABASE_URL = self.DATABASE_URL.replace("sslmode=prefer", "ssl=prefer")
		self.DATABASE_URL = self.DATABASE_URL.replace("sslmode=verify-full", "ssl=verify-full")
		if "supabase.co" not in self.DATABASE_URL:
			raise ValueError("DATABASE_URL debe apuntar a una base de datos Supabase")
		if not self.SUPABASE_URL.startswith("https://") or "PROJECT_REF" in self.SUPABASE_URL:
			raise ValueError("SUPABASE_URL debe ser la URL real del proyecto Supabase")


settings = Settings()
