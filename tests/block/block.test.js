const request = require('../../src/server')

describe('Checking all possibilities for chain', () => {
  let body, expected, status

  afterEach(async () => {
    const res = await request.inject().post('/chain').payload(body)
    expect(res.statusCode).toBe(status)
    expect(res.json()).toMatchObject(expected)
  })

  afterAll(done => {
    request.close()
    done()
  })

  test('Try insert a chain before the genesi line ', () => {
    body = {
      hash: '0038711c83bd05b1e369e27246df4ba815a6dda04116b1b2f9a8c21ba4e1de38',
      message: 'Chau Mundo',
      nonce: 71
    }

    expected = {
      error: {
        code: 'SING_ERROR',
        message: 'This chain don\'t have the genesi line Something is not good!'
      }
    }

    status = 422
  })
})
