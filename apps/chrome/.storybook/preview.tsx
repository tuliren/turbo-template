import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import type { Preview, StoryContext } from '@storybook/react';

import { MANTINE_THEME } from '../src/common/mantine';
import './chromeMock';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context: StoryContext) => {
      return (
        <MantineProvider theme={MANTINE_THEME}>
          <Notifications />
          <Story />
        </MantineProvider>
      );
    },
  ],
};

export default preview;
