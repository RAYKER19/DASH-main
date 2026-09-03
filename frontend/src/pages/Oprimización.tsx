import { AppLayout } from '../layouts/AppLayout';
import { fetchOptimizations } from '../services/backend';
import { useEffect, useState } from 'react';
import type { OptimizationScenario } from '../types';
import type { ViewKey } from '../types';

interface PageProps {
  activeView?: ViewKey;
  onSelectView?: (view: ViewKey) => void;
}

export default function OptimizacionPage({ activeView = 'optimizacion', onSelectView = () => undefined }: PageProps) {
	const [scenarios, setScenarios] = useState<OptimizationScenario[]>([]);
	useEffect(() => { fetchOptimizations().then((items) => setScenarios(items.map((item) => ({ name: item.nombre, description: item.descripcion ?? '', impact: item.resultado?.ahorro_porcentual ? `Ahorro ${item.resultado.ahorro_porcentual}%` : 'Sin impacto calculado', roi: item.resultado?.roi ? `${item.resultado.roi}x` : 'N/D', status: item.estado === 'disponible' ? 'Disponible' : item.estado === 'en_prueba' ? 'En prueba' : 'Pendiente' })))).catch(() => setScenarios([])); }, []);
  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <header className="header-bar">
        <div>
          <div className="eyebrow">Scientific data</div>
          <h1>Optimización</h1>
        </div>
        <div className="header-actions">
          <button type="button" className="chip">Exportar</button>
          <button type="button" className="chip highlight">Generar propuesta</button>
        </div>
      </header>

      <div className="stats-grid">
        {[
          { label: 'Escenarios', value: scenarios.length, detail: 'registrados', tone: 'positive' },
          { label: 'Disponibles', value: scenarios.filter((item) => item.status === 'Disponible').length, detail: 'para ejecutar', tone: 'neutral' },
        ].map((item) => (
          <article key={item.label} className="stat-card optimization-card">
            <div className={`card-icon ${item.tone}`}>{item.label.charAt(0)}</div>
            <div className="card-text">
              <div className="card-label">{item.label}</div>
              <div className="card-value">{item.value}</div>
              <div className="card-detail-row">
                <span className="card-detail">{item.detail}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="two-col-grid">
        <div className="panel panel-strong">
          <div className="panel-header">
            <h3>ESCENARIOS DE OPTIMIZACIÓN</h3>
            <button type="button" className="mini-btn">Crear escenario</button>
          </div>

          <div className="scenario-grid">
            {scenarios.map((scenario) => (
              <article key={scenario.name} className="scenario-card premium-scenario">
                <div className="scenario-head">
                  <strong>{scenario.name}</strong>
                  <span className={`status-pill ${scenario.status.toLowerCase().replace(/\s+/g, '-')}`}>{scenario.status}</span>
                </div>
                <p>{scenario.description}</p>
                <div className="scenario-meta">
                  <span>Impacto: {scenario.impact}</span>
                  <span>ROI: {scenario.roi}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="panel panel-strong">
          <div className="panel-header">
            <h3>IMPACTO ESTIMADO</h3>
          </div>

          <div className="bars-stack">
            <div className="bar-track">
              <span>Colas</span>
              <div className="track"><i style={{ width: '82%' }} /></div>
            </div>
            <div className="bar-track">
              <span>Atención</span>
              <div className="track"><i style={{ width: '76%' }} /></div>
            </div>
            <div className="bar-track">
              <span>Ventas</span>
              <div className="track"><i style={{ width: '88%' }} /></div>
            </div>
            <div className="bar-track">
              <span>Retención</span>
              <div className="track"><i style={{ width: '70%' }} /></div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
