const asyncHandler = require('express-async-handler')
const db = require('../models')
const { throwErrorWithStatus } = require('../middlewares/errorHandler')

const getCurrent = asyncHandler(async (req, res) => {
  const { uid } = req.user
  const response = await db.User.findByPk(uid, {
    attributes: { exclude: ['password'] },
  })
  return res.status(201).json({
    success: Boolean(response),
    message: response ? 'User retrieved successfully' : 'User not found',
    currentUser: response,
  })
})
module.exports = {
  getCurrent,
}
