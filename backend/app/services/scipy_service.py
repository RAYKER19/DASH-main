import numpy as np
from scipy import stats
from scipy.interpolate import interp1d
from scipy.optimize import minimize


class SciPyService:
	@staticmethod
	def calcular_estadisticas(valores: list[float]) -> dict:
		datos = np.asarray(valores, dtype=float)
		descripcion = stats.describe(datos)
		return {
			"cantidad": int(datos.size),
			"media": float(descripcion.mean),
			"mediana": float(np.median(datos)),
			"desviacion_estandar": float(np.sqrt(descripcion.variance)) if datos.size > 1 else 0.0,
			"minimo": float(descripcion.minmax[0]),
			"maximo": float(descripcion.minmax[1]),
			"percentil_25": float(stats.scoreatpercentile(datos, 25)),
			"percentil_75": float(stats.scoreatpercentile(datos, 75)),
		}

	@staticmethod
	def optimizar_costos(recursos: dict[str, float]) -> dict:
		inicial = np.array([max(float(recursos.get("recurso_a", 3)), 0.1), max(float(recursos.get("recurso_b", 5)), 0.1)])
		costos = np.array([120.0, 80.0])
		objetivo = lambda cantidades: float(np.dot(costos, cantidades) + 25 * np.sum((cantidades - inicial) ** 2))
		resultado = minimize(objetivo, inicial, method="SLSQP", bounds=[(0.1, None), (0.1, None)], constraints={"type": "ineq", "fun": lambda cantidades: np.sum(cantidades) - 1})
		if not resultado.success:
			raise ValueError("No se pudo encontrar una solución de optimización")
		costo_inicial = objetivo(inicial)
		costo_optimizado = float(resultado.fun)
		return {
			"recurso_a": round(float(resultado.x[0]), 2),
			"recurso_b": round(float(resultado.x[1]), 2),
			"costo": round(costo_optimizado, 2),
			"ahorro_porcentual": round(max(0, (costo_inicial - costo_optimizado) / costo_inicial * 100), 2),
			"roi": round(costo_inicial / costo_optimizado, 2) if costo_optimizado else 0,
		}

	@staticmethod
	def interpolar_datos(x_puntos: list[float], y_puntos: list[float], x_nuevo: list[float]) -> list[float]:
		orden = np.argsort(x_puntos)
		interpolador = interp1d(np.asarray(x_puntos)[orden], np.asarray(y_puntos)[orden], kind="linear", bounds_error=False, fill_value="extrapolate")
		return [round(float(valor), 4) for valor in interpolador(x_nuevo)]
