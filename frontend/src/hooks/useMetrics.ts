import { useEffect, useState } from 'react';
import { fetchAttentionMetrics, fetchAttentionTimes, fetchDashboardSummary } from '../services/backend';
import type { MetricBar, MetricSnapshot } from '../types';

export function useMetrics() {
  const [summary, setSummary] = useState<MetricBar[]>([]);
  const [snapshots, setSnapshots] = useState<MetricSnapshot[]>([]);
  const [times, setTimes] = useState<number[]>([]);
  useEffect(() => {
    Promise.all([fetchDashboardSummary(), fetchAttentionTimes(), fetchAttentionMetrics()]).then(([dashboard, times, attentionMetrics]) => {
      const values = times.map((item) => Number(item.tiempo_minutos));
      setTimes(values);
      const average = values.length ? values.reduce((total, value) => total + value, 0) / values.length : dashboard.tiempo_promedio;
      setSummary(dashboard.metricas);
      setSnapshots([
        { label: 'Tiempo promedio', value: `${attentionMetrics.media.toFixed(2)} min`, description: 'Media calculada con SciPy' },
        { label: 'Mediana', value: `${attentionMetrics.mediana.toFixed(2)} min`, description: 'Punto central de atención' },
        { label: 'Variabilidad', value: `${attentionMetrics.desviacion_estandar.toFixed(2)} min`, description: 'Desviación estándar' },
        { label: 'Rango', value: `${attentionMetrics.minimo.toFixed(2)} - ${attentionMetrics.maximo.toFixed(2)} min`, description: `${attentionMetrics.cantidad} registros analizados` },
        { label: 'Procesados', value: `${dashboard.porcentaje_procesados}%`, description: 'Comentarios procesados' },
      ]);
    }).catch(() => { setSummary([]); setSnapshots([]); });
  }, []);
  return { summary, snapshots, times, averages: { attention: summary[0]?.value ?? 0, quality: summary[2]?.value ?? 0, retention: summary[3]?.value ?? 0 } };
}
