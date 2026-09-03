import type { KpiCard } from '../../types';

interface OverviewCardsProps {
  cards: KpiCard[];
}

export function OverviewCards({ cards }: OverviewCardsProps) {
  return (
    <section className="stats-grid">
      {cards.map((card) => (
        <article key={card.label} className="stat-card">
          <div className={`card-icon ${card.tone}`}>
            {card.label.slice(0, 1)}
          </div>
          <div className="card-text">
            <div className="card-label">{card.label}</div>
            <div className="card-value">{card.value}</div>
            <div className="card-detail-row">
              <span className="card-detail">{card.detail}</span>
              <span className={`trend-tag ${card.tone}`}>{card.trend}</span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
