import { createRoot } from 'react-dom/client';

import { TabsProvider } from './contexts/TabsContext';
import SidePanel from './side_panel/SidePanel';
import './styles/tailwind.css';

const root = createRoot(document.getElementById('panel-root')!);
root.render(
  <TabsProvider>
    <SidePanel />
  </TabsProvider>
);
