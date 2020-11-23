<template>
  <div class="hello" v-if="isLogin">
    <p>hello man</p>
  </div>
  <div v-else>
    <Input v-model="password" type="password" password placeholder="Enter password..." style="width: 200px" />
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () =>{
    return{
      isLogin: false,
      password: '',
      username: ''
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
}
</style>
