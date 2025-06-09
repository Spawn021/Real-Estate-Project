const { getCurrent, getRoles } = require('../controller/user')
const { verifyToken } = require('../middlewares/verifyToken')

const router = require('express').Router()

router.get('/current', verifyToken, getCurrent)
router.get('/roles', getRoles)

module.exports = router
