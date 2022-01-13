const config = require('./config')
const server = require('./server')

const startServer = () => {
  // Run the server!
  server.listen(config.port, '0.0.0.0', (err, address) => {
    if (err) {
      server.log.error(err)
      process.exit(1)
    }

    server.log.info(`
      ################################################
      🛡️  Server listening on port: ${address} 🛡️
      ################################################
    `)
  })
}

const stopServer = () => {
  server.close()
  process.exit(0)
}

// application specific logging, throwing an error, or other logic here
process.on('SIGINT', () => {
  stopServer()
})

process.on('SIGTERM', () => {
  stopServer()
})

process.on('uncaughtException', err => {
  server.log.error('uncaughtException: ', String(err.stack))
  process.exit(1)
})

process.on('unhandledRejection', (err, promise) => {
  server.log.error('Unhandled Promise Rejection: promise:', promise)
  server.log.error('Unhandled Promise Rejection: reason:', err.message)
  server.log.error(String(err.stack))
  process.exit(0)
})

startServer()
