/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
    'turbo',
  ],
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'dist/',
    'coverage/',
    'storybook-static/',
  ],
  rules: {
    'no-unused-vars': 'off',
    'import/no-cycle': 'error',
    'no-empty-pattern': 'off',
    curly: 'error',
    'eol-last': ['error', 'always'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/tests/**/*.ts',
          '**/tests/**/*.tsx',
          '**/__tests__/**/*.ts',
          '**/__tests__/**/*.tsx',
          '**/stories/**/*.ts',
          '**/stories/**/*.tsx',
          '**/__stories__/**/*.tsx',
          '**/__stories__/**/*.ts',
        ],
        optionalDependencies: false,
        peerDependencies: true,
      },
    ],
  },
};
