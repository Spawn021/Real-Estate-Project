const router = require('express').Router()
const Joi = require('joi')
const { register, signIn } = require('../controller/auth')
const validateDTO = require('../middlewares/validate')
const { stringReq, numberReq } = require('../middlewares/joiSchema')

router.post(
  '/register',
  validateDTO(
    Joi.object({
      password: stringReq,
      name: stringReq,
      phone: numberReq,
      role: stringReq,
    }),
  ),
  register,
)

router.post(
  '/signin',
  validateDTO(
    Joi.object({
      password: stringReq,
      phone: numberReq,
    }),
  ),
  signIn,
)

module.exports = router
