import { useEffect, useState } from 'react';
import { fetchAttentionTimes, fetchDashboardSummary } from '../services/backend';
import type { MetricBar, MetricSnapshot } from '../types';

export function useMetrics() {
  const [summary, setSummary] = useState<MetricBar[]>([]);
  const [snapshots, setSnapshots] = useState<MetricSnapshot[]>([]);
  const [times, setTimes] = useState<number[]>([]);
  useEffect(() => {
    Promise.all([fetchDashboardSummary(), fetchAttentionTimes()]).then(([dashboard, times]) => {
      const values = times.map((item) => Number(item.tiempo_minutos));
      setTimes(values);
      const average = values.length ? values.reduce((total, value) => total + value, 0) / values.length : dashboard.tiempo_promedio;
      setSummary(dashboard.metricas);
      setSnapshots([
        { label: 'Tiempo promedio', value: `${average.toFixed(2)} min`, description: 'Promedio de atención registrado' },
        { label: 'Registros', value: `${values.length}`, description: 'Tiempos almacenados en Supabase' },
        { label: 'Máximo', value: `${(Math.max(...values, 0)).toFixed(2)} min`, description: 'Mayor tiempo registrado' },
        { label: 'Procesados', value: `${dashboard.porcentaje_procesados}%`, description: 'Comentarios procesados' },
      ]);
    }).catch(() => { setSummary([]); setSnapshots([]); });
  }, []);
  return { summary, snapshots, times, averages: { attention: summary[0]?.value ?? 0, quality: summary[2]?.value ?? 0, retention: summary[3]?.value ?? 0 } };
}
