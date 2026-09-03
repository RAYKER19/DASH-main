import { SearchInput } from '../ui/SearchInput';

export function HeaderPanel() {
  return (
    <div className="header-panel">
      <div>
        <div className="eyebrow">Panel principal</div>
        <h1>Dashboard estratégico</h1>
      </div>
      <div className="header-actions">
        <SearchInput placeholder="Buscar cliente o comentario" />
        <button type="button" className="chip">Últimos 30 días</button>
        <button type="button" className="chip highlight">Exportar</button>
      </div>
    </div>
  );
}
