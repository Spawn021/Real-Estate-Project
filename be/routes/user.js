const { getCurrent, getRoles, updateProfile } = require('../controller/user')
const { stringReq, number, string } = require('../middlewares/joiSchema')
const validateDTO = require('../middlewares/validate')
const { verifyToken } = require('../middlewares/verifyToken')
const Joi = require('joi')

const router = require('express').Router()

router.get('/current', verifyToken, getCurrent)
router.get('/roles', getRoles)
router.put(
  '/update-profile',
  validateDTO(
    Joi.object({
      name: stringReq,
      phone: number,
      address: string,
      email: string,
      avatar: string,
    }),
  ),
  verifyToken,
  updateProfile,
)

module.exports = router
