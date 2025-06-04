const asyncHandler = require('express-async-handler')
const db = require('../models')
const { throwErrorWithStatus } = require('../middlewares/errorHandler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = asyncHandler(async (req, res) => {
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

const signIn = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body

  const user = await db.User.findOne({
    where: { phone },
  })
  if (!user) return throwErrorWithStatus(401, 'Unauthorized', res, next)
  const isMatchedPassword = bcrypt.compareSync(password, user.password)
  if (!isMatchedPassword) return throwErrorWithStatus(401, 'Unauthorized', res, next)
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
  return res.status(200).json({
    success: true,
    message: 'User signed in successfully',
    data: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      accessToken: token,
    },
  })
})

module.exports = {
  register,
  signIn,
}
