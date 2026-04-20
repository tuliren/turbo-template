import { Container, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import { createRoot } from 'react-dom/client';

import { MANTINE_THEME } from './common/mantine';
import { OptionsProvider } from './contexts/OptionsContext';
import Options from './options/Options';

const root = createRoot(document.getElementById('options-root')!);

root.render(
  <MantineProvider theme={MANTINE_THEME}>
    <Notifications />
    <OptionsProvider>
      <Container p="xl" size="xs">
        <Options />
      </Container>
    </OptionsProvider>
  </MantineProvider>
);
