const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://localhost:8090/',
  method: 'get',
  timeout: 10000
})

function getOrder(req, resp) {
  const orderId = req.params.orderId
  console.log(req.cookies)
  const token = req.cookies.token
  instance({
    url: '/order/order/' + orderId,
    headers: {
      Authorization: 'Bearer ' + token
    }
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
    console.log(error)
    resp.status(500).json({
      msg: error.response.data,
      status: 500
    })
  })
}

module.exports = getOrder
