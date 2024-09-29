// webpack.prod.js
const { merge } = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const serverConfig = require('../server/config.js')
const { isvId, moduleId, schemaId } = serverConfig

const IS_SERVER = false // 是否启用本地调试

// 检查配置文件中的值是否为空
if (IS_SERVER && (!isvId || !moduleId || !schemaId)) {
  console.error('配置文件 server/config.js 缺少必要的字段。')
  process.exit(1) // 退出进程
}

module.exports = merge(common, {
  mode: 'production',
  watch: IS_SERVER,
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
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
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
    new WebpackBar(),
  ],
})
