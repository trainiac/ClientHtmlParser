'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _config = require('../../config.prod');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let app = (0, _express2.default)();
const defaultPort = 5000;
const port = Number(process.env.PORT || defaultPort);
const appUrl = process.env.APP_URL || `http://localhost:${ port }/`;

app = (0, _app2.default)(app, {
  config: _config2.default,
  loggerLevel: 'combined'
});
// start app
app.listen(port, error => {

  if (error) {

    console.error(error);
  } else {

    console.info('==> 🌎  Open up %s in your browser.', appUrl);
  }
});

exports.default = app;
//# sourceMappingURL=app.prod.js.map