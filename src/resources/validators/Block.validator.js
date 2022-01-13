const schemas = {}

schemas.BlockParamsSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        hash: {
          type: 'string',
          minLength: 1,
          maxLength: 64
        },
        message: { type: 'string' },
        nonce: { type: 'number' }
      },
      required: ['hash', 'message', 'nonce']
    }
  }
}

module.exports = schemas
