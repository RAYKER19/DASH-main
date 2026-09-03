export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatMinutes(value: number): string {
  return `${value.toFixed(1)} min`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('es-ES').format(value);
}
