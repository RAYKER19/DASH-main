import { useMemo } from 'react';
import { metricBars, metricSnapshots } from '../services/api';

export function useMetrics() {
  return useMemo(() => ({
    summary: metricBars,
    snapshots: metricSnapshots,
    averages: {
      attention: metricBars[0]?.value ?? 0,
      quality: metricBars[2]?.value ?? 0,
      retention: metricBars[3]?.value ?? 0,
    },
  }), []);
}
