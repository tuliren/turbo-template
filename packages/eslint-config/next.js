const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const onlyWarn = require('eslint-plugin-only-warn');
const globals = require('globals');
const typescriptConfig = require('./typescript.js');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...typescriptConfig,
  {
    // Next.js generated artifacts — not authored, should not be linted.
    ignores: ['.next/**', 'next-env.d.ts'],
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'only-warn': onlyWarn,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        React: true,
        JSX: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
    },
  },
];
