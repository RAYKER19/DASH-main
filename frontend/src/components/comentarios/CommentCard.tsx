import type { CommentRecord } from '../../types';

interface CommentCardProps {
  comment: CommentRecord;
}

export function CommentCard({ comment }: CommentCardProps) {
  return (
    <article className="comment-card">
      <div className="comment-header">
        <div>
          <strong>{comment.client}</strong>
          <span>{comment.category}</span>
        </div>
        <span className={`sentiment-pill ${comment.sentiment.toLowerCase()}`}>{comment.sentiment}</span>
      </div>
      <p>{comment.text}</p>
      <div className="comment-meta">
        <span>Tiempo de respuesta: {comment.responseTime}</span>
      </div>
    </article>
  );
}
