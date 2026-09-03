import { useEffect, useState } from 'react';
import { fetchDashboardSummary } from '../services/backend';
import type { CategoryMetric, WordCloudItem } from '../types';

export function useNlpAnalysis() {
  const [words, setWords] = useState<WordCloudItem[]>([]);
  const [categories, setCategories] = useState<CategoryMetric[]>([]);
  useEffect(() => { fetchDashboardSummary().then((data) => { setWords(data.palabras); setCategories(data.categorias); }).catch(() => { setWords([]); setCategories([]); }); }, []);
  return { words, categories, dominant: [...words].sort((a, b) => b.size - a.size)[0], totalTopics: categories.reduce((sum, item) => sum + item.value, 0) };
}
