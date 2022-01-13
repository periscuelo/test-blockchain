const controller = {}

/**
 * @function storeChain
 * Block controller storeChain function to store a chain
 */
controller.storeChain = async (req, res) => {
  try {
    const chain = '';

    return res.send(chain)
  } catch (e) {
    return res.code(422).send(e)
  }
}

module.exports = controller
