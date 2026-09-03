from datetime import date, datetime

from sqlalchemy import Boolean, Date, DateTime, ForeignKey, Integer, JSON, Numeric, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database.connection import Base


class UsuarioDB(Base):
    __tablename__ = "usuarios"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nombre: Mapped[str] = mapped_column(String(150))
    email: Mapped[str] = mapped_column(String(200), unique=True)
    password_hash: Mapped[str] = mapped_column(Text)
    rol: Mapped[str] = mapped_column(String(30), default="USUARIO")
    activo: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())


class ClienteDB(Base):
    __tablename__ = "clientes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nombre: Mapped[str] = mapped_column(String(150))
    email: Mapped[str | None] = mapped_column(String(200), nullable=True)
    telefono: Mapped[str | None] = mapped_column(String(50), nullable=True)
    empresa: Mapped[str | None] = mapped_column(String(200), nullable=True)
    activo: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())


class CategoriaDB(Base):
    __tablename__ = "categorias"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nombre: Mapped[str] = mapped_column(String(100), unique=True)
    descripcion: Mapped[str | None] = mapped_column(Text, nullable=True)
    activo: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class ComentarioDB(Base):
    __tablename__ = "comentarios"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    cliente_id: Mapped[int | None] = mapped_column(ForeignKey("clientes.id", ondelete="SET NULL"), nullable=True)
    contenido: Mapped[str] = mapped_column(Text)
    canal: Mapped[str] = mapped_column(String(30), default="web")
    estado: Mapped[str] = mapped_column(String(30), default="pendiente")
    categoria: Mapped[str | None] = mapped_column(String(50), nullable=True)
    fecha: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    procesado: Mapped[bool] = mapped_column(Boolean, default=False)


class TiempoAtencionDB(Base):
    __tablename__ = "tiempos_atencion"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    cliente_id: Mapped[int | None] = mapped_column(ForeignKey("clientes.id", ondelete="SET NULL"), nullable=True)
    comentario_id: Mapped[int | None] = mapped_column(ForeignKey("comentarios.id", ondelete="SET NULL"), nullable=True)
    tiempo_minutos: Mapped[float] = mapped_column(Numeric(10, 2))
    fecha: Mapped[date] = mapped_column(Date, server_default=func.current_date())
    operador: Mapped[str | None] = mapped_column(String(150), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class AnalisisNLPDB(Base):
    __tablename__ = "analisis_nlp"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    comentario_id: Mapped[int] = mapped_column(ForeignKey("comentarios.id", ondelete="CASCADE"))
    idioma: Mapped[str] = mapped_column(String(20), default="es")
    cantidad_palabras: Mapped[int] = mapped_column(Integer, default=0)
    palabras_limpias: Mapped[list] = mapped_column(JSON, default=list)
    palabras_frecuentes: Mapped[list] = mapped_column(JSON, default=list)
    categoria_detectada: Mapped[str] = mapped_column(String(100))
    confianza: Mapped[float] = mapped_column(default=0.95)
    fecha_analisis: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class MetricasEstadisticaDB(Base):
    __tablename__ = "metricas_estadisticas"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    fecha_inicio: Mapped[date] = mapped_column(Date)
    fecha_fin: Mapped[date] = mapped_column(Date)
    cantidad_registros: Mapped[int] = mapped_column(Integer, default=0)
    media: Mapped[float | None] = mapped_column(Numeric(12, 4), nullable=True)
    mediana: Mapped[float | None] = mapped_column(Numeric(12, 4), nullable=True)
    desviacion_estandar: Mapped[float | None] = mapped_column(Numeric(12, 4), nullable=True)
    minimo: Mapped[float | None] = mapped_column(Numeric(12, 4), nullable=True)
    maximo: Mapped[float | None] = mapped_column(Numeric(12, 4), nullable=True)
    percentil_25: Mapped[float | None] = mapped_column(Numeric(12, 4), nullable=True)
    percentil_75: Mapped[float | None] = mapped_column(Numeric(12, 4), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class OptimizacionDB(Base):
    __tablename__ = "optimizaciones"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nombre: Mapped[str] = mapped_column(String(150))
    descripcion: Mapped[str | None] = mapped_column(Text, nullable=True)
    parametros_entrada: Mapped[dict] = mapped_column(JSON)
    resultado: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    costo_inicial: Mapped[float | None] = mapped_column(Numeric(14, 4), nullable=True)
    costo_optimizado: Mapped[float | None] = mapped_column(Numeric(14, 4), nullable=True)
    estado: Mapped[str] = mapped_column(String(30), default="pendiente")
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class AuditoriaDB(Base):
    __tablename__ = "auditoria"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    usuario_id: Mapped[int | None] = mapped_column(ForeignKey("usuarios.id", ondelete="SET NULL"), nullable=True)
    accion: Mapped[str] = mapped_column(String(100))
    tabla: Mapped[str | None] = mapped_column(String(100), nullable=True)
    registro_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    detalles: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    ip: Mapped[str | None] = mapped_column(String(45), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
