'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objects = require('./api/objects');

var _objects2 = _interopRequireDefault(_objects);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Definition for all api routes. Route handlers are defined in separate files.

const apiRoutes = _express2.default.Router();

apiRoutes.use('/objects/', _objects2.default);

exports.default = apiRoutes;
//# sourceMappingURL=api.js.map