const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: isProduction ? path.resolve(__dirname, '../src/index') : path.resolve(__dirname, '../src/devIndex'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
    clean: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'), // 将 '@' 映射到 'src' 目录
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.less', '.vue'],
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: { reactivityTransform: true }, 
        },
      },
      {
        test: /\.ts$/, // 匹配.ts文件
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-typescript",
                {
                  allExtensions: true, //支持所有文件扩展名(重要)
                },
              ],
            ]
          }
        }
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
              importLoaders: 2, //确保 @import 的 Less 文件也会使用 PostCSS 处理
            },
          },
          'postcss-loader',
          'less-loader',
        ],
        include: path.resolve(__dirname, '../src'),
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
      },
      {
        test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: 'css/index.css',
    })
  ],
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
}
