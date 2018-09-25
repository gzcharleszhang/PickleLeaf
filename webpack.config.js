// webpack.config.js
const path = require('path');
// eslint-disable-next-line
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './bundle.js',
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
    },
    {
      test: /\.(png|jp(e*)g|svg)$/,
      use: ['file-loader'],
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),

    new webpack.DefinePlugin({
      'process.env': {
        PORT: JSON.stringify(process.env.PORT),
      },
    }),
  ],
};