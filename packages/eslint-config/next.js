const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    require.resolve('@vercel/style-guide/eslint/next'),
    // Extend the typescript configuration as the last
    // one to override any conflicting rules.
    './typescript.js',
  ],
  plugins: ['only-warn'],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  overrides: [
    { files: ['*.js?(x)', '*.ts?(x)'] },
    {
      files: ['*.ts', '*.tsx'],
    },
  ],
};
