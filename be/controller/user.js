const asyncHandler = require('express-async-handler')
const db = require('../models')

const getCurrent = asyncHandler(async (req, res) => {
  const { uid } = req.user
  const response = await db.User.findByPk(uid, {
    attributes: { exclude: ['password'] },
    include: [
      {
        model: db.UserRole,
        as: 'userRoles',
        attributes: ['roleCode'],
        where: { uid },
        include: [
          {
            model: db.Role,
            as: 'roleName',
            attributes: ['value'],
          },
        ],
      },
    ],
  })

  return res.status(201).json({
    success: Boolean(response),
    message: response ? 'User retrieved successfully' : 'User not found',
    currentUser: response,
  })
})

const getRoles = asyncHandler(async (req, res) => {
  const response = await db.Role.findAll({
    attributes: ['code', 'value'],
  })
  return res.status(201).json({
    success: Boolean(response),
    message: response ? 'Roles retrieved successfully' : 'No roles found',
    roles: response,
  })
})

const updateProfile = asyncHandler(async (req, res) => {
  const { uid } = req.user
  const { phone } = req.body
  if (phone) {
    const phoneExists = await db.User.findOne({
      where: { phone, id: { [db.Sequelize.Op.ne]: uid } },
    })
    if (phoneExists) {
      return res.status(400).json({
        success: false,
        message: 'Phone number already exists',
      })
    }
  }
  const response = await db.User.update(req.body, {
    where: { id: uid },
  })

  return res.status(200).json({
    success: Boolean(response[0]),
    message: Boolean(response[0])
      ? 'Profile updated successfully'
      : 'Profile update failed',
  })
})
module.exports = {
  getCurrent,
  getRoles,
  updateProfile,
}
