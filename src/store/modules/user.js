import * as api from '@/api/api'

export default {
    state: {
        user: '',
        token: localStorage.getItem('user-token') || '',
        userModuleError: '',
    },
    mutations: {
        setUser: (state, payload) => {
            state.user = payload
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
                commit('setToken', token)
                localStorage.setItem('user-token', token)
            } catch (error) {
                console.log(`Error in store: ${error}`)
                return error
            }
        },
        setUserLogout: async ({commit, dispatch}) => {
            localStorage.removeItem('user-token')
        },
    },
    getters: {
        user: state => state.user,
        isAuthenticated: state => !!state.token,
    },
}
