import { AppLayout } from '../layouts/AppLayout';
import { useMetrics } from '../hooks/useMetrics';
import { calculateStatistics, createAttentionTime, interpolate } from '../services/backend';
import { useState } from 'react';
import type { ViewKey } from '../types';
import { ExportMenu, exportRows, type ExportFormat } from '../utils/exports';

interface PageProps {
  activeView?: ViewKey;
  onSelectView?: (view: ViewKey) => void;
}

export default function MetricasPage({ activeView = 'metricas', onSelectView = () => undefined }: PageProps) {
  const { snapshots } = useMetrics();
  const [values, setValues] = useState('');
  const [result, setResult] = useState('');
  const [points, setPoints] = useState('');
  const [interpolated, setInterpolated] = useState('');
  const [attentionTime, setAttentionTime] = useState('');
  const exportar = (format: ExportFormat) => exportRows([['Métrica', 'Valor', 'Descripción'], ...snapshots.map((item) => [item.label, item.value, item.description])], format, 'metricas');
  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <header className="header-bar">
        <div>
          <div className="eyebrow">Scientific data</div>
          <h1>Métricas</h1>
        </div>
      </header>
      <div className="dashboard-export"><ExportMenu onExport={exportar} /></div>
      <section className="panel scientific-tools">
        <div className="panel-header"><h3>HERRAMIENTAS SCIPY</h3></div>
        <div className="config-form">
          <input value={attentionTime} onChange={(event) => setAttentionTime(event.target.value)} placeholder="Nuevo tiempo en minutos" />
          <button type="button" className="mini-btn" onClick={() => void createAttentionTime({ tiempo_minutos: Number(attentionTime) }).then(() => setAttentionTime(''))}>Guardar tiempo</button>
          <input value={values} onChange={(event) => setValues(event.target.value)} placeholder="Tiempos: 12,15,18,20" />
          <button type="button" className="mini-btn" onClick={() => void calculateStatistics(values.split(',').map(Number).filter(Number.isFinite)).then((data) => setResult(JSON.stringify(data))).catch(() => setResult('Introduce valores numéricos válidos'))}>Calcular estadísticas</button>
          <input value={points} onChange={(event) => setPoints(event.target.value)} placeholder="Interpolación x,y,x nuevo: 0:10;1:20;0.5" />
          <button type="button" className="mini-btn" onClick={() => { const [first, second, target] = points.split(';').map((part) => part.split(',').map(Number)); if (!first || !second || !target) return; void interpolate(first, second, target).then((data) => setInterpolated(JSON.stringify(data))).catch(() => setInterpolated('Puntos inválidos')); }}>Interpolar</button>
        </div>
        {result && <pre className="result-box">{result}</pre>}
        {interpolated && <pre className="result-box">{interpolated}</pre>}
      </section>

      <div className="stats-grid metric-grid">
        {snapshots.map((metric) => (
          <article key={metric.label} className="stat-card metric-card">
            <div className="card-label">{metric.label}</div>
            <div className="card-value">{metric.value}</div>
            <span className="card-detail">{metric.description}</span>
          </article>
        ))}
      </div>
    </AppLayout>
  );
}
