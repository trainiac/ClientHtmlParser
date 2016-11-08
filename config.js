/* eslint-disable no-var, object-shorthand */

var path = require('path')
var buildPath = path.join(__dirname, 'build')
var clientSrcPath = path.join(__dirname, 'client')
var clientBuildPath = path.join(buildPath, 'client')
var staticSrcPath = path.join(clientSrcPath, 'static')

module.exports = {
  buildPath: buildPath,
  clientSrcPath: clientSrcPath,
  clientBuildPath: clientBuildPath,
  staticSrcPath: staticSrcPath,
  staticPublicPath: '/static'
}
