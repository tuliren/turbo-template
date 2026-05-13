const reactInternalConfig = require('@repo/eslint-config/react-internal.js');
const globals = require('globals');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...reactInternalConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
        NodeJS: 'readonly',
        chrome: 'readonly',
      },
    },
    rules: {
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
    },
  },
  {
    ignores: [
      'eslint.config.js',
      '*.config.js',
      '*.config.cjs',
      '*.config.mjs',
      '.storybook/**',
      'dist/**',
      'webpack/**',
    ],
  },
];
