import type {
  CategoryMetric,
  ClientRecord,
  CommentRecord,
  MetricBar,
  MetricSnapshot,
  NlpInsight,
  OptimizationScenario,
  ReportRow,
  ReportTool,
  ViewKey,
  WordCloudItem,
} from '../types';

export const menuItems: Array<{ key: ViewKey; label: string; icon: string; accent: string }> = [
  { key: 'dashboard', label: 'Dashboard', icon: '▣', accent: '#92e0b3' },
  { key: 'clientes', label: 'Clientes', icon: '◍', accent: '#a9d4ff' },
  { key: 'comentarios', label: 'Atención', icon: '☰', accent: '#ffd899' },
  { key: 'analisisNLP', label: 'Inteligencia NLP', icon: '✦', accent: '#b7d4ff' },
  { key: 'metricas', label: 'Scientific Data', icon: '◔', accent: '#9edfc7' },
  { key: 'reportes', label: 'Reportes', icon: '▤', accent: '#ffb9b9' },
  { key: 'configuracion', label: 'Configuración', icon: '⚙', accent: '#f7c3a5' },
];

export const categoryMetrics: CategoryMetric[] = [
  { name: 'Soporte', value: 42, color: '#2db869' },
  { name: 'Ventas', value: 27, color: '#5dc1a8' },
  { name: 'Reclamos', value: 18, color: '#7b9cf8' },
  { name: 'Consultas', value: 13, color: '#f4b740' },
];

export const wordCloud: WordCloudItem[] = [
  { word: 'servicio', size: 1.5 },
  { word: 'atención', size: 1.3 },
  { word: 'rápido', size: 1.1 },
  { word: 'producto', size: 1 },
  { word: 'soporte', size: 1.4 },
  { word: 'respuesta', size: 1.25 },
  { word: 'calidad', size: 1.15 },
  { word: 'solución', size: 1.2 },
  { word: 'satisfacción', size: 1.05 },
  { word: 'ventas', size: 0.95 },
];

export const metricBars: MetricBar[] = [
  { label: 'Atención', value: 78, target: 100 },
  { label: 'NLP', value: 86, target: 100 },
  { label: 'Calidad', value: 92, target: 100 },
  { label: 'Retención', value: 81, target: 100 },
];

export const clientes: ClientRecord[] = [
  { id: 1, name: 'Ana Gómez', company: 'Apex Soluciones', email: 'ana@apex.com', status: 'Activo', satisfaction: 96, segment: 'Enterprise', owner: 'María López', lastInteraction: 'Hace 2h', risk: 'Bajo', isNew: true, tenure: '18 meses' },
  { id: 2, name: 'Mateo Ruiz', company: 'LogisCenter', email: 'mateo@logiscenter.com', status: 'Atención', satisfaction: 88, segment: 'Mid-market', owner: 'Carlos Díaz', lastInteraction: 'Hace 5h', risk: 'Medio', tenure: '11 meses' },
  { id: 3, name: 'Sofía Torres', company: 'Nexa Retail', email: 'sofia@nexa.com', status: 'Pendiente', satisfaction: 82, segment: 'Retail', owner: 'Lucía García', lastInteraction: 'Ayer', risk: 'Alto', isNew: true, tenure: '6 meses' },
  { id: 4, name: 'Diego Pérez', company: 'BlueWave', email: 'diego@bluewave.com', status: 'Activo', satisfaction: 91, segment: 'Technology', owner: 'Elena Ruiz', lastInteraction: 'Hace 4h', risk: 'Bajo', tenure: '32 meses' },
  { id: 5, name: 'Carmen Ríos', company: 'MediClinic', email: 'carmen@mediclinic.com', status: 'Activo', satisfaction: 94, segment: 'Health', owner: 'Javier Torres', lastInteraction: 'Hace 1h', risk: 'Bajo', isNew: true, tenure: '9 meses' },
  { id: 6, name: 'Iker Navarro', company: 'Northline', email: 'iker@northline.com', status: 'Atención', satisfaction: 79, segment: 'Logistics', owner: 'Paula Ray', lastInteraction: 'Hace 6h', risk: 'Medio', tenure: '22 meses' },
  { id: 7, name: 'Rosa Delgado', company: 'Arbor House', email: 'rosa@arborhouse.com', status: 'Pendiente', satisfaction: 74, segment: 'Real estate', owner: 'Pedro Costa', lastInteraction: 'Hace 1d', risk: 'Alto', tenure: '14 meses' },
  { id: 8, name: 'Tomás Vega', company: 'Zenith Labs', email: 'tomas@zenithlabs.com', status: 'Activo', satisfaction: 92, segment: 'R&D', owner: 'Alina Vega', lastInteraction: 'Hace 3h', risk: 'Bajo', isNew: true, tenure: '7 meses' },
];

