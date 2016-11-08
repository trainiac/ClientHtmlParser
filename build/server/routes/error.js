'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {

  return [_fourOhFour2.default, _jsonValidation2.default, (0, _general2.default)(app)];
};

var _fourOhFour = require('./error/fourOhFour');

var _fourOhFour2 = _interopRequireDefault(_fourOhFour);

var _general = require('./error/general');

var _general2 = _interopRequireDefault(_general);

var _jsonValidation = require('./error/jsonValidation');

var _jsonValidation2 = _interopRequireDefault(_jsonValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=error.js.map