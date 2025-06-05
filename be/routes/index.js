const auth = require('./auth')
const user = require('./user')

const initRoutes = (app) => {
  app.use('/api/auth', auth)
  app.use('/api/user', user)
}
module.exports = initRoutes
