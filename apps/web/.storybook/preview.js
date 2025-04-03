import '@mantine/core/styles.css';

import '../src/styles/globals.css';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
export const tags = ['autodocs'];

export const decorators = [
  (Story, context) => {
    return <Story />;
  },
];
