import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CreateInfo from '@/views/CreateInfo.vue'
import Login from '@/views/Login.vue'
import CreateAccount from '@/views/CreateAccount.vue'
import CreateRoster from '@/views/CreateRoster.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/create-info',
      name: 'create-info',
      component: CreateInfo
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/create-account',
      name: 'create-account',
      component: CreateAccount
    },
    {
      path: '/create-roster',
      name: 'create-roster',
      component: CreateRoster
    }
  ]
})
