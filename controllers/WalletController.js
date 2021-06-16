const { Wallet, Users_Wallets, User } = require('../models')

class WalletController {
  static home(req, res) {
    Users_Wallets.findAll({
      include: [Wallet, User],
      where: {
        user_id: +req.session.user_id,
      },
    })
      .then((result) => {
        res.render('listWallet', { userWallets: result })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static addForm(req, res) {
    res.render('addWallet')
  }

  static addWallet(req, res) {
    const { name, balance } = req.body

    Wallet.create({ name, balance })
      .then((result) => {
        Users_Wallets.create({
          wallet_id: +result.id,
          user_id: +req.session.user_id
        })
          .then((result) => {
            res.redirect('/wallet')
          })

      })
      .catch((err) => {
        res.send(err)
      })

  }

  static delete(req, res) {
    const { id } = req.params

    Wallet.destroy({
      where: {
        id: +id,
      },
    })
      .then((result) => {
        res.redirect('/wallet')
      })
      .catch((err) => {
        res.send(err)
      })
  }
}

module.exports = WalletController
