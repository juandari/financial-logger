const { Chart } = require('chart.js')

const lineChart = (ctx, labels, data) => {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Amount',
          data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    },
  })
}

const pieChart = (ctx, labels, data) => {
  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          label: 'Spending per Category (%)',
          data,
          backgroundColor: [
            'rgb(38, 70, 83)',
            'rgb(42, 157, 143)',
            'rgb(233, 196, 106)',
            'rgb(244, 162, 97)',
            'rgb(231, 111, 81)',
          ],
        },
      ],
    },
  })
}

module.exports = {
  lineChart,
  pieChart
}
