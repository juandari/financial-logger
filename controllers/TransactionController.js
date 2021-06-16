const { Transaction } = require('../models')
const moment = require('moment')

class TransactionController {
  static home(req, res) {
    Transaction.findAll({
      order: [['transaction_date', 'DESC']]
    })
      .then((transactions) => {
        transactions.forEach((transaction) => {
          transaction.day = moment(transaction.transaction_date).format('dddd')
          transaction.month = moment(transaction.transaction_date).format('DD MMMM YYYY')
        })

        res.render('home', { transactions })
      })
      .catch((err) => res.send(err))
  }

  static addForm(req, res) {
    res.render('addTransaction')
  }

  static addTransaction(req, res) {
    const { amount, type, category, note, date } = req.body
    let user_id = 1
    let wallet_id = 1

    Transaction.create({
      user_id,
      type,
      amount,
      category,
      note,
      wallet_id,
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
        id: +id
      }
    })
      .then((transaction) => {
        transaction.date = moment(transaction.transaction_date).format('YYYY-MM-DD')

        res.render('editTransaction', { transaction })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static editTransaction(req, res) {
    const { id } = req.params
    const { amount, type, category, note, date } = req.body
    let user_id = 1
    let wallet_id = 1

    Transaction.update({
      user_id,
      type,
      amount,
      category,
      note,
      wallet_id,
      transaction_date: new Date(date),
    }, {
      where: {
        id: +id
      },
      returning: true
    })
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
        id: +id
      }
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
