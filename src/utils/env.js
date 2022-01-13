/**
 * ENV Library: Colletction of generic enviroment manipulation functions
 * @module envHelper
 */

const dotenv = require('dotenv')

/**
 * Check if .env is present
 */
const checkDotEnv = () => {
  const envFound = dotenv.config()
  if (envFound.error) {
    // This error should crash whole process

    if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test') {
      console.error('⚠️  Couldn\'t find .env file  ⚠️')
      process.exit(0)
    }
  }
}

module.exports = checkDotEnv
