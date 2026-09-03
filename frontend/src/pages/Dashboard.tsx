import { ActivityPanel } from '../components/dashboard/ActivityPanel';
import { CategoryPanel } from '../components/dashboard/CategoryPanel';
import { HeaderPanel } from '../components/dashboard/HeaderPanel';
import { OverviewCards } from '../components/dashboard/OverviewCards';
import { PerformancePanel } from '../components/dashboard/PerformancePanel';
import { TrendChart } from '../components/dashboard/TrendChart';
import { WordCloudPanel } from '../components/dashboard/WordCloudPanel';
import { AppLayout } from '../layouts/AppLayout';
import { useDashboardData } from '../hooks/useDashboardData';
import type { ViewKey } from '../types';

interface DashboardProps {
  activeView?: ViewKey;
  onSelectView?: (view: ViewKey) => void;
}

export default function DashboardPage({ activeView = 'dashboard', onSelectView = () => undefined }: DashboardProps) {
  const { kpis: overview, categories, activity, metrics, words, trend, error } = useDashboardData();

  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <HeaderPanel />
      {error && <div className="panel error-panel">{error}</div>}
      <OverviewCards cards={overview} />

      <section className="two-col-grid">
    <TrendChart values={trend} />
    <CategoryPanel items={categories} />
      </section>

      <section className="bottom-grid">
    <WordCloudPanel items={words} />
    <PerformancePanel metrics={metrics} />
      </section>

      <section className="activity-grid">
    <ActivityPanel items={activity} />
      </section>
    </AppLayout>
  );
}
