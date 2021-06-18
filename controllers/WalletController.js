const { Wallet, Users_Wallets, User, Transaction } = require('../models')
const formatbalance = require('../helpers/countbalance')

class WalletController {
  static home(req, res) {
    Users_Wallets.findAll({
      include: [Wallet, User],
      where: {
        user_id: +req.session.user_id,
      },
    })
      .then((result) => {
        // console.log(result[0].Wallet.balance);
        result.forEach(userWallet => {
          userWallet.Wallet.balance = formatbalance(userWallet.Wallet.balance)
        })
        res.render('listWallet', { userWallets: result, balance:formatbalance })
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
          user_id: +req.session.user_id,
        }).then((result) => {
          res.redirect('/wallet')
        })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static delete(req, res) {
    const { id } = req.params

    Users_Wallets.destroy({
      where: {
        wallet_id: +id,
      },
    })
      .then((result) => {
        Wallet.destroy({
          where: {
            id: +id,
          },
        })
          .then((result) => {
            Transaction.destroy({
              where: {
                wallet_id: +id,
              }
            })
              .then((result) => {
                res.redirect('/wallet')
              })
          })
      })
      .catch((err) => {
        res.send(err)
      })
  }
}

module.exports = WalletController
