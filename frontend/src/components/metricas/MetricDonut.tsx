interface MetricDonutProps {
  value: number;
  label: string;
}

export function MetricDonut({ value, label }: MetricDonutProps) {
  const style = {
    background: `conic-gradient(#1f7a4d 0 ${value}%, #e9f2ee ${value}% 100%)`,
  } as const;

  return (
    <div className="donut-wrap">
      <div className="donut-ring" style={style}>
        <div className="donut-core">
          <strong>{value}%</strong>
        </div>
      </div>
      <span>{label}</span>
    </div>
  );
}
