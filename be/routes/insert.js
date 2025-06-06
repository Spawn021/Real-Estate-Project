const { initRoles } = require('../controller/insert')

const router = require('express').Router()

router.post('/init-roles', initRoles)

module.exports = router
