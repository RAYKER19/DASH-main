import unittest

from app.services.nltk_service import NLTKService
from app.services.scipy_service import SciPyService


class ScientificServicesTests(unittest.TestCase):
    def test_calcular_estadisticas(self):
        resultado = SciPyService.calcular_estadisticas([10, 20, 30])
        self.assertEqual(resultado["cantidad"], 3)
        self.assertEqual(resultado["media"], 20)
        self.assertEqual(resultado["percentil_25"], 15)

    def test_optimizar_costos_reduces_coste(self):
        resultado = SciPyService.optimizar_costos({"recurso_a": 3, "recurso_b": 5})
        self.assertGreaterEqual(resultado["ahorro_porcentual"], 0)
        self.assertGreater(resultado["roi"], 0)

    def test_interpolacion_lineal(self):
        resultado = SciPyService.interpolar_datos([0, 1, 2], [0, 10, 20], [0.5, 1.5])
        self.assertEqual(resultado, [5.0, 15.0])

    def test_nltk_clasifica_soporte(self):
        self.assertEqual(NLTKService.clasificar_texto("Necesito soporte técnico"), "SOPORTE")


if __name__ == "__main__":
    unittest.main()