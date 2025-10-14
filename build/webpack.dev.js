const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  entry: [path.resolve(__dirname,'../src/modules/x/utils/kwc-shadow-injector.js'), path.resolve(__dirname, '../src/devIndex.js')],
  mode: 'development',
  devtool: 'eval-source-map',

  devServer: {
    port: 8000,
    host: 'localhost',
    hot: true,
    compress: false,
    open: false,
    static: { directory: '../dist' },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({})
  ],
});