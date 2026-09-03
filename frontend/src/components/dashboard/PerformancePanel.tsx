import type { MetricBar } from '../../types';

interface PerformancePanelProps {
  metrics: MetricBar[];
}

export function PerformancePanel({ metrics }: PerformancePanelProps) {
  return (
    <div className="panel metrics-panel">
      <div className="panel-header">
        <h3>MÉTRICAS CLAVE</h3>
      </div>

      <div className="bars-stack">
        {metrics.map((metric) => (
          <div key={metric.label} className="bar-track">
            <span>{metric.label}</span>
            <div className="track">
              <i style={{ width: `${metric.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
