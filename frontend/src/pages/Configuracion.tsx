import { AppLayout } from '../layouts/AppLayout';
import type { ViewKey } from '../types';

interface PageProps {
  activeView?: ViewKey;
  onSelectView?: (view: ViewKey) => void;
}

export default function ConfiguracionPage({ activeView = 'configuracion', onSelectView = () => undefined }: PageProps) {
  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <header className="header-bar">
        <div>
          <div className="eyebrow">Configuración</div>
          <h1>Configuración</h1>
        </div>
      </header>

      <div className="content-stack">
        <section className="panel">
          <div className="panel-header">
            <h3>USUARIOS</h3>
          </div>

          <div className="summary-cards">
            <div className="summary-card">
              <span>Administradores</span>
              <strong>4</strong>
            </div>
            <div className="summary-card">
              <span>Operadores</span>
              <strong>12</strong>
            </div>
            <div className="summary-card">
              <span>Auditores</span>
              <strong>3</strong>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>CATEGORÍAS</h3>
          </div>
          <div className="category-list">
            <div className="category-row">
              <span>Atención al cliente</span>
              <strong>Activo</strong>
            </div>
            <div className="category-row">
              <span>Soporte técnico</span>
              <strong>Activo</strong>
            </div>
            <div className="category-row">
              <span>Ventas</span>
              <strong>Actualizado</strong>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
