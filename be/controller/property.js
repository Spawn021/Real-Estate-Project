const asyncHandler = require('express-async-handler')
const db = require('../models')
const { throwErrorWithStatus } = require('../middlewares/errorHandler')

const createProperty = asyncHandler(async (req, res) => {
  const { phone, name, password, role } = req.body

  const response = await db.User.findOrCreate({
    where: { phone },
    defaults: req.body,
  })

  return res.status(201).json({
    success: response[1],
    message: response[1] ? 'User registered successfully' : 'Phone Number already exists',
  })
})

module.exports = {
  createProperty,
}
