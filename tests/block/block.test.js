const request = require('../../src/server')
const fs = require('fs')

const eraseContentFiles = () => {
  fs.truncate('./src/temp/chains.csv', 0, () => {})
  fs.truncate('./src/temp/nextchain.txt', 0, () => {})
  fs.truncate('./src/temp/nextnonce.txt', 0, () => {})
}

describe('Checking all possibilities for chain', () => {
  let body, expected, status

  beforeAll(() => {
    eraseContentFiles()
  })

  afterEach(async () => {
    const res = await request.inject().post('/chain').payload(body)
    expect(res.statusCode).toBe(status)
    expect(res.json()).toMatchObject(expected)
  })

  afterAll(done => {
    request.close()
    eraseContentFiles()
    done()
  })

  test('Try insert a chain before the genesi line', () => {
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

  test('Try insert a genesi line', () => {
    body = {
      hash: '0',
      message: 'Hola Mundo',
      nonce: 5
    }

    expected = [
      '0000000000000000000000000000000000000000000000000000000000000000,Hola Mundo,5'
    ]

    status = 200
  })

  test('Try duplicate the genesi line', () => {
    body = {
      hash: '0',
      message: 'Hola Mundo',
      nonce: 5
    }

    expected = {
      error: {
        code: 'SING_ERROR',
        message: 'You can have only one genesi line Something is not good!'
      }
    }

    status = 422
  })

  test('Try to use the same nonce for a new chain', () => {
    body = {
      hash: '0038711c83bd05b1e369e27246df4ba815a6dda04116b1b2f9a8c21ba4e1de38',
      message: 'Chau Mundo',
      nonce: 5
    }

    expected = {
      error: {
        code: 'YADIW_ERROR',
        message: 'This nonce already used You are doing it wrong!'
      }
    }

    status = 400
  })

  test('Try insert a new chain', () => {
    body = {
      hash: '0038711c83bd05b1e369e27246df4ba815a6dda04116b1b2f9a8c21ba4e1de38',
      message: 'Chau Mundo',
      nonce: 71
    }

    expected = [
      '0000000000000000000000000000000000000000000000000000000000000000,Hola Mundo,5',
      '0038711c83bd05b1e369e27246df4ba815a6dda04116b1b2f9a8c21ba4e1de38,Chau Mundo,71'
    ]

    status = 200
  })

  test('Try duplicate a chain', () => {
    body = {
      hash: '0038711c83bd05b1e369e27246df4ba815a6dda04116b1b2f9a8c21ba4e1de38',
      message: 'Chau Mundo',
      nonce: 71
    }

    expected = {
      error: {
        code: 'YADIW_ERROR',
        message: 'This hash already used You are doing it wrong!'
      }
    }

    status = 400
  })
})
