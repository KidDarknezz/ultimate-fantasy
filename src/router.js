import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import CreateLeague from '@/views/CreateLeague.vue'
import CreateAccount from '@/views/CreateAccount.vue'
import CreateRoster from '@/views/CreateRoster.vue'
import TeamRoster from '@/views/TeamRoster.vue'
import UpdateLeague from '@/views/UpdateLeague.vue'

Vue.use(Router)
const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
    } else next('/login')
}
const ifAuthenticatedAndAdmin = (to, from, next) => {
    if (store.getters.isAuthenticated && store.getters.isAdmin) {
        next()
    } else next('/')
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
            path: '/create-league',
            name: 'create-league',
            component: CreateLeague,
            beforeEnter: ifAuthenticatedAndAdmin,
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
            beforeEnter: ifAuthenticatedAndAdmin,
        },
        {
            path: '/team/:id',
            name: '',
            component: TeamRoster,
            // beforeEnter: ifAuthenticatedAndAdmin,
        },
        {
            path: '/update-league',
            name: '',
            component: UpdateLeague,
            beforeEnter: ifAuthenticatedAndAdmin,
        },
    ],
})
