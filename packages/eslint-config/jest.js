/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['plugin:jest/recommended'],
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/__tests__/**/*.ts',
          '**/__tests__/**/*.tsx',
        ],
      },
    ],
  },
};
