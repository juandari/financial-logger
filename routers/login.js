const LoginController = require('../controllers/LoginController')
const router = require('express').Router()

router.get('/', LoginController.loginForm)
router.post('/', LoginController.login)

module.exports = router