const express = require('express')
const app = express()
var cookieParser = require('cookie-parser')

const login = require('./server/login.js')
const getOrder = require('./server/getOrder')
const oauthCallback = require('./server/oauthCallback')

const port = 6969

// app.use(express.static('/dist'))
app.use(express.json())
app.use(cookieParser())

app.post('/login', login)

app.get('/oauthCallback', oauthCallback)

app.get('/getOrder/:orderId', getOrder)

app.listen(port, 'localhost', () => {
  console.log(`server is start on ${port}`)
})
