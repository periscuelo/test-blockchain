// Config
const { env, logger } = require('./config')

// Require the framework and instantiate it
const fastify = require('fastify')({
  ajv: {
    customOptions: {
      allErrors: true,
      jsonPointers: true
    }
  },
  bodyLimit: 1048576 * 10, // 10MB
  logger: logger[env]
})


fastify.register(require('fastify-etag'))
fastify.register(require('fastify-helmet'), { contentSecurityPolicy: false })
fastify.register(require('fastify-cors'), { origin: '*' })
fastify.register(require('fastify-formbody'))
fastify.register(require('./resources/routes'))

// Declare a route
fastify.get('/', (req, res) => {
  res.send({ msg: `Welcome to API Block Chain ${new Date()}` })
})

module.exports = fastify
