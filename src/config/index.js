const checkDotEnv = require('../utils/env')
const logger = require('./logger')
checkDotEnv()

const config = {
  env: process.env.NODE_ENV,
  port: process.env.APP_PORT || 3100,
  logger
}

module.exports = config
