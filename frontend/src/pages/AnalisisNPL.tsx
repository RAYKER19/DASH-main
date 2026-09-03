import { AppLayout } from '../layouts/AppLayout';
import { categoryMetrics, nlpInsights, wordCloud } from '../services/api';
import type { ViewKey } from '../types';

interface PageProps {
  activeView?: ViewKey;
  onSelectView?: (view: ViewKey) => void;
}

export default function AnalisisNLPPage({ activeView = 'analisisNLP', onSelectView = () => undefined }: PageProps) {
  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <header className="header-bar">
        <div>
          <div className="eyebrow">Inteligencia</div>
          <h1>Análisis NLP</h1>
        </div>
        <div className="header-actions">
          <button type="button" className="chip">Actualizar</button>
          <button type="button" className="chip highlight">Ejecutar análisis</button>
        </div>
      </header>

      <div className="stats-grid">
        <article className="stat-card">
          <div className="card-icon positive">C</div>
          <div className="card-text">
            <div className="card-label">Precisión</div>
            <div className="card-value">92.1%</div>
            <div className="card-detail-row"><span className="card-detail">+2.2 pts</span></div>
          </div>
        </article>

        <article className="stat-card">
          <div className="card-icon neutral">V</div>
          <div className="card-text">
            <div className="card-label">Volumen</div>
            <div className="card-value">1.2K</div>
            <div className="card-detail-row"><span className="card-detail">comentarios</span></div>
          </div>
        </article>

        <article className="stat-card">
          <div className="card-icon warning">T</div>
          <div className="card-text">
            <div className="card-label">Tendencia</div>
            <div className="card-value">+8.7%</div>
            <div className="card-detail-row"><span className="card-detail">semana</span></div>
          </div>
        </article>
      </div>

      <div className="two-col-grid">
        <section className="panel">
          <div className="panel-header">
            <h3>PALABRAS FRECUENTES</h3>
          </div>

          <div className="word-cloud compact">
            {wordCloud.map((item) => (
              <span
                key={item.word}
                style={{ fontSize: `${Math.min(0.9 + item.size * 0.32, 1.15)}rem` }}
              >
                {item.word}
              </span>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>CATEGORIZACIÓN</h3>
          </div>

          <div className="category-list">
            {categoryMetrics.map((item) => (
              <div key={item.name} className="category-row">
                <div className="category-name-wrap">
                  <span className="category-dot" style={{ background: item.color }} />
                  <span>{item.name}</span>
                </div>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-header">
          <h3>INSIGHTS POR TEMA</h3>
        </div>

        <div className="insight-grid">
          {nlpInsights.map((item) => (
            <article key={item.label} className="insight-card">
              <div className="insight-head">
                <strong>{item.label}</strong>
                <span className={`sentiment-pill ${item.sentiment.toLowerCase()}`}>{item.sentiment}</span>
              </div>
              <div className="insight-metric">
                <span>{item.volume}</span>
                <small>{item.trend}</small>
              </div>
              <div className="track small-track"><i style={{ width: `${item.confidence}%` }} /></div>
              <small>Confianza: {item.confidence}%</small>
            </article>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
