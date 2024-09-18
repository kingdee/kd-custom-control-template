// webpack.dev.js
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 8000, //服务端口号
    hot: true, //开启热模块替换功能
    compress: false, //开发环境下不用开启gzip，提升热更新的速度
    // open: true, // 打开浏览器窗口
    static: {
      directory: path.join(__dirname, '../static'), //从static获取静态资源
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../static/index.html'),
      inject: true, //自动注入静态资源
    }),
  ],
})
