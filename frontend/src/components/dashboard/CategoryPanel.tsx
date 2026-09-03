import type { CategoryMetric } from '../../types';

interface CategoryPanelProps {
  items: CategoryMetric[];
}

export function CategoryPanel({ items }: CategoryPanelProps) {
  return (
    <div className="panel small-panel">
      <div className="panel-header">
        <h3>CATEGORÍAS NLP</h3>
        <button type="button" className="mini-btn">Actualizar</button>
      </div>

      <div className="category-list">
        {items.map((item) => (
          <div key={item.name} className="category-row">
            <div className="category-name-wrap">
              <span className="category-dot" style={{ background: item.color }} />
              <span>{item.name}</span>
            </div>
            <strong>{item.value}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
