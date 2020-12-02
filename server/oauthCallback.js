const axios = require('axios')
var qs = require('qs')

const instance = axios.create({
  baseURL: 'http://localhost:8090/',
  // url: '/token/oauth/token',
  method: 'get',
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
  const code = req.params.code
  const state = req.params.state
  instance({
    params: {
      response_type: 'code',
      code,
      state
    },
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

module.exports = authCallback
