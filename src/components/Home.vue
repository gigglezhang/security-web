<template>
  <div class="hello" v-if="isLogin">
    <div>
      <h1>hello man</h1>
      <Button @click="handlePorductId" type="primary">getProductId</Button>
      <h4>productId {{productId}}</h4>
      <Button @click="logOut" type="error">logOut</Button>
    </div>
  </div>
  <div v-else class="hello">
    <!-- <Login @success="success"></Login> -->
    <Button @click="login" type="success">login</Button>
  </div>
</template>

<script>
import { stringify } from 'qs'
import { delCookie } from '../utils/utils'
// import Login from './login/Login.vue'

export default {

  name: 'HelloWorld',
  data: () => {
    return {
      isLogin: false,
      productId: ''
    }
  },
  props: {
    access_token: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/require-prop-type-constructor
    token_type: '',
    // eslint-disable-next-line vue/require-prop-type-constructor
    expires_in: '',
    // eslint-disable-next-line vue/require-prop-type-constructor
    scope: ''
  },

  components: {
    // Login
  },
  methods: {
    logOut() {
      this.isLogin = false
      delCookie('token')
    },
    success() {
      this.isLogin = true
    },
    handlePorductId() {
      this.$http.get('/getOrder/' + 1)
        .then(res => {
          console.log(res.data)
          if (res.data) {
            this.productId = res.data.productId
          }
        })
    },
    login() {
      // window.open('https://www.baidu.com')
      window.location = 'http://localhost:9090/oauth/authorize?response_type=code&client_id=gateway&state=' + '/'
    }
  },
  mounted() {
    console.log(this.access_token)
    console.log(this.$props)
    if (this.access_token) {
      setCookie('token', this.access_token)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello{
  display: flex;
  align-items:center;
  justify-content:center;
  // height: 100%;
  margin-top: 2%; //居然是用宽度的百分比
}
</style>
