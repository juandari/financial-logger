const express = require('express')
const router = require('./routers')
const session = require('express-session')

const app = express()

const PORT = 4000

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))
app.use(router)

app.listen(PORT, () => {
  console.log('App is listening on port: ' + PORT)
})
