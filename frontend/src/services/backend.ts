import type { ActivityItem, CategoryMetric, ClientRecord, CommentRecord, MetricBar, WordCloudItem } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options?.headers ?? {}) },
  });
  if (!response.ok) throw new Error(`API ${response.status}`);
  return response.json() as Promise<T>;
}

type ApiClient = { id: number; nombre: string; email?: string; empresa?: string; activo: boolean };
type ApiComment = { id: number; cliente_id?: number; contenido: string; canal: string; categoria?: string; procesado: boolean };

const categoryToUi = (category?: string): CommentRecord['category'] => {
  const values: Record<string, CommentRecord['category']> = {
    SOPORTE: 'Soporte', VENTAS: 'Ventas', RECLAMO: 'Reclamo', FELICITACION: 'Felicitación', CONSULTA: 'Consulta',
  };
  return values[category ?? ''] ?? 'Consulta';
};

export async function fetchClients(): Promise<ClientRecord[]> {
  const clients = await request<ApiClient[]>('/clientes/');
  return clients.map((client) => ({
    id: client.id, name: client.nombre, company: client.empresa ?? 'Sin empresa', email: client.email ?? '',
    status: client.activo ? 'Activo' : 'Pendiente', satisfaction: 0, segment: 'General', owner: 'Sin asignar',
    lastInteraction: 'Sin actividad', risk: 'Bajo', tenure: 'Nuevo',
  }));
}

export async function fetchComments(): Promise<CommentRecord[]> {
  const comments = await request<ApiComment[]>('/comentarios/');
  return comments.map((comment) => ({
    id: comment.id, client: comment.cliente_id ? `Cliente #${comment.cliente_id}` : 'Sin cliente',
    sentiment: comment.categoria === 'RECLAMO' ? 'Negativo' : comment.categoria === 'FELICITACION' ? 'Positivo' : 'Neutral',
    category: categoryToUi(comment.categoria), text: comment.contenido, responseTime: 'Pendiente', rating: 0,
    source: comment.canal, priority: comment.categoria === 'RECLAMO' ? 'Alta' : 'Media',
  }));
}

export function analyzeText(texto: string) {
  return request('/nltk/analizar', { method: 'POST', body: JSON.stringify({ texto }) });
}

export function calculateStatistics(valores: number[]) {
  return request('/scipy/estadisticas', { method: 'POST', body: JSON.stringify({ valores }) });
}

export interface DashboardSummary {
  clientes: number;
  comentarios: number;
  porcentaje_procesados: number;
  tiempo_promedio: number;
  categorias: CategoryMetric[];
  tendencia_tiempos: number[];
  palabras: WordCloudItem[];
  actividad: ActivityItem[];
  metricas: MetricBar[];
}

export function fetchDashboardSummary() {
  return request<DashboardSummary>('/metricas/resumen');
}
