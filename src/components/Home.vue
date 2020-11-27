<template>
  <div class="hello" v-if="isLogin">
    <p>hello man</p>
  </div>
  <div v-else class="hello">
    <Form ref="formInline" :v-model="formInline" >
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit">Signin</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => {
    return {
      isLogin: false,
      formInline: {}
    }
  },
  methods: {
    handleSubmit() {
      this.$http.post('/login', { username: this.formInline.user, password: this.formInline.password })
        .then(res => {
          console.log(res)
          this.isLogin = true
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
