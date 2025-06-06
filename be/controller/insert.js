const asyncHandler = require('express-async-handler')
const db = require('../models')
const { throwErrorWithStatus } = require('../middlewares/errorHandler')
const { roles } = require('../utils/constant')

const initRoles = asyncHandler(async (req, res) => {
  const response = await db.Role.bulkCreate(roles)
  if (!response) return throwErrorWithStatus(500, 'Failed to initialize roles', res)
  return res.status(201).json({
    success: Boolean(response),
    message: response ? 'Roles initialized successfully' : 'Failed to initialize roles',
    data: response,
  })
})

module.exports = {
  initRoles,
}
