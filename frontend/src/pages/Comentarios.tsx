import { AppLayout } from '../layouts/AppLayout';
import { useComentarios } from '../hooks/useComentarios';
import type { ViewKey } from '../types';

interface PageProps {
  activeView?: ViewKey;
  onSelectView?: (view: ViewKey) => void;
}

export default function ComentariosPage({ activeView = 'comentarios', onSelectView = () => undefined }: PageProps) {
  const { comentarios } = useComentarios();
  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <header className="header-bar">
        <div>
          <div className="eyebrow">Atención</div>
          <h1>Comentarios</h1>
        </div>
        <div className="header-actions">
          <button type="button" className="chip">Filtrar</button>
          <button type="button" className="chip highlight">Exportar</button>
        </div>
      </header>

      <div className="stats-grid">
        <article className="stat-card">
          <div className="card-icon positive">P</div>
          <div className="card-text">
            <div className="card-label">Positivos</div>
            <div className="card-value">64%</div>
            <div className="card-detail-row"><span className="card-detail">+7.8 pts</span></div>
          </div>
        </article>

        <article className="stat-card">
          <div className="card-icon neutral">N</div>
          <div className="card-text">
            <div className="card-label">Neutral</div>
            <div className="card-value">22%</div>
            <div className="card-detail-row"><span className="card-detail">en revisión</span></div>
          </div>
        </article>

        <article className="stat-card">
          <div className="card-icon warning">R</div>
          <div className="card-text">
            <div className="card-label">Negativos</div>
            <div className="card-value">14%</div>
            <div className="card-detail-row"><span className="card-detail">3 casos críticos</span></div>
          </div>
        </article>
      </div>

      <div className="content-stack">
        <section className="panel table-panel">
          <div className="panel-header">
            <h3>HISTORIAL DE COMENTARIOS</h3>
            <button type="button" className="mini-btn">Filtrar</button>
          </div>

          <div className="comment-list">
            {comentarios.map((comment) => (
              <article key={comment.id} className="comment-card">
                <div className="comment-header">
                  <div>
                    <strong>{comment.client}</strong>
                    <span>{comment.category}</span>
                  </div>
                  <div className="comment-actions">
                    <span className={`sentiment-pill ${comment.sentiment.toLowerCase()}`}>{comment.sentiment}</span>
                    <span className="rating-pill">★ {comment.rating}/5</span>
                  </div>
                </div>
                <p>{comment.text}</p>
                <div className="comment-meta">
                  <span>Fuente: {comment.source}</span>
                  <span>Tiempo de respuesta: {comment.responseTime}</span>
                  <span>Prioridad: {comment.priority}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
