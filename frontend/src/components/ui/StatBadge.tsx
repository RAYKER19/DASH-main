interface StatBadgeProps {
  label: string;
  value: string;
  tone?: 'positive' | 'neutral' | 'warning';
}

export function StatBadge({ label, value, tone = 'positive' }: StatBadgeProps) {
  return (
    <div className="stat-badge">
      <span className="badge-label">{label}</span>
      <strong className={`badge-value ${tone}`}>{value}</strong>
    </div>
  );
}
