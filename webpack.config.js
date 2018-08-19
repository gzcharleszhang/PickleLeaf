// webpack.config.js
const path = require('path');
// eslint-disable-next-line
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: './dist/bundle.js',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: {
        loader: 'babel-loader',
      },
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      client: path.resolve(__dirname, './src/client'),
      server: path.resolve(__dirname, './src/server'),
      common: path.resolve(__dirname, './src/common'),
    },
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    publicPath: '/',
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8000/',
    },
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};