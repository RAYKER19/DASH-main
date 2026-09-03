import { AppLayout } from '../layouts/AppLayout';
import { useMetrics } from '../hooks/useMetrics';
import type { ViewKey } from '../types';
import { ExportMenu, exportRows, type ExportFormat } from '../utils/exports';

interface PageProps {
  activeView?: ViewKey;
  onSelectView?: (view: ViewKey) => void;
}

export default function MetricasPage({ activeView = 'metricas', onSelectView = () => undefined }: PageProps) {
  const { snapshots, summary, times } = useMetrics();
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
      <section className="panel analytics-panel">
        <div className="panel-header"><div><h3>ANÁLISIS SCIPY</h3><p className="panel-subtitle">Indicadores calculados con los tiempos registrados en Supabase</p></div></div>
        <div className="scientific-chart"><div className="scientific-bars">{times.map((value, index) => <div className="scientific-bar" key={`${value}-${index}`} title={`${value} minutos`} style={{ height: `${Math.max(5, value / Math.max(...times, 1) * 100)}%` }}><span>{value}</span></div>)}</div></div>
        <div className="bars-stack metric-bars">{summary.map((metric) => <div className="bar-track" key={metric.label}><span>{metric.label}</span><div className="track"><i style={{ width: `${metric.value}%` }} /></div><strong>{metric.value}%</strong></div>)}</div>
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
