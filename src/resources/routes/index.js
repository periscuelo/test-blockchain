const fs = require('fs')
const path = require('path')

const basename = path.basename(__filename)
const routes = {}

fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
}).forEach(file => {
  const fileSplit = file.split('.')

  const route = {
    name: `${fileSplit[0].toLowerCase()}${fileSplit[1].charAt(0).toUpperCase()}${fileSplit[1].slice(1)}`,
    file: require(path.join(__dirname, file))
  }

  routes[route.name] = route.file
})

const initRoutes = (server, options, done) => {
  for (const route in routes) {
    server.register(routes[route])
  }

  done()
}

module.exports = initRoutes
