'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {

  const isDevelopment = app.get('env') === 'development';

  /**
  * Checks to see if the error was a JsonSchemaValidation and if so formats
  * a bad request response with the relevant information.
  *
  * @param {Object} error - The application error that occurred.
  * @param {Object} request - Express request object.
  * @param {Object} response - Express response object.
  * @param {Function} next - The middleware that is to be used if the error is not
  * JsonSchemaValidation
  *
  * @returns {Function|Undefined} If the error was a JsonSchemaValidation the function
  * will create an application response and the function will return nothing.  Otherwise,
  * the function will return the next middleware to be used.
  */
  return (error, request, response, next) => {

    const status = error.status || _httpStatusCodes2.default.INTERNAL_SERVER_ERROR;
    const errorData = {
      message: error.message,
      // Development error handler will print stacktrace.
      // Production error handler no stacktraces leaked to user
      error: isDevelopment ? error : {},
      status: status
    };

    console.log(error.stack);
    response.status(status);
    response.json(errorData);
  };
};

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=general.js.map