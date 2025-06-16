const { getProperties } = require('../controller/property')

const router = require('express').Router()

router.get('/', getProperties)

module.exports = router
