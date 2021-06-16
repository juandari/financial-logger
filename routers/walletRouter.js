const WalletController = require('../controllers/WalletController')
const router = require('express').Router()

router.get('/', WalletController.home)

router.get('/add', WalletController.addForm)
router.post('/add', WalletController.addWallet)

router.get('/edit/:id', WalletController.editForm)
router.post('/edit/:id', WalletController.editWallet)

router.get('/delete/:id', WalletController.delete)

module.exports = router