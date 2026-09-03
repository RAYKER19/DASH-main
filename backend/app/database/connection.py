import ssl

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings


ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

connect_args = {"ssl": ssl_context} if "supabase.co" in settings.DATABASE_URL else {}

engine = create_async_engine(settings.DATABASE_URL, echo=False, pool_pre_ping=True, connect_args=connect_args)
AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


class Base(DeclarativeBase):
	pass


async def get_db():
	async with AsyncSessionLocal() as session:
		yield session
