import { useEffect, useMemo, useState } from 'react';
import { fetchClients } from '../services/backend';
import type { ClientRecord } from '../types';

export function useClientes() {
  const [records, setRecords] = useState<ClientRecord[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'Activo' | 'Pendiente' | 'Atención'>('all');

  useEffect(() => {
    let active = true;
    fetchClients().then((data) => { if (active) setRecords(data); }).catch(() => { if (active) setRecords([]); });
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
