const crypto = require('crypto')
const fs = require('fs')

const utils = {}

utils.isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length

utils.hash = (type, stringToHash) => crypto.createHash(type).update(stringToHash, 'utf-8').digest('hex').toString()

utils.readFile = (file, callback, charset = 'utf8') => {
  return fs.readFile(file, charset, callback)
}

utils.writeOnFile = (file, dataToStore, hash, callback, flag = 'a+') => {
  return utils.readFile(file, (err, data) => {
    if (err) return err
    if (data.indexOf(hash) >= 0) {
      return false
    } else {
      return fs.writeFile(file, `${dataToStore}\r\n`, { flag }, callback)
    }
  })
}

module.exports = utils
