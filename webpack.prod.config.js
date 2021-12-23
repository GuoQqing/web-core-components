/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    index: './components/index',
    utils: './components/utils/index',
  },
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    library: 'xs-web-core-components',
    libraryTarget: 'umd',
  },
  // 外部依赖
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
    antd: {
      commonjs: 'antd',
      commonjs2: 'antd',
      amd: 'antd',
    },
    moment: {
      commonjs: 'moment',
      commonjs2: 'moment',
      amd: 'moment',
    },
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
    },
    dva: {
      commonjs: 'dva',
      commonjs2: 'dva',
      amd: 'dva',
    },
    '@ant-design/pro-table': {
      commonjs: '@ant-design/pro-table',
      commonjs2: '@ant-design/pro-table',
      amd: '@ant-design/pro-table',
    },
  },
  resolve: {
    // 能够使用户在引入模块时不带扩展名
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './index.css', // 文件目录会放入output.path里
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // 不将注释提取到单独的文件中
      }),
    ],
  },
};
