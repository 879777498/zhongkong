import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import login from './views/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
  ]
})
