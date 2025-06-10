const Joi = require('joi')
const {
  createNewPropertyType,
  getPropertyTypes,
  updatePropertyType,
  deletePropertyType,
} = require('../controller/propertyType')
const validateDTO = require('../middlewares/validate')
const { verifyToken, isAdmin } = require('../middlewares/verifyToken')
const { stringReq, string } = require('../middlewares/joiSchema')
const rateLimiter = require('../middlewares/rateLimiter')

const router = require('express').Router()

router.use(rateLimiter)
router.post(
  '/create',
  verifyToken,
  // isAdmin,
  validateDTO(
    Joi.object({
      name: stringReq,
      description: stringReq,
      image: stringReq,
    }),
  ),
  createNewPropertyType,
)

router.patch(
  '/:id',
  verifyToken,
  isAdmin,
  validateDTO(
    Joi.object({
      name: string,
      description: string,
      image: string,
    }),
  ),
  updatePropertyType,
)
router.delete('/:id', verifyToken, isAdmin, deletePropertyType)

router.get('/', getPropertyTypes)

module.exports = router
