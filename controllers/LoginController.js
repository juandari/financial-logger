const { User } = require('../models')

class LoginController {
  static registerForm(req, res) {
    res.render('register')
  }

  static register(req, res) {
    const { name, password } = req.body

    User.create({ name, password })
      .then((result) => {
        res.redirect('/login')
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static loginForm(req, res) {
    res.render('login')
  }

  static login(req, res) {
    
  }
}

module.exports = LoginController
