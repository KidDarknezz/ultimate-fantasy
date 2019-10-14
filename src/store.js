import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
  	allPlayers: [],
  	allUsers: [],
    allOriginTeams: [],
    	newUser: {
  		name: '',
  		email: '',
  		password: '',
  		roster: [],
  		teamName: ''
    }
  },
  mutations: {

  },
  actions: {

  }
})
