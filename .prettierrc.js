module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-packagejson'],
  printWidth: 100,
  trailingComma: 'es5',
  singleQuote: true,
  tabWidth: 2,

  // import order
  importOrder: ['^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
