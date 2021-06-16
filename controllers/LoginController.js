const { User } = require('../models')
const bcrypt = require('bcrypt')

class LoginController {
  static registerForm(req, res) {
    res.render('register')
  }

  static register(req, res) {
    const { name, password, email } = req.body

    User.create({ name, password, email })
      .then((result) => {
        res.redirect('/login')
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static loginForm(req, res) {
    const { notif } = req.query
    res.render('login', { notif })
  }

  static login(req, res) {
    const { email, password } = req.body

    User.findOne({ where: { email }})
      .then(result => {
        if (result) {
          let compare = bcrypt.compareSync(password, result.password)

          if (compare) {
            req.session.user_id = result.id
            res.redirect('/transaction')
          } else {
            let err = new Error('Email atau password salah')
            err.name = 'invalidEmailPassword'
            throw err
          }
        } else {
          let err = new Error('Email atau password salah')
          err.name = 'invalidEmailPassword'
          throw err
        }
      })
      .catch((err) => {
        if (err.name === 'invalidEmailPassword') {
          res.send(err.message)
        } else {
          res.send(err)
        }
      })
  }

  static logout(req, res) {
    req.session.destroy()
    res.redirect('/login')
  }
}

module.exports = LoginController
