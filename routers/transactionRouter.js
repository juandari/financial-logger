const TransactionController = require('../controllers/TransactionController')
const router = require('express').Router()

router.get('/', TransactionController.home)

router.get('/add', TransactionController.addForm)
router.post('/add', TransactionController.addTransaction)

router.get('/edit/:id', TransactionController.editForm)
router.post('/edit/:id', TransactionController.editTransaction)

router.get('/delete/:id', TransactionController.delete)


module.exports = router