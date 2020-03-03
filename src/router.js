import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import CreateLeague from '@/views/CreateLeague.vue'
import CreateAccount from '@/views/CreateAccount.vue'
import CreateRoster from '@/views/CreateRoster.vue'
import UpdateLeague from '@/views/UpdateLeague.vue'
import Welcome from '@/views/Welcome.vue'
import MyTeam from '@/views/MyTeam.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import Ranking from '@/views/Ranking.vue'
import CreateTeamName from '@/views/CreateTeamName.vue'

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
            name: 'welcome',
            path: '/',
            component: Welcome,
            beforeEnter: ifAuthenticated,
        },
        {
            name: 'createLeague',
            path: '/create-league',
            component: CreateLeague,
            beforeEnter: ifAuthenticatedAndAdmin,
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
        },
        {
            name: 'createAccount',
            path: '/create-account',
            component: CreateAccount,
        },
        {
            name: 'createRoster',
            path: '/createroster/:leagueId',
            component: CreateRoster,
            beforeEnter: ifAuthenticated,
        },
        {
            name: 'updateLeague',
            path: '/update-league',
            component: UpdateLeague,
            beforeEnter: ifAuthenticatedAndAdmin,
        },
        {
            name: 'home',
            path: '/home/:leagueId',
            component: Home,
            beforeEnter: ifAuthenticated,
        },
        {
            name: 'myTeam',
            path: '/myteam/:leagueId',
            component: MyTeam,
            beforeEnter: ifAuthenticated,
        },
        {
            name: 'forgotPassword',
            path: '/passwordReset',
            component: ForgotPassword,
        },
        {
            name: 'ranking',
            path: '/ranking/:leagueId',
            component: Ranking,
        },
        {
            name: 'createTeamName',
            path: '/createteamname/:leagueId',
            component: CreateTeamName,
            beforeEnter: ifAuthenticated,
        },
    ],
})
