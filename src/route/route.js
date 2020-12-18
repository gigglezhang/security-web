import VueRouter from 'vue-router'

const routes = [
  { path: '/', component: () => import('../components/Home.vue') },
  {
    path: '/setUser',
    props: (route) => ({
      access_token: route.query.access_token,
      token_type: route.query.token_type,
      expires_in: route.query.expires_in,
      scope: route.query.scope
    }),
    component: () => import('../components/Home.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
