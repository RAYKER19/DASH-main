import { AppLayout } from '../layouts/AppLayout';
import { createCategory, createUser, fetchAudit, fetchCategories, fetchUsers, updateCategory, updateUser } from '../services/backend';
import { useEffect, useState } from 'react';
import type { ViewKey } from '../types';

interface PageProps {
  activeView?: ViewKey;
  onSelectView?: (view: ViewKey) => void;
}

export default function ConfiguracionPage({ activeView = 'configuracion', onSelectView = () => undefined }: PageProps) {
  const [users, setUsers] = useState<Array<{ id: number; nombre: string; rol: string; activo: boolean }>>([]);
  const [categories, setCategories] = useState<Array<{ id: number; nombre: string; activo: boolean }>>([]);
  const [audit, setAudit] = useState<Array<{ id: number; accion: string; tabla?: string; created_at: string }>>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newUser, setNewUser] = useState({ nombre: '', email: '', password_hash: '', rol: 'USUARIO' });
  const load = () => Promise.all([fetchUsers(), fetchCategories(), fetchAudit()]).then(([loadedUsers, loadedCategories, loadedAudit]) => { setUsers(loadedUsers); setCategories(loadedCategories); setAudit(loadedAudit); }).catch(() => { setUsers([]); setCategories([]); setAudit([]); });
  useEffect(() => {
    void load();
  }, []);
  const roles = (role: string) => users.filter((user) => user.rol === role).length;
  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <header className="header-bar">
        <div>
          <div className="eyebrow">Configuración</div>
          <h1>Configuración</h1>
        </div>
      </header>

      <div className="content-stack">
        <section className="panel">
          <div className="panel-header">
            <h3>USUARIOS</h3>
            <button type="button" className="mini-btn" onClick={() => void load()}>Actualizar</button>
          </div>
          <form className="config-form" onSubmit={(event) => { event.preventDefault(); if (!newUser.nombre || !newUser.email || !newUser.password_hash) return; void createUser(newUser).then(() => { setNewUser({ nombre: '', email: '', password_hash: '', rol: 'USUARIO' }); return load(); }); }}>
            <input placeholder="Nombre" value={newUser.nombre} onChange={(event) => setNewUser({ ...newUser, nombre: event.target.value })} />
            <input type="email" placeholder="Email" value={newUser.email} onChange={(event) => setNewUser({ ...newUser, email: event.target.value })} />
            <input type="password" placeholder="Contraseña" value={newUser.password_hash} onChange={(event) => setNewUser({ ...newUser, password_hash: event.target.value })} />
            <select value={newUser.rol} onChange={(event) => setNewUser({ ...newUser, rol: event.target.value })}><option>ADMIN</option><option>ANALISTA</option><option>SUPERVISOR</option><option>USUARIO</option></select>
            <button type="submit" className="mini-btn">Agregar usuario</button>
          </form>
          <div className="category-list">{users.map((user) => <div key={user.id} className="category-row"><span>{user.nombre} · {user.rol}</span><button type="button" className="mini-btn" onClick={() => void updateUser(user.id, { activo: !user.activo }).then(load)}>{user.activo ? 'Desactivar' : 'Activar'}</button></div>)}</div>

          <div className="summary-cards">
            <div className="summary-card">
              <span>Administradores</span>
              <strong>{roles('ADMIN')}</strong>
            </div>
            <div className="summary-card">
              <span>Operadores</span>
              <strong>{users.filter((user) => user.rol !== 'ADMIN').length}</strong>
            </div>
            <div className="summary-card">
              <span>Auditores</span>
              <strong>{users.filter((user) => user.activo).length}</strong>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>CATEGORÍAS</h3>
          </div>
          <form className="config-form" onSubmit={(event) => { event.preventDefault(); if (!newCategory.trim()) return; void createCategory({ nombre: newCategory.trim() }).then(() => { setNewCategory(''); return load(); }); }}><input placeholder="Nueva categoría" value={newCategory} onChange={(event) => setNewCategory(event.target.value)} /><button type="submit" className="mini-btn">Agregar categoría</button></form>
          <div className="category-list">
            {categories.map((category) => (
              <div key={category.nombre} className="category-row">
                <span>{category.nombre}</span>
                <button type="button" className="mini-btn" onClick={() => void updateCategory(category.id, { activo: !category.activo }).then(load)}>{category.activo ? 'Desactivar' : 'Activar'}</button>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header"><h3>AUDITORÍA</h3><button type="button" className="mini-btn" onClick={() => void load()}>Actualizar</button></div>
          <div className="category-list">{audit.map((entry) => <div key={entry.id} className="category-row"><span>{entry.accion} {entry.tabla ? `· ${entry.tabla}` : ''}</span><strong>{new Date(entry.created_at).toLocaleString('es-ES')}</strong></div>)}</div>
        </section>
      </div>
    </AppLayout>
  );
}
