/**
 * Resposne Gerator
 * Collection of resposne generation functions
 * @module responseHelper
 */

const response = {}

const errorMessages = require('../constants/errorMessages.json')

/**
 * Create error response with error and no data
 * @param {Number} code
 * @param {String} error
 * @returns {Object} response
 */
response.createErrorResponse = (code, error = null) => ({
  error: {
    code,
    message: error ? `${error} ${errorMessages[code]}` : errorMessages[code]
  }
})

module.exports = response
