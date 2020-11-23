const express = require('express')
const app = express()
const login = require('./server/login.js')

const port = 6969

// app.use(express.static('/dist'))
app.use(express.json())

app.post('/login', login)

app.listen(port, 'localhost', () =>{
    console.log(`server is start on ${port}`)
})