const asyncHandler = require('express-async-handler')
const db = require('../models')
const { throwErrorWithStatus } = require('../middlewares/errorHandler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/user')

const signup = asyncHandler(async (req, res) => {
  const { phone, password, name } = req.body

  const response = await db.User.findOrCreate({
    where: { phone },
    defaults: { phone, password, name },
  })
  const userId = response[0].id
  if (userId) {
    const roleCode = ['ROLE7']
    if (req.body.roleCode) roleCode.push(req.body.roleCode)
    const roleCodeBulk = roleCode.map((code) => ({
      uid: userId,
      roleCode: code,
    }))
    const updateRole = await db.UserRole.bulkCreate(roleCodeBulk)
    if (!updateRole) await db.User.destroy({ where: { id: userId } })
  }
  return res.status(201).json({
    success: response[1],
    message: response[1] ? 'User registered successfully' : 'Phone Number already exists',
  })
})

const signin = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body

  const user = await db.User.findOne({
    where: { phone },
  })
  if (!user) return throwErrorWithStatus(401, 'Unauthorized', res, next)
  const isMatchedPassword = bcrypt.compareSync(password, user.password)
  if (!isMatchedPassword) return throwErrorWithStatus(401, 'Unauthorized', res, next)
  const token = jwt.sign(
    { uid: user.id, roleCode: user.roleCode },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  )
  return res.status(200).json({
    success: true,
    message: 'User signed in successfully',
    accessToken: token,
  })
})

module.exports = {
  signup,
  signin,
}
