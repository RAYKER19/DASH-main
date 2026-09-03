import type { CommentRecord } from '../../types';

interface CommentSummaryProps {
  comments: CommentRecord[];
}

export function CommentSummary({ comments }: CommentSummaryProps) {
  const total = comments.length;
  const positivos = comments.filter((comment) => comment.sentiment === 'Positivo').length;
  const negativos = comments.filter((comment) => comment.sentiment === 'Negativo').length;

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <span>Total</span>
        <strong>{total}</strong>
      </div>
      <div className="summary-card">
        <span>Positivos</span>
        <strong>{positivos}</strong>
      </div>
      <div className="summary-card">
        <span>Negativos</span>
        <strong>{negativos}</strong>
      </div>
    </div>
  );
}
