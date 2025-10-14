const path = require('path')
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const serverConfig = require('../server/config.js')

const { isvId, moduleId, schemaId, localServer } = serverConfig

// 检查配置文件中的值是否为空
if (localServer && (!isvId || !moduleId || !schemaId)) {
  console.error('配置文件 server/config.js 缺少必要的字段。')
  process.exit(1) // 退出进程
}

module.exports = merge(common, {
  mode: 'production',
  entry: [path.resolve(__dirname,'../src/modules/x/utils/kwc-shadow-injector.js'), path.resolve(__dirname, '../src/index.js')],
  watch: localServer,
  watchOptions: {
    ignored: /node_modules/, // 忽略某些目录
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, '../static'),
          to: path.resolve(__dirname, '../dist'),
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, '../dist'),
          to: path.join(
            path.resolve(__dirname, '../server'),
            'isv',
            isvId,
            moduleId,
            schemaId
          ),
          noErrorOnMissing: true,
        },
      ],
    }),
    new WebpackBar()
  ],
});