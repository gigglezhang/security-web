<template>
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
</template>

<script>
import { setCookie } from '../../utils/utils'
export default {
  name: 'Login',
  data: () => {
    return {
      formInline: {}
    }
  },
  methods: {
    handleSubmit() {
      this.$http.post('/login', { username: this.formInline.user, password: this.formInline.password })
        .then(res => {
          console.log(res)
          if (res.data.access_token) {
            setCookie('token', res.data.access_token)
            this.$emit('success', res.data)
          }
        })
    }
  }
}
</script>

<style>

</style>
