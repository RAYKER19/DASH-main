import { AppLayout } from '../layouts/AppLayout';
import { useComentarios } from '../hooks/useComentarios';
import { CommentFilters } from '../components/comentarios/CommentFilters';
import type { ViewKey } from '../types';
import { ExportMenu, exportRows, type ExportFormat } from '../utils/exports';
import { createComment } from '../services/backend';
import { useState } from 'react';

interface PageProps {
  activeView?: ViewKey;
  onSelectView?: (view: ViewKey) => void;
}

export default function ComentariosPage({ activeView = 'comentarios', onSelectView = () => undefined }: PageProps) {
  const { comentarios, filters, setFilters, counts } = useComentarios();
  const [newComment, setNewComment] = useState({ contenido: '', canal: 'web' });
  const [commentMessage, setCommentMessage] = useState('');
  const exportar = (format: ExportFormat) => exportRows([['Cliente', 'Categoría', 'Sentimiento', 'Comentario'], ...comentarios.map((item) => [item.client, item.category, item.sentiment, item.text])], format, 'comentarios');
  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <header className="header-bar">
        <div>
          <div className="eyebrow">Atención</div>
          <h1>Comentarios</h1>
        </div>
        <div className="header-actions">
          <button type="button" className="chip" onClick={() => setFilters((current) => ({ ...current, search: '' }))}>Limpiar filtros</button>
          <ExportMenu onExport={exportar} />
        </div>
      </header>

      <div className="stats-grid">
        <article className="stat-card">
          <div className="card-icon positive">P</div>
          <div className="card-text">
            <div className="card-label">Positivos</div>
            <div className="card-value">{counts.total ? `${Math.round(counts.positivos / counts.total * 100)}%` : '0%'}</div>
            <div className="card-detail-row"><span className="card-detail">De los comentarios cargados</span></div>
          </div>
        </article>

        <article className="stat-card">
          <div className="card-icon neutral">N</div>
          <div className="card-text">
            <div className="card-label">Neutral</div>
            <div className="card-value">{counts.total ? `${Math.round(counts.neutrales / counts.total * 100)}%` : '0%'}</div>
            <div className="card-detail-row"><span className="card-detail">en revisión</span></div>
          </div>
        </article>

        <article className="stat-card">
          <div className="card-icon warning">R</div>
          <div className="card-text">
            <div className="card-label">Negativos</div>
            <div className="card-value">{counts.total ? `${Math.round(counts.negativos / counts.total * 100)}%` : '0%'}</div>
            <div className="card-detail-row"><span className="card-detail">{counts.negativos} casos</span></div>
          </div>
        </article>
      </div>

      <div className="content-stack">
        <form className="panel config-form" onSubmit={(event) => { event.preventDefault(); if (!newComment.contenido) return; void createComment(newComment).then(() => { setCommentMessage('Comentario guardado y procesado por NLTK.'); setNewComment({ contenido: '', canal: 'web' }); }).catch(() => setCommentMessage('No se pudo guardar el comentario.')); }}>
          <textarea placeholder="Nuevo comentario" value={newComment.contenido} onChange={(event) => setNewComment({ ...newComment, contenido: event.target.value })} rows={2} />
          <select value={newComment.canal} onChange={(event) => setNewComment({ ...newComment, canal: event.target.value })}><option value="web">Web</option><option value="email">Email</option><option value="chat">Chat</option><option value="whatsapp">WhatsApp</option></select>
          <button type="submit" className="mini-btn">Guardar comentario</button>{commentMessage && <span className="card-detail">{commentMessage}</span>}
        </form>
        <CommentFilters {...filters} onSearchChange={(search) => setFilters((current) => ({ ...current, search }))} onSentimentChange={(sentiment) => setFilters((current) => ({ ...current, sentiment }))} onCategoryChange={(category) => setFilters((current) => ({ ...current, category }))} />
        <section className="panel table-panel">
          <div className="panel-header">
            <h3>HISTORIAL DE COMENTARIOS</h3>
            <button type="button" className="mini-btn" onClick={() => setFilters((current) => ({ ...current, search: '' }))}>Limpiar</button>
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
                  <span>Estado: {comment.status}</span>
                  <span>Fecha: {comment.date ? new Date(comment.date).toLocaleString('es-ES') : 'Sin fecha'}</span>
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
