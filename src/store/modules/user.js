//TODO: Tengo que cambiar como funciona lo del admin y hacer los tokens dentro del api

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
    state: {
        user: '',
        token: localStorage.getItem('user-token') || '',
        uid: localStorage.getItem('uid') || '',
        userModuleError: '',
        participatingLeagues: new Set(),
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
        setparticipatingLeagues: (state, payload) => {
            state.participatingLeagues.add(payload)
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
                commit('setUid', user.uid)
                commit('setToken', token)
                localStorage.setItem('user-token', token)
                localStorage.setItem('uid', user.uid)
                var db = firebase.firestore()
                db.collection('Users')
                    .doc(user.uid)
                    .get()
                    .then(doc => {
                        if (doc.exists) {
                            commit('setUser', doc.data())
                        }
                    })
                    .catch(function(error) {
                        console.log('Error getting document:', error)
                    })
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
        getParticipatingLeagues: async ({commit, state}, uid) => {
            try {
                var db = firebase.firestore()
                let userRef = db.collection('Users').doc(uid)
                userRef
                    .collection('participatingLeagues')
                    .get()
                    .then(snapshot => {
                        if (!snapshot.empty) {
                            snapshot.forEach(doc => {
                                commit('setparticipatingLeagues', {
                                    ...doc.data(),
                                    id: doc.id,
                                })
                            })
                        }
                    })
                    .catch(err => {
                        console.log('Error getting documents', err)
                    })
            } catch (error) {
                console.log(`Error in store: ${error}`)
                return error
            }
        },
    },
    getters: {
        user: state => state.user,
        uid: state => state.uid,
        isAuthenticated: state => !!state.token,
        isAdmin: state => state.user.isAdmin,
        participatingLeagues: state => state.participatingLeagues,
    },
}
