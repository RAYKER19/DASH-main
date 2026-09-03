import { useMemo } from 'react';
import { categoryMetrics, wordCloud } from '../services/api';

export function useNlpAnalysis() {
  return useMemo(() => ({
    words: wordCloud,
    categories: categoryMetrics,
    dominant: [...wordCloud].sort((a, b) => b.size - a.size)[0],
    totalTopics: categoryMetrics.reduce((sum, item) => sum + item.value, 0),
  }), []);
}
