'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (error, request, response, next) {

  if (error.name === 'JsonSchemaValidation') {

    console.log(error.stack);

    response.status(_httpStatusCodes2.default.BAD_REQUEST);

    const responseData = {
      message: 'Bad Request',
      jsonSchemaValidation: true,
      validations: error.validations,
      error: error
    };

    response.json(responseData);
  }

  return next(error);
};

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=jsonValidation.js.map