import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'

import firebase from 'firebase/app'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles.css'

const firebaseConfig = {
    apiKey: 'AIzaSyD0-NVXOZ31yc_d-vWTS70SNo91sxroJnI',
    authDomain: 'ultimate-fantasy-fe04f.firebaseapp.com',
    databaseURL: 'https://ultimate-fantasy-fe04f.firebaseio.com',
    projectId: 'ultimate-fantasy-fe04f',
    storageBucket: 'ultimate-fantasy-fe04f.appspot.com',
    messagingSenderId: '759726116031',
    appId: '1:759726116031:web:b816abb7a09c59efa2ca0a',
    measurementId: 'G-0J8P5WE07K',
}

firebase.initializeApp(firebaseConfig)

Vue.use(BootstrapVue)
Vue.use(VueResource)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
