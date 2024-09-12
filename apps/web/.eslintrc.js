/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/next.js'],
  rules: {
    '@next/next/no-img-element': 'off',
  },
  env: {
    browser: true,
  },
};
