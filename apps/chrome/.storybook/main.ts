import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from 'path';
import { mergeConfig } from 'vite';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: ['../**/__stories__/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@chromatic-com/storybook'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  staticDirs: ['../public'],
  viteFinal: (config) => {
    return mergeConfig(config, {
      define: {
        'process.env': {
          ENVIRONMENT: 'development',
          VERSION: '0.0.1-storybook',
        },
      },
    });
  },
};

export default config;
