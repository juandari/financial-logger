const TransactionController = require('../controllers/TransactionController')
const router = require('express').Router()
const path = require('path')

router.get('/', TransactionController.home)

router.get('/add', TransactionController.addForm)
router.post('/add', TransactionController.addTransaction)

router.get('/edit/:id', TransactionController.editForm)
router.post('/edit/:id', TransactionController.editTransaction)

router.get('/delete/:id', TransactionController.delete)

router.get('/download', TransactionController.download)

router.get('/download/transactions.csv', function(req, res){
  let file = path.join(__dirname, '../transactions.csv')
  res.download(file)
});


module.exports = router