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
  },
  paramsSerializer: function(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

function authCallback(req, resp) {
  const code = req.query.code
  const state = req.query.state
  instance({
    params: {
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:6969/authCallback',
      code,
      scope: 'read write',
      state
    },
    url: '/token/oauth/token'
  }).then(res => {
    if (res.status === 200) {
      console.log(res.data)
      const access_token = res.data.access_token
      const token_type = res.data.token_type
      const expires_in = res.data.expires_in
      const scope = res.data.scope

      const p = qs.stringify({
        access_token,
        token_type,
        expires_in,
        scope
      })
      console.log(p)
      resp.redirect('http://localhost:8080/#/setUser?' + p)
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

module.exports = authCallback
