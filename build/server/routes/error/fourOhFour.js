'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (request, response) {

  const errorData = {
    message: 'Not Found'
  };

  response.status(_httpStatusCodes2.default.NOT_FOUND);
  response.json(errorData);
};

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=fourOhFour.js.map