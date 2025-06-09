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
module.exports = {
  getCurrent,
  getRoles,
}
