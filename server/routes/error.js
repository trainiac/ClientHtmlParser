/* Definition for all html routes. Route handlers are defined in separate files. */

import fourOhFourHandler from './error/fourOhFour'
import generalErrorHandler from './error/general'
import JSONErrorHandler from './error/jsonValidation'

/**
 * Returns a list of all of the application error handler middleware.
 * @param {Object} app - The Express application object
 * @returns {Array} A list of all of the application error handler middleware.
 */
export default function(app) {

  return [fourOhFourHandler, JSONErrorHandler, generalErrorHandler(app)]

}
