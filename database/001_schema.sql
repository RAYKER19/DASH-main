
CREATE TABLE IF NOT EXISTS usuarios (
	id BIGSERIAL PRIMARY KEY,
	nombre VARCHAR(150) NOT NULL,
	email VARCHAR(200) UNIQUE NOT NULL,
	password_hash TEXT NOT NULL,
	rol VARCHAR(30) NOT NULL DEFAULT 'USUARIO'
		CHECK (rol IN ('ADMIN', 'ANALISTA', 'SUPERVISOR', 'USUARIO')),
	activo BOOLEAN NOT NULL DEFAULT TRUE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clientes (
	id BIGSERIAL PRIMARY KEY,
	nombre VARCHAR(150) NOT NULL,
	email VARCHAR(200),
	telefono VARCHAR(50),
	empresa VARCHAR(200),
	activo BOOLEAN NOT NULL DEFAULT TRUE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categorias (
	id BIGSERIAL PRIMARY KEY,
	nombre VARCHAR(100) UNIQUE NOT NULL,
	descripcion TEXT,
	activo BOOLEAN NOT NULL DEFAULT TRUE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS comentarios (
	id BIGSERIAL PRIMARY KEY,
	cliente_id BIGINT REFERENCES clientes(id) ON DELETE SET NULL,
	contenido TEXT NOT NULL,
	canal VARCHAR(30) NOT NULL DEFAULT 'web',
	estado VARCHAR(30) NOT NULL DEFAULT 'pendiente',
	categoria VARCHAR(50),
	fecha TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	procesado BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS analisis_nlp (
	id BIGSERIAL PRIMARY KEY,
	comentario_id BIGINT NOT NULL REFERENCES comentarios(id) ON DELETE CASCADE,
	idioma VARCHAR(20) NOT NULL DEFAULT 'es',
	cantidad_palabras INTEGER NOT NULL DEFAULT 0,
	palabras_limpias JSONB NOT NULL DEFAULT '[]'::jsonb,
	palabras_frecuentes JSONB NOT NULL DEFAULT '[]'::jsonb,
	categoria_detectada VARCHAR(100),
	confianza NUMERIC(5,4),
	fecha_analisis TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tiempos_atencion (
	id BIGSERIAL PRIMARY KEY,
	cliente_id BIGINT REFERENCES clientes(id) ON DELETE SET NULL,
	comentario_id BIGINT REFERENCES comentarios(id) ON DELETE SET NULL,
	tiempo_minutos NUMERIC(10,2) NOT NULL CHECK (tiempo_minutos >= 0),
	fecha DATE NOT NULL DEFAULT CURRENT_DATE,
	operador VARCHAR(150),
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS metricas_estadisticas (
	id BIGSERIAL PRIMARY KEY,
	fecha_inicio DATE NOT NULL,
	fecha_fin DATE NOT NULL,
	cantidad_registros INTEGER NOT NULL CHECK (cantidad_registros >= 0),
	media NUMERIC(12,4),
	mediana NUMERIC(12,4),
	desviacion_estandar NUMERIC(12,4),
	minimo NUMERIC(12,4),
	maximo NUMERIC(12,4),
	percentil_25 NUMERIC(12,4),
	percentil_75 NUMERIC(12,4),
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	CHECK (fecha_fin >= fecha_inicio)
);

CREATE TABLE IF NOT EXISTS optimizaciones (
	id BIGSERIAL PRIMARY KEY,
	nombre VARCHAR(150) NOT NULL,
	descripcion TEXT,
	parametros_entrada JSONB NOT NULL,
	resultado JSONB,
	costo_inicial NUMERIC(14,4),
	costo_optimizado NUMERIC(14,4),
	estado VARCHAR(30) NOT NULL DEFAULT 'pendiente',
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS auditoria (
	id BIGSERIAL PRIMARY KEY,
	usuario_id BIGINT REFERENCES usuarios(id) ON DELETE SET NULL,
	accion VARCHAR(100) NOT NULL,
	tabla VARCHAR(100),
	registro_id BIGINT,
	detalles JSONB,
	ip VARCHAR(45),
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comentarios_cliente ON comentarios(cliente_id);
CREATE INDEX IF NOT EXISTS idx_comentarios_fecha ON comentarios(fecha DESC);
CREATE INDEX IF NOT EXISTS idx_analisis_nlp_comentario ON analisis_nlp(comentario_id);
CREATE INDEX IF NOT EXISTS idx_tiempos_atencion_fecha ON tiempos_atencion(fecha);
