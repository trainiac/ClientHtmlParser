'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionToObjects = undefined;

var _api = require('../repos/api');

var API = _interopRequireWildcard(_api);

var _fp = require('lodash/fp');

var _fp2 = _interopRequireDefault(_fp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function doSomeMoreWork(json) {

  return json;
}

const actionToObjects = exports.actionToObjects = _fp2.default.flow(API.actionToObjects, doSomeMoreWork);
//# sourceMappingURL=objects.js.map