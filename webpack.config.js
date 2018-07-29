//webpack.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, 'client'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }]
  },
  resolve: {
    modules: ['src', 'src/common', 'src/server', 'src/client', 'node_modules'],
  }
}