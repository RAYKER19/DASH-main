interface TrendChartProps {
  values: number[];
  onDetail?: () => void;
}

export function TrendChart({ values = [], onDetail }: TrendChartProps) {
  const maximum = Math.max(...values, 1);
  const bars = values.map((value) => Math.max(4, value / maximum * 100));

  return (
    <div className="panel large-panel">
      <div className="panel-header">
        <h3>TIEMPOS DE ATENCIÓN</h3>
        <button type="button" className="mini-btn" onClick={onDetail}>Ver detalle</button>
      </div>

      <div className="chart-box">
        <div className="grid-lines" />
        <div className="bars">
          {bars.map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
