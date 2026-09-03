import { AppLayout } from '../layouts/AppLayout';
import { reportRows, reportTools } from '../services/api';
import type { ViewKey } from '../types';

interface PageProps {
  activeView?: ViewKey;
  onSelectView?: (view: ViewKey) => void;
}

export default function ReportesPage({ activeView = 'reportes', onSelectView = () => undefined }: PageProps) {
  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <header className="header-bar">
        <div>
          <div className="eyebrow">Executive</div>
          <h1>Reportes</h1>
        </div>
        <div className="header-actions">
          <button type="button" className="chip">Descargar</button>
          <button type="button" className="chip highlight">Nuevo informe</button>
        </div>
      </header>

      <div className="stats-grid">
        {reportTools.map((tool) => (
          <article key={tool.title} className={`tool-card tool-${tool.tone}`}>
            <div className="tool-title">{tool.title}</div>
            <p>{tool.description}</p>
          </article>
        ))}
      </div>

      <div className="content-stack">
        <section className="panel">
          <div className="panel-header">
            <h3>RESUMEN EJECUTIVO</h3>
          </div>

          <div className="report-list">
            {reportRows.map((row) => (
              <div key={row.name} className="report-row">
                <span>{row.name}</span>
                <strong>{row.value}</strong>
                <em>{row.change}</em>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
