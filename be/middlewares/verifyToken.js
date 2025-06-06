const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const { throwErrorWithStatus } = require('./errorHandler')

const verifyToken = asyncHandler(async (req, res, next) => {
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

const isAgent = asyncHandler(async (req, res, next) => {
  const { roleCode } = req.user
  if (roleCode === 'ROLE7') {
    return throwErrorWithStatus(
      403,
      'Forbidden: You do not have permission to access this resource',
      res,
      next,
    )
  }
  next()
})
const isOwner = asyncHandler(async (req, res, next) => {
  const { roleCode } = req.user
  if (roleCode === 'ROLE7' || roleCode === 'ROLE5') {
    return throwErrorWithStatus(
      403,
      'Forbidden: You do not have permission to access this resource',
      res,
      next,
    )
  }
  next()
})

const isAdmin = asyncHandler(async (req, res, next) => {
  const { roleCode } = req.user
  if (roleCode !== 'ROLE1') {
    return throwErrorWithStatus(
      403,
      'Forbidden: You do not have permission to access this resource',
      res,
      next,
    )
  }
  next()
})

module.exports = {
  verifyToken,
  isAgent,
  isAdmin,
  isOwner,
}
