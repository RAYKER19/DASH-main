import { useEffect, useMemo, useState } from 'react';
import { fetchComments } from '../services/backend';
import type { CommentRecord } from '../types';

export interface ComentarioFilters {
  sentiment: 'all' | CommentRecord['sentiment'];
  category: 'all' | CommentRecord['category'];
  search: string;
}

export function useComentarios() {
  const [records, setRecords] = useState<CommentRecord[]>([]);
  const [filters, setFilters] = useState<ComentarioFilters>({
    sentiment: 'all',
    category: 'all',
    search: '',
  });

  const reload = () => {
    let active = true;
    fetchComments().then((data) => { if (active) setRecords(data); }).catch(() => { if (active) setRecords([]); });
    return () => { active = false; };
  };

  useEffect(() => reload(), []);

  const filteredComentarios = useMemo(() => {
    const term = filters.search.trim().toLowerCase();

    return records.filter((comment) => {
      const matchesSentiment =
        filters.sentiment === 'all' || comment.sentiment === filters.sentiment;
      const matchesCategory =
        filters.category === 'all' || comment.category === filters.category;
      const matchesSearch =
        term.length === 0 ||
        comment.client.toLowerCase().includes(term) ||
        comment.text.toLowerCase().includes(term) ||
        comment.category.toLowerCase().includes(term);

      return matchesSentiment && matchesCategory && matchesSearch;
    });
  }, [filters, records]);

  return {
    comentarios: filteredComentarios,
    filters,
    setFilters,
    reload,
    counts: {
      total: records.length,
      positivos: records.filter((item) => item.sentiment === 'Positivo').length,
      neutrales: records.filter((item) => item.sentiment === 'Neutral').length,
      negativos: records.filter((item) => item.sentiment === 'Negativo').length,
    },
  };
}
