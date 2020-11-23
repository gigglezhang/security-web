const axios = require('axios')

const instance = axios.create({
    baseURL: 'http://localhost:8090/',
    url: '/token/oauth/token',
    method: 'post',
    timeout: 1000,
    auth: {
        username: 'gateway',
        password: '123456'
    },
});

function login(req, resp){
    let username = req.body.username
    let password = req.body.password
    instance({
        data: {
            grant_type: 'password',
            scope: 'read write',
            username,
            password
        }
    }).then(res => {
        if(res.status == 200){
            let access_token = res.data.access_token
            let token_type = res.data.token_type
            let expires_in = res.data.expires_in
            let scope = res.data.scope
            resp.json({
                access_token,
                token_type,
                expires_in,
                scope
            })
        }else{
            resp.status(res.status).json({
                msg: res.msg,
                status: res.status
            })
        }
    }).catch( error => {
        console.log(error)
        resp.status(500).json({
            msg: error.data,
            status: 500
        })
    })
}

module.exports = login; 