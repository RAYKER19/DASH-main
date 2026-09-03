import { useState } from 'react';
import { AppRoute } from './AppRoute';
import type { ViewKey } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<ViewKey>('dashboard');

  return <AppRoute view={activeView} onSelectView={setActiveView} />;
}
