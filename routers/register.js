const LoginController = require('../controllers/LoginController')
const router = require('express').Router()
const { body, validationResult } = require('express-validator')

router.get('/', LoginController.registerForm)
router.post('/', 
  body('password').isLength({ min: 5 }), 
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    } else {
      next()
    }
  },
  LoginController.register
)

module.exports = router