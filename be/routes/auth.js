const router = require('express').Router()
const Joi = require('joi')
const { signup, signin } = require('../controller/auth')
const validateDTO = require('../middlewares/validate')
const { stringReq, numberReq, string } = require('../middlewares/joiSchema')

router.post(
  '/signup',
  validateDTO(
    Joi.object({
      password: stringReq,
      name: stringReq,
      phone: numberReq,
      roleCode: string,
    }),
  ),
  signup,
)

router.post(
  '/signin',
  validateDTO(
    Joi.object({
      password: stringReq,
      phone: numberReq,
    }),
  ),
  signin,
)

module.exports = router
