const { getCurrent } = require('../controller/user')
const { verifyToken } = require('../middlewares/verifyToken')

const router = require('express').Router()

router.get('/current', verifyToken, getCurrent)

module.exports = router
