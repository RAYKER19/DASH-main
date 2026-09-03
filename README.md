# DASH

Dashboard empresarial con React, FastAPI, SciPy, NLTK y Supabase.

## Configuración local

1. Crea `backend/app/.env` a partir de `backend/.env.example`.
2. Completa `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_KEY` y
	`SUPABASE_JWT_SECRET` con los valores del proyecto Supabase.
3. Ejecuta `database/001_schema.sql` y después `database/002_seed.sql` en el
	SQL Editor de Supabase.
4. Instala las dependencias: `pip install -r backend/requirements.txt`.
5. Inicia la API: `uvicorn app.main:app --app-dir backend --reload --port 8000`.
6. Inicia el frontend desde `frontend`: `npm install && npm run dev`.

La API usa directamente PostgreSQL de Supabase mediante SQLAlchemy y `asyncpg`.
`GET /health` comprueba la conexión ejecutando `SELECT 1`.
También informa las tablas requeridas y `schema_ready`; el arranque no ejecuta
`CREATE TABLE` ni modifica el esquema existente de Supabase.
