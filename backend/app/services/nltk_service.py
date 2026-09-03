import re
from collections import Counter


STOPWORDS = {"el", "la", "los", "las", "un", "una", "de", "que", "y", "en", "por", "para", "con", "del", "se"}


class NLTKService:
	@staticmethod
	def tokens(texto: str) -> list[str]:
		return [token for token in re.findall(r"[\wáéíóúüñ]+", texto.lower()) if token not in STOPWORDS]

	@classmethod
	def procesar_texto(cls, texto: str) -> dict:
		tokens = cls.tokens(texto)
		frecuencias = [{"palabra": palabra, "frecuencia": cantidad} for palabra, cantidad in Counter(tokens).most_common(5)]
		return {
			"idioma": "es",
			"cantidad_palabras": len(tokens),
			"tokens": tokens,
			"palabras_frecuentes": frecuencias,
			"categoria": cls.clasificar_texto(texto),
		}

	@classmethod
	def calcular_palabras_frecuentes(cls, textos: list[str], top_n: int = 10) -> list[dict]:
		frecuencias = Counter(token for texto in textos for token in cls.tokens(texto))
		return [{"palabra": palabra, "frecuencia": cantidad} for palabra, cantidad in frecuencias.most_common(top_n)]

	@staticmethod
	def clasificar_texto(texto: str) -> str:
		texto = texto.lower()
		categorias = {
			"FELICITACION": ("excelente", "bueno", "rápido", "atención"),
			"RECLAMO": ("malo", "pésimo", "reclamo", "error", "tarde"),
			"VENTAS": ("precio", "comprar", "venta", "cotización"),
			"SOPORTE": ("ayuda", "soporte", "técnico", "problema"),
		}
		return next((categoria for categoria, palabras in categorias.items() if any(palabra in texto for palabra in palabras)), "CONSULTA")
