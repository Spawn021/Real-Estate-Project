const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  const formattedMessage = err.message.replaceAll('"', '')
  res.status(statusCode).json({
    success: false,
    message: formattedMessage || 'Internal Server Error',
  })
}
const throwErrorWithStatus = (code, message, res, next) => {
  const formattedMessage = message.replaceAll('"', '')
  const error = new Error(formattedMessage)
  res.status(code)
  next(error)
}

const badRequest = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`)
  res.status(404)
  next(error)
}
module.exports = { errorHandler, throwErrorWithStatus, badRequest }
