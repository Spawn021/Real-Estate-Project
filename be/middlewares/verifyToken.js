const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const { throwErrorWithStatus } = require('./errorHandler')

const verifyToken = expressAsyncHandler(async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return throwErrorWithStatus(401, 'Token is not valid', res, next)
      else {
        req.user = payload
        next()
      }
    })
  } else throwErrorWithStatus(401, 'Token is not provided', res, next)
})

module.exports = { verifyToken }
