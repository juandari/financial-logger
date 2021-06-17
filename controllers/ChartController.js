const db = require('../models')
const { QueryTypes } = require('sequelize')
const { Transaction } = require('../models')
const { lineChart, pieChart } = require('../helpers/charts')
const moment = require('moment')

class ChartController {
  static home(req, res) {
    let lineChartLabels, lineChartData
    let pieChartLabels, pieChartData

    db.sequelize
      .query(
        `
      SELECT transaction_date, SUM(amount)
      FROM "Transactions"
      WHERE user_id = ${+req.session.user_id}
      GROUP BY 1
      ORDER BY 1
    `,
        {
          type: QueryTypes.SELECT,
        }
      )
      .then((result) => {
        lineChartLabels = result.map((transaction) =>
          moment(transaction.transaction_date).format('YYYY-MM-DD')
        )
        lineChartData = result.map((transaction) => +transaction.sum)

        db.sequelize
          .query(
            `
          select category, round(amount / sum * 100, 2) as percentage
          from (
            select category, sum(amount) as amount, (select sum(amount) from "Transactions" where user_id = t.user_id) as sum
            from "Transactions" t
            where t.user_id = ${+req.session.user_id}
            group by 1, t.user_id
          ) summary
          order by 1
          `,
            {
              type: QueryTypes.SELECT,
            }
          )
          .then((result) => {
            pieChartLabels = result.map(data => data.category)
            pieChartData = result.map(data => +data.percentage)
            console.log(pieChartData, pieChartLabels)

            res.render('charts', { lineChartLabels, lineChartData, pieChartLabels, pieChartData })
          })
          .catch((err) => {
            res.send(err)
          })
      })
      .catch((err) => {
        res.send(err)
      })
  }
}

module.exports = ChartController
