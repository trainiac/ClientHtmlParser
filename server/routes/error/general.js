import HttpStatus from 'http-status-codes'


export default function(app) {

  const isDevelopment = app.get('env') === 'development'


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

    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR
    const errorData = {
      message: error.message,
      // Development error handler will print stacktrace.
      // Production error handler no stacktraces leaked to user
      error: isDevelopment ? error : {},
      status
    }

    console.log(error.stack)
    response.status(status)
    response.json(errorData)

  }

}
