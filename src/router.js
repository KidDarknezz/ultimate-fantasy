import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import CreateInfo from '@/views/CreateInfo.vue'
import CreateAccount from '@/views/CreateAccount.vue'
import CreateRoster from '@/views/CreateRoster.vue'
import TeamRoster from '@/views/TeamRoster.vue'

import * as firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)
const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
    } else next('/login')
}

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            beforeEnter: ifAuthenticated,
        },
        {
            path: '/create-info',
            name: 'create-info',
            component: CreateInfo,
            beforeEnter: ifAuthenticated,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/create-account',
            name: 'create-account',
            component: CreateAccount,
        },
        {
            path: '/create-roster',
            name: 'create-roster',
            component: CreateRoster,
            // beforeEnter: ifNotAuthenticated,
        },
        {
            path: '/team/:id',
            name: '',
            component: TeamRoster,
            // beforeEnter: ifNotAuthenticated,
        },
    ],
})
