import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { createRoot } from 'react-dom/client';

import { MANTINE_THEME } from './common/mantine';
import { TabsProvider } from './contexts/TabsContext';
import SidePanel from './side_panel/SidePanel';

const root = createRoot(document.getElementById('panel-root')!);
root.render(
  <MantineProvider theme={MANTINE_THEME}>
    <Notifications limit={3} position="bottom-left" containerWidth={50} withinPortal />
    <TabsProvider>
      <SidePanel />
    </TabsProvider>
  </MantineProvider>
);
