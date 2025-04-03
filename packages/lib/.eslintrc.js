/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/react-internal.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
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
