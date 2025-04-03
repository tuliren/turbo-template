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
  overrides: [
    {
      files: ["**/*.test.ts", "**/*.test.tsx", "jest.setup.ts"],
      env: {
        jest: true
      },
      rules: {
        "import/no-extraneous-dependencies": "off",
        "no-undef": "off"
      }
    }
  ]
};
