import { renderPage } from './routes/index';
import type { ViewKey } from './types';

interface AppRouteProps {
  view: ViewKey;
  onSelectView: (view: ViewKey) => void;
}

export function AppRoute({ view, onSelectView }: AppRouteProps) {
  return renderPage(view, onSelectView);
}
