const { getProperties, getPropertyById } = require('../controller/property')

const router = require('express').Router()

router.get('/:pid', getPropertyById)
router.get('/', getProperties)

module.exports = router
