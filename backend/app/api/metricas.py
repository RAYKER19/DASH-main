from collections import Counter

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models import AnalisisNLPDB, CategoriaDB, ClienteDB, ComentarioDB, OptimizacionDB, TiempoAtencionDB, UsuarioDB, AuditoriaDB

router = APIRouter(prefix="/metricas", tags=["Métricas Dashboard"])


@router.get("/resumen")
async def resumen_dashboard(db: AsyncSession = Depends(get_db)):
	total_clientes = await db.scalar(select(func.count(ClienteDB.id))) or 0
	total_comentarios = await db.scalar(select(func.count(ComentarioDB.id))) or 0
	procesados = await db.scalar(select(func.count(ComentarioDB.id)).where(ComentarioDB.procesado.is_(True))) or 0
	porcentaje = procesados / total_comentarios * 100 if total_comentarios else 0

	comentarios_por_categoria = dict((await db.execute(
		select(ComentarioDB.categoria, func.count(ComentarioDB.id))
		.where(ComentarioDB.categoria.is_not(None))
		.group_by(ComentarioDB.categoria)
	)).all())
	configuradas = (await db.scalars(select(CategoriaDB).where(CategoriaDB.activo.is_(True)).order_by(CategoriaDB.id))).all()
	categorias = {category.nombre: comentarios_por_categoria.get(category.nombre, 0) for category in configuradas}
	for category, count in comentarios_por_categoria.items():
		if category and category not in categorias:
			categorias[category] = count
	total_categorizados = sum(categorias.values())
	category_colors = {
		"SOPORTE": "#2db869",
		"VENTAS": "#5dc1a8",
		"RECLAMO": "#7b9cf8",
		"FELICITACION": "#f4b740",
		"CONSULTA": "#e58b5b",
	}
	category_labels = {
		"SOPORTE": "Soporte",
		"VENTAS": "Ventas",
		"RECLAMO": "Reclamos",
		"FELICITACION": "Felicitaciones",
		"CONSULTA": "Consultas",
	}
	category_metrics = [
		{
			"name": category_labels.get(category, category.title()),
			"value": round(count / total_categorizados * 100, 1) if total_categorizados else 0,
			"color": category_colors.get(category, "#8b98a8"),
		}
		for category, count in sorted(categorias.items(), key=lambda item: item[1], reverse=True)
	]

	time_rows = (await db.scalars(select(TiempoAtencionDB).order_by(TiempoAtencionDB.fecha.asc(), TiempoAtencionDB.id.asc()))).all()
	times = [float(row.tiempo_minutos) for row in time_rows]
	average_time = sum(times) / len(times) if times else 0
	trend = [round(value, 1) for value in times[-12:]]
	if not trend:
		trend = [0]

	analyses = (await db.scalars(select(AnalisisNLPDB))).all()
	words = Counter()
	for analysis in analyses:
		items = analysis.palabras_frecuentes or analysis.palabras_limpias or []
		for item in items:
			if isinstance(item, dict):
				word = str(item.get("palabra", "")).lower()
				frequency = int(item.get("frecuencia", 1) or 1)
			else:
				word = str(item).lower()
				frequency = 1
			if len(word) > 2:
				words[word] += frequency
	word_cloud = [{"word": word, "size": min(1.5, round(0.8 + count / max(words.values(), default=1), 2))} for word, count in words.most_common(12)]

	recent_comments = (await db.scalars(
		select(ComentarioDB).order_by(ComentarioDB.fecha.desc()).limit(5)
	)).all()
	activity = [
		{
			"id": comment.id,
			"title": "Comentario procesado" if comment.procesado else "Comentario recibido",
			"detail": comment.contenido[:120],
			"time": comment.fecha.strftime("%d/%m/%Y %H:%M") if comment.fecha else "",
			"type": "success" if comment.procesado else "info",
		}
		for comment in recent_comments
	]
	positive = categorias.get("FELICITACION", 0)
	active_clients = await db.scalar(select(func.count(ClienteDB.id)).where(ClienteDB.activo.is_(True))) or 0
	total_analyses = len(analyses)
	metrics = [
		{"label": "Atención", "value": round(porcentaje), "target": 100},
		{"label": "NLP", "value": round(total_analyses / total_comentarios * 100) if total_comentarios else 0, "target": 100},
		{"label": "Calidad", "value": round((total_categorizados / total_comentarios) * 100) if total_comentarios else 0, "target": 100},
		{"label": "Retención", "value": round(active_clients / total_clientes * 100) if total_clientes else 0, "target": 100},
	]

	return {
		"clientes": total_clientes,
		"comentarios": total_comentarios,
		"porcentaje_procesados": round(porcentaje, 2),
		"tiempo_promedio": round(average_time, 2),
		"categorias": category_metrics,
		"tendencia_tiempos": trend,
		"palabras": word_cloud,
		"actividad": activity,
		"metricas": metrics,
		"tablas": {
			"usuarios": await db.scalar(select(func.count(UsuarioDB.id))) or 0,
			"auditoria": await db.scalar(select(func.count(AuditoriaDB.id))) or 0,
			"optimizaciones": await db.scalar(select(func.count(OptimizacionDB.id))) or 0,
			"tiempos_atencion": len(time_rows),
			"analisis_nlp": total_analyses,
		},
	}
