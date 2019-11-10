import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CreateInfo from '@/views/CreateInfo.vue'
import Login from '@/views/Login.vue'
import CreateAccount from '@/views/CreateAccount.vue'
import CreateRoster from '@/views/CreateRoster.vue'
import TeamRoster from '@/views/TeamRoster.vue'

import * as firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
    if (!firebase.auth().currentUser) {
        next()
        return
    }
    next('/')
}

const ifAuthenticated = (to, from, next) => {
    if (firebase.auth().currentUser) {
        next()
        return
    }
    next('/login')
}

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/home',
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
            path: '/',
            name: 'login',
            component: Login,
            beforeEnter: ifNotAuthenticated,
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
            beforeEnter: ifNotAuthenticated,
        },
        {
            path: '/team/:id',
            name: '',
            component: TeamRoster,
            beforeEnter: ifNotAuthenticated,
        },
    ],
})
