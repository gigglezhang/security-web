const axios = require('axios')
var qs = require('qs')

const instance = axios.create({
  baseURL: 'http://localhost:8090/',
  // url: '/token/oauth/token',
  method: 'post',
  timeout: 10000,
  auth: {
    username: 'gateway',
    password: '123456'
  }
})

function login(req, resp) {
  const username = req.body.username
  const password = req.body.password
  instance({
    data: qs.stringify({
      grant_type: 'password',
      scope: 'read write',
      username,
      password
    }),
    url: '/token/oauth/token'
  }).then(res => {
    if (res.status === 200) {
      const access_token = res.data.access_token
      const token_type = res.data.token_type
      const expires_in = res.data.expires_in
      const scope = res.data.scope
      resp.json({
        access_token,
        token_type,
        expires_in,
        scope
      })
    } else {
      resp.status(res.status).json({
        msg: res.msg,
        status: res.status
      })
    }
  }).catch(error => {
    console.log(error)
    resp.status(500).json({
      msg: error.response.data,
      status: 500
    })
  })
}

module.exports = login
