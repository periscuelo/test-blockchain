const { hash, readFile, writeOnFile } = require('../../utils')

const controller = {}

/**
 * @function _store
 * Private _store function to encapsulate code to store
 */
const _store = (req, res, receivedHash) => {
  const strToHash = `${receivedHash},${req.body.message},${req.body.nonce}`
  const nextHash = hash('sha256', strToHash)

  const lastHash = readFile('./src/temp/nextchain.txt').replace(/\r\n/g, '\n').split('\n').pop()

  // Validate chain to avoid store any hash not on sequence
  if (lastHash !== '' && lastHash === nextHash) {
    return res.code(400).send('This hash already used')
  } else if (lastHash !== '' && lastHash !== receivedHash) {
    return res.code(400).send('You can\'t broke the chain. Use the correct hash to proceed!')
  } else {
    writeOnFile('./src/temp/nextchain.txt', nextHash, nextHash, (err) => {
      if (err) {
        return res.code(500).send(err)
      }
    })
    writeOnFile('./src/temp/nextnonce.txt', req.body.nonce, req.body.nonce, (err) => {
      if (err) {
        return res.code(500).send(err)
      }
    })
  }

  writeOnFile('./src/temp/chains.csv', strToHash, receivedHash, (err) => {
    if (err) {
      return res.code(500).send(err)
    } else {
      const chain = readFile('./src/temp/chains.csv').replace(/\r\n/g, '\n').split('\n')

      chain.pop()

      return res.send(chain)
    }
  })
}

/**
 * @function storeChain
 * Block controller storeChain function to store a chain
 */
controller.storeChain = (req, res) => {
  try {
    let counter = 0
    let receivedHash

    // Validate parameters
    if (req.body.hash !== '0' && req.body.hash.length < 64) {
      return res.code(400).send('Corrupted Hash!')
    } else {
      receivedHash = req.body.hash.padStart(64, '0')
    }

    const firstLook = readFile('./src/temp/chains.csv').replace(/\r\n/g, '\n').split('\n')
    const firstLine = firstLook.shift()

    // Check if csv have the genesi line
    if (firstLine !== '') {
      const csvData = firstLine.split(',')
      if (csvData[0] !== '0'.padStart(64, '0')) {
        return res.code(422).send('This chain don\'t have the genesi line')
      } else if (csvData[0] === receivedHash) {
        return res.code(422).send('You can have only one genesi line')
      }

      firstLook.unshift(firstLine)

      // Check if the hash or nonce is already used
      firstLook.forEach(value => {
        const csvData2 = value.split(',')

        if (csvData2[0] === receivedHash) {
          return res.code(400).send('This hash already used')
        } else if (parseInt(csvData2[2], 10) === req.body.nonce) {
          return res.code(400).send('This nonce already used')
        }

        counter += 1

        if (counter === firstLook.length) {
          _store(req, res, receivedHash)
        }
      })
    } else if (req.body.hash !== '0' && firstLine === '') {
      return res.code(422).send('This chain don\'t have the genesi line')
    } else {
      _store(req, res, receivedHash)
    }
  } catch (e) {
    return res.code(422).send(e)
  }
}

module.exports = controller
