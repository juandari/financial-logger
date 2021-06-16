const router = require('express').Router()
const transactionRouter = require('./transactionRouter')
const walletRouter = require('./walletRouter')
const userRouter = require('./userRouter')
const register = require('./register')
const login = require('./login')

router.get('/', (req, res) => {
  res.redirect('/login')
})

router.use('/login', login)
router.use('/register', register)
router.use('/wallet', walletRouter)
router.use('/transaction', transactionRouter)
router.use('/user', userRouter)

module.exports = router