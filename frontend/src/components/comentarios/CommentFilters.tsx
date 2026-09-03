import type { CommentRecord } from '../../types';

interface CommentFiltersProps {
  search: string;
  sentiment: 'all' | CommentRecord['sentiment'];
  category: 'all' | CommentRecord['category'];
  onSearchChange: (value: string) => void;
  onSentimentChange: (value: 'all' | CommentRecord['sentiment']) => void;
  onCategoryChange: (value: 'all' | CommentRecord['category']) => void;
}

const sentimentOptions: Array<'all' | CommentRecord['sentiment']> = ['all', 'Positivo', 'Neutral', 'Negativo'];
const categoryOptions: Array<'all' | CommentRecord['category']> = ['all', 'Soporte', 'Ventas', 'Reclamo', 'Consulta', 'Felicitación'];

export function CommentFilters({
  search,
  sentiment,
  category,
  onSearchChange,
  onSentimentChange,
  onCategoryChange,
}: CommentFiltersProps) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h3>FILTROS</h3>
      </div>

      <div className="filter-row">
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar cliente o comentario"
          className="search-input-wrap"
        />

        <select value={sentiment} onChange={(event) => onSentimentChange(event.target.value as 'all' | CommentRecord['sentiment'])}>
          {sentimentOptions.map((option) => (
            <option key={option} value={option}>
              {option === 'all' ? 'Todos los sentimientos' : option}
            </option>
          ))}
        </select>

        <select value={category} onChange={(event) => onCategoryChange(event.target.value as 'all' | CommentRecord['category'])}>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option === 'all' ? 'Todas las categorías' : option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
