const ChartController = require('../controllers/ChartController')
const router = require('express').Router()

router.get('/', ChartController.home)

module.exports = router