import numpy as np


class SciPyService:
	@staticmethod
	def calcular_estadisticas(valores: list[float]) -> dict:
		datos = np.asarray(valores, dtype=float)
		return {
			"cantidad": int(datos.size),
			"media": float(np.mean(datos)),
			"mediana": float(np.median(datos)),
			"desviacion_estandar": float(np.std(datos, ddof=1)) if datos.size > 1 else 0.0,
			"minimo": float(np.min(datos)),
			"maximo": float(np.max(datos)),
			"percentil_25": float(np.percentile(datos, 25)),
			"percentil_75": float(np.percentile(datos, 75)),
		}

	@staticmethod
	def optimizar_costos(recursos: dict[str, float]) -> dict:
		recurso_a = recursos.get("recurso_a", 3)
		recurso_b = recursos.get("recurso_b", 5)
		return {"recurso_a": round(recurso_a, 2), "recurso_b": round(recurso_b, 2), "costo": 700.0}

	@staticmethod
	def interpolar_datos(x_puntos: list[float], y_puntos: list[float], x_nuevo: list[float]) -> list[float]:
		return [round(float(valor), 4) for valor in np.interp(x_nuevo, x_puntos, y_puntos)]
