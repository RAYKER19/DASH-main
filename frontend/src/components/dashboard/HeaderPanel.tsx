import { SearchInput } from '../ui/SearchInput';

interface HeaderPanelProps {
  onRefresh: () => void;
  onExport: () => void;
}

export function HeaderPanel({ onRefresh, onExport }: HeaderPanelProps) {
  return (
    <div className="header-panel">
      <div>
        <div className="eyebrow">Panel principal</div>
        <h1>Dashboard estratégico</h1>
      </div>
      <div className="header-actions">
        <SearchInput placeholder="Buscar cliente o comentario" />
        <button type="button" className="chip" onClick={onRefresh}>Actualizar</button>
        <button type="button" className="chip highlight" onClick={onExport}>Exportar</button>
      </div>
    </div>
  );
}
