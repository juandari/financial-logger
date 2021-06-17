const router = require('express').Router()
const transactionRouter = require('./transactionRouter')
const walletRouter = require('./walletRouter')
const register = require('./register')
const login = require('./login')
const chartRouter = require('./chartRouter')
const LoginController = require('../controllers/LoginController')
const TransactionController = require('../controllers/TransactionController')
const authMiddleware = require('../helpers/authMiddleware')

router.use('/login', login)
router.use('/register', register)
router.use(authMiddleware)
router.use('/wallet', walletRouter)
router.use('/transaction', transactionRouter)
router.use('/chart', chartRouter)
router.get('/logout', LoginController.logout)

module.exports = router