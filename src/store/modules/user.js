import * as api from '@/api/api'

export default {
    state: {
        user: '',
        token: localStorage.getItem('user-token') || '',
        uid: localStorage.getItem('uid') || '',
        userModuleError: '',
    },
    mutations: {
        setUser: (state, payload) => {
            state.user = payload
        },
        setUid: (state, payload) => {
            state.uid = payload
        },
        setToken: (state, payload) => {
            state.token = payload
        },
        userSuccess: state => {
            state.status = 'success'
        },
        userError: (state, err) => {
            state.status = 'error'
            state.userModuleError = err
        },
    },
    actions: {
        setCurrentUser: async ({commit, dispatch}, user) => {
            try {
                let token = await user.getIdToken()
                commit('setUser', user)
                commit('setUid', user.uid)
                commit('setToken', token)
                localStorage.setItem('user-token', token)
                localStorage.setItem('uid', user.uid)
            } catch (error) {
                console.log(`Error in store: ${error}`)
                return error
            }
        },
        UserLogout: async ({commit, dispatch}) => {
            commit('setUser', {})
            localStorage.removeItem('user-token')
            localStorage.removeItem('uid')
        },
    },
    getters: {
        user: state => state.user,
        uid: state => state.uid,
        isAuthenticated: state => !!state.token,
    },
}