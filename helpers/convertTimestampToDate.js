const moment = require('moment')

const timestampToDate = (timestamp) => {
   return moment(timestamp).format('YYYY-MM-DD')
}

module.exports = timestampToDate