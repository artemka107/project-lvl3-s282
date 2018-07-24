const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    vendor: './src/vendor.js',
  },
  output: {
    filename: '[name].bunde.js',
    path: path.resolve(__dirname, 'dist', 'scripts'),
  },
  devServer: {
    contentBase: './dist',
    watchContentBase: true,
    publicPath: '/dist/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Rss reader',
      template: './src/view/index.pug',
      filename: 'index.html',
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
        },
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};
