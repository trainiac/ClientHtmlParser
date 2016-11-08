/* eslint-disable no-var */

var webpack = require('webpack')
var config = require('./webpack.config.js')

config.devtool = 'inline-source-map'
config.entry.unshift(
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch'
)
config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
)
module.exports = config
