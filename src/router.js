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
import Welcome from '@/views/Welcome.vue'
import MyTeam from '@/views/MyTeam.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import Ranking from '@/views/Ranking.vue'
import CreateTeam from '@/views/CreateTeam.vue'

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
            name: 'Welcome',
            component: Welcome,
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
            //beforeEnter: ifAuthenticatedAndAdmin,
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
        {
            name: 'home',
            path: '/home/:leagueName?',
            component: Home,
            beforeEnter: ifAuthenticated,
        },
        {
            path: '/my-team',
            name: 'my-team',
            component: MyTeam,
            beforeEnter: ifAuthenticated,
        },
        {
            path: '/passwordReset',
            name: 'forgotPassword',
            component: ForgotPassword,
        },
        {
            path: '/ranking',
            name: 'ranking',
            component: Ranking,
        },
        {
            path: '/create-team',
            name: 'create-team',
            component: CreateTeam,
        },
    ],
})
