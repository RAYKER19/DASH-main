import type { CommentRecord } from '../../types';
import { CommentCard } from './CommentCard';

interface CommentListProps {
  comments: CommentRecord[];
}

export function CommentList({ comments }: CommentListProps) {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
