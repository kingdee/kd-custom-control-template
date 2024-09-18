const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const LESS_NAME = isProduction ? '[hash:base64:8]' : '[name]_[local]_[hash:base64:4]'

module.exports = {
  entry: isProduction ? path.resolve(__dirname, '../src/prodIndex') : path.resolve(__dirname, '../src/devIndex'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
    clean: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'), // 将 '@' 映射到 'src' 目录
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.less'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }, // 确保 @import 的 css 文件也会使用 PostCSS 处理，这个数量代表前面还有几个loader
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: {
                localIdentName: LESS_NAME,
              },
              importLoaders: 2, //确保 @import 的 Less 文件也会使用 PostCSS 处理
            },
          },
          'postcss-loader',
          'less-loader',
        ],
        include: path.resolve(__dirname, '../src'),
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|svg|eot|ttf)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8192,
          },
        },
      },
    ],
  },
  plugins: [
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: 'css/index.css',
    }),
  ],
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
}
