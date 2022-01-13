const schemas = {}

schemas.BlockParamsSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        hash: { type: 'string' },
        message: { type: 'string' },
        nonce: { type: 'number' }
      },
      required: ['hash', 'message', 'nonce']
    }
  }
}

module.exports = schemas
