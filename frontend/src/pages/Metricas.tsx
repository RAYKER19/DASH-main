import { AppLayout } from '../layouts/AppLayout';
import { metricSnapshots } from '../services/api';
import type { ViewKey } from '../types';

interface PageProps {
  activeView?: ViewKey;
  onSelectView?: (view: ViewKey) => void;
}

export default function MetricasPage({ activeView = 'metricas', onSelectView = () => undefined }: PageProps) {
  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <header className="header-bar">
        <div>
          <div className="eyebrow">Scientific data</div>
          <h1>Métricas</h1>
        </div>
      </header>

      <div className="stats-grid metric-grid">
        {metricSnapshots.map((metric) => (
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
