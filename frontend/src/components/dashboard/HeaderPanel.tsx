interface HeaderPanelProps {
  onRefresh: () => void;
}

export function HeaderPanel({ onRefresh }: HeaderPanelProps) {
  return (
    <div className="header-panel">
      <div>
        <div className="eyebrow">Panel principal</div>
        <h1>Dashboard estratégico</h1>
      </div>
      <div className="header-actions">
        <button type="button" className="chip" onClick={onRefresh}>Actualizar</button>
      </div>
    </div>
  );
}
