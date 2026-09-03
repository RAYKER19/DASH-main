import type { CommentRecord } from '../../types';

interface CommentSummaryProps {
  comments: CommentRecord[];
}

export function CommentSummary({ comments }: CommentSummaryProps) {
  return (
    <div className="summary-cards">
      <div className="summary-card">
        <span>Comentarios hoy</span>
        <strong>{comments.length * 24}</strong>
      </div>
      <div className="summary-card">
        <span>Sentimiento positivo</span>
        <strong>68%</strong>
      </div>
      <div className="summary-card">
        <span>Reclamos</span>
        <strong>12%</strong>
      </div>
    </div>
  );
}
