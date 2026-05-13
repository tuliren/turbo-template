import type { Preview, StoryContext } from '@storybook/react';

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
    (Story, _context: StoryContext) => {
      return <Story />;
    },
  ],
};

export default preview;
