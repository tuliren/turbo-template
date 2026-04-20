const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config({ path: '.env.development' }).parsed;
console.info('Env', JSON.stringify(env, null, 2));
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: '.', to: '../', context: 'public/common' },
        { from: '.', to: '../', context: 'public/dev' },
      ],
      options: {},
    }),
    new DefinePlugin(envKeys),
  ],
});
