'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpackDev = require('../webpack.dev.config');

var _webpackDev2 = _interopRequireDefault(_webpackDev);

var _config = require('../config.dev');

var _config2 = _interopRequireDefault(_config);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let app = (0, _express2.default)();
const port = 5000;
const compiler = (0, _webpack2.default)(_webpackDev2.default);

console.log('configuring dev');

console.log('configuring webpack middleware');
app.use((0, _webpackDevMiddleware2.default)(compiler, {
  noInfo: true,
  publicPath: _config2.default.staticPublicPath
}));

console.log('configuring webpack hot reloader');
app.use((0, _webpackHotMiddleware2.default)(compiler));
app = (0, _app2.default)(app, {
  config: _config2.default,
  loggerLevel: 'dev'
});
// start app
app.listen(port, error => {

  if (error) {

    console.error(error);
  } else {

    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});

exports.default = app;
//# sourceMappingURL=app.dev.js.map