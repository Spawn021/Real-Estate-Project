const auth = require('./auth')
const user = require('./user')
const insert = require('./insert')
const propertyType = require('./propertyType')
const property = require('./property')

const initRoutes = (app) => {
  app.use('/api/auth', auth)
  app.use('/api/user', user)
  app.use('/api/property-type', propertyType)
  app.use('/api/property', property)
  app.use('/api/insert', insert)
}
module.exports = initRoutes
