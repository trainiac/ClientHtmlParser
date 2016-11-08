'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import * as Objects from '../../facades/Objects'


const objectRoutes = _express2.default.Router({
  mergeParams: true
});

objectRoutes.get('/action/', (request, response) => {

  response.json({});
});

exports.default = objectRoutes;
//# sourceMappingURL=objects.js.map