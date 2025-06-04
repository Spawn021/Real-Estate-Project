const { throwErrorWithStatus } = require('./errorHandler')

const validateDTO = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    const message = error ? error.details[0].message.replaceAll('"', '') : null
    if (error) throwErrorWithStatus(400, message, res, next)
    next()
  }
}

module.exports = validateDTO
