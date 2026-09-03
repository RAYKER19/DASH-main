import { AppLayout } from '../layouts/AppLayout';
import { useClientes } from '../hooks/useClientes';
import type { ViewKey } from '../types';

interface PageProps {
  activeView?: ViewKey;
  onSelectView?: (view: ViewKey) => void;
}

export default function ClientesPage({ activeView = 'clientes', onSelectView = () => undefined }: PageProps) {
  const { clientes } = useClientes();
  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <header className="header-bar">
        <div>
          <div className="eyebrow">Gestión</div>
          <h1>Clientes</h1>
        </div>
        <div className="header-actions">
          <button type="button" className="chip">Filtrar</button>
          <button type="button" className="chip highlight">Nuevo cliente</button>
        </div>
      </header>

      <div className="stats-grid">
        <article className="stat-card">
          <div className="card-icon positive">C</div>
          <div className="card-text">
            <div className="card-label">Clientes activos</div>
            <div className="card-value">245</div>
            <div className="card-detail-row"><span className="card-detail">+18 este mes</span></div>
          </div>
        </article>

        <article className="stat-card">
          <div className="card-icon neutral">S</div>
          <div className="card-text">
            <div className="card-label">Satisfacción</div>
            <div className="card-value">89.6%</div>
            <div className="card-detail-row"><span className="card-detail">+4.2 pts</span></div>
          </div>
        </article>

        <article className="stat-card">
          <div className="card-icon warning">R</div>
          <div className="card-text">
            <div className="card-label">Riesgo alto</div>
            <div className="card-value">12</div>
            <div className="card-detail-row"><span className="card-detail">requieren revisión</span></div>
          </div>
        </article>
      </div>

      <div className="content-stack">
        <section className="panel table-panel">
          <div className="panel-header">
            <h3>LISTA DE CLIENTES</h3>
            <button type="button" className="mini-btn">Exportar</button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Empresa</th>
                <th>Segmento</th>
                <th>Responsable</th>
                <th>Estado</th>
                <th>Permanencia</th>
                <th>Satisfacción</th>
                <th>Riesgo</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((client) => (
                <tr key={client.id}>
                  <td>
                    <div className="client-name-cell">
                      <span>{client.name}</span>
                      {client.isNew && <span className="new-tag">Nuevo</span>}
                    </div>
                  </td>
                  <td>{client.company}</td>
                  <td>{client.segment}</td>
                  <td>{client.owner}</td>
                  <td><span className={`status-pill ${client.status.toLowerCase().replace(/\s+/g, '-')}`}>{client.status}</span></td>
                  <td>{client.tenure}</td>
                  <td>{client.satisfaction}%</td>
                  <td><span className={`risk-tag ${client.risk.toLowerCase()}`}>{client.risk}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </AppLayout>
  );
}
