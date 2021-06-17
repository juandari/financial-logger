const { Transaction, Wallet, Users_Wallets, User } = require('../models')
const moment = require('moment')

class TransactionController {
  static home(req, res) {
    Transaction.findAll({
      where: {
        user_id: +req.session.user_id
      },
      include: Wallet,
      order: [['transaction_date', 'DESC']],
    })
      .then((transactions) => {
        transactions.forEach((transaction) => {
          transaction.day = moment(transaction.transaction_date).format('dddd')
          transaction.month = moment(transaction.transaction_date).format(
            'DD MMMM YYYY'
          )
        })

        res.render('home', { transactions })
      })
      .catch((err) => res.send(err))
  }

  static addForm(req, res) {
    let wallets = []

    Users_Wallets.findAll({
      include: Wallet,
      where: {
        user_id: +req.session.user_id
      }
    })
      .then((result) => {
        result.forEach((userWallet) => {
          wallets.push(userWallet.Wallet)
        })

        if (wallets.length > 0) {
          res.render('addTransaction', { wallets })
        } else {
          let notif = 'Add a wallet before making a transaction'
          res.render('warningNoWallet', { notif })
        }
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static addTransaction(req, res) {
    let { amount, type, category, note, date, wallet_id } = req.body
    let user_id = req.session.user_id
    amount = +amount

    Wallet.findOne({
      include: Transaction,
      where: {
        id: +wallet_id,
      },
    })
      .then((result) => {
        if (type === 'Expense') {
          result.balance = +result.balance - amount
        } else {
          result.balance = +result.balance + amount
        }

        Wallet.update({balance: result.balance}, {
          where: {
            id: +wallet_id
          },
          returning: true
        })
          .then(result => {
            console.log('Update wallet balance successful')
          })
      })
      .catch((err) => {
        res.send(err)
      })

    Transaction.create({
      user_id: +user_id,
      type,
      amount,
      category,
      note,
      wallet_id: +wallet_id,
      transaction_date: date,
    })
      .then((result) => {
        res.redirect('/transaction')
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static editForm(req, res) {
    const { id } = req.params

    Transaction.findOne({
      where: {
        id: +id,
      },
    })
      .then((transaction) => {
        transaction.date = moment(transaction.transaction_date).format(
          'YYYY-MM-DD'
        )

        res.render('editTransaction', { transaction })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static editTransaction(req, res) {
    const { id } = req.params
    const { amount, type, category, note, date } = req.body
    let user_id = req.session.user_id
    let wallet_id

    Transaction.findOne({
      where: {
        id: +id,
      },
    })
      .then((result) => {
        wallet_id = result.wallet_id
      })
      .catch((err) => {
        err.message = 'cannot find wallet_id'
        res.send(err.message)
      })

    Transaction.update(
      {
        user_id: +user_id,
        type,
        amount: +amount,
        category,
        note,
        wallet_id: +wallet_id,
        transaction_date: new Date(date),
      },
      {
        where: {
          id: +id,
        },
        returning: true,
      }
    )
      .then((result) => {
        res.redirect('/transaction')
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static delete(req, res) {
    const { id } = req.params

    Transaction.destroy({
      where: {
        id: +id,
      },
    })
      .then((result) => {
        res.redirect('/transaction')
      })
      .catch((err) => {
        res.send(err)
      })
  }
}

module.exports = TransactionController
