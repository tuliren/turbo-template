const { resolve } = require('node:path');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');
const { createTypeScriptImportResolver } = require('eslint-import-resolver-typescript');
const { createNodeResolver } = require('eslint-plugin-import-x');
const baseConfig = require('./base.js');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    settings: {
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project,
        }),
        createNodeResolver({
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
      ],
    },
  },
];
