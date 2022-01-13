const BlockController = require('../controller/Block.controller')
const {
  BlockParamsSchema
} = require('../validators/Block.validator')

module.exports = (server, options, done) => {
  server.post('/chain', BlockParamsSchema, BlockController.storeChain)

  done()
}
