const UserController = require('../controllers/UserController')
const router = require('express').Router()

router.get('/', UserController.home)

router.get('/add', UserController.addForm)
router.post('/add', UserController.addUser)

router.get('/edit/:id', UserController.editForm)
router.post('/edit/:id', UserController.editUser)

router.get('/delete/:id', UserController.delete)

module.exports = router