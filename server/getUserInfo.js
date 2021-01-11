const axios = require('axios')
var qs = require('qs')
const instance = axios.create({
  baseURL: 'http://localhost:8090/',
  method: 'post',
  timeout: 10000,
  auth: {
    username: 'gateway',
    password: '123456'
  }
})

function getOrder(req, resp) {
  console.log(req.cookies)
  const token = req.cookies.token
  instance({
    url: '/token/oauth/check_token',
    data: qs.stringify({
      token
    })
  }).then(res => {
    if (res.status === 200) {
      resp.json(res.data)
    } else {
      resp.status(res.status).json({
        msg: res.msg,
        status: res.status
      })
    }
  }).catch(error => {
    console.log(error.response.data)
    resp.status(500).json({
      data: error.response.data,
      status: 500
    })
  })
}

module.exports = getOrder
