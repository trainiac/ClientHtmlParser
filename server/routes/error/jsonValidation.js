import HttpStatus from 'http-status-codes'

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
export default function(error, request, response, next) {

  if (error.name === 'JsonSchemaValidation') {

    console.log(error.stack)

    response.status(HttpStatus.BAD_REQUEST)

    const responseData = {
      message: 'Bad Request',
      jsonSchemaValidation: true,
      validations: error.validations,
      error
    }

    response.json(responseData)

  }

  return next(error)

}