export const comentarios: CommentRecord[] = [
  { id: 1, client: 'Ana Gómez', sentiment: 'Positivo', category: 'Felicitación', text: 'El servicio fue rápido, amable y muy claro en cada paso.', responseTime: '12 min', rating: 5, source: 'Email', priority: 'Baja' },
  { id: 2, client: 'Mateo Ruiz', sentiment: 'Neutral', category: 'Consulta', text: 'Necesito una actualización del proceso de soporte para mi equipo.', responseTime: '21 min', rating: 3, source: 'Chat', priority: 'Media' },
  { id: 3, client: 'Sofía Torres', sentiment: 'Negativo', category: 'Reclamo', text: 'El pedido llegó con retraso y la atención fue lenta.', responseTime: '34 min', rating: 2, source: 'WhatsApp', priority: 'Alta' },
  { id: 4, client: 'Diego Pérez', sentiment: 'Positivo', category: 'Ventas', text: 'Muy buena atención comercial y opciones claras de compra.', responseTime: '15 min', rating: 5, source: 'Call', priority: 'Baja' },
  { id: 5, client: 'Carmen Ríos', sentiment: 'Positivo', category: 'Soporte', text: 'El equipo solucionó mi incidencia en menos de 10 minutos.', responseTime: '10 min', rating: 5, source: 'Portal', priority: 'Media' },
  { id: 6, client: 'Iker Navarro', sentiment: 'Negativo', category: 'Reclamo', text: 'Necesitamos un seguimiento más cercano del caso.', responseTime: '28 min', rating: 2, source: 'Email', priority: 'Alta' },
];

export const metricSnapshots: MetricSnapshot[] = [
  { label: 'Tiempo promedio', value: '16.4 min', description: 'Promedio de resolución por canal' },
  { label: 'Desviación', value: '4.3 min', description: 'Variabilidad operativa por jornada' },
  { label: 'Máximo', value: '25.0 min', description: 'Peor caso registrados en 30 días' },
  { label: 'Percentil 75', value: '19.2 min', description: 'Tiempo del 75% de los casos' },
];

export const optimizationScenarios: OptimizationScenario[] = [
  { name: 'Rediseño de colas', description: 'Distribuye mejor las tareas entre atención y ventas.', impact: 'Ahorro estimado 12%', roi: '1.9x', status: 'Disponible' },
  { name: 'Automatización de consultas', description: 'Responde FAQ repetitivas con priorización de casos.', impact: 'Reduce tiempos 18%', roi: '2.3x', status: 'En prueba' },
  { name: 'Escalado por prioridad', description: 'Clasifica reclamos con riesgo de churn.', impact: 'Mejora SLA 9%', roi: '1.4x', status: 'Pendiente' },
];

export const reportRows: ReportRow[] = [
  { name: 'Atención al cliente', value: '86.8%', change: '+4.5%' },
  { name: 'NLP precisión', value: '92.1%', change: '+2.2%' },
  { name: 'Satisfacción', value: '89.6%', change: '+6.1%' },
  { name: 'Retención', value: '78.3%', change: '+3.8%' },
];

export const nlpInsights: NlpInsight[] = [
  { label: 'Servicio', volume: 94, sentiment: 'Positivo', trend: '+12%', confidence: 92 },
  { label: 'Atención', volume: 88, sentiment: 'Positivo', trend: '+9%', confidence: 89 },
  { label: 'Respuesta', volume: 76, sentiment: 'Neutral', trend: '+6%', confidence: 84 },
  { label: 'Soporte', volume: 68, sentiment: 'Positivo', trend: '+7%', confidence: 87 },
  { label: 'Reclamo', volume: 54, sentiment: 'Negativo', trend: '-4%', confidence: 81 },
  { label: 'Calidad', volume: 61, sentiment: 'Positivo', trend: '+10%', confidence: 90 },
];

export const reportTools: ReportTool[] = [
  { title: 'Exportación', description: 'CSV, PDF y análisis por periodo.', tone: 'green' },
  { title: 'Comparativa', description: 'Benchmark del último trimestre.', tone: 'blue' },
  { title: 'Alertas', description: 'Índices de riesgo y casos críticos.', tone: 'amber' },
];
