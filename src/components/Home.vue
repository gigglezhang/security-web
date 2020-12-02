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
    <Login @success="success"></Login>
  </div>
</template>

<script>
import { delCookie } from '../utils/utils'
import Login from './login/Login.vue'

export default {
  name: 'HelloWorld',
  data: () => {
    return {
      isLogin: false,
      productId: ''
    }
  },
  components: {
    Login
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
