import { useEffect, useMemo, useState } from 'react';
import { clientes } from '../services/api';
import { fetchClients } from '../services/backend';
import type { ClientRecord } from '../types';

export function useClientes() {
  const [records, setRecords] = useState<ClientRecord[]>(clientes);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'Activo' | 'Pendiente' | 'Atención'>('all');

  useEffect(() => {
    let active = true;
    fetchClients().then((data) => { if (active && data.length > 0) setRecords(data); }).catch(() => undefined);
    return () => { active = false; };
  }, []);

  const filteredClientes = useMemo(() => {
    const term = query.trim().toLowerCase();

    return records.filter((client) => {
      const matchesStatus = status === 'all' || client.status === status;
      const matchesQuery =
        term.length === 0 ||
        client.name.toLowerCase().includes(term) ||
        client.company.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term);

      return matchesStatus && matchesQuery;
    });
  }, [query, status, records]);

  return {
    clientes: filteredClientes,
    query,
    setQuery,
    status,
    setStatus,
  };
}
