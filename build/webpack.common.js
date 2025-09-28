const path = require('path');
const webpack = require('webpack');
const AutoInjectCssWebpackPlugin = require('@kdcloudjs/auto-inject-css-webpack-plugin');
const KwcWebpackPlugin = require('@kdcloudjs/kwc-webpack-plugin');

module.exports = {
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'index.js',
      clean: true,
      chunkFilename: 'js/[name].[contenthash].js'
    },
  
    resolve: {
      alias: {
        // '@': path.resolve(__dirname, '../src'), // 将 '@' 映射到 'src' 目录
        'kingdee': '@kdcloudjs/kwc-shared-utils'
      }
    },
  
    optimization:  {
      sideEffects: true, // 启用副作用处理
      splitChunks: {
        chunks: 'async',
        minSize: 20000,       // 小于 20KB 不会被拆出来
        maxSize: 1000000     // 超过 1MB 才会强制拆
      }
    },
  
    plugins: [
      new AutoInjectCssWebpackPlugin(
        { files: [path.resolve(__dirname,'../node_modules/@kdcloudjs/kingdee-base-components/dist/index.css')] }
      ),
      new KwcWebpackPlugin(),
      new webpack.NormalModuleReplacementPlugin(/^kd\/(.*)$/, (resource) => {
        const match = resource.request.match(/^kd\/(.*)$/);
        if (match) {
          resource.request = path.resolve(
            __dirname,
            `../node_modules/@kdcloudjs/kingdee-base-components/dist/src/modules/kd/${match[1]}/${match[1]}.js`
          );
        }
      })
    ]
};