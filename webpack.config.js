/* eslint-disable no-var, object-shorthand */

var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var config = require('./config')

module.exports = {
  entry: [
    path.join(config.clientSrcPath, 'static/css/index.js'),
    'babel-polyfill',
    path.join(config.clientSrcPath, 'app.js')
  ],
  output: {
    path: config.clientBuildPath,
    filename: 'bundle.js',
    publicPath: config.staticPublicPath
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new CopyWebpackPlugin([
      { from: path.join(config.staticSrcPath, 'index.html'), to: config.buildPath },
      { from: path.join(config.staticSrcPath, 'favicon.ico'), to: config.buildPath },
      { from: path.join(config.staticSrcPath, 'images'), to: path.join(config.clientBuildPath, 'images') }
    ])
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: config.clientSrcPath
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css-loader')
    }]
  }
}
